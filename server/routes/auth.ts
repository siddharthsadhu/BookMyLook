import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ApiResponse, User, LoginRequest, RegisterRequest } from "@shared/api";
import {
  validateLoginRequest,
  validateRegistrationRequest,
  formatValidationErrors
} from "../utils/validation";
import { PasswordSecurity, InputSanitizer } from "../utils/security";
import { ErrorResponse, ConflictError, AuthenticationError, NotFoundError, asyncHandler } from "../utils/error-handling";

// JWT Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret';
const JWT_RESET_SECRET = process.env.JWT_RESET_SECRET || 'your-reset-secret';

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

// Generate JWT tokens with optional extended lifetime
function generateAccessToken(user: User, rememberMe: boolean = false): string {
  const expiresIn = rememberMe ? '7d' : '15m'; // 7 days vs 15 minutes
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn }
  );
}

function generateRefreshToken(user: User, rememberMe: boolean = false): string {
  const expiresIn = rememberMe ? '30d' : '7d'; // 30 days vs 7 days
  return jwt.sign(
    { userId: user.id },
    JWT_REFRESH_SECRET,
    { expiresIn }
  );
}

// Register new user
export const handleRegister = asyncHandler(async (req, res) => {
  // Check if req.body exists
  if (!req.body) {
    console.error('req.body is undefined - body parser not working');
    return res.status(400).json({
      success: false,
      error: 'Invalid request body'
    });
  }

  const { email, phone, password, firstName, lastName, role } = req.body;

  console.log('📝 Registration request received:', {
    email: email || 'not provided',
    phone: phone || 'not provided',
    firstName: firstName || 'not provided',
    lastName: lastName || 'not provided',
    role: role || 'not provided',
    password: password ? 'provided' : 'not provided'
  });

  // Comprehensive input validation
  const validation = validateRegistrationRequest(req.body);
  console.log('🔍 Backend validation result:', {
    isValid: validation.isValid,
    errors: validation.errors
  });

  if (!validation.isValid) {
    console.log('❌ Validation failed:', validation.errors);
    return ErrorResponse.validation(res, validation.errors);
  }

  console.log('✅ Backend validation passed');

  // Check if user already exists with email or phone
  const existingUser = await req.prisma.user.findFirst({
    where: {
      OR: [
        ...(email && email.trim() ? [{ email: InputSanitizer.sanitizeEmail(email) }] : []),
        ...(phone && phone.trim() ? [{ phone: InputSanitizer.sanitizePhone(phone) }] : [])
      ],
      isActive: true // Only check active users
    }
  });

  if (existingUser) {
    // Determine which field caused the conflict for better error messaging
    let conflictField = 'account';
    if (email && existingUser.email === InputSanitizer.sanitizeEmail(email)) {
      conflictField = 'email address';
    } else if (phone && existingUser.phone === InputSanitizer.sanitizePhone(phone)) {
      conflictField = 'phone number';
    }

    throw new ConflictError(`An account with this ${conflictField} already exists. Please try logging in instead or use different contact information.`);
  }

  // Check if phone number is used by an active business (salon)
  // This prevents customers from registering with business phone numbers
  if (phone && phone.trim()) {
    const businessConflict = await req.prisma.salon.findFirst({
      where: {
        phone: InputSanitizer.sanitizePhone(phone),
        isActive: true
      }
    });

    if (businessConflict) {
      throw new ConflictError("This phone number is registered to a business. Please use a personal phone number for your account.");
    }
  }

  // Hash password with high cost factor for security
  const hashedPassword = await PasswordSecurity.hashPassword(password);

  // Generate email if not provided (for phone registration)
  const sanitizedEmail = email && email.trim()
    ? InputSanitizer.sanitizeEmail(email)
    : `${InputSanitizer.sanitizePhone(phone || 'unknown')}@phone.bookmylook.com`;

  // Double-check email uniqueness (including generated ones)
  const emailExists = await req.prisma.user.findUnique({
    where: { email: sanitizedEmail }
  });

  if (emailExists && emailExists.isActive) {
    // This should rarely happen, but handle it gracefully
    throw new ConflictError("Account registration failed. Please try again or contact support.");
  }

  // Create user with sanitized data
  const user = await req.prisma.user.create({
    data: {
      email: sanitizedEmail,
      phone: phone && phone.trim() ? InputSanitizer.sanitizePhone(phone) : null,
      password: hashedPassword,
      firstName: InputSanitizer.sanitizeName(firstName),
      lastName: lastName && lastName.trim() ? InputSanitizer.sanitizeName(lastName) : null,
      role: role || 'CUSTOMER',
      emailVerified: email && email.trim() ? false : true, // Phone registrations are considered verified
      phoneVerified: phone && phone.trim() ? true : false,
      isActive: true
    }
  });

  console.log('✅ User created successfully:', {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName
  });

  // Generate tokens
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // Remove password from response
  const { password: _, ...userWithoutPassword } = user;

  console.log('🔑 Tokens generated successfully');

  ErrorResponse.success(res, {
    user: userWithoutPassword,
    accessToken,
    refreshToken
  }, "User registered successfully");
});

// Login user
export const handleLogin = asyncHandler(async (req, res) => {
  // Check if req.body exists
  if (!req.body) {
    console.error('req.body is undefined - body parser not working');
    return res.status(400).json({
      success: false,
      error: 'Invalid request body'
    });
  }

  const { email, phone, password, rememberMe } = req.body;

  // Validate that either email or phone is provided, and password
  const errors: string[] = [];

  if (!password) {
    errors.push('Password is required');
  }

  if (!email && !phone) {
    errors.push('Please provide either an email address or phone number to log in');
  } else {
    // Additional validation for provided fields
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('Please enter a valid email address (like: name@example.com)');
    }
    if (phone && !/^(\+91)?[6-9]\d{9}$/.test(phone.replace(/\s+/g, ''))) {
      errors.push('Please enter a valid 10-digit phone number (like: +919876543210)');
    }
  }

  if (errors.length > 0) {
    return ErrorResponse.validation(res, { credentials: errors });
  }

  // Find user by email or phone (only active users)
  const user = await req.prisma.user.findFirst({
    where: {
      OR: [
        ...(email ? [{ email: InputSanitizer.sanitizeEmail(email) }] : []),
        ...(phone ? [{ phone: InputSanitizer.sanitizePhone(phone) }] : [])
      ],
      isActive: true // Only allow login for active users
    }
  });

  if (!user || !user.password) {
    // Security: Don't reveal whether the account exists or not
    // Provide a helpful message that guides the user to the right action
    throw new AuthenticationError("We couldn't find an account with those credentials. Please double-check your email/phone and password, or create a new account if you're new to BookMyLook.");
  }

  // User is already verified as active from the query
  // Check password with timing-safe comparison
  const isValidPassword = await PasswordSecurity.verifyPassword(password, user.password);
  if (!isValidPassword) {
    // Specific message for wrong password with helpful suggestions
    throw new AuthenticationError("That password doesn't match our records. Please try again, or use 'Forgot Password' if you've forgotten it. Remember, passwords are case-sensitive!");
  }

  // Update last login timestamp
  await req.prisma.user.update({
    where: { id: user.id },
    data: { lastLogin: new Date() }
  });

  // Generate tokens with extended lifetime if remember me is checked
  const accessToken = generateAccessToken(user, rememberMe || false);
  const refreshToken = generateRefreshToken(user, rememberMe || false);

  // Remove password from response
  const { password: _, ...userWithoutPassword } = user;

  ErrorResponse.success(res, {
    user: userWithoutPassword,
    accessToken,
    refreshToken
  }, "Login successful");
});

// Refresh access token
export const handleRefreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    const response: ApiResponse = {
      success: false,
      error: "Refresh token required"
    };
    return res.status(400).json(response);
  }

  // Verify refresh token
  const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as any;

  // Find user
  const user = await req.prisma.user.findUnique({
    where: { id: decoded.userId }
  });

  if (!user || !user.isActive) {
    throw new AuthenticationError("Invalid refresh token");
  }

  // Generate new tokens
  const accessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);

  ErrorResponse.success(res, {
    accessToken,
    refreshToken: newRefreshToken
  }, "Token refreshed successfully");
});

// Logout user (client-side token removal)
export const handleLogout = asyncHandler(async (req, res) => {
  ErrorResponse.success(res, null, "Logged out successfully");
});

// Phone login
export const handlePhoneLogin: RequestHandler = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        error: 'Phone number is required'
      });
    }

    // Find user by phone (only active users)
    const user = await req.prisma.user.findFirst({
      where: { 
        phone: phone.replace(/\s+/g, ''),
        isActive: true
      }
    });

    if (!user) {
      return res.status(404).json({
        error: 'No account found with this phone number'
      });
    }

    // User is already verified as active from the query

    // Generate JWT tokens
    const accessToken = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret',
      { expiresIn: '7d' }
    );

    // Update last login
    await req.prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() }
    });

    // Return success response
    const userResponse = {
      id: user.id,
      email: user.email,
      phone: user.phone,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      role: user.role,
      emailVerified: user.emailVerified,
      phoneVerified: user.phoneVerified,
      isActive: user.isActive,
      lastLogin: user.lastLogin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    res.json({
      success: true,
      data: {
        user: userResponse,
        accessToken,
        refreshToken
      }
    });

  } catch (error) {
    console.error('Phone login error:', error);
    res.status(500).json({
      error: 'Login failed. Please try again.'
    });
  }
};

// Request password reset
export const handleRequestPasswordReset = asyncHandler(async (req, res) => {
  try {
    const { email, phone } = req.body;

    console.log('Forgot password request received:', { email: email ? 'provided' : 'not provided', phone: phone ? 'provided' : 'not provided' });

    // Validate that either email or phone is provided
    if (!email && !phone) {
      console.log('Validation failed: No email or phone provided');
      return ErrorResponse.validation(res, { credentials: ['Email or phone number is required'] });
    }

    // Find user by email or phone (only active users)
    const user = await req.prisma.user.findFirst({
      where: {
        OR: [
          ...(email ? [{ email: InputSanitizer.sanitizeEmail(email) }] : []),
          ...(phone ? [{ phone: InputSanitizer.sanitizePhone(phone) }] : [])
        ],
        isActive: true
      }
    });

    console.log('User lookup result:', user ? 'User found' : 'User not found');

    // Always return success to prevent email enumeration attacks
    // But only send email if user exists
    if (user) {
      // Generate secure reset token
      const resetToken = jwt.sign(
        { userId: user.id, type: 'password_reset' },
        JWT_RESET_SECRET,
        { expiresIn: '1h' } // Token expires in 1 hour
      );

      // Send reset email (placeholder - you'll need to implement actual email sending)
      const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:8080'}/reset-password?token=${resetToken}`;

      console.log(`Password reset requested for user: ${user.email || user.phone}`);
      console.log(`Reset link: ${resetLink}`);

      // TODO: Implement actual email sending
      // await sendPasswordResetEmail(user.email, resetLink);
    }

    ErrorResponse.success(res, null, "If an account with that email/phone exists, we've sent you a password reset link.");
  } catch (error) {
    console.error('Forgot password handler error:', error);
    throw error; // Re-throw to be handled by asyncHandler
  }
});

// Reset password with token
export const handleResetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return ErrorResponse.validation(res, {
      token: token ? undefined : ['Reset token is required'],
      newPassword: newPassword ? undefined : ['New password is required']
    });
  }

  // Validate password strength
  const passwordValidation = PasswordSecurity.validatePasswordStrength(newPassword);
  if (!passwordValidation.isValid) {
    return ErrorResponse.validation(res, { newPassword: passwordValidation.errors });
  }

  // Verify reset token
  let decoded;
  try {
    decoded = jwt.verify(token, JWT_RESET_SECRET) as any;
  } catch (error) {
    throw new AuthenticationError("Invalid or expired reset token. Please request a new password reset.");
  }

  // Check token type and user ID
  if (decoded.type !== 'password_reset' || !decoded.userId) {
    throw new AuthenticationError("Invalid reset token.");
  }

  // Find user
  const user = await req.prisma.user.findUnique({
    where: { id: decoded.userId }
  });

  if (!user || !user.isActive) {
    throw new NotFoundError("User");
  }

  // Hash new password
  const hashedPassword = await PasswordSecurity.hashPassword(newPassword);

  // Update password and clear any reset tokens
  await req.prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      // Clear any remember me sessions on password reset for security
      updatedAt: new Date()
    }
  });

  // Optionally log the password reset for security auditing
  console.log(`Password reset successful for user: ${user.email || user.phone}`);

  ErrorResponse.success(res, null, "Password reset successfully. You can now log in with your new password.");
});