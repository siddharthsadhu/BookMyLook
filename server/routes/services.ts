import { RequestHandler } from "express";
import { ApiResponse, Service, ServiceCategory } from "@shared/api";

// Get services for a specific salon or all services
export const handleServices: RequestHandler = async (req, res) => {
  try {
    const { salonId, categoryId, page = 1, limit = 20, search } = req.query;
    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 20;
    const skip = (pageNum - 1) * limitNum;

    // Build where clause
    const where: any = {
      isActive: true
    };

    if (salonId) {
      where.salonId = salonId as string;
    }

    if (categoryId) {
      where.categoryId = categoryId as string;
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

    // Fetch services with salon and category info
    const [services, total] = await Promise.all([
      req.prisma.service.findMany({
        where,
        include: {
          salon: {
            select: {
              id: true,
              name: true,
              slug: true,
              city: true,
              averageRating: true,
              totalReviews: true
            }
          },
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
              description: true,
              icon: true
            }
          },
          _count: {
            select: {
              bookings: true
            }
          }
        },
        orderBy: { price: 'asc' },
        skip,
        take: limitNum
      }),
      req.prisma.service.count({ where })
    ]);

    // Transform data to match frontend expectations
    const transformedServices = services.map(service => ({
      id: service.id,
      salonId: service.salonId,
      name: service.name,
      description: service.description,
      category: {
        id: service.category.id,
        name: service.category.name,
        slug: service.category.slug,
        description: service.category.description,
        icon: service.category.icon
      },
      categoryId: service.categoryId,
      price: service.price,
      discountPrice: service.discountPrice,
      durationMinutes: service.durationMinutes,
      isActive: service.isActive,
      requiresDeposit: service.requiresDeposit,
      depositAmount: service.depositAmount,
      createdAt: service.createdAt,
      updatedAt: service.updatedAt,
      salon: {
        id: service.salon.id,
        name: service.salon.name,
        slug: service.salon.slug,
        city: service.salon.city,
        averageRating: service.salon.averageRating
      },
      _count: { bookings: service._count.bookings }
    }));

    const response: ApiResponse = {
      success: true,
      data: transformedServices,
      meta: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum)
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching services:', error);
    const response: ApiResponse = {
      success: false,
      error: `Failed to fetch services: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
    res.status(500).json(response);
  }
};

// Get all service categories
export const handleServiceCategories: RequestHandler = async (req, res) => {
  try {
    const categories = await req.prisma.serviceCategory.findMany({
      include: {
        _count: {
          select: {
            services: true
          }
        }
      },
      orderBy: { name: 'asc' }
    });

    // Transform to match frontend expectations
    const transformedCategories = categories.map(category => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      icon: category.icon,
      _count: { services: category._count.services }
    }));

    const response: ApiResponse = {
      success: true,
      data: transformedCategories
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching categories:', error);
    const response: ApiResponse = {
      success: false,
      error: `Failed to fetch service categories: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
    res.status(500).json(response);
  }
};

// Get services by category
export const handleServicesByCategory: RequestHandler = async (req, res) => {
  try {
    const { categorySlug } = req.params;
    const { page = 1, limit = 20, city } = req.query;
    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 20;
    const skip = (pageNum - 1) * limitNum;

    // Find the category by slug
    const category = await req.prisma.serviceCategory.findUnique({
      where: { slug: categorySlug }
    });

    if (!category) {
      const response: ApiResponse = {
        success: false,
        error: "Category not found"
      };
      return res.status(404).json(response);
    }

    // Build where clause for services
    const where: any = {
      categoryId: category.id,
      isActive: true,
      salon: {
        isActive: true
      }
    };

    if (city) {
      where.salon.city = {
        contains: city as string,
        mode: 'insensitive'
      };
    }

    // Fetch services with salon info
    const [services, total] = await Promise.all([
      req.prisma.service.findMany({
        where,
        include: {
          salon: {
            select: {
              id: true,
              name: true,
              slug: true,
              address: true,
              city: true,
              averageRating: true,
              totalReviews: true
            }
          }
        },
        orderBy: { price: 'asc' },
        skip,
        take: limitNum
      }),
      req.prisma.service.count({ where })
    ]);

    // Transform services to match frontend expectations
    const transformedServices = services.map(service => ({
      id: service.id,
      salonId: service.salonId,
      name: service.name,
      description: service.description,
      salon: {
        id: service.salon.id,
        name: service.salon.name,
        slug: service.salon.slug,
        address: service.salon.address,
        city: service.salon.city,
        averageRating: service.salon.averageRating,
        totalReviews: service.salon.totalReviews
      },
      price: service.price,
      durationMinutes: service.durationMinutes
    }));

    const response: ApiResponse = {
      success: true,
      data: {
        category: {
          id: category.id,
          name: category.name,
          slug: category.slug,
          description: category.description,
          icon: category.icon
        },
        services: transformedServices,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum)
        }
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching services by category:', error);
    const response: ApiResponse = {
      success: false,
      error: `Failed to fetch services: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
    res.status(500).json(response);
  }
};
