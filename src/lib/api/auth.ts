import { api } from './index'
import type { ApiError, LoginRequest, LoginResponse, TokenDecodeResponse } from './types'

export const authAPI = {
  login: async (loginData: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>('/ndi/login', loginData)
      return response.data
    } catch (error: unknown) {
      const apiError = error as ApiError
      console.error('Login error:', apiError)
      throw new Error(apiError.response?.data?.message || 'Login failed')
    }
  },

  decodeToken: async (): Promise<TokenDecodeResponse> => {
    try {
      const response = await api.get<TokenDecodeResponse>('/ndi/detail-token')
      return response.data
    } catch (error: unknown) {
      const apiError = error as ApiError
      console.error('Token decode error:', apiError)
      throw new Error(apiError.response?.data?.message || 'Token validation failed')
    }
  }
}
