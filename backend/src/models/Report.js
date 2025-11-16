import mongoose from 'mongoose'

const reportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  uploadedFiles: [
    {
      url: String,
      type: { type: String, enum: ['image', 'pdf'] },
      filename: String,
    },
  ],
  inputType: {
    type: String,
    enum: ['image', 'pdf', 'blood', 'symptom', 'hybrid'],
    required: true,
  },
  bloodValues: {
    hba1c: Number,
    wbc: Number,
    rbc: Number,
    glucose: Number,
  },
  symptoms: [String],
  metadata: {
    clinic: String,
    doctor: String,
    date: Date,
  },
  prediction: {
    cancer: Boolean,
    predictedType: String,
    confidence: Number,
    explanation: String,
    modelVersion: String,
    heatmapUrl: String,
  },
  status: {
    type: String,
    enum: ['processing', 'done', 'failed'],
    default: 'processing',
  },
  reviewedBy: {
    adminId: mongoose.Schema.Types.ObjectId,
    note: String,
    reviewedAt: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('Report', reportSchema)
