import { RequestHandler } from "express";
import { ApiResponse, Booking, CreateBookingRequest, BookingStatus } from "@shared/api";

// Helper function to generate booking number
function generateBookingNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `BML-${timestamp}-${random}`;
}

// Helper function to calculate end time
function calculateEndTime(startTime: string, durationMinutes: number): string {
  const [hours, minutes] = startTime.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes + durationMinutes;
  const endHours = Math.floor(totalMinutes / 60);
  const endMinutes = totalMinutes % 60;
  return `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
}

// Helper function to check if slot is available
async function isSlotAvailable(
  prisma: any,
  salonId: string,
  appointmentDate: Date,
  appointmentTime: string,
  endTime: string
): Promise<boolean> {
  const where: any = {
    salonId,
    appointmentDate,
    status: {
      notIn: ['CANCELLED', 'NO_SHOW']
    },
    OR: [
      // Check if new appointment overlaps with existing ones
      {
        AND: [
          { appointmentTime: { lte: appointmentTime } },
          { endTime: { gt: appointmentTime } }
        ]
      },
      {
        AND: [
          { appointmentTime: { lt: endTime } },
          { endTime: { gte: endTime } }
        ]
      },
      {
        AND: [
          { appointmentTime: { gte: appointmentTime } },
          { endTime: { lte: endTime } }
        ]
      }
    ]
  };

  const conflictingBookings = await prisma.booking.count({ where });
  return conflictingBookings === 0;
}

// Get user's bookings
export const handleGetBookings: RequestHandler = async (req, res) => {
  try {
    const { status, page = '1', limit = '10' } = req.query;
    const userId = req.user?.userId;

    if (!userId) {
      const response: ApiResponse = {
        success: false,
        error: "User not authenticated"
      };
      return res.status(401).json(response);
    }

    const where: any = { userId };
    
    if (status && typeof status === 'string') {
      where.status = status.toUpperCase() as BookingStatus;
    }

    // Pagination
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    const [bookings, totalCount] = await Promise.all([
      req.prisma.booking.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' },
        include: {
          salon: {
            select: {
              id: true,
              name: true,
              address: true,
              city: true,
              phone: true,
              averageRating: true
            }
          },
          service: {
            select: {
              id: true,
              name: true,
              price: true,
              durationMinutes: true
            }
          },
          review: true,
          payment: true
        }
      }),
      req.prisma.booking.count({ where })
    ]);
    
    const response: ApiResponse<Booking[]> = {
      success: true,
      data: bookings as any,
      meta: {
        page: pageNum,
        limit: limitNum,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limitNum)
      }
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    const response: ApiResponse = {
      success: false,
      error: "Failed to fetch bookings"
    };
    res.status(500).json(response);
  }
};

// Create a new booking
export const handleCreateBooking: RequestHandler = async (req, res) => {
  try {
    const bookingData: CreateBookingRequest = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      const response: ApiResponse = {
        success: false,
        error: "User not authenticated"
      };
      return res.status(401).json(response);
    }
    
    // Validate required fields
    const requiredFields = ['salonId', 'serviceId', 'appointmentDate', 'appointmentTime', 'customerName', 'customerPhone', 'customerEmail'];
    for (const field of requiredFields) {
      if (!bookingData[field as keyof CreateBookingRequest]) {
        const response: ApiResponse = {
          success: false,
          error: `Missing required field: ${field}`
        };
        return res.status(400).json(response);
      }
    }

    // Fetch service details to get duration and price
    const service = await req.prisma.service.findUnique({
      where: { id: bookingData.serviceId },
      include: { salon: true }
    });

    if (!service || service.salonId !== bookingData.salonId) {
      const response: ApiResponse = {
        success: false,
        error: "Invalid service or salon"
      };
      return res.status(400).json(response);
    }

    // Calculate end time
    const endTime = calculateEndTime(bookingData.appointmentTime, service.durationMinutes);

    // Parse appointment date
    const appointmentDate = new Date(bookingData.appointmentDate);
    appointmentDate.setHours(0, 0, 0, 0);

    // Check slot availability
    const slotAvailable = await isSlotAvailable(
      req.prisma,
      bookingData.salonId,
      appointmentDate,
      bookingData.appointmentTime,
      endTime
    );

    if (!slotAvailable) {
      const response: ApiResponse = {
        success: false,
        error: "This time slot is not available"
      };
      return res.status(400).json(response);
    }

    // Calculate pricing
    const servicePrice = service.discountPrice || service.price;
    const tax = servicePrice * 0.18; // 18% GST
    const totalAmount = servicePrice + tax;

    // Create booking
    const booking = await req.prisma.booking.create({
      data: {
        bookingNumber: generateBookingNumber(),
        userId,
        salonId: bookingData.salonId,
        serviceId: bookingData.serviceId,
        appointmentDate,
        appointmentTime: bookingData.appointmentTime,
        endTime,
        servicePrice,
        discount: service.discountPrice ? service.price - service.discountPrice : 0,
        tax,
        totalAmount,
        depositAmount: service.depositAmount || 0,
        status: 'PENDING',
        paymentStatus: 'PENDING',
        customerName: bookingData.customerName,
        customerPhone: bookingData.customerPhone,
        customerEmail: bookingData.customerEmail,
        notes: bookingData.notes || null
      },
      include: {
        salon: true,
        service: true
      }
    });

    // TODO: Send confirmation email/SMS
    // TODO: Add to queue if applicable

    // Emit real-time booking events
    const io = req.app.get('io');
    if (io) {
      // Emit to salon-specific room
      io.to(`salon_${bookingData.salonId}`).emit('booking:created', {
        booking: booking,
        salonId: bookingData.salonId,
        customerId: userId
      });

      // Emit to salon owners
      io.to('salon_owners').emit('booking:created', {
        booking: booking,
        salonId: bookingData.salonId,
        customerId: userId
      });

      // Emit to customer
      io.to(`user_${userId}`).emit('booking:created', {
        booking: booking,
        salonId: bookingData.salonId
      });
    }

    const response: ApiResponse<Booking> = {
      success: true,
      data: booking as any,
      message: "Booking created successfully"
    };
    
    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating booking:', error);
    const response: ApiResponse = {
      success: false,
      error: "Failed to create booking"
    };
    res.status(500).json(response);
  }
};

// Update booking status
export const handleUpdateBooking: RequestHandler = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const userId = req.user?.userId;
    const { status } = req.body;

    if (!userId) {
      const response: ApiResponse = {
        success: false,
        error: "User not authenticated"
      };
      return res.status(401).json(response);
    }

    // Find booking and verify ownership
    const booking = await req.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { salon: true }
    });

    if (!booking) {
      const response: ApiResponse = {
        success: false,
        error: "Booking not found"
      };
      return res.status(404).json(response);
    }

    // Check if user owns the booking or is the salon owner
    const isSalonOwner = await req.prisma.salon.findFirst({
      where: {
        id: booking.salonId,
        ownerId: userId
      }
    });

    if (booking.userId !== userId && !isSalonOwner) {
      const response: ApiResponse = {
        success: false,
        error: "You don't have permission to update this booking"
      };
      return res.status(403).json(response);
    }

    // Update booking
    const updatedBooking = await req.prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: status.toUpperCase() as BookingStatus,
        ...(status === 'IN_PROGRESS' && { serviceStartTime: new Date() }),
        ...(status === 'COMPLETED' && { serviceEndTime: new Date() })
      },
      include: {
        salon: true,
        service: true
      }
    });

    const response: ApiResponse<Booking> = {
      success: true,
      data: updatedBooking as any,
      message: "Booking updated successfully"
    };

    // Emit real-time booking events
    const io = req.app.get('io');
    if (io) {
      // Emit to salon-specific room
      io.to(`salon_${booking.salonId}`).emit('booking:updated', {
        booking: updatedBooking,
        bookingId: bookingId,
        salonId: booking.salonId,
        status: status,
        updatedBy: userId
      });

      // Emit to salon owners
      io.to('salon_owners').emit('booking:updated', {
        booking: updatedBooking,
        bookingId: bookingId,
        salonId: booking.salonId,
        status: status,
        updatedBy: userId
      });

      // Emit to customer
      io.to(`user_${booking.userId}`).emit('booking:updated', {
        booking: updatedBooking,
        bookingId: bookingId,
        status: status
      });
    }
    
    res.json(response);
  } catch (error) {
    console.error('Error updating booking:', error);
    const response: ApiResponse = {
      success: false,
      error: "Failed to update booking"
    };
    res.status(500).json(response);
  }
};

// Cancel booking
export const handleCancelBooking: RequestHandler = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const userId = req.user?.userId;
    const { reason } = req.body;

    if (!userId) {
      const response: ApiResponse = {
        success: false,
        error: "User not authenticated"
      };
      return res.status(401).json(response);
    }

    // Find booking
    const booking = await req.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { salon: true }
    });

    if (!booking) {
      const response: ApiResponse = {
        success: false,
        error: "Booking not found"
      };
      return res.status(404).json(response);
    }

    // Check if user owns the booking
    if (booking.userId !== userId) {
      // Check if user is salon owner
      const isSalonOwner = await req.prisma.salon.findFirst({
        where: {
          id: booking.salonId,
          ownerId: userId
        }
      });

      if (!isSalonOwner) {
        const response: ApiResponse = {
          success: false,
          error: "You don't have permission to cancel this booking"
        };
        return res.status(403).json(response);
      }
    }

    // Check if booking can be cancelled
    if (booking.status === 'COMPLETED' || booking.status === 'CANCELLED') {
      const response: ApiResponse = {
        success: false,
        error: `Booking is already ${booking.status.toLowerCase()}`
      };
      return res.status(400).json(response);
    }

    // Cancel booking
    const cancelledBooking = await req.prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: 'CANCELLED',
        cancellationReason: reason || null,
        cancelledBy: booking.userId === userId ? 'customer' : 'salon'
      }
    });

    // TODO: Process refund if payment was made
    // TODO: Send cancellation notification

    // Emit real-time booking events
    const io = req.app.get('io');
    if (io) {
      // Emit to salon-specific room
      io.to(`salon_${booking.salonId}`).emit('booking:cancelled', {
        bookingId: bookingId,
        salonId: booking.salonId,
        cancelledBy: booking.userId === userId ? 'customer' : 'salon',
        reason: reason
      });

      // Emit to salon owners
      io.to('salon_owners').emit('booking:cancelled', {
        bookingId: bookingId,
        salonId: booking.salonId,
        cancelledBy: booking.userId === userId ? 'customer' : 'salon',
        reason: reason
      });

      // Emit to customer
      io.to(`user_${booking.userId}`).emit('booking:cancelled', {
        bookingId: bookingId,
        salonId: booking.salonId,
        reason: reason
      });
    }

    const response: ApiResponse = {
      success: true,
      message: "Booking cancelled successfully"
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error cancelling booking:', error);
    const response: ApiResponse = {
      success: false,
      error: "Failed to cancel booking"
    };
    res.status(500).json(response);
  }
};
