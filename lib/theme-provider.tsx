'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: 'light' | 'dark'
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize theme synchronously from localStorage
  const getInitialTheme = (): Theme => {
    if (typeof window === 'undefined') return 'system'
    try {
      const stored = localStorage.getItem('theme') as Theme | null
      if (stored && ['light', 'dark', 'system'].includes(stored)) return stored
    } catch (e) {
      // ignore
    }
    return 'system'
  }

  const getInitialResolvedTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light'
    try {
      const theme = getInitialTheme()
      if (theme === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      }
      return theme as 'light' | 'dark'
    } catch (e) {
      return 'light'
    }
  }

  const [theme, setThemeState] = useState<Theme>(getInitialTheme)
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(getInitialResolvedTheme)

  // Apply theme to DOM whenever theme or resolvedTheme changes
  useEffect(() => {
    const currentResolvedTheme = theme === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : theme

    setResolvedTheme(currentResolvedTheme)
    
    // Update HTML class immediately
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(currentResolvedTheme)
    
    console.log('[Theme] Applied:', currentResolvedTheme, 'HTML class:', document.documentElement.className)
  }, [theme])

  // Listen for system preference changes when theme is 'system'
  useEffect(() => {
    if (theme !== 'system') return

    const handleSystemThemeChange = () => {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const newTheme = isDark ? 'dark' : 'light'
      setResolvedTheme(newTheme)
      document.documentElement.classList.remove('light', 'dark')
      document.documentElement.classList.add(newTheme)
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', handleSystemThemeChange)
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange)
  }, [theme])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    try {
      localStorage.setItem('theme', newTheme)
    } catch (e) {
      // ignore
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
