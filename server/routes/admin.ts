import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';

interface SeedAdminRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

// Seed admin endpoint
export const handleSeedAdmin: RequestHandler = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password }: SeedAdminRequest = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        error: 'First name, last name, email, and password are required'
      });
    }

    // Check if admin already exists
    const existingAdmin = await req.prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (existingAdmin) {
      return res.status(400).json({
        error: 'Admin user already exists. Cannot seed another admin.'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create admin user
    const adminUser = await req.prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        password: hashedPassword,
        role: 'ADMIN',
        emailVerified: true,
        phoneVerified: true,
        isActive: true
      }
    });

    // Remove password from response
    const { password: _, ...adminResponse } = adminUser;

    res.json({
      success: true,
      message: 'Admin user created successfully',
      admin: adminResponse
    });

  } catch (error) {
    console.error('Error seeding admin:', error);

    // Handle unique constraint violations
    if (error.code === 'P2002') {
      return res.status(400).json({
        error: 'Email or phone number already exists'
      });
    }

    res.status(500).json({
      error: 'Failed to seed admin user'
    });
  }
};

// Analytics endpoints
export const handleGetAnalytics: RequestHandler = async (req, res) => {
  try {
    const { timeRange = '30d' } = req.query;

    // Calculate date range based on timeRange
    const now = new Date();
    let startDate = new Date();

    switch (timeRange) {
      case '7d':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(now.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(now.getDate() - 90);
        break;
      case '1y':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setDate(now.getDate() - 30);
    }

    // Get basic KPIs
    const [totalUsers, newUsers, totalSalons, activeSalons, revenueStats, bookingStats] = await Promise.all([
      // Total users
      req.prisma.user.count({
        where: { isActive: true, role: 'CUSTOMER' }
      }),

      // New users in time range
      req.prisma.user.count({
        where: {
          isActive: true,
          role: 'CUSTOMER',
          createdAt: { gte: startDate }
        }
      }),

      // Total salons
      req.prisma.salon.count(),

      // Active salons
      req.prisma.salon.count({
        where: { isActive: true, isVerified: true }
      }),

      // Revenue stats
      req.prisma.booking.aggregate({
        where: {
          status: { in: ['COMPLETED', 'CONFIRMED'] },
          paymentStatus: 'PAID',
          appointmentDate: { gte: startDate }
        },
        _sum: { totalAmount: true },
        _count: true
      }),

      // Booking stats
      req.prisma.booking.aggregate({
        where: { appointmentDate: { gte: startDate } },
        _count: { id: true }
      })
    ]);

    // Get monthly revenue data
    const monthlyRevenue = await req.prisma.$queryRaw`
      SELECT
        DATE_TRUNC('month', "appointmentDate") as month,
        SUM("totalAmount") as revenue,
        COUNT(*) as bookings
      FROM "Booking"
      WHERE "appointmentDate" >= ${startDate}
        AND "status" IN ('COMPLETED', 'CONFIRMED')
        AND "paymentStatus" = 'PAID'
      GROUP BY DATE_TRUNC('month', "appointmentDate")
      ORDER BY month
    `;

    // Get user growth data
    const userGrowth = await req.prisma.$queryRaw`
      SELECT
        DATE_TRUNC('month', "createdAt") as month,
        COUNT(*) as total_users,
        SUM(CASE WHEN "createdAt" >= ${startDate} THEN 1 ELSE 0 END) as new_users
      FROM "User"
      WHERE "isActive" = true AND "role" = 'CUSTOMER'
      GROUP BY DATE_TRUNC('month', "createdAt")
      ORDER BY month
    `;

    // Get booking time distribution
    const bookingTimeDistribution = await req.prisma.$queryRaw`
      SELECT
        EXTRACT(hour from "appointmentTime") as hour,
        COUNT(*) as bookings
      FROM "Booking"
      WHERE "appointmentDate" >= ${startDate}
      GROUP BY EXTRACT(hour from "appointmentTime")
      ORDER BY hour
    `;

    // Get customer retention data (simplified)
    const retentionData = [
      { segment: 'New', retention: 65 },
      { segment: 'Regular', retention: 85 },
      { segment: 'VIP', retention: 95 }
    ];

    // Get service popularity data
    const servicePopularity = await req.prisma.$queryRaw`
      SELECT
        s."name",
        COUNT(b.id) as bookings,
        COALESCE(SUM(b."totalAmount"), 0) as revenue
      FROM "Service" s
      LEFT JOIN "Booking" b ON s.id = b."serviceId"
        AND b."appointmentDate" >= ${startDate}
        AND b."status" IN ('COMPLETED', 'CONFIRMED')
        AND b."paymentStatus" = 'PAID'
      GROUP BY s.id, s."name"
      ORDER BY bookings DESC
      LIMIT 10
    `;

    // Calculate average booking value
    const avgBookingValue = revenueStats._count > 0 ? revenueStats._sum.totalAmount / revenueStats._count : 0;

    res.json({
      success: true,
      data: {
        kpiData: {
          totalUsers,
          newUsers,
          totalSalons,
          activeSalons,
          monthlyRevenue: revenueStats._sum.totalAmount || 0,
          totalBookings: bookingStats._count,
          avgBookingValue: Math.round(avgBookingValue),
          customerRetention: 87.5 // Mock for now
        },
        revenueData: monthlyRevenue,
        userGrowthData: userGrowth,
        bookingTimeData: bookingTimeDistribution,
        retentionData,
        servicePopularityData: servicePopularity
      }
    });

  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch analytics data'
    });
  }
};

export const handleGetDashboardStats: RequestHandler = async (req, res) => {
  try {
    // Get today's stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [
      todaysBookings,
      todaysRevenue,
      pendingBookings,
      activeQueues,
      newUsersToday,
      totalActiveUsers
    ] = await Promise.all([
      // Today's bookings
      req.prisma.booking.count({
        where: {
          appointmentDate: { gte: today, lt: tomorrow }
        }
      }),

      // Today's revenue
      req.prisma.booking.aggregate({
        where: {
          appointmentDate: { gte: today, lt: tomorrow },
          status: { in: ['COMPLETED', 'CONFIRMED'] },
          paymentStatus: 'PAID'
        },
        _sum: { totalAmount: true }
      }),

      // Pending bookings
      req.prisma.booking.count({
        where: { status: 'PENDING' }
      }),

      // Active queue entries
      req.prisma.queueEntry.count({
        where: { status: { in: ['WAITING', 'IN_SERVICE'] } }
      }),

      // New users today
      req.prisma.user.count({
        where: {
          createdAt: { gte: today, lt: tomorrow },
          role: 'CUSTOMER'
        }
      }),

      // Total active users
      req.prisma.user.count({
        where: {
          isActive: true,
          role: 'CUSTOMER'
        }
      })
    ]);

    res.json({
      success: true,
      data: {
        todaysBookings,
        todaysRevenue: todaysRevenue._sum.totalAmount || 0,
        pendingBookings,
        activeQueues,
        newUsersToday,
        totalActiveUsers
      }
    });

  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dashboard statistics'
    });
  }
};

// Admin user management endpoints
export const handleGetUsers: RequestHandler = async (req, res) => {
  try {
    const { page = 1, limit = 50, search, role, status } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    // Build where clause
    const where: any = {};
    if (search) {
      where.OR = [
        { firstName: { contains: search as string, mode: 'insensitive' } },
        { lastName: { contains: search as string, mode: 'insensitive' } },
        { email: { contains: search as string, mode: 'insensitive' } }
      ];
    }
    if (role && role !== 'all') {
      where.role = role;
    }
    if (status && status !== 'all') {
      where.isActive = status === 'ACTIVE';
    }

    const [users, total] = await Promise.all([
      req.prisma.user.findMany({
        where,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          role: true,
          isActive: true,
          createdAt: true,
          lastLogin: true,
          _count: {
            select: {
              bookings: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum
      }),
      req.prisma.user.count({ where })
    ]);

    console.log('✅ Admin Users API: Query executed successfully');
    console.log('📊 Admin Users API: Found', users.length, 'users, total:', total);
    console.log('📋 Admin Users API: Sample user:', users[0]);

    // Transform data to match frontend expectations
    const transformedUsers = users.map(user => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName || ''}`.trim(),
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.isActive ? 'ACTIVE' : 'INACTIVE',
      createdAt: user.createdAt.toISOString(),
      lastLogin: user.lastLogin?.toISOString(),
      totalBookings: user._count.bookings
    }));

    res.json({
      success: true,
      data: {
        users: transformedUsers,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum)
        }
      }
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch users'
    });
  }
};

// Admin salon management endpoints
export const handleGetSalons: RequestHandler = async (req, res) => {
  try {
    const { page = 1, limit = 50, search, status, city } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    // Build where clause
    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { owner: { firstName: { contains: search as string, mode: 'insensitive' } } },
        { owner: { lastName: { contains: search as string, mode: 'insensitive' } } }
      ];
    }
    if (status && status !== 'all') {
      where.isActive = status === 'ACTIVE';
      if (status === 'PENDING') {
        where.isVerified = false;
      } else if (status === 'ACTIVE') {
        where.isVerified = true;
      }
    }
    if (city && city !== 'all') {
      where.city = city;
    }

    const [salons, total] = await Promise.all([
      req.prisma.salon.findMany({
        where,
        include: {
          owner: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
              phone: true
            }
          },
          services: true,
          _count: {
            select: {
              bookings: true,
              reviews: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum
      }),
      req.prisma.salon.count({ where })
    ]);

    // Transform data to match frontend expectations
    const transformedSalons = salons.map(salon => ({
      id: salon.id,
      name: salon.name,
      ownerName: `${salon.owner.firstName} ${salon.owner.lastName || ''}`.trim(),
      ownerEmail: salon.owner.email,
      ownerPhone: salon.owner.phone,
      status: salon.isActive ? (salon.isVerified ? 'ACTIVE' : 'PENDING') : 'INACTIVE',
      address: salon.address,
      city: salon.city,
      state: salon.state,
      services: salon.services.map(s => s.name),
      rating: salon.rating || 0,
      totalCustomers: salon._count.bookings,
      totalRevenue: salon.totalRevenue || 0,
      createdAt: salon.createdAt.toISOString()
    }));

    res.json({
      success: true,
      data: {
        salons: transformedSalons,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum)
        }
      }
    });

  } catch (error) {
    console.error('Error fetching salons:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch salons'
    });
  }
};

// Admin booking management endpoints
export const handleGetAllBookings: RequestHandler = async (req, res) => {
  console.log('🚀 BOOKINGS API CALLED - This should appear if route is working');

  console.log('🔧 Admin Bookings API: Request method:', req.method);
  console.log('🔧 Admin Bookings API: Request URL:', req.url);
  console.log('🔧 Admin Bookings API: Headers:', req.headers.authorization ? 'HAS AUTH' : 'NO AUTH');
  console.log('🔧 Admin Bookings API: User from middleware:', req.user);
  console.log('🔧 Admin Bookings API: Prisma available:', !!req.prisma);

  try {
    console.log('🔍 Admin Bookings API: Request received');
    console.log('🔍 Admin Bookings API: Query params:', req.query);

    const { page = 1, limit = 50, search, status, dateFrom, dateTo } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    // Build where clause
    const where: any = {};
    if (search) {
      where.OR = [
        { customer: { firstName: { contains: search as string, mode: 'insensitive' } } },
        { customer: { lastName: { contains: search as string, mode: 'insensitive' } } },
        { salon: { name: { contains: search as string, mode: 'insensitive' } } },
        { service: { name: { contains: search as string, mode: 'insensitive' } } },
        { bookingNumber: { contains: search as string, mode: 'insensitive' } }
      ];
    }
    if (status && status !== 'all') {
      where.status = status;
    }
    if (dateFrom || dateTo) {
      where.appointmentDate = {};
      if (dateFrom) {
        where.appointmentDate.gte = new Date(dateFrom as string);
      }
      if (dateTo) {
        where.appointmentDate.lte = new Date(dateTo as string);
      }
    }

    const [bookings, total] = await Promise.all([
      req.prisma.booking.findMany({
        where,
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
              phone: true
            }
          },
          salon: {
            select: {
              name: true
            }
          },
          service: {
            select: {
              name: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum
      }),
      req.prisma.booking.count({ where })
    ]);

    console.log('✅ Admin Bookings API: Query executed successfully');
    console.log('📊 Admin Bookings API: Found', bookings.length, 'bookings, total:', total);
    console.log('📋 Admin Bookings API: First booking raw:', bookings[0]);

    // Transform data to match frontend expectations
    const transformedBookings = bookings.map(booking => {
      console.log('🔄 Processing booking:', booking.id, 'User:', booking.user, 'Salon:', booking.salon, 'Service:', booking.service);
      return {
        id: booking.id,
        customerName: booking.user ? `${booking.user.firstName} ${booking.user.lastName || ''}`.trim() : 'Unknown Customer',
        customerEmail: booking.user?.email || '',
        customerPhone: booking.user?.phone || '',
        salonName: booking.salon?.name || 'Unknown Salon',
        serviceName: booking.service?.name || 'Unknown Service',
        servicePrice: booking.servicePrice,
        status: booking.status,
        bookingDate: booking.appointmentDate.toISOString().split('T')[0],
        bookingTime: booking.appointmentTime,
        duration: (() => {
          // Calculate duration from appointmentTime and endTime
          try {
            const start = booking.appointmentTime;
            const end = booking.endTime;
            if (start && end) {
              const [startHour, startMin] = start.split(':').map(Number);
              const [endHour, endMin] = end.split(':').map(Number);
              const startMinutes = startHour * 60 + startMin;
              const endMinutes = endHour * 60 + endMin;
              return endMinutes - startMinutes;
            }
            return 0;
          } catch {
            return 0;
          }
        })(),
        notes: booking.notes,
        createdAt: booking.createdAt.toISOString()
      };
    });

    console.log('✅ Admin Bookings API: Data transformation completed');
    console.log('📋 Admin Bookings API: First transformed booking:', transformedBookings[0]);

    res.json({
      success: true,
      data: {
        bookings: transformedBookings,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum)
        }
      }
    });

  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch bookings'
    });
  }
};

// Update user status
export const handleUpdateUserStatus: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const { isActive } = req.body;

    const user = await req.prisma.user.update({
      where: { id: userId },
      data: { isActive },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        isActive: true
      }
    });

    res.json({
      success: true,
      message: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
      data: user
    });

  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update user status'
    });
  }
};

// Update salon status
export const handleUpdateSalonStatus: RequestHandler = async (req, res) => {
  try {
    const { salonId } = req.params;
    const { action } = req.body; // 'approve', 'reject', 'suspend'

    let updateData: any = {};
    let message = '';

    switch (action) {
      case 'approve':
        updateData = { isVerified: true, isActive: true };
        message = 'Salon approved successfully';
        break;
      case 'reject':
        updateData = { isVerified: false, isActive: false };
        message = 'Salon rejected successfully';
        break;
      case 'suspend':
        updateData = { isActive: false };
        message = 'Salon suspended successfully';
        break;
      case 'activate':
        updateData = { isActive: true };
        message = 'Salon activated successfully';
        break;
      default:
        return res.status(400).json({
          success: false,
          error: 'Invalid action'
        });
    }

    const salon = await req.prisma.salon.update({
      where: { id: salonId },
      data: updateData,
      select: {
        id: true,
        name: true,
        isActive: true,
        isVerified: true
      }
    });

    res.json({
      success: true,
      message,
      data: salon
    });

  } catch (error) {
    console.error('Error updating salon status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update salon status'
    });
  }
};

// Update booking status
export const handleUpdateBookingStatus: RequestHandler = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status, notes } = req.body;

    const booking = await req.prisma.booking.update({
      where: { id: bookingId },
      data: { status, notes },
      include: {
        user: {
          select: { firstName: true, lastName: true, email: true }
        },
        salon: {
          select: { name: true }
        },
        service: {
          select: { name: true }
        }
      }
    });

    res.json({
      success: true,
      message: 'Booking status updated successfully',
      data: booking
    });

  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update booking status'
    });
  }
};
