import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Newspaper,
  Download,
  Camera,
  Award,
  TrendingUp,
  Calendar,
  Users,
  Star,
  Quote,
  Mic,
  Video,
  FileText,
  Mail,
  ExternalLink,
  Sparkles,
  Trophy,
  Target,
  Globe,
  Zap,
  Eye,
  Heart
} from "lucide-react";

export default function Press() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    outlet: '',
    topic: '',
    deadline: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle press inquiry submission
    alert('Press inquiry submitted successfully! We\'ll get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      outlet: '',
      topic: '',
      deadline: '',
      message: ''
    });
  };

  const pressKits = [
    {
      title: "Brand Assets & Logos",
      description: "Complete brand guidelines, high-resolution logos, and brand assets for media use",
      size: "5.2 MB",
      downloads: "1,247",
      icon: <FileText className="h-8 w-8" />,
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop",
      category: "Brand"
    },
    {
      title: "Product Screenshots",
      description: "High-resolution mobile app screenshots and interface designs",
      size: "18.7 MB",
      downloads: "987",
      icon: <Camera className="h-8 w-8" />,
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
      category: "Product"
    },
    {
      title: "Founder Interview Video",
      description: "Pre-recorded video interview with our CEO and co-founder",
      size: "89.4 MB",
      downloads: "456",
      icon: <Video className="h-8 w-8" />,
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop",
      category: "Video"
    }
  ];

  const mediaMentions = [
    {
      outlet: "TechCrunch",
      title: "BookMyLook Revolutionizes Salon Booking with AI-Powered Recommendations",
      date: "Dec 15, 2024",
      excerpt: "The startup's innovative approach combines real-time availability with personalized suggestions, transforming how customers discover and book salon services.",
      link: "#",
      logo: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=80&h=80&fit=crop",
      category: "Technology",
      readTime: "4 min read"
    },
    {
      outlet: "Forbes India",
      title: "How BookMyLook is Transforming India's Beauty Industry",
      date: "Nov 28, 2024",
      excerpt: "With over 50,000 satisfied customers, the platform is setting new standards for salon services with its comprehensive booking ecosystem.",
      link: "#",
      logo: "https://images.unsplash.com/photo-1486312338219-ce68e2c6f44d?w=80&h=80&fit=crop",
      category: "Business",
      readTime: "6 min read"
    },
    {
      outlet: "The Economic Times",
      title: "Ahmedabad Startup Raises $2M for Salon Tech Platform",
      date: "Oct 10, 2024",
      excerpt: "BookMyLook secures funding to expand its real-time booking technology across India, targeting the $20B beauty and wellness market.",
      link: "#",
      logo: "https://images.unsplash.com/photo-1504711331083-9c895941bf81?w=80&h=80&fit=crop",
      category: "Finance",
      readTime: "3 min read"
    },
    {
      outlet: "YourStory",
      title: "From Idea to IPO: BookMyLook's Journey in Salon Innovation",
      date: "Sep 22, 2024",
      excerpt: "The Ahmedabad-based startup's growth story offers lessons for aspiring entrepreneurs in the beauty tech space.",
      link: "#",
      logo: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=80&h=80&fit=crop",
      category: "Entrepreneurship",
      readTime: "8 min read"
    }
  ];

  const companyNews = [
    {
      date: "Jan 15, 2025",
      title: "BookMyLook Launches Real-Time Queue Management System",
      description: "New feature allows customers to join virtual queues and get notified when their turn arrives.",
      category: "Product Update"
    },
    {
      date: "Dec 20, 2024",
      title: "Partnership with 500+ Premium Salons Across India",
      description: "Strategic alliances with top salon chains expand our network to 15 major cities.",
      category: "Business"
    },
    {
      date: "Nov 30, 2024",
      title: "BookMyLook Wins 'Most Innovative Startup' at Tech Awards",
      description: "Recognized for revolutionizing the salon booking industry with cutting-edge technology.",
      category: "Awards"
    },
    {
      date: "Oct 25, 2024",
      title: "Series A Funding Round Completed - $5M Raised",
      description: "Investment will fuel expansion into new markets and product development.",
      category: "Funding"
    }
  ];

  const testimonials = [
    {
      quote: "BookMyLook has transformed how salons operate in the digital age. Their technology is truly innovative.",
      author: "Rajesh Kumar",
      title: "CEO, Style Studio Chain",
      avatar: "RK"
    },
    {
      quote: "The platform's ease of use and reliability has helped us increase our booking efficiency by 40%.",
      author: "Priya Sharma",
      title: "Owner, Glamour Zone",
      avatar: "PS"
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
              <Newspaper className="h-4 w-4" />
              Press & Media Center
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-indigo-100 bg-clip-text text-transparent"
            >
              Stories That
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Inspire Change
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
            >
              Discover our journey, impact, and vision for transforming India's beauty and wellness industry through innovative technology.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center gap-4 mt-8"
            >
              <div className="flex items-center gap-2 text-slate-300">
                <Award className="h-5 w-5 text-yellow-400" />
                <span>Featured in 50+ Publications</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Users className="h-5 w-5 text-green-400" />
                <span>10K+ Media Impressions</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <TrendingUp className="h-5 w-5 text-blue-400" />
                <span>Growing 300% YoY</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </section>

      {/* Key Statistics Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Impact & Achievements
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Numbers that tell our story of transformation in India's beauty industry.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                metric: "50,000+",
                label: "Happy Customers",
                description: "Active users choosing BookMyLook",
                icon: <Users className="h-8 w-8" />,
                color: "from-green-500 to-emerald-600"
              },
              {
                metric: "1,200+",
                label: "Partner Salons",
                description: "Premium salons in our network",
                icon: <Award className="h-8 w-8" />,
                color: "from-purple-500 to-pink-600"
              },
              {
                metric: "300%",
                label: "YoY Growth",
                description: "Annual growth rate",
                icon: <TrendingUp className="h-8 w-8" />,
                color: "from-blue-500 to-indigo-600"
              },
              {
                metric: "4.8★",
                label: "Average Rating",
                description: "Customer satisfaction score",
                icon: <Star className="h-8 w-8" />,
                color: "from-orange-500 to-red-600"
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <Card className="border-0 shadow-xl bg-white/10 backdrop-blur-xl hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                      <div className="text-white">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                      {stat.metric}
                    </div>
                    <div className="text-xl font-semibold text-white mb-2">
                      {stat.label}
                    </div>
                    <div className="text-slate-300 text-sm">
                      {stat.description}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Kits Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Press Resources
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Everything you need to tell our story - logos, images, facts, and more.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {pressKits.map((kit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2 overflow-hidden group">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={kit.image}
                      alt={kit.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-white/90 text-slate-800 backdrop-blur-sm font-medium">
                        {kit.category}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <div className="w-12 h-12 bg-white/95 rounded-full flex items-center justify-center shadow-lg">
                        <div className="text-slate-800">
                          {kit.icon}
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl">{kit.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">{kit.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between mb-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        <span>Size: {kit.size}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        <span>{kit.downloads} downloads</span>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 group/btn">
                      <Download className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                      Download Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Gallery Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Media Gallery
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              High-quality photos and videos for your media coverage.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                type: "photo",
                title: "Mobile App Interface",
                url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=400&fit=crop&crop=center",
                alt: "BookMyLook mobile app interface showing salon booking features"
              },
              {
                type: "photo",
                title: "Premium Salon Experience",
                url: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=500&h=400&fit=crop&crop=center",
                alt: "Luxurious salon interior with modern equipment and comfortable seating"
              },
              {
                type: "photo",
                title: "Happy Customers",
                url: "https://images.unsplash.com/photo-1605497787869-91ce5ccb9a48?w=500&h=400&fit=crop&crop=center",
                alt: "Satisfied customers enjoying salon services"
              },
              {
                type: "video",
                title: "App Walkthrough",
                url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=400&fit=crop&crop=center",
                alt: "BookMyLook app demonstration video showing booking process",
                duration: "2:45",
                videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
              }
            ].map((media, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative aspect-[5/4] overflow-hidden">
                    <img
                      src={media.url}
                      alt={media.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {media.type === "video" && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/30 transition-colors duration-300">
                        <div className="w-16 h-16 bg-white/95 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                          <Video className="h-8 w-8 text-slate-800 ml-1" />
                        </div>
                        {media.duration && (
                          <div className="absolute bottom-4 right-4 bg-black/80 text-white text-sm px-3 py-1 rounded-full font-medium backdrop-blur-sm">
                            {media.duration}
                          </div>
                        )}
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-white/90 text-slate-800 backdrop-blur-sm">
                        {media.type === "video" ? "Video" : "Photo"}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg text-slate-800 group-hover:text-blue-600 transition-colors duration-300 mb-2">
                      {media.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{media.alt}</p>
                    {media.type === "video" && (
                      <Button
                        size="sm"
                        className="mt-4 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      >
                        <Video className="h-4 w-4 mr-2" />
                        Watch Video
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Mentions Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              In The News
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              See how leading publications are covering our journey and impact.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {mediaMentions.map((mention, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-1 overflow-hidden group">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center overflow-hidden">
                          <img
                            src={mention.logo}
                            alt={mention.outlet}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-slate-800">{mention.outlet}</h3>
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Badge variant="outline" className="text-xs px-2 py-0.5">
                              {mention.category}
                            </Badge>
                            <span>•</span>
                            <span>{mention.readTime}</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-slate-500 font-medium">{mention.date}</span>
                    </div>
                    <CardTitle className="text-lg hover:text-blue-600 transition-colors duration-300 cursor-pointer leading-tight">
                      {mention.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4 leading-relaxed">{mention.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <Button variant="outline" size="sm" className="group/btn border-slate-300 hover:bg-slate-50">
                        Read Full Article
                        <ExternalLink className="h-3 w-3 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                      <div className="flex items-center gap-1 text-sm text-slate-500">
                        <Calendar className="h-3 w-3" />
                        <span>{mention.date}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company News Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Latest Updates
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Stay updated with our latest achievements, product launches, and company milestones.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {companyNews.map((news, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-3">
                      <Badge
                        variant="outline"
                        className={`${
                          news.category === 'Awards' ? 'border-yellow-300 text-yellow-700 bg-yellow-50' :
                          news.category === 'Funding' ? 'border-green-300 text-green-700 bg-green-50' :
                          news.category === 'Product Update' ? 'border-blue-300 text-blue-700 bg-blue-50' :
                          'border-purple-300 text-purple-700 bg-purple-50'
                        }`}
                      >
                        {news.category === 'Awards' && <Trophy className="h-3 w-3 mr-1" />}
                        {news.category === 'Funding' && <TrendingUp className="h-3 w-3 mr-1" />}
                        {news.category === 'Product Update' && <Zap className="h-3 w-3 mr-1" />}
                        {news.category === 'Business' && <Target className="h-3 w-3 mr-1" />}
                        {news.category}
                      </Badge>
                      <span className="text-sm text-slate-500 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {news.date}
                      </span>
                    </div>
                    <CardTitle className="text-lg hover:text-blue-600 transition-colors cursor-pointer">
                      {news.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">{news.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Video Testimonials
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Hear directly from our partners and customers about their BookMyLook experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Salon Owner Success Story",
                speaker: "Rajesh Kumar",
                position: "CEO, Style Studio Chain",
                thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&crop=face",
                duration: "3:45",
                excerpt: "How BookMyLook transformed our booking system and increased our revenue by 40%. A game-changer for salon management.",
                videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
                views: "2.1K",
                likes: 89
              },
              {
                title: "Customer Journey & Experience",
                speaker: "Priya Sharma",
                position: "Regular Customer & Beauty Enthusiast",
                thumbnail: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=600&h=400&fit=crop&crop=face",
                duration: "2:32",
                excerpt: "The easiest way to book salon appointments - no more waiting on calls! BookMyLook changed how I manage my beauty routine.",
                videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
                views: "1.8K",
                likes: 124
              }
            ].map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="overflow-hidden border-0 shadow-xl bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
                  <div className="relative">
                    <div className="aspect-[3/2] overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={`${video.speaker} - ${video.title}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-500">
                      <div className="w-20 h-20 bg-white/95 rounded-full flex items-center justify-center shadow-2xl cursor-pointer group/play">
                        <Video className="h-10 w-10 text-slate-800 ml-1 group-hover/play:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge variant="secondary" className="bg-white/90 text-slate-800 backdrop-blur-sm font-medium">
                        <Video className="h-3 w-3 mr-1" />
                        Video
                      </Badge>
                      <Badge variant="outline" className="bg-black/50 text-white border-white/30 backdrop-blur-sm">
                        {video.duration}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center gap-4 text-white text-sm">
                      <div className="flex items-center gap-1 bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
                        <Eye className="h-3 w-3" />
                        <span>{video.views}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
                        <Heart className="h-3 w-3" />
                        <span>{video.likes}</span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0">
                        {video.speaker.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-xl text-slate-800 mb-1">{video.title}</h3>
                        <p className="text-blue-600 font-semibold mb-1">{video.speaker}</p>
                        <p className="text-slate-600 text-sm">{video.position}</p>
                      </div>
                    </div>
                    <p className="text-slate-700 text-base leading-relaxed mb-6 italic">
                      "{video.excerpt}"
                    </p>
                    <div className="flex gap-3">
                      <Button
                        className="flex-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700"
                      >
                        <Video className="h-4 w-4 mr-2" />
                        Watch Full Video
                      </Button>
                      <Button variant="outline" size="icon" className="border-slate-300 hover:bg-slate-50">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              What Industry Leaders Say
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Hear from salon owners and industry experts about our impact.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="h-full border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-8">
                    <Quote className="h-8 w-8 text-indigo-500 mb-4" />
                    <p className="text-lg text-slate-700 mb-6 italic leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{testimonial.author}</p>
                        <p className="text-sm text-slate-600">{testimonial.title}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Inquiry Form */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Media Inquiries
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Need information for your story? We're here to help journalists tell our story.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-0 shadow-2xl bg-white/10 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white text-center flex items-center justify-center gap-2">
                    <Mic className="h-5 w-5" />
                    Contact Our Press Team
                  </CardTitle>
                  <CardDescription className="text-slate-300 text-center">
                    We'll respond within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-white">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Your full name"
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="your@email.com"
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-400"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="outlet" className="text-white">Media Outlet *</Label>
                        <Input
                          id="outlet"
                          value={formData.outlet}
                          onChange={(e) => handleInputChange('outlet', e.target.value)}
                          placeholder="Publication name"
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="deadline" className="text-white">Deadline</Label>
                        <Input
                          id="deadline"
                          type="date"
                          value={formData.deadline}
                          onChange={(e) => handleInputChange('deadline', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="topic" className="text-white">Topic/Angle</Label>
                      <Input
                        id="topic"
                        value={formData.topic}
                        onChange={(e) => handleInputChange('topic', e.target.value)}
                        placeholder="What are you writing about?"
                        className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-white">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Tell us about your story and what information you need..."
                        rows={4}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-400 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-semibold py-3"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Send Press Inquiry
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
