import express from 'express'
import { protect } from '../middleware/auth.js'
import { upload } from '../middleware/upload.js'
import {
  uploadReport,
  getReports,
  getReportById,
  deleteReport,
  getStats,
} from '../controllers/reportController.js'

const router = express.Router()

router.post('/', protect, upload.array('files', 5), uploadReport)
router.get('/', protect, getReports)
router.get('/stats', protect, getStats)
router.get('/:id', protect, getReportById)
router.delete('/:id', protect, deleteReport)

export default router
