import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
// Removed: import passport from "passport";
import { Server as SocketIOServer } from "socket.io";
import { createServer as createHttpServer } from "http";
import { ApiResponse, UserRole } from "@shared/api";

// Import Prisma client
import { PrismaClient } from "../generated/prisma/index.js";

// Import route handlers
import { handleDemo } from "./routes/demo";
import { handleShops, handleGetSalon } from "./routes/shops";
import { handleServices, handleServiceCategories, handleServicesByCategory } from "./routes/services";
import { handleEstimate } from "./routes/estimate";
import { 
  handleGetBookings, 
  handleCreateBooking, 
  handleUpdateBooking, 
  handleCancelBooking 
} from "./routes/bookings";
import { 
  handleGetReviews, 
  handleCreateReview, 
  handleGetReviewStats 
} from "./routes/reviews";
import { 
  handleContactSubmission, 
  handleGetContactSubmissions, 
  handleGetContactStats 
} from "./routes/contact";
import { 
  handleRegister,
  handleLogin,
  handleRefreshToken,
  handleLogout,
  handleRequestPasswordReset,
  handleResetPassword,
  handleGetCurrentUser
} from "./routes/auth";
import { handleGoogleAuth, handleGoogleCallback, setPrismaInstance, initializeOAuthStrategy } from "./routes/oauth";
import { handlePartnershipInquiry } from "./routes/partnerships";
import { handleSeedAdmin, handleGetAnalytics, handleGetDashboardStats, handleGetUsers, handleGetSalons, handleGetAllBookings, handleUpdateUserStatus, handleUpdateSalonStatus, handleUpdateBookingStatus } from "./routes/admin";
import { authRateLimit, registrationRateLimit, generalRateLimit, securityHeaders } from "./utils/security";
import { ErrorResponse, handlePrismaError } from "./utils/error-handling";
import {
  handleGetQueues,
  handleGetQueueEntry,
  handleUpdateQueueEntry,
  handleAddToQueue
} from "./routes/queue";

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret';

// Extend Express Request to include user and prisma
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        role: UserRole;
      };
      prisma: any; // Prisma client will be added via middleware
    }
  }
}

// Authentication Middleware
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    const response: ApiResponse = {
      success: false,
      error: 'Access token required'
    };
    return res.status(401).json(response);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role
    };
    next();
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: 'Invalid or expired token'
    };
    return res.status(403).json(response);
  }
};

// Role-based Authorization Middleware
const authorize = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log('🔐 Authorization check:', {
      userRole: req.user?.role,
      requiredRoles: roles,
      userId: req.user?.userId
    });

    if (!req.user) {
      console.log('❌ Authorization failed: No user in request');
      const response: ApiResponse = {
        success: false,
        error: 'Authentication required'
      };
      return res.status(401).json(response);
    }

    console.log('🔍 Checking role inclusion:', {
      userRole: req.user.role,
      userRoleType: typeof req.user.role,
      rolesArray: roles,
      rolesType: roles.map(r => typeof r),
      includes: roles.includes(req.user.role as UserRole)
    });

    if (!roles.includes(req.user.role as UserRole)) {
      console.log('❌ Authorization failed: Insufficient permissions');
      const response: ApiResponse = {
        success: false,
        error: 'Insufficient permissions'
      };
      return res.status(403).json(response);
    }

    console.log('✅ Authorization passed');
    next();
  };
};

export function createServer() {
  const app = express();

  // Create HTTP server first
  const httpServer = createHttpServer(app);

  // Initialize Prisma client
  const prisma = new PrismaClient();

  // Initialize OAuth with Prisma instance
  setPrismaInstance(prisma);
  initializeOAuthStrategy();

  // Initialize Socket.IO server
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: [
        process.env.FRONTEND_URL || 'http://localhost:8080',
        'http://localhost:8081',
        'http://127.0.0.1:61781' // Vite proxy port
      ],
      credentials: true
    },
    transports: ['websocket', 'polling']
  });

  // Socket.IO middleware for authentication
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        socket.data.user = {
          userId: decoded.userId,
          email: decoded.email,
          role: decoded.role
        };
        next();
      } catch (error) {
        next(new Error('Authentication error'));
      }
    } else {
      // Allow anonymous connections for public features
      socket.data.user = null;
      next();
    }
  });

  // Socket.IO connection handling
  io.on('connection', (socket) => {
    console.log(`🔌 Client connected: ${socket.id}`, socket.data.user ? `User: ${socket.data.user.email}` : 'Anonymous');

    // Join user-specific rooms for targeted updates
    if (socket.data.user) {
      socket.join(`user_${socket.data.user.userId}`);
      socket.join(`role_${socket.data.user.role}`);

      // Role-specific room joins
      switch (socket.data.user.role) {
        case 'SALON_OWNER':
          socket.join('salon_owners');
          break;
        case 'ADMIN':
          socket.join('admins');
          break;
        case 'CUSTOMER':
          socket.join('customers');
          break;
      }
    }

    // Handle subscription to salon-specific updates
    socket.on('subscribe_to_salon', (salonId: string) => {
      socket.join(`salon_${salonId}`);
      console.log(`📡 ${socket.id} subscribed to salon: ${salonId}`);
    });

    // Handle unsubscription from salon-specific updates
    socket.on('unsubscribe_from_salon', (salonId: string) => {
      socket.leave(`salon_${salonId}`);
      console.log(`📡 ${socket.id} unsubscribed from salon: ${salonId}`);
    });

    socket.on('disconnect', () => {
      console.log(`🔌 Client disconnected: ${socket.id}`);
    });
  });

  // Attach io instance to app for use in routes
  app.set('io', io);

  // Middleware to attach Prisma to request
  app.use((req: Request, res: Response, next: NextFunction) => {
    req.prisma = prisma;
    next();
  });

  // Body parsing middleware
  app.use(express.json({ limit: '10mb' })); // Parse JSON bodies
  app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Parse URL-encoded bodies

  // Cookie parsing middleware
  app.use(cookieParser());

  // Removed: Passport middleware - using manual OAuth implementation

  // Security Middleware
  app.use(helmet());
  app.use(cors({
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:8083',
      'http://localhost:8080',
      'http://localhost:8081',
      'http://127.0.0.1:61781', // Vite proxy port
      'http://127.0.0.1:54600' // Browser preview port
    ],
    credentials: true
  }));
  
  // Rate limiting middleware
  app.use('/api/auth/login', authRateLimit);
  app.use('/api/auth/register', registrationRateLimit);

  // General rate limiting for all API routes
  app.use('/api', generalRateLimit);

  // Security headers
  app.use(securityHeaders);

  // Health Check
  app.get("/api/health", async (_req, res) => {
    try {
      // Mock database health check
      res.json({ 
        status: 'healthy',
        database: 'mock',
        timestamp: new Date().toISOString() 
      });
    } catch (error) {
      res.status(500).json({ 
        status: 'unhealthy',
        database: 'mock',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // ===== PUBLIC ROUTES (No Authentication Required) =====
  
  // Test endpoint
  app.get("/api/test", (_req, res) => {
    res.json({ message: "Server is working!", timestamp: Date.now() });
  });

  // Demo endpoint
  app.get("/api/demo", handleDemo);
  
  // ===== PUBLIC AUTH ROUTES =====
  app.post("/api/auth/register", registrationRateLimit, handleRegister);
  app.post("/api/auth/login", authRateLimit, handleLogin);
  app.post("/api/auth/refresh", handleRefreshToken);
  app.post("/api/auth/logout", handleLogout);
  app.get("/api/auth/me", authenticateToken, handleGetCurrentUser);
  app.post("/api/auth/forgot-password", authRateLimit, handleRequestPasswordReset);
  app.post("/api/auth/reset-password", authRateLimit, handleResetPassword);
  
  // Google OAuth routes
  app.get("/api/auth/google", handleGoogleAuth);
  app.get("/api/auth/google/callback", handleGoogleCallback);
  
  // Public salon and service routes
  app.get("/api/shops", handleShops);
  app.get("/api/shops/:id", handleGetSalon);
  app.get("/api/services", handleServices);
  app.get("/api/services/categories", handleServiceCategories);
  app.get("/api/services/category/:categorySlug", handleServicesByCategory);
  app.post("/api/estimate", handleEstimate);
  
  // Public review viewing
  app.get("/api/reviews", handleGetReviews);
  app.get("/api/reviews/stats", handleGetReviewStats);
  
  // Queue routes (public for viewing)
  app.get("/api/queue", handleGetQueues);
  app.get("/api/queue/entry/:bookingId", authenticateToken, handleGetQueueEntry);
  
  // Contact form (public)
  app.post("/api/contact", handleContactSubmission);
  
  // Partnership inquiry (public)
  app.post("/api/partnerships/inquire", handlePartnershipInquiry);

  // Admin seeding (public - for initial setup)
  app.post("/api/admin/seed", handleSeedAdmin);

  // ===== PROTECTED ROUTES (Authentication Required) =====
  
  // Customer booking routes
  app.get("/api/bookings", authenticateToken, handleGetBookings);
  app.post("/api/bookings", authenticateToken, handleCreateBooking);
  app.put("/api/bookings/:id", authenticateToken, handleUpdateBooking);
  app.delete("/api/bookings/:id", authenticateToken, handleCancelBooking);
  
  // Review creation (must be authenticated)
  app.post("/api/reviews", authenticateToken, handleCreateReview);
  
  // ===== ADMIN ONLY ROUTES =====
  app.get("/api/admin/analytics", 
    authenticateToken, 
    authorize('ADMIN'), 
    handleGetAnalytics
  );
  app.get("/api/admin/dashboard-stats", 
    authenticateToken, 
    authorize('ADMIN'), 
    handleGetDashboardStats
  );
  app.get("/api/admin/users", 
    authenticateToken, 
    authorize('ADMIN'), 
    handleGetUsers
  );
  app.get("/api/admin/salons", 
    authenticateToken, 
    authorize('ADMIN'), 
    handleGetSalons
  );
  app.get("/api/admin/bookings",
    authenticateToken,
    authorize('ADMIN'),
    (req, res, next) => {
      console.log('🎯 BOOKINGS ROUTE HIT - Middleware passed');
      next();
    },
    handleGetAllBookings
  );
  app.put("/api/admin/users/:userId/status", 
    authenticateToken, 
    authorize('ADMIN'), 
    handleUpdateUserStatus
  );
  app.put("/api/admin/salons/:salonId/status", 
    authenticateToken, 
    authorize('ADMIN'), 
    handleUpdateSalonStatus
  );
  app.put("/api/admin/bookings/:bookingId/status", 
    authenticateToken, 
    authorize('ADMIN'), 
    handleUpdateBookingStatus
  );
  app.get("/api/contact/submissions", 
    authenticateToken, 
    authorize('ADMIN'), 
    handleGetContactSubmissions
  );
  app.get("/api/contact/stats", 
    authenticateToken, 
    authorize('ADMIN'), 
    handleGetContactStats
  );

  // ===== ERROR HANDLING =====

  // Global Error Handler
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    // Handle Prisma errors specifically
    if (err.message?.includes('P') && err.message?.length < 10) {
      const prismaError = handlePrismaError(err);
      return ErrorResponse.send(res, prismaError);
    }

    // Handle other operational errors
    ErrorResponse.send(res, err);
  });

  return httpServer;
}
