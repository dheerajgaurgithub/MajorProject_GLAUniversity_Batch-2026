'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Mail, Phone, MapPin, Clock, AlertCircle, CheckCircle, Send, MessageSquare, Users, Building } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      setFormData({ name: '', email: '', subject: '', message: '', inquiryType: 'general' })
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
      <main className="min-h-screen bg-gradient-to-b from-background to-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 text-foreground">Contact Us</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're here to help you with your cancer risk assessment journey. Reach out to our team for any questions, support, or feedback.
            </p>
          </div>

          {/* Contact Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Mail className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-bold mb-2 text-foreground">Email Support</h3>
              <p className="text-muted-foreground text-sm mb-3">support@medidetect.com</p>
              <p className="text-xs text-muted-foreground">Response within 24 hours</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Phone className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-bold mb-2 text-foreground">Phone Support</h3>
              <p className="text-muted-foreground text-sm mb-3">+1 (555) 000-0000</p>
              <p className="text-xs text-muted-foreground">Mon-Fri, 9AM-6PM EST</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <MessageSquare className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="font-bold mb-2 text-foreground">Live Chat</h3>
              <p className="text-muted-foreground text-sm mb-3">Available 24/7</p>
              <p className="text-xs text-muted-foreground">Instant responses</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Users className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="font-bold mb-2 text-foreground">Emergency</h3>
              <p className="text-muted-foreground text-sm mb-3">+1 (555) 911-HELP</p>
              <p className="text-xs text-muted-foreground">Urgent medical concerns</p>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-foreground">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none bg-background"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none bg-background"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Inquiry Type *</label>
                      <select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none bg-background"
                        required
                      >
                        <option value="general">General Inquiry</option>
                        <option value="technical">Technical Support</option>
                        <option value="medical">Medical Questions</option>
                        <option value="feedback">Feedback & Suggestions</option>
                        <option value="partnership">Partnership Opportunities</option>
                        <option value="press">Media & Press</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Subject *</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help?"
                        className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none bg-background"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please provide detailed information about your inquiry..."
                      rows={6}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none resize-none bg-background"
                      required
                    />
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex gap-3">
                      <AlertCircle size={20} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    </div>
                  )}

                  {success && (
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex gap-3">
                      <CheckCircle size={20} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-green-600 dark:text-green-400">Message sent successfully! We'll respond within 24 hours.</p>
                    </div>
                  )}

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Office Locations & Additional Info */}
            <div className="space-y-6">
              {/* Main Office */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Building className="w-6 h-6 text-blue-500" />
                  <h3 className="font-bold text-lg text-foreground">Headquarters</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">123 Medical Plaza, Health City, HC 12345, United States</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">+1 (555) 000-0000</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">info@medidetect.com</span>
                  </div>
                </div>
              </Card>

              {/* Support Hours */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-green-500" />
                  <h3 className="font-bold text-lg text-foreground">Support Hours</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Friday</span>
                    <span className="text-foreground">9:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span className="text-foreground">10:00 AM - 4:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="text-foreground">Emergency Only</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Live Chat</span>
                    <span className="text-foreground">24/7 Available</span>
                  </div>
                </div>
              </Card>

              {/* Quick Links */}
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4 text-foreground">Quick Links</h3>
                <div className="space-y-2">
                  <a href="/faq" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                    → Frequently Asked Questions
                  </a>
                  <a href="/disclaimer" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                    → Medical Disclaimer
                  </a>
                  <a href="/privacy-policy" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                    → Privacy Policy
                  </a>
                  <a href="/terms-of-service" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                    → Terms of Service
                  </a>
                </div>
              </Card>

              {/* Emergency Notice */}
              <Card className="p-6 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
                <div className="flex items-center gap-3 mb-3">
                  <AlertCircle className="w-6 h-6 text-red-500" />
                  <h3 className="font-bold text-lg text-red-800 dark:text-red-200">Medical Emergency?</h3>
                </div>
                <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                  For urgent medical concerns or emergencies, please contact emergency services immediately.
                </p>
                <div className="space-y-1 text-sm">
                  <p className="text-red-700 dark:text-red-300">Emergency: 911</p>
                  <p className="text-red-700 dark:text-red-300">Hotline: +1 (555) 911-HELP</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
