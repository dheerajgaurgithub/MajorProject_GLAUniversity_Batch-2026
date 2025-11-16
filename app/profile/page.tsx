'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { User, Mail, Phone, MapPin, Edit2, Camera, Save, X } from 'lucide-react'
import Link from 'next/link'

interface UserProfile {
  id: string
  name: string
  email: string
  phone?: string
  location?: string
  bio?: string
  avatar?: string
  role: 'user' | 'admin'
  createdAt: string
}

export default function ProfilePage() {
  const router = useRouter()
  const { user, isAuthenticated, loading: authLoading } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [formData, setFormData] = useState<UserProfile | null>(null)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login')
      return
    }

    // Fetch user profile from API
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken')
        const response = await fetch('/api/users/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        if (response.ok) {
          const data = await response.json()
          setProfile(data)
          setFormData(data)
        } else {
          console.error('Failed to fetch profile')
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error)
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated) {
      fetchProfile()
    }
  }, [isAuthenticated, authLoading, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => prev ? { ...prev, [name]: value } : null)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && formData) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => prev ? { ...prev, avatar: reader.result as string } : null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('accessToken')
      const response = await fetch('/api/users/me', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData?.name,
          phone: formData?.phone,
          location: formData?.location,
          bio: formData?.bio,
          avatar: formData?.avatar,
        }),
      })

      if (response.ok) {
        const updatedProfile = await response.json()
        setProfile(updatedProfile)
        setFormData(updatedProfile)
        setIsEditing(false)
      } else {
        console.error('Failed to update profile')
      }
    } catch (error) {
      console.error('Failed to update profile:', error)
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-b from-background to-card flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p>Loading your profile...</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-b from-background to-card flex flex-col items-center justify-center">
          <p className="mb-4">Please log in to view your profile</p>
          <Link href="/login" className="text-primary hover:underline">Go to Login</Link>
        </main>
        <Footer />
      </>
    )
  }

  if (!profile) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-b from-background to-card flex flex-col items-center justify-center">
          <p className="mb-4">Unable to load profile</p>
          <button 
            onClick={() => window.location.reload()}
            className="text-primary hover:underline"
          >
            Try again
          </button>
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
            {/* Header with Back Button */}
            <div className="flex items-center justify-between mb-12">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
                  <User size={32} className="text-primary" />
                  Profile
                </h1>
                <p className="text-muted-foreground">Welcome, {profile.name}</p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                {isEditing ? (
                  <>
                    <X size={18} />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit2 size={18} />
                    Edit
                  </>
                )}
              </button>
            </div>

            {/* Profile Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Card */}
              <div className="lg:col-span-1">
                <div className="bg-card border border-border rounded-lg p-8 text-center sticky top-8">
                  {/* Avatar */}
                  <div className="relative mb-6">
                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-4xl font-bold overflow-hidden">
                      {formData?.avatar ? (
                        <img src={formData.avatar || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        profile.name.charAt(0).toUpperCase()
                      )}
                    </div>
                    {isEditing && (
                      <label className="absolute bottom-0 right-0 bg-primary text-white p-3 rounded-full cursor-pointer hover:bg-primary/90 transition-colors">
                        <Camera size={18} />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                  <h2 className="text-2xl font-bold text-foreground mb-1">{profile.name}</h2>
                  <p className="text-sm text-primary font-medium capitalize mb-4">{profile.role}</p>
                  <p className="text-xs text-muted-foreground mb-4">Joined {new Date(profile.createdAt).toLocaleDateString()}</p>

                  <div className="space-y-2 text-sm">
                    <Link
                      href="/settings"
                      className="block px-4 py-2 bg-background rounded-lg hover:bg-muted transition-colors text-foreground font-medium"
                    >
                      Settings
                    </Link>
                    <Link
                      href="/settings/security"
                      className="block px-4 py-2 bg-background rounded-lg hover:bg-muted transition-colors text-foreground font-medium"
                    >
                      Security
                    </Link>
                  </div>
                </div>
              </div>

              {/* Profile Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Personal Information */}
                <div className="bg-card border border-border rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-6">Account Settings</h3>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Full Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={formData?.name || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      ) : (
                        <p className="px-4 py-3 rounded-lg bg-background text-foreground">{profile.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                        <Mail size={16} />
                        Email
                      </label>
                      <p className="px-4 py-3 rounded-lg bg-background text-foreground">{profile.email}</p>
                      <p className="text-xs text-muted-foreground mt-1">Cannot be changed</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                        <Phone size={16} />
                        Phone
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={formData?.phone || ''}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                          className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      ) : (
                        <p className="px-4 py-3 rounded-lg bg-background text-foreground">
                          {profile.phone || 'Not provided'}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                        <MapPin size={16} />
                        Location
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="location"
                          value={formData?.location || ''}
                          onChange={handleInputChange}
                          placeholder="Enter your location"
                          className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      ) : (
                        <p className="px-4 py-3 rounded-lg bg-background text-foreground">
                          {profile.location || 'Not provided'}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Bio
                      </label>
                      {isEditing ? (
                        <textarea
                          name="bio"
                          value={formData?.bio || ''}
                          onChange={handleInputChange}
                          placeholder="Tell us about yourself"
                          rows={4}
                          className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      ) : (
                        <p className="px-4 py-3 rounded-lg bg-background text-foreground">
                          {profile.bio || 'No bio provided'}
                        </p>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-4 mt-8">
                      <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors font-medium"
                      >
                        <Save size={18} />
                        {loading ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={() => {
                          setIsEditing(false)
                          setFormData(profile)
                        }}
                        className="flex-1 px-6 py-3 border border-border rounded-lg hover:bg-background transition-colors font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                {/* Additional Information */}
                <div className="bg-card border border-border rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-6">Security</h3>
                  <Link
                    href="/settings/security"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors font-medium"
                  >
                    Change Password
                  </Link>
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
