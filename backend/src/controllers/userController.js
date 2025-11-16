import User from '../models/User.js'
import { asyncHandler } from '../middleware/errorHandler.js'

export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId).select('-passwordHash')

  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }

  res.json(user)
})

export const updateProfile = asyncHandler(async (req, res) => {
  const { name, age, phone, location, bio, avatar, language, theme } = req.body

  const user = await User.findByIdAndUpdate(
    req.userId,
    { 
      name, 
      age, 
      phone,
      location,
      bio,
      avatar,
      language,
      theme,
      updatedAt: new Date() 
    },
    { new: true, runValidators: true }
  ).select('-passwordHash')

  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }

  res.json(user)
})

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-passwordHash')

  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }

  res.json(user)
})

export const updateNotifications = asyncHandler(async (req, res) => {
  const { emailNotifications, adminAlerts } = req.body

  const user = await User.findByIdAndUpdate(
    req.userId,
    { emailNotifications, adminAlerts },
    { new: true }
  ).select('-passwordHash')

  res.json(user)
})

export const getAdminProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId).select('-passwordHash')

  if (!user || user.role !== 'admin') {
    return res.status(403).json({ error: 'Not authorized' })
  }

  const totalUsers = await User.countDocuments({ role: 'user' })
  const totalReports = await User.countDocuments() // Mock - should count reports from Report model

  res.json({
    ...user.toObject(),
    totalUsers,
    totalReports,
  })
})

export const updateAdminProfile = asyncHandler(async (req, res) => {
  const { name, phone, location } = req.body

  const user = await User.findByIdAndUpdate(
    req.userId,
    { name, phone, location, updatedAt: new Date() },
    { new: true }
  ).select('-passwordHash')

  res.json(user)
})
