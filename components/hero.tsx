'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowRight, Heart, Shield, Zap, CheckCircle } from 'lucide-react'

export function Hero() {
  const router = useRouter()

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pt-20 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24">
      {/* Enhanced decorative gradient circles with animations */}
      <div className="absolute top-10 sm:top-20 right-5 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 dark:from-cyan-600/20 dark:to-blue-600/20 rounded-full blur-3xl opacity-40 animate-pulse -z-10"></div>
      <div className="absolute bottom-10 left-5 sm:left-10 w-56 h-56 sm:w-80 sm:h-80 bg-gradient-to-br from-orange-400/30 to-yellow-400/30 dark:from-orange-600/20 dark:to-yellow-600/20 rounded-full blur-3xl opacity-40 animate-pulse delay-1000 -z-10"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 sm:w-[600px] sm:h-[600px] bg-gradient-to-br from-purple-400/10 to-pink-400/10 dark:from-purple-600/10 dark:to-pink-600/10 rounded-full blur-3xl opacity-30 -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in-up space-y-6 sm:space-y-8">
            {/* Trust badge with enhanced styling */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30 border-2 border-red-200 dark:border-red-800/50 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full shadow-sm hover:shadow-md transition-all">
              <Heart size={16} className="text-red-500 animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">Trusted by Healthcare Professionals</span>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-balance leading-[1.1] text-slate-900 dark:text-white">
                <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent drop-shadow-sm">
                  Early Detection
                </span>
                <br />
                <span className="text-slate-800 dark:text-slate-100">Saves Lives</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 text-balance max-w-xl leading-relaxed">
                Our AI-powered platform provides accurate cancer risk assessment with compassionate care. Upload your medical reports and get instant insights from advanced machine learning technology.
              </p>
            </div>

            {/* Enhanced CTA buttons with improved responsive layout */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Button
                size="lg"
                onClick={() => router.push('/upload')}
                className="w-full sm:w-auto gap-2 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-700 hover:via-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 text-base sm:text-lg py-6 sm:py-7 px-6 sm:px-8 font-semibold"
              >
                Get Started
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => router.push('/articles')}
                className="w-full sm:w-auto border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-500 text-slate-700 dark:text-slate-300 shadow-sm hover:shadow-md transition-all duration-300 text-base sm:text-lg py-6 sm:py-7 px-6 sm:px-8 font-medium"
              >
                Learn More
              </Button>
            </div>

            {/* Enhanced trust indicators with better spacing */}
            <div className="flex flex-col gap-3 pt-4 sm:pt-6 bg-white/50 dark:bg-slate-900/30 rounded-2xl p-4 sm:p-6 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
              <div className="flex items-center gap-3 text-sm sm:text-base group">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CheckCircle size={18} className="text-green-600 dark:text-green-400" />
                </div>
                <span className="text-slate-700 dark:text-slate-300 font-medium">HIPAA Compliant & Secure</span>
              </div>
              <div className="flex items-center gap-3 text-sm sm:text-base group">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CheckCircle size={18} className="text-green-600 dark:text-green-400" />
                </div>
                <span className="text-slate-700 dark:text-slate-300 font-medium">FDA-Grade Encryption</span>
              </div>
              <div className="flex items-center gap-3 text-sm sm:text-base group">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CheckCircle size={18} className="text-green-600 dark:text-green-400" />
                </div>
                <span className="text-slate-700 dark:text-slate-300 font-medium">24/7 Medical Support</span>
              </div>
            </div>
          </div>

          {/* Right Visual Content - Enhanced with better responsive design */}
          <div className="relative animate-slide-in-right mt-8 lg:mt-0">
            <div className="bg-gradient-to-br from-cyan-100 via-blue-100 to-indigo-100 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl hover:shadow-3xl transition-shadow duration-300 border border-cyan-200/50 dark:border-slate-600/50">
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4 sm:space-y-5 backdrop-blur-sm">
                {/* Enhanced visual statistics cards */}
                <div className="border-b-2 border-slate-200 dark:border-slate-700 pb-4 sm:pb-5 hover:border-cyan-300 dark:hover:border-cyan-700 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <Shield size={24} className="text-white" />
                    </div>
                    <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">Secure Analysis</h3>
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">Your medical data is protected with enterprise-grade security</p>
                </div>

                <div className="border-b-2 border-slate-200 dark:border-slate-700 pb-4 sm:pb-5 hover:border-orange-300 dark:hover:border-orange-700 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <Zap size={24} className="text-white" />
                    </div>
                    <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">Fast Results</h3>
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">Get AI predictions in seconds, not days</p>
                </div>

                <div className="hover:bg-slate-50 dark:hover:bg-slate-800/50 -m-2 p-2 rounded-lg transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <Heart size={24} className="text-white" />
                    </div>
                    <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">Compassionate Care</h3>
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">Designed with patients and doctors in mind</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced stats section with fully responsive grid */}
        <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { number: '98%', label: 'Detection Accuracy', icon: CheckCircle, color: 'from-cyan-600 to-blue-600' },
            { number: '50K+', label: 'Reports Analyzed', icon: Shield, color: 'from-indigo-600 to-purple-600' },
            { number: '10K+', label: 'Happy Patients', icon: Heart, color: 'from-pink-600 to-red-600' },
            { number: '24/7', label: 'Expert Support', icon: Zap, color: 'from-orange-600 to-yellow-600' }
          ].map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div 
                key={idx} 
                className="group bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-slate-200 dark:border-slate-700 hover:border-transparent hover:scale-105 hover:-translate-y-1"
              >
                <div className={`mx-auto mb-3 sm:mb-4 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon size={24} className="text-white" />
                </div>
                <div className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.number}
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm font-medium">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}