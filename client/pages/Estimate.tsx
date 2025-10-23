import { motion } from "framer-motion";
import { useI18n } from "@/i18n";
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Users, TrendingUp, AlertCircle, MapPin, Phone, CheckCircle, ArrowRight } from "lucide-react";
import { useQueue } from "@/contexts/QueueContext";
import { useNavigate } from "react-router-dom";

interface SalonData {
  id: string;
  name: string;
  address: string;
  phone: string;
  services: ServiceData[];
}

interface ServiceData {
  id: string;
  name: string;
  durationMinutes: number;
  price: number;
}

interface EstimateResult {
  salon: SalonData;
  service: ServiceData;
  queuePosition: number;
  peopleAhead: number;
  estimatedWaitTime: number;
  serviceDuration: number;
  totalTime: number;
  recommendedTime: string;
  urgency: 'low' | 'medium' | 'high';
  recommendation: string;
}

export default function Estimate() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { getQueueForSalon, getQueueStats } = useQueue();

  const [salons, setSalons] = useState<SalonData[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch salons data (API first, then mock fallback)
  useEffect(() => {
    const fetchSalons = async () => {
      try {
        // Try API first
        const response = await fetch('/api/shops');
        const data = await response.json();
        if (data.success && data.data?.salons) {
          // Transform API data to match our interface
          const transformedSalons: SalonData[] = data.data.salons.map((salon: any) => ({
            id: salon.id,
            name: salon.name,
            address: salon.address,
            phone: salon.phone || '',
            services: salon.services?.map((service: any) => ({
              id: service.id,
              name: service.name,
              durationMinutes: service.durationMinutes,
              price: service.price
            })) || []
          }));
          setSalons(transformedSalons);
          return;
        }
        throw new Error('API returned invalid data');
      } catch (error) {
        console.info('🔄 API unavailable, using mock salon data for seamless experience');

        // Fallback to mock data (matching Services page and Booking page)
        const mockSalons: SalonData[] = [
          {
            id: 'salon_gentleman_zone',
            name: "The Gentlemen's Zone",
            address: "Connaught Place, New Delhi",
            phone: "+91 98765 43210",
            services: [
              { id: 'service_haircut', name: 'Hair Cut & Styling', durationMinutes: 45, price: 350 },
              { id: 'service_beard', name: 'Beard Grooming', durationMinutes: 30, price: 200 },
              { id: 'service_hairwash', name: 'Hair Wash', durationMinutes: 20, price: 150 },
              { id: 'service_head_massage', name: 'Head Massage', durationMinutes: 30, price: 250 }
            ]
          },
          {
            id: 'salon_style_studio',
            name: 'Style Studio',
            address: 'Sector 18, Noida',
            phone: '+91 98765 43211',
            services: [
              { id: 'service_spa', name: 'Hair Spa Treatment', durationMinutes: 60, price: 800 },
              { id: 'service_facial', name: 'Facial Treatment', durationMinutes: 45, price: 600 },
              { id: 'service_nails', name: 'Manicure & Pedicure', durationMinutes: 90, price: 500 },
              { id: 'service_bridal_makeup', name: 'Bridal Makeup', durationMinutes: 120, price: 2500 }
            ]
          },
          {
            id: 'salon_urban_cuts',
            name: 'Urban Cuts',
            address: 'Lajpat Nagar, New Delhi',
            phone: '+91 98765 43212',
            services: [
              { id: 'service_modern_haircut', name: 'Modern Haircut', durationMinutes: 50, price: 400 },
              { id: 'service_hair_coloring', name: 'Hair Coloring', durationMinutes: 120, price: 1200 },
              { id: 'service_eyebrow_shaping', name: 'Eyebrow Shaping', durationMinutes: 20, price: 150 },
              { id: 'service_basic_facial', name: 'Basic Facial', durationMinutes: 40, price: 350 }
            ]
          },
          {
            id: 'salon_bliss_spa',
            name: 'Bliss Spa & Salon',
            address: 'Golf Course Road, Gurgaon',
            phone: '+91 98765 43213',
            services: [
              { id: 'service_swedish_massage', name: 'Swedish Massage', durationMinutes: 60, price: 1500 },
              { id: 'service_aromatherapy_facial', name: 'Aromatherapy Facial', durationMinutes: 50, price: 800 },
              { id: 'service_body_scrub', name: 'Body Scrub & Wrap', durationMinutes: 45, price: 1200 },
              { id: 'service_luxury_manicure', name: 'Luxury Manicure', durationMinutes: 45, price: 400 }
            ]
          },
          {
            id: 'salon_trendy_tresses',
            name: 'Trendy Tresses',
            address: 'Rajouri Garden, New Delhi',
            phone: '+91 98765 43214',
            services: [
              { id: 'service_hair_extensions', name: 'Hair Extensions', durationMinutes: 90, price: 2500 },
              { id: 'service_keratin_treatment', name: 'Keratin Treatment', durationMinutes: 120, price: 1800 },
              { id: 'service_balayage', name: 'Balayage Coloring', durationMinutes: 150, price: 2200 },
              { id: 'service_hair_botox', name: 'Hair Botox', durationMinutes: 90, price: 1500 }
            ]
          },
          {
            id: 'salon_glamour_zone',
            name: 'Glamour Zone',
            address: 'DLF Phase 1, Gurgaon',
            phone: '+91 98765 43215',
            services: [
              { id: 'service_bridal_makeup', name: 'Bridal Makeup', durationMinutes: 150, price: 3000 },
              { id: 'service_party_makeup', name: 'Party Makeup', durationMinutes: 60, price: 800 },
              { id: 'service_hair_styling', name: 'Hair Styling', durationMinutes: 45, price: 500 },
              { id: 'service_nail_art', name: 'Nail Art', durationMinutes: 60, price: 350 }
            ]
          },
          {
            id: 'salon_classic_cuts',
            name: 'Classic Cuts',
            address: 'Karol Bagh, New Delhi',
            phone: '+91 98765 43216',
            services: [
              { id: 'service_traditional_haircut', name: 'Traditional Haircut', durationMinutes: 40, price: 250 },
              { id: 'service_hot_towel_shave', name: 'Hot Towel Shave', durationMinutes: 30, price: 300 },
              { id: 'service_neck_trim', name: 'Neck & Sideburns Trim', durationMinutes: 15, price: 100 },
              { id: 'service_beard_trim', name: 'Beard Trim', durationMinutes: 20, price: 150 }
            ]
          },
          {
            id: 'salon_beauty_boulevard',
            name: 'Beauty Boulevard',
            address: 'Rohini, New Delhi',
            phone: '+91 98765 43217',
            services: [
              { id: 'service_basic_haircut', name: 'Basic Haircut', durationMinutes: 30, price: 200 },
              { id: 'service_simple_facial', name: 'Simple Facial', durationMinutes: 30, price: 250 },
              { id: 'service_basic_manicure', name: 'Basic Manicure', durationMinutes: 30, price: 150 },
              { id: 'service_hair_wash', name: 'Hair Wash & Blow Dry', durationMinutes: 25, price: 180 }
            ]
          }
        ];

        setTimeout(() => {
          setSalons(mockSalons);
        }, 500); // Small delay to show loading state
      } finally {
        setLoading(false);
      }
    };

    fetchSalons();
  }, []);

  const [estimate, setEstimate] = useState<EstimateResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [formData, setFormData] = useState({
    salonId: '',
    serviceId: '',
  });
  const hasAutoCalculated = useRef(false);

  // Handle URL parameters for pre-selection and auto-calculation
  useEffect(() => {
    if (loading) return; // Wait for salons to load

    const urlParams = new URLSearchParams(window.location.search);
    const salonIdParam = urlParams.get('salonId');
    const serviceIdParam = urlParams.get('serviceId');

    console.log('🔍 Estimate page - Checking URL params:', { salonIdParam, serviceIdParam, salonsCount: salons.length });

    if (salonIdParam) {
      let selectedSalon = salons.find(s => s.id === salonIdParam);
      let selectedService = null;

      // If salon not found in API data, check if we need to fall back to mock data
      if (!selectedSalon && salonIdParam.startsWith('salon_')) {
        console.log('🔄 Estimate page - Salon not found in API data, checking mock data...');

        // Load mock data as fallback
        const mockSalons = [
          {
            id: 'salon_gentleman_zone',
            name: "The Gentlemen's Zone",
            slug: 'gentlemens-zone',
            description: 'Premium men\'s grooming salon with modern techniques and traditional care',
            email: 'contact@gentlemenszone.com',
            phone: '+91 98765 43210',
            address: 'Connaught Place, New Delhi',
            city: 'New Delhi',
            openingTime: '09:00',
            closingTime: '21:00',
            averageRating: 4.8,
            totalReviews: 156,
            services: [
              { id: 'service_haircut', salonId: 'salon_gentleman_zone', name: 'Hair Cut & Styling', price: 350, durationMinutes: 45, isActive: true, description: 'Professional haircut with modern styling techniques', categoryId: 'cat1', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-01-01T00:00:00.000Z', updatedAt: '2024-01-01T00:00:00.000Z' },
              { id: 'service_beard', salonId: 'salon_gentleman_zone', name: 'Beard Grooming', price: 200, durationMinutes: 30, isActive: true, description: 'Complete beard trim, shape and styling', categoryId: 'cat1', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-01-01T00:00:00.000Z', updatedAt: '2024-01-01T00:00:00.000Z' },
              { id: 'service_hairwash', salonId: 'salon_gentleman_zone', name: 'Hair Wash', price: 150, durationMinutes: 20, isActive: true, description: 'Deep conditioning hair wash with premium products', categoryId: 'cat1', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-01-01T00:00:00.000Z', updatedAt: '2024-01-01T00:00:00.000Z' },
              { id: 'service_head_massage', salonId: 'salon_gentleman_zone', name: 'Head Massage', price: 250, durationMinutes: 30, isActive: true, description: 'Relaxing head massage with aromatic oils', categoryId: 'cat2', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-01-01T00:00:00.000Z', updatedAt: '2024-01-01T00:00:00.000Z' }
            ],
            _count: { bookings: 45 }
          },
          {
            id: 'salon_style_studio',
            name: 'Style Studio',
            slug: 'style-studio',
            description: 'Luxury beauty salon offering complete beauty solutions and wellness treatments',
            email: 'hello@stylestudio.com',
            phone: '+91 98765 43211',
            address: 'Sector 18, Noida',
            city: 'Noida',
            openingTime: '10:00',
            closingTime: '20:00',
            averageRating: 4.6,
            totalReviews: 98,
            services: [
              { id: 'service_spa', salonId: 'salon_style_studio', name: 'Hair Spa Treatment', price: 800, durationMinutes: 60, isActive: true, description: 'Complete hair spa treatment with deep conditioning', categoryId: 'cat2', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-02-01T00:00:00.000Z', updatedAt: '2024-02-01T00:00:00.000Z' },
              { id: 'service_facial', salonId: 'salon_style_studio', name: 'Facial Treatment', price: 600, durationMinutes: 45, isActive: true, description: 'Anti-aging facial treatment with premium products', categoryId: 'cat2', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-02-01T00:00:00.000Z', updatedAt: '2024-02-01T00:00:00.000Z' },
              { id: 'service_nails', salonId: 'salon_style_studio', name: 'Manicure & Pedicure', price: 500, durationMinutes: 90, isActive: true, description: 'Complete nail care with gel application', categoryId: 'cat3', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-02-01T00:00:00.000Z', updatedAt: '2024-02-01T00:00:00.000Z' },
              { id: 'service_bridal_makeup', salonId: 'salon_style_studio', name: 'Bridal Makeup', price: 2500, durationMinutes: 120, isActive: true, description: 'Complete bridal makeup with hair styling', categoryId: 'cat4', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-02-01T00:00:00.000Z', updatedAt: '2024-02-01T00:00:00.000Z' }
            ],
            _count: { bookings: 32 }
          },
          {
            id: 'salon_bliss_spa',
            name: 'Bliss Spa & Salon',
            slug: 'bliss-spa-salon',
            description: 'Luxury wellness center offering premium spa treatments and beauty services',
            email: 'welcome@blissspa.com',
            phone: '+91 98765 43213',
            address: 'Golf Course Road, Gurgaon',
            city: 'Gurgaon',
            openingTime: '09:00',
            closingTime: '20:00',
            averageRating: 4.9,
            totalReviews: 145,
            services: [
              { id: 'service_swedish_massage', salonId: 'salon_bliss_spa', name: 'Swedish Massage', price: 1500, durationMinutes: 60, isActive: true, description: 'Full body relaxation massage with essential oils', categoryId: 'cat6', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-02-01T00:00:00.000Z', updatedAt: '2024-02-01T00:00:00.000Z' },
              { id: 'service_aromatherapy_facial', salonId: 'salon_bliss_spa', name: 'Aromatherapy Facial', price: 800, durationMinutes: 50, isActive: true, description: 'Luxury facial with aromatic essential oils', categoryId: 'cat2', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-02-01T00:00:00.000Z', updatedAt: '2024-02-01T00:00:00.000Z' },
              { id: 'service_body_scrub', salonId: 'salon_bliss_spa', name: 'Body Scrub & Wrap', price: 1200, durationMinutes: 45, isActive: true, description: 'Exfoliating body treatment with moisturizing wrap', categoryId: 'cat6', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-02-01T00:00:00.000Z', updatedAt: '2024-02-01T00:00:00.000Z' },
              { id: 'service_luxury_manicure', salonId: 'salon_bliss_spa', name: 'Luxury Manicure', price: 400, durationMinutes: 45, isActive: true, description: 'Premium manicure with paraffin treatment', categoryId: 'cat3', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-02-01T00:00:00.000Z', updatedAt: '2024-02-01T00:00:00.000Z' }
            ],
            _count: { bookings: 56 }
          },
          {
            id: 'salon_glamour_zone',
            name: 'Glamour Zone',
            slug: 'glamour-zone',
            description: 'Complete beauty destination for makeup, hair, and nail services',
            email: 'info@glamourzone.in',
            phone: '+91 98765 43215',
            address: 'DLF Phase 1, Gurgaon',
            city: 'Gurgaon',
            openingTime: '09:00',
            closingTime: '22:00',
            averageRating: 4.4,
            totalReviews: 134,
            services: [
              { id: 'service_bridal_makeup', salonId: 'salon_glamour_zone', name: 'Bridal Makeup', price: 3000, durationMinutes: 150, isActive: true, description: 'Complete bridal makeup and hair styling', categoryId: 'cat4', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-02-01T00:00:00.000Z', updatedAt: '2024-02-01T00:00:00.000Z' },
              { id: 'service_party_makeup', salonId: 'salon_glamour_zone', name: 'Party Makeup', price: 800, durationMinutes: 60, isActive: true, description: 'Glamorous makeup for parties and events', categoryId: 'cat4', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-02-01T00:00:00.000Z', updatedAt: '2024-02-01T00:00:00.000Z' },
              { id: 'service_hair_styling', salonId: 'salon_glamour_zone', name: 'Hair Styling', price: 500, durationMinutes: 45, isActive: true, description: 'Professional hair styling for any occasion', categoryId: 'cat1', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-02-01T00:00:00.000Z', updatedAt: '2024-02-01T00:00:00.000Z' },
              { id: 'service_nail_art', salonId: 'salon_glamour_zone', name: 'Nail Art', price: 350, durationMinutes: 60, isActive: true, description: 'Creative nail art and gel extensions', categoryId: 'cat3', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-02-01T00:00:00.000Z', updatedAt: '2024-02-01T00:00:00.000Z' }
            ],
            _count: { bookings: 67 }
          },
          {
            id: 'salon_trendy_tresses',
            name: 'Trendy Tresses',
            slug: 'trendy-tresses',
            description: 'Hair care specialists offering advanced treatments and styling services',
            email: 'book@trendytresses.com',
            phone: '+91 98765 43214',
            address: 'Rajouri Garden, New Delhi',
            city: 'New Delhi',
            openingTime: '10:00',
            closingTime: '21:00',
            averageRating: 4.5,
            totalReviews: 167,
            services: [
              { id: 'service_hair_extensions', salonId: 'salon_trendy_tresses', name: 'Hair Extensions', price: 2500, durationMinutes: 90, isActive: true, description: 'Premium hair extensions with natural look', categoryId: 'cat1', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-02-01T00:00:00.000Z', updatedAt: '2024-02-01T00:00:00.000Z' },
              { id: 'service_keratin_treatment', salonId: 'salon_trendy_tresses', name: 'Keratin Treatment', price: 1800, durationMinutes: 120, isActive: true, description: 'Smoothening treatment for frizz-free hair', categoryId: 'cat1', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-02-01T00:00:00.000Z', updatedAt: '2024-02-01T00:00:00.000Z' },
              { id: 'service_balayage', salonId: 'salon_trendy_tresses', name: 'Balayage Coloring', price: 2200, durationMinutes: 150, isActive: true, description: 'Natural-looking hair coloring technique', categoryId: 'cat1', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-02-01T00:00:00.000Z', updatedAt: '2024-02-01T00:00:00.000Z' },
              { id: 'service_hair_botox', salonId: 'salon_trendy_tresses', name: 'Hair Botox', price: 1500, durationMinutes: 90, isActive: true, description: 'Intensive hair repair treatment', categoryId: 'cat1', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-02-01T00:00:00.000Z', updatedAt: '2024-02-01T00:00:00.000Z' }
            ],
            _count: { bookings: 89 }
          },
          {
            id: 'salon_classic_cuts',
            name: 'Classic Cuts',
            slug: 'classic-cuts',
            description: 'Traditional barber shop with authentic grooming services',
            email: 'contact@classiccuts.in',
            phone: '+91 98765 43216',
            address: 'Karol Bagh, New Delhi',
            city: 'New Delhi',
            openingTime: '08:00',
            closingTime: '20:00',
            averageRating: 4.6,
            totalReviews: 198,
            services: [
              { id: 'service_traditional_haircut', salonId: 'salon_classic_cuts', name: 'Traditional Haircut', price: 250, durationMinutes: 40, isActive: true, description: 'Classic barber-style haircut with hot towel', categoryId: 'cat1', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-02-01T00:00:00.000Z', updatedAt: '2024-02-01T00:00:00.000Z' },
              { id: 'service_hot_towel_shave', salonId: 'salon_classic_cuts', name: 'Hot Towel Shave', price: 300, durationMinutes: 30, isActive: true, description: 'Traditional hot towel shave with premium products', categoryId: 'cat1', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-02-01T00:00:00.000Z', updatedAt: '2024-02-01T00:00:00.000Z' },
              { id: 'service_neck_trim', salonId: 'salon_classic_cuts', name: 'Neck & Sideburns Trim', price: 100, durationMinutes: 15, isActive: true, description: 'Precise trimming of neck and sideburns', categoryId: 'cat1', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-02-01T00:00:00.000Z', updatedAt: '2024-02-01T00:00:00.000Z' },
              { id: 'service_beard_trim', salonId: 'salon_classic_cuts', name: 'Beard Trim', price: 150, durationMinutes: 20, isActive: true, description: 'Professional beard trimming and shaping', categoryId: 'cat1', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-02-01T00:00:00.000Z', updatedAt: '2024-02-01T00:00:00.000Z' }
            ],
            _count: { bookings: 124 }
          },
          {
            id: 'salon_beauty_boulevard',
            name: 'Beauty Boulevard',
            slug: 'beauty-boulevard',
            description: 'Affordable beauty services for everyone with quality treatments',
            email: 'hello@beautyboulevard.in',
            phone: '+91 98765 43217',
            address: 'Rohini, New Delhi',
            city: 'New Delhi',
            openingTime: '09:00',
            closingTime: '21:00',
            averageRating: 4.2,
            totalReviews: 87,
            services: [
              { id: 'service_basic_haircut', salonId: 'salon_beauty_boulevard', name: 'Basic Haircut', price: 200, durationMinutes: 30, isActive: true, description: 'Simple and clean haircut for all', categoryId: 'cat1', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-02-01T00:00:00.000Z', updatedAt: '2024-02-01T00:00:00.000Z' },
              { id: 'service_simple_facial', salonId: 'salon_beauty_boulevard', name: 'Simple Facial', price: 250, durationMinutes: 30, isActive: true, description: 'Basic facial treatment for healthy skin', categoryId: 'cat2', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-02-01T00:00:00.000Z', updatedAt: '2024-02-01T00:00:00.000Z' },
              { id: 'service_basic_manicure', salonId: 'salon_beauty_boulevard', name: 'Basic Manicure', price: 150, durationMinutes: 30, isActive: true, description: 'Simple manicure with nail care', categoryId: 'cat3', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-02-01T00:00:00.000Z', updatedAt: '2024-02-01T00:00:00.000Z' },
              { id: 'service_hair_wash', salonId: 'salon_beauty_boulevard', name: 'Hair Wash & Blow Dry', price: 180, durationMinutes: 25, isActive: true, description: 'Hair wash with basic blow dry styling', categoryId: 'cat1', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-02-01T00:00:00.000Z', updatedAt: '2024-02-01T00:00:00.000Z' }
            ],
            _count: { bookings: 95 }
          }
        ];

        selectedSalon = mockSalons.find(s => s.id === salonIdParam);
        if (selectedSalon) {
          console.log('✅ Estimate page - Found salon in mock fallback data:', selectedSalon.name);
          // Temporarily add this salon to the current salons list for this session
          setSalons(prev => [...prev, selectedSalon]);
        }
      }

      // Set form data with found salon
      if (selectedSalon) {
        setFormData(prev => ({ ...prev, salonId: salonIdParam, serviceId: serviceIdParam || '' }));

        // Auto-calculate estimate if both salon and service are provided
        if (serviceIdParam && !hasAutoCalculated.current) {
          selectedService = selectedSalon.services.find(s => s.id === serviceIdParam);

          if (selectedService) {
            console.log('✂️ Estimate page - Auto-calculating for service:', selectedService.name);
            hasAutoCalculated.current = true;
            setTimeout(() => calculateEstimate(), 500); // Small delay to ensure state updates
          }
        }
      }
    }
  }, [salons, loading]); // Depend on salons and loading

  // Set default salon on load (only if no URL params)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const hasUrlParams = urlParams.get('salonId');

    if (salons.length > 0 && !formData.salonId && !hasUrlParams) {
      setFormData(prev => ({ ...prev, salonId: salons[0].id }));
    }
  }, [salons, formData.salonId]);

  const selectedSalon = salons.find(s => s.id === formData.salonId);
  const selectedService = selectedSalon?.services.find(s => s.id === formData.serviceId);

  const handleSalonChange = (salonId: string) => {
    setFormData(prev => ({ ...prev, salonId, serviceId: '' }));
  };

  const calculateEstimate = () => {
    if (!selectedSalon || !selectedService) return;

    setIsCalculating(true);

    // Get real queue data
    const queueEntries = getQueueForSalon(formData.salonId);
    const queueStats = getQueueStats(formData.salonId);

    // Calculate position (next in line)
    const queuePosition = queueEntries.length + 1;
    const peopleAhead = queueEntries.length;

    // Calculate wait time based on people ahead (assuming 20 min average per person)
    const estimatedWaitTime = peopleAhead * 20;
    const totalTime = estimatedWaitTime + selectedService.durationMinutes;

    // Determine urgency based on wait time
    let urgency: 'low' | 'medium' | 'high' = 'low';
    let recommendation = '';

    if (totalTime <= 30) {
      urgency = 'low';
      recommendation = "Perfect time to book! You'll be served quickly.";
    } else if (totalTime <= 60) {
      urgency = 'medium';
      recommendation = "Reasonable wait time. Consider booking now to secure your spot.";
    } else {
      urgency = 'high';
      recommendation = "Longer wait expected. Consider visiting during peak hours (10 AM - 12 PM) for faster service.";
    }

    // Calculate recommended time
    const now = new Date();
    const recommendedTime = new Date(now.getTime() + estimatedWaitTime * 60000);
    const timeString = recommendedTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    const result: EstimateResult = {
      salon: selectedSalon,
      service: selectedService,
      queuePosition,
      peopleAhead,
      estimatedWaitTime,
      serviceDuration: selectedService.durationMinutes,
      totalTime,
      recommendedTime: timeString,
      urgency,
      recommendation
    };

    // Simulate calculation delay
    setTimeout(() => {
      setEstimate(result);
      setIsCalculating(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateEstimate();
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins > 0 ? `${mins}m` : ''}`;
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      default: return 'default';
    }
  };

  const getUrgencyGradient = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'from-red-50 to-orange-50 border-red-200';
      case 'medium': return 'from-yellow-50 to-orange-50 border-yellow-200';
      default: return 'from-green-50 to-blue-50 border-green-200';
    }
  };

  const getUrgencyTextColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-orange-600';
      default: return 'text-green-600';
    }
  };

  const handleJoinQueue = () => {
    // Navigate to booking page with pre-filled data
    navigate(`/booking?salon=${formData.salonId}&service=${formData.serviceId}`);
  };

  if (loading) {
    return (
      <div className="container py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading salons...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Smart Queue Estimator
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Get accurate wait time predictions and join the queue instantly. Powered by real-time queue data.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {!estimate ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Get Your Wait Time Estimate
                </CardTitle>
                <CardDescription>
                  Choose your preferred salon and service for an AI-powered wait time prediction
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="salonId">Select Salon</Label>
                      <Select
                        value={formData.salonId}
                        onValueChange={handleSalonChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a salon" />
                        </SelectTrigger>
                        <SelectContent>
                          {salons.map((salon) => (
                            <SelectItem key={salon.id} value={salon.id}>
                              <div className="flex flex-col">
                                <span className="font-medium">{salon.name}</span>
                                <span className="text-sm text-muted-foreground">
                                  {salon.address}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="serviceId">Select Service</Label>
                      <Select
                        value={formData.serviceId}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, serviceId: value }))}
                        disabled={!formData.salonId}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedSalon?.services.map((service) => (
                            <SelectItem key={service.id} value={service.id}>
                              <div className="flex flex-col">
                                <span className="font-medium">{service.name}</span>
                                <span className="text-sm text-muted-foreground">
                                  {service.durationMinutes} min • ₹{service.price}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isCalculating || !formData.salonId || !formData.serviceId}
                    size="lg"
                  >
                    {isCalculating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Analyzing Queue Data...
                      </>
                    ) : (
                      <>
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Get Smart Estimate
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* Salon & Service Summary */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{estimate.salon.name}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {estimate.salon.address}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      {estimate.salon.phone}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Selected Service</div>
                    <div className="font-medium">{estimate.service.name}</div>
                    <div className="text-sm text-muted-foreground">₹{estimate.service.price}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Wait Time Estimate */}
            <Card className={`bg-gradient-to-r border-2 ${getUrgencyGradient(estimate.urgency)}`}>
              <CardContent className="p-8 text-center">
                <div className={`text-6xl font-bold mb-4 ${getUrgencyTextColor(estimate.urgency)}`}>
                  {formatTime(estimate.totalTime)}
                </div>
                <div className="text-xl text-muted-foreground mb-4">Total Time (Wait + Service)</div>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Badge variant={getUrgencyColor(estimate.urgency) as any} className="text-lg px-4 py-2">
                    {estimate.urgency.toUpperCase()} WAIT
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  Service starts around {estimate.recommendedTime}
                </div>
              </CardContent>
            </Card>

            {/* Detailed Breakdown */}
            <div className="grid gap-6 md:grid-cols-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <div className="text-3xl font-bold mb-2">{estimate.peopleAhead}</div>
                  <div className="text-muted-foreground">People Ahead</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                  <div className="text-3xl font-bold mb-2">{formatTime(estimate.estimatedWaitTime)}</div>
                  <div className="text-muted-foreground">Wait Time</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
                  <div className="text-3xl font-bold mb-2">{estimate.serviceDuration}</div>
                  <div className="text-muted-foreground">Service (min)</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <ArrowRight className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                  <div className="text-3xl font-bold mb-2">#{estimate.queuePosition}</div>
                  <div className="text-muted-foreground">Your Position</div>
                </CardContent>
              </Card>
            </div>

            {/* Smart Recommendation */}
            <Card className={`${getUrgencyGradient(estimate.urgency)} border-2`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <AlertCircle className={`h-6 w-6 mt-1 ${getUrgencyTextColor(estimate.urgency)}`} />
                  <div>
                    <div className="font-semibold text-lg mb-2">Smart Recommendation</div>
                    <div className="text-muted-foreground mb-4">{estimate.recommendation}</div>
                    {estimate.urgency === 'high' && (
                      <div className="text-sm text-muted-foreground">
                        💡 <strong>Pro tip:</strong> Visit during peak hours (10 AM - 12 PM) for 30-40% faster service!
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setEstimate(null)}
                size="lg"
              >
                New Estimate
              </Button>
              <Button
                className="flex-1"
                onClick={handleJoinQueue}
                size="lg"
              >
                Join Queue Now
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

