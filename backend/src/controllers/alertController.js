import Alert from '../models/Alert.js'
import User from '../models/User.js'
import { asyncHandler } from '../middleware/errorHandler.js'
import { sendEmail } from '../services/emailService.js'

export const getAlerts = asyncHandler(async (req, res) => {
  const alerts = await Alert.find()
    .populate('createdBy', 'name email')
    .sort({ createdAt: -1 })
    .limit(50)

  res.json(alerts)
})

export const sendAlert = asyncHandler(async (req, res) => {
  const { title, message, sendToAll, userIds } = req.body
  const adminId = req.userId

  // Validate input
  if (!title || !message) {
    return res.status(400).json({ error: 'Title and message are required' })
  }

  // Get recipients
  let recipients
  if (sendToAll) {
    recipients = await User.find({ role: 'user', status: 'active', adminAlerts: true })
  } else {
    recipients = await User.find({ 
      _id: { $in: userIds }, 
      status: 'active',
      adminAlerts: true 
    })
  }

  // Create alert record
  const alert = new Alert({
    title,
    message,
    createdBy: adminId,
    sentTo: recipients.length,
    status: 'sent',
  })
  await alert.save()

  // Send emails to all recipients
  const emailPromises = recipients.map((user) =>
    sendEmail({
      to: user.email,
      subject: title,
      template: 'adminAlert',
      data: {
        userName: user.name,
        title,
        message,
      },
    }).catch((error) => console.error(`Failed to send to ${user.email}:`, error))
  )

  await Promise.all(emailPromises)

  res.status(201).json(alert)
})

export const getAlertById = asyncHandler(async (req, res) => {
  const alert = await Alert.findById(req.params.id).populate('createdBy', 'name email')

  if (!alert) {
    return res.status(404).json({ error: 'Alert not found' })
  }

  res.json(alert)
})
