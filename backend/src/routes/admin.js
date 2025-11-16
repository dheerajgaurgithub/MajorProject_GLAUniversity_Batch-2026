import express from 'express'
import { protect, adminOnly } from '../middleware/auth.js'
import {
  getStats,
  getUsers,
  getUserById,
  deactivateUser,
  reactivateUser,
  suspendUser,
  getReports,
  reviewReport,
  getModels,
  deployModel,
} from '../controllers/adminController.js'
import { getAlerts, sendAlert, getAlertById } from '../controllers/alertController.js'

const router = express.Router()

router.use(protect, adminOnly)

// Stats routes
router.get('/stats', getStats)

// User management routes
router.get('/users', getUsers)
router.get('/users/:id', getUserById)
router.put('/users/:id/deactivate', deactivateUser)
router.put('/users/:id/reactivate', reactivateUser)
router.put('/users/:id/suspend', suspendUser)

// Report management routes
router.get('/reports', getReports)
router.put('/reports/:id/review', reviewReport)

// Model management routes
router.get('/models', getModels)
router.post('/models/deploy', deployModel)

router.get('/alerts', getAlerts)
router.get('/alerts/:id', getAlertById)
router.post('/alerts/send', sendAlert)

export default router
