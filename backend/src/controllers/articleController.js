import Article from '../models/Article.js'
import { asyncHandler } from '../middleware/errorHandler.js'

export const getArticles = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, tag, search } = req.query

  let query = { published: true }

  if (tag) {
    query.tags = { $in: [tag] }
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { body: { $regex: search, $options: 'i' } },
    ]
  }

  const articles = await Article.find(query)
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit)

  const total = await Article.countDocuments(query)

  res.json({
    articles,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    total,
  })
})

export const getArticleBySlug = asyncHandler(async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug })

  if (!article) {
    return res.status(404).json({ error: 'Article not found' })
  }

  res.json(article)
})

export const createArticle = asyncHandler(async (req, res) => {
  const { title, body, summary, tags, imageUrl, published } = req.body

  const article = new Article({
    title,
    body,
    summary,
    tags,
    imageUrl,
    published: published || false,
    author: 'MediDetect Team',
  })

  await article.save()

  res.status(201).json(article)
})

export const updateArticle = asyncHandler(async (req, res) => {
  const { title, body, summary, tags, imageUrl, published } = req.body

  const article = await Article.findByIdAndUpdate(
    req.params.id,
    { title, body, summary, tags, imageUrl, published, updatedAt: new Date() },
    { new: true }
  )

  if (!article) {
    return res.status(404).json({ error: 'Article not found' })
  }

  res.json(article)
})

export const deleteArticle = asyncHandler(async (req, res) => {
  const article = await Article.findByIdAndDelete(req.params.id)

  if (!article) {
    return res.status(404).json({ error: 'Article not found' })
  }

  res.json({ message: 'Article deleted' })
})
