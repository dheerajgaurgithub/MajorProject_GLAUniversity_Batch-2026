import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Mock reports - replace with database query
    const reports = [
      {
        id: 'R001',
        patientName: 'John Doe',
        email: 'john@example.com',
        status: 'done',
        prediction: {
          cancer: true,
          confidence: 0.82
        },
        createdAt: '2025-11-14',
        reviewed: false
      }
    ]

    return NextResponse.json(reports)
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { reportId, reviewed, notes } = body

    // Mock update - replace with database update
    const updatedReport = {
      id: reportId,
      reviewed,
      notes,
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json(updatedReport)
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
