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

// Public routes
router.get('/:id', getUserById)

// Protected routes
router.get('/profile/me', protect, getProfile)
router.put('/profile/me', protect, updateProfile)
router.put('/notifications', protect, updateNotifications)

router.get('/admin/profile', protect, getAdminProfile)
router.put('/admin/profile', protect, updateAdminProfile)

export default router
