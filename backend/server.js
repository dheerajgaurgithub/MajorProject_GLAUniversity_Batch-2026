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
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: 'Too many requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
})
app.use('/api/', limiter)

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://medidetect.vercel.app',
  'https://medidetect-git-main-dheerajgaur.vercel.app',
  'https://medidetect-dheerajgaur.vercel.app'
]

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true)
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      console.log(`[CORS] Blocked origin: ${origin}`)
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
}))

// Body parsing middleware
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// Root route - API information
app.get('/', (req, res) => {
  res.json({
    message: 'MediDetect Backend API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      users: '/api/users',
      reports: '/api/reports',
      articles: '/api/articles',
      admin: '/api/admin',
      ml: '/api/ml',
      contact: '/api/contact'
    },
    documentation: 'https://github.com/dheerajgaurgithub/MajorProject_GLAUniversity_Batch-2026/blob/main/backend/DEPLOYMENT.md',
    frontend: 'https://medidetect.vercel.app'
  })
})

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
import contactRoutes from './src/routes/contact.js'

// Register routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/reports', reportRoutes)
app.use('/api/articles', articleRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/ml', mlRoutes)
app.use('/api/contact', contactRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Error handling middleware
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => {
  console.log(`[v0] Server running on port ${PORT}`)
  console.log(`[v0] Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`[v0] CORS origins: ${allowedOrigins.join(', ')}`)
})

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('[v0] SIGTERM received, shutting down gracefully')
  server.close(() => {
    console.log('[v0] Process terminated')
    process.exit(0)
  })
})

process.on('SIGINT', () => {
  console.log('[v0] SIGINT received, shutting down gracefully')
  server.close(() => {
    console.log('[v0] Process terminated')
    process.exit(0)
  })
})

export default app
