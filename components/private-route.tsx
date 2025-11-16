'use client'

import { useRouter } from 'next/navigation'
import { useEffect, ReactNode } from 'react'
import { useAuth } from '@/components/auth-context'

interface PrivateRouteProps {
  children: ReactNode
  requiredRole?: 'user' | 'admin'
}

export function PrivateRoute({ children, requiredRole }: PrivateRouteProps) {
  const router = useRouter()
  const { user, loading, isAuthenticated } = useAuth()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login')
    } else if (!loading && requiredRole && user?.role !== requiredRole) {
      router.push('/dashboard')
    }
  }, [loading, isAuthenticated, user, requiredRole, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  if (requiredRole && user?.role !== requiredRole) {
    return null
  }

  return <>{children}</>
}
