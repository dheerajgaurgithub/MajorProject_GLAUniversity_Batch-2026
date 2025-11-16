'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, X, LogOut, Heart, Settings, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<'user' | 'admin' | null>(null)
  const router = useRouter()

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserRole(null)
    localStorage.removeItem('token')
    router.push('/')
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* CHANGE: Enhanced logo with gradient colors */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-lg flex items-center justify-center group-hover:shadow-lg transition-all">
              <Heart size={20} className="text-white" />
            </div>
            <span className="font-bold text-lg hidden sm:inline bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              MediDetect
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/articles" className="text-gray-700 hover:text-cyan-600 transition font-medium">
              Articles
            </Link>
            <Link href="/upload" className="text-gray-700 hover:text-cyan-600 transition font-medium">
              Upload Report
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-cyan-600 transition font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-cyan-600 transition font-medium">
              Contact
            </Link>
          </div>

          {/* Auth Area - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <Link href="/dashboard" className="text-gray-700 hover:text-cyan-600 transition font-medium">
                  Dashboard
                </Link>
                {userRole === 'admin' && (
                  <Link href="/admin" className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:shadow-md transition">
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => router.push('/profile')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                  title="Profile"
                >
                  <User size={20} className="text-gray-700" />
                </button>
                <button
                  onClick={() => router.push('/settings')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                  title="Settings"
                >
                  <Settings size={20} className="text-gray-700" />
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 transition font-medium text-sm"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => router.push('/login')}
                  className="text-gray-700 hover:text-cyan-600 hover:bg-transparent"
                >
                  Login
                </Button>
                <Button onClick={() => router.push('/signup')} className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white">
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-gray-200 pt-4">
            <Link
              href="/articles"
              className="block px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 rounded-lg transition"
            >
              Articles
            </Link>
            <Link
              href="/upload"
              className="block px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 rounded-lg transition"
            >
              Upload Report
            </Link>
            <Link
              href="/about"
              className="block px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 rounded-lg transition"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 rounded-lg transition"
            >
              Contact
            </Link>
            {isLoggedIn && (
              <>
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 rounded-lg transition"
                >
                  Dashboard
                </Link>
                {userRole === 'admin' && (
                  <Link
                    href="/admin"
                    className="block px-4 py-2 text-cyan-600 font-medium hover:bg-cyan-50 rounded-lg transition"
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition font-medium"
                >
                  Logout
                </button>
              </>
            )}
            {!isLoggedIn && (
              <div className="flex gap-2 pt-4 px-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => router.push('/login')}
                >
                  Login
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600" onClick={() => router.push('/signup')}>
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
