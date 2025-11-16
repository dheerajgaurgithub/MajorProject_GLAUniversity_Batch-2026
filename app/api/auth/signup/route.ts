import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, age } = await request.json()

    // Call backend API for signup
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000'
    const response = await fetch(`${backendUrl}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, age })
    })

    if (!response.ok) {
      const data = await response.json()
      return NextResponse.json(
        { message: data.error || 'Signup failed' },
        { status: response.status }
      )
    }

    const data = await response.json()

    return NextResponse.json({
      message: 'Account created successfully',
      user: data.user,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken
    }, { status: 201 })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
