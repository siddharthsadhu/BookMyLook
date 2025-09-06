import path from "path";
import "dotenv/config";
import * as express from "express";
import express__default from "express";
import cors from "cors";
const handleDemo = (req, res) => {
  const response = {
    message: "Hello from Express server"
  };
  res.status(200).json(response);
};
const mockSalons = [
  {
    shop_id: 1,
    shop_name: "Style Studio",
    address: "123 Main Street",
    city: "Mumbai",
    phone_number: "+91 98765 43210",
    email: "info@stylestudio.com",
    description: "Premium hair salon with experienced stylists and modern equipment.",
    opening_time: "09:00",
    closing_time: "21:00"
  },
  {
    shop_id: 2,
    shop_name: "Beauty Lounge",
    address: "456 Park Avenue",
    city: "Delhi",
    phone_number: "+91 98765 43211",
    email: "contact@beautylounge.com",
    description: "Full-service beauty salon offering hair, skin, and nail treatments.",
    opening_time: "10:00",
    closing_time: "20:00"
  },
  {
    shop_id: 3,
    shop_name: "Hair & Beyond",
    address: "789 Commercial Street",
    city: "Bangalore",
    phone_number: "+91 98765 43212",
    email: "hello@hairandbeyond.com",
    description: "Trendy salon specializing in modern haircuts and styling.",
    opening_time: "08:00",
    closing_time: "22:00"
  }
];
const handleShops = (req, res) => {
  try {
    res.json({
      success: true,
      data: mockSalons
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch shops"
    });
  }
};
const mockServices = {
  1: [
    // Style Studio
    {
      service_id: 1,
      service_name: "Haircut & Styling",
      description: "Professional haircut with modern styling",
      duration_minutes: 45,
      price: 800
    },
    {
      service_id: 2,
      service_name: "Beard Trim",
      description: "Precision beard trimming and shaping",
      duration_minutes: 30,
      price: 400
    },
    {
      service_id: 3,
      service_name: "Hair Color",
      description: "Professional hair coloring service",
      duration_minutes: 120,
      price: 2500
    }
  ],
  2: [
    // Beauty Lounge
    {
      service_id: 4,
      service_name: "Facial Treatment",
      description: "Deep cleansing facial with massage",
      duration_minutes: 60,
      price: 1200
    },
    {
      service_id: 5,
      service_name: "Manicure & Pedicure",
      description: "Complete nail care and polish",
      duration_minutes: 90,
      price: 1500
    },
    {
      service_id: 6,
      service_name: "Hair Spa",
      description: "Relaxing hair spa treatment",
      duration_minutes: 75,
      price: 1800
    }
  ],
  3: [
    // Hair & Beyond
    {
      service_id: 7,
      service_name: "Premium Haircut",
      description: "Expert haircut with consultation",
      duration_minutes: 60,
      price: 1e3
    },
    {
      service_id: 8,
      service_name: "Hair Styling",
      description: "Special occasion hair styling",
      duration_minutes: 45,
      price: 800
    },
    {
      service_id: 9,
      service_name: "Keratin Treatment",
      description: "Smoothing keratin treatment",
      duration_minutes: 180,
      price: 5e3
    }
  ]
};
const handleServices = (req, res) => {
  try {
    const shopId = req.query.shop_id;
    if (!shopId) {
      return res.status(400).json({
        success: false,
        error: "Shop ID is required"
      });
    }
    const shopIdNum = parseInt(shopId);
    const services = mockServices[shopIdNum] || [];
    res.json({
      success: true,
      data: services
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch services"
    });
  }
};
const mockShops = {
  1: "Style Studio",
  2: "Beauty Lounge",
  3: "Hair & Beyond"
};
const mockServiceDurations = {
  1: 45,
  2: 30,
  3: 120,
  4: 60,
  5: 90,
  6: 75,
  7: 60,
  8: 45,
  9: 180
};
const handleEstimate = (req, res) => {
  try {
    const { shop_id, service_id, queue_length, service_time } = req.body;
    if (!shop_id || !service_id) {
      return res.status(400).json({
        success: false,
        error: "Shop ID and Service ID are required"
      });
    }
    const currentQueueLength = queue_length || Math.floor(Math.random() * 10) + 1;
    const serviceDuration = service_time || mockServiceDurations[service_id] || 30;
    const estimatedWait = currentQueueLength * serviceDuration;
    const isLongWait = estimatedWait > 30;
    const waitStatus = isLongWait ? "Long Wait" : "Short Wait";
    const recommendation = estimatedWait > 45 ? "Extra Counter Recommended" : "Current Counters Sufficient";
    const response = {
      shop_name: mockShops[shop_id] || "Unknown Shop",
      queue_length: currentQueueLength,
      service_duration: serviceDuration,
      estimated_wait_time: estimatedWait,
      estimated_wait_minutes: estimatedWait,
      wait_status: waitStatus,
      recommendation,
      is_long_wait: isLongWait
    };
    res.json({
      success: true,
      data: response
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to get estimate"
    });
  }
};
const mockBookings = [
  {
    booking_id: 1,
    customer_id: 1,
    customer_name: "John Doe",
    customer_email: "john.doe@example.com",
    customer_phone: "+91 98765 43210",
    shop_id: 1,
    salon_name: "Style Studio",
    service_id: 1,
    service_name: "Haircut & Styling",
    appointment_date: "2024-01-25",
    appointment_time: "14:30",
    status: "upcoming",
    queue_position: 2,
    estimated_wait: 15,
    price: 800,
    salon_address: "123 Main Street, Mumbai",
    salon_phone: "+91 98765 43210",
    special_requests: "Please trim the sides shorter",
    created_at: "2024-01-20T10:00:00Z",
    updated_at: "2024-01-20T10:00:00Z"
  },
  {
    booking_id: 2,
    customer_id: 2,
    customer_name: "Jane Smith",
    customer_email: "jane.smith@example.com",
    customer_phone: "+91 98765 43211",
    shop_id: 2,
    salon_name: "Beauty Lounge",
    service_id: 4,
    service_name: "Facial Treatment",
    appointment_date: "2024-01-23",
    appointment_time: "10:00",
    status: "completed",
    price: 1200,
    salon_address: "456 Park Avenue, Delhi",
    salon_phone: "+91 98765 43211",
    created_at: "2024-01-18T09:00:00Z",
    updated_at: "2024-01-23T11:00:00Z"
  }
];
const handleGetBookings = (req, res) => {
  try {
    const { customer_id, shop_id, status } = req.query;
    let filteredBookings = mockBookings;
    if (customer_id) {
      filteredBookings = filteredBookings.filter(
        (booking) => booking.customer_id === parseInt(customer_id)
      );
    }
    if (shop_id) {
      filteredBookings = filteredBookings.filter(
        (booking) => booking.shop_id === parseInt(shop_id)
      );
    }
    if (status) {
      filteredBookings = filteredBookings.filter(
        (booking) => booking.status === status
      );
    }
    const response = {
      success: true,
      data: filteredBookings
    };
    res.json(response);
  } catch (error) {
    const response = {
      success: false,
      error: "Failed to fetch bookings"
    };
    res.status(500).json(response);
  }
};
const handleCreateBooking = (req, res) => {
  try {
    const bookingData = req.body;
    if (!bookingData.customer_name || !bookingData.customer_email || !bookingData.customer_phone || !bookingData.shop_id || !bookingData.service_id || !bookingData.appointment_date || !bookingData.appointment_time) {
      const response2 = {
        success: false,
        error: "Missing required fields"
      };
      return res.status(400).json(response2);
    }
    const newBooking = {
      booking_id: mockBookings.length + 1,
      customer_id: Math.floor(Math.random() * 1e3) + 1,
      // Mock customer ID
      ...bookingData,
      salon_name: "Mock Salon",
      // Would be fetched from shop data
      service_name: "Mock Service",
      // Would be fetched from service data
      status: "upcoming",
      queue_position: Math.floor(Math.random() * 5) + 1,
      estimated_wait: Math.floor(Math.random() * 30) + 5,
      price: Math.floor(Math.random() * 2e3) + 500,
      salon_address: "Mock Address",
      salon_phone: "+91 98765 43210",
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    };
    mockBookings.push(newBooking);
    const response = {
      success: true,
      data: newBooking,
      message: "Booking created successfully"
    };
    res.status(201).json(response);
  } catch (error) {
    const response = {
      success: false,
      error: "Failed to create booking"
    };
    res.status(500).json(response);
  }
};
const handleUpdateBooking = (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const bookingIndex = mockBookings.findIndex((booking) => booking.booking_id === parseInt(id));
    if (bookingIndex === -1) {
      const response2 = {
        success: false,
        error: "Booking not found"
      };
      return res.status(404).json(response2);
    }
    mockBookings[bookingIndex] = {
      ...mockBookings[bookingIndex],
      ...updateData,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    };
    const response = {
      success: true,
      data: mockBookings[bookingIndex],
      message: "Booking updated successfully"
    };
    res.json(response);
  } catch (error) {
    const response = {
      success: false,
      error: "Failed to update booking"
    };
    res.status(500).json(response);
  }
};
const handleCancelBooking = (req, res) => {
  try {
    const { id } = req.params;
    const bookingIndex = mockBookings.findIndex((booking) => booking.booking_id === parseInt(id));
    if (bookingIndex === -1) {
      const response2 = {
        success: false,
        error: "Booking not found"
      };
      return res.status(404).json(response2);
    }
    mockBookings[bookingIndex].status = "cancelled";
    mockBookings[bookingIndex].updated_at = (/* @__PURE__ */ new Date()).toISOString();
    const response = {
      success: true,
      data: mockBookings[bookingIndex],
      message: "Booking cancelled successfully"
    };
    res.json(response);
  } catch (error) {
    const response = {
      success: false,
      error: "Failed to cancel booking"
    };
    res.status(500).json(response);
  }
};
const mockReviews = [
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
const handleGetReviews = (req, res) => {
  try {
    const { shop_id, customer_id, rating, verified } = req.query;
    let filteredReviews = mockReviews;
    if (shop_id) {
      filteredReviews = filteredReviews.filter(
        (review) => review.shop_id === parseInt(shop_id)
      );
    }
    if (customer_id) {
      filteredReviews = filteredReviews.filter(
        (review) => review.customer_id === parseInt(customer_id)
      );
    }
    if (rating) {
      filteredReviews = filteredReviews.filter(
        (review) => review.rating === parseInt(rating)
      );
    }
    if (verified !== void 0) {
      const isVerified = verified === "true";
      filteredReviews = filteredReviews.filter(
        (review) => review.is_verified === isVerified
      );
    }
    filteredReviews.sort(
      (a, b) => new Date(b.review_date).getTime() - new Date(a.review_date).getTime()
    );
    const response = {
      success: true,
      data: filteredReviews
    };
    res.json(response);
  } catch (error) {
    const response = {
      success: false,
      error: "Failed to fetch reviews"
    };
    res.status(500).json(response);
  }
};
const handleCreateReview = (req, res) => {
  try {
    const reviewData = req.body;
    if (!reviewData.booking_id || !reviewData.rating || !reviewData.comment) {
      const response2 = {
        success: false,
        error: "Missing required fields"
      };
      return res.status(400).json(response2);
    }
    if (reviewData.rating < 1 || reviewData.rating > 5) {
      const response2 = {
        success: false,
        error: "Rating must be between 1 and 5"
      };
      return res.status(400).json(response2);
    }
    const mockBooking = {
      booking_id: reviewData.booking_id,
      customer_id: Math.floor(Math.random() * 1e3) + 1,
      customer_name: "Mock Customer",
      shop_id: Math.floor(Math.random() * 3) + 1,
      salon_name: "Mock Salon",
      service_id: Math.floor(Math.random() * 10) + 1,
      service_name: "Mock Service"
    };
    const newReview = {
      review_id: mockReviews.length + 1,
      customer_id: mockBooking.customer_id,
      customer_name: mockBooking.customer_name,
      shop_id: mockBooking.shop_id,
      salon_name: mockBooking.salon_name,
      service_id: mockBooking.service_id,
      service_name: mockBooking.service_name,
      rating: reviewData.rating,
      comment: reviewData.comment,
      review_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      is_verified: true
      // Mock as verified
    };
    mockReviews.push(newReview);
    const response = {
      success: true,
      data: newReview,
      message: "Review created successfully"
    };
    res.status(201).json(response);
  } catch (error) {
    const response = {
      success: false,
      error: "Failed to create review"
    };
    res.status(500).json(response);
  }
};
const handleGetReviewStats = (req, res) => {
  try {
    const { shop_id } = req.query;
    let reviews = mockReviews;
    if (shop_id) {
      reviews = reviews.filter(
        (review) => review.shop_id === parseInt(shop_id)
      );
    }
    if (reviews.length === 0) {
      const response2 = {
        success: true,
        data: {
          average_rating: 0,
          total_reviews: 0,
          rating_distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
        }
      };
      return res.json(response2);
    }
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      ratingDistribution[review.rating]++;
    });
    const response = {
      success: true,
      data: {
        average_rating: Math.round(averageRating * 10) / 10,
        total_reviews: reviews.length,
        rating_distribution: ratingDistribution
      }
    };
    res.json(response);
  } catch (error) {
    const response = {
      success: false,
      error: "Failed to fetch review statistics"
    };
    res.status(500).json(response);
  }
};
const mockContactSubmissions = [];
const handleContactSubmission = (req, res) => {
  try {
    const contactData = req.body;
    if (!contactData.name || !contactData.email || !contactData.subject || !contactData.message) {
      const response2 = {
        success: false,
        error: "Missing required fields"
      };
      return res.status(400).json(response2);
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactData.email)) {
      const response2 = {
        success: false,
        error: "Invalid email format"
      };
      return res.status(400).json(response2);
    }
    const submissionWithTimestamp = {
      ...contactData,
      submitted_at: (/* @__PURE__ */ new Date()).toISOString(),
      id: mockContactSubmissions.length + 1
    };
    mockContactSubmissions.push(submissionWithTimestamp);
    const response = {
      success: true,
      message: "Your message has been sent successfully. We'll get back to you within 24 hours."
    };
    res.status(201).json(response);
  } catch (error) {
    const response = {
      success: false,
      error: "Failed to submit contact form"
    };
    res.status(500).json(response);
  }
};
const handleGetContactSubmissions = (req, res) => {
  try {
    const { inquiry_type, limit = 50, offset = 0 } = req.query;
    let filteredSubmissions = mockContactSubmissions;
    if (inquiry_type) {
      filteredSubmissions = filteredSubmissions.filter(
        (submission) => submission.inquiry_type === inquiry_type
      );
    }
    const startIndex = parseInt(offset);
    const endIndex = startIndex + parseInt(limit);
    const paginatedSubmissions = filteredSubmissions.slice(startIndex, endIndex);
    const response = {
      success: true,
      data: paginatedSubmissions,
      message: `Retrieved ${paginatedSubmissions.length} contact submissions`
    };
    res.json(response);
  } catch (error) {
    const response = {
      success: false,
      error: "Failed to fetch contact submissions"
    };
    res.status(500).json(response);
  }
};
const handleGetContactStats = (req, res) => {
  try {
    const totalSubmissions = mockContactSubmissions.length;
    const inquiryTypeStats = mockContactSubmissions.reduce((acc, submission) => {
      acc[submission.inquiry_type] = (acc[submission.inquiry_type] || 0) + 1;
      return acc;
    }, {});
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = /* @__PURE__ */ new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split("T")[0];
    });
    const dailyStats = last7Days.map((date) => {
      const count = mockContactSubmissions.filter(
        (submission) => submission.submitted_at?.startsWith(date)
      ).length;
      return { date, count };
    }).reverse();
    const response = {
      success: true,
      data: {
        total_submissions: totalSubmissions,
        inquiry_type_stats: inquiryTypeStats,
        daily_stats: dailyStats,
        average_response_time: "2.5 hours"
        // Mock data
      }
    };
    res.json(response);
  } catch (error) {
    const response = {
      success: false,
      error: "Failed to fetch contact statistics"
    };
    res.status(500).json(response);
  }
};
function createServer() {
  const app2 = express__default();
  app2.use(cors());
  app2.use(express__default.json());
  app2.use(express__default.urlencoded({ extended: true }));
  app2.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });
  app2.get("/api/demo", handleDemo);
  app2.get("/api/shops", handleShops);
  app2.get("/api/services", handleServices);
  app2.post("/api/estimate", handleEstimate);
  app2.get("/api/bookings", handleGetBookings);
  app2.post("/api/bookings", handleCreateBooking);
  app2.put("/api/bookings/:id", handleUpdateBooking);
  app2.delete("/api/bookings/:id", handleCancelBooking);
  app2.get("/api/reviews", handleGetReviews);
  app2.post("/api/reviews", handleCreateReview);
  app2.get("/api/reviews/stats", handleGetReviewStats);
  app2.post("/api/contact", handleContactSubmission);
  app2.get("/api/contact/submissions", handleGetContactSubmissions);
  app2.get("/api/contact/stats", handleGetContactStats);
  return app2;
}
const app = createServer();
const port = process.env.PORT || 3e3;
const __dirname = import.meta.dirname;
const distPath = path.join(__dirname, "../spa");
app.use(express.static(distPath));
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }
  res.sendFile(path.join(distPath, "index.html"));
});
app.listen(port, () => {
  console.log(`🚀 Fusion Starter server running on port ${port}`);
  console.log(`📱 Frontend: http://localhost:${port}`);
  console.log(`🔧 API: http://localhost:${port}/api`);
});
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully");
  process.exit(0);
});
process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully");
  process.exit(0);
});
//# sourceMappingURL=node-build.mjs.map
