'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PrivateRoute } from '@/components/private-route'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { User, Mail, Calendar } from 'lucide-react'

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: 'Dheeraj Gaur',
    email: 'studentbatch2026@gmail.com',
    age: 21,
  })
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch('/api/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(profile)
      })

      if (response.ok) {
        setEditing(false)
        // Update localStorage
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        localStorage.setItem('user', JSON.stringify({ ...user, ...profile }))
      }
    } catch (error) {
      console.error('Failed to save profile:', error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <PrivateRoute>
      <Navbar />
      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Profile Settings</h1>
            <p className="text-muted-foreground">Manage your account information</p>
          </div>

          <Card className="p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <div className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg">
                  <User size={18} className="text-muted-foreground" />
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    disabled={!editing}
                    className="flex-1 bg-transparent outline-none disabled:text-muted-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <div className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg">
                  <Mail size={18} className="text-muted-foreground" />
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    disabled
                    className="flex-1 bg-transparent outline-none disabled:text-muted-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Age</label>
                <div className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg">
                  <Calendar size={18} className="text-muted-foreground" />
                  <input
                    type="number"
                    name="age"
                    value={profile.age}
                    onChange={handleChange}
                    disabled={!editing}
                    className="flex-1 bg-transparent outline-none disabled:text-muted-foreground"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                {!editing ? (
                  <Button onClick={() => setEditing(true)}>
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button onClick={handleSave} disabled={saving}>
                      {saving ? 'Saving...' : 'Save Changes'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setEditing(false)}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </PrivateRoute>
  )
}
