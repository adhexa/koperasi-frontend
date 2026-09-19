import { useMemo, useState } from 'react'

export type SortDirection = 'asc' | 'desc' | null

export interface SortConfig<T> {
  field: keyof T | null
  direction: SortDirection
}

export interface UseTableSortingProps<T> {
  data: T[]
  initialSort?: SortConfig<T>
}

export interface UseTableSortingReturn<T> {
  sortConfig: SortConfig<T>
  sortedData: T[]
  handleSort: (field: keyof T) => void
  clearSort: () => void
  getSortDirection: (field: keyof T) => SortDirection
}

export function useTableSorting<T>({
  data,
  initialSort = { field: null, direction: null }
}: UseTableSortingProps<T>): UseTableSortingReturn<T> {
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>(initialSort)

  const sortedData = useMemo(() => {
    if (!sortConfig.field || !sortConfig.direction) {
      return data
    }

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.field!]
      const bValue = b[sortConfig.field!]

      // Handle null/undefined values
      if (aValue === null || aValue === undefined) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }
      if (bValue === null || bValue === undefined) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }

      // Handle different data types
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue
      }

      // Handle strings (case-insensitive)
      const aString = String(aValue).toLowerCase()
      const bString = String(bValue).toLowerCase()

      if (aString < bString) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (aString > bString) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }
      return 0
    })
  }, [data, sortConfig])

  const handleSort = (field: keyof T) => {
    setSortConfig(prevConfig => {
      if (prevConfig.field === field) {
        // Cycle through: asc -> desc -> null
        if (prevConfig.direction === 'asc') {
          return { field, direction: 'desc' }
        } else if (prevConfig.direction === 'desc') {
          return { field: null, direction: null }
        }
      }
      // Default to ascending for new field
      return { field, direction: 'asc' }
    })
  }

  const clearSort = () => {
    setSortConfig({ field: null, direction: null })
  }

  const getSortDirection = (field: keyof T): SortDirection => {
    return sortConfig.field === field ? sortConfig.direction : null
  }

  return {
    sortConfig,
    sortedData,
    handleSort,
    clearSort,
    getSortDirection
  }
}
