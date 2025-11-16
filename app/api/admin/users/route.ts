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

    // Mock users list - replace with database query
    const users = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user',
        createdAt: '2025-10-15',
        isActive: true,
        reportsCount: 5
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'user',
        createdAt: '2025-10-20',
        isActive: true,
        reportsCount: 3
      }
    ]

    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
