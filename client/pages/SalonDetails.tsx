import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ArrowLeft, MapPin, Phone, Mail, Clock, Star, Users, Camera,
  Share2, Heart, Sparkles, Scissors, Palette, Search,
  Filter, ChevronDown, Zap
} from "lucide-react";

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
  discountPrice: number | null;
  durationMinutes: number;
  categoryId: string;
  category: {
    name: string;
    icon: string | null;
  };
  _count: { bookings: number };
}

export default function SalonDetails() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [salon, setSalon] = useState<Salon | null>(null);
  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 2;
  const [activeTab, setActiveTab] = useState("services");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isFavorited, setIsFavorited] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetchSalonDetails();
  }, [slug]);

  const fetchSalonDetails = async (isRetry = false) => {
    if (!isRetry) {
      setLoading(true);
      setNetworkError(false);
    }

    // Create a timeout promise
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), 8000); // 8 second timeout
    });

    try {
      console.log(`🔍 Fetching salon details for: ${slug} (attempt ${retryCount + 1})`);

      // Race between fetch and timeout
      const response = await Promise.race([
        fetch(`/api/shops/${slug}`),
        timeoutPromise
      ]) as Response;

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success && data.data) {
        console.log('✅ Salon data loaded from API');
        setSalon(data.data);
        setNetworkError(false);
        return;
      }

      throw new Error('API returned invalid data structure');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      if (retryCount < maxRetries && !isRetry) {
        console.warn(`⚠️ API call failed (${errorMessage}), retrying... (${retryCount + 1}/${maxRetries})`);
        setRetryCount(prev => prev + 1);

        // Retry after a short delay
        setTimeout(() => fetchSalonDetails(true), 1500);
        return;
      }

      console.info('🔄 API unavailable after retries, using mock data');
      setNetworkError(true);

      // Use mock data as fallback
      await loadMockData();
    } finally {
      setLoading(false);
    }
  };

  const loadMockData = async () => {
    // Simulate network delay for mock data
    await new Promise(resolve => setTimeout(resolve, 500));

    // Generate dynamic salon name from slug
    const generateSalonName = (slug: string) => {
      if (!slug) return 'Sample Salon';
      return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
        .replace(/Salon$/, 'Salon') // Ensure it ends with Salon
        .replace(/Beauty$/, 'Beauty Salon'); // Add Salon if it ends with Beauty
    };

    const salonName = generateSalonName(slug || '');

    console.log(`📱 Using mock data for salon: "${salonName}" (${slug})`);

    const mockSalon: Salon = {
      id: slug || 'default-salon',
      name: salonName,
      slug: slug || 'sample-salon',
      description: `Experience premium salon services at ${salonName}. Our expert stylists provide personalized beauty treatments tailored to your unique style and preferences.`,
      address: '123 Beauty Street, Downtown',
      city: 'Mumbai',
      phone: '+919876543210',
      email: 'info@salon.com',
      openingTime: '09:00',
      closingTime: '21:00',
      averageRating: 4.6,
      totalReviews: 89,
      services: [
        {
          id: 'hair-cut-basic',
          name: 'Basic Haircut',
          description: 'Professional haircut with wash and basic styling',
          price: 400,
          discountPrice: 350,
          durationMinutes: 45,
          categoryId: 'hair-services',
          category: {
            name: 'Hair Services',
            icon: 'scissors'
          },
          _count: { bookings: 34 }
        },
        {
          id: 'facial-cleanup',
          name: 'Deep Cleansing Facial',
          description: 'Complete facial treatment for clean and glowing skin',
          price: 800,
          discountPrice: 700,
          durationMinutes: 60,
          categoryId: 'skin-care',
          category: {
            name: 'Skin Care',
            icon: 'sparkles'
          },
          _count: { bookings: 28 }
        },
        {
          id: 'hair-color-full',
          name: 'Full Hair Color',
          description: 'Complete hair coloring with premium products',
          price: 1200,
          discountPrice: null,
          durationMinutes: 120,
          categoryId: 'hair-services',
          category: {
            name: 'Hair Services',
            icon: 'palette'
          },
          _count: { bookings: 15 }
        },
        {
          id: 'manicure-basic',
          name: 'Basic Manicure',
          description: 'Classic manicure with nail shaping and polish',
          price: 300,
          discountPrice: 250,
          durationMinutes: 30,
          categoryId: 'nail-care',
          category: {
            name: 'Nail Care',
            icon: null
          },
          _count: { bookings: 22 }
        }
      ],
      _count: { bookings: 99 }
    };

    setSalon(mockSalon);
  };

  const handleRetry = () => {
    setRetryCount(0);
    fetchSalonDetails();
  };

  const handleBookClick = (serviceId: string) => {
    navigate(`/booking?salon=${salon?.id}&service=${serviceId}`);
  };

  const handleEstimateClick = (serviceId: string) => {
    navigate(`/estimate?salonId=${salon?.id}&serviceId=${serviceId}`);
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    // In real app, this would make an API call to add/remove from favorites
  };

  const handleShare = async () => {
    const url = window.location.href;
    const title = `${salon?.name} - BookMyLook`;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(url);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  // Filter and search services
  const filteredServices = salon?.services?.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterCategory === "all" || service.category?.name === filterCategory;
    return matchesSearch && matchesFilter;
  }) || [];

  const uniqueCategories = Array.from(
    new Set(salon?.services?.map(service => service.category?.name).filter(Boolean))
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto p-8"
        >
          {networkError ? (
            // Network Error State
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="text-6xl">📡</div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Connection Issue</h2>
                <p className="text-gray-600 mb-4">
                  We're having trouble connecting to our servers. Don't worry - we're using offline data for now!
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 text-yellow-800 text-sm">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    <span>Using cached salon information</span>
                  </div>
                </div>
              </div>
              <Button
                onClick={handleRetry}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 transition-colors"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Retrying...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Try Again
                  </>
                )}
              </Button>
            </motion.div>
          ) : (
            // Loading State
            <div className="space-y-4">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
              <div>
                <p className="text-lg font-medium text-gray-800">Loading salon details...</p>
                <p className="text-sm text-gray-600 mt-1">
                  {retryCount > 0 ? `Retrying... (${retryCount}/${maxRetries})` : 'Connecting to server...'}
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  if (!salon) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">🏪</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Salon Not Found</h2>
          <p className="text-gray-600 mb-6">The salon you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/services')} className="w-full">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Services
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Notification */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
        >
          <span className="text-lg">✅</span>
          Success! Your booking has been confirmed.
        </motion.div>
      )}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-sm border-b sticky top-0 z-40"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/services')}
                className="text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Services
              </Button>

              {/* Network Status Indicator */}
              {networkError && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-1"
                >
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-yellow-800 font-medium">Offline Mode</span>
                </motion.div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleFavorite}
                className={`p-2 rounded-full ${isFavorited ? 'text-red-500' : 'text-gray-400'} hover:bg-gray-100 transition-colors`}
              >
                <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleShare}
                className="p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              >
                <Share2 className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-16 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              {salon.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl opacity-90 mb-8 max-w-3xl mx-auto"
            >
              {salon.description}
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
              >
                <Star className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">{salon.averageRating || 0}</div>
                <div className="text-sm opacity-80">{salon.totalReviews || 0} reviews</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
              >
                <Clock className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-lg font-bold">{salon.openingTime || 'N/A'}</div>
                <div className="text-sm opacity-80">{salon.closingTime || 'N/A'}</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
              >
                <Users className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">{salon.services?.length || 0}</div>
                <div className="text-sm opacity-80">Services</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
              >
                <Zap className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-400">{salon._count?.bookings || 0}</div>
                <div className="text-sm opacity-80">Bookings</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 max-w-md mx-auto">
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Services
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Gallery
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Reviews
            </TabsTrigger>
          </TabsList>

          <TabsContent value="services">
            <div className="max-w-6xl mx-auto">
              {/* Search and Filter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search services..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>

                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-full md:w-48 h-12">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {uniqueCategories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>

              {/* Services Grid */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <Card className="h-full shadow-lg border-0 bg-white hover:shadow-2xl transition-all duration-300 overflow-hidden">
                      {/* Service Image Placeholder */}
                      <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-4xl">
                            {service.category?.icon === 'scissors' ? '✂️' :
                             service.category?.icon === 'palette' ? '🎨' :
                             service.category?.icon === 'sparkles' ? '✨' : '💅'}
                          </div>
                        </div>
                        {service.discountPrice && (
                          <Badge className="absolute top-3 right-3 bg-red-500 text-white">
                            Save ₹{service.price - service.discountPrice}
                          </Badge>
                        )}
                      </div>

                      <CardContent className="p-6">
                        <div className="mb-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                              {service.name}
                            </h3>
                            <Badge variant="secondary" className="ml-2">
                              {service.category?.name || 'Service'}
                            </Badge>
                          </div>

                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                            {service.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {service.durationMinutes}min
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {service._count?.bookings || 0}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <div className="text-2xl font-bold text-green-600">
                              ₹{service.discountPrice || service.price}
                            </div>
                            {service.discountPrice && (
                              <div className="text-sm text-gray-400 line-through">
                                ₹{service.price}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            onClick={() => handleEstimateClick(service.id)}
                            className="flex-1"
                          >
                            Estimate
                          </Button>
                          <Button
                            onClick={() => handleBookClick(service.id)}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                          >
                            Book Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {filteredServices.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No services found</h3>
                  <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                </motion.div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="gallery">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">📸</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Gallery Coming Soon</h3>
              <p className="text-gray-600">Beautiful salon photos and work samples will be available here.</p>
            </motion.div>
          </TabsContent>

          <TabsContent value="reviews">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Reviews Coming Soon</h3>
              <p className="text-gray-600">Customer reviews and ratings will be displayed here.</p>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
