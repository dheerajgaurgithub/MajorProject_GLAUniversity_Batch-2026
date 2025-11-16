import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export default function TermsOfService() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-background to-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-card border border-border rounded-lg p-8">
            <h1 className="text-4xl font-bold mb-8 text-foreground">Terms of Service</h1>
            
            <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Last Updated: November 2025</h2>
                <p className="text-muted-foreground">
                  Welcome to MediDetect. These Terms of Service ("Terms") govern your use of our AI-powered cancer risk assessment platform and services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  By accessing or using MediDetect, you agree to be bound by these Terms. If you disagree with any part of these terms, you may not access our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Service Description</h2>
                <p className="text-muted-foreground">
                  MediDetect provides AI-powered cancer risk assessment services based on medical data you provide. Our services include:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Medical report analysis and risk assessment</li>
                  <li>Educational content about cancer detection</li>
                  <li>Personalized health insights and recommendations</li>
                  <li>Secure data storage and management</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">User Responsibilities</h2>
                <p className="text-muted-foreground">As a user, you agree to:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Provide accurate and complete medical information</li>
                  <li>Use the service for legitimate medical assessment purposes only</li>
                  <li>Not attempt to manipulate or misuse our AI algorithms</li>
                  <li>Maintain the confidentiality of your account credentials</li>
                  <li>Not share your account with unauthorized individuals</li>
                  <li>Report any technical issues or concerns promptly</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Medical Disclaimer</h2>
                <p className="text-muted-foreground">
                  MediDetect is an educational tool and NOT a substitute for professional medical advice, diagnosis, or treatment. Our AI assessments should be used as supplementary information only.
                </p>
                <div className="bg-muted p-4 rounded-lg mt-4">
                  <p className="text-foreground font-semibold">Important:</p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
                    <li>Always consult qualified healthcare professionals for medical decisions</li>
                    <li>Do not rely solely on our assessments for diagnosis</li>
                    <li>Seek immediate medical attention for emergencies</li>
                    <li>Our predictions are probabilistic and not definitive medical diagnoses</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Data and Privacy</h2>
                <p className="text-muted-foreground">
                  Your use of our services is also governed by our Privacy Policy, which explains how we collect, use, and protect your information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Intellectual Property</h2>
                <p className="text-muted-foreground">
                  All content, features, and functionality of MediDetect are owned by us and are protected by copyright, trademark, and other intellectual property laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Service Availability</h2>
                <p className="text-muted-foreground">
                  We strive to maintain high service availability but do not guarantee uninterrupted access. We may temporarily suspend services for maintenance, updates, or technical issues.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  To the fullest extent permitted by law, MediDetect shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Termination</h2>
                <p className="text-muted-foreground">
                  We may terminate or suspend your account immediately for violations of these Terms, fraudulent activity, or at our discretion with appropriate notice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Changes to Terms</h2>
                <p className="text-muted-foreground">
                  We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. Continued use of our services constitutes acceptance of modified terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Contact Information</h2>
                <p className="text-muted-foreground">
                  For questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-muted p-4 rounded-lg mt-4">
                  <p className="text-foreground">Email: legal@medidetect.com</p>
                  <p className="text-foreground">Phone: +1 (555) 000-0000</p>
                  <p className="text-foreground">Address: 123 Medical Plaza, Health City, HC 12345</p>
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
