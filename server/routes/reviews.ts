import { RequestHandler } from "express";
import { Review, CreateReviewRequest, ApiResponse } from "@shared/api";

export const handleGetReviews: RequestHandler = async (req, res) => {
  try {
    // Mock reviews data
    const mockReviews = [
      {
        id: 'r1',
        bookingId: 'b1',
        userId: 'user1',
        salonId: '1',
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
        updatedAt: new Date('2024-01-10'),
        user: {
          id: 'user1',
          firstName: 'Amit',
          lastName: 'Sharma',
          avatar: null
        },
        salon: {
          id: '1',
          name: 'StyleMaster Salon'
        },
        booking: {
          service: {
            id: 's1',
            name: 'Hair Cut'
          }
        }
      },
      {
        id: 'r2',
        bookingId: 'b2',
        userId: 'user2',
        salonId: '1',
        rating: 4,
        comment: 'Good experience overall.',
        serviceRating: 4,
        ambienceRating: 4,
        cleanlinessRating: 4,
        staffRating: 4,
        valueRating: 4,
        isVerified: true,
        isVisible: true,
        response: null,
        respondedAt: null,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
        user: {
          id: 'user2',
          firstName: 'Priya',
          lastName: 'Patel',
          avatar: null
        },
        salon: {
          id: '1',
          name: 'StyleMaster Salon'
        },
        booking: {
          service: {
            id: 's2',
            name: 'Beard Styling'
          }
        }
      }
    ];

    const response: ApiResponse = {
      success: true,
      data: mockReviews
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    const response: ApiResponse = {
      success: false,
      error: "Failed to fetch reviews"
    };
    res.status(500).json(response);
  }
};

export const handleCreateReview: RequestHandler = async (req, res) => {
  try {
    // For demo purposes, just return success
    const response: ApiResponse = {
      success: true,
      data: {
        id: 'new-review-' + Date.now(),
        message: 'Review submitted successfully'
      },
      message: "Review created successfully"
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating review:', error);
    const response: ApiResponse = {
      success: false,
      error: "Failed to create review"
    };
    res.status(500).json(response);
  }
};

export const handleGetReviewStats: RequestHandler = async (req, res) => {
  try {
    // Mock review stats
    const response: ApiResponse = {
      success: true,
      data: {
        averageRating: 4.5,
        totalReviews: 25,
        ratingDistribution: { 5: 15, 4: 7, 3: 2, 2: 1, 1: 0 }
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching review statistics:', error);
    const response: ApiResponse = {
      success: false,
      error: "Failed to fetch review statistics"
    };
    res.status(500).json(response);
  }
};
