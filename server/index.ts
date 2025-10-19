import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ApiResponse, UserRole } from "@shared/api";

// Import Prisma client
import { PrismaClient } from "@generated/prisma";

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
  handleGetCurrentUser
} from "./routes/auth";
import {
  handleGetQueues,
  handleGetQueueEntry,
  handleUpdateQueueEntry,
  handleAddToQueue
} from "./routes/queue";

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
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
    if (!req.user) {
      const response: ApiResponse = {
        success: false,
        error: 'Authentication required'
      };
      return res.status(401).json(response);
    }

    if (!roles.includes(req.user.role)) {
      const response: ApiResponse = {
        success: false,
        error: 'Insufficient permissions'
      };
      return res.status(403).json(response);
    }

    next();
  };
};

export function createServer() {
  const app = express();

  // Initialize Prisma client
  const prisma = new PrismaClient();

  // Middleware to attach Prisma to request
  app.use((req: Request, res: Response, next: NextFunction) => {
    req.prisma = prisma;
    next();
  });

  // Security Middleware
  app.use(helmet());
  app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:8080',
    credentials: true
  }));
  
  // Body Parsing Middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(cookieParser());

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
  
  // ===== AUTH ROUTES =====
  app.post("/api/auth/register", handleRegister);
  app.post("/api/auth/login", handleLogin);
  app.post("/api/auth/refresh", handleRefreshToken);
  app.post("/api/auth/logout", handleLogout);
  app.get("/api/auth/me", authenticateToken, handleGetCurrentUser);
  
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

  // ===== PROTECTED ROUTES (Authentication Required) =====
  
  // Customer booking routes
  app.get("/api/bookings", authenticateToken, handleGetBookings);
  app.post("/api/bookings", authenticateToken, handleCreateBooking);
  app.put("/api/bookings/:id", authenticateToken, handleUpdateBooking);
  app.delete("/api/bookings/:id", authenticateToken, handleCancelBooking);
  
  // Review creation (must be authenticated)
  app.post("/api/reviews", authenticateToken, handleCreateReview);
  
  // ===== ADMIN ONLY ROUTES =====
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
  
  // 404 Handler
  // app.use('/api/*', (req: Request, res: Response) => {
  //   const response: ApiResponse = {
  //     success: false,
  //     error: 'Endpoint not found'
  //   };
  //   res.status(404).json(response);
  // });

  // Global Error Handler
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err);
    const response: ApiResponse = {
      success: false,
      error: process.env.NODE_ENV === 'production' 
        ? 'Internal server error' 
        : err.message
    };
    res.status(500).json(response);
  });

  return app;
}
