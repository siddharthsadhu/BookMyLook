import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Users, Settings, BookOpen, CheckCircle, Star } from "lucide-react";

export default function Guides() {
  const guides = [
    {
      id: "customer-guide",
      title: "Complete Customer Guide",
      description: "Everything you need to know about booking appointments, managing your account, and getting the best salon experience.",
      category: "For Customers",
      fileSize: "2.4 MB",
      pages: 24,
      downloads: 1250,
      rating: 4.8,
      lastUpdated: "2024-01-15",
      icon: <Users className="h-6 w-6" />,
      gradient: "from-blue-500 to-indigo-600",
      features: [
        "Account setup and profile management",
        "Finding and booking salons",
        "Understanding queue system",
        "Payment methods and refunds",
        "Managing appointments",
        "Review and rating system"
      ]
    },
    {
      id: "salon-owner-guide",
      title: "Salon Owner Manual",
      description: "Comprehensive guide for salon owners to set up their profile, manage services, handle bookings, and grow their business.",
      category: "For Salon Owners",
      fileSize: "3.8 MB",
      pages: 42,
      downloads: 890,
      rating: 4.9,
      lastUpdated: "2024-01-12",
      icon: <Settings className="h-6 w-6" />,
      gradient: "from-emerald-500 to-teal-600",
      features: [
        "Setting up your salon profile",
        "Adding services and pricing",
        "Managing staff and schedules",
        "Handling customer bookings",
        "Queue management system",
        "Analytics and reporting",
        "Marketing and promotions"
      ]
    },
    {
      id: "troubleshooting-guide",
      title: "Troubleshooting & FAQ Guide",
      description: "Common issues, solutions, and frequently asked questions to help you resolve problems quickly.",
      category: "Support",
      fileSize: "1.6 MB",
      pages: 18,
      downloads: 2100,
      rating: 4.7,
      lastUpdated: "2024-01-10",
      icon: <CheckCircle className="h-6 w-6" />,
      gradient: "from-orange-500 to-red-600",
      features: [
        "Account and login issues",
        "Booking problems",
        "Payment troubleshooting",
        "Queue system issues",
        "Mobile app problems",
        "Contact information"
      ]
    },
    {
      id: "api-integration-guide",
      title: "API Integration Guide",
      description: "Technical documentation for developers wanting to integrate BookMyLook APIs into their applications.",
      category: "Developers",
      fileSize: "4.2 MB",
      pages: 56,
      downloads: 320,
      rating: 4.6,
      lastUpdated: "2024-01-08",
      icon: <BookOpen className="h-6 w-6" />,
      gradient: "from-purple-500 to-pink-600",
      features: [
        "API authentication",
        "Booking endpoints",
        "Queue management APIs",
        "Webhook integration",
        "Error handling",
        "Code examples",
        "SDK documentation"
      ]
    }
  ];

  const handleDownload = (guideId: string, guideTitle: string) => {
    // In a real app, this would trigger the actual download
    console.log(`Downloading ${guideTitle} (${guideId})`);

    // For demo purposes, show an alert
    alert(`📥 Starting download of "${guideTitle}"\n\nThis would normally download a PDF file to your device.`);

    // You could implement actual download logic here:
    // const link = document.createElement('a');
    // link.href = `/downloads/${guideId}.pdf`;
    // link.download = `${guideTitle}.pdf`;
    // link.click();
  };

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
              <Download className="h-4 w-4" />
              User Guides & Documentation
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-indigo-100 bg-clip-text text-transparent"
            >
              Download Our
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Complete Guides
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
            >
              Access comprehensive PDF guides, documentation, and resources to help you make the most
              of BookMyLook. From getting started to advanced features.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center gap-4 mt-8"
            >
              <div className="flex items-center gap-2 text-slate-300">
                <FileText className="h-5 w-5 text-blue-400" />
                <span>4 Comprehensive Guides</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Download className="h-5 w-5 text-green-400" />
                <span>Free PDF Downloads</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Star className="h-5 w-5 text-purple-400" />
                <span>Highly Rated Content</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </section>

      {/* Guides Section */}
      <section className="py-20">
        <div className="container max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2">
            {guides.map((guide, index) => (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full shadow-xl border-0 bg-gradient-to-br from-white via-slate-50/30 to-white backdrop-blur-sm hover:shadow-2xl transition-all duration-500 overflow-hidden ring-1 ring-slate-200/50 hover:ring-slate-300/70">
                  <CardHeader className="bg-gradient-to-r from-blue-50/50 via-indigo-50/50 to-purple-50/50 border-b border-slate-100/60">
                    <div className="flex items-start justify-between mb-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`w-14 h-14 bg-gradient-to-br ${guide.gradient} rounded-2xl flex items-center justify-center shadow-lg`}
                      >
                        <div className="text-white">
                          {guide.icon}
                        </div>
                      </motion.div>
                      <Badge className="bg-slate-100 text-slate-700 border-slate-200">
                        {guide.category}
                      </Badge>
                    </div>

                    <CardTitle className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-slate-900 transition-colors duration-200">
                      {guide.title}
                    </CardTitle>

                    <CardDescription className="text-slate-600 leading-relaxed text-base">
                      {guide.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-6 space-y-6">
                    {/* Guide Stats */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-slate-400" />
                        <span className="text-slate-600">{guide.pages} pages</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Download className="h-4 w-4 text-slate-400" />
                        <span className="text-slate-600">{guide.downloads} downloads</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-slate-600">{guide.rating}/5.0</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-600">{guide.fileSize}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-3">What's Inside:</h4>
                      <ul className="space-y-2">
                        {guide.features.slice(0, 4).map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                            <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                        {guide.features.length > 4 && (
                          <li className="text-sm text-slate-500 italic">
                            + {guide.features.length - 4} more topics covered
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Download Button */}
                    <div className="pt-4">
                      <Button
                        onClick={() => handleDownload(guide.id, guide.title)}
                        className={`w-full bg-gradient-to-r ${guide.gradient} hover:opacity-90 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 h-12`}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF Guide
                      </Button>
                      <p className="text-xs text-slate-500 text-center mt-2">
                        Last updated: {new Date(guide.lastUpdated).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Download Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <Card className="border-0 shadow-lg bg-gradient-to-r from-slate-50 to-blue-50">
              <CardContent className="p-8 text-center">
                <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Download Instructions</h3>
                <div className="grid md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-blue-600 font-bold">1</span>
                    </div>
                    <h4 className="font-semibold text-slate-800 mb-2">Choose Your Guide</h4>
                    <p className="text-sm text-slate-600">Select the guide that matches your needs from the options above.</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-green-600 font-bold">2</span>
                    </div>
                    <h4 className="font-semibold text-slate-800 mb-2">Click Download</h4>
                    <p className="text-sm text-slate-600">Click the download button to start the PDF download process.</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-purple-600 font-bold">3</span>
                    </div>
                    <h4 className="font-semibold text-slate-800 mb-2">Save & Access</h4>
                    <p className="text-sm text-slate-600">Save the file to your device and access it anytime offline.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
