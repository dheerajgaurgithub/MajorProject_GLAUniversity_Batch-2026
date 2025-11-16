import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/lib/auth-context'
import { ThemeProvider } from '@/lib/theme-provider'
import { LanguageProvider } from '@/lib/language-context'

const geistSans = Geist({ subsets: ['latin'] })
const geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MediDetect - AI Cancer Risk Assessment',
  description: 'Advanced AI-powered cancer risk detection and awareness platform. Upload medical data and get instant predictions with expert insights.',
  keywords: 'cancer detection, AI diagnosis, medical prediction, health screening',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/logo.png', sizes: '32x32' },
      { url: '/logo.png', sizes: '64x64' },
      { url: '/logo.png', sizes: '128x128' },
      { url: '/logo.png', sizes: '256x256' },
    ],
    shortcut: '/logo.png',
    apple: [
      { url: '/logo.png', sizes: '180x180' },
    ],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100`}>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
