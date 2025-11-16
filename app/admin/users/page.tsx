'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PrivateRoute } from '@/components/private-route'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Search, MoreVertical, Trash2, Ban } from 'lucide-react'
import Link from 'next/link'

interface User {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
  isActive: boolean
  reportsCount: number
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    createdAt: '2025-10-15',
    isActive: true,
    reportsCount: 5
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    createdAt: '2025-10-20',
    isActive: true,
    reportsCount: 3
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'user',
    createdAt: '2025-11-01',
    isActive: false,
    reportsCount: 0
  },
]

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDeactivate = (userId: string) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, isActive: !user.isActive } : user
    ))
  }

  const handleDelete = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId))
  }

  return (
    <PrivateRoute requiredRole="admin">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">User Management</h1>
              <p className="text-muted-foreground">Manage user accounts and permissions</p>
            </div>
            <Link href="/admin">
              <Button variant="outline">Back to Admin</Button>
            </Link>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg focus-within:ring-2 focus-within:ring-primary">
              <Search size={20} className="text-muted-foreground" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent outline-none"
              />
            </div>
          </div>

          {/* Users Table */}
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Reports</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Joined</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr key={user.id} className={`border-t ${index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}`}>
                      <td className="px-6 py-4 font-medium">{user.name}</td>
                      <td className="px-6 py-4 text-muted-foreground">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">{user.reportsCount}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          user.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeactivate(user.id)}
                            className="text-amber-600 hover:text-amber-700"
                          >
                            <Ban size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(user.id)}
                            className="text-red-600 hover:text-red-700"
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

          {filteredUsers.length === 0 && (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">No users found matching your search.</p>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </PrivateRoute>
  )
}
