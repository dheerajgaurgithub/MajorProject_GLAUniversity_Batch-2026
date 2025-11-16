import express from 'express'
import { protect, adminOnly } from '../middleware/auth.js'
import {
  getArticles,
  getArticleBySlug,
  createArticle,
  updateArticle,
  deleteArticle,
} from '../controllers/articleController.js'

const router = express.Router()

router.get('/', getArticles)
router.get('/:slug', getArticleBySlug)
router.post('/', protect, adminOnly, createArticle)
router.put('/:id', protect, adminOnly, updateArticle)
router.delete('/:id', protect, adminOnly, deleteArticle)

export default router
