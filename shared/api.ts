/**
 * Shared types used by both client and server
 * Complete type definitions aligned with Prisma schema
 */

// ===== API RESPONSE TYPES =====
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export interface DemoResponse {
  message: string;
}

// ===== USER & AUTH TYPES =====
export type UserRole = 'CUSTOMER' | 'SALON_OWNER' | 'STAFF' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  phone?: string | null;
  firstName: string;
  lastName: string;
  avatar?: string | null;
  role: UserRole;
  emailVerified: boolean;
  phoneVerified: boolean;
  isActive: boolean;
  lastLogin?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginRequest {
  email?: string;
  phone?: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: UserRole;
}

export interface AuthResponse {
  user: Omit<User, 'password'>;
  accessToken: string;
  refreshToken: string;
}

// ===== SALON TYPES =====
export interface Salon {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  logo?: string | null;
  coverImage?: string | null;
  ownerId: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  latitude?: number | null;
  longitude?: number | null;
  googleMapsUrl?: string | null;
  gstNumber?: string | null;
  panNumber?: string | null;
  registrationNo?: string | null;
  isActive: boolean;
  isVerified: boolean;
  acceptsOnlinePayment: boolean;
  instantBooking: boolean;
  openingTime: string;
  closingTime: string;
  workingDays: number[];
  lunchBreakStart?: string | null;
  lunchBreakEnd?: string | null;
  averageRating: number;
  totalReviews: number;
  createdAt: Date;
  updatedAt: Date;
  services?: Service[]; // Add services property
  _count?: { bookings: number }; // Add count property
}

export interface CreateSalonRequest {
  name: string;
  description?: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  openingTime: string;
  closingTime: string;
  workingDays?: number[];
}

// ===== SERVICE TYPES =====
export interface Service {
  id: string;
  salonId: string;
  name: string;
  description?: string | null;
  categoryId: string;
  price: number;
  discountPrice?: number | null;
  durationMinutes: number;
  isActive: boolean;
  requiresDeposit: boolean;
  depositAmount?: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
}

export interface CreateServiceRequest {
  name: string;
  description?: string;
  categoryId: string;
  price: number;
  discountPrice?: number;
  durationMinutes: number;
  requiresDeposit?: boolean;
  depositAmount?: number;
}

// ===== STAFF TYPES =====
export interface Staff {
  id: string;
  userId: string;
  salonId: string;
  designation: string;
  experience: number;
  specialization: string[];
  bio?: string | null;
  isAvailable: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
}

export interface StaffSchedule {
  id: string;
  staffId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isWorking: boolean;
}

// ===== BOOKING TYPES =====
export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
export type PaymentStatus = 'PENDING' | 'PARTIAL' | 'PAID' | 'REFUNDED' | 'FAILED';

export interface Booking {
  id: string;
  bookingNumber: string;
  userId: string;
  salonId: string;
  serviceId: string;
  staffId?: string | null;
  appointmentDate: Date;
  appointmentTime: string;
  endTime: string;
  servicePrice: number;
  discount: number;
  tax: number;
  totalAmount: number;
  depositAmount: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes?: string | null;
  cancellationReason?: string | null;
  cancelledBy?: string | null;
  queuePosition?: number | null;
  checkInTime?: Date | null;
  serviceStartTime?: Date | null;
  serviceEndTime?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  salon?: Salon;
  service?: Service;
  staff?: Staff;
}

export interface CreateBookingRequest {
  salonId: string;
  serviceId: string;
  staffId?: string;
  appointmentDate: string;
  appointmentTime: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes?: string;
}

// ===== QUEUE TYPES =====
export type QueueStatus = 'WAITING' | 'CALLED' | 'IN_SERVICE' | 'COMPLETED' | 'NO_SHOW' | 'CANCELLED';

export interface QueueEntry {
  id: string;
  salonId: string;
  bookingId: string;
  customerName: string;
  customerPhone: string;
  serviceName: string;
  serviceId: string;
  position: number; // Current position in queue (1-based)
  totalInQueue: number; // Total people in queue
  estimatedTime: string; // "2:30 PM" format
  estimatedWaitMinutes: number;
  status: QueueStatus;
  joinedAt: Date;
  calledAt?: Date | null;
  startedAt?: Date | null;
  completedAt?: Date | null;
  notes?: string | null;
  booking?: Booking; // Optional booking reference
  salon?: Salon; // Optional salon reference
}

export interface QueueStats {
  salonId: string;
  totalWaiting: number;
  totalInService: number;
  totalCompleted: number;
  averageWaitTime: number; // in minutes
  nextCustomerEstimatedTime: string;
  peakHours: string[]; // ["09:00-11:00", "14:00-16:00"]
}

export interface QueueUpdate {
  type: 'ADD' | 'UPDATE' | 'REMOVE' | 'POSITION_CHANGE';
  entry: QueueEntry;
  previousPosition?: number;
  newPosition?: number;
}

export interface CreateQueueEntryRequest {
  bookingId: string;
  salonId: string;
  customerName: string;
  customerPhone: string;
  serviceName: string;
  serviceId: string;
  estimatedWaitMinutes: number;
  notes?: string;
}

export interface UpdateQueueEntryRequest {
  status?: QueueStatus;
  position?: number;
  notes?: string;
}

// ===== PAYMENT TYPES =====
export type PaymentMethod = 'CASH' | 'UPI' | 'RAZORPAY' | 'CARD' | 'WALLET' | 'NET_BANKING';
export type TransactionType = 'BOOKING_PAYMENT' | 'REFUND' | 'LOYALTY_EARNED' | 'LOYALTY_REDEEMED' | 'WALLET_TOPUP' | 'WALLET_WITHDRAWAL';

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  gatewayOrderId?: string | null;
  gatewayPaymentId?: string | null;
  gatewaySignature?: string | null;
  transactionId: string;
  paidAt?: Date | null;
  refundAmount?: number | null;
  refundReason?: string | null;
  refundedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePaymentRequest {
  bookingId: string;
  amount: number;
  method: PaymentMethod;
}

// ===== REVIEW TYPES =====
export interface Review {
  id: string;
  bookingId: string;
  userId: string;
  salonId: string;
  rating: number;
  comment?: string | null;
  serviceRating?: number | null;
  ambienceRating?: number | null;
  cleanlinessRating?: number | null;
  staffRating?: number | null;
  valueRating?: number | null;
  isVerified: boolean;
  isVisible: boolean;
  response?: string | null;
  respondedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  salon?: Salon;
  booking?: Booking & {
    service?: Service;
  };
}

export interface CreateReviewRequest {
  bookingId: string;
  rating: number;
  comment?: string;
  serviceRating?: number;
  ambienceRating?: number;
  cleanlinessRating?: number;
  staffRating?: number;
  valueRating?: number;
}

// ===== LOYALTY & REWARDS TYPES =====
export type PointType = 'EARNED' | 'REDEEMED' | 'EXPIRED' | 'BONUS';

export interface LoyaltyPoint {
  id: string;
  userId: string;
  points: number;
  type: PointType;
  description: string;
  referenceId?: string | null;
  expiresAt?: Date | null;
  createdAt: Date;
}

// ===== PROMOTION TYPES =====
export type DiscountType = 'PERCENTAGE' | 'FIXED';

export interface Promotion {
  id: string;
  salonId: string;
  code: string;
  description: string;
  discountType: DiscountType;
  discountValue: number;
  minAmount?: number | null;
  maxDiscount?: number | null;
  validFrom: Date;
  validTo: Date;
  usageLimit?: number | null;
  usedCount: number;
  isActive: boolean;
  createdAt: Date;
}

// ===== NOTIFICATION TYPES =====
export type NotificationType = 
  | 'BOOKING_CONFIRMED' 
  | 'BOOKING_REMINDER' 
  | 'BOOKING_CANCELLED'
  | 'QUEUE_UPDATE' 
  | 'PROMOTION' 
  | 'REVIEW_REQUEST' 
  | 'GENERAL';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  data?: any;
  isRead: boolean;
  createdAt: Date;
}

// ===== ANALYTICS TYPES =====
export interface SalonAnalytics {
  totalBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
  averageRating: number;
  totalReviews: number;
  topServices: Array<{
    serviceId: string;
    serviceName: string;
    bookingCount: number;
    revenue: number;
  }>;
  bookingTrends: Array<{
    date: string;
    count: number;
    revenue: number;
  }>;
}

export interface CustomerStats {
  totalBookings: number;
  upcomingBookings: number;
  completedBookings: number;
  totalSpent: number;
  loyaltyPoints: number;
  favoritesSalons: number;
}

// ===== CONTACT TYPES =====
export interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  inquiryType: 'general' | 'support' | 'partnership' | 'feedback' | 'billing' | 'other';
}

// ===== SEARCH & FILTER TYPES =====
export interface SearchFilters {
  city?: string;
  categoryId?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  distance?: number;
  instantBooking?: boolean;
  acceptsOnlinePayment?: boolean;
}

export interface SearchResult {
  salons: Salon[];
  services: Service[];
  totalResults: number;
  filtersApplied: SearchFilters;
}

// ===== VALIDATION SCHEMAS =====
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormErrors {
  [key: string]: string | undefined;
}
