import { NextRequest, NextResponse } from 'next/server'

// Mock user database
const USERS = [
  {
    id: '1',
    name: 'Dheeraj Gaur',
    email: 'studentbatch2026@gmail.com',
    password: 'gla@2026',
    role: 'admin'
  }
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Find user
    const user = USERS.find(u => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Generate mock token
    const token = 'token_' + Math.random().toString(36).substr(2, 9)

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
