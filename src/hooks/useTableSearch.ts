import { useMemo, useState } from 'react'

export interface UseTableSearchProps<T> {
  data: T[]
  searchFields: (keyof T)[]
}

export interface UseTableSearchReturn<T> {
  searchTerm: string
  setSearchTerm: (term: string) => void
  filteredData: T[]
  clearSearch: () => void
}

export function useTableSearch<T>({
  data,
  searchFields
}: UseTableSearchProps<T>): UseTableSearchReturn<T> {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) {
      return data
    }

    const searchLower = searchTerm.toLowerCase().trim()

    return data.filter(item => {
      return searchFields.some(field => {
        const value = item[field]
        if (value === null || value === undefined) {
          return false
        }
        return String(value).toLowerCase().includes(searchLower)
      })
    })
  }, [data, searchTerm, searchFields])

  const clearSearch = () => {
    setSearchTerm('')
  }

  return {
    searchTerm,
    setSearchTerm,
    filteredData,
    clearSearch
  }
}
