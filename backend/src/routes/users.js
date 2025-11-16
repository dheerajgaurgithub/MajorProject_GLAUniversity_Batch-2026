import express from 'express'
import { protect } from '../middleware/auth.js'
import { 
  getProfile, 
  updateProfile, 
  getUserById,
  updateNotifications,
  getAdminProfile,
  updateAdminProfile,
} from '../controllers/userController.js'

const router = express.Router()

// Protected routes (must be before :id to avoid matching conflict)
router.get('/me', protect, getProfile)
router.put('/me', protect, updateProfile)
router.put('/notifications', protect, updateNotifications)

router.get('/admin/profile', protect, getAdminProfile)
router.put('/admin/profile', protect, updateAdminProfile)

// Public routes
router.get('/:id', getUserById)

export default router
