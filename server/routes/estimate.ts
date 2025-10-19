import { RequestHandler } from "express";
import { ApiResponse } from "@shared/api";

interface EstimateRequest {
  salonId: string;
  serviceId: string;
}

interface EstimateResponse {
  salon: {
    id: string;
    name: string;
    address: string;
    phone: string;
  };
  service: {
    id: string;
    name: string;
    durationMinutes: number;
    price: number;
  };
  queue: {
    currentLength: number;
    averageWaitTime: number;
    estimatedWaitTime: number;
  };
  recommendation: string;
  isLongWait: boolean;
  urgency: 'low' | 'medium' | 'high';
}

export const handleEstimate: RequestHandler = async (req, res) => {
  try {
    const { salonId, serviceId } = req.body as EstimateRequest;

    if (!salonId || !serviceId) {
      const response: ApiResponse = {
        success: false,
        error: "Salon ID and Service ID are required"
      };
      return res.status(400).json(response);
    }

    // Mock data
    const mockSalons = {
      '1': {
        id: '1',
        name: 'StyleMaster Salon',
        address: '123 MG Road, Bangalore',
        phone: '+91 9876543210'
      },
      '2': {
        id: '2',
        name: 'Beauty Bliss',
        address: '456 Brigade Road, Bangalore',
        phone: '+91 9876543211'
      }
    };

    const mockServices = {
      's1': { id: 's1', name: 'Hair Cut', durationMinutes: 45, price: 300 },
      's2': { id: 's2', name: 'Beard Styling', durationMinutes: 30, price: 150 },
      's3': { id: 's3', name: 'Facial', durationMinutes: 60, price: 500 }
    };

    const salon = mockSalons[salonId as keyof typeof mockSalons];
    const service = mockServices[serviceId as keyof typeof mockServices];

    if (!salon) {
      const response: ApiResponse = {
        success: false,
        error: "Salon not found"
      };
      return res.status(404).json(response);
    }

    if (!service) {
      const response: ApiResponse = {
        success: false,
        error: "Service not found"
      };
      return res.status(404).json(response);
    }

    // Mock queue data
    const currentQueueLength = Math.floor(Math.random() * 5); // 0-4 people
    const averageWaitTime = 15;
    const estimatedWaitTime = currentQueueLength * (service.durationMinutes + 5);

    // Determine urgency and recommendation
    let urgency: 'low' | 'medium' | 'high' = 'low';
    let recommendation = "Perfect time to book!";

    if (estimatedWaitTime > 60) {
      urgency = 'high';
      recommendation = "Consider booking for later or try another salon. Long wait expected.";
    } else if (estimatedWaitTime > 30) {
      urgency = 'medium';
      recommendation = "Moderate wait time. Consider booking online to skip the line.";
    } else if (estimatedWaitTime > 15) {
      urgency = 'low';
      recommendation = "Short wait expected. Good time to visit!";
    }

    const isLongWait = estimatedWaitTime > 30;

    const response: ApiResponse<EstimateResponse> = {
      success: true,
      data: {
        salon,
        service,
        queue: {
          currentLength: currentQueueLength,
          averageWaitTime,
          estimatedWaitTime,
        },
        recommendation,
        isLongWait,
        urgency,
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Error getting estimate:', error);
    const response: ApiResponse = {
      success: false,
      error: "Failed to get estimate"
    };
    res.status(500).json(response);
  }
};
