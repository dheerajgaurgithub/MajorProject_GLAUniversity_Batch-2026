'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PrivateRoute } from '@/components/private-route'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Search, Filter, Eye, Flag } from 'lucide-react'
import Link from 'next/link'

interface Report {
  id: string
  patientName: string
  email: string
  status: 'done' | 'processing' | 'failed'
  prediction: {
    cancer: boolean
    confidence: number
  }
  createdAt: string
  reviewed: boolean
}

const mockReports: Report[] = [
  {
    id: 'R001',
    patientName: 'John Doe',
    email: 'john@example.com',
    status: 'done',
    prediction: { cancer: true, confidence: 0.82 },
    createdAt: '2025-11-14',
    reviewed: false
  },
  {
    id: 'R002',
    patientName: 'Jane Smith',
    email: 'jane@example.com',
    status: 'done',
    prediction: { cancer: false, confidence: 0.15 },
    createdAt: '2025-11-13',
    reviewed: true
  },
]

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>(mockReports)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string | null>(null)

  const filteredReports = reports.filter(report =>
    (report.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (!filterStatus || report.status === filterStatus)
  )

  const handleMarkReviewed = (reportId: string) => {
    setReports(reports.map(r =>
      r.id === reportId ? { ...r, reviewed: !r.reviewed } : r
    ))
  }

  return (
    <PrivateRoute requiredRole="admin">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Report Management</h1>
              <p className="text-muted-foreground">Review submitted medical reports and predictions</p>
            </div>
            <Link href="/admin">
              <Button variant="outline">Back to Admin</Button>
            </Link>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg focus-within:ring-2 focus-within:ring-primary">
              <Search size={20} className="text-muted-foreground" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent outline-none"
              />
            </div>
            <select
              value={filterStatus || ''}
              onChange={(e) => setFilterStatus(e.target.value || null)}
              className="px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none"
            >
              <option value="">All Status</option>
              <option value="done">Completed</option>
              <option value="processing">Processing</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          {/* Reports Table */}
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Patient</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Prediction</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Reviewed</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.map((report, index) => (
                    <tr key={report.id} className={`border-t ${index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}`}>
                      <td className="px-6 py-4 font-medium">{report.patientName}</td>
                      <td className="px-6 py-4 text-muted-foreground">{report.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          report.status === 'done'
                            ? 'bg-green-100 text-green-800'
                            : report.status === 'processing'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={report.prediction.cancer ? 'text-red-600 font-bold' : 'text-green-600'}>
                          {report.prediction.cancer ? 'Risk' : 'Low Risk'} ({Math.round(report.prediction.confidence * 100)}%)
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          report.reviewed
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {report.reviewed ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground text-sm">
                        {new Date(report.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="text-blue-600">
                            <Eye size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMarkReviewed(report.id)}
                            className="text-amber-600"
                          >
                            <Flag size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </PrivateRoute>
  )
}
