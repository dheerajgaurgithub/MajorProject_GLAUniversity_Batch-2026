import User from '../models/User.js'
import Report from '../models/Report.js'
import Article from '../models/Article.js'
import ModelRecord from '../models/ModelRecord.js'
import { asyncHandler } from '../middleware/errorHandler.js'

export const getStats = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments({ role: 'user' })
  const totalReports = await Report.countDocuments()
  const processedReports = await Report.countDocuments({ status: 'done' })
  const positiveReports = await Report.countDocuments({ 'prediction.cancer': true })

  // Last 7 days reports
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  const reportsLastWeek = await Report.countDocuments({ createdAt: { $gte: sevenDaysAgo } })

  res.json({
    totalUsers,
    totalReports,
    processedReports,
    positiveReports,
    reportsLastWeek,
  })
})

export const getUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search } = req.query

  let query = { role: 'user' }

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ]
  }

  const users = await User.find(query)
    .select('-passwordHash')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit)

  const total = await User.countDocuments(query)

  res.json({
    users,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    total,
  })
})

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-passwordHash')

  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }

  res.json(user)
})

export const deactivateUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { status: 'inactive', updatedAt: new Date() },
    { new: true }
  ).select('-passwordHash')

  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }

  res.json({ message: 'User deactivated', user })
})

export const reactivateUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { status: 'active', updatedAt: new Date() },
    { new: true }
  ).select('-passwordHash')

  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }

  res.json({ message: 'User reactivated', user })
})

export const suspendUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { status: 'suspended', updatedAt: new Date() },
    { new: true }
  ).select('-passwordHash')

  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }

  res.json({ message: 'User suspended', user })
})

export const getReports = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status } = req.query

  let query = {}
  if (status) query.status = status

  const reports = await Report.find(query)
    .populate('userId', 'name email')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit)

  const total = await Report.countDocuments(query)

  res.json({
    reports,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    total,
  })
})

export const reviewReport = asyncHandler(async (req, res) => {
  const { note } = req.body

  const report = await Report.findByIdAndUpdate(
    req.params.id,
    {
      'reviewedBy.adminId': req.userId,
      'reviewedBy.note': note,
      'reviewedBy.reviewedAt': new Date(),
      updatedAt: new Date(),
    },
    { new: true }
  )

  if (!report) {
    return res.status(404).json({ error: 'Report not found' })
  }

  res.json(report)
})

export const getModels = asyncHandler(async (req, res) => {
  const models = await ModelRecord.find().sort({ uploadedAt: -1 })
  res.json(models)
})

export const deployModel = asyncHandler(async (req, res) => {
  const { versionId } = req.body

  // Undeploy current deployed model
  await ModelRecord.updateMany(
    { status: 'deployed' },
    { status: 'staging' }
  )

  // Deploy new model
  const model = await ModelRecord.findByIdAndUpdate(
    versionId,
    { status: 'deployed', updatedAt: new Date() },
    { new: true }
  )

  if (!model) {
    return res.status(404).json({ error: 'Model not found' })
  }

  res.json({ message: 'Model deployed successfully', model })
})
