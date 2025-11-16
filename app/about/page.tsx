'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Github, Linkedin } from 'lucide-react'

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Mission */}
          <section className="mb-16">
            <h1 className="text-5xl font-bold mb-6">About MediDetect</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              MediDetect is an innovative platform leveraging artificial intelligence to assist in cancer risk assessment and health awareness. Our mission is to empower individuals with accessible, accurate health insights while promoting early detection and prevention.
            </p>
          </section>

          {/* How It Works */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">How Our AI Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6">
                <div className="text-4xl font-bold text-primary mb-4">1</div>
                <h3 className="font-bold mb-2">Data Collection</h3>
                <p className="text-muted-foreground text-sm">
                  Upload medical images, PDFs, blood values, or symptom information securely through our platform.
                </p>
              </Card>
              <Card className="p-6">
                <div className="text-4xl font-bold text-primary mb-4">2</div>
                <h3 className="font-bold mb-2">AI Analysis</h3>
                <p className="text-muted-foreground text-sm">
                  Advanced machine learning models trained on millions of medical cases analyze your data.
                </p>
              </Card>
              <Card className="p-6">
                <div className="text-4xl font-bold text-primary mb-4">3</div>
                <h3 className="font-bold mb-2">Predictions</h3>
                <p className="text-muted-foreground text-sm">
                  Receive detailed reports with risk assessments, confidence scores, and recommendations.
                </p>
              </Card>
            </div>
          </section>

          {/* Team */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 text-center">
                <div className="w-24 h-24 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">DG</span>
                </div>
                <h3 className="font-bold mb-2">Dheeraj Gaur</h3>
                <p className="text-sm text-muted-foreground mb-4">Frontend & Product Vision</p>
                <div className="flex justify-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Github size={18} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Linkedin size={18} />
                  </Button>
                </div>
              </Card>
              <Card className="p-6 text-center">
                <div className="w-24 h-24 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">BE</span>
                </div>
                <h3 className="font-bold mb-2">Backend Engineer</h3>
                <p className="text-sm text-muted-foreground mb-4">Backend & DevOps</p>
                <div className="flex justify-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Github size={18} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Linkedin size={18} />
                  </Button>
                </div>
              </Card>
              <Card className="p-6 text-center">
                <div className="w-24 h-24 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">ML</span>
                </div>
                <h3 className="font-bold mb-2">ML Engineer</h3>
                <p className="text-sm text-muted-foreground mb-4">Machine Learning & Models</p>
                <div className="flex justify-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Github size={18} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Linkedin size={18} />
                  </Button>
                </div>
              </Card>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="bg-yellow-50 border border-yellow-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-yellow-900">Medical Disclaimer</h2>
            <p className="text-yellow-900 mb-4">
              MediDetect is an educational platform designed to assist in health awareness and early detection. The predictions and analysis provided are for informational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment.
            </p>
            <p className="text-yellow-900">
              Always consult with a qualified healthcare provider for medical decisions. Built with ❤️ for educational purposes. Not a medical device.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
