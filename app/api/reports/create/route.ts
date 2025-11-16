import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const patientName = formData.get('patientName') as string
    const age = formData.get('age') as string
    const inputType = formData.get('inputType') as string

    // Validate input
    if (!patientName || !age || !inputType) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Mock report creation
    const report = {
      id: 'report_' + Math.random().toString(36).substr(2, 9),
      patientName,
      age: parseInt(age),
      inputType,
      status: 'processing',
      createdAt: new Date().toISOString(),
      userId: '1'
    }

    // In production: save to database and trigger ML processing
    // TODO: Call ML service endpoint for predictions

    return NextResponse.json(report, { status: 201 })
  } catch (error) {
    console.error('Report creation error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
