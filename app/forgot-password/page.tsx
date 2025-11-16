'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Mail, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        setError('Failed to send reset link. Please try again.')
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
                  {t.resetLinkSent}
                </h1>
                <p className="text-muted-foreground mb-6">
                  Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder.
                </p>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  Back to Login
                  <ArrowRight size={18} />
                </Link>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-lg p-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">{t.forgotPassword}</h1>
                <p className="text-muted-foreground mb-8">
                  Enter your email address and we'll send you a link to reset your password.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                      <Mail size={16} />
                      {t.email}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
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
                    className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    {loading ? 'Sending...' : 'Send Reset Link'}
                    <ArrowRight size={18} />
                  </button>

                  <div className="text-center pt-4 border-t border-border">
                    <p className="text-muted-foreground text-sm">
                      Remember your password?{' '}
                      <Link href="/login" className="text-primary hover:underline font-medium">
                        Sign in
                      </Link>
                    </p>
                  </div>
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
