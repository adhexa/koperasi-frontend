import { LoginForm } from '../components/LoginForm'
import { useNavigate } from 'react-router-dom'
import { authAPI } from '../lib/api/auth'
import { useAuthStore } from '../store/useAuthStore'

export function LoginPage() {
  const navigate = useNavigate()
  const { login, setLoading, isLoading, setError } = useAuthStore()

  const handleLogin = async (data: { emailOrUsername: string; password: string; recaptchaToken: string }) => {
    console.log("Login attempt:", data)
    setLoading(true)

    try {
      // Call the actual API
      const loginResponse = await authAPI.login({
        username: data.emailOrUsername,
        password: data.password,
        recaptcha_token: data.recaptchaToken
      })

      console.log('Login response:', loginResponse)

      // Handle successful login using Zustand store
      if (loginResponse && loginResponse.status) {
        // Store in Zustand (which will also persist to localStorage)
        login(loginResponse, data.emailOrUsername)

        // Navigate to home page
        navigate('/home')
      } else {
        throw new Error(loginResponse.message || 'Login failed')
      }
    } catch (error: unknown) {
      const apiError = error as Error
      console.error('Login error:', apiError)
      setError(apiError.message || 'Login failed. Please try again.')
      setLoading(false) // Only set loading false on error, success is handled by login action
    }
  }

  return (
    <div className="w-full">
      <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
    </div>
  )
}
