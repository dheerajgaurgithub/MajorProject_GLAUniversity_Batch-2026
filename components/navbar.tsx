'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, X, LogOut, Settings, User, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    router.push('/')
    setShowUserMenu(false)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center group relative">
            <div className="w-32 sm:w-40 h-20 sm:h-24 overflow-hidden transition-transform duration-300 group-hover:scale-105">
              <img src="/logo.png" alt="MediDetect Logo" className="w-full h-full object-cover" />
            </div>
            {/* Decorative glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg blur-xl"></div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            <Link 
              href="/articles" 
              className="relative px-4 py-2 text-slate-700 dark:text-slate-300 font-medium hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 dark:hover:from-cyan-900/20 dark:hover:to-blue-900/20 group"
            >
              Articles
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-3/4 transition-all duration-300"></span>
            </Link>
            <Link 
              href="/upload" 
              className="relative px-4 py-2 text-slate-700 dark:text-slate-300 font-medium hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 dark:hover:from-cyan-900/20 dark:hover:to-blue-900/20 group"
            >
              Upload
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-3/4 transition-all duration-300"></span>
            </Link>
            <Link 
              href="/about" 
              className="relative px-4 py-2 text-slate-700 dark:text-slate-300 font-medium hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 dark:hover:from-cyan-900/20 dark:hover:to-blue-900/20 group"
            >
              About
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-3/4 transition-all duration-300"></span>
            </Link>
            <Link 
              href="/contact" 
              className="relative px-4 py-2 text-slate-700 dark:text-slate-300 font-medium hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 dark:hover:from-cyan-900/20 dark:hover:to-blue-900/20 group"
            >
              Contact
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-3/4 transition-all duration-300"></span>
            </Link>
          </div>

          {/* Auth Area - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link 
                  href="/dashboard" 
                  className="px-4 py-2 text-slate-700 dark:text-slate-300 font-medium hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 dark:hover:from-cyan-900/20 dark:hover:to-blue-900/20"
                >
                  Dashboard
                </Link>
                {user?.role === 'admin' && (
                  <Link 
                    href="/admin" 
                    className="px-4 py-2 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 text-amber-600 dark:text-amber-400 font-semibold rounded-xl hover:from-amber-100 hover:to-orange-100 dark:hover:from-amber-900/50 dark:hover:to-orange-900/50 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md border border-amber-200 dark:border-amber-800/50"
                  >
                    Admin
                  </Link>
                )}
                
                {/* User Menu Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-3 py-2 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-300 border-2 border-transparent hover:border-cyan-200 dark:hover:border-cyan-800"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md">
                      {user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <ChevronDown size={16} className={`transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 py-2 animate-slide-in-down z-50">
                      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{user?.name || 'User'}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                      </div>
                      <Link
                        href="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-200"
                      >
                        <User size={18} className="text-cyan-500" />
                        <span className="text-sm font-medium">Profile</span>
                      </Link>
                      <Link
                        href="/settings"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-200"
                      >
                        <Settings size={18} className="text-cyan-500" />
                        <span className="text-sm font-medium">Settings</span>
                      </Link>
                      <div className="border-t border-slate-200 dark:border-slate-700 mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                        >
                          <LogOut size={18} />
                          <span className="text-sm font-medium">Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => router.push('/login')}
                  className="text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 dark:hover:from-cyan-900/20 dark:hover:to-blue-900/20 font-medium rounded-xl transition-all duration-300"
                >
                  Login
                </Button>
                <Button 
                  onClick={() => router.push('/signup')} 
                  className="bg-gradient-to-r from-cyan-500 via-cyan-600 to-blue-600 hover:from-cyan-600 hover:via-blue-600 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-xl border-2 border-cyan-400/20"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2.5 text-slate-600 dark:text-slate-400 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 dark:hover:from-cyan-900/20 dark:hover:to-blue-900/20 rounded-xl transition-all duration-300 border-2 border-transparent hover:border-cyan-200 dark:hover:border-cyan-800"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 space-y-2 border-t border-slate-200 dark:border-slate-800 pt-4 animate-slide-in-down">
            <Link 
              href="/articles" 
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-slate-700 dark:text-slate-300 font-medium hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 dark:hover:from-cyan-900/20 dark:hover:to-blue-900/20 rounded-xl transition-all duration-300 border border-transparent hover:border-cyan-200 dark:hover:border-cyan-800"
            >
              Articles
            </Link>
            <Link 
              href="/upload" 
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-slate-700 dark:text-slate-300 font-medium hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 dark:hover:from-cyan-900/20 dark:hover:to-blue-900/20 rounded-xl transition-all duration-300 border border-transparent hover:border-cyan-200 dark:hover:border-cyan-800"
            >
              Upload Report
            </Link>
            <Link 
              href="/about" 
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-slate-700 dark:text-slate-300 font-medium hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 dark:hover:from-cyan-900/20 dark:hover:to-blue-900/20 rounded-xl transition-all duration-300 border border-transparent hover:border-cyan-200 dark:hover:border-cyan-800"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-slate-700 dark:text-slate-300 font-medium hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 dark:hover:from-cyan-900/20 dark:hover:to-blue-900/20 rounded-xl transition-all duration-300 border border-transparent hover:border-cyan-200 dark:hover:border-cyan-800"
            >
              Contact
            </Link>
            
            {isAuthenticated && (
              <>
                <div className="border-t border-slate-200 dark:border-slate-800 my-2 pt-2">
                  {/* User Info Card */}
                  <div className="mx-4 mb-3 p-3 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl border border-cyan-200 dark:border-cyan-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                        {user?.name?.[0]?.toUpperCase() || 'U'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{user?.name || 'User'}</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400 truncate">{user?.email}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Link 
                  href="/dashboard" 
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-slate-700 dark:text-slate-300 font-medium hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 dark:hover:from-cyan-900/20 dark:hover:to-blue-900/20 rounded-xl transition-all duration-300 border border-transparent hover:border-cyan-200 dark:hover:border-cyan-800"
                >
                  Dashboard
                </Link>
                {user?.role === 'admin' && (
                  <Link 
                    href="/admin" 
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-amber-600 dark:text-amber-400 font-semibold bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 hover:from-amber-100 hover:to-orange-100 dark:hover:from-amber-900/50 dark:hover:to-orange-900/50 rounded-xl transition-all duration-300 border border-amber-200 dark:border-amber-800"
                  >
                    Admin Panel
                  </Link>
                )}
                <Link 
                  href="/profile" 
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-slate-700 dark:text-slate-300 font-medium hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 dark:hover:from-cyan-900/20 dark:hover:to-blue-900/20 rounded-xl transition-all duration-300 border border-transparent hover:border-cyan-200 dark:hover:border-cyan-800"
                >
                  Profile
                </Link>
                <Link 
                  href="/settings" 
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-slate-700 dark:text-slate-300 font-medium hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 dark:hover:from-cyan-900/20 dark:hover:to-blue-900/20 rounded-xl transition-all duration-300 border border-transparent hover:border-cyan-200 dark:hover:border-cyan-800"
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    handleLogout()
                    setIsOpen(false)
                  }}
                  className="w-full text-left px-4 py-3 text-red-600 dark:text-red-500 font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-300 border border-transparent hover:border-red-200 dark:hover:border-red-800"
                >
                  Logout
                </button>
              </>
            )}
            
            {!isAuthenticated && (
              <div className="flex gap-3 pt-3 px-4">
                <Button 
                  variant="outline" 
                  className="flex-1 rounded-xl border-2 hover:border-cyan-300 dark:hover:border-cyan-700 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 dark:hover:from-cyan-900/20 dark:hover:to-blue-900/20 transition-all duration-300" 
                  onClick={() => {
                    router.push('/login')
                    setIsOpen(false)
                  }}
                >
                  Login
                </Button>
                <Button 
                  className="flex-1 bg-gradient-to-r from-cyan-500 via-cyan-600 to-blue-600 hover:from-cyan-600 hover:via-blue-600 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl rounded-xl transition-all duration-300" 
                  onClick={() => {
                    router.push('/signup')
                    setIsOpen(false)
                  }}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}