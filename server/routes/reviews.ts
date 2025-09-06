import { RequestHandler } from "express";
import { Review, ReviewRequest, ApiResponse } from "@shared/api";

// Mock data for demonstration - in production, this would come from a database
const mockReviews: Review[] = [
  {
    review_id: 1,
    customer_id: 1,
    customer_name: "John Doe",
    shop_id: 1,
    salon_name: "Style Studio",
    service_id: 1,
    service_name: "Haircut & Styling",
    rating: 5,
    comment: "Excellent service! The stylist was very professional and the haircut was exactly what I wanted. The salon is clean and modern.",
    review_date: "2024-01-20",
    is_verified: true
  },
  {
    review_id: 2,
    customer_id: 2,
    customer_name: "Jane Smith",
    shop_id: 1,
    salon_name: "Style Studio",
    service_id: 2,
    service_name: "Beard Trim",
    rating: 4,
    comment: "Good service overall. The beard trim was precise and the staff was friendly. Would recommend to others.",
    review_date: "2024-01-18",
    is_verified: true
  },
  {
    review_id: 3,
    customer_id: 3,
    customer_name: "Mike Johnson",
    shop_id: 2,
    salon_name: "Beauty Lounge",
    service_id: 4,
    service_name: "Facial Treatment",
    rating: 5,
    comment: "Amazing facial treatment! My skin feels so refreshed and the therapist was very knowledgeable. Will definitely come back.",
    review_date: "2024-01-15",
    is_verified: true
  },
  {
    review_id: 4,
    customer_id: 4,
    customer_name: "Sarah Wilson",
    shop_id: 3,
    salon_name: "Hair & Beyond",
    service_id: 7,
    service_name: "Premium Haircut",
    rating: 3,
    comment: "The haircut was okay, but it took longer than expected. The stylist was nice but seemed inexperienced.",
    review_date: "2024-01-12",
    is_verified: false
  },
  {
    review_id: 5,
    customer_id: 5,
    customer_name: "David Brown",
    shop_id: 2,
    salon_name: "Beauty Lounge",
    service_id: 5,
    service_name: "Manicure & Pedicure",
    rating: 5,
    comment: "Perfect manicure and pedicure! The nail technician was very skilled and the salon environment was relaxing.",
    review_date: "2024-01-10",
    is_verified: true
  }
];

export const handleGetReviews: RequestHandler = (req, res) => {
  try {
    const { shop_id, customer_id, rating, verified } = req.query;
    
    let filteredReviews = mockReviews;
    
    if (shop_id) {
      filteredReviews = filteredReviews.filter(review => 
        review.shop_id === parseInt(shop_id as string)
      );
    }
    
    if (customer_id) {
      filteredReviews = filteredReviews.filter(review => 
        review.customer_id === parseInt(customer_id as string)
      );
    }
    
    if (rating) {
      filteredReviews = filteredReviews.filter(review => 
        review.rating === parseInt(rating as string)
      );
    }
    
    if (verified !== undefined) {
      const isVerified = verified === 'true';
      filteredReviews = filteredReviews.filter(review => 
        review.is_verified === isVerified
      );
    }
    
    // Sort by date (newest first)
    filteredReviews.sort((a, b) => 
      new Date(b.review_date).getTime() - new Date(a.review_date).getTime()
    );
    
    const response: ApiResponse<Review[]> = {
      success: true,
      data: filteredReviews
    };
    
    res.json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: "Failed to fetch reviews"
    };
    res.status(500).json(response);
  }
};

export const handleCreateReview: RequestHandler = (req, res) => {
  try {
    const reviewData: ReviewRequest = req.body;
    
    // Validate required fields
    if (!reviewData.booking_id || !reviewData.rating || !reviewData.comment) {
      const response: ApiResponse = {
        success: false,
        error: "Missing required fields"
      };
      return res.status(400).json(response);
    }
    
    // Validate rating
    if (reviewData.rating < 1 || reviewData.rating > 5) {
      const response: ApiResponse = {
        success: false,
        error: "Rating must be between 1 and 5"
      };
      return res.status(400).json(response);
    }
    
    // Mock booking data (in production, this would be fetched from the database)
    const mockBooking = {
      booking_id: reviewData.booking_id,
      customer_id: Math.floor(Math.random() * 1000) + 1,
      customer_name: "Mock Customer",
      shop_id: Math.floor(Math.random() * 3) + 1,
      salon_name: "Mock Salon",
      service_id: Math.floor(Math.random() * 10) + 1,
      service_name: "Mock Service"
    };
    
    // Create new review
    const newReview: Review = {
      review_id: mockReviews.length + 1,
      customer_id: mockBooking.customer_id,
      customer_name: mockBooking.customer_name,
      shop_id: mockBooking.shop_id,
      salon_name: mockBooking.salon_name,
      service_id: mockBooking.service_id,
      service_name: mockBooking.service_name,
      rating: reviewData.rating,
      comment: reviewData.comment,
      review_date: new Date().toISOString().split('T')[0],
      is_verified: true // Mock as verified
    };
    
    mockReviews.push(newReview);
    
    const response: ApiResponse<Review> = {
      success: true,
      data: newReview,
      message: "Review created successfully"
    };
    
    res.status(201).json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: "Failed to create review"
    };
    res.status(500).json(response);
  }
};

export const handleGetReviewStats: RequestHandler = (req, res) => {
  try {
    const { shop_id } = req.query;
    
    let reviews = mockReviews;
    
    if (shop_id) {
      reviews = reviews.filter(review => 
        review.shop_id === parseInt(shop_id as string)
      );
    }
    
    if (reviews.length === 0) {
      const response: ApiResponse = {
        success: true,
        data: {
          average_rating: 0,
          total_reviews: 0,
          rating_distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
        }
      };
      return res.json(response);
    }
    
    // Calculate average rating
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    
    // Calculate rating distribution
    const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      ratingDistribution[review.rating as keyof typeof ratingDistribution]++;
    });
    
    const response: ApiResponse = {
      success: true,
      data: {
        average_rating: Math.round(averageRating * 10) / 10,
        total_reviews: reviews.length,
        rating_distribution: ratingDistribution
      }
    };
    
    res.json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: "Failed to fetch review statistics"
    };
    res.status(500).json(response);
  }
};
