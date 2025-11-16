import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import mongoSanitize from 'express-mongo-sanitize'
import rateLimit from 'express-rate-limit'
import { connectDB } from './src/config/database.js'
import { errorHandler } from './src/middleware/errorHandler.js'

// Load environment variables
dotenv.config()

const app = express()

// Connect to database
connectDB()

// Security middleware
app.use(helmet())
app.use(mongoSanitize())

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.',
})
app.use('/api/', limiter)

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

// Body parsing middleware
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Backend is running', timestamp: new Date() })
})

// Import routes
import authRoutes from './src/routes/auth.js'
import userRoutes from './src/routes/users.js'
import reportRoutes from './src/routes/reports.js'
import articleRoutes from './src/routes/articles.js'
import adminRoutes from './src/routes/admin.js'
import mlRoutes from './src/routes/ml.js'

// Register routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/reports', reportRoutes)
app.use('/api/articles', articleRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/ml', mlRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Error handling middleware
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`[v0] Server running on port ${PORT}`)
  console.log(`[v0] Environment: ${process.env.NODE_ENV || 'development'}`)
})

export default app
