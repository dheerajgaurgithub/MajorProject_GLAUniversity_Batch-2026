'use client'

import { ThemeProvider as CustomThemeProvider } from '@/lib/theme-provider'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <CustomThemeProvider>{children}</CustomThemeProvider>
}
