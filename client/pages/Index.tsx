import SiteLayout from "@/layouts/SiteLayout";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import RealTimeQueue from "@/components/home/RealTimeQueue";
import ServicesPreview from "@/components/home/ServicesPreview";
import QueueDashboard from "@/components/home/QueueDashboard";
import { useI18n } from "@/i18n";
import { motion } from "framer-motion";

export default function Index() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <Hero />
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
          <motion.form initial={{opacity:0, y: 10}} whileInView={{opacity:1, y:0}} viewport={{once:true}} className="rounded-2xl border p-6 glass">
            <div className="grid gap-4">
              <div className="floating-label">
                <input placeholder=" " id="name" className="w-full rounded-lg border px-3 py-2 bg-background/80" required />
                <label htmlFor="name">Full name</label>
              </div>
              <div className="floating-label">
                <input placeholder=" " id="phone" className="w-full rounded-lg border px-3 py-2 bg-background/80" required />
                <label htmlFor="phone">Phone</label>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="floating-label">
                  <input placeholder=" " id="service" className="w-full rounded-lg border px-3 py-2 bg-background/80" required />
                  <label htmlFor="service">Service</label>
                </div>
                <div className="floating-label">
                  <input type="datetime-local" placeholder=" " id="time" className="w-full rounded-lg border px-3 py-2 bg-background/80" required />
                  <label htmlFor="time">Preferred time</label>
                </div>
              </div>
              <button type="submit" className="relative inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-accent px-6 font-semibold text-white shadow transition hover:shadow-lg">
                <span className="relative z-10">{t("get_started")}</span>
                <span className="absolute inset-0 animate-pulse bg-white/10 rounded-xl" />
              </button>
              <p className="text-xs text-muted-foreground text-center">Payments supported: UPI • Razorpay</p>
            </div>
          </motion.form>
        </div>
      </section>
    </SiteLayout>
  );
}
