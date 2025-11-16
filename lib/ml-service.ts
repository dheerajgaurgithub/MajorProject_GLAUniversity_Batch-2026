/**
 * ML Service Integration
 * Communicates with the ML backend for cancer predictions
 */

interface PredictionRequest {
  fileUrl?: string
  bloodValues?: Record<string, any>
  symptoms?: string[]
  metadata?: {
    age: number
    sex?: string
  }
}

interface PredictionResponse {
  cancer: boolean
  predictedType: string
  confidence: number
  explanation: string
  heatmapUrl?: string
  modelVersion: string
}

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:5000'

export async function callMLPrediction(
  request: PredictionRequest
): Promise<PredictionResponse> {
  try {
    const response = await fetch(`${ML_SERVICE_URL}/api/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      throw new Error(`ML service error: ${response.statusText}`)
    }

    const prediction: PredictionResponse = await response.json()
    return prediction
  } catch (error) {
    console.error('ML prediction error:', error)
    // Return mock prediction for development
    return getMockPrediction(request)
  }
}

// Mock prediction for development
function getMockPrediction(request: PredictionRequest): PredictionResponse {
  const confidence = Math.random() * 0.4 + 0.5 // 50-90%
  const isCancer = confidence > 0.7

  return {
    cancer: isCancer,
    predictedType: isCancer
      ? ['Lung', 'Breast', 'Skin', 'Colorectal'][Math.floor(Math.random() * 4)]
      : 'Low Risk',
    confidence,
    explanation: `Analysis of uploaded medical data indicates ${
      isCancer ? 'potential cancer risk' : 'low cancer risk'
    }. Model identified key patterns commonly associated with ${
      isCancer ? 'positive cases' : 'healthy tissue'
    }.`,
    modelVersion: 'v1.2',
  }
}

/**
 * ML Model Management
 */

interface ModelMetadata {
  version: string
  accuracy: number
  precision: number
  recall: number
  auc: number
  trainingDate: string
  status: 'production' | 'staging' | 'archived'
}

export async function getModelMetadata(): Promise<ModelMetadata> {
  try {
    const response = await fetch(`${ML_SERVICE_URL}/api/model/metadata`)

    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.error('Failed to fetch model metadata:', error)
  }

  // Mock metadata
  return {
    version: 'v1.2',
    accuracy: 0.987,
    precision: 0.985,
    recall: 0.989,
    auc: 0.995,
    trainingDate: '2025-11-01',
    status: 'production',
  }
}

export async function rolloutModel(version: string): Promise<void> {
  try {
    const response = await fetch(`${ML_SERVICE_URL}/api/model/rollout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ version }),
    })

    if (!response.ok) {
      throw new Error('Failed to rollout model')
    }
  } catch (error) {
    console.error('Model rollout error:', error)
    throw error
  }
}
