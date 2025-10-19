import { RequestHandler } from "express";
import { ApiResponse, Service, ServiceCategory } from "@shared/api";

// Get services for a specific salon or all services
export const handleServices: RequestHandler = async (req, res) => {
  try {
    // Mock services data
    const mockServices = [
      {
        id: 's1',
        salonId: '1',
        name: 'Hair Cut',
        description: 'Professional hair cutting service',
        category: {
          id: 'cat1',
          name: 'Hair Services',
          slug: 'hair-services',
          description: 'All hair related services',
          icon: null
        },
        categoryId: 'cat1',
        price: 300,
        discountPrice: null,
        durationMinutes: 45,
        isActive: true,
        requiresDeposit: false,
        depositAmount: null,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        salon: {
          id: '1',
          name: 'StyleMaster Salon',
          slug: 'stylemaster-salon',
          city: 'Bangalore',
          averageRating: 4.5
        },
        _count: { bookings: 25 }
      },
      {
        id: 's2',
        salonId: '1',
        name: 'Beard Styling',
        description: 'Expert beard grooming',
        category: {
          id: 'cat1',
          name: 'Hair Services',
          slug: 'hair-services',
          description: 'All hair related services',
          icon: null
        },
        categoryId: 'cat1',
        price: 150,
        discountPrice: null,
        durationMinutes: 30,
        isActive: true,
        requiresDeposit: false,
        depositAmount: null,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        salon: {
          id: '1',
          name: 'StyleMaster Salon',
          slug: 'stylemaster-salon',
          city: 'Bangalore',
          averageRating: 4.5
        },
        _count: { bookings: 18 }
      },
      {
        id: 's3',
        salonId: '2',
        name: 'Facial',
        description: 'Complete facial treatment',
        category: {
          id: 'cat2',
          name: 'Beauty Services',
          slug: 'beauty-services',
          description: 'Beauty and skincare services',
          icon: null
        },
        categoryId: 'cat2',
        price: 500,
        discountPrice: null,
        durationMinutes: 60,
        isActive: true,
        requiresDeposit: false,
        depositAmount: null,
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-02-01'),
        salon: {
          id: '2',
          name: 'Beauty Bliss',
          slug: 'beauty-bliss',
          city: 'Bangalore',
          averageRating: 4.2
        },
        _count: { bookings: 12 }
      }
    ];

    const response: ApiResponse = {
      success: true,
      data: mockServices,
      meta: {
        page: 1,
        limit: 50,
        total: mockServices.length,
        totalPages: 1
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching services:', error);
    const response: ApiResponse = {
      success: false,
      error: "Failed to fetch services"
    };
    res.status(500).json(response);
  }
};

// Get all service categories
export const handleServiceCategories: RequestHandler = async (req, res) => {
  try {
    const mockCategories = [
      {
        id: 'cat1',
        name: 'Hair Services',
        slug: 'hair-services',
        description: 'All hair related services',
        icon: null,
        _count: { services: 2 }
      },
      {
        id: 'cat2',
        name: 'Beauty Services',
        slug: 'beauty-services',
        description: 'Beauty and skincare services',
        icon: null,
        _count: { services: 1 }
      }
    ];

    const response: ApiResponse = {
      success: true,
      data: mockCategories
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching categories:', error);
    const response: ApiResponse = {
      success: false,
      error: "Failed to fetch service categories"
    };
    res.status(500).json(response);
  }
};

// Get services by category
export const handleServicesByCategory: RequestHandler = async (req, res) => {
  try {
    const { categorySlug } = req.params;

    const mockCategories = {
      'hair-services': {
        id: 'cat1',
        name: 'Hair Services',
        slug: 'hair-services',
        description: 'All hair related services',
        icon: null
      },
      'beauty-services': {
        id: 'cat2',
        name: 'Beauty Services',
        slug: 'beauty-services',
        description: 'Beauty and skincare services',
        icon: null
      }
    };

    const category = mockCategories[categorySlug as keyof typeof mockCategories];

    if (!category) {
      const response: ApiResponse = {
        success: false,
        error: "Category not found"
      };
      return res.status(404).json(response);
    }

    const mockServices = categorySlug === 'hair-services' ? [
      {
        id: 's1',
        salonId: '1',
        name: 'Hair Cut',
        description: 'Professional hair cutting service',
        salon: {
          id: '1',
          name: 'StyleMaster Salon',
          slug: 'stylemaster-salon',
          address: '123 MG Road, Bangalore',
          city: 'Bangalore',
          averageRating: 4.5,
          totalReviews: 25
        },
        price: 300,
        durationMinutes: 45
      },
      {
        id: 's2',
        salonId: '1',
        name: 'Beard Styling',
        description: 'Expert beard grooming',
        salon: {
          id: '1',
          name: 'StyleMaster Salon',
          slug: 'stylemaster-salon',
          address: '123 MG Road, Bangalore',
          city: 'Bangalore',
          averageRating: 4.5,
          totalReviews: 25
        },
        price: 150,
        durationMinutes: 30
      }
    ] : [
      {
        id: 's3',
        salonId: '2',
        name: 'Facial',
        description: 'Complete facial treatment',
        salon: {
          id: '2',
          name: 'Beauty Bliss',
          slug: 'beauty-bliss',
          address: '456 Brigade Road, Bangalore',
          city: 'Bangalore',
          averageRating: 4.2,
          totalReviews: 18
        },
        price: 500,
        durationMinutes: 60
      }
    ];

    const response: ApiResponse = {
      success: true,
      data: {
        category,
        services: mockServices,
        pagination: {
          page: 1,
          limit: 20,
          total: mockServices.length,
          totalPages: 1
        }
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching services by category:', error);
    const response: ApiResponse = {
      success: false,
      error: "Failed to fetch services"
    };
    res.status(500).json(response);
  }
};
