import Report from '../models/Report.js'
import { asyncHandler } from '../middleware/errorHandler.js'
import cloudinary from '../config/cloudinary.js'
import axios from 'axios'

// Mock ML predictions for demo
const generateMockPrediction = (age, inputType) => {
  const predictions = [
    { cancer: true, type: 'invasive_ductal_carcinoma', confidence: 0.87 },
    { cancer: false, type: 'benign', confidence: 0.92 },
    { cancer: true, type: 'adenocarcinoma', confidence: 0.78 },
    { cancer: true, type: 'squamous_cell_carcinoma', confidence: 0.81 },
  ]
  const pred = predictions[Math.floor(Math.random() * predictions.length)]
  return {
    cancer: pred.cancer,
    predictedType: pred.type,
    confidence: pred.confidence,
    explanation: `Model detected patterns consistent with ${pred.type}. Top features: lesion_shape, density, margin_sharpness.`,
    modelVersion: 'v1.2',
    heatmapUrl: 'https://via.placeholder.com/400x400?text=Heatmap+Analysis',
  }
}

export const uploadReport = asyncHandler(async (req, res) => {
  const { patientName, age, inputType, bloodValues, symptoms, metadata } = req.body
  const userId = req.userId

  if (!patientName || !age || !inputType) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  let uploadedFiles = []

  // Upload files to Cloudinary if present
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      try {
        const result = await cloudinary.uploader.upload_stream(
          { resource_type: 'auto', folder: 'medidetect-reports' },
          (error, result) => {
            if (error) throw error
            return result
          }
        )

        // Using promise-based approach
        const uploadPromise = new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: 'auto', folder: 'medidetect-reports' },
            (error, result) => {
              if (error) reject(error)
              else resolve(result)
            }
          )
          uploadStream.end(file.buffer)
        })

        const uploadResult = await uploadPromise
        uploadedFiles.push({
          url: uploadResult.secure_url,
          type: file.mimetype.startsWith('image') ? 'image' : 'pdf',
          filename: file.originalname,
        })
      } catch (error) {
        console.error('Cloudinary upload error:', error)
      }
    }
  }

  // Create report record
  const report = new Report({
    userId,
    patientName,
    age,
    uploadedFiles,
    inputType,
    bloodValues: inputType === 'blood' ? bloodValues : undefined,
    symptoms: inputType === 'symptom' ? symptoms : undefined,
    metadata,
    status: 'processing',
  })

  await report.save()

  // Simulate ML prediction (replace with real ML service call)
  setTimeout(async () => {
    const prediction = generateMockPrediction(age, inputType)
    report.prediction = prediction
    report.status = 'done'
    await report.save()
  }, 2000)

  res.status(201).json({
    id: report._id,
    status: report.status,
    message: 'Report uploaded. Prediction in progress...',
  })
})

export const getReports = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search } = req.query
  const userId = req.userId

  let query = { userId }

  if (search) {
    query.patientName = { $regex: search, $options: 'i' }
  }

  const reports = await Report.find(query)
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit)

  const total = await Report.countDocuments(query)

  res.json({
    reports,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    total,
  })
})

export const getReportById = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id).populate('userId', 'name email')

  if (!report) {
    return res.status(404).json({ error: 'Report not found' })
  }

  // Check authorization
  if (report.userId._id.toString() !== req.userId && req.userRole !== 'admin') {
    return res.status(403).json({ error: 'Not authorized' })
  }

  res.json(report)
})

export const deleteReport = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id)

  if (!report) {
    return res.status(404).json({ error: 'Report not found' })
  }

  if (report.userId.toString() !== req.userId && req.userRole !== 'admin') {
    return res.status(403).json({ error: 'Not authorized' })
  }

  // Delete from Cloudinary
  for (const file of report.uploadedFiles) {
    try {
      const publicId = file.url.split('/').pop().split('.')[0]
      await cloudinary.uploader.destroy(`medidetect-reports/${publicId}`)
    } catch (error) {
      console.error('Cloudinary deletion error:', error)
    }
  }

  await Report.findByIdAndDelete(req.params.id)

  res.json({ message: 'Report deleted successfully' })
})

export const getStats = asyncHandler(async (req, res) => {
  const userId = req.userId

  const totalReports = await Report.countDocuments({ userId })
  const processedReports = await Report.countDocuments({ userId, status: 'done' })
  const positiveReports = await Report.countDocuments({
    userId,
    'prediction.cancer': true,
  })

  const lastReport = await Report.findOne({ userId }).sort({ createdAt: -1 })

  res.json({
    totalReports,
    processedReports,
    positiveReports,
    lastReportDate: lastReport?.createdAt || null,
  })
})
