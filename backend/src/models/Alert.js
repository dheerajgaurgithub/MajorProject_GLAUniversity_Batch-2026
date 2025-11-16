const mongoose = require('mongoose')

const alertSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sentTo: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['draft', 'sent'],
    default: 'draft',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Alert', alertSchema)
