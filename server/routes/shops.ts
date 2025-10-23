import { RequestHandler } from "express";
import { ApiResponse, Salon } from "../../shared/api";

export const handleShops: RequestHandler = async (req, res) => {
  try {
    const { page = 1, limit = 20, city, search } = req.query;
    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 20;
    const skip = (pageNum - 1) * limitNum;

    // Build where clause
    const where: any = {
      isActive: true
    };

    if (city) {
      where.city = {
        contains: city as string,
        mode: 'insensitive'
      };
    }

    if (search) {
      where.OR = [
        {
          name: {
            contains: search as string,
            mode: 'insensitive'
          }
        },
        {
          description: {
            contains: search as string,
            mode: 'insensitive'
          }
        }
      ];
    }

    // Fetch salons with services
    const [salons, total] = await Promise.all([
      req.prisma.salon.findMany({
        where,
        include: {
          services: {
            where: { isActive: true },
            orderBy: { price: 'asc' }
          },
          owner: {
            select: {
              id: true,
              firstName: true,
              lastName: true
            }
          },
          _count: {
            select: {
              bookings: true
            }
          }
        },
        orderBy: { averageRating: 'desc' },
        skip,
        take: limitNum
      }),
      req.prisma.salon.count({ where })
    ]);

    const response: ApiResponse = {
      success: true,
      data: {
        salons,
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(total / limitNum)
        }
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching salons:', error);
    const response: ApiResponse = {
      success: false,
      error: `Failed to fetch salons: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
    res.status(500).json(response);
  }
};

// Get a single salon by ID or slug
export const handleGetSalon: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const salon = await req.prisma.salon.findFirst({
      where: {
        OR: [
          { id },
          { slug: id }
        ],
        isActive: true
      },
      include: {
        services: {
          where: { isActive: true },
          orderBy: { price: 'asc' }
        },
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        },
        staff: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true
              }
            }
          },
          where: { isActive: true }
        },
        reviews: {
          where: { isVisible: true },
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
        _count: {
          select: {
            bookings: true
          }
        }
      }
    });

    if (!salon) {
      const response: ApiResponse = {
        success: false,
        error: "Salon not found"
      };
      return res.status(404).json(response);
    }

    const response: ApiResponse = {
      success: true,
      data: salon
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching salon:', error);
    const response: ApiResponse = {
      success: false,
      error: "Failed to fetch salon"
    };
    res.status(500).json(response);
  }
};
