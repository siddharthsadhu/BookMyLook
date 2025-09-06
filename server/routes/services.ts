import { RequestHandler } from "express";

interface Service {
  service_id: number;
  service_name: string;
  description: string;
  duration_minutes: number;
  price: number;
}

// Mock data for demonstration - in production, this would come from a database
const mockServices: { [key: number]: Service[] } = {
  1: [ // Style Studio
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
  2: [ // Beauty Lounge
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
  3: [ // Hair & Beyond
    {
      service_id: 7,
      service_name: "Premium Haircut",
      description: "Expert haircut with consultation",
      duration_minutes: 60,
      price: 1000
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
      price: 5000
    }
  ]
};

export const handleServices: RequestHandler = (req, res) => {
  try {
    const shopId = req.query.shop_id as string;
    
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
