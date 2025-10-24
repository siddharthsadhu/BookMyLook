import { RequestHandler } from "express";
import { ApiResponse, Booking } from "@shared/api";

// Get queue data for all salons or specific salon
export const handleGetQueues: RequestHandler = async (req, res) => {
  try {
    // Mock queue data
    const mockQueues = [
      {
        id: 'q1',
        salonId: '1',
        salon: {
          id: '1',
          name: 'StyleMaster Salon',
          address: '123 MG Road, Bangalore',
          phone: '+91 9876543210',
          logo: null
        },
        date: new Date(),
        currentNumber: 5,
        totalWaiting: 3,
        averageWaitTime: 45,
        isActive: true,
        entries: [
          {
            id: 'qe1',
            booking: {
              customerName: 'John Doe',
              customerPhone: '+91 9876543211',
              service: {
                name: 'Hair Cut',
                durationMinutes: 45
              }
            },
            tokenNumber: 1,
            position: 1,
            status: 'WAITING'
          },
          {
            id: 'qe2',
            booking: {
              customerName: 'Jane Smith',
              customerPhone: '+91 9876543212',
              service: {
                name: 'Beard Styling',
                durationMinutes: 30
              }
            },
            tokenNumber: 2,
            position: 2,
            status: 'CALLED'
          }
        ]
      }
    ];

    const response: ApiResponse = {
      success: true,
      data: mockQueues,
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching queues:', error);
    const response: ApiResponse = {
      success: false,
      error: "Failed to fetch queue data"
    };
    res.status(500).json(response);
  }
};

// Get queue entry for a specific booking
export const handleGetQueueEntry: RequestHandler = async (req, res) => {
  try {
    // Mock response
    const response: ApiResponse = {
      success: true,
      data: {
        id: 'qe1',
        position: 1,
        status: 'WAITING',
        estimatedTime: '14:30'
      },
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching queue entry:', error);
    const response: ApiResponse = {
      success: false,
      error: "Failed to fetch queue entry"
    };
    res.status(500).json(response);
  }
};

// Update queue entry status (for salon staff)
export const handleUpdateQueueEntry: RequestHandler = async (req, res) => {
  try {
    const { status } = req.body;
    const io = req.app.get('io');
    const entryId = req.params.id;

    // Mock response with enhanced data
    const response: ApiResponse = {
      success: true,
      data: {
        id: entryId,
        status,
        updatedAt: new Date()
      },
      message: "Queue entry updated successfully"
    };

    // Broadcast real-time update to all connected clients
    if (io) {
      // Emit to salon-specific room
      io.to('salon_gentleman_zone').emit('queue:entry_updated', {
        salonId: 'salon_gentleman_zone',
        entryId: entryId,
        updates: {
          status,
          ...(status === 'CALLED' && { calledAt: new Date() }),
          ...(status === 'IN_SERVICE' && { startedAt: new Date() }),
          ...(status === 'COMPLETED' && { completedAt: new Date() })
        }
      });

      // Also emit to salon owners for dashboard updates
      io.to('salon_owners').emit('queue:entry_updated', {
        salonId: 'salon_gentleman_zone',
        entryId: entryId,
        updates: {
          status,
          ...(status === 'CALLED' && { calledAt: new Date() }),
          ...(status === 'IN_SERVICE' && { startedAt: new Date() }),
          ...(status === 'COMPLETED' && { completedAt: new Date() })
        }
      });

      // If completed, emit positions update
      if (status === 'COMPLETED') {
        io.to('salon_gentleman_zone').emit('queue:positions_updated', {
          salonId: 'salon_gentleman_zone',
          entries: [] // In real app, would recalculate positions
        });
      }
    }

    res.json(response);
  } catch (error) {
    console.error('Error updating queue entry:', error);
    const response: ApiResponse = {
      success: false,
      error: "Failed to update queue entry"
    };
    res.status(500).json(response);
  }
};

// Add booking to queue
export const handleAddToQueue: RequestHandler = async (req, res) => {
  try {
    const io = req.app.get('io');
    const { customerName, serviceName, bookingId, salonId } = req.body;

    // Generate mock queue entry
    const tokenNumber = Math.floor(Math.random() * 100) + 1;
    const now = new Date();

    const newEntry = {
      id: `queue_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      salonId: salonId || 'salon_gentleman_zone',
      bookingId: bookingId || `booking_${Date.now()}`,
      customerName: customerName || 'New Customer',
      customerPhone: '+91 9876543210',
      serviceName: serviceName || 'Hair Service',
      serviceId: 'service_haircut',
      tokenNumber,
      position: 1, // In real app, calculate actual position
      totalInQueue: 1, // In real app, calculate total
      estimatedTime: new Date(now.getTime() + 15 * 60000).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }),
      estimatedWaitMinutes: 15,
      status: 'WAITING',
      joinedAt: now,
      calledAt: null,
      startedAt: null,
      completedAt: null,
      notes: req.body.notes || null
    };

    const response: ApiResponse = {
      success: true,
      data: {
        tokenNumber,
        position: 1,
        estimatedTime: newEntry.estimatedTime,
        entry: newEntry
      },
      message: "Added to queue successfully"
    };

    // Broadcast real-time update to all connected clients
    if (io) {
      // Emit to salon-specific room
      io.to(newEntry.salonId).emit('queue:entry_added', {
        salonId: newEntry.salonId,
        entry: newEntry
      });

      // Also emit to salon owners for dashboard updates
      io.to('salon_owners').emit('queue:entry_added', {
        salonId: newEntry.salonId,
        entry: newEntry
      });

      // Emit queue stats update
      io.to(newEntry.salonId).emit('queue:stats_updated', {
        salonId: newEntry.salonId,
        stats: {
          salonId: newEntry.salonId,
          totalWaiting: 1,
          totalInService: 0,
          totalCompleted: 0,
          averageWaitTime: 15,
          nextCustomerEstimatedTime: newEntry.estimatedTime,
          peakHours: ['09:00-11:00', '14:00-16:00']
        }
      });
    }

    res.status(201).json(response);
  } catch (error) {
    console.error('Error adding to queue:', error);
    const response: ApiResponse = {
      success: false,
      error: "Failed to add booking to queue"
    };
    res.status(500).json(response);
  }
};
