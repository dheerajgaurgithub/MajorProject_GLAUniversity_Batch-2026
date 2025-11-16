import { NextRequest, NextResponse } from 'next/server'

const mockArticles = [
  {
    id: '1',
    title: 'Early Detection: Why Screening Matters',
    slug: 'early-detection-screening',
    excerpt: 'Learn why regular cancer screening can save lives and improve treatment outcomes significantly.',
    category: 'screening',
    author: 'Dr. Sarah Johnson',
    createdAt: '2025-11-01'
  },
  {
    id: '2',
    title: 'Healthy Lifestyle and Cancer Prevention',
    slug: 'healthy-lifestyle-prevention',
    excerpt: 'Discover practical ways to reduce cancer risk through diet, exercise, and lifestyle changes.',
    category: 'prevention',
    author: 'Dr. Michael Chen',
    createdAt: '2025-10-28'
  },
]

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(mockArticles)
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
