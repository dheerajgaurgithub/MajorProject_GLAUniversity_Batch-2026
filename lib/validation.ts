/**
 * Input validation utilities
 */

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password: string): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

export function validateReportInput(data: any): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (!data.patientName || data.patientName.trim().length === 0) {
    errors.push('Patient name is required')
  }

  if (!data.age || data.age < 1 || data.age > 120) {
    errors.push('Age must be between 1 and 120')
  }

  if (!data.inputType) {
    errors.push('Input type is required')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

export function validateFileSize(file: File, maxSizeMB: number): boolean {
  const maxBytes = maxSizeMB * 1024 * 1024
  return file.size <= maxBytes
}

export function validateFileType(
  file: File,
  allowedTypes: string[]
): boolean {
  return allowedTypes.includes(file.type)
}
