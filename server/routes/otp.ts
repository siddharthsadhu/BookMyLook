import { RequestHandler } from 'express';
import crypto from 'crypto';

// In-memory OTP storage (use Redis in production)
const otpStore = new Map<string, { otp: string; expiresAt: Date; attempts: number }>();

// Generate 6-digit OTP
const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP via SMS (mock implementation - integrate with actual SMS service)
const sendOTP = async (phone: string, otp: string): Promise<boolean> => {
  try {
    // Mock SMS sending - replace with actual SMS service like Twilio, MSG91, etc.
    console.log(`📱 Sending OTP ${otp} to ${phone}`);

    // Simulate SMS sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In production, integrate with SMS service:
    // const twilio = require('twilio')(accountSid, authToken);
    // await twilio.messages.create({
    //   body: `Your BookMyLook verification code is: ${otp}`,
    //   from: '+1234567890',
    //   to: phone
    // });

    return true;
  } catch (error) {
    console.error('Error sending OTP:', error);
    return false;
  }
};

interface SendOTPRequest {
  phone: string;
  purpose: 'login' | 'register' | 'verification';
}

export const handleSendOTP: RequestHandler = async (req, res) => {
  try {
    const { phone, purpose }: SendOTPRequest = req.body;

    // Validate phone number
    const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
    if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
      return res.status(400).json({
        error: 'Invalid phone number format'
      });
    }

    // Check rate limiting (max 3 OTP requests per hour per phone)
    const phoneKey = `otp_${phone}`;
    const existingOTP = otpStore.get(phoneKey);

    if (existingOTP && existingOTP.attempts >= 3) {
      const timeDiff = Date.now() - existingOTP.expiresAt.getTime();
      if (timeDiff < 3600000) { // 1 hour
        return res.status(429).json({
          error: 'Too many OTP requests. Please try again later.',
          retryAfter: Math.ceil((3600000 - timeDiff) / 1000)
        });
      }
    }

    // Generate new OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Store OTP
    otpStore.set(phoneKey, {
      otp,
      expiresAt,
      attempts: existingOTP ? existingOTP.attempts + 1 : 1
    });

    // Send OTP
    const sent = await sendOTP(phone, otp);

    if (!sent) {
      return res.status(500).json({
        error: 'Failed to send OTP. Please try again.'
      });
    }

    res.json({
      success: true,
      message: 'OTP sent successfully',
      expiresIn: 300 // 5 minutes
    });

  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({
      error: 'Failed to send OTP'
    });
  }
};

interface VerifyOTPRequest {
  phone: string;
  otp: string;
  purpose: 'login' | 'register' | 'verification';
}

export const handleVerifyOTP: RequestHandler = async (req, res) => {
  try {
    const { phone, otp, purpose }: VerifyOTPRequest = req.body;

    const phoneKey = `otp_${phone}`;
    const storedOTP = otpStore.get(phoneKey);

    if (!storedOTP) {
      return res.status(400).json({
        error: 'No OTP found for this phone number'
      });
    }

    // Check if OTP is expired
    if (Date.now() > storedOTP.expiresAt.getTime()) {
      otpStore.delete(phoneKey);
      return res.status(400).json({
        error: 'OTP has expired. Please request a new one.'
      });
    }

    // Check if OTP matches
    if (storedOTP.otp !== otp) {
      return res.status(400).json({
        error: 'Invalid OTP. Please try again.'
      });
    }

    // OTP verified successfully
    otpStore.delete(phoneKey); // Remove used OTP

    // For login/register purposes, we might need to check if user exists
    let userExists = false;
    if (purpose === 'login') {
      try {
        const user = await req.prisma.user.findUnique({
          where: { phone: phone.replace(/\s+/g, '') }
        });
        userExists = !!user;
      } catch (error) {
        // Ignore database errors for now
      }
    }

    res.json({
      success: true,
      message: 'OTP verified successfully',
      userExists: purpose === 'login' ? userExists : undefined
    });

  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({
      error: 'Failed to verify OTP'
    });
  }
};
