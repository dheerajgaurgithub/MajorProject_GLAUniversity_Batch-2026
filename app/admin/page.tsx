'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PrivateRoute } from '@/components/private-route'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Users, FileText, BarChart3, Settings } from 'lucide-react'
import Link from 'next/link'

interface AdminStats {
  totalUsers: number
  totalReports: number
  positiveResults: number
  weeklyGrowth: number
}

export default function AdminPage() {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 245,
    totalReports: 1250,
    positiveResults: 125,
    weeklyGrowth: 12
  })

  const dashboardLinks = [
    {
      icon: Users,
      title: 'Manage Users',
      description: 'View and manage user accounts',
      href: '/admin/users'
    },
    {
      icon: FileText,
      title: 'View Reports',
      description: 'Review all submitted reports and predictions',
      href: '/admin/reports'
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      description: 'View system statistics and insights',
      href: '/admin/analytics'
    },
    {
      icon: Settings,
      title: 'Manage Content',
      description: 'Edit articles and system configuration',
      href: '/admin/content'
    },
  ]

  return (
    <PrivateRoute requiredRole="admin">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage users, reports, and system settings</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Users</p>
                  <p className="text-3xl font-bold mt-2">{stats.totalUsers}</p>
                  <p className="text-xs text-green-600 mt-2">+{stats.weeklyGrowth}% this week</p>
                </div>
                <Users className="w-10 h-10 text-primary opacity-20" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Reports</p>
                  <p className="text-3xl font-bold mt-2">{stats.totalReports}</p>
                  <p className="text-xs text-green-600 mt-2">+45 today</p>
                </div>
                <FileText className="w-10 h-10 text-primary opacity-20" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Alerts Generated</p>
                  <p className="text-3xl font-bold mt-2 text-red-600">{stats.positiveResults}</p>
                  <p className="text-xs text-muted-foreground mt-2">10% of reports</p>
                </div>
                <div className="w-10 h-10 bg-red-100 rounded opacity-20" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">System Health</p>
                  <p className="text-3xl font-bold mt-2 text-green-600">99.8%</p>
                  <p className="text-xs text-green-600 mt-2">All systems operational</p>
                </div>
                <BarChart3 className="w-10 h-10 text-primary opacity-20" />
              </div>
            </Card>
          </div>

          {/* Management Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dashboardLinks.map((link, index) => {
              const Icon = link.icon
              return (
                <Link key={index} href={link.href}>
                  <Card className="p-6 hover:shadow-lg transition cursor-pointer h-full">
                    <Icon className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2">{link.title}</h3>
                    <p className="text-muted-foreground">{link.description}</p>
                  </Card>
                </Link>
              )
            })}
          </div>

          {/* Recent Activity */}
          <Card className="p-6 mt-8">
            <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div>
                  <p className="font-medium">New user registration</p>
                  <p className="text-sm text-muted-foreground">jane.smith@example.com</p>
                </div>
                <p className="text-sm text-muted-foreground">2 minutes ago</p>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div>
                  <p className="font-medium">Report submitted</p>
                  <p className="text-sm text-muted-foreground">Patient: John Doe</p>
                </div>
                <p className="text-sm text-muted-foreground">15 minutes ago</p>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div>
                  <p className="font-medium">Alert generated</p>
                  <p className="text-sm text-muted-foreground">High risk prediction detected</p>
                </div>
                <p className="text-sm text-muted-foreground">1 hour ago</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </PrivateRoute>
  )
}
