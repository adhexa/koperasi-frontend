import { useMemo } from 'react'
import { usePagination } from './usePagination'
import { useTableSearch } from './useTableSearch'
import { useTableSorting, type SortDirection, type UseTableSortingProps } from './useTableSorting'

export interface UseEnhancedTableProps<T> {
  data: T[]
  searchFields: (keyof T)[]
  itemsPerPage?: number
  initialSort?: UseTableSortingProps<T>['initialSort']
}

export interface UseEnhancedTableReturn<T> {
  // Search functionality
  searchTerm: string
  setSearchTerm: (term: string) => void
  clearSearch: () => void

  // Sorting functionality
  handleSort: (field: keyof T) => void
  getSortDirection: (field: keyof T) => SortDirection
  clearSort: () => void

  // Pagination functionality
  currentPage: number
  totalPages: number
  paginatedData: T[]
  goToPage: (page: number) => void
  goToNextPage: () => void
  goToPreviousPage: () => void
  canGoNext: boolean
  canGoPrevious: boolean
  startIndex: number
  endIndex: number
  totalItems: number

  // Combined data processing
  processedData: T[] // Search + Sort result (before pagination)
}

export function useEnhancedTable<T>({
  data,
  searchFields,
  itemsPerPage = 20,
  initialSort
}: UseEnhancedTableProps<T>): UseEnhancedTableReturn<T> {
  // Search functionality
  const {
    searchTerm,
    setSearchTerm,
    filteredData,
    clearSearch
  } = useTableSearch({ data, searchFields })

  // Sorting functionality
  const {
    sortedData,
    handleSort,
    clearSort,
    getSortDirection
  } = useTableSorting({
    data: filteredData,
    initialSort
  })

  // Memoize the processed data for performance
  const processedData = useMemo(() => sortedData, [sortedData])

  // Pagination functionality (applied to search + sort result)
  const pagination = usePagination({
    data: processedData,
    itemsPerPage
  })

  return {
    // Search
    searchTerm,
    setSearchTerm,
    clearSearch,

    // Sorting
    handleSort,
    getSortDirection,
    clearSort,

    // Pagination
    currentPage: pagination.currentPage,
    totalPages: pagination.totalPages,
    paginatedData: pagination.paginatedData,
    goToPage: pagination.goToPage,
    goToNextPage: pagination.goToNextPage,
    goToPreviousPage: pagination.goToPreviousPage,
    canGoNext: pagination.canGoNext,
    canGoPrevious: pagination.canGoPrevious,
    startIndex: pagination.startIndex,
    endIndex: pagination.endIndex,
    totalItems: pagination.totalItems,

    // Combined
    processedData
  }
}
