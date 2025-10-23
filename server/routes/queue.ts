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

    // Mock response
    const response: ApiResponse = {
      success: true,
      data: { status },
      message: "Queue entry updated"
    };

    // Broadcast real-time update
    if (io) {
      io.to('salon_owners').emit('queue:entry_updated', {
        salonId: 'salon_gentleman_zone', // In real app, get from req
        entryId: req.params.id,
        updates: { status }
      });
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

    // Mock response
    const response: ApiResponse = {
      success: true,
      data: {
        tokenNumber: Math.floor(Math.random() * 100) + 1,
        position: 1
      },
      message: "Added to queue successfully"
    };

    // Broadcast real-time update
    if (io) {
      io.to('salon_gentleman_zone').emit('queue:entry_added', {
        salonId: 'salon_gentleman_zone',
        entry: {
          id: `queue_${Date.now()}`,
          salonId: 'salon_gentleman_zone',
          customerName: req.body.customerName || 'New Customer',
          serviceName: req.body.serviceName || 'Service',
          position: 1,
          status: 'WAITING'
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
