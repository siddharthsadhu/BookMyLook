import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Map, Home, Users, Calendar, FileText, HelpCircle, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Sitemap() {
  const siteStructure = [
    {
      category: "Main Pages",
      icon: <Home className="h-5 w-5" />,
      color: "from-blue-500 to-indigo-600",
      pages: [
        { name: "Home", path: "/", description: "Welcome page with featured salons and AI features" },
        { name: "Services", path: "/services", description: "Browse all available salon services" },
        { name: "Salon Details", path: "/salon/:slug", description: "Individual salon information and booking" },
        { name: "About Us", path: "/about", description: "Company story and mission" },
        { name: "Contact", path: "/contact", description: "Get in touch with our team" }
      ]
    },
    {
      category: "Booking & Services",
      icon: <Calendar className="h-5 w-5" />,
      color: "from-green-500 to-teal-600",
      pages: [
        { name: "Book Appointment", path: "/booking", description: "Schedule your salon visit" },
        { name: "Estimate Wait Time", path: "/estimate", description: "Check queue times before visiting" },
        { name: "Reviews", path: "/reviews", description: "Read customer feedback and ratings" }
      ]
    },
    {
      category: "Business Partners",
      icon: <Users className="h-5 w-5" />,
      color: "from-purple-500 to-pink-600",
      pages: [
        { name: "Partner With Us", path: "/partners", description: "Join our salon network" },
        { name: "Press & Media", path: "/press", description: "Media resources and press kit" },
        { name: "AI Beauty Assistant", path: "/ai-assistant", description: "Explore our AI-powered features" }
      ]
    },
    {
      category: "Support & Legal",
      icon: <HelpCircle className="h-5 w-5" />,
      color: "from-orange-500 to-red-600",
      pages: [
        { name: "Help Center", path: "/help", description: "FAQs and troubleshooting guides" },
        { name: "Privacy Policy", path: "/privacy", description: "How we protect your data" },
        { name: "Terms of Service", path: "/terms", description: "Legal terms and conditions" },
        { name: "Cookies Policy", path: "/cookies", description: "Cookie usage and preferences" }
      ]
    },
    {
      category: "User Account",
      icon: <Users className="h-5 w-5" />,
      color: "from-indigo-500 to-purple-600",
      pages: [
        { name: "Login", path: "/login", description: "Sign in to your account" },
        { name: "Register", path: "/register", description: "Create a new account" },
        { name: "Reset Password", path: "/reset-password", description: "Recover your account access" },
        { name: "Profile", path: "/profile", description: "Manage your account settings" }
      ]
    },
    {
      category: "Dashboard",
      icon: <FileText className="h-5 w-5" />,
      color: "from-teal-500 to-cyan-600",
      pages: [
        { name: "Customer Dashboard", path: "/dashboard/customer", description: "Manage your bookings and preferences" },
        { name: "Salon Owner Dashboard", path: "/dashboard/owner", description: "Manage your salon and appointments" },
        { name: "Admin Dashboard", path: "/dashboard/admin", description: "Administrative controls and analytics" }
      ]
    }
  ];

  const quickLinks = [
    { name: "Careers", path: "/careers", description: "Join our growing team" },
    { name: "Sitemap", path: "/sitemap", description: "Find what you're looking for" },
    { name: "Emergency Support", path: "/contact", description: "24/7 assistance available" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

        <div className="container py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-8 border border-white/20"
            >
              <Map className="h-4 w-4" />
              Website Sitemap
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-indigo-100 bg-clip-text text-transparent"
            >
              Navigate
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                BookMyLook
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
            >
              Find everything you need on BookMyLook. From booking appointments to managing your account,
              our comprehensive sitemap helps you navigate our platform with ease.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center gap-4 mt-8"
            >
              <div className="flex items-center gap-2 text-slate-300">
                <Map className="h-5 w-5 text-blue-400" />
                <span>Complete Navigation</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Users className="h-5 w-5 text-green-400" />
                <span>User-Friendly</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <FileText className="h-5 w-5 text-purple-400" />
                <span>Organized by Category</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container max-w-6xl">
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">Quick Access Links</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {quickLinks.map((link, index) => (
                    <Link
                      key={index}
                      to={link.path}
                      className="group block p-4 bg-white/80 backdrop-blur-sm rounded-lg border border-slate-200 hover:shadow-md hover:border-blue-300 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{index + 1}</span>
                        </div>
                        <h4 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                          {link.name}
                        </h4>
                      </div>
                      <p className="text-sm text-slate-600">{link.description}</p>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Site Structure */}
          <div className="grid gap-8 lg:grid-cols-2">
            {siteStructure.map((section, sectionIndex) => (
              <motion.div
                key={section.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: sectionIndex * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-gradient-to-r ${section.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <div className="text-white">
                          {section.icon}
                        </div>
                      </div>
                      <div>
                        <CardTitle className="text-xl">{section.category}</CardTitle>
                        <CardDescription>
                          {section.pages.length} pages in this section
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {section.pages.map((page, pageIndex) => (
                        <div key={pageIndex} className="group">
                          <Link
                            to={page.path}
                            className="block p-4 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <Badge variant="outline" className="text-xs">
                                    {pageIndex + 1}
                                  </Badge>
                                  <h4 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                                    {page.name}
                                  </h4>
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  {page.description}
                                </p>
                              </div>
                              <div className="text-slate-400 group-hover:text-blue-500 transition-colors ml-4">
                                →
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <Card className="border-0 shadow-lg bg-gradient-to-r from-slate-50 to-blue-50">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Can't Find What You're Looking For?</h3>
                <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                  Our sitemap provides comprehensive navigation, but if you need help finding something specific,
                  our support team is here to assist you.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <div className="flex items-center gap-3 px-6 py-4 bg-white rounded-lg shadow-sm">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <div className="text-left">
                      <p className="font-medium text-slate-800">Email Support</p>
                      <p className="text-sm text-slate-600">siddharthsme01@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-4 bg-white rounded-lg shadow-sm">
                    <Phone className="h-5 w-5 text-green-600" />
                    <div className="text-left">
                      <p className="font-medium text-slate-800">Phone Support</p>
                      <p className="text-sm text-slate-600">+91 94276 73752</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-4 bg-white rounded-lg shadow-sm">
                    <MapPin className="h-5 w-5 text-purple-600" />
                    <div className="text-left">
                      <p className="font-medium text-slate-800">Visit Us</p>
                      <p className="text-sm text-slate-600">Ahmedabad, Gujarat</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-blue-800 text-sm">
                    💡 <strong>Pro Tip:</strong> Use Ctrl+F (Cmd+F on Mac) to quickly search for specific pages or features on this sitemap.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
