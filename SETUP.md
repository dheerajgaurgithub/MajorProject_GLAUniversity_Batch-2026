# MediDetect - Complete Setup Guide

## Project Structure

\`\`\`
project/
├── app/                    # Next.js frontend
├── backend/                # Express.js backend
│   ├── src/
│   │   ├── models/        # MongoDB schemas
│   │   ├── controllers/   # Route handlers
│   │   ├── routes/        # API endpoints
│   │   ├── middleware/    # Auth, error handling
│   │   └── config/        # Database config
│   ├── server.js
│   └── package.json
├── lib/                    # Frontend utilities
│   ├── api-client.ts      # API client service
│   └── auth-context.ts    # Auth context provider
└── components/            # React components
\`\`\`

## Setup Instructions

### 1. Backend Setup

\`\`\`bash
cd backend
npm install
\`\`\`

Create `.env` file in backend folder:
\`\`\`env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/medidetect
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
REFRESH_TOKEN_SECRET=your_super_secret_refresh_token_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:3000
ML_SERVICE_URL=http://localhost:5001
PORT=5000
NODE_ENV=development
\`\`\`

Start backend:
\`\`\`bash
npm run dev
\`\`\`

### 2. Frontend Setup

Create `.env.local` file in root:
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
\`\`\`

Install dependencies and run:
\`\`\`bash
npm install
npm run dev
\`\`\`

### 3. Test Credentials

Admin Account:
- Email: studentbatch2026@gmail.com
- Password: gla@2026

## API Endpoints

### Authentication
- POST `/api/auth/signup` - Create new account
- POST `/api/auth/login` - Login user
- POST `/api/auth/refresh-token` - Refresh access token
- POST `/api/auth/logout` - Logout

### User
- GET `/api/users/me` - Get current user profile
- PUT `/api/users/me` - Update profile
- GET `/api/users/:id` - Get user by ID

### Reports
- POST `/api/reports` - Upload report
- GET `/api/reports` - List user reports
- GET `/api/reports/:id` - Get report details
- DELETE `/api/reports/:id` - Delete report
- GET `/api/reports/stats` - Get user statistics

### Articles
- GET `/api/articles` - List articles
- GET `/api/articles/:slug` - Get article by slug
- POST `/api/articles` - Create article (admin)
- PUT `/api/articles/:id` - Update article (admin)
- DELETE `/api/articles/:id` - Delete article (admin)

### Admin
- GET `/api/admin/stats` - System statistics
- GET `/api/admin/users` - List all users
- PUT `/api/admin/users/:id/deactivate` - Deactivate user
- PUT `/api/admin/users/:id/reactivate` - Reactivate user
- GET `/api/admin/reports` - List all reports
- PUT `/api/admin/reports/:id/review` - Review report
- GET `/api/admin/models` - List ML models
- POST `/api/admin/models/deploy` - Deploy model version

## Database Schemas

### User
\`\`\`javascript
{
  name: String,
  email: String (unique),
  passwordHash: String,
  role: 'user' | 'admin',
  age: Number,
  lastLogin: Date,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### Report
\`\`\`javascript
{
  userId: ObjectId,
  patientName: String,
  age: Number,
  uploadedFiles: [{ url, type, filename }],
  inputType: 'image' | 'pdf' | 'blood' | 'symptom' | 'hybrid',
  bloodValues: { hba1c, wbc, rbc, glucose },
  symptoms: [String],
  prediction: {
    cancer: Boolean,
    predictedType: String,
    confidence: Number,
    explanation: String,
    modelVersion: String,
    heatmapUrl: String
  },
  status: 'processing' | 'done' | 'failed',
  createdAt: Date
}
\`\`\`

## Key Features

- Multi-type report upload (images, PDFs, blood values, symptoms)
- Real-time prediction with confidence scores
- User profile management
- Admin dashboard with analytics
- Article management system
- JWT-based authentication
- Cloudinary file storage integration
- MongoDB database
- CORS and security middleware

## Deployment

### Backend (Heroku / Railway / AWS)
1. Set environment variables
2. Deploy with MongoDB connection string
3. Update FRONTEND_URL environment variable

### Frontend (Vercel)
1. Set NEXT_PUBLIC_API_URL to your backend URL
2. Deploy using Vercel CLI or GitHub integration

## Next Steps

- Replace mock ML predictions with real ML service
- Integrate email notifications
- Add PDF export functionality
- Implement advanced analytics
- Add real-time notifications with WebSockets
