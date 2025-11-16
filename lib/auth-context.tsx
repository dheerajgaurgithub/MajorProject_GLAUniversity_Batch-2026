'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { apiClient, AuthResponse, User } from './api-client'

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  signup: (name: string, email: string, password: string, age?: number) => Promise<AuthResponse>
  login: (email: string, password: string) => Promise<AuthResponse>
  logout: () => Promise<void>
  isAuthenticated: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('accessToken')
        if (token) {
          apiClient.setAccessToken(token)
          try {
            const userData = await apiClient.getProfile()
            setUser(userData)
          } catch (profileErr: any) {
            // Only clear tokens if it's an authentication error (401)
            if (profileErr.message?.includes('401') || profileErr.message?.includes('Unauthorized')) {
              localStorage.removeItem('accessToken')
              localStorage.removeItem('refreshToken')
              setUser(null)
            } else {
              // For other errors, keep the token but don't set user
              console.warn('Failed to fetch profile:', profileErr)
            }
          }
        }
      } catch (err) {
        console.error('Auth check error:', err)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    // Listen for storage changes (login from another tab or page)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'accessToken') {
        if (e.newValue) {
          // Token was set, re-check auth
          checkAuth()
        } else {
          // Token was cleared
          setUser(null)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const signup = async (name: string, email: string, password: string, age?: number): Promise<AuthResponse> => {
    try {
      setError(null)
      const response = await apiClient.signup(name, email, password, age)
      setUser(response.user)
      return response
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      setError(null)
      const response = await apiClient.login(email, password)
      setUser(response.user)
      return response
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const logout = async () => {
    try {
      await apiClient.logout()
      setUser(null)
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        signup,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
