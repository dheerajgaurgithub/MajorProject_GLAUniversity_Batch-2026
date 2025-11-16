'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Search, Calendar, User } from 'lucide-react'

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  category: 'prevention' | 'symptoms' | 'screening' | 'treatment'
  author: string
  createdAt: string
  image?: string
}

const articleCategories = [
  { id: 'prevention', label: 'Prevention', color: 'bg-green-100 text-green-800' },
  { id: 'symptoms', label: 'Symptoms', color: 'bg-blue-100 text-blue-800' },
  { id: 'screening', label: 'Screening', color: 'bg-purple-100 text-purple-800' },
  { id: 'treatment', label: 'Treatment', color: 'bg-orange-100 text-orange-800' },
]

export default function ArticlesPage() {
  const router = useRouter()
  const [articles, setArticles] = useState<Article[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch articles from backend
    const fetchArticles = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/articles')
        if (response.ok) {
          const data = await response.json()
          // Handle both array and paginated response formats
          const articlesArray = Array.isArray(data) ? data : data.data || data.articles || []
          setArticles(articlesArray)
        }
      } catch (error) {
        console.error('Failed to fetch articles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Cancer Awareness Hub</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Learn about cancer prevention, symptoms, screening options, and treatment advances from medical experts.
            </p>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg focus-within:ring-2 focus-within:ring-primary">
              <Search size={20} className="text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent outline-none"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <p className="text-sm font-medium mb-3">Filter by Category</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full font-medium transition ${
                  !selectedCategory
                    ? 'bg-primary text-white'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                All Articles
              </button>
              {articleCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full font-medium transition ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Loading articles...</p>
              </div>
            </div>
          ) : filteredArticles.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">No articles found matching your search.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map(article => {
                const category = articleCategories.find(c => c.id === article.category)
                return (
                  <Card
                    key={article.id}
                    className="overflow-hidden hover:shadow-lg transition cursor-pointer"
                    onClick={() => router.push(`/articles/${article.slug}`)}
                  >
                    <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden">
                      <img
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      {category && (
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${category.color}`}>
                          {category.label}
                        </span>
                      )}
                      <h3 className="font-bold text-lg mb-2 line-clamp-2">{article.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      <div className="flex flex-col gap-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <User size={14} />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={14} />
                          <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
