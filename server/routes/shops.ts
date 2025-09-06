import { RequestHandler } from "express";

interface Salon {
  shop_id: number;
  shop_name: string;
  address: string;
  city: string;
  phone_number: string;
  email: string;
  description: string;
  opening_time: string;
  closing_time: string;
}

// Mock data for demonstration - in production, this would come from a database
const mockSalons: Salon[] = [
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

export const handleShops: RequestHandler = (req, res) => {
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
