import { Card } from '@/components/ui/card'
import { Upload, Zap, FileText, CheckCircle } from 'lucide-react'

const steps = [
  {
    icon: Upload,
    title: 'Upload Medical Data',
    description: 'Share your medical reports, images, or test results securely.',
    gradient: 'from-cyan-500 to-blue-500',
    position: 'top'
  },
  {
    icon: Zap,
    title: 'AI Analysis',
    description: 'Our ML models analyze your data using advanced algorithms.',
    gradient: 'from-purple-500 to-indigo-500',
    position: 'right'
  },
  {
    icon: FileText,
    title: 'Get Report',
    description: 'Receive detailed predictions with confidence scores and insights.',
    gradient: 'from-orange-500 to-yellow-500',
    position: 'bottom'
  },
  {
    icon: CheckCircle,
    title: 'Consult Experts',
    description: 'Optionally book consultations with medical professionals.',
    gradient: 'from-green-500 to-emerald-500',
    position: 'left'
  },
]

export function HowItWorks() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-10 left-5 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-cyan-200/30 to-blue-200/30 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-10 right-5 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-purple-200/30 to-pink-200/30 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 px-3 py-1.5 rounded-full mb-3 border border-cyan-200 dark:border-cyan-800/50">
            <Zap size={14} className="text-cyan-600 dark:text-cyan-400" />
            <span className="text-xs sm:text-sm font-semibold text-cyan-700 dark:text-cyan-300">Simple Process</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-3 sm:mb-4 text-slate-900 dark:text-white">
            How It <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed px-4">
            Simple steps to get your AI-powered health assessment in minutes
          </p>
        </div>

        {/* Desktop Oval Cycle View */}
        <div className="hidden lg:block relative">
          <div className="relative w-full max-w-4xl mx-auto" style={{ paddingBottom: '65%' }}>
            {/* Oval path with dashed border */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="border-3 border-dashed border-slate-300 dark:border-slate-700 rounded-full"
                style={{
                  width: '100%',
                  height: '100%',
                  boxShadow: 'inset 0 0 50px rgba(6, 182, 212, 0.1)'
                }}
              ></div>
            </div>

            {/* Center content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-6 shadow-xl border-2 border-slate-200 dark:border-slate-700 text-center max-w-xs">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Zap size={32} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  AI-Powered Process
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  Advanced ML algorithms working 24/7 for accurate health assessments
                </p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-xs font-semibold text-green-600 dark:text-green-400">Active & Secure</span>
                </div>
              </div>
            </div>

            {/* Step cards positioned around the oval */}
            {steps.map((step, index) => {
              const Icon = step.icon
              const positions = {
                top: { top: '0%', left: '50%', transform: 'translate(-50%, -50%)' },
                right: { top: '50%', right: '0%', transform: 'translate(50%, -50%)' },
                bottom: { bottom: '0%', left: '50%', transform: 'translate(-50%, 50%)' },
                left: { top: '50%', left: '0%', transform: 'translate(-50%, -50%)' }
              }

              return (
                <div
                  key={index}
                  className="absolute"
                  style={positions[step.position as keyof typeof positions]}
                >
                  <div className="group relative">
                    {/* Connection line to center */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {step.position === 'top' && (
                        <div className="absolute top-full h-24 w-0.5 bg-gradient-to-b from-slate-300 to-transparent dark:from-slate-700"></div>
                      )}
                      {step.position === 'right' && (
                        <div className="absolute right-full w-24 h-0.5 bg-gradient-to-l from-slate-300 to-transparent dark:from-slate-700"></div>
                      )}
                      {step.position === 'bottom' && (
                        <div className="absolute bottom-full h-24 w-0.5 bg-gradient-to-t from-slate-300 to-transparent dark:from-slate-700"></div>
                      )}
                      {step.position === 'left' && (
                        <div className="absolute left-full w-24 h-0.5 bg-gradient-to-r from-slate-300 to-transparent dark:from-slate-700"></div>
                      )}
                    </div>

                    {/* Step card */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-lg border-2 border-slate-200 dark:border-slate-700 hover:shadow-2xl hover:scale-110 hover:-translate-y-2 transition-all duration-300 w-56 relative z-10">
                      {/* Step number badge */}
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-100 dark:to-slate-200 rounded-full flex items-center justify-center shadow-lg border-3 border-white dark:border-slate-800">
                        <span className="text-white dark:text-slate-900 font-bold text-sm">{index + 1}</span>
                      </div>

                      {/* Icon */}
                      <div className={`w-14 h-14 bg-gradient-to-br ${step.gradient} rounded-lg flex items-center justify-center mb-3 shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                        <Icon size={28} className="text-white" />
                      </div>

                      {/* Content */}
                      <h3 className="text-base font-bold mb-2 text-slate-900 dark:text-white">
                        {step.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                        {step.description}
                      </p>

                      {/* Decorative corner accent */}
                      <div className={`absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl ${step.gradient} opacity-10 rounded-tl-full`}></div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Tablet View - 2x2 Grid with Connecting Lines */}
        <div className="hidden md:block lg:hidden">
          <div className="grid grid-cols-2 gap-8 max-w-3xl mx-auto relative">
            {/* Horizontal line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent -translate-y-1/2"></div>
            {/* Vertical line */}
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-transparent via-slate-300 dark:via-slate-700 to-transparent -translate-x-1/2"></div>
            
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="relative z-10">
                  <div className="group bg-white dark:bg-slate-800 rounded-xl p-5 shadow-lg border-2 border-slate-200 dark:border-slate-700 hover:shadow-xl hover:scale-105 transition-all duration-300">
                    {/* Step number */}
                    <div className="absolute -top-2.5 -right-2.5 w-7 h-7 bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-100 dark:to-slate-200 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white dark:text-slate-900 font-bold text-xs">{index + 1}</span>
                    </div>

                    <div className={`w-14 h-14 bg-gradient-to-br ${step.gradient} rounded-lg flex items-center justify-center mb-3 shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <Icon size={28} className="text-white" />
                    </div>
                    <h3 className="text-base font-bold mb-2 text-slate-900 dark:text-white">{step.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile View - Vertical Flow with Arrows */}
        <div className="md:hidden space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                <div className="group bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg border-2 border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
                  {/* Step number */}
                  <div className="absolute -top-2.5 -right-2.5 w-8 h-8 bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-100 dark:to-slate-200 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white dark:text-slate-900 font-bold text-sm">{index + 1}</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${step.gradient} rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={24} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold mb-1.5 text-slate-900 dark:text-white">{step.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>

                {/* Arrow connector */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center my-3">
                    <div className="flex flex-col items-center">
                      <div className="w-0.5 h-5 bg-gradient-to-b from-slate-300 to-slate-400 dark:from-slate-700 dark:to-slate-600"></div>
                      <div className={`w-7 h-7 bg-gradient-to-br ${steps[index + 1].gradient} rounded-full flex items-center justify-center shadow-sm`}>
                        <span className="text-white text-base font-bold">↓</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Call to action */}
        <div className="text-center mt-8 sm:mt-12">
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-3">
            Ready to get started?
          </p>
          <button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm sm:text-base">
            Begin Your Assessment
          </button>
        </div>
      </div>
    </section>
  )
}