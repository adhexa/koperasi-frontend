import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Pagination } from '../../../components/ui/pagination'
import { ArrowLeft, Building2, Loader2, Search, ArrowUp, ArrowDown, X } from 'lucide-react'
import { getStatusColors, type StatusType } from '../../../lib/constants/colors'
import { useEnhancedTable } from '../../../hooks/useEnhancedTable'
import type { KoperasiDetailData } from '../../../lib/api/types'
import { useState } from 'react'

interface KoperasiListTableProps {
  data: KoperasiDetailData[]
  isLoading: boolean
  error: string | null
  title: string
  description: string
  onBack: () => void
  selectedStatus: StatusType
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

export function KoperasiListTable({
  data,
  isLoading,
  error,
  title,
  description,
  onBack,
  selectedStatus,
  pagination,
  onPageChange,
  onSearch,
  enableServerSidePagination
}: KoperasiListTableProps) {
  const statusColors = getStatusColors(selectedStatus)

  // Ensure data is always an array
  const safeData = Array.isArray(data) ? data : []

  // Use enhanced table hook with search, sorting, and pagination
  const tableEnhanced = useEnhancedTable({
    data: safeData,
    searchFields: ['nama_koperasi', 'nama_kabupaten', 'nama_kecamatan', 'nama_desa'],
    itemsPerPage: enableServerSidePagination ? safeData.length : 20,
    initialSort: { field: 'nama_koperasi', direction: 'asc' }
  })

  // Handle search input for server-side pagination
  const [searchValue, setSearchValue] = useState('')

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value
    setSearchValue(searchTerm)

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
    setSearchValue('')
    if (enableServerSidePagination && onSearch) {
      onSearch('')
    } else {
      tableEnhanced.clearSearch()
    }
  }

  // Use appropriate search value based on pagination mode
  const currentSearchValue = enableServerSidePagination ? searchValue : tableEnhanced.searchTerm

  // Sortable header component
  const SortableHeader = ({
    field,
    children,
    className = "",
    numeric = false
  }: {
    field: keyof KoperasiDetailData,
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
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className={`flex items-center gap-2 ${statusColors.hover} transition-colors`}
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </Button>
            <div>
              <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
                <Building2 className={`h-5 w-5 ${statusColors.text}`} />
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
            {tableEnhanced.totalItems} koperasi
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
                placeholder="Cari nama koperasi, kabupaten, kecamatan, atau desa..."
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
                  Menampilkan {tableEnhanced.totalItems} dari {safeData.length} koperasi
                </span>
              )}
            </div>
          </div>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className={`h-8 w-8 animate-spin ${statusColors.text}`} />
            <span className="ml-2 text-gray-600">
              Memuat data koperasi...
            </span>
          </div>
        ) : tableEnhanced.totalItems === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Building2 className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada data koperasi</h3>
            <p className="text-gray-600 text-center">
              Belum ada data koperasi yang tersedia di wilayah ini
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 border-b-2 border-gray-200">
                <TableHead className="text-center font-semibold text-gray-700 border-r border-gray-200 w-16">
                  No
                </TableHead>
                <SortableHeader field="nama_koperasi" className="min-w-[200px]">
                  Nama Koperasi
                </SortableHeader>
                <SortableHeader field="nama_kabupaten" className="min-w-[150px]">
                  Nama Kabupaten
                </SortableHeader>
                <SortableHeader field="nama_kecamatan" className="min-w-[150px]">
                  Nama Kecamatan
                </SortableHeader>
                <SortableHeader field="nama_desa" className="min-w-[140px]" numeric>
                  Nama Desa
                </SortableHeader>
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
                    key={item.id}
                    className={`border-b border-gray-200 hover:bg-gray-50 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                    }`}
                  >
                    <TableCell className="text-center font-medium text-gray-900 border-r border-gray-200">
                      {rowNumber}
                    </TableCell>
                    <TableCell className="font-medium text-gray-900 border-r border-gray-200">
                      <div className="flex items-center gap-2">
                        <Building2 className={`h-4 w-4 ${statusColors.text}`} />
                        {item.nama_koperasi || '-'}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-700 border-r border-gray-200">
                      {item.nama_kabupaten || '-'}
                    </TableCell>
                    <TableCell className="text-gray-700 border-r border-gray-200">
                      {item.nama_kecamatan || '-'}
                    </TableCell>
                    <TableCell className="text-center text-gray-700">
                      {item.nama_desa || '-'}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}

        {/* Pagination - Use server-side pagination if enabled, otherwise client-side */}
        {!isLoading && (
          enableServerSidePagination && pagination ? (
            pagination.totalPages > 1 && (
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
          ) : (
            tableEnhanced.totalItems > 0 && tableEnhanced.totalPages > 1 && (
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
          )
        )}
      </CardContent>
    </Card>
  )
}
