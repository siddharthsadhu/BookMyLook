import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n";
import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Sparkles,
  Mail,
  MapPin,
  Phone,
  Clock,
  Star,
  Users,
  Award,
  CheckCircle2,
  ArrowRight,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Send,
  Heart,
  Shield,
  Zap,
  Globe,
  Calendar
} from "lucide-react";

export default function Footer(){
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);

    // Show success toast
    toast({
      title: "🎉 Successfully Subscribed!",
      description: "Thank you for subscribing! Get ready for exclusive updates and 10% off your first booking.",
      duration: 5000,
    });

    // Clear email and reset after 3 seconds
    setEmail("");
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <footer className="relative mt-24 overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/6 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-56 h-56 bg-accent/6 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-secondary/6 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative container py-16">
        {/* Top Section - Brand & Trust */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/10 to-accent/10 text-primary rounded-full text-sm font-medium mb-8">
            <Sparkles className="h-4 w-4" />
            Premium Salon Experience
            <Sparkles className="h-4 w-4" />
          </div>

          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-accent grid place-items-center text-white font-bold text-2xl shadow-2xl">
              B
            </div>
            <div className="text-left">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Book My Look
              </h3>
              <p className="text-muted-foreground">Premium Salon Booking Platform</p>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            Experience the future of salon booking with real-time availability, instant confirmations, and premium services at your fingertips.
          </motion.p>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-8"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>ISO 27001 Certified</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 text-blue-500" />
              <span>256-bit SSL Encrypted</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Award className="h-4 w-4 text-purple-500" />
              <span>Best Salon App 2024</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4 text-primary" />
              <span>50K+ Happy Customers</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid gap-12 lg:grid-cols-4 mb-16">
          {/* Services Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <h4 className="text-xl font-bold">Premium Services</h4>
            </div>

            <div className="space-y-3">
              {[
                { name: "Hair Styling & Cut", icon: <Sparkles className="h-4 w-4" />, popular: true },
                { name: "Beard Grooming", icon: <Award className="h-4 w-4" />, popular: false },
                { name: "Facial & Spa", icon: <Heart className="h-4 w-4" />, popular: true },
                { name: "Hair Coloring", icon: <Zap className="h-4 w-4" />, popular: false },
                { name: "Manicure & Pedicure", icon: <Star className="h-4 w-4" />, popular: false }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-background/50 backdrop-blur-sm border hover:shadow-md transition-all duration-300 cursor-pointer group"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center text-white group-hover:shadow-lg transition-all duration-300">
                    {service.icon}
                  </div>
                  <span className="text-sm font-medium group-hover:text-primary transition-colors">
                    {service.name}
                  </span>
                  {service.popular && (
                    <span className="ml-auto px-2 py-1 bg-gradient-to-r from-orange-400 to-red-400 text-white text-xs rounded-full font-medium">
                      Popular
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Company Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <h4 className="text-xl font-bold">Company</h4>
            </div>

            <div className="space-y-3">
              {[
                { name: "About Us", href: "/about" },
                { name: "Browse Salons", href: "/services" },
                { name: "Partner With Us", href: "/partners" },
                { name: "AI Beauty Assistant", href: "/ai-assistant" },
                { name: "Contact", href: "/contact" }
              ].map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (index * 0.1) }}
                  className="block p-3 rounded-xl bg-background/50 backdrop-blur-sm border hover:shadow-md hover:border-primary/50 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium group-hover:text-primary transition-colors">
                      {link.name}
                    </span>
                    <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact & Location */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <h4 className="text-xl font-bold">Visit Us</h4>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-background/50 backdrop-blur-sm border">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Ahmedabad, Gujarat</span>
                </div>
                <p className="text-xs text-muted-foreground">CG Road, Ahmedabad</p>
                <p className="text-xs text-muted-foreground">Satellite, Ahmedabad</p>
              </div>

              <div className="p-4 rounded-xl bg-background/50 backdrop-blur-sm border">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">24/7 Support</span>
                </div>
                <p className="text-xs text-muted-foreground">+91 94276 73752</p>
                <p className="text-xs text-muted-foreground">siddharthsme01@gmail.com</p>
              </div>

              <div className="p-4 rounded-xl bg-background/50 backdrop-blur-sm border">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Operating Hours</span>
                </div>
                <p className="text-xs text-muted-foreground">Mon-Sun: 8:00 AM - 10:00 PM</p>
                <p className="text-xs text-muted-foreground">Emergency: 24/7</p>
              </div>
            </div>
          </motion.div>

          {/* Newsletter & Social */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <h4 className="text-xl font-bold">Stay Connected</h4>
            </div>

            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-dashed border-primary/30">
                <h5 className="font-semibold mb-3 text-center">Get Exclusive Updates</h5>
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-12 pl-4 pr-12 text-base transition-all duration-300 border-2 rounded-xl border-gray-200 hover:border-primary/50 focus:border-primary bg-white dark:bg-gray-800 shadow-sm focus:shadow-lg focus:ring-0"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Mail className="h-4 w-4" />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubscribed}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full h-12 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {isSubscribed ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        Subscribed!
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Subscribe
                      </>
                    )}
                  </motion.button>
                </form>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  Get 10% off your first booking
                </p>
              </div>

              {/* Social Media */}
              <div className="p-4 rounded-xl bg-background/50 backdrop-blur-sm border">
                <h5 className="font-semibold mb-3 text-center">Follow Us</h5>
                <div className="flex justify-center gap-4">
                  {[
                    { icon: <Instagram className="h-5 w-5" />, color: "hover:text-pink-500", label: "Instagram" },
                    { icon: <Twitter className="h-5 w-5" />, color: "hover:text-blue-500", label: "Twitter" },
                    { icon: <Facebook className="h-5 w-5" />, color: "hover:text-blue-600", label: "Facebook" },
                    { icon: <Youtube className="h-5 w-5" />, color: "hover:text-red-500", label: "YouTube" }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      aria-label={social.label}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + (index * 0.1), type: "spring" }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className={`w-10 h-10 bg-background border rounded-xl flex items-center justify-center text-muted-foreground ${social.color} transition-all duration-300 shadow-sm hover:shadow-md`}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="relative border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-background/80 to-background/60 backdrop-blur-sm">
          <div className="container py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-sm text-muted-foreground text-center md:text-left"
              >
                © {new Date().getFullYear()} Book My Look by Siddharth Sadhu. All rights reserved.
                <span className="hidden md:inline"> • </span>
                <br className="md:hidden" />
                Made with <Heart className="inline h-3 w-3 text-red-500 mx-1" /> for amazing salon experiences.
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-6 text-sm text-muted-foreground"
              >
                <a href="/privacy" className="hover:text-primary transition-colors">Privacy</a>
                <a href="/terms" className="hover:text-primary transition-colors">Terms</a>
                <a href="/cookies" className="hover:text-primary transition-colors">Cookies</a>
                <a href="/sitemap" className="hover:text-primary transition-colors">Sitemap</a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
