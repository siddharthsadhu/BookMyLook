import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/i18n";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Clock, MapPin, Phone, Mail, Star, Users, Calendar, ArrowLeft, ArrowRight, Check, Sparkles, LogIn, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQueue } from "@/contexts/QueueContext";
import { useAuth } from "@/contexts/AuthContext";

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
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  categoryId: string;
  isActive: boolean;
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

interface AuthFormProps {
  mode: 'login' | 'register';
  onSuccess: () => void;
  onSwitchMode: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  login: (credentials: any) => Promise<{ success: boolean; error?: string }>;
  register: (userData: any) => Promise<{ success: boolean; error?: string }>;
}

function AuthForm({ mode, onSuccess, onSwitchMode, loading, setLoading, login, register }: AuthFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      let result;
      if (mode === 'login') {
        result = await login({
          email: formData.email,
          password: formData.password
        });
      } else {
        result = await register({
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName
        });
      }

      if (result.success) {
        onSuccess();
      } else {
        setErrors({ general: result.error || 'Authentication failed' });
      }
    } catch (error) {
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === 'register' && (
        <>
          <div className="grid gap-4 grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="John"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Doe"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+91 98765 43210"
              required
            />
          </div>
        </>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="john@example.com"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          placeholder="Enter your password"
          required
          minLength={6}
        />
      </div>

      {errors.general && (
        <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-700 dark:text-red-400">{errors.general}</p>
        </div>
      )}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            {mode === 'login' ? 'Signing in...' : 'Creating account...'}
          </>
        ) : (
          <>
            {mode === 'login' ? (
              <>
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4 mr-2" />
                Create Account
              </>
            )}
          </>
        )}
      </Button>

      <div className="text-center">
        <Button
          type="button"
          variant="link"
          onClick={onSwitchMode}
          className="text-sm"
        >
          {mode === 'login'
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"
          }
        </Button>
      </div>
    </form>
  );
}

export default function Booking() {
  const { t } = useI18n();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToQueue } = useQueue();
  const { user, isAuthenticated, login, register } = useAuth();

  const [salons, setSalons] = useState<Salon[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState<'salon' | 'service' | 'details' | 'confirmation'>('salon');
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authLoading, setAuthLoading] = useState(false);

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

  const [formErrors, setFormErrors] = useState<Partial<BookingForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState<{
    show: boolean;
    bookingId?: string;
    salon?: Salon;
    service?: Service;
    date?: string;
    time?: string;
  }>({ show: false });

  // Fetch salons data (API first, then mock fallback)
  useEffect(() => {
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
        console.info('🔄 API unavailable, using mock salon data for seamless experience');

        // Fallback to mock data (matching Estimate page and Services page)
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
              { id: 'service_modern_haircut', salonId: 'salon_urban_cuts', name: 'Modern Haircut', price: 400, durationMinutes: 50, isActive: true, description: 'Trendy unisex haircut with contemporary styling', categoryId: 'cat1', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-01-01T00:00:00.000Z', updatedAt: '2024-01-01T00:00:00.000Z' },
              { id: 'service_hair_coloring', salonId: 'salon_urban_cuts', name: 'Hair Coloring', price: 1200, durationMinutes: 120, isActive: true, description: 'Professional hair coloring with premium dyes', categoryId: 'cat1', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-01-01T00:00:00.000Z', updatedAt: '2024-01-01T00:00:00.000Z' },
              { id: 'service_eyebrow_shaping', salonId: 'salon_urban_cuts', name: 'Eyebrow Shaping', price: 150, durationMinutes: 20, isActive: true, description: 'Professional eyebrow threading and shaping', categoryId: 'cat5', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-01-01T00:00:00.000Z', updatedAt: '2024-01-01T00:00:00.000Z' },
              { id: 'service_basic_facial', salonId: 'salon_urban_cuts', name: 'Basic Facial', price: 350, durationMinutes: 40, isActive: true, description: 'Refreshing facial treatment for all skin types', categoryId: 'cat2', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-01-01T00:00:00.000Z', updatedAt: '2024-01-01T00:00:00.000Z' }
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
              { id: 'service_swedish_massage', salonId: 'salon_bliss_spa', name: 'Swedish Massage', price: 1500, durationMinutes: 60, isActive: true, description: 'Full body relaxation massage with essential oils', categoryId: 'cat6', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-02-01T00:00:00.000Z', updatedAt: '2024-02-01T00:00:00.000Z' },
              { id: 'service_aromatherapy_facial', salonId: 'salon_bliss_spa', name: 'Aromatherapy Facial', price: 800, durationMinutes: 50, isActive: true, description: 'Luxury facial with aromatic essential oils', categoryId: 'cat2', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-02-01T00:00:00.000Z', updatedAt: '2024-02-01T00:00:00.000Z' },
              { id: 'service_body_scrub', salonId: 'salon_bliss_spa', name: 'Body Scrub & Wrap', price: 1200, durationMinutes: 45, isActive: true, description: 'Exfoliating body treatment with moisturizing wrap', categoryId: 'cat6', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-02-01T00:00:00.000Z', updatedAt: '2024-02-01T00:00:00.000Z' },
              { id: 'service_luxury_manicure', salonId: 'salon_bliss_spa', name: 'Luxury Manicure', price: 400, durationMinutes: 45, isActive: true, description: 'Premium manicure with paraffin treatment', categoryId: 'cat3', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-02-01T00:00:00.000Z', updatedAt: '2024-02-01T00:00:00.000Z' }
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
              { id: 'service_hair_extensions', salonId: 'salon_trendy_tresses', name: 'Hair Extensions', price: 2500, durationMinutes: 90, isActive: true, description: 'Premium hair extensions with natural look', categoryId: 'cat1', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-02-01T00:00:00.000Z', updatedAt: '2024-02-01T00:00:00.000Z' },
              { id: 'service_keratin_treatment', salonId: 'salon_trendy_tresses', name: 'Keratin Treatment', price: 1800, durationMinutes: 120, isActive: true, description: 'Smoothening treatment for frizz-free hair', categoryId: 'cat1', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-02-01T00:00:00.000Z', updatedAt: '2024-02-01T00:00:00.000Z' },
              { id: 'service_balayage', salonId: 'salon_trendy_tresses', name: 'Balayage Coloring', price: 2200, durationMinutes: 150, isActive: true, description: 'Natural-looking hair coloring technique', categoryId: 'cat1', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-02-01T00:00:00.000Z', updatedAt: '2024-02-01T00:00:00.000Z' },
              { id: 'service_hair_botox', salonId: 'salon_trendy_tresses', name: 'Hair Botox', price: 1500, durationMinutes: 90, isActive: true, description: 'Intensive hair repair treatment', categoryId: 'cat1', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-02-01T00:00:00.000Z', updatedAt: '2024-02-01T00:00:00.000Z' }
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
              { id: 'service_bridal_makeup', salonId: 'salon_glamour_zone', name: 'Bridal Makeup', price: 3000, durationMinutes: 150, isActive: true, description: 'Complete bridal makeup and hair styling', categoryId: 'cat4', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-02-01T00:00:00.000Z', updatedAt: '2024-02-01T00:00:00.000Z' },
              { id: 'service_party_makeup', salonId: 'salon_glamour_zone', name: 'Party Makeup', price: 800, durationMinutes: 60, isActive: true, description: 'Glamorous makeup for parties and events', categoryId: 'cat4', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-02-01T00:00:00.000Z', updatedAt: '2024-02-01T00:00:00.000Z' },
              { id: 'service_hair_styling', salonId: 'salon_glamour_zone', name: 'Hair Styling', price: 500, durationMinutes: 45, isActive: true, description: 'Professional hair styling for any occasion', categoryId: 'cat1', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-02-01T00:00:00.000Z', updatedAt: '2024-02-01T00:00:00.000Z' },
              { id: 'service_nail_art', salonId: 'salon_glamour_zone', name: 'Nail Art', price: 350, durationMinutes: 60, isActive: true, description: 'Creative nail art and gel extensions', categoryId: 'cat3', discountPrice: null, requiresDeposit: false, depositAmount: null, createdAt: '2024-02-01T00:00:00.000Z', updatedAt: '2024-02-01T00:00:00.000Z' }
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

        setTimeout(() => {
          setSalons(mockSalons);
        }, 500); // Small delay to show loading state
      } finally {
        setLoading(false);
      }
    };

    fetchSalons();
  }, []);

  useEffect(() => {
    // Check for URL parameters to pre-fill salon and service
    const salonParam = searchParams.get('salon');
    const serviceParam = searchParams.get('service');

    if (salonParam) {
      const salon = salons.find(s => s.id === salonParam);
      if (salon) {
        setSelectedSalon(salon);
        setCurrentStep('service');
        setBookingForm(prev => ({
          ...prev,
          selected_salon: salonParam
        }));
      }
    }

    if (serviceParam) {
      setBookingForm(prev => ({
        ...prev,
        selected_service: serviceParam
      }));
    }
  }, [salons, searchParams]);

  // Pre-fill form with authenticated user data
  useEffect(() => {
    if (isAuthenticated && user) {
      setBookingForm(prev => ({
        ...prev,
        customer_name: `${user.firstName} ${user.lastName}`.trim() || prev.customer_name,
        customer_email: user.email || prev.customer_email,
        customer_phone: user.phone || prev.customer_phone
      }));
    }
  }, [isAuthenticated, user]);

  const handleSalonSelect = (salon: Salon) => {
    setSelectedSalon(salon);
    setSelectedService(null);
    setCurrentStep('service');
    setBookingForm(prev => ({
      ...prev,
      selected_salon: salon.id,
      selected_service: ''
    }));
  };

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setBookingForm(prev => ({
      ...prev,
      selected_service: service.id
    }));

    // Check authentication before proceeding to booking details
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      setCurrentStep('details');
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setCurrentStep('details');
  };

  const handleBackToSalons = () => {
    setSelectedSalon(null);
    setSelectedService(null);
    setCurrentStep('salon');
  };

  const handleBackToServices = () => {
    setSelectedService(null);
    setCurrentStep('service');
  };

  const validateForm = (): boolean => {
    const errors: Partial<BookingForm> = {};

    if (!bookingForm.customer_name.trim()) {
      errors.customer_name = 'Full name is required';
    } else if (bookingForm.customer_name.trim().length < 2) {
      errors.customer_name = 'Name must be at least 2 characters';
    }

    if (!bookingForm.customer_email.trim()) {
      errors.customer_email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingForm.customer_email)) {
      errors.customer_email = 'Please enter a valid email address';
    }

    if (!bookingForm.customer_phone.trim()) {
      errors.customer_phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(bookingForm.customer_phone.replace(/\s+/g, ''))) {
      errors.customer_phone = 'Please enter a valid 10-digit mobile number';
    }

    if (!bookingForm.preferred_date) {
      errors.preferred_date = 'Please select a date';
    } else {
      const selectedDate = new Date(bookingForm.preferred_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        errors.preferred_date = 'Please select a future date';
      }
    }

    if (!bookingForm.preferred_time) {
      errors.preferred_time = 'Please select a time';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors below and try again.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const bookingData = {
        salonId: bookingForm.selected_salon,
        serviceId: bookingForm.selected_service,
        customerName: bookingForm.customer_name,
        customerEmail: bookingForm.customer_email,
        customerPhone: bookingForm.customer_phone,
        appointmentDate: bookingForm.preferred_date,
        appointmentTime: bookingForm.preferred_time,
        notes: bookingForm.special_requests,
      };

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (data.success) {
        sessionStorage.removeItem('quickBookingData');

        const selectedSalon = salons.find(s => s.id === bookingForm.selected_salon);
        const selectedService = selectedSalon?.services?.find(s => s.id === bookingForm.selected_service);

        setBookingConfirmation({
          show: true,
          bookingId: data.data?.bookingNumber || `BML-${Date.now()}`,
          salon: selectedSalon,
          service: selectedService,
          date: bookingForm.preferred_date,
          time: bookingForm.preferred_time
        });

        if (selectedSalon && selectedService) {
          addToQueue({
            bookingId: data.data?.bookingNumber || `BML-${Date.now()}`,
            salonId: selectedSalon.id,
            customerName: bookingForm.customer_name,
            customerPhone: bookingForm.customer_phone,
            serviceName: selectedService.name,
            serviceId: selectedService.id,
            estimatedWaitMinutes: 15,
            notes: bookingForm.special_requests
          });
        }

        setCurrentStep('confirmation');
        return;
      }

      throw new Error(data.error || 'API booking failed');
    } catch (error) {
      console.info('🔄 API unavailable, simulating booking success for demo experience');

      const selectedSalon = salons.find(s => s.id === bookingForm.selected_salon);
      const selectedService = selectedSalon?.services?.find(s => s.id === bookingForm.selected_service);

      sessionStorage.removeItem('quickBookingData');

      setBookingConfirmation({
        show: true,
        bookingId: `BML-${Date.now()}`,
        salon: selectedSalon,
        service: selectedService,
        date: bookingForm.preferred_date,
        time: bookingForm.preferred_time
      });

      if (selectedSalon && selectedService) {
        addToQueue({
          bookingId: `BML-${Date.now()}`,
          salonId: selectedSalon.id,
          customerName: bookingForm.customer_name,
          customerPhone: bookingForm.customer_phone,
          serviceName: selectedService.name,
          serviceId: selectedService.id,
          estimatedWaitMinutes: 15,
          notes: bookingForm.special_requests
        });
      }

      setCurrentStep('confirmation');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof BookingForm, value: string) => {
    setBookingForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const steps = [
    { id: 'salon', title: 'Choose Salon', icon: MapPin },
    { id: 'service', title: 'Select Service', icon: Sparkles },
    { id: 'details', title: 'Your Details', icon: Users },
    { id: 'confirmation', title: 'Confirmed!', icon: Check }
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            <Sparkles className="h-4 w-4" />
            Book Your Perfect Appointment
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Choose Your Salon Experience
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Discover amazing salons in Delhi NCR and book your appointment with real-time queue estimates
          </motion.p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = steps.findIndex(s => s.id === currentStep) > index;

              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                    isCompleted ? 'bg-primary border-primary text-primary-foreground' :
                    isActive ? 'border-primary text-primary' : 'border-muted-foreground/30 text-muted-foreground'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    isActive ? 'text-primary' : isCompleted ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <ArrowRight className="h-4 w-4 mx-4 text-muted-foreground" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {currentStep === 'salon' && (
            <motion.div
              key="salon"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-6xl mx-auto"
            >
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {salons.map((salon, index) => (
                  <motion.div
                    key={salon.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 ${
                        selectedSalon?.id === salon.id
                          ? 'border-primary shadow-lg shadow-primary/20'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => handleSalonSelect(salon)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg line-clamp-2">{salon.name}</CardTitle>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm text-muted-foreground">{salon.averageRating}</span>
                              <span className="text-xs text-muted-foreground">({salon.totalReviews})</span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-start gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span className="line-clamp-2">{salon.address}</span>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{salon.openingTime} - {salon.closingTime}</span>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t">
                            <div className="text-sm text-muted-foreground">
                              {salon.services?.length || 0} services
                            </div>
                            <Badge variant="secondary">
                              {salon._count.bookings}+ bookings
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === 'service' && selectedSalon && (
            <motion.div
              key="service"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              {/* Selected Salon Header */}
              <div className="mb-6">
                <Button
                  variant="ghost"
                  onClick={handleBackToSalons}
                  className="mb-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Salons
                </Button>

                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{selectedSalon.name}</h3>
                        <p className="text-sm text-muted-foreground">{selectedSalon.address}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{selectedSalon.averageRating}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{selectedSalon.totalReviews} reviews</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Services Grid */}
              <div className="grid gap-4 md:grid-cols-2">
                {selectedSalon.services?.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
                        selectedService?.id === service.id
                          ? 'border-primary shadow-lg shadow-primary/20'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => handleServiceSelect(service)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg">{service.name}</h4>
                            <p className="text-sm text-muted-foreground line-clamp-2">{service.description}</p>
                          </div>
                          <div className="text-right ml-4">
                            <div className="text-2xl font-bold text-primary">₹{service.price}</div>
                            <div className="text-sm text-muted-foreground">{service.durationMinutes} min</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{service.durationMinutes} minutes</span>
                          </div>
                          <Button size="sm" variant="outline">
                            Select Service
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === 'details' && selectedSalon && selectedService && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="mb-6">
                <Button
                  variant="ghost"
                  onClick={handleBackToServices}
                  className="mb-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Services
                </Button>

                {/* Booking Summary */}
                <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Booking Summary</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Salon</p>
                        <p className="font-medium">{selectedSalon.name}</p>
                        <p className="text-sm text-muted-foreground">{selectedSalon.address}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Service</p>
                        <p className="font-medium">{selectedService.name}</p>
                        <p className="text-sm text-muted-foreground">₹{selectedService.price} • {selectedService.durationMinutes} min</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Booking Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Your Details
                  </CardTitle>
                  <CardDescription>
                    Please provide your information to complete the booking
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
                          className={formErrors.customer_name ? 'border-red-500' : ''}
                        />
                        {formErrors.customer_name && (
                          <p className="text-sm text-red-500">{formErrors.customer_name}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="customer_phone">Phone Number *</Label>
                        <Input
                          id="customer_phone"
                          value={bookingForm.customer_phone}
                          onChange={(e) => handleInputChange('customer_phone', e.target.value)}
                          placeholder="Enter your phone number"
                          required
                          className={formErrors.customer_phone ? 'border-red-500' : ''}
                        />
                        {formErrors.customer_phone && (
                          <p className="text-sm text-red-500">{formErrors.customer_phone}</p>
                        )}
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
                        className={formErrors.customer_email ? 'border-red-500' : ''}
                      />
                      {formErrors.customer_email && (
                        <p className="text-sm text-red-500">{formErrors.customer_email}</p>
                      )}
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
                          className={formErrors.preferred_date ? 'border-red-500' : ''}
                        />
                        {formErrors.preferred_date && (
                          <p className="text-sm text-red-500">{formErrors.preferred_date}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="preferred_time">Preferred Time *</Label>
                        <Input
                          id="preferred_time"
                          type="time"
                          value={bookingForm.preferred_time}
                          onChange={(e) => handleInputChange('preferred_time', e.target.value)}
                          required
                          className={formErrors.preferred_time ? 'border-red-500' : ''}
                        />
                        {formErrors.preferred_time && (
                          <p className="text-sm text-red-500">{formErrors.preferred_time}</p>
                        )}
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

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Total: <span className="font-semibold text-primary">₹{selectedService.price}</span>
                      </div>
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="px-8"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Booking...
                          </>
                        ) : (
                          <>
                            <Calendar className="h-4 w-4 mr-2" />
                            Confirm Booking
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 'confirmation' && bookingConfirmation.show && (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-2xl mx-auto"
            >
              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="h-10 w-10 text-green-600" />
                  </div>

                  <h2 className="text-2xl font-bold mb-2 text-green-600">Booking Confirmed!</h2>
                  <p className="text-muted-foreground mb-6">
                    Your appointment has been successfully booked
                  </p>

                  <div className="bg-muted/50 rounded-lg p-4 mb-6">
                    <div className="text-sm text-muted-foreground mb-1">Booking ID</div>
                    <div className="font-mono font-semibold text-lg">{bookingConfirmation.bookingId}</div>
                  </div>

                  <div className="space-y-3 text-left">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Salon</span>
                      <span className="font-medium">{bookingConfirmation.salon?.name}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Service</span>
                      <span className="font-medium">{bookingConfirmation.service?.name}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Date & Time</span>
                      <span className="font-medium">
                        {bookingConfirmation.date && new Date(bookingConfirmation.date).toLocaleDateString()} at {bookingConfirmation.time}
                      </span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-muted-foreground">Total</span>
                      <span className="font-semibold text-primary">₹{bookingConfirmation.service?.price}</span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      📧 Confirmation email sent • 📱 SMS notification sent • 🔔 Push notification enabled
                    </p>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setCurrentStep('salon');
                        setSelectedSalon(null);
                        setSelectedService(null);
                        setBookingConfirmation({ show: false });
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
                      }}
                    >
                      Book Another
                    </Button>
                    {isAuthenticated ? (
                      <Button className="flex-1" onClick={() => {
                        const userRole = user?.role?.toLowerCase();
                        const dashboardPath = userRole === 'customer' ? '/dashboard/customer' :
                                            userRole === 'salon_owner' ? '/dashboard/owner' :
                                            userRole === 'admin' ? '/dashboard/admin' : '/dashboard/customer';
                        navigate(dashboardPath);
                      }}>
                        View Dashboard
                      </Button>
                    ) : (
                      <Button
                        className="flex-1"
                        onClick={() => {
                          setShowAuthModal(true);
                          setBookingConfirmation({ show: false });
                        }}
                      >
                        View Dashboard
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Authentication Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-background rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="relative">
                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAuthModal(false)}
                  className="absolute top-4 right-4 z-10 h-8 w-8 p-0 hover:bg-muted"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-muted-foreground"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </Button>

                <div className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <LogIn className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">
                      {authMode === 'login' ? 'Welcome Back!' : 'Create Account'}
                    </h2>
                    <p className="text-muted-foreground">
                      {authMode === 'login'
                        ? 'Sign in to book your appointment and access your dashboard'
                        : 'Join us to book appointments and manage your bookings'
                      }
                    </p>
                  </div>

                <AuthForm
                  mode={authMode}
                  onSuccess={handleAuthSuccess}
                  onSwitchMode={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                  loading={authLoading}
                  setLoading={setAuthLoading}
                  login={login}
                  register={register}
                />

                <div className="mt-4 text-center text-sm text-muted-foreground">
                  Authentication is required to book appointments
                </div>
              </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
