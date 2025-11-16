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

    // Mock admin stats - replace with database aggregation
    const stats = {
      totalUsers: 245,
      totalReports: 1250,
      positiveResults: 125,
      weeklyGrowth: 12,
      systemUptime: 99.8,
      avgProcessingTime: 2.3,
      modelAccuracy: 98.7,
      activeUsers: 142
    }

    return NextResponse.json(stats)
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
