'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/lib/language-context'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Shield, Mail, Phone, MapPin, Edit2, Save } from 'lucide-react'
import Link from 'next/link'

interface AdminProfile {
  id: string
  name: string
  email: string
  phone?: string
  location?: string
  adminLevel: 'super_admin' | 'admin' | 'moderator'
  joinDate: string
  totalUsers: number
  totalReports: number
}

export default function AdminProfilePage() {
  const { t } = useLanguage()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<AdminProfile | null>(null)
  const [formData, setFormData] = useState<AdminProfile | null>(null)

  useEffect(() => {
    // Fetch admin profile
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('authToken')
        const response = await fetch('/api/admin/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        if (response.ok) {
          const data = await response.json()
          setProfile(data)
          setFormData(data)
        }
      } catch (error) {
        console.error('Failed to fetch admin profile:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => prev ? { ...prev, [name]: value } : null)
  }

  const handleSave = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('authToken')
      const response = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const updatedProfile = await response.json()
        setProfile(updatedProfile)
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Failed to update profile:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-b from-background to-card flex items-center justify-center">
          <p>{t.loading}</p>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-background to-card">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-12">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
                  <Shield size={32} className="text-primary" />
                  {t.profile} - Admin
                </h1>
                <p className="text-muted-foreground">Manage your admin account</p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                {isEditing ? 'Cancel' : <>
                  <Edit2 size={18} />
                  {t.edit}
                </>}
              </button>
            </div>

            {/* Admin Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-muted-foreground text-sm mb-2">Total Users</p>
                <p className="text-4xl font-bold text-primary">{profile?.totalUsers || 0}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-muted-foreground text-sm mb-2">Total Reports</p>
                <p className="text-4xl font-bold text-accent">{profile?.totalReports || 0}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-muted-foreground text-sm mb-2">Admin Level</p>
                <p className="text-2xl font-bold text-foreground capitalize">{profile?.adminLevel.replace('_', ' ')}</p>
              </div>
            </div>

            {/* Admin Profile Form */}
            <div className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">{t.accountSettings}</h2>

              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData?.name || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  ) : (
                    <p className="px-4 py-3 rounded-lg bg-background text-foreground">{profile?.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    <Mail size={16} />
                    {t.email}
                  </label>
                  <p className="px-4 py-3 rounded-lg bg-background text-foreground">{profile?.email}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    <Phone size={16} />
                    {t.phone}
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData?.phone || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  ) : (
                    <p className="px-4 py-3 rounded-lg bg-background text-foreground">{profile?.phone || 'Not provided'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    <MapPin size={16} />
                    {t.location}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={formData?.location || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  ) : (
                    <p className="px-4 py-3 rounded-lg bg-background text-foreground">{profile?.location || 'Not provided'}</p>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="flex gap-4">
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors font-medium"
                  >
                    <Save size={18} />
                    {loading ? 'Saving...' : t.save}
                  </button>
                </div>
              )}
            </div>

            {/* Quick Links */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                href="/admin"
                className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors"
              >
                <h3 className="font-semibold text-foreground mb-2">{t.adminDashboard}</h3>
                <p className="text-sm text-muted-foreground">Manage users, reports, and content</p>
              </Link>
              <Link
                href="/settings"
                className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors"
              >
                <h3 className="font-semibold text-foreground mb-2">{t.settings}</h3>
                <p className="text-sm text-muted-foreground">Manage your preferences and security</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
