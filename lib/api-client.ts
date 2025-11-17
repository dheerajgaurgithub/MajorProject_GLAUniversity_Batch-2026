const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export interface AuthResponse {
  user: {
    id: string
    name: string
    email: string
    role: string
    age?: number
  }
  accessToken: string
  refreshToken: string
}

export interface User {
  id: string
  name: string
  email: string
  role: string
  age?: number
  lastLogin?: string
  isActive: boolean
}

export interface Report {
  id: string
  userId: string
  patientName: string
  age: number
  uploadedFiles: Array<{ url: string; type: string; filename: string }>
  inputType: string
  prediction?: {
    cancer: boolean
    predictedType: string
    confidence: number
    explanation: string
    modelVersion: string
    heatmapUrl: string
  }
  status: 'processing' | 'done' | 'failed'
  createdAt: string
}

export interface Article {
  id: string
  title: string
  slug: string
  body: string
  summary?: string
  tags: string[]
  author: string
  imageUrl?: string
  published: boolean
  createdAt: string
  updatedAt: string
}

class APIClient {
  private baseURL: string
  private accessToken: string | null = null

  constructor(baseURL: string) {
    this.baseURL = baseURL
    this.accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
  }

  private getHeaders(includeAuth = true) {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (includeAuth && this.accessToken) {
      headers.Authorization = `Bearer ${this.accessToken}`
    }

    return headers
  }

  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`
    const includeAuth = Boolean(!endpoint.includes('/auth/') || (endpoint.includes('/auth/') && this.accessToken))

    try {
      const response = await fetch(url, {
        ...options,
        headers: this.getHeaders(includeAuth),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || `API Error: ${response.status}`)
      }

      if (response.status === 204) return null
      return await response.json()
    } catch (error) {
      throw error
    }
  }

  // Auth endpoints
  async signup(name: string, email: string, password: string, age?: number): Promise<AuthResponse> {
    const data = await this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, age }),
    })

    if (data.accessToken) {
      this.setTokens(data.accessToken, data.refreshToken)
    }

    return data
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })

    if (data.accessToken) {
      this.setTokens(data.accessToken, data.refreshToken)
    }

    return data
  }

  async logout() {
    this.clearTokens()
    return await this.request('/auth/logout', { method: 'POST' })
  }

  async refreshToken(): Promise<{ accessToken: string }> {
    const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null
    if (!refreshToken) throw new Error('No refresh token available')

    const data = await this.request('/auth/refresh-token', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    })

    if (data.accessToken) {
      this.accessToken = data.accessToken
      localStorage.setItem('accessToken', data.accessToken)
    }

    return data
  }

  // User endpoints
  async getProfile(): Promise<User> {
    return await this.request('/users/me')
  }

  async updateProfile(name: string, age?: number): Promise<User> {
    return await this.request('/users/me', {
      method: 'PUT',
      body: JSON.stringify({ name, age }),
    })
  }

  // Report endpoints
  async uploadReport(formData: FormData): Promise<{ id: string; status: string }> {
    const response = await fetch(`${this.baseURL}/reports`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Upload failed')
    }

    return await response.json()
  }

  async getReports(page = 1, limit = 10, search = ''): Promise<any> {
    return await this.request(`/reports?page=${page}&limit=${limit}&search=${search}`)
  }

  async getReport(id: string): Promise<Report> {
    return await this.request(`/reports/${id}`)
  }

  async deleteReport(id: string) {
    return await this.request(`/reports/${id}`, { method: 'DELETE' })
  }

  async getReportStats(): Promise<any> {
    return await this.request('/reports/stats')
  }

  // Article endpoints
  async getArticles(page = 1, limit = 10, tag = '', search = ''): Promise<any> {
    let url = `/articles?page=${page}&limit=${limit}`
    if (tag) url += `&tag=${tag}`
    if (search) url += `&search=${search}`
    return await this.request(url, { headers: this.getHeaders(false) })
  }

  async getArticle(slug: string): Promise<Article> {
    return await this.request(`/articles/${slug}`, { headers: this.getHeaders(false) })
  }

  async createArticle(article: Partial<Article>) {
    return await this.request('/articles', {
      method: 'POST',
      body: JSON.stringify(article),
    })
  }

  async updateArticle(id: string, article: Partial<Article>) {
    return await this.request(`/articles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(article),
    })
  }

  async deleteArticle(id: string) {
    return await this.request(`/articles/${id}`, { method: 'DELETE' })
  }

  // Admin endpoints
  async getAdminStats() {
    return await this.request('/admin/stats')
  }

  async getUsers(page = 1, limit = 10, search = ''): Promise<any> {
    return await this.request(`/admin/users?page=${page}&limit=${limit}&search=${search}`)
  }

  async deactivateUser(id: string) {
    return await this.request(`/admin/users/${id}/deactivate`, { method: 'PUT' })
  }

  async reactivateUser(id: string) {
    return await this.request(`/admin/users/${id}/reactivate`, { method: 'PUT' })
  }

  async getAdminReports(page = 1, limit = 10, status = ''): Promise<any> {
    let url = `/admin/reports?page=${page}&limit=${limit}`
    if (status) url += `&status=${status}`
    return await this.request(url)
  }

  async reviewReport(id: string, note: string) {
    return await this.request(`/admin/reports/${id}/review`, {
      method: 'PUT',
      body: JSON.stringify({ note }),
    })
  }

  async getModels() {
    return await this.request('/admin/models')
  }

  async deployModel(versionId: string) {
    return await this.request('/admin/models/deploy', {
      method: 'POST',
      body: JSON.stringify({ versionId }),
    })
  }

  private setTokens(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
    }
  }

  private clearTokens() {
    this.accessToken = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    }
  }

  setAccessToken(token: string) {
    this.accessToken = token
  }
}

export const apiClient = new APIClient(API_BASE_URL)
