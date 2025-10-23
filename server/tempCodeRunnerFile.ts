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

  // Security Middleware
  app.use(helmet());
  app.use(cors({
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:8080',
      'http://localhost:8081',
      'http://127.0.0.1:61781' // Vite proxy port
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
  
  // ===== AUTH ROUTES =====
  app.post("/api/auth/register", registrationRateLimit, handleRegister);
  app.post("/api/auth/login", authRateLimit, handleLogin);
  app.post("/api/auth/refresh", authRateLimit, handleRefreshToken);
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
