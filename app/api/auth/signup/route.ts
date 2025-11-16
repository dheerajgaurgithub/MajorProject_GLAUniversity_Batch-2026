import { NextRequest, NextResponse } from 'next/server'

// Mock database
let users: any[] = [
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
    const { name, email, password, age } = await request.json()

    // Check if user already exists
    if (users.find(u => u.email === email)) {
      return NextResponse.json(
        { message: 'Email already registered' },
        { status: 400 }
      )
    }

    // Create new user
    const newUser = {
      id: 'user_' + Math.random().toString(36).substr(2, 9),
      name,
      email,
      password,
      age: age || null,
      role: 'user'
    }

    users.push(newUser)

    return NextResponse.json({
      message: 'Account created successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    })
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
