import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '../../../components/ui/table'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Pagination } from '../../../components/ui/pagination'
import { ArrowLeft, BarChart3, Building2, Loader2, MapPin, Search, ArrowUp, ArrowDown, X } from 'lucide-react'
import { getStatusColors, type StatusType } from '../../../lib/constants/colors'
import { useEnhancedTable } from '../../../hooks/useEnhancedTable'
import { useState } from 'react'

// Generic interface for statistics data
interface StatisticsDataItem {
  kode: string
  nama: string
  sosialisasi: number
  terbentuk: number
  berbadan_hukum: number
}

interface StatisticsDataTableProps {
  data: StatisticsDataItem[]
  isLoading: boolean
  error: string | null
  title: string
  description: string
  entityType: 'provinsi' | 'kabupaten' // Type of entity being displayed
  parentName?: string // Name of parent entity (e.g., province name when showing kabupaten)
  showBackButton?: boolean
  onBack?: () => void
  onViewDetail?: (kode: string, nama: string) => void
  showDetailButton?: boolean
  selectedStatus?: StatusType // Add selectedStatus prop
  loadingDetailId?: string | null // Track which row's detail button is loading
  // Server-side pagination props
  pagination?: {
    currentPage: number
    totalPages: number
    totalItems: number
    limit: number
  }
  onPageChange?: (page: number) => void
  onSearch?: (searchTerm: string) => void
  enableServerSidePagination?: boolean
}

export function StatisticsDataTable({
  data,
  isLoading,
  error,
  title,
  description,
  entityType,
  parentName,
  showBackButton = false,
  onBack,
  onViewDetail,
  showDetailButton = true,
  selectedStatus = 'pembentukan',
  loadingDetailId = null,
  pagination,
  onPageChange,
  onSearch,
  enableServerSidePagination = false
}: StatisticsDataTableProps) {
  // Get colors based on selected status
  const statusColors = getStatusColors(selectedStatus)

  // Use enhanced table hook with search, sorting, and pagination
  const tableEnhanced = useEnhancedTable({
    data,
    searchFields: ['nama', 'kode'],
    itemsPerPage: enableServerSidePagination ? data.length : 20,
    initialSort: { field: 'kode', direction: 'asc' }
  })

  // Handle search input for server-side pagination
  const [searchInputValue, setSearchInputValue] = useState('')
  const [debouncedSearchValue, setDebouncedSearchValue] = useState('')

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value
    setSearchInputValue(searchTerm)

    if (enableServerSidePagination && onSearch) {
      // Debounce search for server-side
      const timeoutId = setTimeout(() => {
        onSearch(searchTerm)
      }, 500)
      return () => clearTimeout(timeoutId)
    } else {
      // Use client-side search
      tableEnhanced.setSearchTerm(searchTerm)
    }
  }

  // Handle search clear for server-side pagination
  const handleSearchClear = () => {
    setSearchInputValue('')
    if (enableServerSidePagination && onSearch) {
      onSearch('')
    } else {
      tableEnhanced.clearSearch()
    }
  }

  // Use appropriate search value based on pagination mode
  const currentSearchValue = enableServerSidePagination ? searchInputValue : tableEnhanced.searchTerm

  // Calculate totals from all data (before filtering/sorting)
  const totals = data.reduce((acc, item) => ({
    sosialisasi: acc.sosialisasi + item.sosialisasi,
    terbentuk: acc.terbentuk + item.terbentuk,
    berbadan_hukum: acc.berbadan_hukum + item.berbadan_hukum,
  }), { sosialisasi: 0, terbentuk: 0, berbadan_hukum: 0 })

  const handleDetailClick = (kode: string, nama: string) => {
    if (onViewDetail) {
      onViewDetail(kode, nama)
    }
  }

  // Get appropriate icons and labels based on entity type
  const getEntityConfig = () => {
    switch (entityType) {
      case 'provinsi':
        return {
          icon: BarChart3,
          entityLabel: 'Provinsi',
          codeLabel: 'Kode',
          nameLabel: 'Provinsi',
          countLabel: 'provinsi'
        }
      case 'kabupaten':
        return {
          icon: Building2,
          entityLabel: 'Kabupaten/Kota',
          codeLabel: 'Kode',
          nameLabel: 'Kabupaten/Kota',
          countLabel: 'kabupaten/kota'
        }
      default:
        return {
          icon: BarChart3,
          entityLabel: 'Data',
          codeLabel: 'Kode',
          nameLabel: 'Nama',
          countLabel: 'items'
        }
    }
  }

  const config = getEntityConfig()
  const IconComponent = config.icon

  // Sortable header component
  const SortableHeader = ({
    field,
    children,
    className = "",
    numeric = false
  }: {
    field: keyof StatisticsDataItem,
    children: React.ReactNode,
    className?: string,
    numeric?: boolean
  }) => {
    const sortDirection = tableEnhanced.getSortDirection(field)
    return (
      <TableHead
        className={`font-semibold text-gray-700 border-r border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors ${className} ${numeric ? 'text-center' : ''}`}
        onClick={() => tableEnhanced.handleSort(field)}
      >
        <div className={`flex items-center gap-1 ${numeric ? 'justify-center' : ''}`}>
          {children}
          <div className="flex flex-col ml-1">
            {sortDirection === 'asc' ? (
              <ArrowUp className="h-3 w-3 text-blue-600" />
            ) : sortDirection === 'desc' ? (
              <ArrowDown className="h-3 w-3 text-blue-600" />
            ) : (
              <div className="h-3 w-3 text-gray-300 flex flex-col">
                <ArrowUp className="h-1.5 w-3" />
                <ArrowDown className="h-1.5 w-3" />
              </div>
            )}
          </div>
        </div>
      </TableHead>
    )
  }

  return (
    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur">
      <CardHeader className={`bg-gradient-to-r ${statusColors.gradient} border-b`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {showBackButton && onBack && (
              <Button
                variant="outline"
                size="sm"
                onClick={onBack}
                className={`flex items-center gap-2 ${statusColors.hover} transition-colors`}
              >
                <ArrowLeft className="h-4 w-4" />
                Kembali
              </Button>
            )}
            <div>
              <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
                <IconComponent className={`h-5 w-5 ${statusColors.text}`} />
                {title}
                {isLoading && <Loader2 className={`h-4 w-4 animate-spin ${statusColors.text}`} />}
              </CardTitle>
              <p className="text-gray-600 text-sm mt-1">
                {description}
                {error && <span className="text-red-500 ml-2">• {error}</span>}
              </p>
            </div>
          </div>
          <div className={`text-sm text-gray-600 ${statusColors.bg} px-3 py-1 rounded-full`}>
            {tableEnhanced.totalItems} {config.countLabel}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {/* Search and Controls */}
        <div className="p-4 border-b border-gray-200 bg-gray-50/50">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder={`Cari ${config.nameLabel.toLowerCase()}...`}
                value={currentSearchValue}
                onChange={handleSearchChange}
                className="pl-10 pr-10 bg-white"
              />
              {currentSearchValue && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSearchClear}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              {currentSearchValue && (
                <span>
                  Menampilkan {tableEnhanced.totalItems} dari {data.length} {config.countLabel}
                </span>
              )}
            </div>
          </div>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className={`h-8 w-8 animate-spin ${statusColors.text}`} />
            <span className="ml-2 text-gray-600">
              {entityType === 'provinsi' ? 'Loading data from API...' : `Memuat data ${config.countLabel}...`}
            </span>
          </div>
        ) : tableEnhanced.totalItems === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <IconComponent className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada data</h3>
            <p className="text-gray-600 text-center">
              {entityType === 'provinsi'
                ? 'Belum ada data provinsi yang tersedia'
                : `Belum ada data ${config.countLabel} yang tersedia${parentName ? ` di ${parentName}` : ''}`
              }
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 border-b-2 border-gray-200">
                <TableHead className="text-center font-semibold text-gray-700 border-r border-gray-200 w-16">
                  No
                </TableHead>
                <SortableHeader field="kode" className="w-24" numeric>
                  {config.codeLabel}
                </SortableHeader>
                <SortableHeader field="nama" className="min-w-[250px]">
                  {config.nameLabel}
                </SortableHeader>
                <SortableHeader field="sosialisasi" className="min-w-[120px]" numeric>
                  Sosialisasi
                </SortableHeader>
                <SortableHeader field="terbentuk" className="min-w-[120px]" numeric>
                  Terbentuk
                </SortableHeader>
                <SortableHeader field="berbadan_hukum" className="min-w-[140px]" numeric>
                  Berbadan Hukum
                </SortableHeader>
                {showDetailButton && (
                  <TableHead className="text-center font-semibold text-gray-700 min-w-[120px]">
                    {entityType === 'provinsi' ? 'Detail' : 'Lihat Koperasi'}
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {(enableServerSidePagination ? data : tableEnhanced.paginatedData).map((item, index) => {
                // Calculate the correct row number based on pagination mode
                const rowNumber = enableServerSidePagination && pagination
                  ? (pagination.currentPage - 1) * pagination.limit + index + 1
                  : tableEnhanced.startIndex + index

                return (
                  <TableRow
                    key={item.kode}
                    className={`border-b border-gray-200 hover:bg-gray-50 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                    }`}
                  >
                    <TableCell className="text-center font-medium text-gray-900 border-r border-gray-200">
                      {rowNumber}
                    </TableCell>
                    <TableCell className="text-center font-mono text-sm text-gray-700 border-r border-gray-200">
                      {item.kode}
                    </TableCell>
                    <TableCell className="font-medium text-gray-900 border-r border-gray-200">
                      <div className="flex items-center gap-2">
                        <MapPin className={`h-4 w-4 ${statusColors.text}`} />
                        {item.nama}
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-medium text-gray-900 border-r border-gray-200">
                      {item.sosialisasi.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center font-medium text-gray-900 border-r border-gray-200">
                      {item.terbentuk.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center font-medium text-gray-900 border-r border-gray-200">
                      {item.berbadan_hukum.toLocaleString()}
                    </TableCell>
                    {showDetailButton && (
                      <TableCell className="text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDetailClick(item.kode, item.nama)}
                          disabled={loadingDetailId === item.kode}
                          className={`text-xs ${statusColors.hover} ${statusColors.border} min-w-[70px]`}
                        >
                          {loadingDetailId === item.kode ? (
                            <div className="flex items-center gap-1">
                              <Loader2 className="h-3 w-3 animate-spin" />
                              <span>Memuat...</span>
                            </div>
                          ) : (
                            'Detail'
                          )}
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                )
              })}
            </TableBody>
            <TableFooter>
              <TableRow className={`${statusColors.bg} border-t-2 border-gray-300`}>
                <TableCell colSpan={3} className="font-bold text-gray-900 border-r border-gray-200">
                  TOTAL INDONESIA
                </TableCell>
                <TableCell className="text-center font-bold text-gray-900 border-r border-gray-200">
                  {totals.sosialisasi.toLocaleString()}
                </TableCell>
                <TableCell className="text-center font-bold text-gray-900 border-r border-gray-200">
                  {totals.terbentuk.toLocaleString()}
                </TableCell>
                <TableCell className="text-center font-bold text-gray-900 border-r border-gray-200">
                  {totals.berbadan_hukum.toLocaleString()}
                </TableCell>
                {showDetailButton && (
                  <TableCell className="text-center">
                    {/* Empty cell for action column */}
                  </TableCell>
                )}
              </TableRow>
            </TableFooter>
          </Table>
        )}

        {/* Pagination - Use server-side pagination if enabled, otherwise client-side */}
        {!isLoading && (
          (() => {
            const shouldShowServerPagination = enableServerSidePagination && pagination && pagination.totalPages > 1
            const shouldShowClientPagination = !enableServerSidePagination && tableEnhanced.totalItems > 0 && tableEnhanced.totalPages > 1

            if (enableServerSidePagination && pagination) {
              return pagination.totalPages > 1 && (
                <Pagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  onPageChange={onPageChange || (() => {})}
                  canGoPrevious={pagination.currentPage > 1}
                  canGoNext={pagination.currentPage < pagination.totalPages}
                  startIndex={(pagination.currentPage - 1) * pagination.limit + 1}
                  endIndex={Math.min(pagination.currentPage * pagination.limit, pagination.totalItems)}
                  totalItems={pagination.totalItems}
                />
              )
            } else {
              return tableEnhanced.totalItems > 0 && tableEnhanced.totalPages > 1 && (
                <Pagination
                  currentPage={tableEnhanced.currentPage}
                  totalPages={tableEnhanced.totalPages}
                  onPageChange={tableEnhanced.goToPage}
                  canGoPrevious={tableEnhanced.canGoPrevious}
                  canGoNext={tableEnhanced.canGoNext}
                  startIndex={tableEnhanced.startIndex}
                  endIndex={tableEnhanced.endIndex}
                  totalItems={tableEnhanced.totalItems}
                />
              )
            }
          })()
        )}
      </CardContent>
    </Card>
  )
}

// Helper function to transform province data
export function transformProvinceData(data: Array<{
  kode_provinsi: string
  nama_provinsi: string
  sosialisasi: number
  terbentuk: number
  berbadan_hukum: number
}>): StatisticsDataItem[] {
  return data.map(item => ({
    kode: item.kode_provinsi,
    nama: item.nama_provinsi,
    sosialisasi: item.sosialisasi,
    terbentuk: item.terbentuk,
    berbadan_hukum: item.berbadan_hukum
  }))
}

// Helper function to transform kabupaten data
export function transformKabupatenData(data: Array<{
  kode_kabupaten: string
  nama_kabupaten: string
  sosialisasi: number
  terbentuk: number
  berbadan_hukum: number
}>): StatisticsDataItem[] {
  return data.map(item => ({
    kode: item.kode_kabupaten,
    nama: item.nama_kabupaten,
    sosialisasi: item.sosialisasi,
    terbentuk: item.terbentuk,
    berbadan_hukum: item.berbadan_hukum
  }))
}
