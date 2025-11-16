'use client'

import { Card } from '@/components/ui/card'
import { Upload, Brain, Lock, FileText, Zap, Shield, TrendingUp, Users, Award } from 'lucide-react'

const features = [
  {
    icon: Upload,
    title: 'Multiple Input Types',
    description: 'Upload medical images, PDFs, blood values, or symptom forms for comprehensive analysis.',
    color: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    iconColor: 'text-blue-600 dark:text-blue-400',
    borderColor: 'group-hover:border-blue-400 dark:group-hover:border-blue-600'
  },
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Advanced machine learning models analyze your data instantly with medical-grade accuracy.',
    color: 'from-purple-500 to-pink-500',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    iconColor: 'text-purple-600 dark:text-purple-400',
    borderColor: 'group-hover:border-purple-400 dark:group-hover:border-purple-600'
  },
  {
    icon: Lock,
    title: 'Secure & Private',
    description: 'Your medical data is encrypted with HIPAA-compliant security and strict privacy controls.',
    color: 'from-green-500 to-emerald-500',
    bg: 'bg-green-50 dark:bg-green-900/20',
    iconColor: 'text-green-600 dark:text-green-400',
    borderColor: 'group-hover:border-green-400 dark:group-hover:border-green-600'
  },
  {
    icon: FileText,
    title: 'Detailed Reports',
    description: 'Get comprehensive reports with predictions, confidence scores, and professional recommendations.',
    color: 'from-orange-500 to-yellow-500',
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    iconColor: 'text-orange-600 dark:text-orange-400',
    borderColor: 'group-hover:border-orange-400 dark:group-hover:border-orange-600'
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'Get accurate predictions without lengthy waiting periods or unnecessary delays.',
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    iconColor: 'text-amber-600 dark:text-amber-400',
    borderColor: 'group-hover:border-amber-400 dark:group-hover:border-amber-600'
  },
  {
    icon: Shield,
    title: 'FDA Compliant',
    description: 'Meets all healthcare data protection standards and medical device regulations.',
    color: 'from-red-500 to-rose-500',
    bg: 'bg-red-50 dark:bg-red-900/20',
    iconColor: 'text-red-600 dark:text-red-400',
    borderColor: 'group-hover:border-red-400 dark:group-hover:border-red-600'
  },
]

export function Features() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-cyan-200/20 to-blue-200/20 dark:from-cyan-900/10 dark:to-blue-900/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-purple-200/20 to-pink-200/20 dark:from-purple-900/10 dark:to-pink-900/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced section header */}
        <div className="text-center mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 px-4 py-2 rounded-full mb-4 border border-cyan-200 dark:border-cyan-800/50">
            <Award size={16} className="text-cyan-600 dark:text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">Premium Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            Why Choose <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">MediDetect</span>?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Industry-leading features designed specifically for accurate and compassionate cancer risk assessment
          </p>
        </div>

        {/* Enhanced feature cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className={`group relative p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 border-2 border-slate-200 dark:border-slate-800 ${feature.borderColor} overflow-hidden bg-white dark:bg-slate-900 rounded-2xl hover:-translate-y-2`}
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                {/* Decorative corner element */}
                <div className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-300`}></div>

                {/* Enhanced icon with gradient background */}
                <div className="relative z-10">
                  <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md group-hover:shadow-lg`}>
                    <Icon className={`w-8 h-8 ${feature.iconColor}`} />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-cyan-600 group-hover:to-blue-600 dark:group-hover:from-cyan-400 dark:group-hover:to-blue-400 transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Animated accent line on hover */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
                
                {/* Corner badge */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              </Card>
            )
          })}
        </div>

        {/* Enhanced trust section */}
        <div className="mt-16 sm:mt-20 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 dark:from-cyan-900 dark:via-blue-900 dark:to-indigo-900 rounded-3xl p-8 sm:p-12 lg:p-16 text-white shadow-2xl relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="text-center mb-10 sm:mb-12">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-3">
                Trusted by Healthcare Professionals Worldwide
              </h3>
              <p className="text-cyan-100 dark:text-cyan-200 text-sm sm:text-base max-w-2xl mx-auto">
                Our commitment to excellence and innovation drives better outcomes for patients everywhere
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
              <div className="group text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Users size={32} className="opacity-90 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-4xl sm:text-5xl font-extrabold mb-2 bg-gradient-to-br from-white to-cyan-100 bg-clip-text text-transparent">50K+</div>
                <p className="text-cyan-100 dark:text-cyan-200 text-sm sm:text-base font-medium">Patients Helped Globally</p>
              </div>
              
              <div className="group text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <TrendingUp size={32} className="opacity-90 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-4xl sm:text-5xl font-extrabold mb-2 bg-gradient-to-br from-white to-cyan-100 bg-clip-text text-transparent">98%</div>
                <p className="text-cyan-100 dark:text-cyan-200 text-sm sm:text-base font-medium">Accuracy in Detection</p>
              </div>
              
              <div className="group text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Shield size={32} className="opacity-90 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-4xl sm:text-5xl font-extrabold mb-2 bg-gradient-to-br from-white to-cyan-100 bg-clip-text text-transparent">100%</div>
                <p className="text-cyan-100 dark:text-cyan-200 text-sm sm:text-base font-medium">Data Security Certified</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}