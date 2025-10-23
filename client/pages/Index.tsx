import SiteLayout from "@/layouts/SiteLayout";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import RealTimeQueue from "@/components/home/RealTimeQueue";
import ServicesPreview from "@/components/home/ServicesPreview";
import QueueDashboard from "@/components/home/QueueDashboard";
import { useI18n } from "@/i18n";
import { motion } from "framer-motion"; // Reverted to the correct path
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Sparkles,
  Calendar,
  CreditCard,
  Users,
  Clock,
  Star,
  CheckCircle2,
  ArrowRight,
  Phone,
  User,
  Zap,
  Shield,
  Smartphone,
  Award,
  Heart
} from "lucide-react";

export default function Index() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch real statistics
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const [salonsRes, queueRes] = await Promise.all([
        fetch('/api/shops'),
        fetch('/api/queue')
      ]);

      const salons = await salonsRes.json();
      const queue = await queueRes.json();

      return {
        salons: salons.success ? salons.data?.salons?.length || 0 : 0,
        bookings: queue.success ? queue.data?.reduce((total: number, q: any) => total + q.totalWaiting, 0) || 0 : 0
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Get form data
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    
    // Store form data in sessionStorage for the booking page
    sessionStorage.setItem('quickBookingData', JSON.stringify({
      customerName: name,
      customerPhone: phone,
      timestamp: Date.now()
    }));
    
    // Navigate to booking page
    navigate('/booking');
    
    setIsSubmitting(false);
  };

  return (
    <SiteLayout>
      <Hero stats={stats} statsLoading={statsLoading} />
      <Features />
      <QueueDashboard />
      <ServicesPreview />

      {/* Premium Book Now Section */}
      <section id="booking" className="relative py-24 overflow-hidden">
        {/* Animated Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-80 h-80 bg-primary/8 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-accent/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-secondary/8 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="container relative">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="space-y-4">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 text-primary rounded-full text-sm font-medium"
                >
                  <Sparkles className="h-4 w-4" />
                  Instant Booking Experience
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent leading-tight"
                >
                  Book Your Perfect
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">Salon Experience</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-lg md:text-xl text-slate-600 max-w-lg leading-relaxed"
                >
                  Skip the wait, book instantly. Get real-time availability, secure payments, and earn rewards on every visit.
                </motion.p>
              </div>

              {/* Features Grid */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="grid gap-4"
              >
                {[
                  {
                    icon: <Clock className="h-5 w-5" />,
                    title: "Real-time Queue Position",
                    description: "Know exactly where you stand",
                    gradient: "from-blue-500 to-indigo-600",
                    bgColor: "from-blue-50 to-indigo-50"
                  },
                  {
                    icon: <CreditCard className="h-5 w-5" />,
                    title: "One-tap Payments",
                    description: "UPI, Razorpay, or Cash",
                    gradient: "from-emerald-500 to-teal-600",
                    bgColor: "from-emerald-50 to-teal-50"
                  },
                  {
                    icon: <Award className="h-5 w-5" />,
                    title: "Rewards & Loyalty",
                    description: "Earn points on every booking",
                    gradient: "from-purple-500 to-pink-600",
                    bgColor: "from-purple-50 to-pink-50"
                  },
                  {
                    icon: <Shield className="h-5 w-5" />,
                    title: "Instant Confirmation",
                    description: "SMS & email notifications",
                    gradient: "from-orange-500 to-red-600",
                    bgColor: "from-orange-50 to-red-50"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + (index * 0.1) }}
                    whileHover={{ scale: 1.02, x: 8 }}
                    className={`relative overflow-hidden rounded-xl border border-slate-200/60 bg-gradient-to-r ${feature.bgColor} backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-500 cursor-pointer group`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <div className="relative p-4 flex items-center gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <div className="text-white">
                          {feature.icon}
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800 text-base group-hover:text-slate-900 transition-colors duration-200">{feature.title}</div>
                        <div className="text-sm text-slate-600 group-hover:text-slate-700 transition-colors duration-200">{feature.description}</div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all duration-300 ml-auto" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap items-center gap-6 pt-6"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-full border border-green-200 hover:bg-green-100 transition-all duration-300 cursor-pointer"
                >
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700">98% Satisfaction Rate</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-full border border-blue-200 hover:bg-blue-100 transition-all duration-300 cursor-pointer"
                >
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">50K+ Happy Customers</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-3 py-2 bg-yellow-50 rounded-full border border-yellow-200 hover:bg-yellow-100 transition-all duration-300 cursor-pointer"
                >
                  <Star className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-700">4.8★ Average Rating</span>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Side - Premium Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200/60 shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500">
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 rounded-3xl"></div>

                {/* Form Header */}
                <div className="relative p-8 border-b border-slate-100/80 bg-gradient-to-r from-blue-50/50 via-indigo-50/50 to-purple-50/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl ring-4 ring-white/50"
                      >
                        <Calendar className="h-7 w-7 text-white" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">Quick Booking</h3>
                        <p className="text-slate-600 text-sm">Takes less than 30 seconds</p>
                      </div>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                    >
                      <Zap className="h-4 w-4" />
                      Instant
                    </motion.div>
                  </div>
                </div>

                {/* Form Content */}
                <div className="p-8">
                  <motion.form
                    onSubmit={handleFormSubmit}
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    {/* Full Name */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                      className="space-y-3"
                    >
                      <label htmlFor="name" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <User className="h-4 w-4 text-blue-600" />
                        Full Name *
                      </label>
                      <div className="relative group">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Enter your full name"
                          required
                          minLength={2}
                          maxLength={50}
                          className="w-full h-12 pl-4 pr-12 text-base transition-all duration-300 border-2 rounded-xl border-slate-200 hover:border-blue-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-white/80 backdrop-blur-sm shadow-sm focus:shadow-lg focus:ring-0 text-slate-800 placeholder:text-slate-400"
                        />
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200">
                          <User className="h-4 w-4" />
                        </div>
                      </div>
                    </motion.div>

                    {/* Phone Number */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 }}
                      className="space-y-3"
                    >
                      <label htmlFor="phone" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <Phone className="h-4 w-4 text-blue-600" />
                        Mobile Number *
                      </label>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-600 z-10 font-semibold bg-white px-1">
                          🇮🇳 +91
                        </div>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="9876543210"
                          required
                          pattern="^[6-9]\d{9}$"
                          title="Please enter a valid 10-digit mobile number"
                          className="w-full h-12 pl-16 pr-12 text-base transition-all duration-300 border-2 rounded-xl border-slate-200 hover:border-blue-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-white/80 backdrop-blur-sm shadow-sm focus:shadow-lg focus:ring-0 text-slate-800 placeholder:text-slate-400"
                        />
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200">
                          <Smartphone className="h-4 w-4" />
                        </div>
                      </div>
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7 }}
                      className="pt-4"
                    >
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full h-14 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl relative overflow-hidden group border-0 ring-2 ring-blue-500/20 hover:ring-blue-400/40"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>

                        {isSubmitting ? (
                          <div className="flex items-center justify-center gap-3 relative z-10">
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                            <span className="text-base">Setting up your booking...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-3 relative z-10">
                            <Sparkles className="h-5 w-5" />
                            <span className="text-base">Book Your Appointment</span>
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                          </div>
                        )}
                      </motion.button>
                    </motion.div>

                    {/* Trust Badges */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 }}
                      className="flex items-center justify-center gap-4 pt-6 border-t border-slate-100/60"
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-full border border-green-200 hover:bg-green-100 transition-all duration-300 cursor-pointer"
                      >
                        <Shield className="h-3 w-3 text-green-600" />
                        <span className="text-xs font-medium text-green-700">Secure & Encrypted</span>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-full border border-blue-200 hover:bg-blue-100 transition-all duration-300 cursor-pointer"
                      >
                        <CreditCard className="h-3 w-3 text-blue-600" />
                        <span className="text-xs font-medium text-blue-700">Multiple Payments</span>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 px-3 py-2 bg-red-50 rounded-full border border-red-200 hover:bg-red-100 transition-all duration-300 cursor-pointer"
                      >
                        <Heart className="h-3 w-3 text-red-600" />
                        <span className="text-xs font-medium text-red-700">100% Satisfaction</span>
                      </motion.div>
                    </motion.div>
                  </motion.form>
                </div>
              </div>

              {/* Floating Success Indicator */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.0, type: "spring", stiffness: 200 }}
                className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <CheckCircle2 className="h-4 w-4 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
