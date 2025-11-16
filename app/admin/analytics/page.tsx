'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PrivateRoute } from '@/components/private-route'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import Link from 'next/link'

const weeklyData = [
  { day: 'Mon', reports: 24, users: 10 },
  { day: 'Tue', reports: 28, users: 12 },
  { day: 'Wed', reports: 35, users: 15 },
  { day: 'Thu', reports: 32, users: 14 },
  { day: 'Fri', reports: 42, users: 18 },
  { day: 'Sat', reports: 38, users: 16 },
  { day: 'Sun', reports: 30, users: 13 },
]

const predictionData = [
  { name: 'Low Risk', value: 850, fill: '#10b981' },
  { name: 'Medium Risk', value: 250, fill: '#f59e0b' },
  { name: 'High Risk', value: 150, fill: '#ef4444' },
]

const cancerTypes = [
  { type: 'Breast', count: 45 },
  { type: 'Lung', count: 38 },
  { type: 'Skin', count: 28 },
  { type: 'Colorectal', count: 22 },
  { type: 'Other', count: 42 },
]

export default function AnalyticsPage() {
  return (
    <PrivateRoute requiredRole="admin">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Analytics & Insights</h1>
              <p className="text-muted-foreground">System statistics and performance metrics</p>
            </div>
            <Link href="/admin">
              <Button variant="outline">Back to Admin</Button>
            </Link>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Weekly Trend */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Weekly Activity</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="reports" stroke="#0066cc" name="Reports" />
                  <Line type="monotone" dataKey="users" stroke="#10b981" name="New Users" />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Risk Distribution */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Risk Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={predictionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {predictionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Cancer Type Distribution */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Cancer Type Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cancerTypes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#0066cc" name="Cases" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <Card className="p-6 text-center">
              <p className="text-muted-foreground text-sm mb-2">Avg Processing Time</p>
              <p className="text-3xl font-bold">2.3s</p>
            </Card>
            <Card className="p-6 text-center">
              <p className="text-muted-foreground text-sm mb-2">Model Accuracy</p>
              <p className="text-3xl font-bold text-green-600">98.7%</p>
            </Card>
            <Card className="p-6 text-center">
              <p className="text-muted-foreground text-sm mb-2">API Uptime</p>
              <p className="text-3xl font-bold text-green-600">99.8%</p>
            </Card>
            <Card className="p-6 text-center">
              <p className="text-muted-foreground text-sm mb-2">Active Users</p>
              <p className="text-3xl font-bold">142</p>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </PrivateRoute>
  )
}
