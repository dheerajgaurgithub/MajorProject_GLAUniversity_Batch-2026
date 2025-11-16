'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { apiClient, AuthResponse, User } from './api-client'

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  signup: (name: string, email: string, password: string, age?: number) => Promise<void>
  login: (email: string, password: string) => Promise<void>
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
          const userData = await apiClient.getProfile()
          setUser(userData)
        }
      } catch (err) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const signup = async (name: string, email: string, password: string, age?: number) => {
    try {
      setError(null)
      const response = await apiClient.signup(name, email, password, age)
      setUser(response.user)
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const login = async (email: string, password: string) => {
    try {
      setError(null)
      const response = await apiClient.login(email, password)
      setUser(response.user)
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
