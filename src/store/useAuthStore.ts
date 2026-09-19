import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { LoginResponse } from '../lib/api/types'

interface User {
  username: string
  // Add more user fields as needed from token decode response
}

interface AuthState {
  // State
  token: string | null
  refreshToken: string | null
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  expiresAt: number | null
  error: string | null

  // Actions
  login: (response: LoginResponse, username: string) => void
  logout: () => void
  setLoading: (loading: boolean) => void
  setUser: (user: User) => void
  setError: (error: string | null) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Initial state
      token: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      expiresAt: null,
      error: null,

      // Actions
      login: (response: LoginResponse, username: string) => {
        console.log('Login response in store:', response)

        set({
          token: response.access_token,
          refreshToken: response.refresh_token,
          user: { username },
          isAuthenticated: !!response.access_token,
          isLoading: false,
          expiresAt: response.expired_at,
          error: null,
        })
      },

      logout: () => {
        set({
          token: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
          isLoading: false,
          expiresAt: null,
          error: null,
        })
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading })
      },

      setUser: (user: User) => {
        set({ user })
      },

      setError: (error: string | null) => {
        set({ error })
      },
    }),
    {
      name: 'auth-storage', // localStorage key
      partialize: (state) => ({
        token: state.token,
        refreshToken: state.refreshToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        expiresAt: state.expiresAt,
      }),
    }
  )
)
