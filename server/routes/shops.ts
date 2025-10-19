import { RequestHandler } from "express";
import { ApiResponse, Salon } from "../../shared/api";

export const handleShops: RequestHandler = async (req, res) => {
  try {
    // Mock data for demonstration
    const mockSalons = [
      {
        id: '1',
        name: 'StyleMaster Salon',
        slug: 'stylemaster-salon',
        description: 'Premium hair and beauty services',
        logo: null,
        coverImage: null,
        ownerId: 'owner1',
        email: 'info@stylemaster.com',
        phone: '+91 9876543210',
        address: '123 MG Road, Bangalore',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560001',
        latitude: null,
        longitude: null,
        googleMapsUrl: null,
        gstNumber: null,
        panNumber: null,
        registrationNo: null,
        isActive: true,
        isVerified: true,
        acceptsOnlinePayment: true,
        instantBooking: true,
        openingTime: '09:00',
        closingTime: '21:00',
        workingDays: [1,2,3,4,5,6],
        lunchBreakStart: null,
        lunchBreakEnd: null,
        averageRating: 4.5,
        totalReviews: 25,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-15T00:00:00.000Z',
        services: [
          {
            id: 's1',
            salonId: '1',
            name: 'Hair Cut',
            description: 'Professional hair cutting service',
            categoryId: 'cat1',
            price: 300,
            discountPrice: null,
            durationMinutes: 45,
            isActive: true,
            requiresDeposit: false,
            depositAmount: null,
            createdAt: '2024-01-01T00:00:00.000Z',
            updatedAt: '2024-01-01T00:00:00.000Z'
          },
          {
            id: 's2',
            salonId: '1',
            name: 'Beard Styling',
            description: 'Expert beard grooming',
            categoryId: 'cat1',
            price: 150,
            discountPrice: null,
            durationMinutes: 30,
            isActive: true,
            requiresDeposit: false,
            depositAmount: null,
            createdAt: '2024-01-01T00:00:00.000Z',
            updatedAt: '2024-01-01T00:00:00.000Z'
          },
          {
            id: 's3',
            salonId: '1',
            name: 'Hair Wash',
            description: 'Deep conditioning hair wash',
            categoryId: 'cat1',
            price: 200,
            discountPrice: null,
            durationMinutes: 20,
            isActive: true,
            requiresDeposit: false,
            depositAmount: null,
            createdAt: '2024-01-01T00:00:00.000Z',
            updatedAt: '2024-01-01T00:00:00.000Z'
          }
        ],
        reviews: [],
        _count: { bookings: 15 }
      },
      {
        id: '2',
        name: 'Beauty Bliss',
        slug: 'beauty-bliss',
        description: 'Complete beauty solutions',
        logo: null,
        coverImage: null,
        ownerId: 'owner2',
        email: 'contact@beautybliss.com',
        phone: '+91 9876543211',
        address: '456 Brigade Road, Bangalore',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560025',
        latitude: null,
        longitude: null,
        googleMapsUrl: null,
        gstNumber: null,
        panNumber: null,
        registrationNo: null,
        isActive: true,
        isVerified: true,
        acceptsOnlinePayment: true,
        instantBooking: true,
        openingTime: '10:00',
        closingTime: '20:00',
        workingDays: [1,2,3,4,5,6,7],
        lunchBreakStart: null,
        lunchBreakEnd: null,
        averageRating: 4.2,
        totalReviews: 18,
        createdAt: '2024-02-01T00:00:00.000Z',
        updatedAt: '2024-02-10T00:00:00.000Z',
        services: [
          {
            id: 's4',
            salonId: '2',
            name: 'Facial',
            description: 'Complete facial treatment',
            categoryId: 'cat2',
            price: 500,
            discountPrice: null,
            durationMinutes: 60,
            isActive: true,
            requiresDeposit: false,
            depositAmount: null,
            createdAt: '2024-02-01T00:00:00.000Z',
            updatedAt: '2024-02-01T00:00:00.000Z'
          },
          {
            id: 's5',
            salonId: '2',
            name: 'Eyebrow Threading',
            description: 'Professional eyebrow shaping',
            categoryId: 'cat2',
            price: 100,
            discountPrice: null,
            durationMinutes: 15,
            isActive: true,
            requiresDeposit: false,
            depositAmount: null,
            createdAt: '2024-02-01T00:00:00.000Z',
            updatedAt: '2024-02-01T00:00:00.000Z'
          }
        ],
        reviews: [],
        _count: { bookings: 12 }
      },
      {
        id: '3',
        name: 'GentleCuts Barbershop',
        slug: 'gentle-cuts-barbershop',
        description: 'Traditional barber services with modern twist',
        logo: null,
        coverImage: null,
        ownerId: 'owner3',
        email: 'hello@gentlecuts.com',
        phone: '+91 9876543212',
        address: '789 Koramangala, Bangalore',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560034',
        latitude: null,
        longitude: null,
        googleMapsUrl: null,
        gstNumber: null,
        panNumber: null,
        registrationNo: null,
        isActive: true,
        isVerified: true,
        acceptsOnlinePayment: true,
        instantBooking: true,
        openingTime: '08:00',
        closingTime: '22:00',
        workingDays: [1,2,3,4,5,6,7],
        lunchBreakStart: null,
        lunchBreakEnd: null,
        averageRating: 4.7,
        totalReviews: 42,
        createdAt: '2024-01-15T00:00:00.000Z',
        updatedAt: '2024-02-01T00:00:00.000Z',
        services: [
          {
            id: 's6',
            salonId: '3',
            name: 'Classic Haircut',
            description: 'Traditional barber haircut',
            categoryId: 'cat1',
            price: 250,
            discountPrice: null,
            durationMinutes: 40,
            isActive: true,
            requiresDeposit: false,
            depositAmount: null,
            createdAt: '2024-01-15T00:00:00.000Z',
            updatedAt: '2024-01-15T00:00:00.000Z'
          },
          {
            id: 's7',
            salonId: '3',
            name: 'Royal Shave',
            description: 'Luxury hot towel shave',
            categoryId: 'cat1',
            price: 300,
            discountPrice: null,
            durationMinutes: 45,
            isActive: true,
            requiresDeposit: false,
            depositAmount: null,
            createdAt: '2024-01-15T00:00:00.000Z',
            updatedAt: '2024-01-15T00:00:00.000Z'
          },
          {
            id: 's8',
            salonId: '3',
            name: 'Head Massage',
            description: 'Relaxing head and neck massage',
            categoryId: 'cat3',
            price: 400,
            discountPrice: null,
            durationMinutes: 30,
            isActive: true,
            requiresDeposit: false,
            depositAmount: null,
            createdAt: '2024-01-15T00:00:00.000Z',
            updatedAt: '2024-01-15T00:00:00.000Z'
          }
        ],
        reviews: [],
        _count: { bookings: 28 }
      },
      {
        id: '4',
        name: 'Glow Beauty Studio',
        slug: 'glow-beauty-studio',
        description: 'Luxury beauty treatments and spa services',
        logo: null,
        coverImage: null,
        ownerId: 'owner4',
        email: 'book@glowstudio.com',
        phone: '+91 9876543213',
        address: '321 Jayanagar, Bangalore',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560011',
        latitude: null,
        longitude: null,
        googleMapsUrl: null,
        gstNumber: null,
        panNumber: null,
        registrationNo: null,
        isActive: true,
        isVerified: true,
        acceptsOnlinePayment: true,
        instantBooking: true,
        openingTime: '09:30',
        closingTime: '19:30',
        workingDays: [2,3,4,5,6,7],
        lunchBreakStart: '13:30',
        lunchBreakEnd: '14:30',
        averageRating: 4.8,
        totalReviews: 67,
        createdAt: '2024-01-20T00:00:00.000Z',
        updatedAt: '2024-02-05T00:00:00.000Z',
        services: [
          {
            id: 's9',
            salonId: '4',
            name: 'Luxury Facial',
            description: 'Premium facial with gold masks',
            categoryId: 'cat2',
            price: 800,
            discountPrice: null,
            durationMinutes: 75,
            isActive: true,
            requiresDeposit: false,
            depositAmount: null,
            createdAt: '2024-01-20T00:00:00.000Z',
            updatedAt: '2024-01-20T00:00:00.000Z'
          },
          {
            id: 's10',
            salonId: '4',
            name: 'Body Massage',
            description: 'Full body aromatherapy massage',
            categoryId: 'cat3',
            price: 1200,
            discountPrice: null,
            durationMinutes: 90,
            isActive: true,
            requiresDeposit: false,
            depositAmount: null,
            createdAt: '2024-01-20T00:00:00.000Z',
            updatedAt: '2024-01-20T00:00:00.000Z'
          },
          {
            id: 's11',
            salonId: '4',
            name: 'Manicure & Pedicure',
            description: 'Complete nail care treatment',
            categoryId: 'cat2',
            price: 600,
            discountPrice: null,
            durationMinutes: 60,
            isActive: true,
            requiresDeposit: false,
            depositAmount: null,
            createdAt: '2024-01-20T00:00:00.000Z',
            updatedAt: '2024-01-20T00:00:00.000Z'
          }
        ],
        reviews: [],
        _count: { bookings: 35 }
      },
      {
        id: '5',
        name: 'QuickCuts Express',
        slug: 'quick-cuts-express',
        description: 'Fast and affordable hair services',
        logo: null,
        coverImage: null,
        ownerId: 'owner5',
        email: 'quick@quickcuts.com',
        phone: '+91 9876543214',
        address: '555 Residency Road, Bangalore',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560025',
        latitude: null,
        longitude: null,
        googleMapsUrl: null,
        gstNumber: null,
        panNumber: null,
        registrationNo: null,
        isActive: true,
        isVerified: true,
        acceptsOnlinePayment: true,
        instantBooking: true,
        openingTime: '07:00',
        closingTime: '23:00',
        workingDays: [1,2,3,4,5,6,7],
        lunchBreakStart: null,
        lunchBreakEnd: null,
        averageRating: 4.1,
        totalReviews: 89,
        createdAt: '2024-01-10T00:00:00.000Z',
        updatedAt: '2024-01-25T00:00:00.000Z',
        services: [
          {
            id: 's12',
            salonId: '5',
            name: 'Quick Haircut',
            description: 'Fast professional haircut',
            categoryId: 'cat1',
            price: 150,
            discountPrice: null,
            durationMinutes: 25,
            isActive: true,
            requiresDeposit: false,
            depositAmount: null,
            createdAt: '2024-01-10T00:00:00.000Z',
            updatedAt: '2024-01-10T00:00:00.000Z'
          },
          {
            id: 's13',
            salonId: '5',
            name: 'Trim Only',
            description: 'Quick trim and styling',
            categoryId: 'cat1',
            price: 100,
            discountPrice: null,
            durationMinutes: 15,
            isActive: true,
            requiresDeposit: false,
            depositAmount: null,
            createdAt: '2024-01-10T00:00:00.000Z',
            updatedAt: '2024-01-10T00:00:00.000Z'
          }
        ],
        reviews: [],
        _count: { bookings: 156 }
      }
    ];

    const response: ApiResponse = {
      success: true,
      data: {
        salons: mockSalons,
        pagination: {
          total: mockSalons.length,
          page: 1,
          limit: 20,
          totalPages: 1
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

    // Mock salon data
    const mockSalon = {
      id: '1',
      name: 'StyleMaster Salon',
      slug: 'stylemaster-salon',
      description: 'Premium hair and beauty services',
      logo: null,
      coverImage: null,
      ownerId: 'owner1',
      email: 'info@stylemaster.com',
      phone: '+91 9876543210',
      address: '123 MG Road, Bangalore',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001',
      latitude: null,
      longitude: null,
      googleMapsUrl: null,
      gstNumber: null,
      panNumber: null,
      registrationNo: null,
      isActive: true,
      isVerified: true,
      acceptsOnlinePayment: true,
      instantBooking: true,
      openingTime: '09:00',
      closingTime: '21:00',
      workingDays: [1,2,3,4,5,6],
      lunchBreakStart: null,
      lunchBreakEnd: null,
      averageRating: 4.5,
      totalReviews: 25,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-15'),
      services: [
        {
          id: 's1',
          name: 'Hair Cut',
          description: 'Professional hair cutting service',
          categoryId: 'cat1',
          price: 300,
          discountPrice: null,
          durationMinutes: 45,
          isActive: true,
          requiresDeposit: false,
          depositAmount: null,
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01')
        },
        {
          id: 's2',
          name: 'Beard Styling',
          description: 'Expert beard grooming',
          categoryId: 'cat1',
          price: 150,
          discountPrice: null,
          durationMinutes: 30,
          isActive: true,
          requiresDeposit: false,
          depositAmount: null,
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01')
        },
        {
          id: 's3',
          name: 'Hair Wash',
          description: 'Deep conditioning hair wash',
          categoryId: 'cat1',
          price: 200,
          discountPrice: null,
          durationMinutes: 20,
          isActive: true,
          requiresDeposit: false,
          depositAmount: null,
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01')
        }
      ],
      staff: [
        {
          id: 'staff1',
          userId: 'user1',
          user: {
            id: 'user1',
            firstName: 'Rajesh',
            lastName: 'Kumar',
            avatar: null
          },
          designation: 'Senior Stylist',
          experience: 5,
          specialization: ['Hair Cut', 'Beard Styling'],
          bio: 'Expert in modern hair styling',
          isAvailable: true,
          isActive: true,
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
          services: [
            { id: 's1', name: 'Hair Cut' },
            { id: 's2', name: 'Beard Styling' }
          ]
        }
      ],
      reviews: [
        {
          id: 'r1',
          userId: 'user2',
          user: {
            id: 'user2',
            firstName: 'Amit',
            lastName: 'Sharma',
            avatar: null
          },
          salonId: '1',
          bookingId: 'b1',
          booking: {
            service: { name: 'Hair Cut' }
          },
          rating: 5,
          comment: 'Excellent service! Highly recommended.',
          serviceRating: 5,
          ambienceRating: 4,
          cleanlinessRating: 5,
          staffRating: 5,
          valueRating: 4,
          isVerified: true,
          isVisible: true,
          response: null,
          respondedAt: null,
          createdAt: new Date('2024-01-10'),
          updatedAt: new Date('2024-01-10')
        }
      ],
      workingHours: [
        { id: 'wh1', salonId: '1', dayOfWeek: 1, openTime: '09:00', closeTime: '21:00', isOpen: true },
        { id: 'wh2', salonId: '1', dayOfWeek: 2, openTime: '09:00', closeTime: '21:00', isOpen: true },
        { id: 'wh3', salonId: '1', dayOfWeek: 3, openTime: '09:00', closeTime: '21:00', isOpen: true },
        { id: 'wh4', salonId: '1', dayOfWeek: 4, openTime: '09:00', closeTime: '21:00', isOpen: true },
        { id: 'wh5', salonId: '1', dayOfWeek: 5, openTime: '09:00', closeTime: '21:00', isOpen: true },
        { id: 'wh6', salonId: '1', dayOfWeek: 6, openTime: '09:00', closeTime: '21:00', isOpen: true }
      ],
      gallery: [],
      _count: { bookings: 15 }
    };

    if (!mockSalon || (id !== '1' && id !== 'stylemaster-salon')) {
      const response: ApiResponse = {
        success: false,
        error: "Salon not found"
      };
      return res.status(404).json(response);
    }

    const response: ApiResponse = {
      success: true,
      data: mockSalon
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