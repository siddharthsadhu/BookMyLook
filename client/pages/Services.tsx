import { motion } from "framer-motion";
import { useI18n } from "@/i18n";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, MapPin, Phone, Mail, Star, Search, Filter, Users } from "lucide-react";
import QueueEstimator from "@/components/estimator/QueueEstimator";

interface Salon {
  id: string;
  name: string;
  slug: string;
  description: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  openingTime: string;
  closingTime: string;
  averageRating: number;
  totalReviews: number;
  services: Service[];
  _count: { bookings: number };
}

interface Service {
  id: string;
  salonId: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  categoryId: string;
  isActive: boolean;
}

export default function Services() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [salons, setSalons] = useState<Salon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedServiceType, setSelectedServiceType] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"salons" | "services">("salons");
  const [selectedSalon, setSelectedSalon] = useState<string | null>(null);

  useEffect(() => {
    fetchSalons();
  }, []);

  const fetchSalons = async () => {
    try {
      // Try API first
      const response = await fetch('/api/shops');
      const data = await response.json();
      if (data.success && data.data?.salons) {
        setSalons(data.data.salons);
        return;
      }
      throw new Error('API returned invalid data');
    } catch (error) {
      console.info('🔄 API unavailable, using mock salon data for seamless browsing experience');
      
      // Fallback to mock data (matching Estimate page and Queue system)
      const mockSalons: Salon[] = [
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
            { id: 'service_haircut', salonId: 'salon_gentleman_zone', name: 'Hair Cut & Styling', description: 'Professional haircut with modern styling techniques', categoryId: 'cat1', price: 350, durationMinutes: 45, isActive: true },
            { id: 'service_beard', salonId: 'salon_gentleman_zone', name: 'Beard Grooming', description: 'Complete beard trim, shape and styling', categoryId: 'cat1', price: 200, durationMinutes: 30, isActive: true },
            { id: 'service_hairwash', salonId: 'salon_gentleman_zone', name: 'Hair Wash', description: 'Deep conditioning hair wash with premium products', categoryId: 'cat1', price: 150, durationMinutes: 20, isActive: true },
            { id: 'service_head_massage', salonId: 'salon_gentleman_zone', name: 'Head Massage', description: 'Relaxing head massage with aromatic oils', categoryId: 'cat2', price: 250, durationMinutes: 30, isActive: true }
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
            { id: 'service_spa', salonId: 'salon_style_studio', name: 'Hair Spa Treatment', description: 'Complete hair spa treatment with deep conditioning', categoryId: 'cat2', price: 800, durationMinutes: 60, isActive: true },
            { id: 'service_facial', salonId: 'salon_style_studio', name: 'Facial Treatment', description: 'Anti-aging facial treatment with premium products', categoryId: 'cat2', price: 600, durationMinutes: 45, isActive: true },
            { id: 'service_nails', salonId: 'salon_style_studio', name: 'Manicure & Pedicure', description: 'Complete nail care with gel application', categoryId: 'cat3', price: 500, durationMinutes: 90, isActive: true },
            { id: 'service_bridal_makeup', salonId: 'salon_style_studio', name: 'Bridal Makeup', description: 'Complete bridal makeup with hair styling', categoryId: 'cat4', price: 2500, durationMinutes: 120, isActive: true }
          ],
          _count: { bookings: 32 }
        },
        {
          id: 'salon_urban_cuts',
          name: 'Urban Cuts',
          slug: 'urban-cuts',
          description: 'Modern unisex salon specializing in trendy haircuts and contemporary styling',
          email: 'info@urbancuts.in',
          phone: '+91 98765 43212',
          address: 'Lajpat Nagar, New Delhi',
          city: 'New Delhi',
          openingTime: '10:00',
          closingTime: '22:00',
          averageRating: 4.7,
          totalReviews: 203,
          services: [
            { id: 'service_modern_haircut', salonId: 'salon_urban_cuts', name: 'Modern Haircut', description: 'Trendy unisex haircut with contemporary styling', categoryId: 'cat1', price: 400, durationMinutes: 50, isActive: true },
            { id: 'service_hair_coloring', salonId: 'salon_urban_cuts', name: 'Hair Coloring', description: 'Professional hair coloring with premium dyes', categoryId: 'cat1', price: 1200, durationMinutes: 120, isActive: true },
            { id: 'service_eyebrow_shaping', salonId: 'salon_urban_cuts', name: 'Eyebrow Shaping', description: 'Professional eyebrow threading and shaping', categoryId: 'cat5', price: 150, durationMinutes: 20, isActive: true },
            { id: 'service_basic_facial', salonId: 'salon_urban_cuts', name: 'Basic Facial', description: 'Refreshing facial treatment for all skin types', categoryId: 'cat2', price: 350, durationMinutes: 40, isActive: true }
          ],
          _count: { bookings: 78 }
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
            { id: 'service_swedish_massage', salonId: 'salon_bliss_spa', name: 'Swedish Massage', description: 'Full body relaxation massage with essential oils', categoryId: 'cat6', price: 1500, durationMinutes: 60, isActive: true },
            { id: 'service_aromatherapy_facial', salonId: 'salon_bliss_spa', name: 'Aromatherapy Facial', description: 'Luxury facial with aromatic essential oils', categoryId: 'cat2', price: 800, durationMinutes: 50, isActive: true },
            { id: 'service_body_scrub', salonId: 'salon_bliss_spa', name: 'Body Scrub & Wrap', description: 'Exfoliating body treatment with moisturizing wrap', categoryId: 'cat6', price: 1200, durationMinutes: 45, isActive: true },
            { id: 'service_luxury_manicure', salonId: 'salon_bliss_spa', name: 'Luxury Manicure', description: 'Premium manicure with paraffin treatment', categoryId: 'cat3', price: 400, durationMinutes: 45, isActive: true }
          ],
          _count: { bookings: 56 }
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
            { id: 'service_hair_extensions', salonId: 'salon_trendy_tresses', name: 'Hair Extensions', description: 'Premium hair extensions with natural look', categoryId: 'cat1', price: 2500, durationMinutes: 90, isActive: true },
            { id: 'service_keratin_treatment', salonId: 'salon_trendy_tresses', name: 'Keratin Treatment', description: 'Smoothening treatment for frizz-free hair', categoryId: 'cat1', price: 1800, durationMinutes: 120, isActive: true },
            { id: 'service_balayage', salonId: 'salon_trendy_tresses', name: 'Balayage Coloring', description: 'Natural-looking hair coloring technique', categoryId: 'cat1', price: 2200, durationMinutes: 150, isActive: true },
            { id: 'service_hair_botox', salonId: 'salon_trendy_tresses', name: 'Hair Botox', description: 'Intensive hair repair treatment', categoryId: 'cat1', price: 1500, durationMinutes: 90, isActive: true }
          ],
          _count: { bookings: 89 }
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
            { id: 'service_bridal_makeup', salonId: 'salon_glamour_zone', name: 'Bridal Makeup', description: 'Complete bridal makeup and hair styling', categoryId: 'cat4', price: 3000, durationMinutes: 150, isActive: true },
            { id: 'service_party_makeup', salonId: 'salon_glamour_zone', name: 'Party Makeup', description: 'Glamorous makeup for parties and events', categoryId: 'cat4', price: 800, durationMinutes: 60, isActive: true },
            { id: 'service_hair_styling', salonId: 'salon_glamour_zone', name: 'Hair Styling', description: 'Professional hair styling for any occasion', categoryId: 'cat1', price: 500, durationMinutes: 45, isActive: true },
            { id: 'service_nail_art', salonId: 'salon_glamour_zone', name: 'Nail Art', description: 'Creative nail art and gel extensions', categoryId: 'cat3', price: 350, durationMinutes: 60, isActive: true }
          ],
          _count: { bookings: 67 }
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
            { id: 'service_traditional_haircut', salonId: 'salon_classic_cuts', name: 'Traditional Haircut', description: 'Classic barber-style haircut with hot towel', categoryId: 'cat1', price: 250, durationMinutes: 40, isActive: true },
            { id: 'service_hot_towel_shave', salonId: 'salon_classic_cuts', name: 'Hot Towel Shave', description: 'Traditional hot towel shave with premium products', categoryId: 'cat1', price: 300, durationMinutes: 30, isActive: true },
            { id: 'service_neck_trim', salonId: 'salon_classic_cuts', name: 'Neck & Sideburns Trim', description: 'Precise trimming of neck and sideburns', categoryId: 'cat1', price: 100, durationMinutes: 15, isActive: true },
            { id: 'service_beard_trim', salonId: 'salon_classic_cuts', name: 'Beard Trim', description: 'Professional beard trimming and shaping', categoryId: 'cat1', price: 150, durationMinutes: 20, isActive: true }
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
            { id: 'service_basic_haircut', salonId: 'salon_beauty_boulevard', name: 'Basic Haircut', description: 'Simple and clean haircut for all', categoryId: 'cat1', price: 200, durationMinutes: 30, isActive: true },
            { id: 'service_simple_facial', salonId: 'salon_beauty_boulevard', name: 'Simple Facial', description: 'Basic facial treatment for healthy skin', categoryId: 'cat2', price: 250, durationMinutes: 30, isActive: true },
            { id: 'service_basic_manicure', salonId: 'salon_beauty_boulevard', name: 'Basic Manicure', description: 'Simple manicure with nail care', categoryId: 'cat3', price: 150, durationMinutes: 30, isActive: true },
            { id: 'service_hair_wash', salonId: 'salon_beauty_boulevard', name: 'Hair Wash & Blow Dry', description: 'Hair wash with basic blow dry styling', categoryId: 'cat1', price: 180, durationMinutes: 25, isActive: true }
          ],
          _count: { bookings: 95 }
        }
      ];
      
      setTimeout(() => {
        setSalons(mockSalons);
      }, 500); // Small delay to show loading state
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async (shopId: string) => {
    // Services are now included in the salon data
    // This function can be removed or kept for compatibility
  };

  const handleEstimateClick = (salonId: string, serviceId: string) => {
    // Navigate to the smart queue estimator page with pre-selected salon and service
    navigate(`/estimate?salonId=${salonId}&serviceId=${serviceId}`);
  };

  const handleBookClick = (salonId: string, serviceId: string) => {
    // Navigate to booking page with pre-filled salon and service
    navigate(`/booking?salon=${salonId}&service=${serviceId}`);
  };

  // Get all unique service types
  const getAllServiceTypes = () => {
    const serviceTypes = new Set<string>();
    salons.forEach(salon => {
      salon.services?.forEach(service => {
        serviceTypes.add(service.name);
      });
    });
    return Array.from(serviceTypes);
  };

  // Filter salons based on search and service type
  const getFilteredSalons = () => {
    let filtered = salons;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(salon => 
        salon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        salon.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        salon.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by service type
    if (selectedServiceType !== "all") {
      filtered = filtered.filter(salon => {
        return salon.services?.some(service => service.name === selectedServiceType);
      });
    }

    return filtered;
  };

  // Get salons that offer a specific service
  const getSalonsByService = (serviceName: string) => {
    return salons.filter(salon => {
      return salon.services?.some(service => service.name === serviceName);
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-accent/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading salons...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-accent/10 flex flex-col relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>

      <div className="flex-1 relative z-10">
        <div className="container py-12 space-y-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full text-sm font-semibold border border-blue-200"
        >
          <Users className="h-4 w-4" />
          Discover Premium Services
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent leading-tight"
        >
          Find Your Perfect Salon
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
        >
          Discover our partner salons and book your next appointment with real-time queue estimates.
        </motion.p>
      </motion.div>

      {/* Enhanced Search and Filter Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-white via-slate-50/50 to-white rounded-2xl border border-slate-200/60 shadow-lg backdrop-blur-sm p-8"
      >
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 group">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200">
                <Search className="h-5 w-5" />
              </div>
              <Input
                placeholder="Search salons by name, address, or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-white/80 backdrop-blur-sm text-slate-800 placeholder:text-slate-400 transition-all duration-300"
              />
            </div>
            <Select value={selectedServiceType} onValueChange={setSelectedServiceType}>
              <SelectTrigger className="w-full md:w-64 h-12 border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-white/80 backdrop-blur-sm text-slate-800 transition-all duration-300">
                <SelectValue placeholder="Filter by service type" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-xl border-slate-200">
                <SelectItem value="all" className="hover:bg-blue-50 focus:bg-blue-50">All Services</SelectItem>
                {getAllServiceTypes().map((serviceType) => (
                  <SelectItem key={serviceType} value={serviceType} className="hover:bg-blue-50 focus:bg-blue-50">
                    {serviceType}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Premium View Mode Toggle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "salons" | "services")}>
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 p-1 rounded-xl shadow-inner border border-slate-200">
                <TabsTrigger value="salons" className="rounded-lg font-semibold text-slate-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300">
                  🏪 Browse by Salons
                </TabsTrigger>
                <TabsTrigger value="services" className="rounded-lg font-semibold text-slate-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300">
                  ✂️ Browse by Services
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>
        </div>
      </motion.div>

      <Tabs value={viewMode}>
        <TabsContent value="salons" className="space-y-6">
          <div className="grid gap-8 lg:grid-cols-2">
            {getFilteredSalons().map((salon, index) => (
              <motion.div
                key={salon.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group"
              >
                <Card className="shadow-xl border-0 bg-gradient-to-br from-white via-slate-50/30 to-white backdrop-blur-sm hover:shadow-2xl transition-all duration-500 overflow-hidden ring-1 ring-slate-200/50 hover:ring-slate-300/70">
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <CardHeader className="relative bg-gradient-to-r from-blue-50/50 via-indigo-50/50 to-purple-50/50 border-b border-slate-100/60">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <motion.h3
                          className="text-xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors duration-200"
                          whileHover={{ scale: 1.02 }}
                        >
                          {salon.name}
                        </motion.h3>
                        <div className="flex items-center gap-1 text-slate-600">
                          <MapPin className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">{salon.address}, {salon.city}</span>
                        </div>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-slate-200/60 text-slate-700 rounded-full text-sm font-bold shadow-lg hover:shadow-xl hover:bg-white/90 transition-all duration-300 ring-1 ring-white/20"
                      >
                        <Clock className="h-3 w-3 text-blue-600" />
                        {salon.openingTime} - {salon.closingTime}
                      </motion.div>
                    </div>

                    {/* Rating and Reviews */}
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-1">
                        {[1,2,3,4,5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${star <= Math.floor(salon.averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                        <span className="text-sm font-medium text-slate-700 ml-1">{salon.averageRating}</span>
                      </div>
                      <span className="text-sm text-slate-600">({salon.totalReviews} reviews)</span>
                      <span className="text-sm text-slate-600">•</span>
                      <span className="text-sm text-slate-600">{salon._count.bookings} bookings</span>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6">
                    {salon.description && (
                      <p className="text-slate-600 mb-6 leading-relaxed">{salon.description}</p>
                    )}

                    <div className="space-y-3 mb-6">
                      <h4 className="font-bold text-slate-800 flex items-center gap-2">
                        <Filter className="h-4 w-4 text-blue-600" />
                        Available Services
                      </h4>
                      {salon.services?.slice(0, 3).map((service) => (
                        <motion.div
                          key={service.id}
                          whileHover={{ scale: 1.01 }}
                          className="flex items-center justify-between bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200/60 hover:border-slate-300/80 transition-all duration-300 cursor-pointer group/service"
                        >
                          <div className="space-y-1">
                            <div className="font-semibold text-slate-800 group-hover/service:text-slate-900 transition-colors duration-200">{service.name}</div>
                            <div className="text-sm text-slate-600 flex items-center gap-3">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {service.durationMinutes} min
                              </span>
                              <span className="flex items-center gap-1">
                                ₹{service.price}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleBookClick(salon.id, service.id)}
                              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 border-0 ring-2 ring-primary/20 hover:ring-primary/40"
                            >
                              Book
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEstimateClick(salon.id, service.id)}
                              className="border-2 border-slate-200/60 bg-white/80 backdrop-blur-sm hover:bg-white/90 text-slate-700 hover:text-slate-800 font-semibold shadow-sm hover:shadow-md transform hover:scale-[1.02] transition-all duration-300 ring-1 ring-white/20 hover:ring-slate-200/40"
                            >
                              Estimate
                            </Button>
                          </div>
                        </motion.div>
                      )) || (
                        <div className="text-sm text-slate-500">Loading services...</div>
                      )}

                      {salon.services && salon.services.length > 3 && (
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          className="text-center pt-2"
                        >
                          <button
                            onClick={() => setSelectedSalon(selectedSalon === salon.id ? null : salon.id)}
                            className="bg-white/80 backdrop-blur-sm hover:bg-white/90 text-slate-700 font-semibold text-sm hover:text-slate-800 px-4 py-2 rounded-full border border-slate-200/60 hover:border-slate-300/80 shadow-sm hover:shadow-md transform hover:scale-[1.02] transition-all duration-300 ring-1 ring-white/20 hover:ring-slate-200/40"
                          >
                            {selectedSalon === salon.id ? 'Show Less Services' : `View ${salon.services.length - 3} More Services`}
                          </button>
                        </motion.div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100/60">
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        {salon.phone && (
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-1 hover:text-slate-800 transition-colors duration-200 cursor-pointer"
                          >
                            <Phone className="h-3 w-3" />
                            <span>{salon.phone}</span>
                          </motion.div>
                        )}
                        {salon.email && (
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-1 hover:text-slate-800 transition-colors duration-200 cursor-pointer"
                          >
                            <Mail className="h-3 w-3" />
                            <span>{salon.email}</span>
                          </motion.div>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/salon/${salon.slug}`)}
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:text-accent-foreground h-9 rounded-md px-3 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-700 hover:text-blue-800 font-semibold shadow-sm hover:shadow-md transform hover:scale-[1.02] transition-all duration-300 border border-blue-200/60 hover:border-blue-300/80 ring-1 ring-blue-100/50 hover:ring-blue-200/60"
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {getFilteredSalons().length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <Card className="max-w-md mx-auto shadow-xl border-0 bg-gradient-to-br from-white via-slate-50/30 to-white backdrop-blur-sm ring-1 ring-slate-200/50">
                <CardContent className="text-center py-12 px-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="text-6xl mb-6"
                  >
                    🏪
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl font-bold text-slate-800 mb-3"
                  >
                    No salons found
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-slate-600 mb-6 leading-relaxed"
                  >
                    Try adjusting your search criteria or check back later for new partner salons.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Button className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-bold shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 border-0 ring-2 ring-blue-500/20 hover:ring-blue-400/40">
                      Clear Filters
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <div className="grid gap-6">
            {getAllServiceTypes().map((serviceType, index) => {
              const salonsWithService = getSalonsByService(serviceType);
              return (
                <motion.div
                  key={serviceType}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl">{serviceType}</CardTitle>
                      <CardDescription>
                        Available at {salonsWithService.length} salon{salonsWithService.length !== 1 ? 's' : ''}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {salonsWithService.map((salon) => {
                          const service = salon.services?.find(s => s.name === serviceType);
                          return (
                            <Card key={salon.id} className="hover:shadow-md transition-shadow">
                              <CardContent className="p-4">
                                <h4 className="font-semibold mb-2">{salon.name}</h4>
                                <p className="text-sm text-muted-foreground mb-3">
                                  {salon.address}, {salon.city}
                                </p>
                                {service && (
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span>Duration:</span>
                                      <span>{service.durationMinutes} min</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span>Price:</span>
                                      <span>₹{service.price}</span>
                                    </div>
                                    <div className="flex gap-2 mt-3">
                                      <Button
                                        size="sm"
                                        className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 border-0 ring-2 ring-primary/20 hover:ring-primary/40"
                                        onClick={() => handleBookClick(salon.id, service.id)}
                                      >
                                        Book
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="flex-1 border-2 border-slate-200/60 bg-white/80 backdrop-blur-sm hover:bg-white/90 text-slate-700 hover:text-slate-800 font-semibold shadow-sm hover:shadow-md transform hover:scale-[1.02] transition-all duration-300 ring-1 ring-white/20 hover:ring-slate-200/40"
                                        onClick={() => handleEstimateClick(salon.id, service.id)}
                                      >
                                        Estimate
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {getAllServiceTypes().length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <Card className="max-w-md mx-auto shadow-xl border-0 bg-gradient-to-br from-white via-slate-50/30 to-white backdrop-blur-sm ring-1 ring-slate-200/50">
                <CardContent className="text-center py-12 px-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="text-5xl mb-6"
                  >
                    ✂️
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl font-bold text-slate-800 mb-3"
                  >
                    No services available
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-slate-600 mb-6 leading-relaxed"
                  >
                    Check back later for new services from our partner salons.
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </TabsContent>
      </Tabs>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, type: "spring" }}
        className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full shadow-xl"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.3, type: "spring" }}
        className="absolute -bottom-6 -left-6 w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full shadow-xl"
      ></motion.div>
    </div>
  );
}