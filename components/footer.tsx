'use client'

import Link from 'next/link'
import { Mail, Github, Linkedin, Twitter, Heart, Shield, Zap } from 'lucide-react'

export function Footer() {
  const testimonials = [
    {
      text: "MediDetect gave me peace of mind. The early detection helped save my life.",
      author: "Sarah Johnson",
      role: "Cancer Survivor",
      initials: "SJ"
    },
    {
      text: "As a doctor, I recommend MediDetect to all my patients. It's accurate and easy to use.",
      author: "Dr. Rajesh Patel",
      role: "Oncologist",
      initials: "RP"
    },
    {
      text: "The support team is incredibly helpful. I felt cared for throughout my journey.",
      author: "Michael Chen",
      role: "Patient",
      initials: "MC"
    }
  ]

  return (
    <footer className="bg-gradient-to-b from-gray-900 via-cyan-900 to-gray-900 text-white">
      {/* CHANGE: Added testimonials section */}
      <div className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trusted by Thousands</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Real stories from patients and healthcare professionals who have benefited from MediDetect
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur rounded-xl p-6 hover:bg-white/20 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full flex items-center justify-center font-bold text-gray-900">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-300">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-100 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart size={24} className="text-red-400" />
              <h3 className="font-bold text-lg">MediDetect</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Advanced AI-powered platform for cancer risk assessment and medical awareness. Saving lives through early detection.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/articles" className="text-gray-300 hover:text-cyan-400 transition">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/upload" className="text-gray-300 hover:text-cyan-400 transition">
                  Upload Report
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-cyan-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-cyan-400 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-cyan-400 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-300 hover:text-cyan-400 transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-300 hover:text-cyan-400 transition">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-300 hover:text-cyan-400 transition">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Support</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-300">
                Email: support@medidetect.com
              </li>
              <li className="text-gray-300">
                Phone: +1 (555) 000-0000
              </li>
              <li className="text-gray-300">
                Hours: 24/7 Available
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Follow Us</h3>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-cyan-500 transition" title="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-cyan-500 transition" title="GitHub">
                <Github size={20} />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-cyan-500 transition" title="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-cyan-500 transition" title="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="border-t border-gray-700 pt-12 mb-12">
          <h3 className="font-bold mb-6 text-lg">Development Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition">
              <p className="font-semibold text-lg mb-1">Dheeraj Gaur</p>
              <p className="text-sm text-gray-300 mb-3">Frontend & Product Development</p>
              <a href="#" className="text-cyan-400 hover:text-cyan-300 text-sm">View GitHub Profile</a>
            </div>
            <div className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition">
              <p className="font-semibold text-lg mb-1">Backend Engineer</p>
              <p className="text-sm text-gray-300 mb-3">Backend Development & DevOps</p>
              <a href="#" className="text-cyan-400 hover:text-cyan-300 text-sm">View GitHub Profile</a>
            </div>
            <div className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition">
              <p className="font-semibold text-lg mb-1">ML Engineer</p>
              <p className="text-sm text-gray-300 mb-3">Machine Learning & AI Models</p>
              <a href="#" className="text-cyan-400 hover:text-cyan-300 text-sm">View GitHub Profile</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-300">
          <p>Built with Heart using MERN + ML. For educational purposes. Not a medical device.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <div className="flex items-center gap-1">
              <Shield size={16} className="text-green-400" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap size={16} className="text-yellow-400" />
              <span>FDA Grade</span>
            </div>
          </div>
          <p className="mt-4 sm:mt-0">© 2025 MediDetect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
