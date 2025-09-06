/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

// ===== SALON & SERVICE TYPES =====
export interface Salon {
  shop_id: number;
  shop_name: string;
  address: string;
  city: string;
  phone_number: string;
  email: string;
  description: string;
  opening_time: string;
  closing_time: string;
  status?: 'active' | 'pending' | 'suspended';
  rating?: number;
  total_customers?: number;
  revenue?: number;
  created_at?: string;
}

export interface Service {
  service_id: number;
  service_name: string;
  description: string;
  duration_minutes: number;
  price: number;
  is_active?: boolean;
  shop_id?: number;
}

// ===== BOOKING TYPES =====
export interface Booking {
  booking_id: number;
  customer_id: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shop_id: number;
  salon_name: string;
  service_id: number;
  service_name: string;
  appointment_date: string;
  appointment_time: string;
  status: 'upcoming' | 'in_progress' | 'completed' | 'cancelled';
  queue_position?: number;
  estimated_wait?: number;
  price: number;
  salon_address: string;
  salon_phone: string;
  special_requests?: string;
  created_at?: string;
  updated_at?: string;
}

export interface BookingRequest {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shop_id: number;
  service_id: number;
  appointment_date: string;
  appointment_time: string;
  special_requests?: string;
}

// ===== QUEUE TYPES =====
export interface QueueItem {
  customer_id: number;
  customer_name: string;
  service_name: string;
  queue_position: number;
  estimated_wait: number;
  appointment_time: string;
  phone: string;
  booking_id: number;
}

export interface QueueEstimate {
  shop_id: number;
  service_id: number;
  estimated_wait: number;
  queue_length: number;
  current_position?: number;
}

// ===== USER TYPES =====
export interface User {
  user_id: number;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'owner' | 'barber' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  created_at: string;
  last_login?: string;
  avatar?: string;
}

export interface Staff {
  barber_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  is_available: boolean;
  shop_id?: number;
  specializations?: string[];
  rating?: number;
}

// ===== REVIEW TYPES =====
export interface Review {
  review_id: number;
  customer_id: number;
  customer_name: string;
  shop_id: number;
  salon_name: string;
  service_id: number;
  service_name: string;
  rating: number;
  comment: string;
  review_date: string;
  is_verified?: boolean;
}

export interface ReviewRequest {
  booking_id: number;
  rating: number;
  comment: string;
}

// ===== ANALYTICS TYPES =====
export interface SalonStats {
  total_customers: number;
  today_revenue: number;
  average_rating: number;
  active_services: number;
  queue_length: number;
  completion_rate: number;
}

export interface SystemStats {
  total_users: number;
  total_salons: number;
  total_revenue: number;
  system_uptime: number;
  active_bookings: number;
}

// ===== NOTIFICATION TYPES =====
export interface Notification {
  id: number;
  user_id: number;
  type: 'booking_confirmation' | 'queue_update' | 'reminder' | 'review_request' | 'system';
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
  data?: any;
}

// ===== CONTACT TYPES =====
export interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  inquiry_type: 'general' | 'support' | 'partnership' | 'feedback' | 'billing' | 'other';
  submitted_at?: string;
}

// ===== API RESPONSE TYPES =====
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

// ===== DASHBOARD TYPES =====
export interface DashboardStats {
  total_bookings: number;
  upcoming_bookings: number;
  completed_bookings: number;
  total_spent: number;
  favorite_salon?: string;
  average_rating: number;
}

export interface SystemAlert {
  id: number;
  type: 'warning' | 'error' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  is_acknowledged?: boolean;
}

// ===== PAYMENT TYPES =====
export interface Payment {
  payment_id: string;
  booking_id: number;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  payment_method: 'upi' | 'razorpay' | 'cash' | 'card';
  transaction_id?: string;
  created_at: string;
}

// ===== SEARCH & FILTER TYPES =====
export interface SearchFilters {
  city?: string;
  service_type?: string;
  price_range?: {
    min: number;
    max: number;
  };
  rating?: number;
  availability?: string;
  distance?: number;
}

export interface SearchResult {
  salons: Salon[];
  services: Service[];
  total_results: number;
  filters_applied: SearchFilters;
}
