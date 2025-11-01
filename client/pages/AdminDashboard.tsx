import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Search,
  Filter,
  MoreHorizontal,
  Calendar as CalendarIcon,
  Clock,
  User,
  Scissors,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Edit,
  Trash2,
  Plus,
  RefreshCw,
  Download,
  BarChart3,
  Building2,
  DollarSign,
  Monitor,
  MessageSquare,
  Settings,
  Users,
  TrendingUp,
  Star,
  MapPin,
  Phone,
  Mail,
  Eye,
  AlertCircle,
  Percent,
  FileText,
  HelpCircle,
  Info,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ComposedChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { useAuth } from '@/contexts/AuthContext';

// Mock data for all sections
const kpiData = {
  totalUsers: 15420,
  newUsers: 342,
  totalSalons: 89,
  activeSalons: 76,
  totalRevenue: 2456780,
  monthlyRevenue: 198450,
  totalBookings: 12543,
  monthlyBookings: 2156,
  averageBookingValue: 196,
  customerRetention: 87.5,
};

const revenueData = [
  { month: "Jul", revenue: 180000, gst: 19800, platformFee: 16500 },
  { month: "Aug", revenue: 195000, gst: 21360, platformFee: 17800 },
  { month: "Sep", revenue: 210000, gst: 22680, platformFee: 18900 },
  { month: "Oct", revenue: 225000, gst: 23400, platformFee: 19500 },
  { month: "Nov", revenue: 240000, gst: 24120, platformFee: 20100 },
  { month: "Dec", revenue: 198450, gst: 23814, platformFee: 19845 },
];

const userGrowthData = [
  { month: "Jan", users: 12000, newUsers: 1200 },
  { month: "Feb", users: 13200, newUsers: 1400 },
  { month: "Mar", users: 14600, newUsers: 1600 },
  { month: "Apr", users: 15000, newUsers: 1800 },
  { month: "May", users: 15200, newUsers: 1500 },
  { month: "Jun", users: 15420, newUsers: 342 },
];

const salonPerformanceData = [
  { name: "Top Performers", value: 35, color: "#0088FE" },
  { name: "Good Performers", value: 25, color: "#00C49F" },
  { name: "Average", value: 20, color: "#FFBB28" },
  { name: "Underperformers", value: 20, color: "#FF8042" },
];

const paymentMethodsData = [
  { method: "UPI", amount: 1200000, percentage: 49 },
  { method: "Credit Card", amount: 850000, percentage: 35 },
  { method: "Debit Card", amount: 300000, percentage: 12 },
  { method: "Net Banking", amount: 106780, percentage: 4 },
];

const servicePopularityData = [
  { service: "Hair Cut", bookings: 3200, revenue: 96000 },
  { service: "Hair Wash", bookings: 2800, revenue: 56000 },
  { service: "Hair Color", bookings: 2100, revenue: 105000 },
  { service: "Facial", bookings: 1800, revenue: 72000 },
  { service: "Manicure", bookings: 1500, revenue: 37500 },
  { service: "Pedicure", bookings: 1200, revenue: 36000 },
];

const customerRetentionData = [
  { segment: "New", retention: 65 },
  { segment: "Regular", retention: 85 },
  { segment: "VIP", retention: 95 },
];

const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    role: 'CUSTOMER',
    status: 'ACTIVE',
    createdAt: '2024-01-15T10:30:00Z',
    lastLogin: '2024-01-20T14:30:00Z',
    totalBookings: 12,
    totalSpent: 2400,
    location: 'Mumbai, Maharashtra'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+91 9876543211',
    role: 'SALON_OWNER',
    status: 'ACTIVE',
    createdAt: '2024-01-10T09:15:00Z',
    lastLogin: '2024-01-19T16:45:00Z',
    totalBookings: 0,
    totalSpent: 0,
    location: 'Delhi, Delhi'
  },
];

const mockSalons = [
  {
    id: '1',
    name: 'The Gents Cut',
    ownerName: 'Rajesh Kumar',
    ownerEmail: 'rajesh.kumar@example.com',
    ownerPhone: '+91 9876543210',
    status: 'ACTIVE',
    address: '123 Main Street, Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    services: ['Hair Cut', 'Shaving', 'Facial'],
    rating: 4.8,
    totalCustomers: 1250,
    totalRevenue: 187500,
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Style Studio',
    ownerName: 'Priya Sharma',
    ownerEmail: 'priya.sharma@example.com',
    ownerPhone: '+91 9876543211',
    status: 'PENDING',
    address: '456 Oak Avenue, Connaught Place',
    city: 'Delhi',
    state: 'Delhi',
    services: ['Hair Color', 'Hair Wash', 'Manicure'],
    rating: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    createdAt: '2024-01-20T14:30:00Z',
    partnershipRequestDate: '2024-01-20T14:30:00Z'
  },
];

const mockBookings = [
  {
    id: '1',
    customerName: 'John Doe',
    customerEmail: 'john.doe@example.com',
    customerPhone: '+91 9876543210',
    salonName: 'The Gents Cut',
    serviceName: 'Hair Cut',
    servicePrice: 300,
    status: 'CONFIRMED',
    bookingDate: '2024-01-22',
    bookingTime: '10:00',
    duration: 30,
    notes: 'Regular customer, prefers short back and sides',
    createdAt: '2024-01-20T14:30:00Z'
  },
  {
    id: '2',
    customerName: 'Jane Smith',
    customerEmail: 'jane.smith@example.com',
    customerPhone: '+91 9876543211',
    salonName: 'Style Studio',
    serviceName: 'Hair Color',
    servicePrice: 1500,
    status: 'PENDING',
    bookingDate: '2024-01-23',
    bookingTime: '14:30',
    duration: 120,
    notes: 'First time customer, allergic to ammonia',
    createdAt: '2024-01-21T09:15:00Z'
  },
];

const customerSegmentData = [
  { segment: 'High Value', customers: 850, revenue: 125000, avgOrder: 147 },
  { segment: 'Regular', customers: 2100, revenue: 189000, avgOrder: 90 },
  { segment: 'New', customers: 1200, revenue: 45000, avgOrder: 38 },
  { segment: 'Inactive', customers: 3200, revenue: 12000, avgOrder: 4 },
];

const geographicData = [
  { city: 'Mumbai', bookings: 2450, revenue: 189000, customers: 1200 },
  { city: 'Delhi', bookings: 1890, revenue: 145000, customers: 980 },
  { city: 'Bangalore', bookings: 1650, revenue: 132000, customers: 850 },
  { city: 'Chennai', bookings: 1200, revenue: 95000, customers: 650 },
  { city: 'Pune', bookings: 980, revenue: 78000, customers: 520 },
];

const conversionFunnelData = [
  { stage: 'Visitors', count: 50000, percentage: 100 },
  { stage: 'Registrations', count: 8500, percentage: 17 },
  { stage: 'First Booking', count: 4200, percentage: 8.4 },
  { stage: 'Repeat Bookings', count: 2100, percentage: 4.2 },
  { stage: 'VIP Customers', count: 850, percentage: 1.7 },
];

const servicePerformanceData = [
  { service: 'Hair Cut', bookings: 3200, revenue: 96000, rating: 4.8, growth: 12 },
  { service: 'Hair Wash', bookings: 2800, revenue: 56000, rating: 4.6, growth: 8 },
  { service: 'Hair Color', bookings: 2100, revenue: 105000, rating: 4.9, growth: 15 },
  { service: 'Facial', bookings: 1800, revenue: 72000, rating: 4.7, growth: 22 },
  { service: 'Manicure', bookings: 1500, revenue: 37500, rating: 4.5, growth: 18 },
  { service: 'Pedicure', bookings: 1200, revenue: 36000, rating: 4.4, growth: 25 },
];

const peakHoursData = [
  { hour: '9:00', bookings: 45 },
  { hour: '10:00', bookings: 78 },
  { hour: '11:00', bookings: 92 },
  { hour: '12:00', bookings: 85 },
  { hour: '13:00', bookings: 65 },
  { hour: '14:00', bookings: 88 },
  { hour: '15:00', bookings: 95 },
  { hour: '16:00', bookings: 120 },
  { hour: '17:00', bookings: 145 },
  { hour: '18:00', bookings: 165 },
  { hour: '19:00', bookings: 180 },
  { hour: '20:00', bookings: 155 },
];

const churnAnalysisData = [
  { month: 'Jan', acquired: 450, churned: 120, net: 330 },
  { month: 'Feb', acquired: 520, churned: 98, net: 422 },
  { month: 'Mar', acquired: 480, churned: 145, net: 335 },
  { month: 'Apr', acquired: 610, churned: 132, net: 478 },
  { month: 'May', acquired: 550, churned: 156, net: 394 },
  { month: 'Jun', acquired: 580, churned: 98, net: 482 },
];

const satisfactionData = [
  { rating: 5, count: 850, percentage: 42.5 },
  { rating: 4, count: 680, percentage: 34 },
  { rating: 3, count: 320, percentage: 16 },
  { rating: 2, count: 120, percentage: 6 },
  { rating: 1, count: 30, percentage: 1.5 },
];

const cohortData = [
  { cohort: 'Jan 2025', month0: 100, month1: 75, month2: 68, month3: 62, month4: 58, month5: 55, month6: 52 },
  { cohort: 'Feb 2025', month0: 120, month1: 95, month2: 88, month3: 82, month4: 78, month5: 74, month6: 0 },
  { cohort: 'Mar 2025', month0: 110, month1: 88, month2: 80, month3: 75, month4: 72, month5: 0, month6: 0 },
  { cohort: 'Apr 2025', month0: 135, month1: 108, month2: 98, month3: 92, month4: 0, month5: 0, month6: 0 },
  { cohort: 'May 2025', month0: 125, month1: 100, month2: 92, month3: 0, month4: 0, month5: 0, month6: 0 },
  { cohort: 'Jun 2025', month0: 140, month1: 112, month2: 0, month3: 0, month4: 0, month5: 0, month6: 0 },
];

const predictiveData = [
  { month: 'Jul', actual: 198450, predicted: 195000, lower: 185000, upper: 210000 },
  { month: 'Aug', actual: 0, predicted: 215000, lower: 200000, upper: 230000 },
  { month: 'Sep', actual: 0, predicted: 235000, lower: 215000, upper: 255000 },
  { month: 'Oct', actual: 0, predicted: 250000, lower: 230000, upper: 270000 },
  { month: 'Nov', actual: 0, predicted: 265000, lower: 245000, upper: 285000 },
  { month: 'Dec', actual: 0, predicted: 280000, lower: 260000, upper: 300000 },
];

const userActivityHeatmap = [
  { day: 'Mon', hour: '9:00', activity: 45 },
  { day: 'Mon', hour: '10:00', activity: 67 },
  { day: 'Mon', hour: '11:00', activity: 89 },
  { day: 'Mon', hour: '12:00', activity: 92 },
  { day: 'Mon', hour: '13:00', activity: 78 },
  { day: 'Mon', hour: '14:00', activity: 85 },
  { day: 'Mon', hour: '15:00', activity: 95 },
  { day: 'Mon', hour: '16:00', activity: 110 },
  { day: 'Mon', hour: '17:00', activity: 125 },
  { day: 'Mon', hour: '18:00', activity: 140 },
  { day: 'Mon', hour: '19:00', activity: 155 },
  { day: 'Mon', hour: '20:00', activity: 120 },
  { day: 'Tue', hour: '9:00', activity: 52 },
  { day: 'Tue', hour: '10:00', activity: 74 },
  { day: 'Tue', hour: '11:00', activity: 96 },
  { day: 'Tue', hour: '12:00', activity: 98 },
  { day: 'Tue', hour: '13:00', activity: 85 },
  { day: 'Tue', hour: '14:00', activity: 92 },
  { day: 'Tue', hour: '15:00', activity: 102 },
  { day: 'Tue', hour: '16:00', activity: 118 },
  { day: 'Tue', hour: '17:00', activity: 132 },
  { day: 'Tue', hour: '18:00', activity: 148 },
  { day: 'Tue', hour: '19:00', activity: 162 },
  { day: 'Tue', hour: '20:00', activity: 128 },
  { day: 'Wed', hour: '9:00', activity: 48 },
  { day: 'Wed', hour: '10:00', activity: 69 },
  { day: 'Wed', hour: '11:00', activity: 91 },
  { day: 'Wed', hour: '12:00', activity: 94 },
  { day: 'Wed', hour: '13:00', activity: 81 },
  { day: 'Wed', hour: '14:00', activity: 88 },
  { day: 'Wed', hour: '15:00', activity: 98 },
  { day: 'Wed', hour: '16:00', activity: 114 },
  { day: 'Wed', hour: '17:00', activity: 128 },
  { day: 'Wed', hour: '18:00', activity: 144 },
  { day: 'Wed', hour: '19:00', activity: 158 },
  { day: 'Wed', hour: '20:00', activity: 124 },
  { day: 'Thu', hour: '9:00', activity: 55 },
  { day: 'Thu', hour: '10:00', activity: 77 },
  { day: 'Thu', hour: '11:00', activity: 99 },
  { day: 'Thu', hour: '12:00', activity: 101 },
  { day: 'Thu', hour: '13:00', activity: 88 },
  { day: 'Thu', hour: '14:00', activity: 95 },
  { day: 'Thu', hour: '15:00', activity: 105 },
  { day: 'Thu', hour: '16:00', activity: 121 },
  { day: 'Thu', hour: '17:00', activity: 135 },
  { day: 'Thu', hour: '18:00', activity: 151 },
  { day: 'Thu', hour: '19:00', activity: 165 },
  { day: 'Thu', hour: '20:00', activity: 131 },
  { day: 'Fri', hour: '9:00', activity: 62 },
  { day: 'Fri', hour: '10:00', activity: 84 },
  { day: 'Fri', hour: '11:00', activity: 106 },
  { day: 'Fri', hour: '12:00', activity: 108 },
  { day: 'Fri', hour: '13:00', activity: 95 },
  { day: 'Fri', hour: '14:00', activity: 102 },
  { day: 'Fri', hour: '15:00', activity: 112 },
  { day: 'Fri', hour: '16:00', activity: 128 },
  { day: 'Fri', hour: '17:00', activity: 142 },
  { day: 'Fri', hour: '18:00', activity: 158 },
  { day: 'Fri', hour: '19:00', activity: 172 },
  { day: 'Fri', hour: '20:00', activity: 138 },
  { day: 'Sat', hour: '9:00', activity: 35 },
  { day: 'Sat', hour: '10:00', activity: 48 },
  { day: 'Sat', hour: '11:00', activity: 65 },
  { day: 'Sat', hour: '12:00', activity: 72 },
  { day: 'Sat', hour: '13:00', activity: 68 },
  { day: 'Sat', hour: '14:00', activity: 75 },
  { day: 'Sat', hour: '15:00', activity: 82 },
  { day: 'Sat', hour: '16:00', activity: 95 },
  { day: 'Sat', hour: '17:00', activity: 108 },
  { day: 'Sat', hour: '18:00', activity: 125 },
  { day: 'Sat', hour: '19:00', activity: 142 },
  { day: 'Sat', hour: '20:00', activity: 118 },
  { day: 'Sun', hour: '9:00', activity: 25 },
  { day: 'Sun', hour: '10:00', activity: 32 },
  { day: 'Sun', hour: '11:00', activity: 41 },
  { day: 'Sun', hour: '12:00', activity: 48 },
  { day: 'Sun', hour: '13:00', activity: 45 },
  { day: 'Sun', hour: '14:00', activity: 52 },
  { day: 'Sun', hour: '15:00', activity: 58 },
  { day: 'Sun', hour: '16:00', activity: 68 },
  { day: 'Sun', hour: '17:00', activity: 78 },
  { day: 'Sun', hour: '18:00', activity: 88 },
  { day: 'Sun', hour: '19:00', activity: 95 },
  { day: 'Sun', hour: '20:00', activity: 78 }
];

const userLifecycleData = [
  { stage: 'New User', count: 1200, percentage: 30 },
  { stage: 'Active User', count: 1800, percentage: 45 },
  { stage: 'Regular Customer', count: 650, percentage: 16 },
  { stage: 'VIP Customer', count: 200, percentage: 5 },
  { stage: 'Inactive', count: 150, percentage: 4 },
];

const userEngagementData = [
  { metric: 'Daily Active Users', value: 2450, change: 12 },
  { metric: 'Weekly Active Users', value: 8500, change: 8 },
  { metric: 'Monthly Active Users', value: 15420, change: 15 },
  { metric: 'Session Duration (min)', value: 8.5, change: -2 },
  { metric: 'Pages per Session', value: 4.2, change: 6 },
  { metric: 'Bounce Rate', value: 35, change: -5 },
];

const userDemographicsData = [
  { ageGroup: '18-24', count: 3200, percentage: 21 },
  { ageGroup: '25-34', count: 5800, percentage: 38 },
  { ageGroup: '35-44', count: 4100, percentage: 27 },
  { ageGroup: '45-54', count: 1800, percentage: 12 },
  { ageGroup: '55+', count: 520, percentage: 3 },
];

const salonPerformanceMetrics = [
  { metric: 'Average Rating', value: 4.7, change: 0.2, icon: Star },
  { metric: 'Total Bookings', value: 12543, change: 8.5, icon: CalendarIcon },
  { metric: 'Revenue Growth', value: 15.2, change: 3.1, icon: TrendingUp },
  { metric: 'Customer Satisfaction', value: 92, change: 2.1, icon: Users },
];

const salonRevenueData = [
  { salon: 'The Gents Cut', revenue: 187500, bookings: 1250, rating: 4.8 },
  { salon: 'Style Studio', revenue: 145000, bookings: 980, rating: 4.6 },
  { salon: 'Elegant Cuts', revenue: 132000, bookings: 850, rating: 4.7 },
  { salon: 'Premium Salon', revenue: 95000, bookings: 650, rating: 4.5 },
  { salon: 'Urban Styles', revenue: 78000, bookings: 520, rating: 4.4 },
];

const salonServiceTrends = [
  { service: 'Hair Cut', trend: 'up', growth: 12, color: '#10B981' },
  { service: 'Hair Color', trend: 'up', growth: 18, color: '#3B82F6' },
  { service: 'Facial', trend: 'up', growth: 25, color: '#8B5CF6' },
  { service: 'Manicure', trend: 'down', growth: -5, color: '#EF4444' },
  { service: 'Pedicure', trend: 'up', growth: 8, color: '#F59E0B' },
];

const salonGeographicData = [
  { city: 'Mumbai', salons: 15, revenue: 450000, avgRating: 4.6 },
  { city: 'Delhi', salons: 12, revenue: 380000, avgRating: 4.5 },
  { city: 'Bangalore', salons: 10, revenue: 320000, avgRating: 4.7 },
  { city: 'Chennai', salons: 8, revenue: 250000, avgRating: 4.4 },
  { city: 'Pune', salons: 6, revenue: 180000, avgRating: 4.3 },
];

const bookingTrendsData = [
  { date: '2024-01-01', bookings: 45, cancellations: 3, revenue: 8500 },
  { date: '2024-01-02', bookings: 52, cancellations: 4, revenue: 9200 },
  { date: '2024-01-03', bookings: 48, cancellations: 2, revenue: 8800 },
  { date: '2024-01-04', bookings: 61, cancellations: 5, revenue: 11200 },
  { date: '2024-01-05', bookings: 55, cancellations: 3, revenue: 9800 },
  { date: '2024-01-06', bookings: 49, cancellations: 4, revenue: 8900 },
  { date: '2024-01-07', bookings: 58, cancellations: 3, revenue: 10500 },
];

const bookingStatusData = [
  { status: 'Confirmed', count: 850, percentage: 68, color: '#10B981' },
  { status: 'Pending', count: 250, percentage: 20, color: '#F59E0B' },
  { status: 'Completed', count: 120, percentage: 10, color: '#3B82F6' },
  { status: 'Cancelled', count: 30, percentage: 2, color: '#EF4444' },
];

const bookingTimeSlots = [
  { time: '09:00', bookings: 45, revenue: 8500 },
  { time: '10:00', bookings: 62, revenue: 11200 },
  { time: '11:00', bookings: 58, revenue: 10500 },
  { time: '12:00', bookings: 48, revenue: 9200 },
  { time: '13:00', bookings: 35, revenue: 6800 },
  { time: '14:00', bookings: 52, revenue: 9800 },
  { time: '15:00', bookings: 48, revenue: 8800 },
  { time: '16:00', bookings: 71, revenue: 13200 },
  { time: '17:00', bookings: 85, revenue: 15800 },
  { time: '18:00', bookings: 92, revenue: 17200 },
  { time: '19:00', bookings: 78, revenue: 14800 },
  { time: '20:00', bookings: 55, revenue: 10200 },
];

const cancellationReasons = [
  { reason: 'Customer Request', count: 45, percentage: 45 },
  { reason: 'Salon Unavailable', count: 28, percentage: 28 },
  { reason: 'Payment Failed', count: 15, percentage: 15 },
  { reason: 'No Show', count: 12, percentage: 12 },
];

const financialKPIs = [
  { metric: 'Monthly Revenue', value: 198450, change: 12.5, icon: DollarSign },
  { metric: 'Net Profit Margin', value: 78, change: 2.1, icon: TrendingUp },
  { metric: 'Operating Expenses', value: 43200, change: -5.2, icon: AlertTriangle },
  { metric: 'Cash Flow', value: 156250, change: 8.7, icon: BarChart3 },
];

const profitLossData = [
  { category: 'Revenue', amount: 198450, type: 'income' },
  { category: 'Platform Fees', amount: -19845, type: 'expense' },
  { category: 'GST Collected', amount: 23814, type: 'income' },
  { category: 'Payment Gateway Fees', amount: -1984, type: 'expense' },
  { category: 'Marketing', amount: -15000, type: 'expense' },
  { category: 'Operations', amount: -12000, type: 'expense' },
  { category: 'Technology', amount: -8200, type: 'expense' },
  { category: 'Net Profit', amount: 156235, type: 'income' },
];

const cashFlowData = [
  { month: 'Jan', inflows: 180000, outflows: 43200, net: 136800 },
  { month: 'Feb', inflows: 195000, outflows: 45800, net: 149200 },
  { month: 'Mar', inflows: 210000, outflows: 47500, net: 162500 },
  { month: 'Apr', inflows: 225000, outflows: 49200, net: 175800 },
  { month: 'May', inflows: 240000, outflows: 51800, net: 188200 },
  { month: 'Jun', inflows: 198450, outflows: 42215, net: 156235 },
];

const expenseBreakdown = [
  { category: 'Platform Fees', amount: 19845, percentage: 46 },
  { category: 'Marketing', amount: 15000, percentage: 35 },
  { category: 'Operations', amount: 12000, percentage: 28 },
  { category: 'Technology', amount: 8200, percentage: 19 },
  { category: 'Other', amount: 3170, percentage: 7 },
];

const revenueStreams = [
  { source: 'Service Bookings', amount: 156250, percentage: 79, color: '#10B981' },
  { source: 'GST Collection', amount: 23814, percentage: 12, color: '#3B82F6' },
  { source: 'Late Fees', amount: 12500, percentage: 6, color: '#F59E0B' },
  { source: 'Premium Services', amount: 5886, percentage: 3, color: '#8B5CF6' },
];

const systemMetrics = [
  { metric: 'CPU Usage', value: 45, change: -5, status: 'healthy', icon: Monitor },
  { metric: 'Memory Usage', value: 78, change: 12, status: 'warning', icon: AlertTriangle },
  { metric: 'API Response Time', value: 245, change: -15, status: 'healthy', icon: Clock },
  { metric: 'Error Rate', value: 0.2, change: -0.1, status: 'healthy', icon: AlertCircle },
];

const apiPerformanceData = [
  { endpoint: '/api/bookings', requests: 1250, avgResponseTime: 245, errorRate: 0.2 },
  { endpoint: '/api/salons', requests: 890, avgResponseTime: 180, errorRate: 0.1 },
  { endpoint: '/api/users', requests: 650, avgResponseTime: 220, errorRate: 0.3 },
  { endpoint: '/api/payments', requests: 420, avgResponseTime: 320, errorRate: 0.5 },
  { endpoint: '/api/reviews', requests: 380, avgResponseTime: 195, errorRate: 0.1 },
];

const serverHealthData = [
  { time: '00:00', cpu: 35, memory: 65, responseTime: 180 },
  { time: '04:00', cpu: 25, memory: 55, responseTime: 165 },
  { time: '08:00', cpu: 45, memory: 75, responseTime: 220 },
  { time: '12:00', cpu: 55, memory: 80, responseTime: 280 },
  { time: '16:00', cpu: 65, memory: 85, responseTime: 320 },
  { time: '20:00', cpu: 45, memory: 78, responseTime: 245 },
];

const errorLogs = [
  { timestamp: '2024-01-20 14:30:25', level: 'ERROR', message: 'Payment gateway timeout', endpoint: '/api/payments', statusCode: 504 },
  { timestamp: '2024-01-20 13:45:12', level: 'WARNING', message: 'High memory usage detected', endpoint: '/api/bookings', statusCode: 200 },
  { timestamp: '2024-01-20 12:15:33', level: 'ERROR', message: 'Database connection failed', endpoint: '/api/users', statusCode: 500 },
  { timestamp: '2024-01-20 11:20:45', level: 'INFO', message: 'Scheduled maintenance completed', endpoint: '/system', statusCode: 200 },
  { timestamp: '2024-01-20 10:05:18', level: 'ERROR', message: 'Invalid authentication token', endpoint: '/api/bookings', statusCode: 401 },
];

const uptimeData = [
  { service: 'API Server', uptime: 99.9, status: 'operational', incidents: 2 },
  { service: 'Database', uptime: 99.5, status: 'operational', incidents: 5 },
  { service: 'Cache Server', uptime: 98.7, status: 'degraded', incidents: 12 },
  { service: 'Payment Gateway', uptime: 99.8, status: 'operational', incidents: 3 },
  { service: 'Email Service', uptime: 99.6, status: 'operational', incidents: 7 },
];

const contentMetrics = [
  { metric: 'Total Pages', value: 24, change: 2, icon: FileText },
  { metric: 'Active Templates', value: 18, change: 3, icon: Mail },
  { metric: 'Content Views', value: 45600, change: 12.5, icon: Eye },
  { metric: 'User Engagement', value: 78, change: 5.2, icon: Users },
];

const pagePerformance = [
  { page: 'Home', views: 12500, bounceRate: 25, avgTime: 180, conversions: 120 },
  { page: 'Salon Directory', views: 8900, bounceRate: 35, avgTime: 240, conversions: 85 },
  { page: 'Booking', views: 7800, bounceRate: 15, avgTime: 320, conversions: 156 },
  { page: 'About Us', views: 4500, bounceRate: 45, avgTime: 120, conversions: 12 },
  { page: 'Contact', views: 3200, bounceRate: 30, avgTime: 90, conversions: 8 },
];

const templateUsage = [
  { template: 'Booking Confirmation', sent: 2850, opened: 68, clicked: 24, converted: 12 },
  { template: 'Appointment Reminder', sent: 1920, opened: 75, clicked: 35, converted: 28 },
  { template: 'Payment Receipt', sent: 1650, opened: 82, clicked: 18, converted: 15 },
  { template: 'Welcome Email', sent: 980, opened: 45, clicked: 12, converted: 8 },
  { template: 'Review Request', sent: 720, opened: 55, clicked: 22, converted: 16 },
];

const contentEngagement = [
  { date: '2024-01-15', pageViews: 1250, uniqueVisitors: 890, avgSession: 185, bounceRate: 32 },
  { date: '2024-01-16', pageViews: 1420, uniqueVisitors: 1020, avgSession: 195, bounceRate: 28 },
  { date: '2024-01-17', pageViews: 1380, uniqueVisitors: 980, avgSession: 210, bounceRate: 30 },
  { date: '2024-01-18', pageViews: 1650, uniqueVisitors: 1150, avgSession: 225, bounceRate: 25 },
  { date: '2024-01-19', pageViews: 1580, uniqueVisitors: 1080, avgSession: 205, bounceRate: 27 },
  { date: '2024-01-20', pageViews: 1720, uniqueVisitors: 1220, avgSession: 235, bounceRate: 22 },
];

const faqMetrics = [
  { question: 'How to book an appointment?', views: 1250, helpful: 85, category: 'Booking' },
  { question: 'What services do you offer?', views: 980, helpful: 78, category: 'Services' },
  { question: 'How to cancel booking?', views: 750, helpful: 92, category: 'Booking' },
  { question: 'Payment methods accepted?', views: 680, helpful: 88, category: 'Payment' },
  { question: 'How to become a salon partner?', views: 520, helpful: 76, category: 'Partnership' },
];

const systemConfig = [
  { setting: 'User Registration', status: 'enabled', lastModified: '2024-01-18', modifiedBy: 'Admin' },
  { setting: 'Email Notifications', status: 'enabled', lastModified: '2024-01-17', modifiedBy: 'Admin' },
  { setting: 'SMS Notifications', status: 'enabled', lastModified: '2024-01-16', modifiedBy: 'Admin' },
  { setting: 'Payment Processing', status: 'enabled', lastModified: '2024-01-15', modifiedBy: 'Admin' },
  { setting: 'Geolocation Services', status: 'enabled', lastModified: '2024-01-14', modifiedBy: 'Admin' },
];

const securityLogs = [
  { timestamp: '2024-01-20 15:30:25', event: 'Admin Login', user: 'admin@bookmylook.com', ip: '192.168.1.100', status: 'success' },
  { timestamp: '2024-01-20 14:45:12', event: 'Failed Login Attempt', user: 'unknown', ip: '203.0.113.45', status: 'failed' },
  { timestamp: '2024-01-20 13:20:33', event: 'Password Change', user: 'user@example.com', ip: '192.168.1.150', status: 'success' },
  { timestamp: '2024-01-20 12:15:45', event: 'API Key Generated', user: 'partner@salon.com', ip: '192.168.1.200', status: 'success' },
  { timestamp: '2024-01-20 11:05:18', event: 'Role Permission Update', user: 'admin@bookmylook.com', ip: '192.168.1.100', status: 'success' },
];

const apiUsageStats = [
  { date: '2024-01-14', requests: 45200, errors: 45, avgLatency: 245 },
  { date: '2024-01-15', requests: 48900, errors: 38, avgLatency: 238 },
  { date: '2024-01-16', requests: 52100, errors: 52, avgLatency: 252 },
  { date: '2024-01-17', requests: 47800, errors: 41, avgLatency: 241 },
  { date: '2024-01-18', requests: 51200, errors: 47, avgLatency: 249 },
  { date: '2024-01-19', requests: 49800, errors: 39, avgLatency: 235 },
  { date: '2024-01-20', requests: 53600, errors: 43, avgLatency: 247 },
];

const configurationMetrics = [
  { metric: 'Active API Keys', value: 24, change: 3, icon: Settings },
  { metric: 'Security Alerts', value: 5, change: -2, icon: AlertTriangle },
  { metric: 'Configuration Changes', value: 18, change: 4, icon: Edit },
  { metric: 'System Backups', value: 7, change: 1, icon: Download },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("analytics");
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedSalon, setSelectedSalon] = useState<any>(null);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isSalonDialogOpen, setIsSalonDialogOpen] = useState(false);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false);
  const [isRejectionDialogOpen, setIsRejectionDialogOpen] = useState(false);
  const [isHeatmapModalOpen, setIsHeatmapModalOpen] = useState(false);

  // Real data states
  const [users, setUsers] = useState<any[]>([]);
  const [salons, setSalons] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [usersPagination, setUsersPagination] = useState<any>({});
  const [salonsPagination, setSalonsPagination] = useState<any>({});
  const [bookingsPagination, setBookingsPagination] = useState<any>({});
  const [dataLoading, setDataLoading] = useState(false);

  // Dialog and form states
  const [loading, setLoading] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [cancelReason, setCancelReason] = useState('');
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

  console.log('🔍 AdminDashboard: Current user:', user);
  console.log('🔍 AdminDashboard: Is authenticated:', isAuthenticated);
  console.log('🔍 AdminDashboard: User role:', user?.role);

  // Fetch data functions
  const fetchUsers = async () => {
    try {
      setDataLoading(true);
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      console.log('🔍 AdminDashboard: Fetching users, token:', token ? 'PRESENT' : 'NOT FOUND');

      const response = await fetch(`/api/admin/users?search=${searchTerm}&status=${statusFilter}`, {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        credentials: 'include'
      });

      console.log('📡 AdminDashboard: Users API response status:', response.status);

      if (response.ok) {
        const result = await response.json();
        console.log('✅ AdminDashboard: Users API response:', result);
        console.log('📊 AdminDashboard: Users count:', result.data?.users?.length || 0);
        console.log('📋 AdminDashboard: First user sample:', result.data?.users?.[0]);
        if (result.success) {
          setUsers(result.data.users || []);
          setUsersPagination(result.data.pagination || {});
        }
      } else {
        console.log('❌ AdminDashboard: Users API failed with status:', response.status);
      }
    } catch (error) {
      console.error('❌ AdminDashboard: Error fetching users:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const fetchSalons = async () => {
    try {
      setDataLoading(true);
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      console.log('🔍 AdminDashboard: Fetching salons, token:', token ? 'PRESENT' : 'NOT FOUND');

      const response = await fetch(`/api/admin/salons?search=${searchTerm}&status=${statusFilter}`, {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        credentials: 'include'
      });

      console.log('📡 AdminDashboard: Salons API response status:', response.status);

      if (response.ok) {
        const result = await response.json();
        console.log('✅ AdminDashboard: Salons API response:', result);
        console.log('📊 AdminDashboard: Salons count:', result.data?.salons?.length || 0);
        console.log('📋 AdminDashboard: First salon sample:', result.data?.salons?.[0]);
        if (result.success) {
          setSalons(result.data.salons || []);
          setSalonsPagination(result.data.pagination || {});
        }
      } else {
        console.log('❌ AdminDashboard: Salons API failed with status:', response.status);
      }
    } catch (error) {
      console.error('❌ AdminDashboard: Error fetching salons:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      setDataLoading(true);
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      console.log('🔍 AdminDashboard: Fetching bookings, token:', token ? 'PRESENT' : 'NOT FOUND');

      const response = await fetch(`/api/admin/bookings?search=${searchTerm}&status=${statusFilter}`, {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        credentials: 'include'
      });

      console.log('📡 AdminDashboard: Bookings API response status:', response.status);

      if (response.ok) {
        const result = await response.json();
        console.log('✅ AdminDashboard: Bookings API response:', result);
        console.log('📊 AdminDashboard: Bookings count:', result.data?.bookings?.length || 0);
        console.log('📋 AdminDashboard: First booking sample:', result.data?.bookings?.[0]);
        if (result.success) {
          setBookings(result.data.bookings || []);
          setBookingsPagination(result.data.pagination || {});
        }
      } else {
        console.log('❌ AdminDashboard: Bookings API failed with status:', response.status);
        const errorText = await response.text();
        console.log('❌ AdminDashboard: Bookings API error details:', errorText);
      }
    } catch (error) {
      console.error('❌ AdminDashboard: Error fetching bookings:', error);
    } finally {
      setDataLoading(false);
    }
  };

  // Fetch data when tab changes or filters change
  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers();
    } else if (activeTab === 'salons') {
      fetchSalons();
    } else if (activeTab === 'bookings') {
      fetchBookings();
    }
  }, [activeTab, searchTerm, statusFilter]);

  // Filter data based on search and status (client-side filtering as backup)
  const filteredUsers = users;
  const filteredSalons = salons;

  const getStatusBadge = (status: string, type: 'user' | 'salon' | 'booking' = 'user') => {
    let variants: any = {
      ACTIVE: 'default',
      INACTIVE: 'secondary',
      SUSPENDED: 'destructive',
      PENDING: 'secondary',
      CONFIRMED: 'default',
      COMPLETED: 'default',
      CANCELLED: 'destructive',
      APPROVED: 'default',
      REJECTED: 'destructive',
    };

    let icons: any = {
      ACTIVE: CheckCircle,
      PENDING: Clock,
      CONFIRMED: CheckCircle,
      COMPLETED: CheckCircle,
      CANCELLED: XCircle,
      SUSPENDED: AlertTriangle,
      APPROVED: CheckCircle,
      REJECTED: XCircle,
    };

    const Icon = icons[status as keyof typeof icons] || AlertTriangle;
    return (
      <Badge variant={variants[status as keyof typeof variants] || 'outline'} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status.replace('_', ' ')}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => `₹${amount.toLocaleString()}`;
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleStatusChange = async (id: string, newStatus: string, type: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      
      let endpoint = '';
      let body = {};

      if (type === 'user') {
        endpoint = `/api/admin/users/${id}/status`;
        body = { isActive: newStatus === 'ACTIVE' };
      } else if (type === 'salon') {
        endpoint = `/api/admin/salons/${id}/status`;
        const action = newStatus === 'ACTIVE' ? 'activate' : 
                     newStatus === 'PENDING' ? 'reject' : 'suspend';
        body = { action };
      } else if (type === 'booking') {
        endpoint = `/api/admin/bookings/${id}/status`;
        body = { status: newStatus };
      }

      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        credentials: 'include',
        body: JSON.stringify(body)
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          // Refresh data
          if (type === 'user') fetchUsers();
          else if (type === 'salon') fetchSalons();
          else if (type === 'booking') fetchBookings();
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveSalon = async (salonId: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      const response = await fetch(`/api/admin/salons/${salonId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        credentials: 'include',
        body: JSON.stringify({ action: 'approve' })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          fetchSalons(); // Refresh data
          setIsApprovalDialogOpen(false);
        }
      }
    } catch (error) {
      console.error('Error approving salon:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRejectSalon = async (salonId: string) => {
    if (!rejectionReason.trim()) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      const response = await fetch(`/api/admin/salons/${salonId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        credentials: 'include',
        body: JSON.stringify({ action: 'reject' })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          fetchSalons(); // Refresh data
          setIsRejectionDialogOpen(false);
          setRejectionReason('');
        }
      }
    } catch (error) {
      console.error('Error rejecting salon:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (!cancelReason.trim()) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      const response = await fetch(`/api/admin/bookings/${bookingId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        credentials: 'include',
        body: JSON.stringify({ status: 'CANCELLED', notes: cancelReason })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          fetchBookings(); // Refresh data
          setIsCancelDialogOpen(false);
          setCancelReason('');
        }
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground text-lg">Complete platform management and analytics</p>
        
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-8 h-auto p-1">
          <TabsTrigger value="analytics" className="flex flex-col items-center gap-1 py-3 px-2">
            <BarChart3 className="h-4 w-4" />
            <span className="text-xs">Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex flex-col items-center gap-1 py-3 px-2">
            <Users className="h-4 w-4" />
            <span className="text-xs">Users</span>
          </TabsTrigger>
          <TabsTrigger value="salons" className="flex flex-col items-center gap-1 py-3 px-2">
            <Building2 className="h-4 w-4" />
            <span className="text-xs">Salons</span>
          </TabsTrigger>
          <TabsTrigger value="bookings" className="flex flex-col items-center gap-1 py-3 px-2">
            <CalendarIcon className="h-4 w-4" />
            <span className="text-xs">Bookings</span>
          </TabsTrigger>
          <TabsTrigger value="financial" className="flex flex-col items-center gap-1 py-3 px-2">
            <DollarSign className="h-4 w-4" />
            <span className="text-xs">Financial</span>
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="flex flex-col items-center gap-1 py-3 px-2">
            <Monitor className="h-4 w-4" />
            <span className="text-xs">Monitoring</span>
          </TabsTrigger>
          <TabsTrigger value="content" className="flex flex-col items-center gap-1 py-3 px-2">
            <MessageSquare className="h-4 w-4" />
            <span className="text-xs">Content</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex flex-col items-center gap-1 py-3 px-2">
            <Settings className="h-4 w-4" />
            <span className="text-xs">Settings</span>
          </TabsTrigger>
        </TabsList>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          {/* Advanced KPI Dashboard */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpiData.totalUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600 flex items-center">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    +{kpiData.newUsers} new this month
                  </span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Salons</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpiData.activeSalons}</div>
                <p className="text-xs text-muted-foreground">
                  {kpiData.totalSalons} total registered
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(kpiData.monthlyRevenue)}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600 flex items-center">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    +12.5% from last month
                  </span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Customer Retention</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpiData.customerRetention}%</div>
                <p className="text-xs text-muted-foreground">
                  Average across all segments
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Booking Value</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(kpiData.averageBookingValue)}</div>
                <p className="text-xs text-muted-foreground">
                  Per transaction
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Advanced Analytics Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Revenue Trend with Prediction */}
            <Card>
              <CardHeader>
                <CardTitle>Predictive Revenue Analysis</CardTitle>
                <CardDescription>Actual vs Predicted revenue with confidence intervals</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={predictiveData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(value) => [formatCurrency(value as number), '']} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="upper"
                      stackId="1"
                      stroke="none"
                      fill="#e1f5fe"
                      fillOpacity={0.3}
                    />
                    <Area
                      type="monotone"
                      dataKey="lower"
                      stackId="1"
                      stroke="none"
                      fill="#ffffff"
                      fillOpacity={1}
                    />
                    <Line
                      type="monotone"
                      dataKey="predicted"
                      stroke="#ff9800"
                      strokeWidth={3}
                      strokeDasharray="5 5"
                      name="Predicted"
                    />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      stroke="#2196f3"
                      strokeWidth={3}
                      name="Actual"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Customer Segmentation */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Segmentation Analysis</CardTitle>
                <CardDescription>Revenue distribution by customer segments</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={customerSegmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="segment" />
                    <YAxis yAxisId="left" tickFormatter={(value) => `${value}`} />
                    <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `₹${value / 1000}k`} />
                    <Tooltip
                      formatter={(value, name) => [
                        name === 'customers' ? value : formatCurrency(value as number),
                        name === 'customers' ? 'Customers' : name === 'revenue' ? 'Revenue' : 'Avg Order'
                      ]}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="customers" fill="#8884d8" name="customers" />
                    <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" name="revenue" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Conversion Funnel */}
            <Card>
              <CardHeader>
                <CardTitle>Conversion Funnel</CardTitle>
                <CardDescription>User journey from visitor to VIP customer</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={conversionFunnelData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="stage" angle={-45} textAnchor="end" height={80} />
                    <YAxis type="number" domain={[0, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Conversion Rate']} />
                    <Bar dataKey="percentage" fill="#8884d8" name="Conversion Rate" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Geographic Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Geographic Performance</CardTitle>
                <CardDescription>Revenue and bookings by city</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={geographicData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="city" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip formatter={(value, name) => [
                      name === 'revenue' ? formatCurrency(value as number) : value,
                      name === 'revenue' ? 'Revenue' : 'Bookings'
                    ]} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="bookings" fill="#8884d8" name="bookings" />
                    <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" name="revenue" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Peak Hours Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Peak Hours Analysis</CardTitle>
                <CardDescription>Booking patterns throughout the day</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={peakHoursData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip formatter={(value) => [value, 'Bookings']} />
                    <Area
                      type="monotone"
                      dataKey="bookings"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Service Performance Radar */}
            <Card>
              <CardHeader>
                <CardTitle>Service Performance Matrix</CardTitle>
                <CardDescription>Revenue, rating, and growth by service</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={servicePerformanceData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="service" />
                    <PolarRadiusAxis />
                    <Radar
                      name="Revenue (₹1000s)"
                      dataKey="revenue"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.3}
                    />
                    <Radar
                      name="Rating"
                      dataKey="rating"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      fillOpacity={0.3}
                    />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Churn Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Churn Analysis</CardTitle>
                <CardDescription>Customer acquisition vs churn trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={churnAnalysisData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="acquired" fill="#82ca9d" name="Acquired" />
                    <Bar dataKey="churned" fill="#ff7c7c" name="Churned" />
                    <Line
                      type="monotone"
                      dataKey="net"
                      stroke="#8884d8"
                      strokeWidth={3}
                      name="Net Growth"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Customer Satisfaction */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Satisfaction</CardTitle>
                <CardDescription>Rating distribution and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={satisfactionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ rating, percentage }) => `${rating}★ (${percentage}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {satisfactionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [value, 'Count']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Cohort Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Cohort Analysis</CardTitle>
              <CardDescription>User retention by acquisition month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Cohort</th>
                      <th className="text-center py-2">Month 0</th>
                      <th className="text-center py-2">Month 1</th>
                      <th className="text-center py-2">Month 2</th>
                      <th className="text-center py-2">Month 3</th>
                      <th className="text-center py-2">Month 4</th>
                      <th className="text-center py-2">Month 5</th>
                      <th className="text-center py-2">Month 6</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cohortData.map((cohort, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 font-medium">{cohort.cohort}</td>
                        <td className="text-center py-2 bg-blue-100">{cohort.month0}%</td>
                        <td className={`text-center py-2 ${cohort.month1 > 0 ? 'bg-green-100' : ''}`}>{cohort.month1 || '-'}</td>
                        <td className={`text-center py-2 ${cohort.month2 > 0 ? 'bg-green-100' : ''}`}>{cohort.month2 || '-'}</td>
                        <td className={`text-center py-2 ${cohort.month3 > 0 ? 'bg-green-100' : ''}`}>{cohort.month3 || '-'}</td>
                        <td className={`text-center py-2 ${cohort.month4 > 0 ? 'bg-green-100' : ''}`}>{cohort.month4 || '-'}</td>
                        <td className={`text-center py-2 ${cohort.month5 > 0 ? 'bg-green-100' : ''}`}>{cohort.month5 || '-'}</td>
                        <td className={`text-center py-2 ${cohort.month6 > 0 ? 'bg-green-100' : ''}`}>{cohort.month6 || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          {/* Advanced User Analytics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Daily Active Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userEngagementData[0].value.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600 flex items-center">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    +{userEngagementData[0].change}% from yesterday
                  </span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Session Duration</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userEngagementData[3].value} min</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-red-600 flex items-center">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    {userEngagementData[3].change} min from last week
                  </span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pages per Session</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userEngagementData[4].value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600 flex items-center">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    +{userEngagementData[4].change}% improvement
                  </span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userEngagementData[5].value}%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600 flex items-center">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    {userEngagementData[5].change}% reduction
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Advanced User Analytics Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* User Lifecycle Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>User Lifecycle Stages</CardTitle>
                <CardDescription>Distribution of users across lifecycle stages</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={userLifecycleData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ stage, percentage }) => `${stage} (${percentage}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {userLifecycleData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [value, 'Users']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* User Demographics */}
            <Card>
              <CardHeader>
                <CardTitle>User Demographics</CardTitle>
                <CardDescription>Age distribution of platform users</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={userDemographicsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ageGroup" />
                    <YAxis />
                    <Tooltip formatter={(value) => [value, 'Users']} />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* User Engagement Trends */}
            <Card>
              <CardHeader>
                <CardTitle>User Engagement Trends</CardTitle>
                <CardDescription>Weekly active users over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [value, 'Users']} />
                    <Area
                      type="monotone"
                      dataKey="users"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* User Activity Heatmap */}
            <Card>
              <CardHeader>
                <CardTitle>User Activity Heatmap</CardTitle>
                <CardDescription>Peak usage hours and days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Monitor className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">Real-time activity heatmap</p>
                  <p className="text-xs text-muted-foreground">Shows user activity patterns across hours and days</p>
                  <Button 
                    className="mt-4" 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsHeatmapModalOpen(true)}
                  >
                    View Heatmap
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Search, filter, and manage platform users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <Label htmlFor="user-search">Search Users</Label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="user-search"
                      placeholder="Search by name, email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <div className="sm:w-48">
                  <Label>Status</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="INACTIVE">Inactive</SelectItem>
                      <SelectItem value="SUSPENDED">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3 mb-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{users.filter(u => u.status === 'ACTIVE').length}</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{users.filter(u => u.role === 'SALON_OWNER').length}</div>
                  <div className="text-sm text-muted-foreground">Salon Owners</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{users.filter(u => u.role === 'CUSTOMER').length}</div>
                  <div className="text-sm text-muted-foreground">Customers</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>Users ({usersPagination.total || users.length})</CardTitle>
              <CardDescription>Manage user accounts and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Bookings</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="" alt={user.name} />
                            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.role.replace('_', ' ')}</Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(user.status, 'user')}</TableCell>
                      <TableCell>{formatDate(user.createdAt)}</TableCell>
                      <TableCell>{user.totalBookings || 0}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Salons Tab */}
        <TabsContent value="salons" className="space-y-6">
          {/* Salon Performance KPIs */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {salonPerformanceMetrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.metric}</CardTitle>
                  <metric.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {metric.metric === 'Customer Satisfaction' ? `${metric.value}%` : 
                     metric.metric === 'Revenue Growth' ? `${metric.value}%` :
                     metric.metric === 'Average Rating' ? metric.value : metric.value.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600 flex items-center">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      +{metric.change} from last month
                    </span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Advanced Salon Analytics Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Salon Revenue Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Salons</CardTitle>
                <CardDescription>Revenue and booking performance by salon</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salonRevenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="salon" angle={-45} textAnchor="end" height={80} />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip formatter={(value, name) => [
                      name === 'revenue' ? formatCurrency(value as number) : value,
                      name === 'revenue' ? 'Revenue' : 'Bookings'
                    ]} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="bookings" fill="#8884d8" name="bookings" />
                    <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" name="revenue" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Service Trends Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Service Popularity Trends</CardTitle>
                <CardDescription>Growth trends for different salon services</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salonServiceTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="service" />
                    <YAxis />
                    <Tooltip formatter={(value, name, props) => [
                      `${value}%`,
                      name === 'growth' ? 'Growth Rate' : name
                    ]} />
                    <Bar dataKey="growth" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Geographic Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Salon Geographic Distribution</CardTitle>
                <CardDescription>Salon count and performance by city</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={salonGeographicData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="city" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip formatter={(value, name) => [
                      value,
                      name === 'salons' ? 'Salon Count' : name === 'avgRating' ? 'Avg Rating' : name
                    ]} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="salons" fill="#8884d8" name="salons" />
                    <Line yAxisId="right" type="monotone" dataKey="avgRating" stroke="#ff7300" strokeWidth={3} name="avgRating" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Salon Status Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Salon Partnership Status</CardTitle>
                <CardDescription>Distribution of salon approval statuses</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Active', value: salons.filter(s => s.status === 'ACTIVE').length, color: '#10B981' },
                        { name: 'Pending', value: salons.filter(s => s.status === 'PENDING').length, color: '#F59E0B' },
                        { name: 'Inactive', value: salons.filter(s => s.status === 'INACTIVE').length, color: '#EF4444' },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {[
                        { name: 'Active', value: salons.filter(s => s.status === 'ACTIVE').length, color: '#10B981' },
                        { name: 'Pending', value: salons.filter(s => s.status === 'PENDING').length, color: '#F59E0B' },
                        { name: 'Inactive', value: salons.filter(s => s.status === 'INACTIVE').length, color: '#EF4444' },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Salon Management Section */}
          <Card>
            <CardHeader>
              <CardTitle>Salon Partnership Management</CardTitle>
              <CardDescription>Search, filter, and manage salon partnerships</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <Label htmlFor="salon-search">Search Salons</Label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="salon-search"
                      placeholder="Search by salon name, owner..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <div className="sm:w-48">
                  <Label>Status</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="INACTIVE">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-4 mb-6">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{salons.filter(s => s.status === 'ACTIVE').length}</div>
                  <p className="text-sm text-muted-foreground">Active Salons</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{salons.filter(s => s.status === 'PENDING').length}</div>
                  <p className="text-sm text-muted-foreground">Pending Approval</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{salons.length}</div>
                  <p className="text-sm text-muted-foreground">Total Salons</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {(salons.reduce((sum, salon) => sum + salon.totalRevenue, 0) / salons.length || 0).toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">Avg Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Salons Table */}
          <Card>
            <CardHeader>
              <CardTitle>Salons ({salonsPagination.total || salons.length})</CardTitle>
              <CardDescription>Manage salon partnerships and approvals</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Salon</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salons.map((salon) => (
                    <TableRow key={salon.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{salon.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {salon.services.slice(0, 2).join(', ')}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{salon.ownerName}</div>
                          <div className="text-sm text-muted-foreground">{salon.ownerEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(salon.status, 'salon')}</TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <MapPin className="mr-1 h-3 w-3" />
                          {salon.city}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {salon.rating}
                        </div>
                      </TableCell>
                      <TableCell>{formatCurrency(salon.totalRevenue)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Salon
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <BarChart3 className="mr-2 h-4 w-4" />
                              View Analytics
                            </DropdownMenuItem>
                            {salon.status === 'PENDING' && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedSalon(salon);
                                    setIsApprovalDialogOpen(true);
                                  }}
                                  className="text-green-600"
                                >
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedSalon(salon);
                                    setIsRejectionDialogOpen(true);
                                  }}
                                  className="text-red-600"
                                >
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Reject
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bookings Tab */}
        <TabsContent value="bookings" className="space-y-6">
          {/* Booking Analytics KPIs */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card key="total-bookings">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpiData.totalBookings.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600 flex items-center">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    +{kpiData.monthlyBookings} this month
                  </span>
                </p>
              </CardContent>
            </Card>

            <Card key="avg-booking-value">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Booking Value</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(kpiData.averageBookingValue)}</div>
                <p className="text-xs text-muted-foreground">
                  Per transaction
                </p>
              </CardContent>
            </Card>

            <Card key="cancellation-rate">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cancellation Rate</CardTitle>
                <XCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.1%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600 flex items-center">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    -0.3% from last month
                  </span>
                </p>
              </CardContent>
            </Card>

            <Card key="peak-hour">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Peak Hour</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6:00 PM</div>
                <p className="text-xs text-muted-foreground">
                  Highest booking volume
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Advanced Booking Analytics Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Booking Trends Over Time */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Trends & Revenue</CardTitle>
                <CardDescription>Daily bookings and revenue patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={bookingTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip formatter={(value, name) => [
                      name === 'revenue' ? formatCurrency(value as number) : value,
                      name === 'revenue' ? 'Revenue' : name === 'bookings' ? 'Bookings' : 'Cancellations'
                    ]} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="bookings" fill="#8884d8" name="bookings" />
                    <Bar yAxisId="left" dataKey="cancellations" fill="#ff7c7c" name="cancellations" />
                    <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#82ca9d" strokeWidth={3} name="revenue" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Booking Status Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Status Distribution</CardTitle>
                <CardDescription>Current status of all bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={bookingStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ status, percentage }) => `${status} (${percentage}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {bookingStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [value, 'Bookings']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Peak Hours Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Peak Hours Analysis</CardTitle>
                <CardDescription>Booking volume by time slots</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={bookingTimeSlots}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip formatter={(value, name) => [
                      name === 'revenue' ? formatCurrency(value as number) : value,
                      name === 'revenue' ? 'Revenue' : 'Bookings'
                    ]} />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="bookings"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                      name="bookings"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="revenue"
                      stroke="#82ca9d"
                      strokeWidth={3}
                      name="revenue"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Cancellation Reasons */}
            <Card>
              <CardHeader>
                <CardTitle>Cancellation Analysis</CardTitle>
                <CardDescription>Reasons for booking cancellations</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={cancellationReasons} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="reason" type="category" width={120} />
                    <Tooltip formatter={(value) => [value, 'Count']} />
                    <Bar dataKey="count" fill="#ff7c7c" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Booking Management Section */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Management</CardTitle>
              <CardDescription>Search, filter, and manage all bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <Label htmlFor="booking-search">Search Bookings</Label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="booking-search"
                      placeholder="Search by customer, salon, service..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <div className="sm:w-48">
                  <Label>Status</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="COMPLETED">Completed</SelectItem>
                      <SelectItem value="CANCELLED">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-4 mb-6">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">{(bookings || []).filter(b => b.status === 'CONFIRMED').length}</div>
                  <div className="text-sm text-muted-foreground">Confirmed</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{(bookings || []).filter(b => b.status === 'COMPLETED').length}</div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{(bookings || []).filter(b => b.status === 'PENDING').length}</div>
                  <div className="text-sm text-muted-foreground">Pending</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{(bookings || []).filter(b => b.status === 'CANCELLED').length}</div>
                  <div className="text-sm text-muted-foreground">Cancelled</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bookings Table */}
          <Card>
            <CardHeader>
              <CardTitle>Bookings ({bookingsPagination.total || (bookings || []).length})</CardTitle>
              <CardDescription>Manage and monitor all booking reservations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Salon</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(bookings || []).map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="" alt={booking.customerName} />
                            <AvatarFallback>{booking.customerName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{booking.customerName}</div>
                            <div className="text-sm text-muted-foreground">{booking.customerEmail}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{booking.serviceName}</div>
                          <div className="text-sm text-muted-foreground">{booking.duration} min</div>
                        </div>
                      </TableCell>
                      <TableCell>{booking.salonName}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{formatDate(booking.bookingDate)}</div>
                          <div className="text-sm text-muted-foreground">{booking.bookingTime}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(booking.status, 'booking')}</TableCell>
                      <TableCell>{formatCurrency(booking.servicePrice)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedBooking(booking)}>
                              <User className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Booking
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedBooking(booking);
                                setIsCancelDialogOpen(true);
                              }}
                              className="text-red-600"
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Cancel Booking
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Financial Tab */}
        <TabsContent value="financial" className="space-y-6">
          {/* Financial KPIs */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {financialKPIs.map((kpi, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{kpi.metric}</CardTitle>
                  <kpi.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {kpi.metric === 'Net Profit Margin' ? `${kpi.value}%` :
                     kpi.metric === 'Monthly Revenue' ? formatCurrency(kpi.value) :
                     kpi.metric === 'Operating Expenses' ? formatCurrency(kpi.value) :
                     formatCurrency(kpi.value)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <span className={kpi.change > 0 ? "text-green-600" : "text-red-600"}>
                      <TrendingUp className="mr-1 h-3 w-3 inline" />
                      {kpi.change > 0 ? '+' : ''}{kpi.change}% from last month
                    </span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Advanced Financial Analytics Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Profit & Loss Statement */}
            <Card>
              <CardHeader>
                <CardTitle>Profit & Loss Statement</CardTitle>
                <CardDescription>Monthly income and expense breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={profitLossData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tickFormatter={(value) => `₹${Math.abs(value) / 1000}k`} />
                    <YAxis dataKey="category" type="category" width={120} />
                    <Tooltip formatter={(value) => [formatCurrency(Math.abs(value as number)), '']} />
                    <Bar dataKey="amount" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Cash Flow Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Cash Flow Analysis</CardTitle>
                <CardDescription>Monthly cash inflows vs outflows</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={cashFlowData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `₹${value / 1000}k`} />
                    <Tooltip formatter={(value) => [formatCurrency(value as number), '']} />
                    <Legend />
                    <Bar dataKey="inflows" fill="#10B981" name="Cash Inflows" />
                    <Bar dataKey="outflows" fill="#EF4444" name="Cash Outflows" />
                    <Line
                      type="monotone"
                      dataKey="net"
                      stroke="#3B82F6"
                      strokeWidth={3}
                      name="Net Cash Flow"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Revenue Streams */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Streams</CardTitle>
                <CardDescription>Breakdown of revenue sources</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={revenueStreams}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ source, percentage }) => `${source} (${percentage}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="amount"
                    >
                      {revenueStreams.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [formatCurrency(value as number), 'Revenue']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Expense Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>Monthly operating expenses by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={expenseBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
                    <YAxis tickFormatter={(value) => `₹${value / 1000}k`} />
                    <Tooltip formatter={(value) => [formatCurrency(value as number), 'Expense']} />
                    <Bar dataKey="amount" fill="#EF4444" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Financial Summary Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Financial Health Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">92/100</div>
                  <p className="text-sm text-muted-foreground">Strong financial position</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Growth Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Revenue Growth</span>
                    <span className="text-sm font-medium text-green-600">+12.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Profit Margin</span>
                    <span className="text-sm font-medium text-green-600">78%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Customer LTV</span>
                    <span className="text-sm font-medium">₹2,400</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cash Position</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Available Cash</span>
                    <span className="text-sm font-medium">₹1,250,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Monthly Burn Rate</span>
                    <span className="text-sm font-medium">₹42,200</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Runway</span>
                    <span className="text-sm font-medium text-green-600">30 months</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Monitoring Tab */}
        <TabsContent value="monitoring" className="space-y-6">
          {/* System Health Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {systemMetrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.metric}</CardTitle>
                  <metric.icon className={`h-4 w-4 ${metric.status === 'warning' ? 'text-yellow-500' : 'text-muted-foreground'}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {metric.metric === 'API Response Time' ? `${metric.value}ms` :
                     metric.metric === 'Error Rate' ? `${metric.value}%` :
                     `${metric.value}%`}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <span className={metric.change > 0 ? "text-red-600" : "text-green-600"}>
                      <TrendingUp className="mr-1 h-3 w-3 inline" />
                      {metric.change > 0 ? '+' : ''}{metric.change}{metric.metric === 'API Response Time' ? 'ms' : metric.metric === 'Error Rate' ? '%' : '%'} from last hour
                    </span>
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className={`h-2 rounded-full ${
                        metric.status === 'warning' ? 'bg-yellow-500' :
                        metric.value > 80 ? 'bg-red-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(metric.value, 100)}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Advanced Monitoring Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Server Health Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Server Health Trends</CardTitle>
                <CardDescription>Real-time system performance over 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={serverHealthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="cpu" stroke="#8884d8" strokeWidth={2} name="CPU %" />
                    <Line yAxisId="left" type="monotone" dataKey="memory" stroke="#82ca9d" strokeWidth={2} name="Memory %" />
                    <Line yAxisId="right" type="monotone" dataKey="responseTime" stroke="#ff7300" strokeWidth={2} name="Response Time (ms)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* API Performance */}
            <Card>
              <CardHeader>
                <CardTitle>API Performance</CardTitle>
                <CardDescription>Endpoint response times and request volumes</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={apiPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="endpoint" angle={-45} textAnchor="end" height={80} />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="requests" fill="#8884d8" name="Requests" />
                    <Line yAxisId="right" type="monotone" dataKey="avgResponseTime" stroke="#ff7300" strokeWidth={3} name="Avg Response (ms)" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Service Uptime Status */}
            <Card>
              <CardHeader>
                <CardTitle>Service Uptime Status</CardTitle>
                <CardDescription>System availability and incident tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {uptimeData.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          service.status === 'operational' ? 'bg-green-500' :
                          service.status === 'degraded' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                        <div>
                          <div className="font-medium">{service.service}</div>
                          <div className="text-sm text-muted-foreground">{service.uptime}% uptime</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{service.incidents} incidents</div>
                        <div className="text-xs text-muted-foreground">this month</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Error Logs */}
            <Card>
              <CardHeader>
                <CardTitle>Error Logs</CardTitle>
                <CardDescription>Recent system errors and warnings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {errorLogs.map((log, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        log.level === 'ERROR' ? 'bg-red-500' :
                        log.level === 'WARNING' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`}></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-medium px-2 py-1 rounded ${
                            log.level === 'ERROR' ? 'bg-red-100 text-red-800' :
                            log.level === 'WARNING' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {log.level}
                          </span>
                          <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                        </div>
                        <p className="text-sm font-medium mt-1">{log.message}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground">{log.endpoint}</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            log.statusCode >= 500 ? 'bg-red-100 text-red-800' :
                            log.statusCode >= 400 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {log.statusCode}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Overview Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">All Systems Operational</div>
                    <p className="text-sm text-muted-foreground">99.7% uptime this month</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Active Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
                    <AlertTriangle className="h-8 w-8 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-600">3 Active</div>
                    <p className="text-sm text-muted-foreground">2 warnings, 1 critical</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Performance Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <BarChart3 className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">94/100</div>
                    <p className="text-sm text-muted-foreground">Optimal performance</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-6">
          {/* Content Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {contentMetrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.metric}</CardTitle>
                  <metric.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {metric.metric === 'Content Views' ? metric.value.toLocaleString() :
                     metric.metric === 'User Engagement' ? `${metric.value}%` :
                     metric.value}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600 flex items-center">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      +{metric.change}{metric.metric === 'Content Views' ? '%' : ''} from last month
                    </span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Content Analytics Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Page Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Page Performance</CardTitle>
                <CardDescription>Traffic and engagement metrics by page</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={pagePerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="page" angle={-45} textAnchor="end" height={80} />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip formatter={(value, name) => [
                      name === 'views' ? value.toLocaleString() : value,
                      name === 'views' ? 'Views' : name === 'bounceRate' ? 'Bounce Rate %' : name === 'avgTime' ? 'Avg Time (s)' : 'Conversions'
                    ]} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="views" fill="#8884d8" name="views" />
                    <Bar yAxisId="right" dataKey="conversions" fill="#82ca9d" name="conversions" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Email Template Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Email Template Performance</CardTitle>
                <CardDescription>Open rates, click rates, and conversions</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={templateUsage}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="template" angle={-45} textAnchor="end" height={80} />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip formatter={(value, name) => [
                      `${value}${String(name).includes('Rate') ? '%' : ''}`,
                      name
                    ]} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="sent" fill="#8884d8" name="Sent" />
                    <Line yAxisId="right" type="monotone" dataKey="opened" stroke="#10B981" strokeWidth={3} name="Open Rate %" />
                    <Line yAxisId="right" type="monotone" dataKey="clicked" stroke="#3B82F6" strokeWidth={3} name="Click Rate %" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Content Engagement Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Content Engagement Trends</CardTitle>
                <CardDescription>User behavior and session metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={contentEngagement}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="pageViews" stroke="#8884d8" strokeWidth={2} name="Page Views" />
                    <Line yAxisId="left" type="monotone" dataKey="uniqueVisitors" stroke="#82ca9d" strokeWidth={2} name="Unique Visitors" />
                    <Line yAxisId="right" type="monotone" dataKey="avgSession" stroke="#ff7300" strokeWidth={2} name="Avg Session (s)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* FAQ Performance */}
            <Card>
              <CardHeader>
                <CardTitle>FAQ Performance</CardTitle>
                <CardDescription>Most viewed questions and helpfulness ratings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {faqMetrics.map((faq, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-medium">{faq.question}</h4>
                          <span className={`text-xs px-2 py-1 rounded ${
                            faq.category === 'Booking' ? 'bg-blue-100 text-blue-800' :
                            faq.category === 'Services' ? 'bg-green-100 text-green-800' :
                            faq.category === 'Payment' ? 'bg-purple-100 text-purple-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {faq.category}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{faq.views.toLocaleString()} views</span>
                          <span>{faq.helpful}% found helpful</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                          <div
                            className="bg-green-500 h-1 rounded-full"
                            style={{ width: `${faq.helpful}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Management Actions */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Static Pages</CardTitle>
                <CardDescription>Manage website pages and content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">About Us</span>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Terms of Service</span>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Privacy Policy</span>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Contact Us</span>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Email Templates</CardTitle>
                <CardDescription>Manage automated email templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Booking Confirmation</span>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Appointment Reminder</span>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Payment Receipt</span>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Welcome Email</span>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Help Center</CardTitle>
                <CardDescription>Manage FAQs and support content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Getting Started</span>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Booking Guide</span>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Payment FAQ</span>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Partner Program</span>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          {/* Configuration Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {configurationMetrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.metric}</CardTitle>
                  <metric.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className={metric.change > 0 ? "text-green-600" : "text-red-600"}>
                      <TrendingUp className="mr-1 h-3 w-3 inline" />
                      {metric.change > 0 ? '+' : ''}{metric.change} from last month
                    </span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Settings Analytics Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* API Usage Trends */}
            <Card>
              <CardHeader>
                <CardTitle>API Usage Trends</CardTitle>
                <CardDescription>Request volume, errors, and latency over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={apiUsageStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip formatter={(value, name) => [
                      name === 'requests' ? value.toLocaleString() : value,
                      name === 'requests' ? 'Requests' : name === 'errors' ? 'Errors' : 'Avg Latency (ms)'
                    ]} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="requests" fill="#8884d8" name="requests" />
                    <Line yAxisId="right" type="monotone" dataKey="avgLatency" stroke="#ff7300" strokeWidth={3} name="avgLatency" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* System Configuration Status */}
            <Card>
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
                <CardDescription>Current status of platform features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemConfig.map((config, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          config.status === 'enabled' ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                        <div>
                          <div className="font-medium">{config.setting}</div>
                          <div className="text-sm text-muted-foreground">
                            Modified by {config.modifiedBy} on {config.lastModified}
                          </div>
                        </div>
                      </div>
                      <Badge variant={config.status === 'enabled' ? 'default' : 'secondary'}>
                        {config.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Security Audit Logs */}
            <Card>
              <CardHeader>
                <CardTitle>Security Audit Logs</CardTitle>
                <CardDescription>Recent security events and access logs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {securityLogs.map((log, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        log.status === 'success' ? 'bg-green-500' :
                        log.status === 'failed' ? 'bg-red-500' : 'bg-yellow-500'
                      }`}></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{log.event}</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            log.status === 'success' ? 'bg-green-100 text-green-800' :
                            log.status === 'failed' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {log.status}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          User: {log.user} | IP: {log.ip}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {log.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Platform Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>Configure platform-wide preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Platform Name</Label>
                    <Input defaultValue="BookMyLook" />
                  </div>
                  <div>
                    <Label>Currency</Label>
                    <Select defaultValue="INR">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INR">Indian Rupee (INR)</SelectItem>
                        <SelectItem value="USD">US Dollar (USD)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>User Registration</Label>
                      <p className="text-sm text-muted-foreground">Allow new user signups</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Send automated emails</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">Temporarily disable platform</p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <div className="pt-4">
                  <Button className="w-full">Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security & Compliance Overview */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Security Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <Settings className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">Secure</div>
                    <p className="text-sm text-muted-foreground">All systems secure</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Compliance Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">98%</div>
                    <p className="text-sm text-muted-foreground">GDPR compliant</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                    <Monitor className="h-8 w-8 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">Excellent</div>
                    <p className="text-sm text-muted-foreground">All services operational</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Approval Dialog */}
      <Dialog open={isApprovalDialogOpen} onOpenChange={setIsApprovalDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Partnership Request</DialogTitle>
            <DialogDescription>
              Approving this request will grant salon owner privileges.
            </DialogDescription>
          </DialogHeader>
          {selectedSalon && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-medium mb-2">Salon Details</h4>
                <div className="space-y-1 text-sm">
                  <p><strong>Name:</strong> {selectedSalon.name}</p>
                  <p><strong>Owner:</strong> {selectedSalon.ownerName}</p>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsApprovalDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => handleApproveSalon(selectedSalon.id)}
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {loading ? 'Approving...' : 'Approve Partnership'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Rejection Dialog */}
      <Dialog open={isRejectionDialogOpen} onOpenChange={setIsRejectionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Partnership Request</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejection.
            </DialogDescription>
          </DialogHeader>
          {selectedSalon && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="rejection-reason">Rejection Reason</Label>
                <Textarea
                  id="rejection-reason"
                  placeholder="Please provide a detailed reason..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsRejectionDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => handleRejectSalon(selectedSalon.id)}
                  disabled={loading || !rejectionReason.trim()}
                  variant="destructive"
                >
                  Reject Partnership
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Cancel Booking Dialog */}
      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
            <DialogDescription>
              Please provide a reason for cancelling this booking.
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="cancel-reason">Cancellation Reason</Label>
                <Textarea
                  id="cancel-reason"
                  placeholder="Please provide a detailed reason..."
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCancelDialogOpen(false)}>
                  Keep Booking
                </Button>
                <Button
                  onClick={() => handleCancelBooking(selectedBooking.id)}
                  disabled={loading || !cancelReason.trim()}
                  variant="destructive"
                >
                  Cancel Booking
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* User Activity Heatmap Modal */}
      <Dialog open={isHeatmapModalOpen} onOpenChange={setIsHeatmapModalOpen}>
        <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
          <DialogHeader className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Monitor className="h-8 w-8 text-white" />
              </div>
              <div>
                <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  User Activity Heatmap
                </DialogTitle>
                <DialogDescription className="text-lg text-muted-foreground">
                  Real-time user activity patterns across days and hours
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="mt-8 space-y-8">
            {/* Summary Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-blue-900">Peak Hours</div>
                    <div className="text-2xl font-bold text-blue-700">6-8 PM</div>
                  </div>
                </div>
                <p className="text-sm text-blue-600">Highest activity during evening hours</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-green-900">Busiest Day</div>
                    <div className="text-2xl font-bold text-green-700">Friday</div>
                  </div>
                </div>
                <p className="text-sm text-green-600">172 users at peak hour</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-500 rounded-lg">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-purple-900">Total Activity</div>
                    <div className="text-2xl font-bold text-purple-700">2,847</div>
                  </div>
                </div>
                <p className="text-sm text-purple-600">Users across all time slots</p>
              </div>
            </div>

            {/* Heatmap Grid */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-1 flex items-center gap-2">
                  <BarChart3 className="h-6 w-6 text-gray-600" />
                  User Activity Heatmap
                </h3>
                <p className="text-sm text-gray-600">Real-time user activity patterns by day and hour</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-200">
                        Day/Time
                      </th>
                      {['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM'].map(hour => (
                        <th key={hour} className="px-3 py-3 text-center text-sm font-semibold text-gray-700 min-w-[60px]">
                          {hour}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { day: 'Monday', short: 'Mon', emoji: '🌅' },
                      { day: 'Tuesday', short: 'Tue', emoji: '📅' },
                      { day: 'Wednesday', short: 'Wed', emoji: '📊' },
                      { day: 'Thursday', short: 'Thu', emoji: '📈' },
                      { day: 'Friday', short: 'Fri', emoji: '🎯' },
                      { day: 'Saturday', short: 'Sat', emoji: '🎉' },
                      { day: 'Sunday', short: 'Sun', emoji: '😴' }
                    ].map(({ day, short, emoji }, dayIndex) => (
                      <tr key={day} className={dayIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        {/* Day label */}
                        <td className="px-4 py-3 font-medium text-gray-900 border-r border-gray-200 flex items-center gap-2">
                          <span className="text-lg">{emoji}</span>
                          <span>{day}</span>
                        </td>
                        {/* Activity cells for each hour */}
                        {['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'].map(hour => {
                          const activity = userActivityHeatmap.find(item => item.day === short && item.hour === hour)?.activity || 0;

                          // Professional color scheme for enterprise dashboards
                          let bgColor = 'bg-slate-50';
                          let textColor = 'text-slate-500';
                          let intensity = '';

                          if (activity === 0) {
                            bgColor = 'bg-slate-100';
                            textColor = 'text-slate-400';
                          } else if (activity < 30) {
                            bgColor = 'bg-slate-200';
                            textColor = 'text-slate-700';
                            intensity = 'Low';
                          } else if (activity < 60) {
                            bgColor = 'bg-slate-300';
                            textColor = 'text-slate-800';
                            intensity = 'Moderate';
                          } else if (activity < 90) {
                            bgColor = 'bg-emerald-100';
                            textColor = 'text-emerald-800';
                            intensity = 'High';
                          } else if (activity < 120) {
                            bgColor = 'bg-emerald-200';
                            textColor = 'text-emerald-900';
                            intensity = 'Very High';
                          } else if (activity < 150) {
                            bgColor = 'bg-amber-200';
                            textColor = 'text-amber-900';
                            intensity = 'Peak';
                          } else {
                            bgColor = 'bg-rose-200';
                            textColor = 'text-rose-900';
                            intensity = 'Maximum';
                          }

                          return (
                            <td
                              key={`${short}-${hour}`}
                              className={`px-3 py-3 text-center border-r border-gray-100 ${bgColor} ${textColor} hover:bg-opacity-80 transition-colors cursor-pointer group relative`}
                              title={`${day} ${hour}: ${activity} users (${intensity || 'No activity'})`}
                            >
                              <span className="font-semibold text-sm group-hover:scale-110 transition-transform inline-block">
                                {activity}
                              </span>
                              {/* Activity indicator */}
                              {activity > 0 && (
                                <div className="flex justify-center mt-1 gap-0.5">
                                  {Array.from({ length: Math.min(Math.ceil(activity / 30), 3) }).map((_, i) => (
                                    <div
                                      key={i}
                                      className={`w-1 h-1 rounded-full ${
                                        activity < 60 ? 'bg-slate-500' :
                                        activity < 120 ? 'bg-emerald-500' :
                                        activity < 150 ? 'bg-amber-500' : 'bg-rose-500'
                                      }`}
                                    />
                                  ))}
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Enhanced Legend */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Info className="h-5 w-5 text-gray-600" />
                Activity Intensity Guide
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-slate-100 border border-gray-200 rounded"></div>
                  <span className="text-gray-600">No Activity (0)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-slate-200 border border-gray-200 rounded"></div>
                  <span className="text-gray-600">Low (1-29)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-slate-300 border border-gray-200 rounded"></div>
                  <span className="text-gray-600">Moderate (30-59)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-emerald-100 border border-gray-200 rounded"></div>
                  <span className="text-gray-600">High (60-89)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-emerald-200 border border-gray-200 rounded"></div>
                  <span className="text-gray-600">Very High (90-119)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-amber-200 border border-gray-200 rounded"></div>
                  <span className="text-gray-600">Peak (120-149)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-rose-200 border border-gray-200 rounded"></div>
                  <span className="text-gray-600">Maximum (150+)</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                  <div className="flex gap-0.5">
                    <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
                    <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
                    <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-600">Activity Indicators</span>
                </div>
              </div>
            </div>

            {/* Insights Section */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-indigo-600" />
                Key Insights & Recommendations
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h5 className="font-medium text-indigo-900">Peak Activity Patterns</h5>
                  <ul className="space-y-2 text-sm text-indigo-700">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Evening hours (6-8 PM) show highest activity across all weekdays</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Friday evenings have the absolute peak with 172 users</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Midday (11 AM - 1 PM) shows lunch hour activity spike</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h5 className="font-medium text-indigo-900">Strategic Recommendations</h5>
                  <ul className="space-y-2 text-sm text-indigo-700">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Schedule marketing campaigns for 6-8 PM weekdays</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Deploy major features during low-activity hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Increase server capacity for evening peak loads</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
