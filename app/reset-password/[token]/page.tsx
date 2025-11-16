'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { useRouter, useParams } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Lock, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function ResetPasswordPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const params = useParams()
  const token = params.token as string

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password.length < 8) {
      setError(t.passwordMustContain)
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })

      if (response.ok) {
        setSubmitted(true)
        setTimeout(() => router.push('/login'), 3000)
      } else {
        setError('Failed to reset password. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-background to-card flex items-center justify-center">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            {submitted ? (
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <div className="flex justify-center mb-6">
                  <CheckCircle size={64} className="text-primary" />
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-3">
                  {t.passwordChanged}
                </h1>
                <p className="text-muted-foreground mb-6">
                  Your password has been successfully reset. You'll be redirected to login soon.
                </p>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-lg p-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {t.createNewPassword}
                </h1>
                <p className="text-muted-foreground mb-8">
                  Enter a new password for your account.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                      <Lock size={16} />
                      {t.createNewPassword}
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 8 characters"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <p className="text-xs text-muted-foreground mt-1">{t.passwordMustContain}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                      <Lock size={16} />
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {error && (
                    <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                      <p className="text-destructive text-sm">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors font-medium"
                  >
                    {loading ? 'Resetting...' : 'Reset Password'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
