'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PrivateRoute } from '@/components/private-route'
import { UploadForm } from '@/components/upload-form'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'

export default function UploadPage() {
  const router = useRouter()

  return (
    <PrivateRoute>
      <Navbar />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8 flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="gap-2"
            >
              <ArrowLeft size={18} />
              Back
            </Button>
            <div>
              <h1 className="text-4xl font-bold">Upload Medical Report</h1>
              <p className="text-muted-foreground mt-2">
                Submit your medical data for AI-powered analysis
              </p>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="p-4">
              <p className="font-semibold mb-2">Supported Formats</p>
              <p className="text-sm text-muted-foreground">
                Images (JPG, PNG), PDFs, or enter blood values manually
              </p>
            </Card>
            <Card className="p-4">
              <p className="font-semibold mb-2">File Size</p>
              <p className="text-sm text-muted-foreground">
                Maximum 25MB per file for optimal processing
              </p>
            </Card>
            <Card className="p-4">
              <p className="font-semibold mb-2">Processing Time</p>
              <p className="text-sm text-muted-foreground">
                Results typically available within 5 minutes
              </p>
            </Card>
          </div>

          {/* Upload Form */}
          <Card className="p-8">
            <UploadForm />
          </Card>

          {/* Disclaimer */}
          <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-900 font-medium mb-2">
              Medical Disclaimer
            </p>
            <p className="text-sm text-yellow-800">
              The predictions and analysis provided by MediDetect are for informational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for medical decisions.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </PrivateRoute>
  )
}
