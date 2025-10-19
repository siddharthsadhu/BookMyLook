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

      <section id="booking" className="container py-16">
        <div className="grid gap-8 lg:grid-cols-2 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">{t("get_started")}</h2>
            <p className="text-muted-foreground mt-2 max-w-prose">Book appointments with live availability. Get instant confirmation, notifications and earn loyalty points on every visit.</p>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Real-time queue position</li>
              <li className="flex items-center gap-2"><span className="text-green-600">✓</span> One-tap UPI/Razorpay</li>
              <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Rewards & feedback</li>
            </ul>
          </div>
          <motion.form 
            initial={{opacity:0, y: 10}} 
            whileInView={{opacity:1, y:0}} 
            viewport={{once:true}} 
            className="rounded-2xl border p-6 glass"
            onSubmit={handleFormSubmit}
          >
            <div className="grid gap-4">
              <div className="floating-label">
                <input 
                  placeholder=" " 
                  id="name" 
                  name="name" 
                  className="w-full rounded-lg border px-3 py-2 bg-background/80" 
                  required 
                  minLength={2}
                  maxLength={50}
                />
                <label htmlFor="name">Full name</label>
              </div>
              <div className="floating-label">
                <input 
                  placeholder=" " 
                  id="phone" 
                  name="phone" 
                  type="tel"
                  className="w-full rounded-lg border px-3 py-2 bg-background/80" 
                  required 
                  pattern="^[6-9]\d{9}$"
                  title="Please enter a valid 10-digit mobile number"
                />
                <label htmlFor="phone">Mobile number</label>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="relative inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-accent px-6 font-semibold text-white shadow transition hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10">
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    t("get_started")
                  )}
                </span>
                <span className="absolute inset-0 animate-pulse bg-white/10 rounded-xl" />
              </button>
              <p className="text-xs text-muted-foreground text-center">Payments supported: UPI • Razorpay • Cash</p>
            </div>
          </motion.form>
        </div>
      </section>
    </SiteLayout>
  );
}
