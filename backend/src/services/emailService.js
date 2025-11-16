import nodemailer from 'nodemailer'

// Create transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

const emailTemplates = {
  passwordReset: (data) => ({
    subject: 'Password Reset Request - MediDetect',
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #0066cc 0%, #00d4ff 100%); padding: 40px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">MediDetect</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0;">Password Reset Request</p>
        </div>
        <div style="background: white; padding: 40px; border-radius: 0 0 8px 8px; border: 1px solid #e5e5e5;">
          <p style="color: #333; font-size: 16px; margin-bottom: 20px;">Hi ${data.userName},</p>
          <p style="color: #666; font-size: 14px; margin-bottom: 30px;">
            We received a request to reset your password. Click the button below to proceed:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.resetUrl}" style="background: #0066cc; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; font-size: 14px;">
              Reset Password
            </a>
          </div>
          <p style="color: #999; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            This link will expire in 1 hour. If you didn't request this, please ignore this email. Your password will not be changed without your action.
          </p>
        </div>
      </div>
    `,
  }),
  passwordChanged: (data) => ({
    subject: 'Password Changed Successfully - MediDetect',
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #0066cc 0%, #00d4ff 100%); padding: 40px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">MediDetect</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0;">Password Updated</p>
        </div>
        <div style="background: white; padding: 40px; border-radius: 0 0 8px 8px; border: 1px solid #e5e5e5;">
          <p style="color: #333; font-size: 16px; margin-bottom: 20px;">Hi ${data.userName},</p>
          <p style="color: #666; font-size: 14px; margin-bottom: 20px;">
            Your password has been successfully changed. Your account is now secure with your new password.
          </p>
          <p style="color: #999; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            If this wasn't you, please contact support immediately at support@medidetect.com
          </p>
        </div>
      </div>
    `,
  }),
  adminAlert: (data) => ({
    subject: data.title,
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #0066cc 0%, #00d4ff 100%); padding: 40px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">MediDetect</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0;">Important Notification</p>
        </div>
        <div style="background: white; padding: 40px; border-radius: 0 0 8px 8px; border: 1px solid #e5e5e5;">
          <p style="color: #333; font-size: 16px; margin-bottom: 20px;">Hi ${data.userName},</p>
          <div style="background: #f5f5f5; padding: 20px; border-left: 4px solid #0066cc; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0; font-size: 18px;">${data.title}</h2>
            <p style="color: #666; font-size: 14px; margin-bottom: 0; white-space: pre-wrap;">${data.message}</p>
          </div>
          <p style="color: #999; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            This is an important message from the MediDetect Team. Please read it carefully.
          </p>
        </div>
      </div>
    `,
  }),
  welcomeEmail: (data) => ({
    subject: 'Welcome to MediDetect - AI Cancer Risk Assessment',
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #0066cc 0%, #00d4ff 100%); padding: 40px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">MediDetect</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0;">Welcome Aboard!</p>
        </div>
        <div style="background: white; padding: 40px; border-radius: 0 0 8px 8px; border: 1px solid #e5e5e5;">
          <p style="color: #333; font-size: 16px; margin-bottom: 20px;">Hi ${data.userName},</p>
          <p style="color: #666; font-size: 14px; margin-bottom: 20px;">
            Thank you for joining MediDetect! We're excited to help you with advanced AI-powered cancer risk assessment.
          </p>
          <p style="color: #666; font-size: 14px; margin-bottom: 20px;">
            You can now:
          </p>
          <ul style="color: #666; font-size: 14px; margin-bottom: 20px;">
            <li>Upload medical reports and test results</li>
            <li>Get instant AI-powered risk assessments</li>
            <li>Read educational health articles</li>
            <li>Track your health history</li>
          </ul>
          <p style="color: #999; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            Disclaimer: MediDetect is for informational purposes only and should not replace professional medical advice.
          </p>
        </div>
      </div>
    `,
  }),
}

export const sendEmail = async ({ to, subject, template, data }) => {
  try {
    const emailTemplate = emailTemplates[template]
    if (!emailTemplate) {
      throw new Error(`Template '${template}' not found`)
    }

    const emailContent = emailTemplate(data)

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: emailContent.subject,
      html: emailContent.html,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('[v0] Email sent successfully:', info.messageId)
    return info
  } catch (error) {
    console.error('[v0] Error sending email:', error.message)
    throw error
  }
}
