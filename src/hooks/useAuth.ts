import { useNavigate } from 'react-router-dom'
import { authAPI } from '../lib/api/auth'
import { useAuthStore } from '../store/useAuthStore'

export const useAuth = () => {
  const { token, refreshToken, user, isAuthenticated, expiresAt, logout } = useAuthStore()
  const navigate = useNavigate()

  // Check if token is expired
  const isTokenExpired = () => {
    if (!expiresAt) return false
    return Date.now() / 1000 > expiresAt
  }

  // Logout with cleanup
  const handleLogout = () => {
    logout()
    // Use React Router navigation instead of window.location to prevent page refresh
    navigate('/login')
  }

  // Validate token (optional - call when app starts)
  const validateToken = async () => {
    if (!token) return false

    // Check expiration first
    if (isTokenExpired()) {
      console.warn('Token is expired')
      handleLogout()
      return false
    }

    try {
      await authAPI.decodeToken()
      return true
    } catch (error) {
      console.error('Token validation failed:', error)
      handleLogout()
      return false
    }
  }

  return {
    token,
    refreshToken,
    user,
    isAuthenticated,
    expiresAt,
    isTokenExpired,
    logout: handleLogout,
    validateToken,
  }
}
