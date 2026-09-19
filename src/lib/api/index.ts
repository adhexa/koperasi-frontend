import axios from 'axios'

// Create axios instance with base configuration
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:1000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Function to get auth token from localStorage (Zustand persistence)
const getAuthToken = () => {
  try {
    const authStorage = localStorage.getItem('auth-storage')
    if (authStorage) {
      const parsed = JSON.parse(authStorage)
      return parsed?.state?.token || null
    }
  } catch (error) {
    console.error('Error getting auth token:', error)
  }
  return null
}

// Request interceptor - automatically add auth token to all requests
api.interceptors.request.use(
  (config) => {
    console.log('🚀 API Request:', config.method?.toUpperCase(), config.url)

    // Automatically add auth token if available
    const token = getAuthToken()
    if (token) {
      config.headers['x-token'] = token
    }

    return config
  },
  (error) => {
    console.error('❌ API Request Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.config.url)
    return response
  },
  (error) => {
    console.error('❌ API Response Error:', error.response?.status, error.config?.url)

    // Handle 401 Unauthorized - clear auth and let components handle navigation
    if (error.response?.status === 401) {
      localStorage.removeItem('auth-storage')
      // Don't force navigation here - let components handle it via React Router
      // This prevents page refresh and allows proper SPA navigation
    }

    return Promise.reject(error)
  }
)

// Export types
export * from './types'

// Note: API modules are exported separately to avoid circular imports
// Import them like: import { authAPI } from '@/lib/api/auth'
