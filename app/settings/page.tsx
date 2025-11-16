'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { useTheme } from '@/lib/theme-provider'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { languages } from '@/lib/i18n'
import { ChevronRight, Moon, Sun, Globe, Lock, Bell } from 'lucide-react'
import Link from 'next/link'

export default function SettingsPage() {
  const { language, setLanguage, t } = useLanguage()
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [activeTab, setActiveTab] = useState('account')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  const settingsTabs = [
    { id: 'account', label: t.accountSettings, icon: Lock },
    { id: 'preferences', label: t.preferenceSettings, icon: Globe },
    { id: 'privacy', label: t.privacySettings, icon: Bell },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-background to-card">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-foreground mb-2">{t.settings}</h1>
              <p className="text-muted-foreground">{t.accountSettings}</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-8 border-b border-border">
              {settingsTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Settings Panel */}
              <div className="lg:col-span-2 space-y-6">
                {activeTab === 'account' && (
                  <div className="space-y-6">
                    {/* Theme Settings */}
                    <div className="bg-card border border-border rounded-lg p-6">
                      <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                        <Sun size={24} className="text-primary" />
                        {t.theme}
                      </h2>

                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Choose how you want the app to look
                        </p>

                        <div className="grid grid-cols-3 gap-4">
                          {['light', 'dark', 'system'].map((themeOption) => (
                            <button
                              key={themeOption}
                              onClick={() => setTheme(themeOption as any)}
                              className={`p-4 rounded-lg border-2 transition-all ${
                                theme === themeOption
                                  ? 'border-primary bg-primary/5'
                                  : 'border-border hover:border-primary/50'
                              }`}
                            >
                              <div className="flex items-center justify-center mb-2">
                                {themeOption === 'light' && <Sun size={32} className="text-yellow-500" />}
                                {themeOption === 'dark' && <Moon size={32} className="text-slate-700" />}
                                {themeOption === 'system' && <Globe size={32} className="text-slate-500" />}
                              </div>
                              <p className="font-medium capitalize">
                                {t[themeOption as keyof typeof t]}
                              </p>
                              {theme === themeOption && (
                                <p className="text-xs text-primary mt-2">✓ {t.active}</p>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Language Settings */}
                    <div className="bg-card border border-border rounded-lg p-6">
                      <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                        <Globe size={24} className="text-primary" />
                        {t.language}
                      </h2>

                      <div className="space-y-3">
                        {Object.entries(languages).map(([code, name]) => (
                          <button
                            key={code}
                            onClick={() => setLanguage(code as any)}
                            className={`w-full p-4 rounded-lg border transition-all flex items-center justify-between ${
                              language === code
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-primary/50 hover:bg-card'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold text-sm">
                                {code.toUpperCase()}
                              </div>
                              <span className="font-medium">{name}</span>
                            </div>
                            {language === code && (
                              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                                <span className="text-white text-sm">✓</span>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Profile Link */}
                    <div className="bg-card border border-border rounded-lg p-6">
                      <h2 className="text-2xl font-semibold text-foreground mb-4">{t.profile}</h2>
                      <Link
                        href="/profile"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                      >
                        {t.editProfile}
                        <ChevronRight size={18} />
                      </Link>
                    </div>
                  </div>
                )}

                {activeTab === 'preferences' && (
                  <div className="space-y-6">
                    <div className="bg-card border border-border rounded-lg p-6">
                      <h2 className="text-2xl font-semibold text-foreground mb-4">{t.notifications}</h2>
                      <div className="space-y-4">
                        <label className="flex items-center gap-3 cursor-pointer p-4 rounded-lg hover:bg-background transition-colors">
                          <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-muted-foreground">Receive updates about your reports</p>
                          </div>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer p-4 rounded-lg hover:bg-background transition-colors">
                          <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
                          <div>
                            <p className="font-medium">Admin Alerts</p>
                            <p className="text-sm text-muted-foreground">Receive important notifications from admins</p>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="bg-card border border-border rounded-lg p-6">
                      <h2 className="text-2xl font-semibold text-foreground mb-4">{t.sessions}</h2>
                      <button className="w-full px-4 py-3 border border-destructive text-destructive rounded-lg hover:bg-destructive/5 transition-colors font-medium">
                        {t.logoutAllDevices}
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'privacy' && (
                  <div className="space-y-6">
                    <div className="bg-card border border-border rounded-lg p-6">
                      <h2 className="text-2xl font-semibold text-foreground mb-4">{t.dataAndPrivacy}</h2>
                      <div className="space-y-3">
                        <button className="w-full px-4 py-3 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors font-medium">
                          {t.downloadData}
                        </button>
                        <button className="w-full px-4 py-3 border border-destructive text-destructive rounded-lg hover:bg-destructive/5 transition-colors font-medium">
                          {t.deleteAccount}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Links Sidebar */}
              <div className="space-y-4">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
                  <div className="space-y-2">
                    <Link
                      href="/profile"
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-background transition-colors"
                    >
                      <span className="text-sm">{t.profile}</span>
                      <ChevronRight size={16} />
                    </Link>
                    <Link
                      href="/security"
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-background transition-colors"
                    >
                      <span className="text-sm">{t.security}</span>
                      <ChevronRight size={16} />
                    </Link>
                    <Link
                      href="/help"
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-background transition-colors"
                    >
                      <span className="text-sm">Help & Support</span>
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-2">Pro Tip</h3>
                  <p className="text-sm text-muted-foreground">
                    Your preferences are saved automatically across all devices
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
