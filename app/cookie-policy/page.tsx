import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Cookie, Settings, Shield } from 'lucide-react'

export default function CookiePolicy() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-background to-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-card border border-border rounded-lg p-8">
            <div className="flex items-center gap-3 mb-8">
              <Cookie className="w-8 h-8 text-blue-500" />
              <h1 className="text-4xl font-bold text-foreground">Cookie Policy</h1>
            </div>
            
            <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Last Updated: November 2025</h2>
                <p className="text-muted-foreground">
                  This Cookie Policy explains how MediDetect uses cookies and similar technologies to enhance your experience on our AI-powered cancer risk assessment platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">What Are Cookies?</h2>
                <p className="text-muted-foreground">
                  Cookies are small text files stored on your device when you visit websites. They help us remember your preferences, understand how you use our site, and improve our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">How We Use Cookies</h2>
                <div className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Essential Cookies</h3>
                    <p className="text-blue-700 dark:text-blue-300 text-sm mb-2">Required for basic website functionality</p>
                    <ul className="list-disc pl-6 text-blue-600 dark:text-blue-400 text-sm space-y-1">
                      <li>User authentication and session management</li>
                      <li>Security and fraud prevention</li>
                      <li>Shopping cart and form completion</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">Performance Cookies</h3>
                    <p className="text-green-700 dark:text-green-300 text-sm mb-2">Help us understand how our site performs</p>
                    <ul className="list-disc pl-6 text-green-600 dark:text-green-400 text-sm space-y-1">
                      <li>Analytics and usage statistics</li>
                      <li>Page loading speed optimization</li>
                      <li>Error detection and reporting</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                    <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Functional Cookies</h3>
                    <p className="text-purple-700 dark:text-purple-300 text-sm mb-2">Enhance your user experience</p>
                    <ul className="list-disc pl-6 text-purple-600 dark:text-purple-400 text-sm space-y-1">
                      <li>Remembering your preferences</li>
                      <li>Personalized content delivery</li>
                      <li>Language and theme settings</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                    <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Marketing Cookies</h3>
                    <p className="text-orange-700 dark:text-orange-300 text-sm mb-2">Used for advertising and marketing</p>
                    <ul className="list-disc pl-6 text-orange-600 dark:text-orange-400 text-sm space-y-1">
                      <li>Personalized advertisements</li>
                      <li>Social media integration</li>
                      <li>Campaign effectiveness tracking</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Specific Cookies We Use</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border rounded-lg">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border border-border p-3 text-left text-foreground">Cookie Name</th>
                        <th className="border border-border p-3 text-left text-foreground">Purpose</th>
                        <th className="border border-border p-3 text-left text-foreground">Duration</th>
                        <th className="border border-border p-3 text-left text-foreground">Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border p-3 text-foreground">session_id</td>
                        <td className="border border-border p-3 text-muted-foreground">User session management</td>
                        <td className="border border-border p-3 text-muted-foreground">Session</td>
                        <td className="border border-border p-3 text-muted-foreground">Essential</td>
                      </tr>
                      <tr className="bg-muted">
                        <td className="border border-border p-3 text-foreground">auth_token</td>
                        <td className="border border-border p-3 text-muted-foreground">Authentication token</td>
                        <td className="border border-border p-3 text-muted-foreground">30 days</td>
                        <td className="border border-border p-3 text-muted-foreground">Essential</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-3 text-foreground">preferences</td>
                        <td className="border border-border p-3 text-muted-foreground">User preferences</td>
                        <td className="border border-border p-3 text-muted-foreground">1 year</td>
                        <td className="border border-border p-3 text-muted-foreground">Functional</td>
                      </tr>
                      <tr className="bg-muted">
                        <td className="border border-border p-3 text-foreground">analytics_id</td>
                        <td className="border border-border p-3 text-muted-foreground">Analytics tracking</td>
                        <td className="border border-border p-3 text-muted-foreground">2 years</td>
                        <td className="border border-border p-3 text-muted-foreground">Performance</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Third-Party Cookies</h2>
                <p className="text-muted-foreground mb-4">
                  We use trusted third-party services that may place cookies on your device:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                  <li><strong>Cloudflare:</strong> For security and performance optimization</li>
                  <li><strong>Stripe:</strong> For payment processing (if applicable)</li>
                  <li><strong>Social Media Platforms:</strong> For sharing and integration features</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Managing Your Cookie Preferences</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Settings className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-foreground">Cookie Settings Panel</h3>
                      <p className="text-muted-foreground">Use our cookie consent banner to manage preferences</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Settings className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-foreground">Browser Settings</h3>
                      <p className="text-muted-foreground">Configure your browser to block or delete cookies</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Settings className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-foreground">Device Settings</h3>
                      <p className="text-muted-foreground">Manage cookie preferences on mobile devices</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Impact of Disabling Cookies</h2>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <p className="text-yellow-700 dark:text-yellow-300 mb-3">
                    <strong>Note:</strong> Disabling certain cookies may affect your experience:
                  </p>
                  <ul className="list-disc pl-6 text-yellow-600 dark:text-yellow-400 text-sm space-y-1">
                    <li>Essential cookies: Website may not function properly</li>
                    <li>Functional cookies: Personalized features may be lost</li>
                    <li>Performance cookies: Analytics and optimization limited</li>
                    <li>Marketing cookies: Personalized ads disabled</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Cookie Updates and Changes</h2>
                <p className="text-muted-foreground">
                  We may update this Cookie Policy periodically to reflect changes in our practices or legal requirements. We will notify you of significant changes through our website or email.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Your Rights</h2>
                <p className="text-muted-foreground">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Accept or reject non-essential cookies</li>
                  <li>Withdraw consent at any time</li>
                  <li>Access information about cookies we use</li>
                  <li>Request deletion of your data collected via cookies</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">International Data Transfers</h2>
                <p className="text-muted-foreground">
                  Some cookies may transfer data to servers located outside your country. We ensure appropriate safeguards are in place to protect your data in accordance with applicable data protection laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Contact Information</h2>
                <p className="text-muted-foreground">
                  For questions about our Cookie Policy or to exercise your rights, please contact us:
                </p>
                <div className="bg-muted p-4 rounded-lg mt-4">
                  <p className="text-foreground">Email: privacy@medidetect.com</p>
                  <p className="text-foreground">Phone: +1 (555) 000-0000</p>
                  <p className="text-foreground">Address: 123 Medical Plaza, Health City, HC 12345</p>
                </div>
              </section>

              <section className="border-t border-border pt-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  <p className="text-sm">
                    We are committed to transparency and protecting your privacy while providing the best possible experience on our platform.
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
