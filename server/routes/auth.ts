import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ApiResponse, User, LoginRequest, RegisterRequest } from "@shared/api";

// JWT Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret';

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

// Generate JWT tokens
function generateAccessToken(user: User): string {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: '15m' } // Short-lived access token
  );
}

function generateRefreshToken(user: User): string {
  return jwt.sign(
    { userId: user.id },
    JWT_REFRESH_SECRET,
    { expiresIn: '7d' } // Long-lived refresh token
  );
}

// Register new user
export const handleRegister: RequestHandler = async (req, res) => {
  try {
    const { email, phone, password, firstName, lastName, role } = req.body;

    // Validate required fields
    if (!email || !password || !firstName || !lastName) {
      const response: ApiResponse = {
        success: false,
        error: "Email, password, first name, and last name are required"
      };
      return res.status(400).json(response);
    }

    // Check if user already exists
    const existingUser = await req.prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          ...(phone ? [{ phone: phone }] : [])
        ]
      }
    });

    if (existingUser) {
      const response: ApiResponse = {
        success: false,
        error: "User with this email or phone already exists"
      };
      return res.status(400).json(response);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await req.prisma.user.create({
      data: {
        email,
        phone,
        password: hashedPassword,
        firstName,
        lastName,
        role: role || 'CUSTOMER',
        emailVerified: false,
        phoneVerified: false
      }
    });

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    const response: ApiResponse = {
      success: true,
      data: {
        user: userWithoutPassword,
        accessToken,
        refreshToken
      },
      message: "User registered successfully"
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Registration error:', error);
    const response: ApiResponse = {
      success: false,
      error: "Failed to register user"
    };
    res.status(500).json(response);
  }
};

// Login user
export const handleLogin: RequestHandler = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    // Validate required fields
    if (!password || (!email && !phone)) {
      const response: ApiResponse = {
        success: false,
        error: "Email or phone and password are required"
      };
      return res.status(400).json(response);
    }

    // Find user by email or phone
    const user = await req.prisma.user.findFirst({
      where: {
        OR: [
          ...(email ? [{ email: email }] : []),
          ...(phone ? [{ phone: phone }] : [])
        ]
      }
    });

    if (!user || !user.password) {
      const response: ApiResponse = {
        success: false,
        error: "Invalid credentials"
      };
      return res.status(401).json(response);
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      const response: ApiResponse = {
        success: false,
        error: "Invalid credentials"
      };
      return res.status(401).json(response);
    }

    // Check if user is active
    if (!user.isActive) {
      const response: ApiResponse = {
        success: false,
        error: "Account is deactivated"
      };
      return res.status(401).json(response);
    }

    // Update last login
    await req.prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() }
    });

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    const response: ApiResponse = {
      success: true,
      data: {
        user: userWithoutPassword,
        accessToken,
        refreshToken
      },
      message: "Login successful"
    };

    res.json(response);
  } catch (error) {
    console.error('Login error:', error);
    const response: ApiResponse = {
      success: false,
      error: "Login failed"
    };
    res.status(500).json(response);
  }
};

// Refresh access token
export const handleRefreshToken: RequestHandler = async (req, res) => {
  try {
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
      const response: ApiResponse = {
        success: false,
        error: "Invalid refresh token"
      };
      return res.status(401).json(response);
    }

    // Generate new tokens
    const accessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    const response: ApiResponse = {
      success: true,
      data: {
        accessToken,
        refreshToken: newRefreshToken
      },
      message: "Token refreshed successfully"
    };

    res.json(response);
  } catch (error) {
    console.error('Token refresh error:', error);
    const response: ApiResponse = {
      success: false,
      error: "Invalid refresh token"
    };
    res.status(401).json(response);
  }
};

// Logout user (client-side token removal)
export const handleLogout: RequestHandler = async (req, res) => {
  try {
    const response: ApiResponse = {
      success: true,
      message: "Logged out successfully"
    };

    res.json(response);
  } catch (error) {
    console.error('Logout error:', error);
    const response: ApiResponse = {
      success: false,
      error: "Logout failed"
    };
    res.status(500).json(response);
  }
};

// Get current user profile
export const handleGetCurrentUser: RequestHandler = async (req, res) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      const response: ApiResponse = {
        success: false,
        error: "User not authenticated"
      };
      return res.status(401).json(response);
    }

    const user = await req.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        phone: true,
        firstName: true,
        lastName: true,
        avatar: true,
        role: true,
        emailVerified: true,
        phoneVerified: true,
        isActive: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      const response: ApiResponse = {
        success: false,
        error: "User not found"
      };
      return res.status(404).json(response);
    }

    if (!user.isActive) {
      const response: ApiResponse = {
        success: false,
        error: "Account is deactivated"
      };
      return res.status(401).json(response);
    }

    const response: ApiResponse = {
      success: true,
      data: user
    };

    res.json(response);
  } catch (error) {
    console.error('Get current user error:', error);
    const response: ApiResponse = {
      success: false,
      error: "Failed to get user profile"
    };
    res.status(500).json(response);
  }
};