import mongoose from 'mongoose'

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
  },
  body: {
    type: String,
    required: true,
  },
  summary: String,
  tags: [String],
  author: String,
  imageUrl: String,
  published: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

articleSchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }
  next()
})

export default mongoose.model('Article', articleSchema)
