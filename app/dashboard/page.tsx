'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PrivateRoute } from '@/components/private-route'
import { ReportCard } from '@/components/report-card'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus, FileText, TrendingUp, Calendar, Search, AlertCircle, Activity, BarChart3, Filter } from 'lucide-react'

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
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Decorative background elements */}
        <div className="fixed top-20 right-10 w-96 h-96 bg-gradient-to-br from-cyan-200/20 to-blue-200/20 dark:from-cyan-900/10 dark:to-blue-900/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="fixed bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-pink-200/20 dark:from-purple-900/10 dark:to-pink-900/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-8 sm:mb-10">
            <div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 px-4 py-2 rounded-full mb-3 border border-cyan-200 dark:border-cyan-800/50">
                <Activity size={16} className="text-cyan-600 dark:text-cyan-400" />
                <span className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">Your Dashboard</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-2">
                Dashboard
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">Manage your medical reports and AI predictions</p>
            </div>
            <Button
              onClick={() => router.push('/upload')}
              className="w-full sm:w-auto bg-gradient-to-r from-cyan-600 via-cyan-600 to-blue-600 hover:from-cyan-700 hover:via-blue-600 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-xl px-6 py-6 sm:py-3 gap-2"
            >
              <Plus size={20} />
              <span className="text-sm sm:text-base">New Report</span>
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
            <Card className="relative overflow-hidden bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity"></div>
              <div className="relative z-10 flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      <FileText size={20} className="text-white" />
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Total Reports</p>
                  </div>
                  <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">{stats.totalReports}</p>
                  <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                    <BarChart3 size={14} />
                    <span>All time</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="relative overflow-hidden bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/10 to-emerald-500/10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity"></div>
              <div className="relative z-10 flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                      <TrendingUp size={20} className="text-white" />
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Completed</p>
                  </div>
                  <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">{stats.completedReports}</p>
                  <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-green-600 dark:text-green-400">
                    <Activity size={14} />
                    <span>Processed</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="relative overflow-hidden bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-400/10 to-rose-500/10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity"></div>
              <div className="relative z-10 flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                      <AlertCircle size={20} className="text-white" />
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Alerts</p>
                  </div>
                  <p className="text-3xl sm:text-4xl font-extrabold text-red-600 dark:text-red-400 mt-3">{stats.positiveResults}</p>
                  <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-red-600 dark:text-red-400">
                    <AlertCircle size={14} />
                    <span>Requires attention</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="relative overflow-hidden bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-indigo-500/10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity"></div>
              <div className="relative z-10 flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Calendar size={20} className="text-white" />
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Last Update</p>
                  </div>
                  <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-3 truncate">
                    {stats.lastUpdate !== 'Never' ? new Date(stats.lastUpdate).toLocaleDateString() : 'Never'}
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-purple-600 dark:text-purple-400">
                    <Calendar size={14} />
                    <span>Recent activity</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 sm:mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={20} />
              <input
                type="text"
                placeholder="Search reports by patient name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition-all duration-300 shadow-sm hover:shadow-md text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Reports List */}
          <div className="space-y-4 sm:space-y-6">
            {loading ? (
              <Card className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-12 sm:p-16 text-center shadow-lg">
                <div className="inline-block w-16 h-16 border-4 border-cyan-600 dark:border-cyan-400 border-t-transparent rounded-full animate-spin mb-6" />
                <p className="text-slate-600 dark:text-slate-400 font-medium text-sm sm:text-base">Loading your reports...</p>
                <p className="text-slate-500 dark:text-slate-500 text-xs sm:text-sm mt-2">Please wait a moment</p>
              </Card>
            ) : filteredReports.length === 0 ? (
              <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-12 sm:p-16 text-center shadow-lg">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-10 h-10 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">No reports yet</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm sm:text-base max-w-md mx-auto">
                  Get started by uploading your first medical report for AI-powered analysis
                </p>
                <Button 
                  onClick={() => router.push('/upload')}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-xl px-8 py-6 sm:py-3 gap-2"
                >
                  <Plus size={20} />
                  Upload Your First Report
                </Button>
              </Card>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    Your Reports ({filteredReports.length})
                  </h2>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border-2 border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300">
                    <Filter size={16} />
                    <span className="hidden sm:inline">Filter</span>
                  </button>
                </div>
                {filteredReports.map(report => (
                  <ReportCard
                    key={report.id}
                    report={report}
                    onView={() => router.push(`/report/${report.id}`)}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </main>
    </PrivateRoute>
  )
}