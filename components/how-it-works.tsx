import { Card } from '@/components/ui/card'
import { Upload, Zap, FileText, CheckCircle } from 'lucide-react'

const steps = [
  {
    icon: Upload,
    title: 'Upload Medical Data',
    description: 'Share your medical reports, images, or test results securely.'
  },
  {
    icon: Zap,
    title: 'AI Analysis',
    description: 'Our ML models analyze your data using advanced algorithms.'
  },
  {
    icon: FileText,
    title: 'Get Report',
    description: 'Receive detailed predictions with confidence scores and insights.'
  },
  {
    icon: CheckCircle,
    title: 'Consult Experts',
    description: 'Optionally book consultations with medical professionals.'
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground">
            Simple steps to get your AI-powered health assessment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="flex flex-col items-center">
                <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center mb-4">
                  <Icon size={32} />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-center">{step.title}</h3>
                <p className="text-muted-foreground text-center text-sm">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block w-full h-0.5 bg-primary/20 mt-6 -mb-6">
                    <div className="flex justify-center" style={{ transform: 'translateY(-12px)' }}>
                      <div className="bg-background px-2">
                        <div className="text-primary font-bold">→</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
