import express from 'express'
import { sendEmail } from '../services/emailService.js'
import rateLimit from 'express-rate-limit'

const router = express.Router()

// Rate limiting for contact form
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 contact requests per windowMs
  message: { error: 'Too many contact requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
})

// Contact form submission
router.post('/', contactLimiter, async (req, res) => {
  try {
    const { name, email, subject, message, inquiryType = 'General' } = req.body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        error: 'Name, email, subject, and message are required' 
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Please provide a valid email address' 
      })
    }

    // Prepare email content
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Contact Form Submission</h1>
        </div>
        
        <div style="padding: 30px; background-color: #f9f9f9;">
          <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-top: 0;">New Contact Request</h2>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #555;">Name:</strong>
              <span style="color: #333; margin-left: 10px;">${name}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #555;">Email:</strong>
              <span style="color: #333; margin-left: 10px;">${email}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #555;">Inquiry Type:</strong>
              <span style="color: #333; margin-left: 10px;">${inquiryType}</span>
            </div>
            
            <div style="margin-bottom: 20px;">
              <strong style="color: #555;">Subject:</strong>
              <span style="color: #333; margin-left: 10px;">${subject}</span>
            </div>
            
            <div style="margin-bottom: 20px;">
              <strong style="color: #555;">Message:</strong>
              <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 10px; white-space: pre-wrap;">${message}</div>
            </div>
            
            <div style="background: #e3f2fd; padding: 15px; border-radius: 5px; margin-top: 20px;">
              <p style="margin: 0; color: #1976d2; font-size: 14px;">
                <strong>Submitted on:</strong> ${new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        
        <div style="background: #333; color: white; padding: 20px; text-align: center;">
          <p style="margin: 0; font-size: 14px;">
            This message was sent from the MediDetect Contact Form
          </p>
        </div>
      </div>
    `

    // Send email to admin/support
    await sendEmail({
      to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
      subject: `New Contact Request: ${subject}`,
      html: emailContent,
    })

    // Send confirmation email to the user
    const confirmationContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Thank You for Contacting Us</h1>
        </div>
        
        <div style="padding: 30px; background-color: #f9f9f9;">
          <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-top: 0;">We've Received Your Message</h2>
            
            <p style="color: #666; line-height: 1.6;">
              Dear ${name},
            </p>
            
            <p style="color: #666; line-height: 1.6;">
              Thank you for reaching out to MediDetect. We have received your message regarding "${subject}" and our team will get back to you within 24-48 hours.
            </p>
            
            <div style="background: #f0f7ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #1976d2; margin-top: 0;">Message Summary:</h3>
              <p style="color: #666; margin: 10px 0; white-space: pre-wrap;">${message.substring(0, 200)}${message.length > 200 ? '...' : ''}</p>
            </div>
            
            <div style="margin: 30px 0;">
              <h3 style="color: #333;">Need Immediate Assistance?</h3>
              <ul style="color: #666; line-height: 1.6;">
                <li>Email: ${process.env.CONTACT_EMAIL || 'support@medidetect.com'}</li>
                <li>Phone: +1 (555) 000-0000</li>
                <li>Emergency: +1 (555) 911-HELP</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div style="background: #333; color: white; padding: 20px; text-align: center;">
          <p style="margin: 0; font-size: 14px;">
            © ${new Date().getFullYear()} MediDetect. All rights reserved.
          </p>
        </div>
      </div>
    `

    await sendEmail({
      to: email,
      subject: 'Thank You for Contacting MediDetect',
      html: confirmationContent,
    })

    res.status(200).json({ 
      message: 'Message sent successfully! We will get back to you soon.' 
    })

  } catch (error) {
    console.error('Contact form error:', error)
    res.status(500).json({ 
      error: 'Failed to send message. Please try again later.' 
    })
  }
})

export default router
