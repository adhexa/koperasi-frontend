// Auth types
export interface LoginRequest {
  username: string
  password: string
  recaptcha_token: string
}

export interface LoginResponse {
  access_token: string
  expired_at: number
  issued_at: number
  message: string
  refresh_token: string
  status: boolean
}

export interface TokenDecodeResponse {
  username: string
  email?: string
  roles?: string[]
  iat?: number
  exp?: number
  [key: string]: unknown // Allow for additional properties
}

export interface ApiError {
  message: string
  status?: number
  response?: {
    data?: {
      message?: string
    }
  }
}

// Koperasi types
export interface KoperasiData {
  id?: number
  kode_desa: string
  nama_koperasi: string
  alamat: string
  pic: string
  tanggal_registrasi: string
  status_registrasi: number // 0=sosialisasi, 1=terbentuk, 2=pembuatan akta, 3=berbadan hukum
}

// Kabupaten-level statistics (what we actually get from the API)
export interface KabupatenStatistics {
  kode_kabupaten: string
  nama_kabupaten: string
  sosialisasi: number
  terbentuk: number
  berbadan_hukum: number
}

export interface KabupatenStatisticsResponse {
  message: string
  data: {
    data: KabupatenStatistics[]
    paginate: {
      total: number
      limit: number
      pages: number
    }
  }
}

// Detailed Koperasi types for desa-level drill-down (when implemented)
export interface KoperasiDetailData {
  id?: number
  kode_desa?: string
  nama_koperasi: string | null
  alamat?: string
  pic?: string
  tanggal_registrasi?: string
  status_registrasi?: number
  nama_desa: string | null
  nama_kecamatan: string
  nama_kabupaten: string
}

export interface KoperasiDetailResponse {
  message: string
  data: {
    data: KoperasiDetailData[]
    paginate: {
      total: number
      limit: number
      pages: number
    }
  }
}

// Koperasi Statistics API Response (provincial level)
export interface KoperasiStatistics {
  kode_provinsi: string
  nama_provinsi: string
  sosialisasi: number
  terbentuk: number
  berbadan_hukum: number
}

export interface KoperasiStatisticsResponse {
  message: string
  data: KoperasiStatistics[]
}

// Generic API types
export interface Post {
  id: number
  title: string
  body: string
  userId: number
}

export interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
}
