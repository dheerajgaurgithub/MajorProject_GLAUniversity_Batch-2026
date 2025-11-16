import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  age: {
    type: Number,
    min: 18,
  },
  lastLogin: Date,
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  bio: {
    type: String,
    maxlength: 500,
  },
  avatar: {
    type: String,
    // URL to cloudinary or any image service
  },
  phone: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
  },
  resetToken: String,
  resetTokenExpiry: Date,
  language: {
    type: String,
    enum: ['en', 'es', 'fr', 'de', 'zh', 'hi', 'pt', 'ar'],
    default: 'en',
  },
  theme: {
    type: String,
    enum: ['light', 'dark', 'system'],
    default: 'system',
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active',
  },
  emailNotifications: {
    type: Boolean,
    default: true,
  },
  adminAlerts: {
    type: Boolean,
    default: true,
  },
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) return next()
  try {
    const salt = await bcrypt.genSalt(10)
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt)
    next()
  } catch (error) {
    next(error)
  }
})

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.passwordHash)
}

export default mongoose.model('User', userSchema)
