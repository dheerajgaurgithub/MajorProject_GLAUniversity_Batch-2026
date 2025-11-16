import mongoose from 'mongoose'

const modelRecordSchema = new mongoose.Schema({
  version: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  description: String,
  metrics: {
    accuracy: Number,
    precision: Number,
    recall: Number,
    auc: Number,
    f1Score: Number,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['deployed', 'staging', 'archived'],
    default: 'staging',
  },
  modelUrl: String,
  performanceReport: String,
})

export default mongoose.model('ModelRecord', modelRecordSchema)
