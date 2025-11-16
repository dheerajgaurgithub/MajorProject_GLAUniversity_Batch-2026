'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowRight, Heart, Shield, Zap, CheckCircle } from 'lucide-react'

export function Hero() {
  const router = useRouter()

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cyan-50 via-blue-50 to-white pt-32 pb-24">
      {/* CHANGE: Added decorative gradient circles for visual interest */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full blur-3xl opacity-20 -z-10"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-full blur-3xl opacity-20 -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in-up space-y-6">
            {/* CHANGE: Added trust badge with heart icon */}
            <div className="inline-flex items-center gap-2 bg-white border border-cyan-200 px-4 py-3 rounded-full shadow-sm">
              <Heart size={16} className="text-red-500" />
              <span className="text-sm font-medium text-gray-700">Trusted by Healthcare Professionals</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-balance leading-tight">
                <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  Early Detection
                </span>
                {' '}Saves Lives
              </h1>
              <p className="text-xl text-gray-600 text-balance max-w-xl leading-relaxed">
                Our AI-powered platform provides accurate cancer risk assessment with compassionate care. Upload your medical reports and get instant insights from advanced machine learning technology.
              </p>
            </div>

            {/* CHANGE: Improved CTA buttons with better visual hierarchy */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                onClick={() => router.push('/upload')}
                className="gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all"
              >
                Get Started
                <ArrowRight size={18} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => router.push('/articles')}
                className="border-2 border-cyan-200 hover:bg-cyan-50 text-gray-700"
              >
                Learn More
              </Button>
            </div>

            {/* CHANGE: Added trust indicators */}
            <div className="flex flex-col gap-3 pt-6">
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle size={20} className="text-green-500" />
                <span className="text-gray-700">HIPAA Compliant & Secure</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle size={20} className="text-green-500" />
                <span className="text-gray-700">FDA-Grade Encryption</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle size={20} className="text-green-500" />
                <span className="text-gray-700">24/7 Medical Support</span>
              </div>
            </div>
          </div>

          {/* Right Visual Content */}
          <div className="relative animate-slide-in-right">
            <div className="bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl p-8 shadow-2xl">
              <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
                {/* CHANGE: Added visual statistics card */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <Shield size={20} className="text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Secure Analysis</h3>
                  </div>
                  <p className="text-sm text-gray-600">Your medical data is protected with enterprise-grade security</p>
                </div>

                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                      <Zap size={20} className="text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Fast Results</h3>
                  </div>
                  <p className="text-sm text-gray-600">Get AI predictions in seconds, not days</p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                      <Heart size={20} className="text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Compassionate Care</h3>
                  </div>
                  <p className="text-sm text-gray-600">Designed with patients and doctors in mind</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CHANGE: Added impressive stats with better layout */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { number: '98%', label: 'Detection Accuracy', icon: CheckCircle },
            { number: '50K+', label: 'Reports Analyzed', icon: Shield },
            { number: '10K+', label: 'Happy Patients', icon: Heart },
            { number: '24/7', label: 'Expert Support', icon: Zap }
          ].map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div key={idx} className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                <Icon size={28} className="mx-auto mb-3 text-cyan-600" />
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <p className="text-gray-600 text-sm mt-2">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
