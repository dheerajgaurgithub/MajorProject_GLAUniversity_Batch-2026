'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Language, translations, Translations } from './i18n'

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Initialize language from localStorage synchronously on the client
  const getInitialLanguage = (): Language => {
    if (typeof window === 'undefined') return 'en'
    try {
      const stored = localStorage.getItem('language') as Language | null
      if (stored && stored in translations) return stored
    } catch (e) {
      // ignore
    }
    return 'en'
  }

  const [language, setLanguageState] = useState<Language>(getInitialLanguage)

  useEffect(() => {
    // keep localStorage in sync if language changes
    try {
      localStorage.setItem('language', language)
    } catch (e) {
      // ignore
    }
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
