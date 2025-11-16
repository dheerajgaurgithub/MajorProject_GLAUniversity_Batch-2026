'use client'

import Link from 'next/link'
import { Mail, Github, Linkedin, Twitter, Shield, Zap, Star } from 'lucide-react'

export function Footer() {
  const testimonials = [
    {
      text: "MediDetect gave me peace of mind. The early detection helped save my life.",
      author: "Sarah Johnson",
      role: "Cancer Survivor",
      initials: "SJ",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      text: "As a doctor, I recommend MediDetect to all my patients. It's accurate and easy to use.",
      author: "Dr. Rajesh Patel",
      role: "Oncologist",
      initials: "RP",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      text: "The support team is incredibly helpful. I felt cared for throughout my journey.",
      author: "Michael Chen",
      role: "Patient",
      initials: "MC",
      gradient: "from-purple-500 to-indigo-500"
    }
  ]

  return (
    <footer className="bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border-t border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100">
      {/* Testimonials Section - Enhanced with modern styling */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-800/50 dark:via-slate-900 dark:to-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 px-4 py-2 rounded-full mb-4 border border-amber-200 dark:border-amber-800/50">
              <Star size={16} className="text-amber-500 fill-amber-500" />
              <span className="text-sm font-semibold text-amber-700 dark:text-amber-300">5-Star Reviews</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6 text-slate-900 dark:text-white">
              Trusted by <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Thousands</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              Real stories from patients and healthcare professionals who have benefited from MediDetect
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, idx) => (
              <div 
                key={idx} 
                className="group bg-white dark:bg-slate-800/70 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-6 sm:p-7 hover:shadow-2xl hover:border-transparent transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 backdrop-blur-sm relative overflow-hidden"
              >
                {/* Decorative gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-5">
                    <div className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${testimonial.gradient} rounded-xl flex items-center justify-center font-bold text-white text-lg shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {testimonial.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-base sm:text-lg text-slate-900 dark:text-white truncate">{testimonial.author}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{testimonial.role}</p>
                      <div className="flex gap-0.5 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 italic leading-relaxed text-sm sm:text-base">"{testimonial.text}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 mb-12 sm:mb-16">
          {/* About */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="w-40 sm:w-52 h-14 sm:h-18 overflow-hidden">
                <img src="/logo.png" alt="MediDetect Logo" className="w-full h-full object-cover" />
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
              Advanced AI-powered platform for cancer risk assessment and medical awareness. Saving lives through early detection.
            </p>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
              ))}
              <span className="text-xs text-slate-600 dark:text-slate-400 ml-2">4.9/5 Rating</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4 sm:mb-5 text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full"></div>
              Platform
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/articles" className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition duration-200 hover:translate-x-1 inline-block">
                  → Articles
                </Link>
              </li>
              <li>
                <Link href="/upload" className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition duration-200 hover:translate-x-1 inline-block">
                  → Upload Report
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition duration-200 hover:translate-x-1 inline-block">
                  → About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition duration-200 hover:translate-x-1 inline-block">
                  → Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold mb-4 sm:mb-5 text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full"></div>
              Legal
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/privacy-policy" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors hover:translate-x-1 inline-block">
                  → Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors hover:translate-x-1 inline-block">
                  → Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors hover:translate-x-1 inline-block">
                  → Contact Us
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors hover:translate-x-1 inline-block">
                  → Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4 sm:mb-5 text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
              Support
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="text-slate-600 dark:text-slate-400 flex items-start gap-2">
                <Mail size={16} className="text-cyan-500 mt-0.5 flex-shrink-0" />
                <span className="break-all">support@medidetect.com</span>
              </li>
              <li className="text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Phone:</span> +1 (555) 000-0000
              </li>
              <li className="text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Hours:</span> 24/7 Available
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold mb-4 sm:mb-5 text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-yellow-500 rounded-full"></div>
              Follow Us
            </h3>
            <div className="flex flex-wrap gap-3">
              <a 
                href="#" 
                className="p-3 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 hover:from-cyan-500 hover:to-blue-500 hover:text-white dark:hover:from-cyan-500 dark:hover:to-blue-500 rounded-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-sm hover:shadow-lg group" 
                title="LinkedIn"
              >
                <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="#" 
                className="p-3 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 hover:from-purple-500 hover:to-indigo-500 hover:text-white dark:hover:from-purple-500 dark:hover:to-indigo-500 rounded-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-sm hover:shadow-lg group" 
                title="GitHub"
              >
                <Github size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="#" 
                className="p-3 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 hover:from-blue-400 hover:to-blue-600 hover:text-white dark:hover:from-blue-400 dark:hover:to-blue-600 rounded-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-sm hover:shadow-lg group" 
                title="Twitter"
              >
                <Twitter size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="#" 
                className="p-3 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 hover:from-red-500 hover:to-pink-500 hover:text-white dark:hover:from-red-500 dark:hover:to-pink-500 rounded-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-sm hover:shadow-lg group" 
                title="Email"
              >
                <Mail size={20} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Team Section - Enhanced */}
        <div className="border-t-2 border-slate-200 dark:border-slate-800 pt-10 sm:pt-12 lg:pt-16 mb-10 sm:mb-12 lg:mb-16">
          <div className="text-center mb-8 sm:mb-10">
            <h3 className="font-bold text-2xl sm:text-3xl lg:text-4xl mb-3 text-slate-900 dark:text-white">
              Meet the <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Team</span>
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">Dedicated professionals building the future of healthcare</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="group bg-gradient-to-br from-white to-slate-50 dark:from-slate-800/70 dark:to-slate-800/50 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-6 sm:p-7 hover:shadow-2xl hover:border-cyan-300 dark:hover:border-cyan-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center font-bold text-white text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform">
                DG
              </div>
              <p className="font-bold text-lg sm:text-xl mb-2 text-slate-900 dark:text-white">Dheeraj Gaur</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Frontend & Product Development</p>
              <a href="#" className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 text-sm font-semibold inline-flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                View GitHub Profile 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
            <div className="group bg-gradient-to-br from-white to-slate-50 dark:from-slate-800/70 dark:to-slate-800/50 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-6 sm:p-7 hover:shadow-2xl hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center font-bold text-white text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform">
                BE
              </div>
              <p className="font-bold text-lg sm:text-xl mb-2 text-slate-900 dark:text-white">Backend Engineer</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Backend Development & DevOps</p>
              <a href="#" className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 text-sm font-semibold inline-flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                View GitHub Profile 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
            <div className="group bg-gradient-to-br from-white to-slate-50 dark:from-slate-800/70 dark:to-slate-800/50 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-6 sm:p-7 hover:shadow-2xl hover:border-green-300 dark:hover:border-green-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 md:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center font-bold text-white text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform">
                ML
              </div>
              <p className="font-bold text-lg sm:text-xl mb-2 text-slate-900 dark:text-white">ML Engineer</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Machine Learning & AI Models</p>
              <a href="#" className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 text-sm font-semibold inline-flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                View GitHub Profile 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Enhanced */}
        <div className="border-t-2 border-slate-200 dark:border-slate-800 pt-8 flex flex-col lg:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          <p className="text-center lg:text-left">
            Built with <span className="text-red-500">❤</span> using <span className="font-semibold text-slate-700 dark:text-slate-300">MERN + ML</span>. For educational purposes. Not a medical device.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg border border-green-200 dark:border-green-800/50">
              <Shield size={18} className="text-green-600 dark:text-green-400" />
              <span className="font-semibold text-green-700 dark:text-green-300">HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-2 rounded-lg border border-yellow-200 dark:border-yellow-800/50">
              <Zap size={18} className="text-yellow-600 dark:text-yellow-400" />
              <span className="font-semibold text-yellow-700 dark:text-yellow-300">FDA Grade</span>
            </div>
          </div>
          <p className="text-center lg:text-right font-medium text-slate-700 dark:text-slate-300">
            © 2025 MediDetect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}