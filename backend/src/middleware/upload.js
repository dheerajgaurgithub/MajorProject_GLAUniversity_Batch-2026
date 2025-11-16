import multer from 'multer'

const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    'image/jpeg',
    'image/png',
    'application/pdf',
    'image/jpg',
  ]

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and PDF allowed.'))
  }
}

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB
})
