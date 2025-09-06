import { RequestHandler } from "express";

interface EstimateRequest {
  shop_id: number;
  service_id: number;
  queue_length?: number;
  service_time?: number;
}

interface EstimateResponse {
  shop_name: string;
  queue_length: number;
  service_duration: number;
  estimated_wait_time: number;
  estimated_wait_minutes: number;
  wait_status: string;
  recommendation: string;
  is_long_wait: boolean;
}

// Mock data for demonstration
const mockShops = {
  1: "Style Studio",
  2: "Beauty Lounge", 
  3: "Hair & Beyond"
};

const mockServiceDurations = {
  1: 45, 2: 30, 3: 120, 4: 60, 5: 90, 6: 75, 7: 60, 8: 45, 9: 180
};

export const handleEstimate: RequestHandler = (req, res) => {
  try {
    const { shop_id, service_id, queue_length, service_time } = req.body as EstimateRequest;
    
    if (!shop_id || !service_id) {
      return res.status(400).json({
        success: false,
        error: "Shop ID and Service ID are required"
      });
    }

    // Mock queue length (in production, this would come from database)
    const currentQueueLength = queue_length || Math.floor(Math.random() * 10) + 1;
    const serviceDuration = service_time || mockServiceDurations[service_id as keyof typeof mockServiceDurations] || 30;
    
    const estimatedWait = currentQueueLength * serviceDuration;
    const isLongWait = estimatedWait > 30;
    const waitStatus = isLongWait ? "Long Wait" : "Short Wait";
    const recommendation = estimatedWait > 45 ? "Extra Counter Recommended" : "Current Counters Sufficient";

    const response: EstimateResponse = {
      shop_name: mockShops[shop_id as keyof typeof mockShops] || "Unknown Shop",
      queue_length: currentQueueLength,
      service_duration: serviceDuration,
      estimated_wait_time: estimatedWait,
      estimated_wait_minutes: estimatedWait,
      wait_status: waitStatus,
      recommendation: recommendation,
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
