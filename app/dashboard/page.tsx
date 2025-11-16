'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PrivateRoute } from '@/components/private-route'
import { ReportCard } from '@/components/report-card'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus, FileText, TrendingUp, Calendar } from 'lucide-react'

interface Report {
  id: string
  patientName: string
  age: number
  status: 'done' | 'processing' | 'failed'
  prediction?: {
    cancer: boolean
    predictedType: string
    confidence: number
  }
  createdAt: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Fetch reports from backend
    const fetchReports = async () => {
      try {
        const response = await fetch('/api/reports', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        })
        if (response.ok) {
          const data = await response.json()
          // Handle both array and paginated response formats
          const reportsArray = Array.isArray(data) ? data : data.data || data.reports || []
          setReports(reportsArray)
        }
      } catch (error) {
        console.error('Failed to fetch reports:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [])

  const filteredReports = reports.filter(report =>
    report.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.id.includes(searchTerm)
  )

  const stats = {
    totalReports: reports.length,
    completedReports: reports.filter(r => r.status === 'done').length,
    positiveResults: reports.filter(r => r.status === 'done' && r.prediction?.cancer).length,
    lastUpdate: reports.length > 0 ? reports[0].createdAt : 'Never'
  }

  return (
    <PrivateRoute>
      <Navbar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">Manage your medical reports and predictions</p>
            </div>
            <Button
              onClick={() => router.push('/upload')}
              className="gap-2"
            >
              <Plus size={18} />
              New Report
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Reports</p>
                  <p className="text-3xl font-bold mt-2">{stats.totalReports}</p>
                </div>
                <FileText className="w-10 h-10 text-primary opacity-20" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Completed</p>
                  <p className="text-3xl font-bold mt-2">{stats.completedReports}</p>
                </div>
                <TrendingUp className="w-10 h-10 text-green-500 opacity-20" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Alerts</p>
                  <p className="text-3xl font-bold mt-2 text-red-600">{stats.positiveResults}</p>
                </div>
                <div className="w-10 h-10 bg-red-100 rounded-lg opacity-20" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Last Update</p>
                  <p className="text-sm font-medium mt-2">
                    {new Date(stats.lastUpdate).toLocaleDateString()}
                  </p>
                </div>
                <Calendar className="w-10 h-10 text-primary opacity-20" />
              </div>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search reports by patient name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          {/* Reports List */}
          <div className="space-y-4">
            {loading ? (
              <Card className="p-12 text-center">
                <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-muted-foreground">Loading reports...</p>
              </Card>
            ) : filteredReports.length === 0 ? (
              <Card className="p-12 text-center">
                <FileText className="w-12 h-12 text-muted-foreground opacity-50 mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No reports yet</p>
                <Button onClick={() => router.push('/upload')}>
                  Upload Your First Report
                </Button>
              </Card>
            ) : (
              filteredReports.map(report => (
                <ReportCard
                  key={report.id}
                  report={report}
                  onView={() => router.push(`/report/${report.id}`)}
                />
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </PrivateRoute>
  )
}
