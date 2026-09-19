import { api } from './index'
import type { ApiError, KabupatenStatisticsResponse, KoperasiData, KoperasiDetailData, KoperasiDetailResponse, KoperasiStatisticsResponse } from './types'

// Add missing type for create response
interface CreateKoperasiResponse {
  message: string
  status: boolean
  data?: unknown
}

export const koperasiAPI = {
  getKoperasi: async (): Promise<KoperasiData[]> => {
    try {
      const response = await api.get<KoperasiData[]>('/ndi/koperasi')
      return response.data
    } catch (error: unknown) {
      const apiError = error as ApiError
      console.error('Get koperasi error:', apiError)
      throw new Error(apiError.response?.data?.message || 'Failed to fetch koperasi data')
    }
  },

  getKoperasiStatistics: async (
    options?: {
      pages?: number
      limit?: number
      key_search?: string
      sort?: 'asc' | 'desc'
    }
  ): Promise<KoperasiStatisticsResponse> => {
    try {
      const params = new URLSearchParams()

      // Always append the parameters, even if empty
      params.append('pages', options?.pages?.toString() || '')
      params.append('limit', options?.limit?.toString() || '')
      params.append('key_search', options?.key_search || '')
      params.append('sort', options?.sort || 'asc')

      const queryString = params.toString()
      const url = `/ndi/koperasi?${queryString}`

      const response = await api.get<KoperasiStatisticsResponse>(url)
      return response.data
    } catch (error: unknown) {
      const apiError = error as ApiError
      console.error('Get koperasi statistics error:', apiError)
      throw new Error(apiError.response?.data?.message || 'Failed to fetch koperasi statistics')
    }
  },

  // Get detailed koperasi list by province
  getKoperasiByProvince: async (
    provinceCode: string,
    options?: {
      pages?: number
      limit?: number
      key_search?: string
      sort?: 'asc' | 'desc'
    }
  ): Promise<{ data: KoperasiDetailData[] }> => {
    try {
      // First approach: try the province-specific endpoint with different query params
      const params = new URLSearchParams()
      if (options?.pages) params.append('pages', options.pages.toString())
      if (options?.limit) params.append('limit', options.limit.toString())
      if (options?.key_search) params.append('key_search', options.key_search)
      if (options?.sort) params.append('sort', options.sort)

      // Add a parameter to indicate we want koperasi data, not kabupaten statistics
      params.append('type', 'koperasi')

      const queryString = params.toString()
      const url = `/ndi/koperasi/${provinceCode}?${queryString}`

      console.log('Attempting koperasi API call to:', url)
      const response = await api.get<KoperasiDetailResponse>(url)
      console.log('Koperasi API raw response:', response)

      // Handle different possible response structures
      let koperasiData: KoperasiDetailData[] = []

      if (Array.isArray(response.data)) {
        koperasiData = response.data
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        koperasiData = response.data.data
      } else if (response.data?.message) {
        // If we get a message, it might mean this endpoint doesn't return koperasi data
        console.warn('API returned message instead of data:', response.data.message)
        throw new Error(response.data.message || 'Endpoint tidak mengembalikan data koperasi')
      }

      return { data: koperasiData }
    } catch (error: unknown) {
      const apiError = error as ApiError
      console.error('Get koperasi by province error:', apiError)

      // If the first approach fails, try the base endpoint and filter (fallback)
      try {
        console.log('Falling back to base koperasi endpoint and filtering...')
        const allKoperasiResponse = await api.get<KoperasiData[]>('/ndi/koperasi')

        // Filter by province code (assuming kode_desa starts with province code)
        const filteredKoperasi = allKoperasiResponse.data.filter((koperasi: KoperasiData) =>
          koperasi.kode_desa?.startsWith(provinceCode)
        )

        // Transform KoperasiData to KoperasiDetailData format
        const transformedData: KoperasiDetailData[] = filteredKoperasi.map((koperasi: KoperasiData) => ({
          id: koperasi.id,
          kode_desa: koperasi.kode_desa,
          nama_koperasi: koperasi.nama_koperasi,
          alamat: koperasi.alamat,
          pic: koperasi.pic,
          tanggal_registrasi: koperasi.tanggal_registrasi,
          status_registrasi: koperasi.status_registrasi,
          nama_desa: null, // Not available in base data
          nama_kecamatan: '', // Not available in base data
          nama_kabupaten: '' // Not available in base data
        }))

        return { data: transformedData }
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError)
        throw new Error(apiError.response?.data?.message || 'Gagal memuat data koperasi untuk provinsi ini')
      }
    }
  },

  // Get kabupaten-level statistics by province
  getKabupatenByProvince: async (
    provinceCode: string,
    options?: {
      pages?: number
      limit?: number
      key_search?: string
      sort?: 'asc' | 'desc'
    }
  ): Promise<KabupatenStatisticsResponse> => {
    try {
      const params = new URLSearchParams()
      if (options?.pages) params.append('pages', options.pages.toString())
      if (options?.limit) params.append('limit', options.limit.toString())
      if (options?.key_search) params.append('key_search', options.key_search)
      if (options?.sort) params.append('sort', options.sort)

      const queryString = params.toString()
      const url = `/ndi/koperasi/${provinceCode}${queryString ? `?${queryString}` : ''}`

      const response = await api.get<KabupatenStatisticsResponse>(url)
      return response.data
    } catch (error: unknown) {
      const apiError = error as ApiError
      console.error('Get kabupaten by province error:', apiError)
      throw new Error(apiError.response?.data?.message || 'Failed to fetch kabupaten data by province')
    }
  },

  // Get detailed koperasi data by kabupaten (desa level)
  getKoperasiByKabupaten: async (
    provinceCode: string,
    kabupatenCode: string,
    options?: {
      pages?: number
      limit?: number
      key_search?: string
      sort?: 'asc' | 'desc'
    }
  ): Promise<KoperasiDetailResponse> => {
    try {
      const params = new URLSearchParams()
      if (options?.pages) params.append('pages', options.pages.toString())
      if (options?.limit) params.append('limit', options.limit.toString())
      if (options?.key_search) params.append('key_search', options.key_search)
      if (options?.sort) params.append('sort', options.sort)

      const queryString = params.toString()
      const url = `/ndi/koperasi/${provinceCode}/${kabupatenCode}${queryString ? `?${queryString}` : ''}`

      const response = await api.get<KoperasiDetailResponse>(url)
      return response.data
    } catch (error: unknown) {
      const apiError = error as ApiError
      console.error('Get koperasi by kabupaten error:', apiError)
      throw new Error(apiError.response?.data?.message || 'Failed to fetch koperasi data by kabupaten')
    }
  },

  createKoperasi: async (koperasiData: KoperasiData[]): Promise<CreateKoperasiResponse> => {
    try {
      const response = await api.post<CreateKoperasiResponse>('/ndi/koperasi', koperasiData)
      return response.data
    } catch (error: unknown) {
      const apiError = error as ApiError
      console.error('Create koperasi error:', apiError)
      throw new Error(apiError.response?.data?.message || 'Failed to create koperasi')
    }
  }
}
