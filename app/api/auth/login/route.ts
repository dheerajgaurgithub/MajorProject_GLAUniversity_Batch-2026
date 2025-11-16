import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Call backend API for login
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000'
    const response = await fetch(`${backendUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    if (!response.ok) {
      const data = await response.json()
      return NextResponse.json(
        { message: data.error || 'Login failed' },
        { status: response.status }
      )
    }

    const data = await response.json()

    return NextResponse.json({
      message: 'Login successful',
      user: data.user,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
