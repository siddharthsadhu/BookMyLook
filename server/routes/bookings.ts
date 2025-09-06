import { RequestHandler } from "express";
import { Booking, BookingRequest, ApiResponse } from "@shared/api";

// Mock data for demonstration - in production, this would come from a database
const mockBookings: Booking[] = [
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

export const handleGetBookings: RequestHandler = (req, res) => {
  try {
    const { customer_id, shop_id, status } = req.query;
    
    let filteredBookings = mockBookings;
    
    if (customer_id) {
      filteredBookings = filteredBookings.filter(booking => 
        booking.customer_id === parseInt(customer_id as string)
      );
    }
    
    if (shop_id) {
      filteredBookings = filteredBookings.filter(booking => 
        booking.shop_id === parseInt(shop_id as string)
      );
    }
    
    if (status) {
      filteredBookings = filteredBookings.filter(booking => 
        booking.status === status
      );
    }
    
    const response: ApiResponse<Booking[]> = {
      success: true,
      data: filteredBookings
    };
    
    res.json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: "Failed to fetch bookings"
    };
    res.status(500).json(response);
  }
};

export const handleCreateBooking: RequestHandler = (req, res) => {
  try {
    const bookingData: BookingRequest = req.body;
    
    // Validate required fields
    if (!bookingData.customer_name || !bookingData.customer_email || 
        !bookingData.customer_phone || !bookingData.shop_id || 
        !bookingData.service_id || !bookingData.appointment_date || 
        !bookingData.appointment_time) {
      const response: ApiResponse = {
        success: false,
        error: "Missing required fields"
      };
      return res.status(400).json(response);
    }
    
    // Create new booking
    const newBooking: Booking = {
      booking_id: mockBookings.length + 1,
      customer_id: Math.floor(Math.random() * 1000) + 1, // Mock customer ID
      ...bookingData,
      salon_name: "Mock Salon", // Would be fetched from shop data
      service_name: "Mock Service", // Would be fetched from service data
      status: "upcoming",
      queue_position: Math.floor(Math.random() * 5) + 1,
      estimated_wait: Math.floor(Math.random() * 30) + 5,
      price: Math.floor(Math.random() * 2000) + 500,
      salon_address: "Mock Address",
      salon_phone: "+91 98765 43210",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    mockBookings.push(newBooking);
    
    const response: ApiResponse<Booking> = {
      success: true,
      data: newBooking,
      message: "Booking created successfully"
    };
    
    res.status(201).json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: "Failed to create booking"
    };
    res.status(500).json(response);
  }
};

export const handleUpdateBooking: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const bookingIndex = mockBookings.findIndex(booking => booking.booking_id === parseInt(id));
    
    if (bookingIndex === -1) {
      const response: ApiResponse = {
        success: false,
        error: "Booking not found"
      };
      return res.status(404).json(response);
    }
    
    // Update booking
    mockBookings[bookingIndex] = {
      ...mockBookings[bookingIndex],
      ...updateData,
      updated_at: new Date().toISOString()
    };
    
    const response: ApiResponse<Booking> = {
      success: true,
      data: mockBookings[bookingIndex],
      message: "Booking updated successfully"
    };
    
    res.json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: "Failed to update booking"
    };
    res.status(500).json(response);
  }
};

export const handleCancelBooking: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    
    const bookingIndex = mockBookings.findIndex(booking => booking.booking_id === parseInt(id));
    
    if (bookingIndex === -1) {
      const response: ApiResponse = {
        success: false,
        error: "Booking not found"
      };
      return res.status(404).json(response);
    }
    
    // Cancel booking
    mockBookings[bookingIndex].status = "cancelled";
    mockBookings[bookingIndex].updated_at = new Date().toISOString();
    
    const response: ApiResponse<Booking> = {
      success: true,
      data: mockBookings[bookingIndex],
      message: "Booking cancelled successfully"
    };
    
    res.json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: "Failed to cancel booking"
    };
    res.status(500).json(response);
  }
};
