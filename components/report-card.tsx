import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react'

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

export function ReportCard({ report, onView }: { report: Report; onView: () => void }) {
  const getStatusIcon = () => {
    switch (report.status) {
      case 'done':
        return <CheckCircle className="text-green-600" size={20} />
      case 'processing':
        return <Clock className="text-blue-600 animate-spin" size={20} />
      case 'failed':
        return <AlertCircle className="text-red-600" size={20} />
    }
  }

  const getStatusText = () => {
    switch (report.status) {
      case 'done':
        return 'Completed'
      case 'processing':
        return 'Processing'
      case 'failed':
        return 'Failed'
    }
  }

  return (
    <Card className="p-6 hover:shadow-lg transition">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="text-primary" size={24} />
          </div>
          <div>
            <h3 className="font-semibold mb-1">{report.patientName}</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Age: {report.age} • Report ID: {report.id.substring(0, 8)}...
            </p>
            <div className="flex items-center gap-2">
              {getStatusIcon()}
              <span className="text-sm font-medium">{getStatusText()}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          {report.status === 'done' && report.prediction && (
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Prediction</p>
              <p className="font-semibold">
                {report.prediction.cancer ? '⚠️ Cancer Risk' : '✓ Low Risk'}
              </p>
              <p className="text-xs text-muted-foreground">
                {Math.round(report.prediction.confidence * 100)}% confidence
              </p>
            </div>
          )}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onView}
            >
              View Details
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            {new Date(report.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Card>
  )
}
