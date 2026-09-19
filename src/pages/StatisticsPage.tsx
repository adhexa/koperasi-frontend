import { useCallback, useMemo, useState } from 'react'
import { Layout } from '../components/layout'
import {
  StatisticsHeader,
  StatisticsCards,
  InteractiveMapSection,
  StatisticsDataTable,
  KoperasiListTable,
  transformProvinceData,
  transformKabupatenData,
  useStatisticsData,
  useKoperasiDetail
} from '../features/statistics'

type ViewType = 'summary' | 'provinceDetail' | 'koperasiList'

interface ViewState {
  type: ViewType
  provinceCode?: string
  provinceName?: string
  kabupatenCode?: string
  kabupatenName?: string
}

export function StatisticsPage() {
  const [viewState, setViewState] = useState<ViewState>({ type: 'summary' })
  const [loadingDetailId, setLoadingDetailId] = useState<string | null>(null)
  const [resetMapToProvinces, setResetMapToProvinces] = useState(false)

  const {
    selectedStatus,
    koperasiData,
    isLoading,
    error,
    statusSummary,
    progressionRates,
    pagination,
    setSelectedStatus,
    handleViewDetail,
    handleBackToSummary: handleBackToSummaryFromHook,
    refetchData,
  } = useStatisticsData()

  const {
    kabupatenData,
    isLoadingDetail,
    detailError,
    kabupatenPagination,
    fetchKabupatenData,
    refetchKabupatenData,
    clearDetailData,
    koperasiList,
    isLoadingKoperasiList,
    koperasiListError,
    koperasiPagination,
    fetchKoperasiByProvince,
    refetchKoperasiData,
    clearKoperasiList
  } = useKoperasiDetail()

  // Handle viewing province detail (kabupaten data)
  const handleProvinceDetailClick = useCallback(async (provinceCode: string, provinceName: string) => {
    setLoadingDetailId(provinceCode)
    try {
      handleViewDetail(provinceCode, provinceName)
      await fetchKabupatenData(provinceCode, 1, 20) // Start with page 1, limit 20
      setViewState({ type: 'provinceDetail', provinceCode, provinceName })
    } finally {
      setLoadingDetailId(null)
    }
  }, [handleViewDetail, fetchKabupatenData])

  // Handle viewing koperasi list for a kabupaten
  const handleKoperasiListClick = useCallback(async (kabupatenCode: string, kabupatenName: string) => {
    if (!viewState.provinceCode) return

    setLoadingDetailId(kabupatenCode)
    try {
      await fetchKoperasiByProvince(viewState.provinceCode, kabupatenCode, 1, 20) // Start with page 1, limit 20
      setViewState({
        type: 'koperasiList',
        provinceCode: viewState.provinceCode,
        provinceName: viewState.provinceName,
        kabupatenCode,
        kabupatenName
      })
    } finally {
      setLoadingDetailId(null)
    }
  }, [viewState.provinceCode, viewState.provinceName, fetchKoperasiByProvince])

  // Handle back to summary from any detail view
  const handleBackToSummary = useCallback(() => {
    handleBackToSummaryFromHook()
    clearDetailData()
    clearKoperasiList()
    setViewState({ type: 'summary' })
    // Reset map to provinces view
    setResetMapToProvinces(true)
    // Reset the flag after a brief delay to allow the effect to trigger
    setTimeout(() => setResetMapToProvinces(false), 100)
  }, [handleBackToSummaryFromHook, clearDetailData, clearKoperasiList])

    // Handle back from koperasi list to kabupaten detail
  const handleBackToKabupatenDetail = () => {
    clearKoperasiList()
    setViewState({
      type: 'provinceDetail',
      provinceCode: viewState.provinceCode,
      provinceName: viewState.provinceName
    })
  }

  // Determine which components to show based on view state
  const shouldShowCards = true // Always show cards
  const shouldShowMap = true // Always show map
  const shouldShowTable = viewState.type === 'summary' || viewState.type === 'provinceDetail'
  const shouldShowKoperasiList = viewState.type === 'koperasiList'

  // Memoize table data to prevent unnecessary recalculations
  const tableProps = useMemo(() => {
    if (viewState.type === 'provinceDetail') {
      return {
        data: transformKabupatenData(kabupatenData),
        isLoading: isLoadingDetail,
        error: detailError,
        title: `Statistik Kabupaten/Kota - ${viewState.provinceName}`,
        description: `Data statistik koperasi per kabupaten/kota di provinsi ${viewState.provinceName}`,
        entityType: 'kabupaten' as const,
        parentName: viewState.provinceName || '',
        showBackButton: true,
        onBack: handleBackToSummary,
        showDetailButton: true,
        onViewDetail: handleKoperasiListClick,
        selectedStatus: selectedStatus,
        loadingDetailId: loadingDetailId,
        enableServerSidePagination: true,
        pagination: kabupatenPagination,
        onPageChange: (page: number) => {
          if (viewState.provinceCode) {
            refetchKabupatenData(viewState.provinceCode, page)
          }
        },
        onSearch: (searchTerm: string) => {
          if (viewState.provinceCode) {
            refetchKabupatenData(viewState.provinceCode, 1, undefined, searchTerm)
          }
        }
      }
    } else {
      return {
        data: transformProvinceData(koperasiData),
        isLoading: isLoading,
        error: error,
        title: "Data Statistik Koperasi Per Provinsi",
        description: "Statistik pembentukan koperasi berdasarkan data API per provinsi",
        entityType: 'provinsi' as const,
        parentName: undefined,
        showBackButton: false,
        onBack: undefined,
        showDetailButton: true,
        onViewDetail: handleProvinceDetailClick,
        selectedStatus: selectedStatus,
        loadingDetailId: loadingDetailId,
        enableServerSidePagination: true,
        pagination: pagination,
        onPageChange: (page: number) => {
          refetchData(page)
        },
        onSearch: (searchTerm: string) => {
          refetchData(1, undefined, searchTerm)
        }
      }
    }
  }, [
    viewState.type,
    viewState.provinceName,
    viewState.provinceCode,
    kabupatenData,
    kabupatenPagination,
    isLoadingDetail,
    detailError,
    koperasiData,
    pagination,
    isLoading,
    error,
    selectedStatus,
    loadingDetailId,
    handleBackToSummary,
    handleKoperasiListClick,
    handleProvinceDetailClick,
    refetchKabupatenData,
    refetchData
  ])

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Page Header - Always visible */}
        <StatisticsHeader
          title="Statistik Koperasi Indonesia"
          description="Data persebaran dan statistik koperasi di seluruh Indonesia"
        />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            {/* Status Breakdown Cards - Always visible */}
            {shouldShowCards && (
              <StatisticsCards
                statusSummary={statusSummary}
                progressionRates={progressionRates}
                selectedStatus={selectedStatus}
                onStatusChange={setSelectedStatus}
              />
            )}

            {/* Interactive Map - Always visible */}
            {shouldShowMap && (
              <InteractiveMapSection
                onProvinceClick={handleProvinceDetailClick}
                selectedStatus={selectedStatus}
                resetToProvinces={resetMapToProvinces}
                statisticsData={koperasiData}
              />
            )}

            {/* Data Table - Summary and Province Detail views */}
            {shouldShowTable && (
              <StatisticsDataTable
                data={tableProps.data}
                isLoading={tableProps.isLoading}
                error={tableProps.error}
                title={tableProps.title}
                description={tableProps.description}
                entityType={tableProps.entityType}
                parentName={tableProps.parentName}
                showBackButton={tableProps.showBackButton}
                onBack={tableProps.onBack}
                showDetailButton={tableProps.showDetailButton}
                onViewDetail={tableProps.onViewDetail}
                selectedStatus={tableProps.selectedStatus}
                loadingDetailId={tableProps.loadingDetailId}
                enableServerSidePagination={tableProps.enableServerSidePagination}
                pagination={tableProps.pagination}
                onPageChange={tableProps.onPageChange}
                onSearch={tableProps.onSearch}
              />
            )}

            {/* Koperasi List - Only when viewing koperasi list */}
            {shouldShowKoperasiList && (
              <KoperasiListTable
                data={koperasiList}
                isLoading={isLoadingKoperasiList}
                error={koperasiListError}
                title={`Daftar Koperasi - ${viewState.kabupatenName}`}
                description={`Daftar lengkap koperasi yang terdaftar di ${viewState.kabupatenName}, ${viewState.provinceName}`}
                onBack={handleBackToKabupatenDetail}
                selectedStatus={selectedStatus}
                enableServerSidePagination={true}
                pagination={koperasiPagination}
                onPageChange={(page: number) => {
                  if (viewState.provinceCode && viewState.kabupatenCode) {
                    refetchKoperasiData(viewState.provinceCode, viewState.kabupatenCode, page)
                  }
                }}
                onSearch={(searchTerm: string) => {
                  if (viewState.provinceCode && viewState.kabupatenCode) {
                    refetchKoperasiData(viewState.provinceCode, viewState.kabupatenCode, 1, undefined, searchTerm)
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
