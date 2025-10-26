import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Handshake,
  TrendingUp,
  Users,
  Star,
  Award,
  Sparkles,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle2,
  ArrowRight,
  Send,
  Building2,
  Store,
  Zap,
  Target,
  Globe,
  BarChart3,
  Heart,
  Shield
} from "lucide-react";

export default function Partners() {
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    businessType: '',
    partnershipLevel: '',
    city: '',
    services: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const stats = [
    { number: "500+", label: "Partner Salons", icon: "🏪", color: "from-blue-500 to-indigo-600" },
    { number: "25+", label: "Cities Covered", icon: "🏙️", color: "from-emerald-500 to-teal-600" },
    { number: "2M+", label: "Monthly Bookings", icon: "📅", color: "from-purple-500 to-pink-600" },
    { number: "4.8★", label: "Partner Satisfaction", icon: "⭐", color: "from-orange-500 to-red-600" }
  ];

  const benefits = [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Revenue Growth",
      description: "Increase your bookings by up to 300% through our digital platform and marketing reach",
      highlight: "300% Growth"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Customer Base",
      description: "Access millions of potential customers actively searching for premium salon services",
      highlight: "Millions of Users"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Smart Technology",
      description: "Real-time queue management, automated scheduling, and intelligent customer insights",
      highlight: "AI-Powered Tools"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Analytics & Insights",
      description: "Detailed business analytics, customer behavior insights, and performance reports",
      highlight: "Data-Driven Decisions"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Premium Branding",
      description: "Enhanced brand visibility and credibility through association with India's leading salon platform",
      highlight: "Brand Elevation"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Risk-Free Partnership",
      description: "Zero upfront costs, flexible agreements, and dedicated support team for smooth onboarding",
      highlight: "Zero Investment"
    }
  ];

  const partnershipTypes = [
    {
      title: "Premium Salon Partner",
      icon: "👑",
      description: "For high-end salons with luxury services and premium pricing",
      features: [
        "Priority placement in search results",
        "Custom marketing campaigns",
        "Dedicated account manager",
        "Advanced analytics dashboard",
        "Branded marketing materials",
        "Priority customer support"
      ],
      revenue: "₹50K-2L/month",
      ideal: "Luxury salons, spas, wellness centers"
    },
    {
      title: "Standard Salon Partner",
      icon: "✨",
      description: "For established salons looking to digitize and grow their business",
      features: [
        "Complete online booking system",
        "Digital marketing support",
        "Customer reviews & ratings",
        "Basic analytics dashboard",
        "Marketing toolkits",
        "Email & chat support"
      ],
      revenue: "₹15K-75K/month",
      ideal: "Established salons, beauty parlors"
    },
    {
      title: "Startup Salon Partner",
      icon: "🚀",
      description: "For new or growing salons needing a competitive edge",
      features: [
        "Full digital presence setup",
        "Growth marketing assistance",
        "Business consultation",
        "Entry-level analytics",
        "Basic marketing materials",
        "Community support"
      ],
      revenue: "₹5K-30K/month",
      ideal: "New salons, emerging businesses"
    }
  ];

  const successStories = [
    {
      name: "Elegant Cuts & Styles",
      location: "Delhi NCR",
      growth: "350% increase in bookings",
      testimonial: "BookMyLook transformed our business completely. Our customer base grew exponentially and our efficiency improved dramatically.",
      image: "✂️",
      partnerType: "Premium Partner"
    },
    {
      name: "Bliss Beauty Lounge",
      location: "Mumbai",
      growth: "280% increase in revenue",
      testimonial: "The platform's technology and marketing support helped us reach customers we never could have before. Outstanding results!",
      image: "💆",
      partnerType: "Premium Partner"
    },
    {
      name: "Glow Up Salon",
      location: "Bangalore",
      growth: "420% increase in appointments",
      testimonial: "From struggling to book 20 customers a day to consistently serving 80+. BookMyLook is a game-changer for modern salons.",
      image: "✨",
      partnerType: "Standard Partner"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Initial Consultation",
      description: "We understand your business needs, services, and goals through a detailed consultation call.",
      icon: <Sparkles className="h-6 w-6" />
    },
    {
      step: "02",
      title: "Partnership Agreement",
      description: "Customized partnership terms based on your business type and requirements.",
      icon: <Handshake className="h-6 w-6" />
    },
    {
      step: "03",
      title: "Onboarding & Setup",
      description: "Complete digital setup, staff training, and integration with our platform.",
      icon: <Zap className="h-6 w-6" />
    },
    {
      step: "04",
      title: "Launch & Growth",
      description: "Go live with marketing support and continuous optimization for maximum growth.",
      icon: <TrendingUp className="h-6 w-6" />
    }
  ];

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setInquiryForm({
        name: '',
        email: '',
        phone: '',
        businessName: '',
        businessType: '',
        partnershipLevel: '',
        city: '',
        services: '',
        message: ''
      });

      toast({
        title: "Partnership Inquiry Submitted Successfully! 🎉",
        description: "Thank you for your interest in partnering with BookMyLook. Our team will contact you within 24 hours to discuss next steps.",
        duration: 5000,
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-56 h-56 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Handshake className="h-4 w-4" />
              Partnership Program
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"
            >
              Partner With India's
              <br />
              Leading Salon Platform
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Join 500+ successful salon partners who have transformed their businesses with our technology and marketing power.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-3 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                onClick={() => document.getElementById('partnership-types')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Become a Partner
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-3 rounded-xl font-semibold border-2 hover:bg-primary/5 transition-all duration-300"
                onClick={() => document.getElementById('success-stories')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Success Stories
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.color} text-white text-2xl font-bold mb-3 shadow-lg`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-1">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Why Partner With Us?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Unlock unprecedented growth and success for your salon business with our comprehensive partnership program.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {benefit.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1">{benefit.title}</h3>
                        <Badge className="mb-2 bg-primary/10 text-primary hover:bg-primary/20">
                          {benefit.highlight}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section id="partnership-types" className="py-20 bg-gradient-to-r from-background via-primary/5 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Choose Your Partnership Level</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We offer flexible partnership models tailored to salons of all sizes and business stages.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {partnershipTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 group h-full ${
                  index === 0 ? 'ring-2 ring-primary/20' : ''
                }`}>
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-primary to-accent flex items-center justify-center text-2xl mb-4 shadow-lg">
                      {type.icon}
                    </div>
                    <CardTitle className="text-xl mb-2">{type.title}</CardTitle>
                    <Badge variant="outline" className="mb-2">{type.revenue}</Badge>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      {type.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3">
                          <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-3">Ideal for:</p>
                      <p className="text-sm font-medium text-primary">{type.ideal}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section id="success-stories" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Partner Success Stories</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real results from real partners who transformed their businesses with BookMyLook.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center text-2xl shadow-lg">
                        {story.image}
                      </div>
                      <div>
                        <h3 className="font-semibold">{story.name}</h3>
                        <p className="text-sm text-muted-foreground">{story.location}</p>
                      </div>
                    </div>
                    <Badge className="mb-3 bg-green-100 text-green-700 hover:bg-green-200">
                      {story.growth}
                    </Badge>
                    <p className="text-muted-foreground italic mb-4">"{story.testimonial}"</p>
                    <Badge variant="outline">{story.partnerType}</Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Process */}
      <section className="py-20 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Simple Partnership Process</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started in just 4 simple steps and transform your salon business.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center text-white font-bold text-lg mb-4 shadow-lg">
                  {step.step}
                </div>
                <div className="w-12 h-12 mx-auto bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center text-white mb-4 shadow-lg">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Inquiry Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4">Start Your Partnership Journey</h2>
              <p className="text-xl text-muted-foreground">
                Fill out the form below and our partnership team will contact you within 24 hours.
              </p>
            </div>

            <Card className="border-0 shadow-2xl">
              <CardContent className="p-8">
                <form onSubmit={handleInquirySubmit} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        required
                        value={inquiryForm.name}
                        onChange={(e) => setInquiryForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={inquiryForm.email}
                        onChange={(e) => setInquiryForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={inquiryForm.phone}
                        onChange={(e) => setInquiryForm(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Business Name *</Label>
                      <Input
                        id="businessName"
                        required
                        value={inquiryForm.businessName}
                        onChange={(e) => setInquiryForm(prev => ({ ...prev, businessName: e.target.value }))}
                        placeholder="Your salon name"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="businessType">Business Type</Label>
                      <Select value={inquiryForm.businessType} onValueChange={(value) => setInquiryForm(prev => ({ ...prev, businessType: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="salon">Beauty Salon</SelectItem>
                          <SelectItem value="spa">Spa & Wellness</SelectItem>
                          <SelectItem value="barbershop">Barbershop</SelectItem>
                          <SelectItem value="nail-studio">Nail Studio</SelectItem>
                          <SelectItem value="makeup-studio">Makeup Studio</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="partnershipLevel">Interested Partnership Level</Label>
                      <Select value={inquiryForm.partnershipLevel} onValueChange={(value) => setInquiryForm(prev => ({ ...prev, partnershipLevel: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select partnership level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="premium">Premium Salon Partner</SelectItem>
                          <SelectItem value="standard">Standard Salon Partner</SelectItem>
                          <SelectItem value="startup">Startup Salon Partner</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      required
                      value={inquiryForm.city}
                      onChange={(e) => setInquiryForm(prev => ({ ...prev, city: e.target.value }))}
                      placeholder="Your city"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="services">Services Offered</Label>
                    <Textarea
                      id="services"
                      value={inquiryForm.services}
                      onChange={(e) => setInquiryForm(prev => ({ ...prev, services: e.target.value }))}
                      placeholder="List the main services your salon offers (e.g., hair cutting, facial, manicure, etc.)"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Additional Message</Label>
                    <Textarea
                      id="message"
                      value={inquiryForm.message}
                      onChange={(e) => setInquiryForm(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Tell us about your business goals and how we can help..."
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting Inquiry...
                      </>
                    ) : (
                      <>
                        Submit Partnership Inquiry
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Salon?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join India's fastest-growing salon network and unlock unlimited growth potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-3 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                onClick={() => document.getElementById('partnership-types')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-3 rounded-xl font-semibold border-2 hover:bg-primary/20 hover:border-primary/50 hover:text-primary transition-all duration-300 hover:shadow-lg"
                onClick={() => window.location.href = 'tel:+919427673752'}
              >
                Call Our Team
                <Building2 className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
