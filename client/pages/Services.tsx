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
          {t("services_title")}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover our partner salons and book your next appointment with real-time queue estimates.
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search salons by name, address, or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedServiceType} onValueChange={setSelectedServiceType}>
            <SelectTrigger className="w-full md:w-64">
              <SelectValue placeholder="Filter by service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              {getAllServiceTypes().map((serviceType) => (
                <SelectItem key={serviceType} value={serviceType}>
                  {serviceType}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* View Mode Toggle */}
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "salons" | "services")}>
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="salons">Browse by Salons</TabsTrigger>
            <TabsTrigger value="services">Browse by Services</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Tabs value={viewMode}>
        <TabsContent value="salons" className="space-y-6">
          <div className="grid gap-8 lg:grid-cols-2">
            {getFilteredSalons().map((salon, index) => (
              <motion.div
                key={salon.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{salon.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <MapPin className="h-4 w-4" />
                          {salon.address}, {salon.city}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {salon.openingTime} - {salon.closingTime}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {salon.description && (
                      <p className="text-sm text-muted-foreground mb-4">{salon.description}</p>
                    )}

                    <div className="space-y-3 mb-6">
                      <h4 className="font-semibold">Available Services:</h4>
                      {salon.services?.map((service) => (
                        <div key={service.id} className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
                          <div>
                            <div className="font-medium">{service.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {service.durationMinutes} min • ₹{service.price}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleBookClick(salon.id, service.id)}
                            >
                              Book
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEstimateClick(salon.id, service.id)}
                            >
                              Estimate
                            </Button>
                          </div>
                        </div>
                      )) || (
                        <div className="text-sm text-muted-foreground">Loading services...</div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {salon.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {salon.phone}
                          </span>
                        )}
                        {salon.email && (
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {salon.email}
                          </span>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedSalon(selectedSalon === salon.id ? null : salon.id)}
                      >
                        {selectedSalon === salon.id ? 'Show Less' : 'View Details'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {getFilteredSalons().length === 0 && (
            <Card>
              <CardContent className="text-center py-16">
                <div className="text-6xl mb-4">🏪</div>
                <h3 className="text-xl font-semibold mb-2">No salons found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or check back later for new partner salons.
                </p>
              </CardContent>
            </Card>
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
                                        className="flex-1"
                                        onClick={() => handleBookClick(salon.id, service.id)}
                                      >
                                        Book
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="flex-1"
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
            <Card>
              <CardContent className="text-center py-16">
                <div className="text-6xl mb-4">✂️</div>
                <h3 className="text-xl font-semibold mb-2">No services available</h3>
                <p className="text-muted-foreground">
                  Check back later for new services from our partner salons.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}