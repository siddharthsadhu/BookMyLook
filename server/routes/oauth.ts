import { RequestHandler } from 'express';
import { ApiResponse, User } from '@shared/api';
import { ErrorResponse, asyncHandler } from '../utils/error-handling';
import jwt from 'jsonwebtoken';

// Import dotenv to ensure environment variables are loaded
import * as dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

// Import Prisma client
import { PrismaClient } from "../../generated/prisma/index.js";

// Global prisma instance for OAuth
let prismaInstance: PrismaClient | null = null;

// Initialize OAuth
export const setPrismaInstance = (prisma: PrismaClient) => {
  prismaInstance = prisma;
  console.log('🔗 Prisma instance set for OAuth');
};

export const initializeOAuthStrategy = () => {
  if (!prismaInstance) {
    throw new Error('Prisma instance not set for OAuth');
  }
  console.log('✅ Manual Google OAuth initialized (no Passport)');
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

// Manual Google OAuth implementation
export const handleGoogleAuth: RequestHandler = (req, res) => {
  console.log('🌐 Google OAuth initiated');

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = `${process.env.FRONTEND_URL || 'http://localhost:8083'}/api/auth/google/callback`;

  if (!clientId) {
    console.error('❌ GOOGLE_CLIENT_ID not configured');
    return res.status(500).json({
      success: false,
      error: 'OAuth configuration missing'
    });
  }

  // Generate Google OAuth URL manually
  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  authUrl.searchParams.set('client_id', clientId);
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('scope', 'openid email profile');
  authUrl.searchParams.set('access_type', 'offline');
  authUrl.searchParams.set('prompt', 'consent');

  console.log('🔄 Redirecting to Google OAuth');
  res.redirect(authUrl.toString());
};

export const handleGoogleCallback: RequestHandler = asyncHandler(async (req, res) => {
  console.log('🎯 Google OAuth callback received');

  // Check for OAuth errors
  if (req.query.error) {
    console.error('❌ OAuth error from Google:', req.query.error);
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:8083';
    return res.redirect(`${frontendUrl}/login?error=oauth_failed&message=${req.query.error}`);
  }

  // Check for authorization code
  if (!req.query.code) {
    console.error('❌ No authorization code received from Google');
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:8083';
    return res.redirect(`${frontendUrl}/login?error=no_code`);
  }

  const code = req.query.code as string;

  try {
    console.log('🔄 Exchanging authorization code for tokens...');

    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: `${process.env.FRONTEND_URL || 'http://localhost:8083'}/api/auth/google/callback`
      })
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error('❌ Token exchange failed:', tokenResponse.status, errorData);
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:8083';
      return res.redirect(`${frontendUrl}/login?error=token_exchange_failed`);
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    console.log('✅ Access token obtained, fetching user profile...');

    // Fetch user profile from Google
    const profileResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!profileResponse.ok) {
      console.error('❌ Profile fetch failed:', profileResponse.status);
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:8083';
      return res.redirect(`${frontendUrl}/login?error=profile_fetch_failed`);
    }

    const profile = await profileResponse.json();
    console.log('👤 Google profile fetched successfully');

    // Process user with our custom logic
    const user = await processOAuthUser(profile, prismaInstance!);
    console.log('✅ User processed successfully:', user.id);

    // Generate JWT tokens
    const jwtAccessToken = generateAccessToken(user);
    const jwtRefreshToken = generateRefreshToken(user);

    console.log('🔑 JWT tokens generated successfully');

    // Redirect to frontend with tokens
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:8083';
    const redirectUrl = `${frontendUrl}/auth/callback?accessToken=${encodeURIComponent(jwtAccessToken)}&refreshToken=${encodeURIComponent(jwtRefreshToken)}`;

    console.log('🔄 Redirecting to frontend with tokens');
    res.redirect(redirectUrl);

  } catch (error) {
    console.error('❌ OAuth callback error:', error);
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:8083';
    res.redirect(`${frontendUrl}/login?error=callback_error`);
  }
});

// Process OAuth user (same as before)
const processOAuthUser = async (profile: any, prisma: PrismaClient): Promise<User> => {
  console.log('🔍 Processing OAuth user for profile:', profile.id);

  // Extract safe profile data
  const profileData = {
    providerId: profile.id,
    email: profile.email,
    firstName: profile.given_name || profile.name?.split(' ')[0] || profile.email.split('@')[0] || 'Unknown',
    lastName: profile.family_name || profile.name?.split(' ').slice(1).join(' ') || null,
    avatar: profile.picture || null,
    verified: profile.verified_email || false
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
