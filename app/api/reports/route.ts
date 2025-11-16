import { NextRequest, NextResponse } from 'next/server'

// Mock reports database
const mockReports = [
  {
    id: 'report_001',
    patientName: 'John Doe',
    age: 58,
    status: 'done',
    prediction: {
      cancer: true,
      predictedType: 'Lung Cancer',
      confidence: 0.82
    },
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'report_002',
    patientName: 'Jane Smith',
    age: 45,
    status: 'done',
    prediction: {
      cancer: false,
      predictedType: 'Breast Cancer',
      confidence: 0.15
    },
    createdAt: new Date(Date.now() - 172800000).toISOString()
  }
]

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    return NextResponse.json(mockReports)
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
