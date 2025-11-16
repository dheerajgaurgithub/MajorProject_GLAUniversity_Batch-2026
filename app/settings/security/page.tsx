'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Lock, Shield, AlertCircle } from 'lucide-react'

export default function SecurityPage() {
  const { t } = useLanguage()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Add password change logic here
    setTimeout(() => {
      setLoading(false)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    }, 1000)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-background to-card">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
                <Shield size={32} className="text-primary" />
                {t.security}
              </h1>
              <p className="text-muted-foreground">Manage your account security</p>
            </div>

            {/* Change Password Section */}
            <div className="bg-card border border-border rounded-lg p-8 mb-6">
              <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <Lock size={24} className="text-primary" />
                {t.changePassword}
              </h2>

              <form onSubmit={handleChangePassword} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t.createNewPassword}
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">{t.passwordMustContain}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors font-medium"
                >
                  {loading ? 'Updating...' : t.changePassword}
                </button>
              </form>
            </div>

            {/* Two-Factor Authentication */}
            <div className="bg-card border border-border rounded-lg p-8 mb-6">
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t.enableTwoFactor}</h2>
              <p className="text-muted-foreground mb-4">Add an extra layer of security to your account</p>
              <button className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors font-medium">
                Enable 2FA
              </button>
            </div>

            {/* Active Sessions */}
            <div className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t.sessions}</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-background">
                  <div>
                    <p className="font-medium">Current Device</p>
                    <p className="text-sm text-muted-foreground">Chrome on Windows</p>
                  </div>
                  <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">Active</span>
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
