import { Header } from './Header'
import { Footer } from './Footer'
import { useAuth } from '@/hooks/useAuth'

interface LayoutProps {
  children: React.ReactNode
  showFooter?: boolean
}

export function Layout({ children, showFooter = true }: LayoutProps) {
  const { isAuthenticated, user, logout } = useAuth()

  // Transform the auth user to match Header props
  const headerUser = isAuthenticated && user ? {
    name: user.username,
    email: user.username, // use username as email since email field doesn't exist
  } : undefined

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={headerUser} onLogout={logout} />

      <main className="flex-1">
        {children}
      </main>

      {showFooter && <Footer />}
    </div>
  )
}
