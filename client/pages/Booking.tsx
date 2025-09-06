import { motion } from "framer-motion";
import { useI18n } from "@/i18n";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Clock, MapPin, Phone, Mail, Star, Users, Calendar } from "lucide-react";

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

interface BookingForm {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  selected_salon: string;
  selected_service: string;
  preferred_date: string;
  preferred_time: string;
  special_requests: string;
}

export default function Booking() {
  const { t } = useI18n();
  const [salons, setSalons] = useState<Salon[]>([]);
  const [services, setServices] = useState<{[key: number]: Service[]}>({});
  const [loading, setLoading] = useState(true);
  const [selectedSalonId, setSelectedSalonId] = useState<number | null>(null);
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    selected_salon: '',
    selected_service: '',
    preferred_date: '',
    preferred_time: '',
    special_requests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSalonChange = (salonId: string) => {
    setSelectedSalonId(parseInt(salonId));
    setBookingForm(prev => ({
      ...prev,
      selected_salon: salonId,
      selected_service: ''
    }));
  };

  const handleServiceChange = (serviceId: string) => {
    setBookingForm(prev => ({
      ...prev,
      selected_service: serviceId
    }));
  };

  const handleInputChange = (field: keyof BookingForm, value: string) => {
    setBookingForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would typically send the booking data to your API
      console.log('Booking data:', bookingForm);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      alert('Booking submitted successfully! You will receive a confirmation email shortly.');
      
      // Reset form
      setBookingForm({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        selected_salon: '',
        selected_service: '',
        preferred_date: '',
        preferred_time: '',
        special_requests: ''
      });
      setSelectedSalonId(null);
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
          Book Your Appointment
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose your preferred salon and service, then book your appointment with real-time queue estimates.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Salon Selection */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Available Salons</h2>
          <div className="space-y-4">
            {salons.map((salon, index) => (
              <motion.div
                key={salon.shop_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedSalonId === salon.shop_id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => handleSalonChange(salon.shop_id.toString())}
                >
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
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Available Services:</h4>
                      <div className="grid gap-2">
                        {services[salon.shop_id]?.map((service) => (
                          <div key={service.service_id} className="flex items-center justify-between bg-muted/50 rounded-lg p-2">
                            <div>
                              <div className="font-medium text-sm">{service.service_name}</div>
                              <div className="text-xs text-muted-foreground">
                                {service.duration_minutes} min • ₹{service.price}
                              </div>
                            </div>
                          </div>
                        )) || (
                          <div className="text-sm text-muted-foreground">Loading services...</div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
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
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Booking Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
              <CardDescription>
                Fill in your details to complete the booking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="customer_name">Full Name *</Label>
                    <Input
                      id="customer_name"
                      value={bookingForm.customer_name}
                      onChange={(e) => handleInputChange('customer_name', e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customer_phone">Phone Number *</Label>
                    <Input
                      id="customer_phone"
                      value={bookingForm.customer_phone}
                      onChange={(e) => handleInputChange('customer_phone', e.target.value)}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customer_email">Email Address *</Label>
                  <Input
                    id="customer_email"
                    type="email"
                    value={bookingForm.customer_email}
                    onChange={(e) => handleInputChange('customer_email', e.target.value)}
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Select Service *</Label>
                  <Select
                    value={bookingForm.selected_service}
                    onValueChange={handleServiceChange}
                    disabled={!selectedSalonId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedSalonId && services[selectedSalonId]?.map((service) => (
                        <SelectItem key={service.service_id} value={service.service_id.toString()}>
                          {service.service_name} - {service.duration_minutes} min - ₹{service.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="preferred_date">Preferred Date *</Label>
                    <Input
                      id="preferred_date"
                      type="date"
                      value={bookingForm.preferred_date}
                      onChange={(e) => handleInputChange('preferred_date', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preferred_time">Preferred Time *</Label>
                    <Input
                      id="preferred_time"
                      type="time"
                      value={bookingForm.preferred_time}
                      onChange={(e) => handleInputChange('preferred_time', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="special_requests">Special Requests</Label>
                  <Textarea
                    id="special_requests"
                    value={bookingForm.special_requests}
                    onChange={(e) => handleInputChange('special_requests', e.target.value)}
                    placeholder="Any special requests or notes..."
                    rows={3}
                  />
                </div>

                <Separator />

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting || !selectedSalonId || !bookingForm.selected_service}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Appointment
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {salons.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🏪</div>
          <h3 className="text-xl font-semibold mb-2">No salons available</h3>
          <p className="text-muted-foreground">Check back later for new partner salons.</p>
        </div>
      )}
    </div>
  );
}
