import { RequestHandler } from "express";
import { Booking, CreateBookingRequest, ApiResponse } from "@shared/api";

function generateBookingNumber(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `BML-${timestamp}-${random}`;
}

export const handleGetBookings: RequestHandler = async (req, res) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      const response: ApiResponse = {
        success: false,
        error: 'User not authenticated'
      };
      return res.status(401).json(response);
    }

    const { status, page = 1, limit = 10 } = req.query;
    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 10;
    const skip = (pageNum - 1) * limitNum;

    const where: any = { userId };
    if (status) {
      where.status = status;
    }

    const [bookings, total] = await Promise.all([
      req.prisma.booking.findMany({
        where,
        include: {
          salon: true,
          service: true,
          staff: { include: { user: true } }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum
      }),
      req.prisma.booking.count({ where })
    ]);

    const response: ApiResponse<Booking[]> = {
      success: true,
      data: bookings,
      meta: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum)
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Get bookings error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to fetch bookings'
    };
    res.status(500).json(response);
  }
};

export const handleCreateBooking: RequestHandler = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      const response: ApiResponse = {
        success: false,
        error: 'User not authenticated'
      };
      return res.status(401).json(response);
    }

    const bookingData: CreateBookingRequest = req.body;

    // Validate required fields
    if (!bookingData.salonId || !bookingData.serviceId || !bookingData.appointmentDate || !bookingData.appointmentTime || !bookingData.customerName || !bookingData.customerEmail || !bookingData.customerPhone) {
      const response: ApiResponse = {
        success: false,
        error: 'Missing required fields: salonId, serviceId, appointmentDate, appointmentTime, customerName, customerEmail, customerPhone'
      };
      return res.status(400).json(response);
    }

    // Fetch service details to get price and duration
    const service = await req.prisma.service.findUnique({
      where: { id: bookingData.serviceId },
      include: { salon: true }
    });

    if (!service) {
      const response: ApiResponse = {
        success: false,
        error: 'Service not found'
      };
      return res.status(404).json(response);
    }

    // Check if salon is active
    if (!service.salon.isActive) {
      const response: ApiResponse = {
        success: false,
        error: 'Salon is not active'
      };
      return res.status(400).json(response);
    }

    // Check if service is active
    if (!service.isActive) {
      const response: ApiResponse = {
        success: false,
        error: 'Service is not active'
      };
      return res.status(400).json(response);
    }

    // Calculate appointment details
    const appointmentDate = new Date(bookingData.appointmentDate);
    const [hours, minutes] = bookingData.appointmentTime.split(':').map(Number);
    const startDateTime = new Date(appointmentDate);
    startDateTime.setHours(hours, minutes, 0, 0);
    const endDateTime = new Date(startDateTime.getTime() + service.durationMinutes * 60000);
    const endTime = endDateTime.toTimeString().slice(0, 5);

    // Calculate pricing
    const servicePrice = service.price;
    const discount = service.discountPrice ? service.price - service.discountPrice : 0;
    const tax = servicePrice * 0.18; // 18% GST
    const totalAmount = servicePrice - discount + tax;

    // Create booking
    const booking = await req.prisma.booking.create({
      data: {
        bookingNumber: generateBookingNumber(),
        userId,
        salonId: bookingData.salonId,
        serviceId: bookingData.serviceId,
        staffId: bookingData.staffId || null,
        appointmentDate,
        appointmentTime: bookingData.appointmentTime,
        endTime,
        servicePrice,
        discount,
        tax,
        totalAmount,
        depositAmount: service.depositAmount || 0,
        status: 'PENDING',
        paymentStatus: 'PENDING',
        customerName: bookingData.customerName,
        customerPhone: bookingData.customerPhone,
        customerEmail: bookingData.customerEmail,
        notes: bookingData.notes || null
      }
    });

    const response: ApiResponse<Booking> = {
      success: true,
      data: booking,
      message: 'Booking created successfully'
    };

    // Broadcast real-time booking event
    const io = req.app.get('io');
    if (io) {
      // Emit to salon-specific room
      io.to(`salon_${bookingData.salonId}`).emit('booking:created', {
        booking,
        salonId: bookingData.salonId,
        customerId: userId
      });

      // Emit to user-specific room
      io.to(`user_${userId}`).emit('booking:created', {
        booking,
        salonId: bookingData.salonId
      });

      console.log(`📡 Broadcasted booking creation: ${booking.bookingNumber}`);
    }

    res.status(201).json(response);
  } catch (error) {
    console.error('Create booking error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to create booking'
    };
    res.status(500).json(response);
  }
};

export const handleUpdateBooking: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;
    const updateData = req.body;

    if (!userId) {
      const response: ApiResponse = {
        success: false,
        error: 'User not authenticated'
      };
      return res.status(401).json(response);
    }

    // Check if booking exists and belongs to user
    const booking = await req.prisma.booking.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!booking) {
      const response: ApiResponse = {
        success: false,
        error: 'Booking not found'
      };
      return res.status(404).json(response);
    }

    // Update booking
    const updatedBooking = await req.prisma.booking.update({
      where: { id },
      data: updateData
    });

    const response: ApiResponse<Booking> = {
      success: true,
      data: updatedBooking,
      message: 'Booking updated successfully'
    };

    res.json(response);
  } catch (error) {
    console.error('Update booking error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to update booking'
    };
    res.status(500).json(response);
  }
};

export const handleCancelBooking: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
      const response: ApiResponse = {
        success: false,
        error: 'User not authenticated'
      };
      return res.status(401).json(response);
    }

    // Check if booking exists and belongs to user
    const booking = await req.prisma.booking.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!booking) {
      const response: ApiResponse = {
        success: false,
        error: 'Booking not found'
      };
      return res.status(404).json(response);
    }

    // Check if booking can be cancelled
    if (booking.status === 'COMPLETED' || booking.status === 'CANCELLED' || booking.status === 'IN_PROGRESS') {
      const response: ApiResponse = {
        success: false,
        error: 'Cannot cancel booking in current status'
      };
      return res.status(400).json(response);
    }

    // Cancel booking
    const updatedBooking = await req.prisma.booking.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        cancellationReason: 'Cancelled by customer',
        cancelledBy: 'customer'
      }
    });

    const response: ApiResponse<Booking> = {
      success: true,
      data: updatedBooking,
      message: 'Booking cancelled successfully'
    };

    res.json(response);
  } catch (error) {
    console.error('Cancel booking error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to cancel booking'
    };
    res.status(500).json(response);
  }
};
