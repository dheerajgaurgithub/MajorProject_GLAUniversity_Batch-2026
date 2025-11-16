'use client'

import { Card } from '@/components/ui/card'
import { Upload, Brain, Lock, FileText, Zap, Shield, TrendingUp, Users } from 'lucide-react'

const features = [
  {
    icon: Upload,
    title: 'Multiple Input Types',
    description: 'Upload medical images, PDFs, blood values, or symptom forms for comprehensive analysis.',
    color: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-100'
  },
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Advanced machine learning models analyze your data instantly with medical-grade accuracy.',
    color: 'from-purple-500 to-pink-500',
    bg: 'bg-purple-100'
  },
  {
    icon: Lock,
    title: 'Secure & Private',
    description: 'Your medical data is encrypted with HIPAA-compliant security and strict privacy controls.',
    color: 'from-green-500 to-emerald-500',
    bg: 'bg-green-100'
  },
  {
    icon: FileText,
    title: 'Detailed Reports',
    description: 'Get comprehensive reports with predictions, confidence scores, and professional recommendations.',
    color: 'from-orange-500 to-yellow-500',
    bg: 'bg-orange-100'
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'Get accurate predictions without lengthy waiting periods or unnecessary delays.',
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-100'
  },
  {
    icon: Shield,
    title: 'FDA Compliant',
    description: 'Meets all healthcare data protection standards and medical device regulations.',
    color: 'from-red-500 to-rose-500',
    bg: 'bg-red-100'
  },
]

export function Features() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-cyan-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* CHANGE: Enhanced section header with gradient text */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold">
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Why Choose MediDetect?
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Industry-leading features designed specifically for accurate and compassionate cancer risk assessment
          </p>
        </div>

        {/* CHANGE: Improved grid layout with enhanced cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="group relative p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-cyan-200 overflow-hidden"
              >
                {/* CHANGE: Added gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                {/* CHANGE: Enhanced icon with gradient background */}
                <div className={`w-14 h-14 ${feature.bg} rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-7 h-7 text-gray-700`} />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* CHANGE: Added accent line on hover */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Card>
            )
          })}
        </div>

        {/* CHANGE: Added trust section */}
        <div className="mt-20 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Users size={32} className="mx-auto mb-4 opacity-80" />
              <div className="text-3xl font-bold mb-2">50K+</div>
              <p className="text-cyan-100">Patients Helped Globally</p>
            </div>
            <div>
              <TrendingUp size={32} className="mx-auto mb-4 opacity-80" />
              <div className="text-3xl font-bold mb-2">98%</div>
              <p className="text-cyan-100">Accuracy in Detection</p>
            </div>
            <div>
              <Shield size={32} className="mx-auto mb-4 opacity-80" />
              <div className="text-3xl font-bold mb-2">100%</div>
              <p className="text-cyan-100">Data Security Certified</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
