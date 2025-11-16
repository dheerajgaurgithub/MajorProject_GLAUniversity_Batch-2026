'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PrivateRoute } from '@/components/private-route'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Download, Share2, Clock, CheckCircle, AlertCircle } from 'lucide-react'

interface Prediction {
  cancer: boolean
  predictedType: string
  confidence: number
  explanation: string
  heatmapUrl?: string
  modelVersion: string
}

interface Report {
  id: string
  patientName: string
  age: number
  status: 'processing' | 'done' | 'failed'
  uploadedFiles?: Array<{ url: string; type: string }>
  prediction?: Prediction
  createdAt: string
}

export default function ReportPage() {
  const router = useRouter()
  const params = useParams()
  const reportId = params?.id as string
  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch(`/api/reports/${reportId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })

        if (response.ok) {
          const data = await response.json()
          setReport(data)
        }
      } catch (error) {
        console.error('Failed to fetch report:', error)
      } finally {
        setLoading(false)
      }
    }

    if (reportId) {
      fetchReport()
    }
  }, [reportId])

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading report...</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (!report) {
    return (
      <>
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Card className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Report Not Found</h1>
            <p className="text-muted-foreground mb-6">The report you're looking for doesn't exist.</p>
            <Button onClick={() => router.push('/dashboard')}>Back to Dashboard</Button>
          </Card>
        </main>
        <Footer />
      </>
    )
  }

  const isPredictionReady = report.status === 'done' && report.prediction

  return (
    <PrivateRoute>
      <Navbar />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="gap-2"
            >
              <ArrowLeft size={18} />
              Back
            </Button>
            <h1 className="text-4xl font-bold">Medical Report</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Patient Info */}
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Patient Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Patient Name</p>
                    <p className="text-lg font-semibold">{report.patientName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Age</p>
                    <p className="text-lg font-semibold">{report.age}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Report ID</p>
                    <p className="text-lg font-semibold">{report.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="text-lg font-semibold">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Status */}
              <Card className="p-6">
                <h2 className="text-lg font-bold mb-4">Status</h2>
                <div className="flex items-center gap-3">
                  {report.status === 'processing' && (
                    <>
                      <Clock className="w-6 h-6 text-blue-600 animate-spin" />
                      <div>
                        <p className="font-semibold">Processing</p>
                        <p className="text-sm text-muted-foreground">
                          Your report is being analyzed by our AI models
                        </p>
                      </div>
                    </>
                  )}
                  {report.status === 'done' && (
                    <>
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <div>
                        <p className="font-semibold">Analysis Complete</p>
                        <p className="text-sm text-muted-foreground">
                          Results are ready for review
                        </p>
                      </div>
                    </>
                  )}
                  {report.status === 'failed' && (
                    <>
                      <AlertCircle className="w-6 h-6 text-red-600" />
                      <div>
                        <p className="font-semibold">Analysis Failed</p>
                        <p className="text-sm text-muted-foreground">
                          There was an error processing your report
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </Card>

              {/* Prediction Results */}
              {isPredictionReady && (
                <Card className={`p-6 border-2 ${report.prediction.cancer ? 'border-red-500' : 'border-green-500'}`}>
                  <h2 className="text-2xl font-bold mb-6">Analysis Results</h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">Prediction</p>
                      <p className={`text-3xl font-bold ${report.prediction.cancer ? 'text-red-600' : 'text-green-600'}`}>
                        {report.prediction.cancer ? 'Risk' : 'Low Risk'}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">Predicted Type</p>
                      <p className="text-xl font-bold">{report.prediction.predictedType}</p>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">Confidence</p>
                      <p className="text-3xl font-bold text-primary">
                        {Math.round(report.prediction.confidence * 100)}%
                      </p>
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg mb-4">
                    <p className="text-sm font-semibold mb-2">Explanation</p>
                    <p className="text-sm text-foreground">{report.prediction.explanation}</p>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Model Version: {report.prediction.modelVersion}
                  </p>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Actions */}
              <Card className="p-6">
                <h3 className="font-bold mb-4">Actions</h3>
                <div className="space-y-2">
                  <Button className="w-full gap-2" variant="outline">
                    <Download size={18} />
                    Download PDF
                  </Button>
                  <Button className="w-full gap-2" variant="outline">
                    <Share2 size={18} />
                    Share Report
                  </Button>
                </div>
              </Card>

              {/* Next Steps */}
              <Card className="p-6">
                <h3 className="font-bold mb-4">Next Steps</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Review the analysis results above</li>
                  <li>Consult with a medical professional</li>
                  <li>Schedule follow-up screening if recommended</li>
                  <li>Keep this report for your records</li>
                </ol>
              </Card>

              {/* Disclaimer */}
              <Card className="p-4 bg-yellow-50 border-yellow-200">
                <p className="text-xs text-yellow-900">
                  These results are for informational purposes only and not a medical diagnosis. Always consult a healthcare provider.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </PrivateRoute>
  )
}
