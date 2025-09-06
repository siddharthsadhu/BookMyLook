import { motion } from "framer-motion";
import { useI18n } from "@/i18n";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, MapPin, Phone, Mail, Star, Search, Filter, Users } from "lucide-react";
import QueueEstimator from "@/components/estimator/QueueEstimator";

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

interface Service {
  service_id: number;
  service_name: string;
  description: string;
  duration_minutes: number;
  price: number;
}

export default function Services() {
  const { t } = useI18n();
  const [salons, setSalons] = useState<Salon[]>([]);
  const [services, setServices] = useState<{[key: number]: Service[]}>({});
  const [loading, setLoading] = useState(true);
  const [selectedSalon, setSelectedSalon] = useState<number | null>(null);
  const [showEstimator, setShowEstimator] = useState(false);
  const [estimatorData, setEstimatorData] = useState<{salonId: number, serviceId: number} | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedServiceType, setSelectedServiceType] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"salons" | "services">("salons");

  useEffect(() => {
    fetchSalons();
  }, []);

  const fetchSalons = async () => {
    try {
      const response = await fetch('/api/shops');
      const data = await response.json();
      if (data.success) {
        setSalons(data.data);
        // Fetch services for each salon
        data.data.forEach((salon: Salon) => {
          fetchServices(salon.shop_id);
        });
      }
    } catch (error) {
      console.error('Error fetching salons:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async (shopId: number) => {
    try {
      const response = await fetch(`/api/services?shop_id=${shopId}`);
      const data = await response.json();
      if (data.success) {
        setServices(prev => ({
          ...prev,
          [shopId]: data.data
        }));
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleEstimateClick = (salonId: number, serviceId: number) => {
    setEstimatorData({ salonId, serviceId });
    setShowEstimator(true);
  };

  const handleBookClick = (salonId: number, serviceId: number) => {
    // Handle booking logic
    console.log('Booking service:', serviceId, 'at salon:', salonId);
    // You can implement booking modal or redirect to booking page
  };

  // Get all unique service types
  const getAllServiceTypes = () => {
    const serviceTypes = new Set<string>();
    Object.values(services).forEach(serviceList => {
      serviceList.forEach(service => {
        serviceTypes.add(service.service_name);
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
        salon.shop_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        salon.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        salon.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by service type
    if (selectedServiceType !== "all") {
      filtered = filtered.filter(salon => {
        const salonServices = services[salon.shop_id] || [];
        return salonServices.some(service => service.service_name === selectedServiceType);
      });
    }

    return filtered;
  };

  // Get salons that offer a specific service
  const getSalonsByService = (serviceName: string) => {
    return salons.filter(salon => {
      const salonServices = services[salon.shop_id] || [];
      return salonServices.some(service => service.service_name === serviceName);
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
                key={salon.shop_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{salon.shop_name}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <MapPin className="h-4 w-4" />
                          {salon.address}, {salon.city}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {salon.opening_time} - {salon.closing_time}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {salon.description && (
                      <p className="text-sm text-muted-foreground mb-4">{salon.description}</p>
                    )}

                    <div className="space-y-3 mb-6">
                      <h4 className="font-semibold">Available Services:</h4>
                      {services[salon.shop_id]?.map((service) => (
                        <div key={service.service_id} className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
                          <div>
                            <div className="font-medium">{service.service_name}</div>
                            <div className="text-sm text-muted-foreground">
                              {service.duration_minutes} min • ₹{service.price}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleBookClick(salon.shop_id, service.service_id)}
                            >
                              Book
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEstimateClick(salon.shop_id, service.service_id)}
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
                        {salon.phone_number && (
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {salon.phone_number}
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
                        onClick={() => setSelectedSalon(selectedSalon === salon.shop_id ? null : salon.shop_id)}
                      >
                        {selectedSalon === salon.shop_id ? 'Show Less' : 'View Details'}
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
                          const service = services[salon.shop_id]?.find(s => s.service_name === serviceType);
                          return (
                            <Card key={salon.shop_id} className="hover:shadow-md transition-shadow">
                              <CardContent className="p-4">
                                <h4 className="font-semibold mb-2">{salon.shop_name}</h4>
                                <p className="text-sm text-muted-foreground mb-3">
                                  {salon.address}, {salon.city}
                                </p>
                                {service && (
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span>Duration:</span>
                                      <span>{service.duration_minutes} min</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span>Price:</span>
                                      <span>₹{service.price}</span>
                                    </div>
                                    <div className="flex gap-2 mt-3">
                                      <Button
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => handleBookClick(salon.shop_id, service.service_id)}
                                      >
                                        Book
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="flex-1"
                                        onClick={() => handleEstimateClick(salon.shop_id, service.service_id)}
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

      {/* Queue Estimator Modal */}
      {showEstimator && estimatorData && (
        <QueueEstimator
          salonId={estimatorData.salonId}
          serviceId={estimatorData.serviceId}
          onClose={() => {
            setShowEstimator(false);
            setEstimatorData(null);
          }}
        />
      )}
    </div>
  );
}