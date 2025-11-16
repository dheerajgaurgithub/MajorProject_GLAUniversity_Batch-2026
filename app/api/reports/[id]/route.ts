import { NextRequest, NextResponse } from 'next/server'

// Mock report detail
const mockReport = {
  id: 'report_001',
  patientName: 'John Doe',
  age: 58,
  status: 'done',
  uploadedFiles: [
    { url: 'https://via.placeholder.com/400x400?text=Chest+X-ray', type: 'image' }
  ],
  prediction: {
    cancer: true,
    predictedType: 'Lung Adenocarcinoma',
    confidence: 0.82,
    explanation: 'The uploaded chest X-ray shows suspicious lesions in the upper left lobe consistent with adenocarcinoma. Key indicators include nodular opacity and pleural involvement.',
    heatmapUrl: 'https://via.placeholder.com/400x400?text=Heatmap',
    modelVersion: 'v1.2'
  },
  createdAt: new Date(Date.now() - 86400000).toISOString()
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    return NextResponse.json(mockReport)
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
