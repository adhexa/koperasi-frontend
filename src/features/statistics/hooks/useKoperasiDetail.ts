import { useCallback, useState } from 'react'
import { koperasiAPI } from '../../../lib/api/koperasi'
import type { KabupatenStatistics, KoperasiDetailData } from '../../../lib/api/types'

interface PaginationState {
  currentPage: number
  limit: number
  totalPages: number
  totalItems: number
}

export function useKoperasiDetail() {
  const [kabupatenData, setKabupatenData] = useState<KabupatenStatistics[]>([])
  const [koperasiList, setKoperasiList] = useState<KoperasiDetailData[]>([])
  const [isLoadingDetail, setIsLoadingDetail] = useState(false)
  const [isLoadingKoperasiList, setIsLoadingKoperasiList] = useState(false)
  const [detailError, setDetailError] = useState<string | null>(null)
  const [koperasiListError, setKoperasiListError] = useState<string | null>(null)

  // Pagination states
  const [kabupatenPagination, setKabupatenPagination] = useState<PaginationState>({
    currentPage: 1,
    limit: 20,
    totalPages: 1,
    totalItems: 0
  })

  const [koperasiPagination, setKoperasiPagination] = useState<PaginationState>({
    currentPage: 1,
    limit: 20,
    totalPages: 1,
    totalItems: 0
  })

  // Fetch kabupaten data by province code with pagination
  const fetchKabupatenData = useCallback(async (
    provinceCode: string,
    page: number = 1,
    limit: number = 20,
    search?: string
  ) => {
    try {
      setIsLoadingDetail(true)
      setDetailError(null)

      const response = await koperasiAPI.getKabupatenByProvince(provinceCode, {
        pages: page,
        limit: limit,
        key_search: search || '',
        sort: 'asc'
      })

      setKabupatenData(response.data.data)

      // Update pagination based on API response
      const paginateInfo = response.data.paginate
      const totalItems = paginateInfo ? paginateInfo.total : response.data.data.length
      setKabupatenPagination({
        currentPage: page,
        limit: limit,
        totalPages: Math.ceil(totalItems / limit),
        totalItems: totalItems
      })

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Gagal memuat data kabupaten'
      console.error('Failed to fetch kabupaten data:', error)
      setDetailError(errorMessage)
      setKabupatenData([])
    } finally {
      setIsLoadingDetail(false)
    }
  }, [])

  // Fetch koperasi list by kabupaten code with pagination
  const fetchKoperasiByProvince = useCallback(async (
    provinceCode: string,
    kabupatenCode?: string,
    page: number = 1,
    limit: number = 20,
    search?: string
  ) => {
    try {
      setIsLoadingKoperasiList(true)
      setKoperasiListError(null)

      if (kabupatenCode) {
        const response = await koperasiAPI.getKoperasiByKabupaten(provinceCode, kabupatenCode, {
          pages: page,
          limit: limit,
          key_search: search || '',
          sort: 'asc'
        })

        console.log('Kabupaten Koperasi API Response:', response)

        // Handle KoperasiDetailResponse structure: response.data.data
        const dataArray = response.data.data || []
        setKoperasiList(dataArray)

        // Update pagination based on API response
        const paginateInfo = response.data.paginate
        const totalItems = paginateInfo ? paginateInfo.total : dataArray.length
        setKoperasiPagination({
          currentPage: page,
          limit: limit,
          totalPages: Math.ceil(totalItems / limit),
          totalItems: totalItems
        })

      } else {
        const response = await koperasiAPI.getKoperasiByProvince(provinceCode, {
          pages: page,
          limit: limit,
          key_search: search || '',
          sort: 'asc'
        })

        console.log('Province Koperasi API Response:', response)

        // Handle simple { data: KoperasiDetailData[] } structure
        const dataArray = response.data || []
        setKoperasiList(dataArray)

        // Update pagination - for province level, we don't have pagination info
        // So we assume all data is loaded on current page
        setKoperasiPagination({
          currentPage: page,
          limit: limit,
          totalPages: 1, // Since we don't have pagination info from province API
          totalItems: dataArray.length
        })
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Gagal memuat data koperasi'
      console.error('Failed to fetch koperasi list:', error)
      setKoperasiListError(errorMessage)
      setKoperasiList([])
    } finally {
      setIsLoadingKoperasiList(false)
    }
  }, [])

  // Refetch functions with pagination support
  const refetchKabupatenData = useCallback((provinceCode: string, page?: number, limit?: number, search?: string) => {
    const newPage = page ?? kabupatenPagination.currentPage
    const newLimit = limit ?? kabupatenPagination.limit
    fetchKabupatenData(provinceCode, newPage, newLimit, search)
  }, [fetchKabupatenData, kabupatenPagination])

  const refetchKoperasiData = useCallback((provinceCode: string, kabupatenCode?: string, page?: number, limit?: number, search?: string) => {
    const newPage = page ?? koperasiPagination.currentPage
    const newLimit = limit ?? koperasiPagination.limit
    fetchKoperasiByProvince(provinceCode, kabupatenCode, newPage, newLimit, search)
  }, [fetchKoperasiByProvince, koperasiPagination])

  // Clear kabupaten data
  const clearDetailData = useCallback(() => {
    setKabupatenData([])
    setDetailError(null)
    setKabupatenPagination({
      currentPage: 1,
      limit: 20,
      totalPages: 1,
      totalItems: 0
    })
  }, [])

  // Clear koperasi list data
  const clearKoperasiList = useCallback(() => {
    setKoperasiList([])
    setKoperasiListError(null)
    setKoperasiPagination({
      currentPage: 1,
      limit: 20,
      totalPages: 1,
      totalItems: 0
    })
  }, [])

  return {
    // Kabupaten data
    kabupatenData,
    isLoadingDetail,
    detailError,
    kabupatenPagination,
    fetchKabupatenData,
    refetchKabupatenData,
    clearDetailData,

    // Koperasi list data
    koperasiList,
    isLoadingKoperasiList,
    koperasiListError,
    koperasiPagination,
    fetchKoperasiByProvince,
    refetchKoperasiData,
    clearKoperasiList
  }
}
