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

    // Mock user data - replace with database query
    const user = {
      id: '1',
      name: 'Dheeraj Gaur',
      email: 'studentbatch2026@gmail.com',
      age: 21,
      role: 'admin',
      createdAt: new Date().toISOString()
    }

    return NextResponse.json(user)
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

    // Mock update - replace with database update
    const updatedUser = {
      id: '1',
      ...body,
      role: 'admin',
      createdAt: new Date().toISOString()
    }

    return NextResponse.json(updatedUser)
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
