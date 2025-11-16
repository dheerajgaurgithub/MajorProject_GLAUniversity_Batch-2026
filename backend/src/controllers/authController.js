import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import { asyncHandler } from '../middleware/errorHandler.js'

const generateTokens = (userId, role) => {
  const accessToken = jwt.sign(
    { userId, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '15m' }
  )

  const refreshToken = jwt.sign(
    { userId },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRE || '7d' }
  )

  return { accessToken, refreshToken }
}

export const signup = asyncHandler(async (req, res) => {
  const { name, email, password, age } = req.body

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' })
  }

  // Check if user exists
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return res.status(400).json({ error: 'Email already registered' })
  }

  // Create new user
  const user = new User({
    name,
    email,
    passwordHash: password,
    age: age || null,
    role: email === 'studentbatch2026@gmail.com' ? 'admin' : 'user',
  })

  await user.save()

  // Generate tokens
  const { accessToken, refreshToken } = generateTokens(user._id, user.role)

  res.status(201).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      age: user.age,
    },
    accessToken,
    refreshToken,
  })
})

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  const user = await User.findOne({ email })
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const isPasswordValid = await user.comparePassword(password)
  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  if (!user.isActive) {
    return res.status(403).json({ error: 'Account is deactivated' })
  }

  // Update lastLogin
  user.lastLogin = new Date()
  await user.save()

  const { accessToken, refreshToken } = generateTokens(user._id, user.role)

  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      age: user.age,
    },
    accessToken,
    refreshToken,
  })
})

export const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body

  if (!refreshToken) {
    return res.status(400).json({ error: 'Refresh token required' })
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    const user = await User.findById(decoded.userId)

    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }

    const { accessToken: newAccessToken } = generateTokens(user._id, user.role)
    res.json({ accessToken: newAccessToken })
  } catch (error) {
    res.status(401).json({ error: 'Invalid refresh token' })
  }
})

export const logout = asyncHandler(async (req, res) => {
  // Token is invalidated on frontend; backend just confirms
  res.json({ message: 'Logged out successfully' })
})
