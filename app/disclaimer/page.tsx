import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { AlertTriangle, Shield, Heart } from 'lucide-react'

export default function Disclaimer() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-background to-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-card border border-border rounded-lg p-8">
            <div className="flex items-center gap-3 mb-8">
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
              <h1 className="text-4xl font-bold text-foreground">Medical Disclaimer</h1>
            </div>
            
            <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
              <section className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4 text-yellow-800 dark:text-yellow-200">⚠️ IMPORTANT MEDICAL NOTICE</h2>
                <p className="text-yellow-700 dark:text-yellow-300 font-medium">
                  <strong>MediDetect is NOT a medical device and should NOT be used as a substitute for professional medical diagnosis, treatment, or advice.</strong>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">What MediDetect Is</h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-foreground">Educational Tool</h3>
                      <p className="text-muted-foreground">Designed to provide educational insights about cancer risk factors and awareness.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-foreground">Supplementary Information</h3>
                      <p className="text-muted-foreground">Offers additional information to support, not replace, professional medical consultation.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-foreground">Risk Assessment Aid</h3>
                      <p className="text-muted-foreground">Provides probabilistic assessments based on AI analysis of uploaded medical data.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">What MediDetect Is NOT</h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-foreground">Medical Diagnosis Tool</h3>
                      <p className="text-muted-foreground">Cannot provide definitive medical diagnoses or replace professional medical evaluation.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-foreground">Emergency Service</h3>
                      <p className="text-muted-foreground">Not suitable for emergency medical situations or urgent health concerns.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-foreground">Treatment Planner</h3>
                      <p className="text-muted-foreground">Does not provide treatment recommendations or medical advice.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Accuracy and Limitations</h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Our AI predictions are probabilistic and may contain errors</li>
                  <li>Accuracy depends on the quality and completeness of uploaded medical data</li>
                  <li>AI models may not account for all individual health factors</li>
                  <li>Results should be interpreted as risk indicators, not definitive diagnoses</li>
                  <li>False positives and false negatives are possible</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Required Actions</h2>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-4">Always Do the Following:</h3>
                  <ul className="list-disc pl-6 text-blue-700 dark:text-blue-300 space-y-2">
                    <li>Consult qualified healthcare professionals for any health concerns</li>
                    <li>Share MediDetect results with your doctor for proper interpretation</li>
                    <li>Follow professional medical advice over AI-generated insights</li>
                    <li>Seek immediate medical attention for emergencies or severe symptoms</li>
                    <li>Verify any medical information with trusted healthcare sources</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">No Warranty</h2>
                <p className="text-muted-foreground">
                  MediDetect is provided "as is" without any warranties, express or implied. We do not warrant the accuracy, reliability, or completeness of any information provided through our service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Liability Limitation</h2>
                <p className="text-muted-foreground">
                  MediDetect and its affiliates shall not be liable for any damages arising from the use or inability to use our services, including but not limited to direct, indirect, incidental, or consequential damages.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Emergency Situations</h2>
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                  <h3 className="font-semibold text-red-800 dark:text-red-200 mb-3">For Medical Emergencies:</h3>
                  <ul className="space-y-2 text-red-700 dark:text-red-300">
                    <li>Call emergency services immediately (911 in the US)</li>
                    <li>Go to the nearest emergency room</li>
                    <li>Contact your primary care physician</li>
                    <li>Do not rely on MediDetect for urgent medical decisions</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Age Restrictions</h2>
                <p className="text-muted-foreground">
                  MediDetect is intended for use by adults 18 years and older. Users under 18 must have parental or guardian supervision and should use the service only with professional medical guidance.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Contact Information</h2>
                <p className="text-muted-foreground">
                  For questions about this disclaimer or our services, please contact us:
                </p>
                <div className="bg-muted p-4 rounded-lg mt-4">
                  <p className="text-foreground">Email: support@medidetect.com</p>
                  <p className="text-foreground">Phone: +1 (555) 000-0000</p>
                  <p className="text-foreground">Address: 123 Medical Plaza, Health City, HC 12345</p>
                </div>
              </section>

              <section className="border-t border-border pt-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Heart className="w-4 h-4" />
                  <p className="text-sm">
                    This disclaimer is part of our commitment to responsible AI use in healthcare. Your health and safety are our highest priorities.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
