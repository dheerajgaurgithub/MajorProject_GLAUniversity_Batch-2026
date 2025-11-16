import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-background to-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-card border border-border rounded-lg p-8">
            <h1 className="text-4xl font-bold mb-8 text-foreground">Privacy Policy</h1>
            
            <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Last Updated: November 2025</h2>
                <p className="text-muted-foreground">
                  MediDetect ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our AI-powered cancer risk assessment platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Information We Collect</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-medium mb-2 text-foreground">Personal Information</h3>
                    <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                      <li>Name and contact information</li>
                      <li>Age and demographic data</li>
                      <li>Medical history and health information</li>
                      <li>Account credentials</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2 text-foreground">Technical Information</h3>
                    <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                      <li>IP address and device information</li>
                      <li>Browser type and version</li>
                      <li>Usage data and analytics</li>
                      <li>Cookies and similar tracking technologies</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">How We Use Your Information</h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>To provide AI-powered cancer risk assessments</li>
                  <li>To improve our machine learning models</li>
                  <li>To personalize your experience</li>
                  <li>To communicate with you about our services</li>
                  <li>To ensure platform security and prevent fraud</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Data Protection</h2>
                <p className="text-muted-foreground">
                  We implement industry-standard security measures including:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>End-to-end encryption for data transmission</li>
                  <li>Secure storage with limited access</li>
                  <li>Regular security audits and updates</li>
                  <li>HIPAA-compliant data handling practices</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Data Sharing</h2>
                <p className="text-muted-foreground">
                  We do not sell your personal information. We only share data in the following circumstances:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>With your explicit consent</li>
                  <li>With healthcare providers for treatment purposes</li>
                  <li>As required by law or legal process</li>
                  <li>With trusted service providers under strict confidentiality agreements</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Your Rights</h2>
                <p className="text-muted-foreground">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Delete your account and data</li>
                  <li>Opt-out of non-essential communications</li>
                  <li>Request data portability</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Cookies</h2>
                <p className="text-muted-foreground">
                  We use cookies to enhance your experience, analyze site usage, and remember your preferences. You can control cookie settings through your browser.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have questions about this Privacy Policy or our data practices, please contact us at:
                </p>
                <div className="bg-muted p-4 rounded-lg mt-4">
                  <p className="text-foreground">Email: privacy@medidetect.com</p>
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
