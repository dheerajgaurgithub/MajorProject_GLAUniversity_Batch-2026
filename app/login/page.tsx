'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Mail, Lock, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Mock login - in production, call your backend API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Login failed')
      }

      const { token, user } = await response.json()
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      
      // Redirect based on role
      if (user.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/dashboard')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mx-auto mb-4">
              <Lock size={24} />
            </div>
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p className="text-muted-foreground mt-2">Sign in to your MediDetect account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
              <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <div className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg focus-within:ring-2 focus-within:ring-primary">
                <Mail size={18} className="text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="flex-1 bg-transparent outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg focus-within:ring-2 focus-within:ring-primary">
                <Lock size={18} className="text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="flex-1 bg-transparent outline-none"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Don't have an account?{' '}
              <Link href="/signup" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>

          {/* Test Credentials */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm">
            <p className="font-medium text-blue-900 mb-2">Demo Credentials:</p>
            <p className="text-blue-700">Email: studentbatch2026@gmail.com</p>
            <p className="text-blue-700">Password: gla@2026</p>
          </div>
        </Card>
      </main>
      <Footer />
    </>
  )
}
