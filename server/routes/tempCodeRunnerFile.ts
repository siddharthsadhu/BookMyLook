import { RequestHandler } from 'express';
import { createRequire } from 'module';
import passport from 'passport';
import { ApiResponse, User } from '@shared/api';
import { ErrorResponse, asyncHandler } from '../utils/error-handling';
import jwt from 'jsonwebtoken';

// Create require function for CommonJS packages in ES modules
const require = createRequire(import.meta.url);

// Import CommonJS packages using require
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');

// Import Profile type separately
type Profile = any; // Type will be inferred from usage

// Import dotenv to ensure environment variables are loaded
import * as dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

// Import Prisma client
import { PrismaClient } from "../../generated/prisma/index.js";

// Global prisma instance for OAuth
let prismaInstance: PrismaClient | null = null;

// Initialize OAuth strategy
export const setPrismaInstance = (prisma: PrismaClient) => {
  prismaInstance = prisma;
  console.log('🔗 Prisma instance set for OAuth');
};

export const initializeOAuthStrategy = () => {
  if (!prismaInstance) {
    throw new Error('Prisma instance not set for OAuth');
  }

  console.log('🚀 Initializing Google OAuth strategy...');

  // Configure Passport Google Strategy
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: `${process.env.FRONTEND_URL || 'http://localhost:8083'}/api/auth/google/callback`
  },
  async (accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any) => void) => {
    try {
      console.log('🔐 Google OAuth callback received:', {
        profileId: profile.id,
        displayName: profile.displayName,
        email: profile.emails?.[0]?.value,
        emailVerified: profile.emails?.[0]?.verified,
        hasAccessToken: !!accessToken,
        hasRefreshToken: !!refreshToken
      });

      if (!profile.emails || profile.emails.length === 0) {
        console.error('❌ No email in Google profile');
        return done(new Error('Email is required for Google OAuth'));
      }

      // Process user
      const user = await processOAuthUser(profile, prismaInstance!);
      console.log('✅ OAuth user processed successfully:', user.id);
      done(null, user);

    } catch (error) {
      console.error('❌ OAuth strategy error:', error);
      done(error);
    }
  }));

  console.log('✅ Google OAuth strategy initialized successfully');
};

// Process OAuth user
const processOAuthUser = async (profile: Profile, prisma: PrismaClient): Promise<User> => {
  console.log('🔍 Processing OAuth user for profile:', profile.id);

  // Extract safe profile data
  const profileData = {
    providerId: profile.id,
    email: profile.emails![0].value,
    firstName: profile.name?.givenName ||
               profile.displayName?.split(' ')[0] ||
               profile.emails[0].value.split('@')[0] ||
               'Unknown',
    lastName: profile.name?.familyName ||
              profile.displayName?.split(' ').slice(1).join(' ') ||
              null,
    avatar: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null,
    verified: profile.emails[0].verified || false
  };

  console.log('📝 Extracted profile data:', profileData);

  try {
    // Check if OAuth provider exists
    console.log('🔍 Checking for existing OAuth provider...');
    const existingOAuth = await prisma.oAuthProvider.findUnique({
      where: {
        provider_providerId: {
          provider: 'google',
          providerId: profileData.providerId
        }
      },
      include: { user: true }
    });

    if (existingOAuth) {
      console.log('✅ Found existing OAuth user:', existingOAuth.user.id);
      // Update last login
      await prisma.user.update({
        where: { id: existingOAuth.user.id },
        data: { lastLogin: new Date() }
      });
      return existingOAuth.user;
    }

    // Check if user exists with same email
    console.log('🔍 Checking for existing user with email:', profileData.email);
    let user = await prisma.user.findUnique({
      where: { email: profileData.email }
    });

    if (user) {
      console.log('🔗 Linking existing user to Google account:', user.id);
    } else {
      console.log('👤 Creating new user from Google profile');
      user = await prisma.user.create({
        data: {
          email: profileData.email,
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          avatar: profileData.avatar,
          emailVerified: profileData.verified,
          role: 'CUSTOMER',
          isActive: true,
          lastLogin: new Date()
        }
      });
      console.log('✅ New user created:', user.id);
    }

    // Create OAuth provider link
    console.log('🔗 Creating OAuth provider link');
    await prisma.oAuthProvider.create({
      data: {
        provider: 'google',
        providerId: profileData.providerId,
        userId: user.id
      }
    });

    console.log('✅ OAuth provider link created');
    return user;

  } catch (error) {
    console.error('❌ Database error in OAuth processing:', error);
    throw error;
  }
};

// JWT token generation
const generateAccessToken = (user: any): string => {
  const secret = process.env.JWT_SECRET || 'fallback-jwt-secret';
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role
    },
    secret,
    { expiresIn: '15m' }
  );
};

const generateRefreshToken = (user: any): string => {
  const secret = process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret';
  return jwt.sign(
    { userId: user.id },
    secret,
    { expiresIn: '7d' }
  );
};

// OAuth routes
export const handleGoogleAuth: RequestHandler = (req, res, next) => {
  console.log('🌐 Google OAuth initiated from:', req.headers.referer);
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false
  })(req, res, next);
};

export const handleGoogleCallback: RequestHandler = (req, res, next) => {
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:8083'}/login?error=oauth_failed`
  })(req, res, (err: any) => {
    if (err) {
      console.error('❌ Passport authentication error:', err);
      return res.status(500).json({
        success: false,
        error: 'Authentication failed'
      });
    }

    console.log('🎯 OAuth callback successful');

    const user = req.user as any;
    if (!user || !user.id || !user.email) {
      console.error('❌ Invalid user object after OAuth');
      return res.status(401).json({
        success: false,
        error: 'Authentication failed - invalid user data'
      });
    }

    console.log('👤 User authenticated:', {
      id: user.id,
      email: user.email,
      role: user.role
    });

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    console.log('🔑 Tokens generated successfully');

    // Redirect to frontend with tokens
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:8083';
    const redirectUrl = `${frontendUrl}/auth/callback?accessToken=${encodeURIComponent(accessToken)}&refreshToken=${encodeURIComponent(refreshToken)}`;

    console.log('🔄 Redirecting to:', redirectUrl);
    res.redirect(redirectUrl);
  });
};
