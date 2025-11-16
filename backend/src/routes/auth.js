import express from 'express'
import { signup, login, refreshToken, logout } from '../controllers/authController.js'
import { forgotPassword, resetPassword } from '../controllers/passwordController.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/refresh-token', refreshToken)
router.post('/logout', logout)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)

export default router
