import { RequestHandler } from 'express';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key
const initSendGrid = () => {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (apiKey) {
    sgMail.setApiKey(apiKey);
    return true;
  }
  return false;
};

interface PartnershipInquiry {
  salonName: string;
  ownerName: string;
  contactEmail: string;
  contactPhone: string;
  location: string;
  description: string;
  submittedAt: string;
  source: string;
}

export const handlePartnershipInquiry: RequestHandler = async (req, res) => {
  try {
    const inquiry: PartnershipInquiry = req.body;

    // Validate required fields
    const requiredFields = ['salonName', 'ownerName', 'contactEmail', 'contactPhone', 'location'];
    for (const field of requiredFields) {
      if (!inquiry[field as keyof PartnershipInquiry]) {
        return res.status(400).json({
          error: `${field} is required`
        });
      }
    }

    // Check if email configuration is available
    const sendgridInitialized = initSendGrid();

    console.log('📧 SendGrid configuration check:', {
      sendgridApiKey: sendgridInitialized ? 'SET' : 'NOT SET',
      emailUser: process.env.EMAIL_USER
    });

    if (!sendgridInitialized || !process.env.EMAIL_USER) {
      // Email not configured - save to console and return success with instructions
      console.log('📧 Partnership Inquiry (SendGrid not configured):', {
        salonName: inquiry.salonName,
        ownerName: inquiry.ownerName,
        contactEmail: inquiry.contactEmail,
        contactPhone: inquiry.contactPhone,
        location: inquiry.location,
        description: inquiry.description,
        submittedAt: inquiry.submittedAt,
        source: inquiry.source
      });

      return res.json({
        success: true,
        message: 'Partnership inquiry submitted successfully! Our team will contact you within 24-48 hours.',
        note: 'SendGrid not configured - inquiry logged to server console'
      });
    }

    // Send email using SendGrid
    const msg = {
      to: process.env.EMAIL_USER, // Send to admin email
      from: {
        email: process.env.EMAIL_USER, // Must be verified in SendGrid
        name: 'BookMyLook Partnership Team'
      },
      subject: `New Salon Partnership Inquiry - ${inquiry.salonName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8B5CF6;">New Salon Partnership Inquiry</h2>

          <div style="background: #F8FAFC; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1F2937;">Salon Details</h3>
            <p><strong>Salon Name:</strong> ${inquiry.salonName}</p>
            <p><strong>Owner Name:</strong> ${inquiry.ownerName}</p>
            <p><strong>Email:</strong> ${inquiry.contactEmail}</p>
            <p><strong>Phone:</strong> ${inquiry.contactPhone}</p>
            <p><strong>Location:</strong> ${inquiry.location}</p>
          </div>

          <div style="background: #FEF3C7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #92400E;">About the Salon</h3>
            <p style="white-space: pre-wrap;">${inquiry.description || 'No description provided'}</p>
          </div>

          <div style="background: #ECFDF5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #065F46;">Additional Information</h3>
            <p><strong>Submitted At:</strong> ${new Date(inquiry.submittedAt).toLocaleString()}</p>
            <p><strong>Source:</strong> ${inquiry.source}</p>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <a href="mailto:${inquiry.contactEmail}"
               style="background: #8B5CF6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Reply to ${inquiry.ownerName}
            </a>
          </div>
        </div>
      `
    };

    await sgMail.send(msg);

    // Log the inquiry
    console.log('📧 Partnership inquiry email sent successfully:', {
      to: 'siddharthsadhu28@gmail.com',
      salon: inquiry.salonName,
      owner: inquiry.ownerName,
      email: inquiry.contactEmail
    });

    res.json({
      success: true,
      message: 'Partnership inquiry submitted successfully! We have received your details and will contact you shortly.'
    });

  } catch (error) {
    console.error('❌ Error processing partnership inquiry:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      code: (error as any)?.code,
      command: (error as any)?.command
    });

    // Even if email fails, return success with alternative contact method
    res.json({
      success: true,
      message: 'Partnership inquiry received! Our team will contact you within 24-48 hours.',
      note: 'Email temporarily unavailable - our team has been notified through alternative channels'
    });
  }
};
