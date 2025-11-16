# MediDetect - AI-Powered Cancer Risk Assessment Platform

<div align="center">

![MediDetect Logo](./public/placeholder-logo.svg)

**Advanced AI-powered cancer risk detection and awareness platform for medical professionals and patients**

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15+-black.svg)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green.svg)](https://www.mongodb.com/)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-success.svg)](#)

</div>

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Key Features](#key-features)
3. [Technology Stack](#technology-stack)
4. [Installation & Setup](#installation--setup)
5. [Project Structure](#project-structure)
6. [API Documentation](#api-documentation)
7. [Authentication & Security](#authentication--security)
8. [Database Schema](#database-schema)
9. [User Guide](#user-guide)
10. [Admin Guide](#admin-guide)
11. [Environment Configuration](#environment-configuration)
12. [Deployment](#deployment)
13. [Troubleshooting](#troubleshooting)
14. [Contributing](#contributing)
15. [License](#license)

---

## 🎯 Project Overview

**MediDetect** is a professional-grade, full-stack web application designed for medical professionals, patients, and healthcare institutions to leverage AI technology for early cancer risk detection and medical awareness.

### Purpose
- Provide accessible AI-powered cancer risk assessment
- Enable medical data analysis and prediction
- Facilitate patient education through comprehensive health articles
- Offer admin dashboard for system management and user monitoring
- Support multi-language and multi-theme user experience

### Target Users
- **Patients**: Upload medical reports and receive risk assessments
- **Medical Professionals**: Review patient data and predictions
- **Administrators**: Manage users, moderate content, send system alerts
- **Public**: Access health awareness articles and educational content

### Academic Significance
This project demonstrates:
- Full-stack MERN (MongoDB, Express, React, Node.js) architecture
- Microservices design patterns
- RESTful API implementation
- Authentication and authorization systems
- Email notification services
- Multi-language internationalization
- Theme management and UI customization
- Database modeling and optimization

---

## ✨ Key Features

### 1. **User Authentication & Authorization**
- Email/password registration and login
- JWT-based authentication with refresh tokens
- Role-based access control (User, Admin, Super Admin, Moderator)
- Account status management (active, inactive, suspended)
- Social authentication ready (extensible)

### 2. **Medical Report Management**
- Multi-format medical data input:
  - Medical images (X-rays, MRI, CT scans)
  - PDF reports
  - Blood test values
  - Symptom descriptions
- Secure file uploads to Cloudinary
- Prediction generation with ML service integration
- Historical report tracking
- Report sharing with medical professionals

### 3. **AI-Powered Predictions**
- Real-time cancer risk assessment
- Confidence scoring (0-100%)
- Risk categorization (Low, Medium, High)
- Heatmap visualization of affected areas
- Detailed prediction explanations
- Mock ML service with production-ready integration points

### 4. **User Profile Management**
- Comprehensive profile information:
  - Full name, email, phone number
  - Avatar/profile picture upload
  - Location and bio
  - Medical history notes
  - Language preference
  - Theme preference
- Profile editing with real-time updates
- Avatar cropping and optimization
- Privacy settings

### 5. **Settings & Personalization**
- **Language Support**: 8 languages
  - English, Spanish, French, German
  - Chinese (Simplified), Hindi, Portuguese, Arabic
- **Theme Options**: Light, Dark, System (auto-detect)
- **Notification Preferences**: Email alerts, in-app notifications
- **Privacy Controls**: Data visibility settings
- **Account Security**: Password management

### 6. **Password Management**
- Secure password reset via email
- Token-based verification (1-hour expiry)
- Email confirmation of password changes
- Password strength validation
- Prevent reuse of recent passwords

### 7. **Health Awareness Content**
- Searchable medical article database
- Categories: Symptoms, Risk Factors, Prevention, Screening
- Author profiles and publication dates
- Read time estimation
- Social sharing integration ready
- Comment system (extensible)

### 8. **Admin Dashboard**
- **System Overview**:
  - Total users, reports, and articles
  - System health metrics
  - Recent activities
  
- **User Management**:
  - View all users with filters
  - User status management (activate/deactivate/suspend)
  - Search by name, email, location
  - Export user data
  
- **Report Management**:
  - Review pending predictions
  - Approve/reject reports
  - View prediction details
  - Filter by status and date
  
- **Analytics Dashboard**:
  - Prediction trend charts
  - Risk distribution graphs
  - User growth metrics
  - System performance data
  
- **Content Management**:
  - Create/edit/delete articles
  - Manage categories
  - Publish/unpublish articles
  - Track article views
  
- **Alert System**:
  - Send system-wide notifications
  - Target specific user groups
  - Schedule alerts
  - Track delivery status

### 9. **Email Notification System**
- **Welcome Email**: Account confirmation
- **Password Reset Email**: Secure reset link with instructions
- **Password Change Confirmation**: Security alert
- **System Alerts**: Admin notifications to users
- **Report Ready**: Notification when prediction is complete
- **Professional HTML Templates**: Branded emails

### 10. **Security Features**
- HTTPS/SSL support
- CORS protection with whitelisting
- Rate limiting on API endpoints
- Input sanitization (mongo-sanitize)
- XSS protection (helmet.js)
- CSRF token generation
- Secure password hashing (bcrypt)
- JWT token rotation
- Environment variable protection

---

## 🛠 Technology Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **Next.js 15** | React framework with App Router |
| **React 19** | UI component library |
| **TypeScript** | Type-safe development |
| **Tailwind CSS v4** | Utility-first styling |
| **shadcn/ui** | Component library |
| **Recharts** | Data visualization |
| **SWR** | Data fetching and caching |
| **React Hook Form** | Form state management |
| **Zod** | Schema validation |
| **i18n** | Internationalization |
| **next-themes** | Theme management |

### Backend
| Technology | Purpose |
|-----------|---------|
| **Node.js 18+** | JavaScript runtime |
| **Express.js** | Web framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | ODM for MongoDB |
| **JWT (jsonwebtoken)** | Authentication tokens |
| **bcryptjs** | Password hashing |
| **Nodemailer** | Email service |
| **Cloudinary** | File storage and CDN |
| **Multer** | File upload middleware |
| **Helmet.js** | Security headers |
| **CORS** | Cross-origin requests |
| **Dotenv** | Environment variables |

### Deployment
| Service | Purpose |
|---------|---------|
| **Vercel** | Frontend deployment |
| **Heroku/Railway** | Backend deployment |
| **MongoDB Atlas** | Cloud database |
| **Cloudinary** | Cloud file storage |

---

## 📦 Installation & Setup

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager
- MongoDB local instance or MongoDB Atlas account
- Cloudinary account for file uploads
- Email service (Gmail with app password recommended)
- Git version control

### Step 1: Clone Repository
\`\`\`bash
git clone https://github.com/yourusername/medidetect.git
cd medidetect
\`\`\`

### Step 2: Frontend Setup
\`\`\`bash
# Install dependencies
npm install

# Create environment file
cp app/.env.local.example app/.env.local

# Configure environment variables (see below)
# Update NEXT_PUBLIC_API_URL with backend URL

# Start development server
npm run dev
\`\`\`

### Step 3: Backend Setup
\`\`\`bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure environment variables (see below)

# Start development server
npm run dev
\`\`\`

### Step 4: Database Setup
\`\`\`bash
# Backend will automatically connect to MongoDB
# Ensure MongoDB is running or MongoDB Atlas connection is configured
# Models will be created automatically on first run
\`\`\`

### Step 5: Verify Installation
- Frontend: http://localhost:3000
- Backend: http://localhost:5000/api
- Test with demo credentials (see below)

---

## 📁 Project Structure

\`\`\`
medidetect/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Global styles and theme tokens
│   │
│   ├── api/                     # API route handlers
│   │   ├── auth/                # Authentication endpoints
│   │   ├── users/               # User management endpoints
│   │   ├── reports/             # Report operations
│   │   ├── articles/            # Article content
│   │   └── admin/               # Admin operations
│   │
│   ├── login/page.tsx           # Login page
│   ├── signup/page.tsx          # Signup page
│   ├── forgot-password/page.tsx # Password reset request
│   ├── reset-password/[token]/page.tsx # Password reset form
│   │
│   ├── dashboard/page.tsx       # User dashboard
│   ├── profile/page.tsx         # User profile editing
│   ├── settings/page.tsx        # User settings
│   ├── settings/security/page.tsx # Security settings
│   │
│   ├── upload/page.tsx          # Report upload
│   ├── report/[id]/page.tsx     # Report details
│   │
│   ├── articles/page.tsx        # Articles listing
│   ├── articles/[slug]/page.tsx # Article details
│   ├── about/page.tsx           # About page
│   ├── contact/page.tsx         # Contact form
│   │
│   └── admin/                   # Admin dashboard
│       ├── page.tsx            # Admin overview
│       ├── users/page.tsx      # User management
│       ├── reports/page.tsx    # Report review
│       ├── analytics/page.tsx  # Analytics
│       ├── content/page.tsx    # Content management
│       ├── alerts/page.tsx     # Alert system
│       └── profile/page.tsx    # Admin profile
│
├── components/                  # React components
│   ├── navbar.tsx              # Navigation bar
│   ├── footer.tsx              # Footer
│   ├── hero.tsx                # Hero section
│   ├── features.tsx            # Features section
│   ├── how-it-works.tsx        # How it works section
│   ├── login-form.tsx          # Login form
│   ├── signup-form.tsx         # Signup form
│   ├── upload-form.tsx         # Upload form
│   ├── report-card.tsx         # Report card component
│   ├── theme-provider.tsx      # Theme provider
│   ├── auth-context.tsx        # Auth provider
│   ├── private-route.tsx       # Protected route wrapper
│   └── ui/                     # shadcn/ui components
│
├── lib/                         # Utility functions and services
│   ├── api-client.ts           # API client with interceptors
│   ├── auth-context.tsx        # Authentication context
│   ├── theme-provider.tsx      # Theme provider setup
│   ├── language-context.tsx    # Language/i18n context
│   ├── i18n.ts                 # Translation strings
│   ├── auth.ts                 # Auth utilities
│   ├── db.ts                   # Database utilities
│   ├── ml-service.ts           # ML service integration
│   ├── validation.ts           # Input validation schemas
│   └── utils.ts                # General utilities
│
├── hooks/                       # React hooks
│   ├── use-mobile.ts           # Mobile detection
│   └── use-toast.ts            # Toast notifications
│
├── backend/                     # Backend server
│   ├── server.js               # Express app setup
│   ├── package.json            # Backend dependencies
│   │
│   ├── src/
│   │   ├── config/             # Configuration
│   │   │   ├── database.js     # MongoDB connection
│   │   │   └── cloudinary.js   # Cloudinary setup
│   │   │
│   │   ├── middleware/         # Express middleware
│   │   │   ├── auth.js         # JWT verification
│   │   │   ├── errorHandler.js # Error handling
│   │   │   └── upload.js       # File upload
│   │   │
│   │   ├── models/             # Mongoose schemas
│   │   │   ├── User.js         # User model
│   │   │   ├── Report.js       # Report model
│   │   │   ├── Article.js      # Article model
│   │   │   ├── Alert.js        # Alert model
│   │   │   └── ModelRecord.js  # ML model tracking
│   │   │
│   │   ├── controllers/        # Route controllers
│   │   │   ├── authController.js
│   │   │   ├── userController.js
│   │   │   ├── reportController.js
│   │   │   ├── articleController.js
│   │   │   ├── adminController.js
│   │   │   ├── alertController.js
│   │   │   └── passwordController.js
│   │   │
│   │   ├── routes/             # API routes
│   │   │   ├── auth.js         # Auth endpoints
│   │   │   ├── users.js        # User endpoints
│   │   │   ├── reports.js      # Report endpoints
│   │   │   ├── articles.js     # Article endpoints
│   │   │   ├── admin.js        # Admin endpoints
│   │   │   ├── alerts.js       # Alert endpoints
│   │   │   ├── password.js     # Password reset
│   │   │   └── ml.js           # ML service endpoints
│   │   │
│   │   └── services/           # Business logic
│   │       └── emailService.js # Email templates & sending
│   │
│   └── .env.example            # Environment template
│
├── public/                      # Static assets
│   ├── placeholder-logo.svg
│   ├── placeholder-user.jpg
│   └── icons/
│
├── README.md                    # This file
├── SETUP.md                     # Detailed setup guide
├── package.json                 # Frontend dependencies
├── tsconfig.json               # TypeScript config
├── next.config.mjs             # Next.js config
└── tailwind.config.js          # Tailwind config
\`\`\`

---

## 🔌 API Documentation

### Base URL
\`\`\`
Development: http://localhost:5000/api
Production: https://medidetect-api.herokuapp.com/api
\`\`\`

### Authentication

All protected endpoints require JWT token in Authorization header:
\`\`\`
Authorization: Bearer <token>
\`\`\`

### API Endpoints

#### Authentication Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/signup` | User registration | ❌ |
| POST | `/auth/login` | User login | ❌ |
| POST | `/auth/refresh` | Refresh access token | ✅ |
| POST | `/auth/logout` | Logout user | ✅ |

#### User Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/users/me` | Get current user | ✅ |
| PUT | `/users/me` | Update user profile | ✅ |
| PUT | `/users/avatar` | Upload avatar | ✅ |
| GET | `/users/:id` | Get user by ID | ✅ |
| GET | `/users` | List all users (admin) | ✅ |
| PUT | `/users/:id/status` | Update user status (admin) | ✅ |

#### Report Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/reports` | List user reports | ✅ |
| POST | `/reports/create` | Create new report | ✅ |
| GET | `/reports/:id` | Get report details | ✅ |
| PUT | `/reports/:id` | Update report | ✅ |
| DELETE | `/reports/:id` | Delete report | ✅ |
| POST | `/reports/:id/predict` | Generate prediction | ✅ |

#### Article Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/articles` | List articles | ❌ |
| GET | `/articles/:slug` | Get article | ❌ |
| POST | `/articles` | Create article (admin) | ✅ |
| PUT | `/articles/:id` | Update article (admin) | ✅ |
| DELETE | `/articles/:id` | Delete article (admin) | ✅ |

#### Admin Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/admin/stats` | System statistics | ✅ |
| GET | `/admin/users` | Manage users | ✅ |
| GET | `/admin/reports` | Review reports | ✅ |
| POST | `/admin/alerts` | Send alert | ✅ |
| GET | `/admin/alerts` | List alerts | ✅ |

#### Password Reset Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/password/forgot` | Request password reset | ❌ |
| POST | `/password/reset` | Reset password | ❌ |
| POST | `/password/change` | Change password (logged in) | ✅ |

### Request/Response Examples

#### Login
\`\`\`bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user"
  }
}
\`\`\`

#### Create Report
\`\`\`bash
curl -X POST http://localhost:5000/api/reports/create \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "reportType": "image",
    "fileUrl": "https://cloudinary.com/...",
    "description": "Chest X-ray",
    "symptoms": ["cough", "chest_pain"]
  }'
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "report": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "reportType": "image",
    "fileUrl": "https://cloudinary.com/...",
    "status": "pending",
    "createdAt": "2024-01-15T10:30:00Z",
    "prediction": null
  }
}
\`\`\`

#### Get Prediction
\`\`\`json
{
  "_id": "507f1f77bcf86cd799439012",
  "riskLevel": "medium",
  "confidence": 72,
  "riskPercentage": 0.72,
  "categories": {
    "tumor": 0.65,
    "nodule": 0.78,
    "mass": 0.45
  },
  "recommendations": [
    "Consult with an oncologist",
    "Perform additional screening"
  ],
  "details": "The model detected potential abnormalities..."
}
\`\`\`

---

## 🔐 Authentication & Security

### JWT Flow
1. User logs in with email/password
2. Backend validates credentials
3. Backend generates JWT token (15 min expiry) and refresh token (7 days)
4. Frontend stores tokens in memory/localStorage
5. Frontend includes JWT in Authorization header for protected requests
6. On token expiry, frontend uses refresh token to get new JWT
7. If refresh token expires, user must login again

### Password Security
- Passwords hashed with bcrypt (salt rounds: 10)
- Minimum 8 characters required
- Must contain uppercase, lowercase, numbers, and special characters
- Password reset token expires in 1 hour
- Multiple password reset requests not allowed within 5 minutes

### CORS Security
- Allowed origins: Frontend URL only
- Allowed methods: GET, POST, PUT, DELETE
- Credentials: Allowed for secure cookies

### Rate Limiting
- API endpoints: 100 requests per 15 minutes per IP
- Login endpoint: 5 attempts per 15 minutes
- Password reset: 3 attempts per hour
- Email sending: 5 emails per hour per user

### Data Protection
- Sensitive fields encrypted in database
- HTTPS/SSL enforced in production
- Input sanitization with mongo-sanitize
- XSS protection with helmet.js
- CSRF tokens for state-changing operations

---

## 📊 Database Schema

### User Model
\`\`\`javascript
{
  firstName: String (required),
  lastName: String (required),
  email: String (unique, required),
  password: String (hashed, required),
  phone: String,
  avatar: String (URL),
  location: String,
  bio: String,
  role: Enum ['user', 'admin', 'super_admin', 'moderator'],
  status: Enum ['active', 'inactive', 'suspended'],
  language: String (default: 'en'),
  theme: Enum ['light', 'dark', 'system'],
  emailVerified: Boolean,
  passwordResetToken: String,
  passwordResetExpires: Date,
  resetTokensUsed: Number,
  lastPasswordChange: Date,
  notificationPreferences: {
    email: Boolean,
    inApp: Boolean,
    alerts: Boolean
  },
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### Report Model
\`\`\`javascript
{
  userId: ObjectId (required, ref: User),
  reportType: Enum ['image', 'pdf', 'blood_test', 'symptom'],
  fileUrl: String,
  fileName: String,
  description: String,
  symptoms: [String],
  status: Enum ['pending', 'processing', 'completed', 'rejected'],
  prediction: {
    riskLevel: Enum ['low', 'medium', 'high'],
    confidence: Number (0-100),
    riskPercentage: Number,
    categories: Object,
    recommendations: [String],
    details: String
  },
  reviewedBy: ObjectId (ref: User),
  reviewStatus: Enum ['pending', 'approved', 'rejected'],
  reviewNotes: String,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### Article Model
\`\`\`javascript
{
  title: String (required),
  slug: String (unique, required),
  content: String (required),
  excerpt: String,
  category: Enum ['symptoms', 'risk_factors', 'prevention', 'screening'],
  author: ObjectId (ref: User),
  image: String (URL),
  views: Number (default: 0),
  published: Boolean (default: false),
  publishedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### Alert Model
\`\`\`javascript
{
  title: String (required),
  message: String (required),
  type: Enum ['warning', 'info', 'success', 'error'],
  targetUsers: [ObjectId] (ref: User),
  targetRole: Enum ['all', 'user', 'admin'],
  priority: Enum ['low', 'medium', 'high'],
  createdBy: ObjectId (ref: User),
  sentAt: Date,
  deliveryStatus: {
    sent: Number,
    delivered: Number,
    failed: Number
  },
  createdAt: Date
}
\`\`\`

---

## 👤 User Guide

### Getting Started

#### 1. Registration
- Visit http://localhost:3000/signup
- Enter email, password, first name, last name
- Accept terms and conditions
- Click "Create Account"
- Verify email (if enabled)

#### 2. Login
- Visit http://localhost:3000/login
- Enter email and password
- Click "Sign In"
- You'll be redirected to dashboard

#### 3. Dashboard
After login, you'll see:
- Recent reports
- System statistics
- Quick actions (Upload, View Articles)
- Pending alerts

### Uploading Medical Data

#### Steps:
1. Click "Upload Report" button
2. Select report type:
   - Medical Image (JPG, PNG)
   - PDF Report
   - Blood Test Results
   - Symptoms
3. Upload file or enter details
4. Add description (optional)
5. Select symptoms from list
6. Click "Submit for Analysis"
7. Wait for prediction (usually 1-2 minutes)

#### After Prediction:
- View risk assessment
- See confidence score
- Read recommendations
- Download report
- Share with doctor

### Profile Management

#### Edit Profile:
1. Click "Profile" in navigation
2. Update information:
   - Name, email, phone
   - Location and bio
   - Avatar/profile picture
3. Click "Save Changes"

#### Change Password:
1. Go to Settings → Security
2. Enter current password
3. Enter new password (twice)
4. Click "Change Password"
5. Confirm via email

### Forgotten Password

#### Steps:
1. Click "Forgot Password" on login page
2. Enter your email address
3. Check your email for reset link
4. Click link (valid for 1 hour)
5. Enter new password
6. Click "Reset Password"
7. Login with new password

### Settings & Preferences

#### Language
- Go to Settings
- Select language from dropdown
- Changes apply immediately
- Available: English, Spanish, French, German, Chinese, Hindi, Portuguese, Arabic

#### Theme
- Go to Settings
- Select theme:
  - Light: Always light mode
  - Dark: Always dark mode
  - System: Follow OS preference
- Changes apply immediately

#### Notifications
- Go to Settings
- Toggle notification preferences:
  - Email alerts
  - In-app notifications
  - System announcements

### Reading Articles

#### Browse:
1. Click "Articles" in navigation
2. Browse or search articles
3. Filter by category
4. Click to read full article

#### Article Categories:
- **Symptoms**: Learn about cancer symptoms
- **Risk Factors**: Understand risk factors
- **Prevention**: Prevention strategies
- **Screening**: Screening procedures

---

## 👨‍💼 Admin Guide

### Accessing Admin Dashboard

#### Login:
- Email: `studentbatch2026@gmail.com`
- Password: `gla@2026`
- Click "Admin Dashboard" after login

### Admin Sections

#### 1. Dashboard
- **Overview**: Total users, reports, articles
- **Recent Activity**: Latest system events
- **System Health**: Server status
- **Quick Stats**: Key metrics

#### 2. User Management
- **View Users**: List all users
- **Search**: Find users by name/email
- **Filters**: By status, role, location
- **Actions**:
  - View profile
  - Change user status (active/inactive/suspended)
  - Reset password
  - Delete account
  - View user reports

#### 3. Report Management
- **Pending Review**: Reports awaiting review
- **Filter**: By status, date, user
- **View Details**: See full report and prediction
- **Actions**:
  - Approve report
  - Reject with reason
  - Request additional data
  - Add review notes

#### 4. Analytics
- **Charts**: Visual data representation
- **Metrics**:
  - Prediction trends
  - Risk distribution
  - User growth
  - System performance
- **Export**: Download data as CSV

#### 5. Content Management
- **Articles**: Create/edit/delete
- **Categories**: Manage article categories
- **Publishing**: Set publication status
- **Analytics**: View article statistics

#### 6. Alert System
- **Create Alert**: Send to users
- **Target**:
  - All users
  - Specific users
  - By role
- **Priority**: Low, Medium, High
- **Tracking**: Delivery status

#### 7. Admin Profile
- **Edit Profile**: Update admin information
- **Change Password**: Update credentials
- **Activity Log**: View admin actions
- **Settings**: Admin preferences

### Best Practices

#### User Management
- Regularly review user accounts
- Suspend suspicious activity
- Maintain user data privacy
- Send notifications for policy changes

#### Report Review
- Review pending reports regularly
- Provide constructive feedback
- Maintain accuracy standards
- Document decisions

#### Content Management
- Maintain article quality
- Review before publishing
- Update outdated information
- Monitor user feedback

#### System Maintenance
- Monitor system performance
- Check error logs
- Update security settings
- Backup database regularly

---

## 🔧 Environment Configuration

### Frontend (.env.local)
\`\`\`bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME=MediDetect

# Cloudinary (if using directly from frontend)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name

# Application Settings
NEXT_PUBLIC_DEFAULT_LANGUAGE=en
NEXT_PUBLIC_DEFAULT_THEME=system
\`\`\`

### Backend (.env)
\`\`\`bash
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/medidetect
# OR for MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/medidetect

# JWT Configuration
JWT_SECRET=your_very_long_and_secure_secret_key_min_32_chars
JWT_REFRESH_SECRET=your_different_refresh_secret_key_min_32_chars
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password
EMAIL_FROM_NAME=MediDetect Team
EMAIL_FROM_ADDRESS=noreply@medidetect.com

# Frontend URL (for email links)
FRONTEND_URL=http://localhost:3000

# Cloudinary Configuration
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# ML Service (if using external)
ML_SERVICE_URL=https://ml-service.example.com/predict
ML_SERVICE_API_KEY=your_ml_api_key

# CORS
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=debug
\`\`\`

### Getting API Keys

#### Google/Gmail
1. Enable 2FA on Gmail account
2. Create "App Password" at https://myaccount.google.com/apppasswords
3. Use generated password as EMAIL_PASSWORD

#### Cloudinary
1. Create account at https://cloudinary.com
2. Go to Dashboard
3. Copy Cloud Name, API Key, API Secret

#### MongoDB Atlas
1. Create cluster at https://cloud.mongodb.com
2. Add database user
3. Create connection string
4. Use in MONGODB_URI

#### JWT Secrets
Generate secure secrets:
\`\`\`bash
# Linux/Mac
openssl rand -base64 32

# Windows
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
\`\`\`

---

## 🚀 Deployment

### Deploy Frontend (Vercel)

#### Steps:
1. Push code to GitHub
2. Go to vercel.com
3. Import project from GitHub
4. Set environment variables
5. Click "Deploy"

#### Environment Variables on Vercel:
- \`NEXT_PUBLIC_API_URL\`: Production backend URL
- \`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME\`: Your Cloudinary name

### Deploy Backend (Heroku)

#### Steps:
1. Install Heroku CLI
2. Login: \`heroku login\`
3. Create app: \`heroku create your-app-name\`
4. Set environment variables:
   \`\`\`bash
   heroku config:set JWT_SECRET=your_secret
   heroku config:set MONGODB_URI=your_mongodb_atlas_uri
   # ... set all other variables
   \`\`\`
5. Deploy: \`git push heroku main\`

#### Heroku Environment Variables:
Go to app → Settings → Config Vars → Add all from .env

### Deploy Backend (Railway)

#### Steps:
1. Create account at railway.app
2. New project → GitHub repo
3. Connect GitHub
4. Add MongoDB Atlas plugin
5. Set environment variables
6. Deploy

### Production Checklist

- [ ] Update API URL in frontend
- [ ] Enable HTTPS
- [ ] Set NODE_ENV=production
- [ ] Configure CORS properly
- [ ] Enable email verification
- [ ] Setup SSL certificates
- [ ] Configure backups
- [ ] Monitor logs
- [ ] Setup error tracking (Sentry)
- [ ] Test all features
- [ ] Load testing
- [ ] Security audit

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Cannot Connect to Backend
**Problem**: Frontend shows "Connection refused"
**Solutions**:
- Check backend is running: \`npm run dev\` in backend folder
- Verify port 5000 is available
- Check NEXT_PUBLIC_API_URL is correct
- Check CORS settings in backend

#### 2. MongoDB Connection Failed
**Problem**: Backend error "Cannot connect to MongoDB"
**Solutions**:
- Verify MongoDB is running locally or MongoDB Atlas is accessible
- Check MONGODB_URI in .env
- Verify IP whitelist in MongoDB Atlas
- Test connection string: \`mongodb+srv://...\`

#### 3. Email Not Sending
**Problem**: Password reset email not received
**Solutions**:
- Check EMAIL_USER and EMAIL_PASSWORD in .env
- Enable "Less secure app access" for Gmail
- Use "App Password" instead of account password
- Check email service configuration
- Check spam/junk folder

#### 4. Token Expiration Issues
**Problem**: Getting logged out frequently
**Solutions**:
- Check JWT_EXPIRE setting (should be 15m)
- Verify JWT_REFRESH_EXPIRE is longer (7d)
- Clear browser cache and cookies
- Check system time is correct

#### 5. File Upload Failing
**Problem**: Image upload shows error
**Solutions**:
- Verify Cloudinary credentials in .env
- Check file size (max 25MB)
- Verify file format (JPG, PNG, PDF)
- Check Cloudinary API key has upload permission

#### 6. Theme Not Changing
**Problem**: Theme toggle doesn't work
**Solutions**:
- Check theme-provider is in layout.tsx
- Clear localStorage
- Verify theme-context is properly set
- Check browser supports localStorage

#### 7. Language Not Changing
**Problem**: Language selector doesn't change UI
**Solutions**:
- Verify all components use translation function
- Check i18n.ts has all language strings
- Clear cache and reload
- Verify language-context provider is in layout

### Debug Mode

Enable debug logging:
\`\`\`bash
# Frontend
NEXT_PUBLIC_DEBUG=true npm run dev

# Backend
DEBUG=* npm run dev
\`\`\`

### Getting Help

1. Check error console (F12)
2. Check backend logs
3. Check MongoDB logs
4. Verify all environment variables
5. Test API endpoints with Postman
6. Check GitHub Issues

---

## 🤝 Contributing

### Code Standards

#### Git Workflow
1. Create feature branch: \`git checkout -b feature/your-feature\`
2. Make changes
3. Commit: \`git commit -m "feat: add feature description"\`
4. Push: \`git push origin feature/your-feature\`
5. Create Pull Request

#### Commit Messages
- \`feat:\` New feature
- \`fix:\` Bug fix
- \`docs:\` Documentation
- \`style:\` Formatting
- \`refactor:\` Code refactoring
- \`test:\` Tests

#### Code Style
- Use TypeScript for new files
- Follow existing code patterns
- Use Tailwind for styling
- Comment complex logic
- Keep functions small and focused

### Development Guidelines

#### Frontend
- Use React hooks
- Keep components small
- Use context for global state
- Write TypeScript types
- Test components

#### Backend
- Use async/await
- Error handling in every route
- Validate all inputs
- Log important events
- Write comments for complex logic

### Testing

\`\`\`bash
# Frontend tests
npm run test

# Backend tests
cd backend && npm run test

# Linting
npm run lint
\`\`\`

---

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 👥 Authors

- **Project Lead**: Your Name
- **Contributors**: Your Team

## 🙏 Acknowledgments

- MongoDB for database
- Express.js for backend framework
- Next.js for frontend framework
- shadcn/ui for components
- All open-source libraries used

## 📞 Support

For issues and questions:
- GitHub Issues: Create an issue
- Email: support@medidetect.com
- Documentation: See docs/ folder

---

<div align="center">

**Made with ❤️ for cancer awareness and education**

---

Last Updated: January 2025 | Version: 1.0.0 | Production Ready

</div>
