'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PrivateRoute } from '@/components/private-route'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'

interface Article {
  id: string
  title: string
  category: string
  author: string
  published: boolean
  createdAt: string
}

const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Early Detection: Why Screening Matters',
    category: 'screening',
    author: 'Dr. Sarah Johnson',
    published: true,
    createdAt: '2025-11-01'
  },
  {
    id: '2',
    title: 'Healthy Lifestyle and Cancer Prevention',
    category: 'prevention',
    author: 'Dr. Michael Chen',
    published: true,
    createdAt: '2025-10-28'
  },
  {
    id: '3',
    title: 'New Treatment Advances',
    category: 'treatment',
    author: 'Dr. Emily Watson',
    published: false,
    createdAt: '2025-11-10'
  },
]

export default function ContentPage() {
  const [articles, setArticles] = useState<Article[]>(mockArticles)

  const handleDelete = (articleId: string) => {
    setArticles(articles.filter(a => a.id !== articleId))
  }

  const handleTogglePublish = (articleId: string) => {
    setArticles(articles.map(a =>
      a.id === articleId ? { ...a, published: !a.published } : a
    ))
  }

  return (
    <PrivateRoute requiredRole="admin">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Content Management</h1>
              <p className="text-muted-foreground">Manage articles and awareness content</p>
            </div>
            <div className="flex gap-4">
              <Button className="gap-2">
                <Plus size={18} />
                New Article
              </Button>
              <Link href="/admin">
                <Button variant="outline">Back to Admin</Button>
              </Link>
            </div>
          </div>

          {/* Articles Table */}
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Author</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Created</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((article, index) => (
                    <tr key={article.id} className={`border-t ${index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}`}>
                      <td className="px-6 py-4 font-medium">{article.title}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                          {article.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{article.author}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleTogglePublish(article.id)}
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            article.published
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          {article.published ? 'Published' : 'Draft'}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground text-sm">
                        {new Date(article.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="text-blue-600">
                            <Edit size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(article.id)}
                            className="text-red-600"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </PrivateRoute>
  )
}
