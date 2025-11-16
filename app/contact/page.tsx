'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Mail, Phone, AlertCircle, CheckCircle } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setSuccess(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Get In Touch</h1>
            <p className="text-xl text-muted-foreground">
              Have questions? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 text-center">
              <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">Email</h3>
              <p className="text-muted-foreground">support@medidetect.com</p>
            </Card>
            <Card className="p-6 text-center">
              <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">Phone</h3>
              <p className="text-muted-foreground">+1 (555) 000-0000</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                ?
              </div>
              <h3 className="font-bold mb-2">Support Hours</h3>
              <p className="text-muted-foreground">24/7 Available</p>
            </Card>
          </div>

          <Card className="p-8 max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  rows={6}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none resize-none"
                  required
                />
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                  <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {success && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex gap-3">
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-green-600">Message sent successfully!</p>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  )
}
