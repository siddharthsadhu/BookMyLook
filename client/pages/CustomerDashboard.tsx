import { motion } from "framer-motion";
import { useI18n } from "@/i18n";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useRealTime } from "@/contexts/RealTimeContext";
import {
  Clock, MapPin, Phone, Calendar, Star, Users, AlertCircle, CheckCircle,
  TrendingUp, DollarSign, CalendarDays, Target, Gift, Award, BarChart3,
  PieChart, Activity, Zap, Heart, ShoppingBag, Crown, MessageSquare, Shield
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Booking {
  booking_id: number;
  salon_name: string;
  service_name: string;
  appointment_date: string;
  appointment_time: string;
  status: 'upcoming' | 'in_progress' | 'completed' | 'cancelled';
  queue_position?: number;
  estimated_wait?: number;
  price: number;
  salon_address: string;
  salon_phone: string;
  booking_number?: string;
  created_at?: string;
  notes?: string;
}

interface Review {
  review_id: number;
  salon_name: string;
  service_name: string;
  rating: number;
  comment: string;
  review_date: string;
  booking_number?: string;
  helpful_votes?: number;
  response?: string;
  responded_at?: string;
}

interface CustomerAnalytics {
  totalSpent: number;
  monthlySpending: number;
  averageVisitValue: number;
  loyaltyPoints: number;
  totalBookings: number;
  upcomingBookings: number;
  completedBookings: number;
  favoriteServices: Array<{ name: string; count: number; totalSpent: number }>;
  peakBookingTimes: Array<{ time: string; frequency: number }>;
  preferredSalons: Array<{ name: string; visits: number; totalSpent: number }>;
  spendingTrends: Array<{ month: string; amount: number }>;
  loyaltyTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  pointsToNextTier: number;
  rewardsAvailable: Array<{ name: string; pointsRequired: number; value: number }>;
}

export default function CustomerDashboard() {
  const { t } = useI18n();
  const { user } = useAuth();
  const { isConnected } = useRealTime();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [analytics, setAnalytics] = useState<CustomerAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  // Real-time event listeners
  useEffect(() => {
    const handleBookingCreated = (event: any) => {
      const { booking } = event.detail;
      console.log('📡 Customer dashboard: New booking created', booking);

      // Add the new booking to the list
      const newBooking: Booking = {
        booking_id: booking.id,
        salon_name: booking.salon?.name || 'New Salon',
        service_name: booking.service?.name || 'New Service',
        appointment_date: booking.appointmentDate,
        appointment_time: booking.appointmentTime,
        status: 'upcoming',
        price: booking.totalAmount || 0,
        salon_address: booking.salon?.address || '',
        salon_phone: booking.salon?.phone || ''
      };

      setBookings(prev => [newBooking, ...prev]);
    };

    const handleBookingUpdated = (event: any) => {
      const { booking } = event.detail;
      console.log('📡 Customer dashboard: Booking updated', booking);

      // Update the booking in the list
      setBookings(prev => prev.map(b =>
        b.booking_id === booking.id
          ? { ...b, status: booking.status.toLowerCase() as any }
          : b
      ));
    };

    const handleBookingCancelled = (event: any) => {
      const { booking } = event.detail;
      console.log('📡 Customer dashboard: Booking cancelled', booking);

      // Update the booking status to cancelled
      setBookings(prev => prev.map(b =>
        b.booking_id === booking.id
          ? { ...b, status: 'cancelled' }
          : b
      ));
    };

    // Add event listeners
    window.addEventListener('bookingCreated', handleBookingCreated);
    window.addEventListener('bookingUpdated', handleBookingUpdated);
    window.addEventListener('bookingCancelled', handleBookingCancelled);

    return () => {
      window.removeEventListener('bookingCreated', handleBookingCreated);
      window.removeEventListener('bookingUpdated', handleBookingUpdated);
      window.removeEventListener('bookingCancelled', handleBookingCancelled);
    };
  }, []);

  useEffect(() => {
    // Simulate loading comprehensive user data
    setTimeout(() => {
      setBookings([
        {
          booking_id: 1,
          salon_name: "The Gents Cut",
          service_name: "Men's Haircut",
          appointment_date: "2024-01-20",
          appointment_time: "14:30",
          status: 'upcoming',
          queue_position: 2,
          estimated_wait: 15,
          price: 25,
          salon_address: "123 Main Street, Anytown",
          salon_phone: "555-123-4567",
          booking_number: "BML-GC-001",
          created_at: "2024-01-15T10:30:00Z",
          notes: "Wants modern fade haircut"
        },
        {
          booking_id: 2,
          salon_name: "Style Studio",
          service_name: "Beard Trim",
          appointment_date: "2024-01-18",
          appointment_time: "10:00",
          status: 'completed',
          price: 15,
          salon_address: "456 Oak Avenue, Anytown",
          salon_phone: "555-987-6543",
          booking_number: "BML-SS-001",
          created_at: "2024-01-16T14:20:00Z",
          notes: "Full beard trim and styling"
        },
        {
          booking_id: 3,
          salon_name: "BeautyHub",
          service_name: "Facial Treatment",
          appointment_date: "2024-01-10",
          appointment_time: "16:00",
          status: 'completed',
          price: 120,
          salon_address: "789 Beauty Lane, Anytown",
          salon_phone: "555-456-7890",
          booking_number: "BML-BH-001",
          created_at: "2024-01-08T09:15:00Z",
          notes: "Anti-aging facial treatment"
        },
        {
          booking_id: 4,
          salon_name: "Gentlemen's Zone",
          service_name: "Hair Wash & Blow Dry",
          appointment_date: "2024-01-05",
          appointment_time: "11:30",
          status: 'completed',
          price: 35,
          salon_address: "321 Style Street, Anytown",
          salon_phone: "555-321-0987",
          booking_number: "BML-GZ-001",
          created_at: "2024-01-03T16:45:00Z",
          notes: "Complete hair wash and styling"
        },
        {
          booking_id: 5,
          salon_name: "StyleMaster",
          service_name: "Hair Color & Cut",
          appointment_date: "2024-01-02",
          appointment_time: "13:00",
          status: 'cancelled',
          price: 85,
          salon_address: "654 Fashion Ave, Anytown",
          salon_phone: "555-654-3210",
          booking_number: "BML-SM-001",
          created_at: "2023-12-30T11:20:00Z",
          notes: "Dark brown hair color with layer cut"
        }
      ]);

      setReviews([
        {
          review_id: 1,
          salon_name: "Style Studio",
          service_name: "Beard Trim",
          rating: 5,
          comment: "Excellent service! The barber was very professional and the trim was perfect. Highly recommend for anyone looking for quality grooming services.",
          review_date: "2024-01-18",
          booking_number: "BML-SS-001",
          helpful_votes: 12,
          response: "Thank you for your kind words! We're glad you enjoyed your experience.",
          responded_at: "2024-01-19"
        },
        {
          review_id: 2,
          salon_name: "BeautyHub",
          service_name: "Facial Treatment",
          rating: 4,
          comment: "Great facial treatment, very relaxing environment. The therapist was skilled but the room could have been a bit warmer.",
          review_date: "2024-01-12",
          booking_number: "BML-BH-001",
          helpful_votes: 8
        },
        {
          review_id: 3,
          salon_name: "Gentlemen's Zone",
          service_name: "Hair Wash & Blow Dry",
          rating: 5,
          comment: "Outstanding service! The stylist took time to understand exactly what I wanted and delivered beyond expectations.",
          review_date: "2024-01-06",
          booking_number: "BML-GZ-001",
          helpful_votes: 15,
          response: "We're thrilled you loved your experience! Thank you for choosing us.",
          responded_at: "2024-01-07"
        },
        {
          review_id: 4,
          salon_name: "StyleMaster",
          service_name: "Hair Color & Cut",
          rating: 3,
          comment: "The color turned out different than expected, but the cut was good. Communication about color expectations could be better.",
          review_date: "2024-01-04",
          booking_number: "BML-SM-001",
          helpful_votes: 3
        }
      ]);

      // Load comprehensive analytics data
      setAnalytics({
        totalSpent: 12450,
        monthlySpending: 1245,
        averageVisitValue: 890,
        loyaltyPoints: 2340,
        totalBookings: 14,
        upcomingBookings: 2,
        completedBookings: 12,
        favoriteServices: [
          { name: "Hair Cut", count: 8, totalSpent: 2400 },
          { name: "Facial", count: 5, totalSpent: 2250 },
          { name: "Beard Trim", count: 4, totalSpent: 800 }
        ],
        peakBookingTimes: [
          { time: "Sat 2-4PM", frequency: 6 },
          { time: "Wed 10-12PM", frequency: 4 },
          { time: "Fri 5-7PM", frequency: 3 }
        ],
        preferredSalons: [
          { name: "StyleMaster", visits: 12, totalSpent: 4800 },
          { name: "BeautyHub", visits: 8, totalSpent: 3600 },
          { name: "Gentlemen's Zone", visits: 6, totalSpent: 2400 }
        ],
        spendingTrends: [
          { month: "Jan", amount: 1200 },
          { month: "Feb", amount: 1350 },
          { month: "Mar", amount: 1100 },
          { month: "Apr", amount: 1450 },
          { month: "May", amount: 1600 },
          { month: "Jun", amount: 1245 }
        ],
        loyaltyTier: 'Gold',
        pointsToNextTier: 660,
        rewardsAvailable: [
          { name: "₹500 off next booking", pointsRequired: 500, value: 500 },
          { name: "Free service upgrade", pointsRequired: 750, value: 300 },
          { name: "Exclusive member discount", pointsRequired: 1000, value: 200 }
        ]
      });

      setLoading(false);
    }, 1000);
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge variant="default">Upcoming</Badge>;
      case 'in_progress':
        return <Badge variant="secondary">In Progress</Badge>;
      case 'completed':
        return <Badge variant="outline" className="text-green-600 border-green-600">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="container py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.firstName}!</h1>
          <p className="text-muted-foreground mt-1 flex items-center gap-2">
            Manage your appointments and salon experiences
            <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
              isConnected 
                ? 'bg-green-100 text-green-700' 
                : 'bg-yellow-100 text-yellow-700'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
              {isConnected ? 'Live' : 'Connecting...'}
            </span>
          </p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
          <Calendar className="mr-2 h-4 w-4" />
          Book New Appointment
        </Button>
      </motion.div>

      <Tabs defaultValue="analytics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analytics">Analytics & Insights</TabsTrigger>
          <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          <TabsTrigger value="reviews">My Reviews</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-8">
          {analytics && (
            <>
              {/* Advanced Executive Summary */}
              <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                      <Activity className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-slate-800">Executive Summary</h2>
                      <p className="text-slate-600">Your comprehensive salon journey analytics</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-500 mb-1">Last updated</div>
                    <div className="text-sm font-medium text-slate-700">
                      {new Date().toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {/* Enhanced KPI Cards */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-xl p-5 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        +12% ↑
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-slate-600">Total Bookings</p>
                      <div className="text-3xl font-bold text-slate-800">{analytics.totalBookings}</div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-green-600 flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {analytics.upcomingBookings} upcoming
                        </span>
                        <span className="text-slate-500">{analytics.completedBookings} completed</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-xl p-5 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <DollarSign className="h-5 w-5 text-green-600" />
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        +8.5% ↑
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-slate-600">Lifetime Value</p>
                      <div className="text-3xl font-bold text-slate-800">₹{analytics.totalSpent.toLocaleString()}</div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-blue-600">₹{analytics.monthlySpending.toLocaleString()}/month</span>
                        <span className="text-slate-500">avg spend</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-xl p-5 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <Crown className="h-5 w-5 text-yellow-600" />
                      </div>
                      <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                        Gold Elite
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-slate-600">Loyalty Status</p>
                      <div className="text-3xl font-bold text-slate-800">{analytics.loyaltyTier}</div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-yellow-600">{analytics.loyaltyPoints.toLocaleString()} pts</span>
                        <span className="text-slate-500">{analytics.pointsToNextTier} to Platinum</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-xl p-5 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Star className="h-5 w-5 text-orange-600" />
                      </div>
                      <Badge variant="outline" className="text-orange-600 border-orange-600">
                        4.8 ★
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-slate-600">Average Rating</p>
                      <div className="text-3xl font-bold text-slate-800">4.8</div>
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <div className="flex gap-1">
                          {renderStars(4.8)}
                        </div>
                        <span>12 reviews</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Advanced Analytics Grid */}
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Spending Trends with Enhanced Visualization */}
                <div className="lg:col-span-2">
                  <Card className="shadow-lg border-slate-200">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-blue-600" />
                        Advanced Spending Trends
                        <Badge variant="secondary" className="ml-auto">Interactive</Badge>
                      </CardTitle>
                      <CardDescription>
                        6-month spending analysis with predictive insights and seasonal patterns
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        {/* Trend Summary */}
                        <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">
                              +{Math.round((analytics.spendingTrends[5].amount - analytics.spendingTrends[0].amount) / analytics.spendingTrends[0].amount * 100)}%
                            </div>
                            <div className="text-xs text-slate-600">6-Month Growth</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">
                              ₹{Math.round(analytics.spendingTrends.reduce((sum, t) => sum + t.amount, 0) / analytics.spendingTrends.length).toLocaleString()}
                            </div>
                            <div className="text-xs text-slate-600">Avg Monthly</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">
                              ₹{Math.max(...analytics.spendingTrends.map(t => t.amount)).toLocaleString()}
                            </div>
                            <div className="text-xs text-slate-600">Peak Month</div>
                          </div>
                        </div>

                        {/* Interactive Trend Bars */}
                        <div className="space-y-4">
                          {analytics.spendingTrends.map((trend, index) => {
                            const maxAmount = Math.max(...analytics.spendingTrends.map(t => t.amount));
                            const percentage = (trend.amount / maxAmount) * 100;
                            const isPeak = trend.amount === maxAmount;
                            const isCurrentMonth = index === analytics.spendingTrends.length - 1;

                            return (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-3">
                                    <span className={`text-sm font-semibold ${isCurrentMonth ? 'text-blue-600' : 'text-slate-700'}`}>
                                      {trend.month}
                                      {isCurrentMonth && <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Current</span>}
                                    </span>
                                    {isPeak && <Badge variant="outline" className="text-red-600 border-red-300">Peak</Badge>}
                                  </div>
                                  <div className="text-right">
                                    <div className="text-sm font-bold text-slate-800">₹{trend.amount.toLocaleString()}</div>
                                    <div className="text-xs text-slate-500">{percentage.toFixed(1)}% of max</div>
                                  </div>
                                </div>
                                <div className="relative">
                                  <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: `${percentage}%` }}
                                      transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                                      className={`h-4 rounded-full transition-colors group-hover:brightness-110 ${
                                        isCurrentMonth
                                          ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                                          : isPeak
                                            ? 'bg-gradient-to-r from-red-500 to-red-600'
                                            : 'bg-gradient-to-r from-green-500 to-green-600'
                                      }`}
                                    />
                                  </div>
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xs font-medium text-white drop-shadow-sm">
                                      {percentage.toFixed(0)}%
                                    </span>
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>

                        {/* Predictive Insights */}
                        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-semibold text-blue-800">Predictive Insights</span>
                          </div>
                          <div className="text-sm text-blue-700">
                            Based on your spending patterns, you might spend <span className="font-bold">₹{(analytics.monthlySpending * 1.15).toFixed(0)}</span> next month.
                            Consider booking premium services to maximize your loyalty points.
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Service Analytics & Patterns */}
                <div className="space-y-6">
                  {/* Service Distribution Pie Chart Alternative */}
                  <Card className="shadow-lg border-slate-200">
                    <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                      <CardTitle className="flex items-center gap-2">
                        <PieChart className="h-5 w-5 text-purple-600" />
                        Service Analytics
                      </CardTitle>
                      <CardDescription>Your service preferences and spending breakdown</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {analytics.favoriteServices.map((service, index) => {
                          const totalSpent = analytics.favoriteServices.reduce((sum, s) => sum + s.totalSpent, 0);
                          const percentage = Math.round((service.totalSpent / totalSpent) * 100);
                          const colors = ['bg-purple-500', 'bg-pink-500', 'bg-indigo-500'];

                          return (
                            <div key={index} className="space-y-3">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <div className={`w-3 h-3 rounded-full ${colors[index % colors.length]}`}></div>
                                  <span className="text-sm font-semibold text-slate-700">{service.name}</span>
                                </div>
                                <span className="text-sm font-bold text-slate-800">{percentage}%</span>
                              </div>
                              <div className="space-y-1">
                                <div className="w-full bg-slate-200 rounded-full h-2">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percentage}%` }}
                                    transition={{ delay: index * 0.2, duration: 0.8 }}
                                    className={`h-2 rounded-full ${colors[index % colors.length]}`}
                                  />
                                </div>
                                <div className="flex justify-between text-xs text-slate-600">
                                  <span>{service.count} visits</span>
                                  <span>₹{service.totalSpent.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Service Insights */}
                      <div className="mt-6 p-3 bg-purple-50 rounded-lg">
                        <div className="text-xs text-purple-700">
                          <div className="font-semibold mb-1">💡 Service Insight</div>
                          <div>Hair services dominate your spending at {Math.round((analytics.favoriteServices[0].totalSpent / analytics.favoriteServices.reduce((sum, s) => sum + s.totalSpent, 0)) * 100)}% of total.</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Booking Patterns with Time Analysis */}
                  <Card className="shadow-lg border-slate-200">
                    <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-green-600" />
                        Booking Patterns
                      </CardTitle>
                      <CardDescription>Your preferred booking times and habits</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {analytics.peakBookingTimes.map((time, index) => {
                          const maxFrequency = Math.max(...analytics.peakBookingTimes.map(t => t.frequency));
                          const percentage = (time.frequency / maxFrequency) * 100;

                          return (
                            <div key={index} className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-slate-700">{time.time}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-slate-600">{time.frequency}x</span>
                                  <Badge variant="outline" className="text-xs">
                                    {percentage.toFixed(0)}%
                                  </Badge>
                                </div>
                              </div>
                              <div className="w-full bg-slate-200 rounded-full h-2">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${percentage}%` }}
                                  transition={{ delay: index * 0.1, duration: 0.6 }}
                                  className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full"
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Pattern Insights */}
                      <div className="mt-6 p-3 bg-green-50 rounded-lg">
                        <div className="text-xs text-green-700">
                          <div className="font-semibold mb-1">🎯 Pattern Insight</div>
                          <div>You prefer weekend afternoons. Saturday 2-4PM is your most active booking time with {analytics.peakBookingTimes[0].frequency} bookings.</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Loyalty & Rewards Hub */}
              <Card className="bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 border-yellow-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-yellow-800">
                        <Crown className="h-6 w-6 text-yellow-600" />
                        Loyalty Program - {analytics.loyaltyTier} Elite Member
                      </CardTitle>
                      <CardDescription className="text-yellow-700">
                        {analytics.pointsToNextTier} points until Platinum tier
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-yellow-800">{analytics.loyaltyPoints.toLocaleString()}</div>
                      <div className="text-sm text-yellow-700">Current Points</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Tier Progress</span>
                      <span>{analytics.loyaltyPoints}/3000 pts</span>
                    </div>
                    <Progress value={(analytics.loyaltyPoints / 3000) * 100} className="h-4 bg-yellow-200" />
                    <div className="flex justify-between text-xs text-yellow-700">
                      <span>{analytics.loyaltyTier} Tier</span>
                      <span>Platinum Tier</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4 text-yellow-800">Available Rewards</h4>
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                      {analytics.rewardsAvailable.map((reward, index) => (
                        <div key={index} className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-yellow-200">
                          <div className="flex items-center justify-between mb-3">
                            <Gift className="h-5 w-5 text-yellow-600" />
                            <Badge variant="outline" className="border-yellow-400 text-yellow-700">
                              {reward.pointsRequired} pts
                            </Badge>
                          </div>
                          <div className="font-medium text-sm text-slate-800 mb-1">{reward.name}</div>
                          <div className="text-xs text-slate-600 mb-3">Value: ₹{reward.value}</div>
                          <Button
                            size="sm"
                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
                            disabled={analytics.loyaltyPoints < reward.pointsRequired}
                          >
                            {analytics.loyaltyPoints >= reward.pointsRequired ? 'Redeem' : 'Not Enough Points'}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Salon Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    Your Salon Family
                  </CardTitle>
                  <CardDescription>Salons you've trusted with your style</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
                    {analytics.preferredSalons.map((salon, index) => (
                      <div key={index} className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-5 border border-slate-200 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                              {salon.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-semibold text-slate-800">{salon.name}</div>
                              <div className="text-sm text-slate-600">{salon.visits} visits</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-slate-800">₹{salon.totalSpent.toLocaleString()}</div>
                            <div className="text-xs text-slate-600">Total spent</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-slate-600">
                            Avg: ₹{Math.round(salon.totalSpent / salon.visits).toLocaleString()}/visit
                          </div>
                          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200">
                            Book Again
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="bookings" className="space-y-6">
          {/* Booking Filters and Stats */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">My Bookings</h2>
                  <p className="text-slate-600">Complete history of your salon appointments</p>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 border-0">
                <Calendar className="mr-2 h-4 w-4" />
                Book New Appointment
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-4 mb-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-700">Total Bookings</p>
                    <p className="text-2xl font-bold text-blue-800">{bookings.length}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-700">Upcoming</p>
                    <p className="text-2xl font-bold text-green-800">{bookings.filter(b => b.status === 'upcoming').length}</p>
                  </div>
                  <Clock className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-700">Completed</p>
                    <p className="text-2xl font-bold text-purple-800">{bookings.filter(b => b.status === 'completed').length}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-purple-600" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-700">Cancelled</p>
                    <p className="text-2xl font-bold text-red-800">{bookings.filter(b => b.status === 'cancelled').length}</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-red-600" />
                </div>
              </div>
            </div>

          {/* Bookings List */}
          <div className="space-y-4">
            {bookings.map((booking, index) => (
              <motion.div
                key={booking.booking_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {booking.salon_name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold text-slate-800">{booking.salon_name}</h3>
                          {getStatusBadge(booking.status)}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(booking.appointment_date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {booking.appointment_time}
                          </div>
                        </div>
                        {booking.booking_number && (
                          <div className="text-xs text-slate-500 mt-1">
                            Booking #{booking.booking_number}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-slate-800">₹{booking.price.toLocaleString()}</div>
                      <div className="text-sm text-slate-600">Total amount</div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <ShoppingBag className="h-4 w-4 text-slate-500" />
                        <span className="font-medium text-slate-700">Service:</span>
                        <span className="text-slate-600">{booking.service_name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-slate-500" />
                        <span className="font-medium text-slate-700">Location:</span>
                        <span className="text-slate-600">{booking.salon_address}</span>
                      </div>
                      {booking.notes && (
                        <div className="flex items-start gap-2 text-sm">
                          <AlertCircle className="h-4 w-4 text-slate-500 mt-0.5" />
                          <div>
                            <span className="font-medium text-slate-700">Notes:</span>
                            <p className="text-slate-600 mt-1">{booking.notes}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-slate-500" />
                        <span className="font-medium text-slate-700">Phone:</span>
                        <span className="text-slate-600">{booking.salon_phone}</span>
                      </div>
                      {booking.created_at && (
                        <div className="flex items-center gap-2 text-sm">
                          <CalendarDays className="h-4 w-4 text-slate-500" />
                          <span className="font-medium text-slate-700">Booked on:</span>
                          <span className="text-slate-600">
                            {new Date(booking.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                      {booking.queue_position && booking.status === 'upcoming' && (
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Users className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-medium text-blue-800">
                              Queue Position: #{booking.queue_position}
                            </span>
                          </div>
                          {booking.estimated_wait && (
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-blue-600" />
                              <span className="text-sm text-blue-700">
                                Est. Wait: {booking.estimated_wait} minutes
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status-specific content */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {booking.status === 'completed' && (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                      {booking.status === 'upcoming' && (
                        <Clock className="h-5 w-5 text-blue-600" />
                      )}
                      {booking.status === 'cancelled' && (
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      )}
                      <span className="text-sm font-medium capitalize text-slate-700">
                        {booking.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      {booking.status === 'upcoming' && (
                        <>
                          <Button size="sm" variant="outline" className="text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:border-blue-400 font-medium transition-all duration-200">
                            Reschedule
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 border-red-300 bg-red-50 hover:bg-red-100 hover:border-red-400 font-medium transition-all duration-200">
                            Cancel
                          </Button>
                        </>
                      )}
                      {booking.status === 'completed' && (
                        <Button size="sm" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200">
                          Leave Review
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {bookings.length === 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                <Calendar className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-800 mb-2">No bookings yet</h3>
                <p className="text-slate-600 mb-6 max-w-md mx-auto">
                  Start your beauty journey by booking your first appointment with one of our amazing partner salons.
                </p>
                <Button className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200">
                  Browse Salons
                </Button>
              </div>
            )}
          </div>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-6">
          {/* Reviews Header */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Star className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">My Reviews</h2>
                  <p className="text-slate-600">Your complete review history and feedback</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-slate-800">
                  {reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length || 0}
                </div>
                <div className="text-sm text-slate-600">
                  Average Rating ({reviews.length} reviews)
                </div>
              </div>
            </div>

            {/* Review Stats */}
            <div className="grid gap-4 md:grid-cols-4 mb-6">
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-700">Total Reviews</p>
                    <p className="text-2xl font-bold text-orange-800">{reviews.length}</p>
                  </div>
                  <Star className="h-8 w-8 text-orange-600" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-700">5-Star Reviews</p>
                    <p className="text-2xl font-bold text-green-800">
                      {reviews.filter(r => r.rating === 5).length}
                    </p>
                  </div>
                  <Award className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-700">Helpful Votes</p>
                    <p className="text-2xl font-bold text-blue-800">
                      {reviews.reduce((sum, r) => sum + (r.helpful_votes || 0), 0)}
                    </p>
                  </div>
                  <Heart className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-700">Responses</p>
                    <p className="text-2xl font-bold text-purple-800">
                      {reviews.filter(r => r.response).length}
                    </p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <motion.div
                key={review.review_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {review.salon_name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold text-slate-800">{review.salon_name}</h3>
                          <div className="flex items-center gap-1">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-600 mb-2">
                          <span>{review.service_name}</span>
                          {review.booking_number && (
                            <>
                              <span>•</span>
                              <span>Booking #{review.booking_number}</span>
                            </>
                          )}
                        </div>
                        <div className="text-xs text-slate-500">
                          Reviewed on {new Date(review.review_date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>
                    {review.helpful_votes !== undefined && (
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm text-slate-600">
                          <Heart className="h-4 w-4" />
                          {review.helpful_votes} helpful
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <p className="text-slate-700 leading-relaxed">{review.comment}</p>
                  </div>

                  {/* Salon Response */}
                  {review.response && (
                    <div className="bg-slate-50 rounded-lg p-4 border-l-4 border-slate-300">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                          <MessageSquare className="h-4 w-4 text-slate-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-slate-800">Salon Response</span>
                            <span className="text-xs text-slate-500">
                              {review.responded_at ? new Date(review.responded_at).toLocaleDateString() : ''}
                            </span>
                          </div>
                          <p className="text-slate-600 text-sm">{review.response}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Review Actions */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <button className="flex items-center gap-1 hover:text-slate-800">
                        <Heart className="h-4 w-4" />
                        Helpful
                      </button>
                      <button className="hover:text-slate-800">Report</button>
                    </div>
                    <Button size="sm" variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50 hover:border-orange-400 font-medium transition-all duration-200">
                      Edit Review
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}

            {reviews.length === 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                <Star className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-800 mb-2">No reviews yet</h3>
                <p className="text-slate-600 mb-6 max-w-md mx-auto">
                  Share your experience by leaving reviews for completed appointments. Your feedback helps other customers and improves our services.
                </p>
                <Button className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200">
                  View Completed Bookings
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          {/* Profile Header */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Profile Settings</h2>
                <p className="text-slate-600">Manage your account information and preferences</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Update your basic account details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-slate-700">First Name</label>
                    <p className="text-sm text-slate-600 mt-1">{user?.firstName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Last Name</label>
                    <p className="text-sm text-slate-600 mt-1">{user?.lastName}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-slate-700">Email Address</label>
                    <p className="text-sm text-slate-600 mt-1">{user?.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Phone Number</label>
                    <p className="text-sm text-slate-600 mt-1">{user?.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Role</label>
                    <p className="text-sm text-slate-600 mt-1 capitalize">{user?.role}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200">
                    Edit Profile
                  </Button>
                  <Button size="sm" variant="outline" className="border-slate-300 hover:bg-slate-50 hover:border-slate-400 font-medium transition-all duration-200">
                    Change Password
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Account Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-500" />
                  Account Statistics
                </CardTitle>
                <CardDescription>
                  Your activity summary
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Member Since</span>
                    <span className="text-sm font-medium">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Total Bookings</span>
                    <span className="text-sm font-medium">{bookings.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Total Reviews</span>
                    <span className="text-sm font-medium">{reviews.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Total Spent</span>
                    <span className="text-sm font-medium">₹{analytics?.totalSpent.toLocaleString() || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Loyalty Points</span>
                    <span className="text-sm font-medium">{analytics?.loyaltyPoints.toLocaleString() || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-500" />
                  Preferences
                </CardTitle>
                <CardDescription>
                  Customize your experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Email Notifications</span>
                    <Badge variant="outline" className="text-green-600">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">SMS Reminders</span>
                    <Badge variant="outline" className="text-green-600">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Marketing Emails</span>
                    <Badge variant="outline" className="text-yellow-600">Weekly</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Preferred Language</span>
                    <Badge variant="outline">English</Badge>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 font-medium transition-all duration-200">
                  Update Preferences
                </Button>
              </CardContent>
            </Card>

            {/* Security & Privacy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-red-500" />
                  Security & Privacy
                </CardTitle>
                <CardDescription>
                  Manage your account security
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Two-Factor Auth</span>
                    <Badge variant="outline" className="text-slate-600">Disabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Login Sessions</span>
                    <span className="text-sm text-slate-600">1 active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Data Privacy</span>
                    <Badge variant="outline" className="text-green-600">GDPR Compliant</Badge>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button size="sm" variant="outline" className="w-full border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400 font-medium transition-all duration-200">
                    Enable 2FA
                  </Button>
                  <Button size="sm" variant="outline" className="w-full border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 font-medium transition-all duration-200">
                    View Login History
                  </Button>
                  <Button size="sm" variant="outline" className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 font-medium transition-all duration-200">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Support & Help */}
          <Card className="bg-gradient-to-r from-slate-50 to-blue-50 border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <Zap className="h-5 w-5 text-blue-600" />
                Support & Help
              </CardTitle>
              <CardDescription className="text-slate-600">
                Need assistance? We're here to help.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 bg-white rounded-lg border">
                  <MessageSquare className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <h4 className="font-medium mb-1">Live Chat</h4>
                  <p className="text-sm text-slate-600 mb-3">Get instant help</p>
                  <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200">
                    Start Chat
                  </Button>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border">
                  <Phone className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <h4 className="font-medium mb-1">Phone Support</h4>
                  <p className="text-sm text-slate-600 mb-3">Call us anytime</p>
                  <Button size="sm" variant="outline" className="w-full border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400 font-medium transition-all duration-200">
                    +91 98765 43210
                  </Button>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border">
                  <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <h4 className="font-medium mb-1">Help Center</h4>
                  <p className="text-sm text-slate-600 mb-3">Find answers</p>
                  <Button size="sm" variant="outline" className="w-full border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400 font-medium transition-all duration-200">
                    Browse FAQs
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
