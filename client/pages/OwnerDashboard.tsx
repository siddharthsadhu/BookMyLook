import { motion } from "framer-motion";
import { useI18n } from "@/i18n";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Clock, Users, DollarSign, Star, TrendingUp, Calendar, Phone, Mail, MapPin,
  Plus, CheckCircle, UserCheck, BarChart3, Activity, Target, Award,
  AlertTriangle, Zap, Settings, Eye, Edit, Trash2, MoreHorizontal,
  PieChart, CalendarDays, Timer, UserX, UserPlus, Briefcase
} from "lucide-react";
import { useQueue } from "@/contexts/QueueContext";
import { useRealTime } from "@/contexts/RealTimeContext";
import { QueueEntry } from "@shared/api";

interface SalonAnalytics {
  totalRevenue: number;
  monthlyRevenue: number;
  totalCustomers: number;
  monthlyCustomers: number;
  averageRating: number;
  totalReviews: number;
  averageServiceTime: number;
  customerRetention: number;
  topServices: Array<{ name: string; count: number; revenue: number }>;
  peakHours: Array<{ hour: string; customers: number }>;
  weeklyRevenue: Array<{ day: string; amount: number }>;
}

interface QueueItem {
  customer_id: number;
  customer_name: string;
  service_name: string;
  queue_position: number;
  estimated_wait: number;
  appointment_time: string;
  phone: string;
  status: 'waiting' | 'in_service' | 'completed';
}

interface Service {
  service_id: number;
  service_name: string;
  description: string;
  duration_minutes: number;
  price: number;
  is_active: boolean;
  category: string;
  popularity: number;
}

interface Notification {
  id: string;
  type: 'queue' | 'review' | 'system' | 'urgent';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export default function OwnerDashboard() {
  const { t } = useI18n();
  const { getQueueForSalon, updateQueueEntry, refreshQueue } = useQueue();
  const { subscribeToSalon, unsubscribeFromSalon, isConnected } = useRealTime();
  const [services, setServices] = useState<Service[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSalonId, setCurrentSalonId] = useState('salon_gentleman_zone');
  const [analytics, setAnalytics] = useState<SalonAnalytics | null>(null);

  const [queueStats, setQueueStats] = useState({
    waiting: 0,
    inService: 0,
    completed: 0,
    averageWaitTime: 0,
    totalToday: 0
  });

  // Real-time salon subscription
  useEffect(() => {
    if (isConnected && currentSalonId) {
      subscribeToSalon(currentSalonId);
      console.log(`📡 OwnerDashboard subscribed to salon: ${currentSalonId}`);
    }

    return () => {
      if (currentSalonId) {
        unsubscribeFromSalon(currentSalonId);
        console.log(`📡 OwnerDashboard unsubscribed from salon: ${currentSalonId}`);
      }
    };
  }, [currentSalonId, isConnected, subscribeToSalon, unsubscribeFromSalon]);

  // Update queue stats whenever queue changes
  useEffect(() => {
    const queue = getQueueForSalon(currentSalonId);
    const waiting = queue.filter(entry => entry.status === 'WAITING').length;
    const inService = queue.filter(entry => entry.status === 'IN_SERVICE').length;
    const completed = queue.filter(entry => entry.status === 'COMPLETED').length;
    const avgWaitTime = queue.length > 0 ? Math.round(queue.reduce((sum, entry) => sum + entry.estimatedWaitMinutes, 0) / queue.length) : 0;

    setQueueStats({
      waiting,
      inService,
      completed,
      averageWaitTime: avgWaitTime,
      totalToday: waiting + inService + completed
    });
  }, [getQueueForSalon(currentSalonId), currentSalonId]);

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      refreshQueue(currentSalonId);
    }, 30000);

    return () => clearInterval(interval);
  }, [currentSalonId, refreshQueue]);

  useEffect(() => {
    // Simulate loading comprehensive salon data
    setTimeout(() => {
      setServices([
        {
          service_id: 1,
          service_name: "Hair Cut & Styling",
          description: "Professional haircut with modern styling techniques",
          duration_minutes: 45,
          price: 350,
          is_active: true,
          category: "Hair Services",
          popularity: 85
        },
        {
          service_id: 2,
          service_name: "Beard Grooming",
          description: "Complete beard trim, shape and styling",
          duration_minutes: 30,
          price: 200,
          is_active: true,
          category: "Grooming",
          popularity: 72
        },
        {
          service_id: 3,
          service_name: "Hair Wash",
          description: "Deep conditioning hair wash with premium products",
          duration_minutes: 20,
          price: 150,
          is_active: true,
          category: "Hair Services",
          popularity: 65
        },
        {
          service_id: 4,
          service_name: "Facial Treatment",
          description: "Deep cleansing facial with premium products",
          duration_minutes: 60,
          price: 500,
          is_active: true,
          category: "Skin Care",
          popularity: 58
        },
        {
          service_id: 5,
          service_name: "Hair Color",
          description: "Professional hair coloring service",
          duration_minutes: 120,
          price: 800,
          is_active: true,
          category: "Hair Services",
          popularity: 45
        }
      ]);

      setAnalytics({
        totalRevenue: 245000,
        monthlyRevenue: 18500,
        totalCustomers: 456,
        monthlyCustomers: 156,
        averageRating: 4.8,
        totalReviews: 89,
        averageServiceTime: 42,
        customerRetention: 78,
        topServices: [
          { name: "Hair Cut & Styling", count: 145, revenue: 50750 },
          { name: "Beard Grooming", count: 98, revenue: 19600 },
          { name: "Facial Treatment", count: 67, revenue: 33500 }
        ],
        peakHours: [
          { hour: "10 AM", customers: 12 },
          { hour: "11 AM", customers: 18 },
          { hour: "2 PM", customers: 15 },
          { hour: "4 PM", customers: 22 },
          { hour: "6 PM", customers: 28 },
          { hour: "7 PM", customers: 16 }
        ],
        weeklyRevenue: [
          { day: "Mon", amount: 2500 },
          { day: "Tue", amount: 3200 },
          { day: "Wed", amount: 2800 },
          { day: "Thu", amount: 4100 },
          { day: "Fri", amount: 5200 },
          { day: "Sat", amount: 6800 },
          { day: "Sun", amount: 2900 }
        ]
      });

      setNotifications([
        {
          id: '1',
          type: 'queue',
          title: 'Queue Alert',
          message: 'Customer waiting for over 30 minutes',
          time: '2 min ago',
          read: false
        },
        {
          id: '2',
          type: 'review',
          title: 'New 5-Star Review',
          message: 'Excellent service! Highly recommend.',
          time: '15 min ago',
          read: false
        },
        {
          id: '3',
          type: 'system',
          title: 'Staff Schedule Update',
          message: 'Priya Singh is now unavailable',
          time: '1 hour ago',
          read: true
        }
      ]);

      setLoading(false);
    }, 1500);
  }, []);

  const handleNextCustomer = async (entryId: string) => {
    const queueEntry = getQueueForSalon(currentSalonId).find(entry => entry.id === entryId);
    if (!queueEntry) return;

    if (queueEntry.status === 'WAITING') {
      await updateQueueEntry(currentSalonId, entryId, { status: 'IN_SERVICE' });
    } else if (queueEntry.status === 'IN_SERVICE') {
      await updateQueueEntry(currentSalonId, entryId, { status: 'COMPLETED' });
    }
  };

  const handleAddToQueue = () => {
    console.log('Add new customer to queue');
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'queue': return 'bg-orange-100 text-orange-800';
      case 'review': return 'bg-green-100 text-green-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  if (loading) {
    return (
      <div className="container py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your salon dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8">
      {/* Welcome Header with Real-time Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold text-slate-800">Welcome to The Gentlemen's Zone</h1>
          <p className="text-slate-600 mt-2 flex items-center gap-2">
            Manage your premium salon operations and customer experience
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
        <div className="flex gap-3">
          <Button variant="outline" className="border-2 border-slate-400 bg-white hover:bg-slate-100 hover:border-slate-500 font-bold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 text-slate-800 hover:text-slate-900">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 text-white font-bold shadow-xl hover:shadow-2xl transform hover:scale-[1.05] transition-all duration-300 border-0 ring-2 ring-emerald-500/20 hover:ring-emerald-400/40">
            <Plus className="mr-2 h-4 w-4" />
            Quick Actions
          </Button>
        </div>
      </motion.div>

      {/* Executive Overview */}
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 rounded-xl p-6 border border-slate-200">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-800">Executive Overview</h2>
              <p className="text-slate-600">Your salon performance at a glance</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-500 mb-1">Today</div>
            <div className="text-sm font-medium text-slate-700">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Revenue KPI */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-5 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <Badge variant="outline" className="text-green-600 border-green-600">
                +15.2% ↑
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-600">Today's Revenue</p>
              <div className="text-3xl font-bold text-slate-800">₹{analytics?.monthlyRevenue.toLocaleString()}</div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-green-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  ₹{Math.round(analytics?.monthlyRevenue! / queueStats.totalToday)} avg/service
                </span>
                <span className="text-slate-500">{queueStats.completed} services</span>
              </div>
            </div>
          </motion.div>

          {/* Customers KPI */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-5 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <Badge variant="outline" className="text-blue-600 border-blue-600">
                +8.7% ↑
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-600">Today's Customers</p>
              <div className="text-3xl font-bold text-slate-800">{queueStats.totalToday}</div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-blue-600 flex items-center gap-1">
                  <UserPlus className="h-3 w-3" />
                  {analytics?.monthlyCustomers} this month
                </span>
                <span className="text-slate-500">{queueStats.waiting} waiting</span>
              </div>
            </div>
          </motion.div>

          {/* Rating KPI */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
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
              <div className="text-3xl font-bold text-slate-800">{analytics?.averageRating}</div>
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <div className="flex gap-1">
                  {[1,2,3,4,5].map((star) => (
                    <Star
                      key={star}
                      className={`h-3 w-3 ${star <= Math.floor(analytics?.averageRating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span>{analytics?.totalReviews} reviews</span>
              </div>
            </div>
          </motion.div>

          {/* Queue Performance KPI */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl p-5 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
              <Badge variant="outline" className={`text-purple-600 border-purple-600`}>
                {queueStats.averageWaitTime} min avg
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-600">Queue Performance</p>
              <div className="text-3xl font-bold text-slate-800">{queueStats.waiting}</div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-purple-600 flex items-center gap-1">
                  <Timer className="h-3 w-3" />
                  {queueStats.inService} in service
                </span>
                <span className="text-slate-500">{queueStats.completed} completed</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 p-1 rounded-xl shadow-lg border border-slate-200 h-auto">
          <TabsTrigger value="overview" className="rounded-lg font-semibold text-slate-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 text-xs md:text-sm">Overview</TabsTrigger>
          <TabsTrigger value="queue" className="rounded-lg font-semibold text-slate-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 text-xs md:text-sm">Queue</TabsTrigger>
          <TabsTrigger value="analytics" className="rounded-lg font-semibold text-slate-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 text-xs md:text-sm">Analytics</TabsTrigger>
          <TabsTrigger value="services" className="rounded-lg font-semibold text-slate-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-600 data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 text-xs md:text-sm">Services</TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-lg font-semibold text-slate-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 text-xs md:text-sm">Alerts</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Real-time Queue Status */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-white via-slate-50/30 to-white backdrop-blur-sm hover:shadow-2xl transition-all duration-500 ring-1 ring-slate-200/50 hover:ring-slate-300/70">
              <CardHeader className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border-b border-slate-100">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  Live Queue Status
                  <Badge variant="secondary" className="ml-auto animate-pulse bg-emerald-100 text-emerald-700 border-emerald-200">LIVE</Badge>
                </CardTitle>
                <CardDescription>Current customer flow and queue management</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="text-2xl font-bold text-orange-600">{queueStats.waiting}</div>
                      <div className="text-sm text-orange-700">Waiting</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-2xl font-bold text-blue-600">{queueStats.inService}</div>
                      <div className="text-sm text-blue-700">In Service</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-2xl font-bold text-green-600">{queueStats.completed}</div>
                      <div className="text-sm text-green-700">Completed</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Average Wait Time</span>
                      <span className="text-sm font-bold">{queueStats.averageWaitTime} minutes</span>
                    </div>
                    <Progress value={Math.min((queueStats.averageWaitTime / 30) * 100, 100)} className="h-2" />
                    <div className="text-xs text-slate-600">
                      Target: &lt; 15 minutes for optimal customer satisfaction
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Performing Services */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-white via-slate-50/30 to-white backdrop-blur-sm hover:shadow-2xl transition-all duration-500 ring-1 ring-slate-200/50 hover:ring-slate-300/70">
              <CardHeader className="bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 border-b border-slate-100">
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-purple-600" />
                  Top Performing Services
                </CardTitle>
                <CardDescription>Your most popular and profitable services this month</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {analytics?.topServices.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-semibold">{service.name}</div>
                          <div className="text-sm text-slate-600">{service.count} customers</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">₹{service.revenue.toLocaleString()}</div>
                        <div className="text-xs text-slate-500">Revenue</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Queue Management Tab */}
        <TabsContent value="queue" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Queue Management</h2>
                <p className="text-slate-600">Real-time customer queue and service management</p>
              </div>
            </div>
            <Button
              onClick={handleAddToQueue}
              className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-700 hover:via-purple-700 hover:to-indigo-700 text-white font-bold shadow-xl hover:shadow-2xl transform hover:scale-[1.05] transition-all duration-300 border-0 ring-2 ring-violet-500/20 hover:ring-violet-400/40"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </div>

          {/* Queue Stats */}
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4 mb-6">
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-700">Waiting</p>
                  <p className="text-2xl font-bold text-orange-800">{queueStats.waiting}</p>
                </div>
                <Users className="h-8 w-8 text-orange-600" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">In Service</p>
                  <p className="text-2xl font-bold text-blue-800">{queueStats.inService}</p>
                </div>
                <UserCheck className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700">Completed</p>
                  <p className="text-2xl font-bold text-green-800">{queueStats.completed}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700">Avg Wait</p>
                  <p className="text-2xl font-bold text-purple-800">{queueStats.averageWaitTime}m</p>
                </div>
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Queue List */}
          <div className="space-y-4">
            {getQueueForSalon(currentSalonId).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg border-2 ${
                        item.status === 'WAITING' ? 'bg-orange-100 border-orange-300 text-orange-700' :
                        item.status === 'IN_SERVICE' ? 'bg-blue-100 border-blue-300 text-blue-700' :
                        'bg-green-100 border-green-300 text-green-700'
                      }`}>
                        {item.position}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg text-slate-800 truncate">{item.customerName}</h3>
                        <p className="text-slate-600 truncate">{item.serviceName}</p>
                        <div className="flex items-center gap-2 md:gap-4 mt-2 text-sm text-slate-600">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span className="hidden sm:inline">{item.estimatedTime}</span>
                            <span className="sm:hidden">Wait: {item.estimatedWaitMinutes}m</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            <span className="hidden md:inline">{item.customerPhone}</span>
                            <span className="md:hidden">***{item.customerPhone.slice(-4)}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                      <Badge variant={
                        item.status === 'WAITING' ? 'secondary' :
                        item.status === 'IN_SERVICE' ? 'default' :
                        'outline'
                      } className={
                        item.status === 'WAITING' ? 'bg-orange-100 text-orange-800' :
                        item.status === 'IN_SERVICE' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }>
                        {item.status === 'WAITING' && `Wait: ${item.estimatedWaitMinutes} min`}
                        {item.status === 'IN_SERVICE' && 'In Service'}
                        {item.status === 'COMPLETED' && 'Completed'}
                      </Badge>

                      <div className="flex gap-2">
                        {item.status === 'WAITING' && (
                          <Button
                            size="sm"
                            onClick={() => handleNextCustomer(item.id)}
                            className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-[1.03] transition-all duration-300 border-0 ring-1 ring-emerald-400/30"
                          >
                            <span className="hidden sm:inline">Next</span>
                            <span className="sm:hidden">Start</span>
                          </Button>
                        )}
                        {item.status === 'IN_SERVICE' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleNextCustomer(item.id)}
                            className="border-2 border-emerald-500 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 hover:border-emerald-600 font-bold shadow-md hover:shadow-lg transform hover:scale-[1.03] transition-all duration-300"
                          >
                            Complete
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" className="hover:bg-slate-100 hover:text-slate-800 transition-all duration-200 font-medium">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </motion.div>
            ))}

            {getQueueForSalon(currentSalonId).length === 0 && (
              <Card className="border-dashed">
                <CardContent className="text-center py-12">
                  <Users className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Queue is Empty</h3>
                  <p className="text-slate-600 mb-6 max-w-md mx-auto">
                    No customers are currently waiting. Add customers to start managing your queue.
                  </p>
                  <Button
                    onClick={handleAddToQueue}
                    className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-700 hover:via-purple-700 hover:to-indigo-700 text-white font-bold shadow-xl hover:shadow-2xl transform hover:scale-[1.05] transition-all duration-300 border-0 ring-2 ring-violet-500/20 hover:ring-violet-400/40"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add First Customer
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Analytics Tab - Comprehensive */}
        <TabsContent value="analytics" className="space-y-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-800">Business Analytics</h2>
              <p className="text-slate-600">Deep insights into your salon performance and trends</p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Revenue Trends */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-white via-slate-50/30 to-white backdrop-blur-sm hover:shadow-2xl transition-all duration-500 ring-1 ring-slate-200/50 hover:ring-slate-300/70">
              <CardHeader className="bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 border-b border-slate-100">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Weekly Revenue Trend
                </CardTitle>
                <CardDescription>Your revenue performance over the past week</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {analytics?.weeklyRevenue.map((day, index) => {
                    const maxRevenue = Math.max(...analytics.weeklyRevenue.map(d => d.amount));
                    const percentage = (day.amount / maxRevenue) * 100;

                    return (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-slate-700 w-8">{day.day}</span>
                          <div className="flex-1 bg-slate-200 rounded-full h-3">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ delay: index * 0.1, duration: 0.8 }}
                              className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full"
                            />
                          </div>
                        </div>
                        <span className="text-sm font-bold text-slate-800 ml-4">
                          ₹{day.amount.toLocaleString()}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 pt-4 border-t">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">Weekly Total</span>
                    <span className="font-bold text-slate-800">
                      ₹{analytics?.weeklyRevenue.reduce((sum, d) => sum + d.amount, 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Peak Hours */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-white via-slate-50/30 to-white backdrop-blur-sm hover:shadow-2xl transition-all duration-500 ring-1 ring-slate-200/50 hover:ring-slate-300/70">
              <CardHeader className="bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 border-b border-slate-100">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-purple-600" />
                  Peak Operating Hours
                </CardTitle>
                <CardDescription>Customer traffic patterns throughout the day</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {analytics?.peakHours.map((hour, index) => {
                    const maxCustomers = Math.max(...analytics.peakHours.map(h => h.customers));
                    const percentage = (hour.customers / maxCustomers) * 100;

                    return (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-slate-700 w-12">{hour.hour}</span>
                          <div className="flex-1 bg-slate-200 rounded-full h-3">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ delay: index * 0.1, duration: 0.8 }}
                              className="bg-gradient-to-r from-purple-500 to-pink-600 h-3 rounded-full"
                            />
                          </div>
                        </div>
                        <span className="text-sm font-bold text-slate-800 ml-4">
                          {hour.customers} customers
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Services Management Tab */}
        <TabsContent value="services" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Services Management</h2>
                <p className="text-slate-600">Manage your service offerings, pricing, and categories</p>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 hover:from-amber-700 hover:via-orange-700 hover:to-yellow-700 text-white font-bold shadow-xl hover:shadow-2xl transform hover:scale-[1.05] transition-all duration-300 border-0 ring-2 ring-amber-500/20 hover:ring-amber-400/40">
              <Plus className="mr-2 h-4 w-4" />
              Add Service
            </Button>
          </div>

          <div className="grid gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.service_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-slate-800">{service.service_name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {service.category}
                        </Badge>
                        <Badge variant={service.is_active ? "default" : "secondary"} className={
                          service.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }>
                          {service.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>

                      <p className="text-slate-600 mb-4">{service.description}</p>

                      <div className="grid grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{service.duration_minutes}</div>
                          <div className="text-sm text-slate-600">Duration (min)</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">₹{service.price}</div>
                          <div className="text-sm text-slate-600">Price</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-600">{service.popularity}%</div>
                          <div className="text-sm text-slate-600">Popularity</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 ml-6">
                      <Button size="sm" variant="outline" className="border-2 border-emerald-300 bg-emerald-50/50 hover:bg-emerald-100 hover:border-emerald-500 text-emerald-700 hover:text-emerald-800 font-semibold shadow-sm hover:shadow-md transform hover:scale-[1.02] transition-all duration-300">
                        <Eye className="mr-1 h-3 w-3" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="border-2 border-slate-300 bg-slate-50/50 hover:bg-slate-100 hover:border-slate-500 text-slate-700 hover:text-slate-800 font-semibold shadow-sm hover:shadow-md transform hover:scale-[1.02] transition-all duration-300">
                        <Edit className="mr-1 h-3 w-3" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Notifications/Alerts Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-red-500 to-orange-600 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-800">Notifications & Alerts</h2>
              <p className="text-slate-600">Stay informed about important updates and alerts</p>
            </div>
          </div>

          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border ${notification.read ? 'bg-white border-slate-200' : 'bg-blue-50 border-blue-200'}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    notification.type === 'urgent' ? 'bg-red-500' :
                    notification.type === 'queue' ? 'bg-orange-500' :
                    notification.type === 'review' ? 'bg-green-500' :
                    'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-slate-800">{notification.title}</h4>
                      <span className="text-xs text-slate-500">{notification.time}</span>
                    </div>
                    <p className="text-slate-600 text-sm">{notification.message}</p>
                  </div>
                  {!notification.read && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">New</Badge>
                  )}
                </div>
              </motion.div>
            ))}

            {notifications.length === 0 && (
              <Card className="border-dashed">
                <CardContent className="text-center py-12">
                  <AlertTriangle className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">All Clear</h3>
                  <p className="text-slate-600">
                    No notifications at this time. Your salon is running smoothly!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
