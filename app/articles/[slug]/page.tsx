'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Share2, Calendar, User } from 'lucide-react'

interface Article {
  id: string
  title: string
  slug: string
  content: string
  category: string
  author: string
  createdAt: string
  updatedAt: string
  image?: string
}

const mockArticles: Record<string, Article> = {
  'early-detection-screening': {
    id: '1',
    title: 'Early Detection: Why Screening Matters',
    slug: 'early-detection-screening',
    content: `
      <h2>The Importance of Regular Screening</h2>
      <p>Cancer screening is one of the most effective ways to catch the disease in its earliest stages when treatment is most successful. Early detection can significantly improve survival rates and treatment outcomes.</p>
      
      <h2>Types of Cancer Screening</h2>
      <p>Different types of cancer require different screening methods. Common screening tests include:</p>
      <ul>
        <li>Mammography for breast cancer</li>
        <li>Colonoscopy for colorectal cancer</li>
        <li>Pap smears for cervical cancer</li>
        <li>PSA tests for prostate cancer</li>
        <li>Chest X-rays for lung cancer</li>
      </ul>
      
      <h2>When to Start Screening</h2>
      <p>Screening recommendations vary based on age, risk factors, and personal history. Consult with your doctor to determine the right screening schedule for you.</p>
      
      <h2>Benefits of Early Detection</h2>
      <p>Detecting cancer early can lead to:</p>
      <ul>
        <li>More treatment options</li>
        <li>Better prognosis</li>
        <li>Higher survival rates</li>
        <li>Less invasive treatments</li>
        <li>Improved quality of life</li>
      </ul>
    `,
    category: 'screening',
    author: 'Dr. Sarah Johnson',
    createdAt: '2025-11-01',
    updatedAt: '2025-11-01',
    image: 'https://via.placeholder.com/800x400?text=Early+Detection'
  }
}

export default function ArticlePage() {
  const router = useRouter()
  const params = useParams()
  const slug = params?.slug as string
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (slug) {
      // In production, fetch from API
      const mockArticle = mockArticles[slug]
      if (mockArticle) {
        setArticle(mockArticle)
      }
      setLoading(false)
    }
  }, [slug])

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading article...</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (!article) {
    return (
      <>
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Card className="p-8 text-center max-w-md">
            <h1 className="text-2xl font-bold mb-2">Article Not Found</h1>
            <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist.</p>
            <Button onClick={() => router.push('/articles')}>Back to Articles</Button>
          </Card>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="gap-2 mb-8"
          >
            <ArrowLeft size={18} />
            Back to Articles
          </Button>

          {/* Hero Image */}
          {article.image && (
            <div className="w-full h-96 bg-muted rounded-lg overflow-hidden mb-8">
              <img
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Title and Meta */}
          <h1 className="text-5xl font-bold mb-6">{article.title}</h1>

          <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-border text-muted-foreground">
            <div className="flex items-center gap-2">
              <User size={18} />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{new Date(article.createdAt).toLocaleDateString()}</span>
            </div>
            <Button variant="ghost" size="sm" className="gap-2">
              <Share2 size={18} />
              Share
            </Button>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div
              className="prose prose-lg dark:prose-invert max-w-none space-y-4"
              dangerouslySetInnerHTML={{
                __html: article.content
                  .replace(/<h2>/g, '<h2 class="text-2xl font-bold mt-8 mb-4">')
                  .replace(/<p>/g, '<p class="text-foreground mb-4">')
                  .replace(/<ul>/g, '<ul class="list-disc list-inside mb-4 space-y-2">')
                  .replace(/<li>/g, '<li class="text-foreground">')
              }}
            />
          </div>

          {/* CTA */}
          <Card className="p-8 bg-primary/10">
            <h2 className="text-2xl font-bold mb-4">Ready to Take Action?</h2>
            <p className="text-muted-foreground mb-6">
              Upload your medical reports for AI-assisted analysis and get personalized insights about your health.
            </p>
            <Button onClick={() => router.push('/upload')}>
              Start Your Screening
            </Button>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  )
}
