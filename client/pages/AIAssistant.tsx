import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Sparkles,
  Brain,
  Target,
  Clock,
  Star,
  MapPin,
  Scissors,
  Heart,
  Zap,
  TrendingUp,
  Users,
  Calendar,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Bot,
  Lightbulb,
  Crown,
  Palette
} from "lucide-react";

export default function AIAssistant() {
  const [userPreferences, setUserPreferences] = useState({
    faceShape: '',
    hairType: '',
    occasion: '',
    budget: '',
    location: ''
  });

  const handlePreferenceChange = (field: string, value: string) => {
    setUserPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const aiFeatures = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Smart Salon Matching",
      description: "AI analyzes your preferences, past bookings, and reviews to recommend the perfect salons",
      color: "from-blue-500 to-indigo-600",
      benefits: ["Personalized recommendations", "Quality matching", "Location optimization"]
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Style Intelligence",
      description: "Get AI-powered hairstyle suggestions based on your face shape, hair type, and occasion",
      color: "from-purple-500 to-pink-600",
      benefits: ["Face shape analysis", "Trend recommendations", "Occasion matching"]
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Queue Time Predictions",
      description: "AI predicts exact wait times and suggests optimal booking slots to minimize waiting",
      color: "from-emerald-500 to-teal-600",
      benefits: ["Real-time predictions", "Smart scheduling", "Time optimization"]
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Service Recommendations",
      description: "AI suggests the best services based on your goals, budget, and beauty needs",
      color: "from-orange-500 to-red-600",
      benefits: ["Budget optimization", "Goal-oriented", "Personalized suggestions"]
    }
  ];

  const aiDemoResults = [
    {
      type: "salon",
      title: "AI Recommended: Bliss Spa & Salon",
      match: "98% Match",
      reason: "Based on your preference for luxury spas, proximity to your location, and 4.9★ rating",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop",
      details: ["5-minute drive", "Luxury spa treatments", "Expert stylists"]
    },
    {
      type: "style",
      title: "AI Suggested: Layered Bob Cut",
      match: "Perfect for Oval Face Shape",
      reason: "This style will enhance your facial features and is trending this season",
      image: "https://images.unsplash.com/photo-1605497787869-91ce5ccb9a48?w=400&h=300&fit=crop",
      details: ["45-minute service", "Trendy & professional", "Low maintenance"]
    },
    {
      type: "timing",
      title: "AI Predicted: Book Now",
      match: "Optimal Slot Available",
      reason: "Current queue: 2 people | Expected wait: 15 minutes | Best time to arrive: 2:30 PM",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop",
      details: ["15-min wait prediction", "Stylist: Priya", "Service: Haircut & Style"]
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Beauty Enthusiast",
      quote: "The AI recommendations are spot-on! It suggested a salon that perfectly matched my style preferences.",
      rating: 5,
      avatar: "SC"
    },
    {
      name: "Raj Kumar",
      role: "Busy Professional",
      quote: "Queue time predictions saved me 45 minutes of waiting. The AI knows exactly when to book!",
      rating: 5,
      avatar: "RK"
    },
    {
      name: "Meera Patel",
      role: "Salon Owner",
      quote: "Our bookings increased 40% thanks to AI recommendations. Customers love the personalized suggestions.",
      rating: 5,
      avatar: "MP"
    }
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
              <Bot className="h-4 w-4" />
              AI-Powered Beauty Experience
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-indigo-100 bg-clip-text text-transparent"
            >
              Meet Your
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                AI Beauty Assistant
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
            >
              Experience the future of salon booking with AI that understands your beauty needs,
              predicts the perfect timing, and recommends services tailored just for you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center gap-4 mt-8"
            >
              <div className="flex items-center gap-2 text-slate-300">
                <Brain className="h-5 w-5 text-blue-400" />
                <span>Machine Learning Powered</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Target className="h-5 w-5 text-green-400" />
                <span>98% Accuracy Rate</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Zap className="h-5 w-5 text-purple-400" />
                <span>Real-time Predictions</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </section>

      {/* AI Features Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              AI-Powered Features
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Discover how our AI transforms your salon booking experience with intelligent recommendations and predictions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {aiFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg`}>
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      {feature.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-slate-600">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Demo Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              See AI in Action
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Experience how our AI analyzes your preferences and provides personalized recommendations.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {aiDemoResults.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="glass border-0 shadow-xl bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
                  <div className="relative">
                    <img
                      src={result.image}
                      alt={result.title}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium">
                        {result.match}
                      </Badge>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <h3 className="font-bold text-white text-lg mb-1">{result.title}</h3>
                      <p className="text-slate-200 text-sm">{result.reason}</p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      {result.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-slate-600">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Interactive AI Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <Card className="premium-card">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                  <Bot className="h-6 w-6 text-blue-600" />
                  Try AI Recommendations
                </CardTitle>
                <CardDescription>
                  Tell us about your preferences and get personalized AI suggestions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Face Shape</Label>
                    <Select value={userPreferences.faceShape} onValueChange={(value) => handlePreferenceChange('faceShape', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select face shape" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="oval">Oval</SelectItem>
                        <SelectItem value="round">Round</SelectItem>
                        <SelectItem value="square">Square</SelectItem>
                        <SelectItem value="heart">Heart</SelectItem>
                        <SelectItem value="diamond">Diamond</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Hair Type</Label>
                    <Select value={userPreferences.hairType} onValueChange={(value) => handlePreferenceChange('hairType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select hair type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="straight">Straight</SelectItem>
                        <SelectItem value="wavy">Wavy</SelectItem>
                        <SelectItem value="curly">Curly</SelectItem>
                        <SelectItem value="coily">Coily</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Occasion</Label>
                    <Select value={userPreferences.occasion} onValueChange={(value) => handlePreferenceChange('occasion', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select occasion" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="work">Work/Professional</SelectItem>
                        <SelectItem value="party">Party/Event</SelectItem>
                        <SelectItem value="wedding">Wedding</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Budget Range</Label>
                    <Select value={userPreferences.budget} onValueChange={(value) => handlePreferenceChange('budget', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="budget">₹500-1500</SelectItem>
                        <SelectItem value="mid">₹1500-3000</SelectItem>
                        <SelectItem value="premium">₹3000-5000</SelectItem>
                        <SelectItem value="luxury">₹5000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Get AI Recommendations
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Loved by Beauty Enthusiasts
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              See how our AI Beauty Assistant is transforming the way people discover and book salon services.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="glass border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-slate-700 mb-6 italic leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{testimonial.name}</p>
                        <p className="text-sm text-slate-600">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-8 border border-white/20"
            >
              <Lightbulb className="h-4 w-4" />
              Ready for AI-Powered Beauty?
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Experience the Future of
              <span className="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Salon Booking
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-300 mb-8"
            >
              Join thousands of beauty enthusiasts who have discovered their perfect salon experience with AI guidance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white px-8">
                <Sparkles className="h-5 w-5 mr-2" />
                Start Booking with AI
              </Button>
              <Button size="lg" variant="outline" className="border-white/50 bg-white/10 text-white shadow-lg shadow-white/10 hover:bg-white/30 hover:shadow-xl hover:shadow-white/30 hover:scale-105 hover:border-white/70 transition-all duration-300 px-8 backdrop-blur-sm">
                <Bot className="h-5 w-5 mr-2" />
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
