/**
 * Security utilities for authentication and authorization
 */

import rateLimit from 'express-rate-limit';
import bcrypt from 'bcryptjs';

// Rate limiting configurations
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Very high limit for development
  message: {
    success: false,
    error: 'Too many authentication attempts. Please try again in 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Don't count successful logins
  skip: () => {
    // Skip ALL rate limiting for development/testing
    return true;
  }
});

export const registrationRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 1000, // Very high limit for development
  message: {
    success: false,
    error: 'Too many registration attempts. Please try again in 1 hour.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => {
    // Skip ALL rate limiting for development/testing
    return true;
  }
});

export const generalRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Increased from 100 to 1000 for development testing
  message: {
    success: false,
    error: 'Too many requests. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req, res) => {
    // Skip rate limiting for development/testing - remove in production
    return process.env.NODE_ENV !== 'production';
  }
});

// Password security utilities
export class PasswordSecurity {
  private static readonly SALT_ROUNDS = 12;
  private static readonly MIN_LENGTH = 8;
  private static readonly MAX_LENGTH = 128;

  static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.SALT_ROUNDS);
  }

  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  static validatePasswordStrength(password: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (password.length < this.MIN_LENGTH) {
      errors.push(`Password must be at least ${this.MIN_LENGTH} characters long`);
    }

    if (password.length > this.MAX_LENGTH) {
      errors.push(`Password cannot be longer than ${this.MAX_LENGTH} characters`);
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one digit');
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    // Check for repeated characters (more than 3 in a row)
    if (/(.)\1{3,}/.test(password)) {
      errors.push('Password cannot contain more than 3 repeated characters');
    }

    // Check for common weak patterns
    const weakPatterns = [
      /^password/i,
      /^123456/,
      /^qwerty/i,
      /^admin/i,
      /^user/i,
      /^login/i
    ];

    if (weakPatterns.some(pattern => pattern.test(password))) {
      errors.push('Password contains common weak patterns');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static sanitizePassword(password: string): string {
    // Trim whitespace and normalize
    return password.trim();
  }
}

// Input sanitization utilities
export class InputSanitizer {
  static sanitizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  static sanitizePhone(phone: string): string {
    return phone.replace(/\s+/g, '').trim();
  }

  static sanitizeName(name: string): string {
    return name.trim();
  }

  static sanitizeString(input: string, maxLength: number = 255): string {
    return input.trim().substring(0, maxLength);
  }
}

// Security headers middleware
export function securityHeaders(req: any, res: any, next: any) {
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');

  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Enable XSS protection
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Referrer policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Content Security Policy (basic)
  res.setHeader('Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "font-src 'self'; " +
    "connect-src 'self'; " +
    "frame-ancestors 'none';"
  );

  next();
}
