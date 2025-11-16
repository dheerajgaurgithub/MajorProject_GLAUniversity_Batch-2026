'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/lib/language-context'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Bell, Send, AlertCircle, CheckCircle, Clock } from 'lucide-react'

interface Alert {
  id: string
  title: string
  message: string
  createdAt: string
  sentTo: number
  status: 'draft' | 'sent'
}

export default function AdminAlertsPage() {
  const { t } = useLanguage()
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [sendToAll, setSendToAll] = useState(true)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [formData, setFormData] = useState({
    title: '',
    message: '',
  })

  useEffect(() => {
    fetchAlerts()
  }, [])

  const fetchAlerts = async () => {
    try {
      const token = localStorage.getItem('authToken')
      const response = await fetch('/api/admin/alerts', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        setAlerts(data)
      }
    } catch (error) {
      console.error('Failed to fetch alerts:', error)
    }
  }

  const handleSendAlert = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem('authToken')
      const response = await fetch('/api/admin/alerts/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          message: formData.message,
          sendToAll,
          userIds: sendToAll ? [] : selectedUsers,
        }),
      })

      if (response.ok) {
        const newAlert = await response.json()
        setAlerts([newAlert, ...alerts])
        setFormData({ title: '', message: '' })
        setShowCreateForm(false)
      }
    } catch (error) {
      console.error('Failed to send alert:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-background to-card">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-12">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
                  <Bell size={32} className="text-primary" />
                  System Alerts
                </h1>
                <p className="text-muted-foreground">Send important notifications to users</p>
              </div>
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                <Send size={18} />
                {t.sendAlert}
              </button>
            </div>

            {/* Create Alert Form */}
            {showCreateForm && (
              <div className="bg-card border border-border rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Create New Alert</h2>
                <form onSubmit={handleSendAlert} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t.alertTitle}
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter alert title (e.g., System Maintenance)"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t.alertMessage}
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Enter alert message..."
                      rows={6}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {/* Recipient Selection */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Recipients
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-background cursor-pointer">
                        <input
                          type="radio"
                          checked={sendToAll}
                          onChange={() => setSendToAll(true)}
                          className="w-5 h-5 rounded-full"
                        />
                        <span className="font-medium">{t.sendToAll}</span>
                      </label>
                      <label className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-background cursor-pointer">
                        <input
                          type="radio"
                          checked={!sendToAll}
                          onChange={() => setSendToAll(false)}
                          className="w-5 h-5 rounded-full"
                        />
                        <span className="font-medium">{t.selectUsers}</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors font-medium"
                    >
                      <Send size={18} />
                      {loading ? 'Sending...' : 'Send Alert'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="flex-1 px-6 py-3 border border-border rounded-lg hover:bg-background transition-colors font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Alerts List */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground mb-6">Recent Alerts</h2>
              {alerts.length === 0 ? (
                <div className="bg-card border border-border rounded-lg p-12 text-center">
                  <Bell size={48} className="text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">{t.noData}</p>
                </div>
              ) : (
                alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                          {alert.status === 'sent' ? (
                            <CheckCircle size={20} className="text-primary" />
                          ) : (
                            <AlertCircle size={20} className="text-accent" />
                          )}
                          {alert.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mt-1 flex items-center gap-2">
                          <Clock size={14} />
                          {new Date(alert.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          alert.status === 'sent'
                            ? 'bg-primary/10 text-primary'
                            : 'bg-accent/10 text-accent'
                        }`}
                      >
                        {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                      </span>
                    </div>

                    <p className="text-foreground mb-4">{alert.message}</p>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Sent to {alert.sentTo} users</span>
                      <span>Status: {alert.status === 'sent' ? 'Delivered' : 'Draft'}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
