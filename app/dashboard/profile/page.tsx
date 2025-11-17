'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PrivateRoute } from '@/components/private-route'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { User, Mail, Calendar, Edit3, Check, X, Shield, Crown, Sparkles } from 'lucide-react'

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
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Decorative background elements */}
        <div className="fixed top-20 right-10 w-96 h-96 bg-gradient-to-br from-cyan-200/20 to-blue-200/20 dark:from-cyan-900/10 dark:to-blue-900/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="fixed bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-pink-200/20 dark:from-purple-900/10 dark:to-pink-900/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
          {/* Header */}
          <div className="mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 px-4 py-2 rounded-full mb-4 border border-cyan-200 dark:border-cyan-800/50">
              <Sparkles size={16} className="text-cyan-600 dark:text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">Your Account</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-3">
              Profile Settings
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Manage your personal information and account preferences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Profile Avatar Card */}
            <div className="lg:col-span-1">
              <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                {/* Avatar */}
                <div className="relative inline-block mb-6">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-3xl sm:text-4xl shadow-2xl ring-4 ring-white dark:ring-slate-900">
                    {profile.name.charAt(0).toUpperCase()}
                  </div>
                  {/* Status badge */}
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white dark:ring-slate-900">
                    <Shield size={20} className="text-white" />
                  </div>
                </div>

                {/* User Info */}
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {profile.name}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 break-all">
                  {profile.email}
                </p>

                {/* Membership Badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 px-4 py-2 rounded-full border-2 border-amber-200 dark:border-amber-800/50">
                  <Crown size={16} className="text-amber-600 dark:text-amber-400" />
                  <span className="text-sm font-semibold text-amber-700 dark:text-amber-300">Premium User</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t-2 border-slate-200 dark:border-slate-700">
                  <div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">12</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Reports</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">8</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Completed</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Profile Form */}
            <div className="lg:col-span-2">
              <Card className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Personal Information</h3>
                  {!editing && (
                    <button
                      onClick={() => setEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-lg transition-all duration-300"
                    >
                      <Edit3 size={16} />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Full Name
                    </label>
                    <div className={`flex items-center gap-3 px-4 py-3 sm:py-4 border-2 rounded-xl transition-all duration-300 ${
                      editing 
                        ? 'border-cyan-500 dark:border-cyan-500 bg-cyan-50/50 dark:bg-cyan-900/10 ring-4 ring-cyan-500/20' 
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
                    }`}>
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        editing 
                          ? 'bg-gradient-to-br from-cyan-500 to-blue-600' 
                          : 'bg-slate-100 dark:bg-slate-700'
                      }`}>
                        <User size={18} className={editing ? 'text-white' : 'text-slate-600 dark:text-slate-400'} />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        disabled={!editing}
                        className="flex-1 bg-transparent outline-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 disabled:text-slate-600 dark:disabled:text-slate-400 font-medium text-sm sm:text-base"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Email Address
                    </label>
                    <div className="flex items-center gap-3 px-4 py-3 sm:py-4 border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                      <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                        <Mail size={18} className="text-slate-600 dark:text-slate-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={profile.email}
                        disabled
                        className="flex-1 bg-transparent outline-none text-slate-600 dark:text-slate-400 font-medium text-sm sm:text-base"
                      />
                      <div className="px-3 py-1 bg-slate-200 dark:bg-slate-700 rounded-md">
                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Verified</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-2 flex items-center gap-1">
                      <Shield size={12} />
                      Email cannot be changed for security reasons
                    </p>
                  </div>

                  {/* Age */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Age
                    </label>
                    <div className={`flex items-center gap-3 px-4 py-3 sm:py-4 border-2 rounded-xl transition-all duration-300 ${
                      editing 
                        ? 'border-cyan-500 dark:border-cyan-500 bg-cyan-50/50 dark:bg-cyan-900/10 ring-4 ring-cyan-500/20' 
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
                    }`}>
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        editing 
                          ? 'bg-gradient-to-br from-cyan-500 to-blue-600' 
                          : 'bg-slate-100 dark:bg-slate-700'
                      }`}>
                        <Calendar size={18} className={editing ? 'text-white' : 'text-slate-600 dark:text-slate-400'} />
                      </div>
                      <input
                        type="number"
                        name="age"
                        value={profile.age}
                        onChange={handleChange}
                        disabled={!editing}
                        className="flex-1 bg-transparent outline-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 disabled:text-slate-600 dark:disabled:text-slate-400 font-medium text-sm sm:text-base"
                        placeholder="Enter your age"
                      />
                      <span className="text-sm text-slate-500 dark:text-slate-500">years</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t-2 border-slate-200 dark:border-slate-800">
                    {!editing ? (
                      <Button 
                        onClick={() => setEditing(true)}
                        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-xl py-6 sm:py-3 gap-2"
                      >
                        <Edit3 size={18} />
                        Edit Profile
                      </Button>
                    ) : (
                      <>
                        <Button 
                          onClick={handleSave} 
                          disabled={saving}
                          className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-xl py-6 sm:py-3 gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                          {saving ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              Saving...
                            </>
                          ) : (
                            <>
                              <Check size={18} />
                              Save Changes
                            </>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setEditing(false)}
                          className="flex-1 border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-xl py-6 sm:py-3 gap-2 transition-all duration-300"
                        >
                          <X size={18} />
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Card>

              {/* Security Info Card */}
              <Card className="mt-6 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border-2 border-cyan-200 dark:border-cyan-800/50 rounded-2xl p-6 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <Shield size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">Account Security</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      Your account is protected with 256-bit encryption and HIPAA-compliant security measures. All changes are logged for your safety.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </PrivateRoute>
  )
}