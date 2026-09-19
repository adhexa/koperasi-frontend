import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { koperasiAPI } from '../../../lib/api/koperasi'
import type { DetailViewState, KoperasiStatistics, ProgressionRates, StatisticsSummary, StatisticsTotals, StatusType } from '../types'

export function useStatisticsData() {
  const [selectedStatus, setSelectedStatus] = useState<StatusType>("pembentukan")
  const [koperasiData, setKoperasiData] = useState<KoperasiStatistics[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [detailView, setDetailView] = useState<DetailViewState>({
    isDetailView: false,
    provinceCode: null,
    provinceName: null
  })

  // Add pagination state for province level
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 50,
    totalPages: 1,
    totalItems: 0
  })

  const { isAuthenticated } = useAuth()

  // Fetch data from API with pagination support
  const fetchKoperasiData = useCallback(async (page: number = 1, limit: number = 50, search?: string) => {
    try {
      setIsLoading(true)
      setError(null)

      if (!isAuthenticated) {
        setError('Anda harus login untuk melihat data statistik')
        setKoperasiData([])
        return
      }

      const response = await koperasiAPI.getKoperasiStatistics({
        pages: 0,
        limit: 0,
        key_search: '',
        sort: 'asc'
      })

      setKoperasiData(response.data)

      // Update pagination info - if API returns pagination info, use it
      // Otherwise, assume all data is loaded
      setPagination(prev => ({
        ...prev,
        currentPage: page,
        limit: limit,
        totalItems: response.data.length,
        totalPages: Math.ceil(response.data.length / limit)
      }))

    } catch (error: unknown) {
      const apiError = error as Error
      console.error('Failed to fetch koperasi data:', apiError)
      setError(apiError.message || 'Gagal memuat data dari server. Silakan coba lagi.')
      setKoperasiData([])
    } finally {
      setIsLoading(false)
    }
  }, [isAuthenticated])

  // Initial data fetch
  useEffect(() => {
    fetchKoperasiData(pagination.currentPage, pagination.limit)
  }, [isAuthenticated]) // Only depend on authentication

  // Function to refetch data with new pagination/search params
  const refetchData = useCallback((page?: number, limit?: number, search?: string) => {
    const newPage = page ?? pagination.currentPage
    const newLimit = limit ?? pagination.limit
    fetchKoperasiData(newPage, newLimit, search)
  }, [fetchKoperasiData, pagination.currentPage, pagination.limit])

  // Memoize totals calculation to prevent recalculation on every render
  const totals = useMemo((): StatisticsTotals => {
    return koperasiData.reduce((totals, province) => ({
      sosialisasi: totals.sosialisasi + province.sosialisasi,
      terbentuk: totals.terbentuk + province.terbentuk,
      berbadan_hukum: totals.berbadan_hukum + province.berbadan_hukum,
    }), { sosialisasi: 0, terbentuk: 0, berbadan_hukum: 0 })
  }, [koperasiData])

  // Memoize status distribution summary
  const statusSummary: StatisticsSummary = useMemo(() => ({
    pembentukan: totals.terbentuk,
    sudahBerbadanHukum: totals.berbadan_hukum
  }), [totals])

  // Memoize progression rates calculation
  const progressionRates: ProgressionRates = useMemo(() => ({
    overall_completion: statusSummary.pembentukan > 0 ? Math.round((statusSummary.sudahBerbadanHukum / statusSummary.pembentukan) * 100) : 0
  }), [statusSummary])

  // Memoize chart data conversion function
  const convertToChartData = useCallback((field: keyof Pick<KoperasiStatistics, 'sosialisasi' | 'terbentuk' | 'berbadan_hukum'>, title: string) => {
    const chartData: (string | number)[][] = [['Province', title]]
    koperasiData.forEach(province => {
      chartData.push([province.nama_provinsi, province[field]])
    })
    return chartData
  }, [koperasiData])

  // Memoize chart title based on selected status
  const chartTitle = useMemo(() => {
    switch(selectedStatus) {
      case 'pembentukan':
        return 'Tahap 1: Pembentukan Koperasi'
      case 'sudahBerbadanHukum':
        return 'Tahap 3: Koperasi Berbadan Hukum'
      default:
        return 'Tracking Pengembangan Koperasi'
    }
  }, [selectedStatus])

  // Memoize chart data based on selected status
  const chartData = useMemo(() => {
    switch(selectedStatus) {
      case 'pembentukan':
        return convertToChartData('terbentuk', chartTitle)
      case 'sudahBerbadanHukum':
        return convertToChartData('berbadan_hukum', chartTitle)
      default:
        return convertToChartData('terbentuk', chartTitle)
    }
  }, [selectedStatus, convertToChartData, chartTitle])

  // Memoize color palette based on selected status
  const colorPalette = useMemo(() => {
    switch(selectedStatus) {
      case 'pembentukan':
        return ['#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5', '#2196F3', '#1E88E5', '#1976D2', '#1565C0', '#0D47A1'] // Blue
      case 'pembentukanAkta':
        return ['#E8F5E9', '#C8E6C9', '#A5D6A7', '#81C784', '#66BB6A', '#4CAF50', '#43A047', '#388E3C', '#2E7D32', '#1B5E20'] // Green
      case 'sudahBerbadanHukum':
        return ['#FFF3E0', '#FFE0B2', '#FFCC80', '#FFB74D', '#FFA726', '#FF9800', '#FB8C00', '#F57C00', '#EF6C00', '#E65100'] // Orange
      default:
        return ['#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5', '#2196F3', '#1E88E5', '#1976D2', '#1565C0', '#0D47A1']
    }
  }, [selectedStatus])

  // Memoize detail view functions
  const handleViewDetail = useCallback((provinceCode: string, provinceName: string) => {
    setDetailView({
      isDetailView: true,
      provinceCode,
      provinceName
    })
  }, [])

  const handleBackToSummary = useCallback(() => {
    setDetailView({
      isDetailView: false,
      provinceCode: null,
      provinceName: null
    })
  }, [])

  return {
    // State
    selectedStatus,
    koperasiData,
    isLoading,
    error,
    totals,
    statusSummary,
    progressionRates,
    detailView,
    pagination,

    // Actions
    setSelectedStatus,
    handleViewDetail,
    handleBackToSummary,
    refetchData,

    // Computed values
    chartData,
    chartTitle,
    colorPalette,
  }
}
