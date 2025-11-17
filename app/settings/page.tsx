'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { useTheme } from '@/lib/theme-provider'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { languages } from '@/lib/i18n'
import { ChevronRight, Moon, Sun, Globe, Lock, Bell, Download, Trash2, LogOut, HelpCircle, Shield, Check, Sparkles } from 'lucide-react'
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
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Decorative background elements */}
        <div className="fixed top-20 right-10 w-96 h-96 bg-gradient-to-br from-cyan-200/30 to-blue-200/30 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="fixed bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-pink-200/30 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container mx-auto px-4 py-8 sm:py-12 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 px-4 py-2 rounded-full mb-4 border border-cyan-200 dark:border-cyan-800/50">
                <Sparkles size={16} className="text-cyan-600 dark:text-cyan-400" />
                <span className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">Personalize Your Experience</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-3">
                {t.settings}
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
                Manage your account preferences and customize your MediDetect experience
              </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-8 border-b-2 border-slate-200 dark:border-slate-800 overflow-x-auto pb-px scrollbar-hide">
              {settingsTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 border-b-2 transition-all duration-300 whitespace-nowrap font-medium ${
                    activeTab === tab.id
                      ? 'border-cyan-600 dark:border-cyan-400 text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20 rounded-t-lg'
                      : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-t-lg'
                  }`}
                >
                  <tab.icon size={18} />
                  <span className="text-sm sm:text-base">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Main Settings Panel */}
              <div className="lg:col-span-2 space-y-6">
                {activeTab === 'account' && (
                  <div className="space-y-6">
                    {/* Theme Settings */}
                    <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 dark:from-yellow-500 dark:to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                          <Sun size={24} className="text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                            {t.theme}
                          </h2>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Choose your preferred appearance</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {['light', 'dark', 'system'].map((themeOption) => (
                          <button
                            key={themeOption}
                            onClick={() => {
                              console.log('[Settings] Theme button clicked:', themeOption, 'Current theme:', theme)
                              setTheme(themeOption as any)
                            }}
                            className={`group relative p-5 sm:p-6 rounded-xl border-2 transition-all duration-300 ${
                              theme === themeOption
                                ? 'border-cyan-500 dark:border-cyan-400 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 shadow-lg'
                                : 'border-slate-200 dark:border-slate-700 hover:border-cyan-300 dark:hover:border-cyan-600 hover:shadow-md bg-white dark:bg-slate-800/50'
                            }`}
                          >
                            {/* Checkmark badge */}
                            {theme === themeOption && (
                              <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                                <Check size={16} className="text-white" />
                              </div>
                            )}

                            <div className="flex flex-col items-center gap-3">
                              <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300 ${
                                theme === themeOption ? 'scale-110' : 'group-hover:scale-110'
                              } ${
                                themeOption === 'light' ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                                themeOption === 'dark' ? 'bg-gradient-to-br from-slate-700 to-slate-900' :
                                'bg-gradient-to-br from-blue-500 to-indigo-600'
                              } shadow-md`}>
                                {themeOption === 'light' && <Sun size={28} className="text-white" />}
                                {themeOption === 'dark' && <Moon size={28} className="text-white" />}
                                {themeOption === 'system' && <Globe size={28} className="text-white" />}
                              </div>
                              <p className="font-bold text-slate-900 dark:text-white capitalize text-sm sm:text-base">
                                {t[themeOption as keyof typeof t]}
                              </p>
                              {theme === themeOption && (
                                <p className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold">Active</p>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Language Settings */}
                    <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                          <Globe size={24} className="text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                            {t.language}
                          </h2>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Select your preferred language</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {Object.entries(languages).map(([code, name]) => (
                          <button
                            key={code}
                            onClick={() => setLanguage(code as any)}
                            className={`w-full p-4 sm:p-5 rounded-xl border-2 transition-all duration-300 flex items-center justify-between ${
                              language === code
                                ? 'border-cyan-500 dark:border-cyan-400 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 shadow-md'
                                : 'border-slate-200 dark:border-slate-700 hover:border-cyan-300 dark:hover:border-cyan-600 hover:shadow-md bg-white dark:bg-slate-800/50'
                            }`}
                          >
                            <div className="flex items-center gap-3 sm:gap-4">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold shadow-md ${
                                language === code 
                                  ? 'bg-gradient-to-br from-cyan-500 to-blue-600 scale-110' 
                                  : 'bg-gradient-to-br from-slate-400 to-slate-600'
                              } transition-transform duration-300`}>
                                {code.toUpperCase()}
                              </div>
                              <span className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">{name}</span>
                            </div>
                            {language === code && (
                              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                                <Check size={16} className="text-white" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Profile Link */}
                    <div className="bg-gradient-to-br from-cyan-500 to-blue-600 dark:from-cyan-600 dark:to-blue-700 border-2 border-cyan-400 dark:border-cyan-500 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-white">
                      <h2 className="text-xl sm:text-2xl font-bold mb-3">{t.profile}</h2>
                      <p className="text-cyan-100 dark:text-cyan-200 mb-5 text-sm sm:text-base">Update your personal information and preferences</p>
                      <Link
                        href="/profile"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-cyan-600 rounded-xl hover:bg-cyan-50 transition-all duration-300 font-semibold shadow-md hover:shadow-lg hover:scale-105 text-sm sm:text-base"
                      >
                        {t.editProfile}
                        <ChevronRight size={18} />
                      </Link>
                    </div>
                  </div>
                )}

                {activeTab === 'preferences' && (
                  <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                          <Bell size={24} className="text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{t.notifications}</h2>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Manage your notification preferences</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="flex items-start gap-4 cursor-pointer p-4 sm:p-5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-300 border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                          <input type="checkbox" defaultChecked className="mt-1 w-5 h-5 rounded accent-cyan-600" />
                          <div className="flex-1">
                            <p className="font-semibold text-slate-900 dark:text-white">Email Notifications</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Receive updates about your reports and results</p>
                          </div>
                        </label>
                        <label className="flex items-start gap-4 cursor-pointer p-4 sm:p-5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-300 border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                          <input type="checkbox" defaultChecked className="mt-1 w-5 h-5 rounded accent-cyan-600" />
                          <div className="flex-1">
                            <p className="font-semibold text-slate-900 dark:text-white">Admin Alerts</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Receive important notifications from administrators</p>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                          <LogOut size={24} className="text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{t.sessions}</h2>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Manage active sessions across devices</p>
                        </div>
                      </div>
                      <button className="w-full px-6 py-4 border-2 border-red-500 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 font-semibold hover:shadow-md text-sm sm:text-base">
                        {t.logoutAllDevices}
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'privacy' && (
                  <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                          <Shield size={24} className="text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{t.dataAndPrivacy}</h2>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Control your data and privacy settings</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <button className="w-full flex items-center justify-center gap-3 px-6 py-4 border-2 border-cyan-500 text-cyan-600 dark:text-cyan-400 rounded-xl hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-all duration-300 font-semibold hover:shadow-md text-sm sm:text-base">
                          <Download size={20} />
                          {t.downloadData}
                        </button>
                        <button className="w-full flex items-center justify-center gap-3 px-6 py-4 border-2 border-red-500 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 font-semibold hover:shadow-md text-sm sm:text-base">
                          <Trash2 size={20} />
                          {t.deleteAccount}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Links Sidebar */}
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-base sm:text-lg">Quick Links</h3>
                  <div className="space-y-2">
                    <Link
                      href="/profile"
                      className="flex items-center justify-between p-3 sm:p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-300 border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-700 group"
                    >
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400">{t.profile}</span>
                      <ChevronRight size={16} className="text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      href="/security"
                      className="flex items-center justify-between p-3 sm:p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-300 border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-700 group"
                    >
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400">{t.security}</span>
                      <ChevronRight size={16} className="text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      href="/help"
                      className="flex items-center justify-between p-3 sm:p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-300 border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-700 group"
                    >
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400">Help & Support</span>
                      <ChevronRight size={16} className="text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border-2 border-cyan-200 dark:border-cyan-800/50 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                      <HelpCircle size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">Pro Tip</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        Your preferences are saved automatically and synced across all your devices
                      </p>
                    </div>
                  </div>
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