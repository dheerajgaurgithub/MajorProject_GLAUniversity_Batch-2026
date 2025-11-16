import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { asyncHandler } from '../middleware/errorHandler.js'
import { sendEmail } from '../services/emailService.js'

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  const user = await User.findOne({ email })
  if (!user) {
    // Don't reveal if email exists for security
    return res.json({ message: 'If email exists, reset link will be sent' })
  }

  // Generate reset token
  const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_RESET_SECRET, {
    expiresIn: '1h',
  })

  // Save reset token to user
  user.resetToken = resetToken
  user.resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour
  await user.save()

  // Send email
  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password/${resetToken}`
  
  try {
    await sendEmail({
      to: email,
      subject: 'Password Reset Request - MediDetect',
      template: 'passwordReset',
      data: {
        userName: user.name,
        resetUrl,
      },
    })
  } catch (error) {
    console.error('Email sending error:', error)
    // Don't fail the request, just log the error
  }

  res.json({ message: 'Password reset link sent to email' })
})

export const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body

  if (!token || !password) {
    return res.status(400).json({ error: 'Token and password are required' })
  }

  // Verify token
  let decoded
  try {
    decoded = jwt.verify(token, process.env.JWT_RESET_SECRET)
  } catch (error) {
    return res.status(400).json({ error: 'Invalid or expired reset token' })
  }

  const user = await User.findById(decoded.userId)
  if (!user || user.resetToken !== token) {
    return res.status(400).json({ error: 'Invalid reset token' })
  }

  // Check token expiry
  if (user.resetTokenExpiry < new Date()) {
    return res.status(400).json({ error: 'Reset token has expired' })
  }

  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' })
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Update password and clear reset token
  user.passwordHash = hashedPassword
  user.resetToken = null
  user.resetTokenExpiry = null
  await user.save()

  // Send confirmation email
  try {
    await sendEmail({
      to: user.email,
      subject: 'Password Changed - MediDetect',
      template: 'passwordChanged',
      data: {
        userName: user.name,
      },
    })
  } catch (error) {
    console.error('Email sending error:', error)
  }

  res.json({ message: 'Password reset successfully' })
})
