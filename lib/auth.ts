/**
 * Authentication utilities
 */

import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
)

interface TokenPayload {
  userId: string
  email: string
  role: string
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    // In production, use actual JWT verification
    // const verified = await jwtVerify(token, JWT_SECRET)
    // return verified.payload as TokenPayload

    // Mock verification
    return {
      userId: '1',
      email: 'studentbatch2026@gmail.com',
      role: 'admin'
    }
  } catch (error) {
    console.error('Token verification error:', error)
    return null
  }
}

export function generateToken(payload: TokenPayload): string {
  // In production, use actual JWT generation
  // return new SignJWT(payload)
  //   .setProtectedHeader({ alg: 'HS256' })
  //   .setExpirationTime('15m')
  //   .sign(JWT_SECRET)

  // Mock token generation
  return 'token_' + Math.random().toString(36).substr(2, 9)
}

export function hashPassword(password: string): string {
  // In production, use bcrypt
  // import bcrypt from 'bcrypt'
  // return await bcrypt.hash(password, 10)

  // Mock hash
  return 'hashed_' + password
}

export function comparePasswords(
  password: string,
  hashedPassword: string
): boolean {
  // In production, use bcrypt
  // import bcrypt from 'bcrypt'
  // return await bcrypt.compare(password, hashedPassword)

  // Mock comparison
  return hashedPassword === 'hashed_' + password
}
