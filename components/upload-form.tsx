'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Upload, AlertCircle, CheckCircle } from 'lucide-react'

type InputType = 'image' | 'pdf' | 'blood' | 'symptoms'

export function UploadForm() {
  const router = useRouter()
  const [inputType, setInputType] = useState<InputType>('image')
  const [file, setFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    bloodValues: {
      hba1c: '',
      wbc: '',
      hemoglobin: '',
    },
    symptoms: [] as string[],
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const symptomOptions = [
    'Weight Loss',
    'Persistent Cough',
    'Chest Pain',
    'Fatigue',
    'Fever',
    'Shortness of Breath',
    'Night Sweats',
    'Difficulty Swallowing',
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.size > 25 * 1024 * 1024) {
        setError('File size must be less than 25MB')
        return
      }
      setFile(selectedFile)
      setError('')
    }
  }

  const handleSymptomToggle = (symptom: string) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!formData.patientName || !formData.age) {
        throw new Error('Please fill in patient name and age')
      }

      if (inputType === 'image' && !file) {
        throw new Error('Please select an image file')
      }

      if (inputType === 'pdf' && !file) {
        throw new Error('Please select a PDF file')
      }

      // Create FormData for file upload
      const uploadData = new FormData()
      uploadData.append('patientName', formData.patientName)
      uploadData.append('age', formData.age)
      uploadData.append('inputType', inputType)

      if (file) {
        uploadData.append('file', file)
      }

      if (inputType === 'blood') {
        uploadData.append('bloodValues', JSON.stringify(formData.bloodValues))
      }

      if (inputType === 'symptoms') {
        uploadData.append('symptoms', JSON.stringify(formData.symptoms))
      }

      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: uploadData
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Upload failed')
      }

      const report = await response.json()
      setSuccess(true)

      // Redirect to report view after 2 seconds
      setTimeout(() => {
        router.push(`/report/${report.id}`)
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Report Uploaded Successfully!</h2>
        <p className="text-muted-foreground mb-6">
          Your report is being processed. Redirecting to results...
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Patient Information */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Patient Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Patient Name</label>
            <input
              type="text"
              value={formData.patientName}
              onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
              placeholder="Enter patient name"
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Age</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              placeholder="Enter age"
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              required
            />
          </div>
        </div>
      </div>

      {/* Input Type Selection */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Select Data Type</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {[
            { id: 'image' as const, label: 'Medical Image', icon: '🖼️' },
            { id: 'pdf' as const, label: 'PDF Report', icon: '📄' },
            { id: 'blood' as const, label: 'Blood Values', icon: '🩸' },
            { id: 'symptoms' as const, label: 'Symptoms', icon: '📋' },
          ].map(option => (
            <button
              key={option.id}
              type="button"
              onClick={() => setInputType(option.id)}
              className={`p-4 rounded-lg border-2 transition ${
                inputType === option.id
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="text-2xl mb-2">{option.icon}</div>
              <p className="text-sm font-medium">{option.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Content Based on Input Type */}
      {(inputType === 'image' || inputType === 'pdf') && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Upload {inputType === 'image' ? 'Medical Image' : 'PDF Report'}</h2>
          <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition">
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <label className="cursor-pointer">
              <p className="font-semibold mb-2">
                {file ? file.name : 'Click to upload or drag and drop'}
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                {inputType === 'image' ? 'JPG or PNG, max 25MB' : 'PDF, max 25MB'}
              </p>
              <input
                type="file"
                onChange={handleFileChange}
                accept={inputType === 'image' ? 'image/jpeg,image/png' : 'application/pdf'}
                className="hidden"
              />
              <Button type="button" variant="outline">
                Select File
              </Button>
            </label>
          </div>
        </div>
      )}

      {inputType === 'blood' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Blood Test Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">HbA1c (%)</label>
              <input
                type="number"
                step="0.1"
                value={formData.bloodValues.hba1c}
                onChange={(e) => setFormData({
                  ...formData,
                  bloodValues: { ...formData.bloodValues, hba1c: e.target.value }
                })}
                placeholder="e.g., 6.5"
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">WBC (cells/μL)</label>
              <input
                type="number"
                value={formData.bloodValues.wbc}
                onChange={(e) => setFormData({
                  ...formData,
                  bloodValues: { ...formData.bloodValues, wbc: e.target.value }
                })}
                placeholder="e.g., 7000"
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Hemoglobin (g/dL)</label>
              <input
                type="number"
                step="0.1"
                value={formData.bloodValues.hemoglobin}
                onChange={(e) => setFormData({
                  ...formData,
                  bloodValues: { ...formData.bloodValues, hemoglobin: e.target.value }
                })}
                placeholder="e.g., 14.5"
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {inputType === 'symptoms' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Select Symptoms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {symptomOptions.map(symptom => (
              <label key={symptom} className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={formData.symptoms.includes(symptom)}
                  onChange={() => handleSymptomToggle(symptom)}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">{symptom}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
          <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Processing...' : 'Submit Report for Analysis'}
      </Button>
    </form>
  )
}
