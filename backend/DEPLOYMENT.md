# MediDetect Backend Deployment Guide

## Render Deployment Environment Variables

This guide outlines all the environment variables needed to deploy the MediDetect backend on Render.

### Required Environment Variables

Copy these environment variables to your Render service's Environment section:

#### 1. **Server Configuration**
```
NODE_ENV=production
PORT=5000
```

#### 2. **Database Configuration** (Required)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/medidetect?retryWrites=true&w=majority
```
- Get this from MongoDB Atlas
- Replace `username` and `password` with your database credentials
- Make sure your IP is whitelisted in MongoDB Atlas (or use 0.0.0.0/0 for any IP)

#### 3. **JWT Configuration** (Required)
```
JWT_SECRET=your-super-secret-jwt-key-here-change-in-production
JWT_EXPIRE=7d
```
- Generate a strong, random JWT secret
- Use at least 32 characters
- Example: `openssl rand -base64 32`

#### 4. **Email Configuration** (Required for password reset, notifications)
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_PASSWORD=your-app-specific-password
```
- Use Gmail SMTP with App Password (not regular password)
- Enable 2-factor authentication on Gmail
- Generate App Password: Google Account → Security → App Passwords

#### 5. **Cloudinary Configuration** (Required for file uploads)
```
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```
- Get these from your Cloudinary dashboard
- Cloud Name is in the dashboard URL
- API Key & Secret are in Settings → API Keys

#### 6. **Rate Limiting** (Optional)
```
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```
- 900000ms = 15 minutes
- Adjust based on your needs

#### 7. **Security** (Optional)
```
BCRYPT_SALT_ROUNDS=12
```
- Higher rounds = more secure but slower
- 12 is recommended for production

### Optional Environment Variables

#### ML API Configuration (if using external ML service)
```
ML_API_URL=https://your-ml-api.com/predict
ML_API_KEY=your-ml-api-key
```

## Render Deployment Steps

### 1. Create a New Web Service
- Go to Render Dashboard
- Click "New +" → "Web Service"
- Connect your GitHub repository
- Select the `backend` folder as root directory

### 2. Configure Build and Start Commands
**Build Command:**
```
npm install
```

**Start Command:**
```
npm start
```

### 3. Set Environment Variables
Add all the environment variables from the "Required Environment Variables" section above.

### 4. Configure Health Check
- Health Check Path: `/health`
- The server already has a health check endpoint

### 5. Deploy
- Click "Create Web Service"
- Render will build and deploy your application

## Post-Deployment Checklist

- [ ] Verify the health endpoint: `https://your-service-url.onrender.com/health`
- [ ] Test user registration and login
- [ ] Test file upload functionality
- [ ] Test email functionality (password reset)
- [ ] Check CORS is working with your frontend
- [ ] Monitor logs for any errors

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check MONGODB_URI is correct
   - Verify IP whitelisting in MongoDB Atlas
   - Ensure username/password are correct

2. **CORS Issues**
   - Verify your frontend URL is in the allowed origins list
   - Check if frontend is making requests to correct backend URL

3. **Email Not Working**
   - Verify Gmail App Password (not regular password)
   - Check 2FA is enabled on Gmail account
   - Ensure EMAIL_USER and EMAIL_PASSWORD are correct

4. **File Upload Issues**
   - Verify Cloudinary credentials
   - Check Cloudinary API limits
   - Ensure file size is within limits

### Log Monitoring

Check your Render service logs for:
- Database connection status
- CORS blocked requests
- Email service errors
- File upload errors

## Security Notes

- Never commit `.env` file to version control
- Use strong, unique secrets for JWT
- Rotate secrets periodically
- Monitor API usage and set appropriate rate limits
- Keep dependencies updated

## Local Development

For local development, copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

Then start the server:

```bash
npm run dev
```

The server will run on `http://localhost:5000` and accept requests from `http://localhost:3000`.
