import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Search, HelpCircle, MessageSquare, Phone, Mail, BookOpen, Video, Download } from "lucide-react";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  tags: string[];
}

interface HelpArticle {
  id: number;
  title: string;
  content: string;
  category: string;
  lastUpdated: string;
  views: number;
}

export default function Help() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const faqs: FAQ[] = [
    {
      id: 1,
      question: "How does the queue estimation work?",
      answer: "Our system calculates wait times based on current queue length, service duration, and historical data to provide accurate estimates. The algorithm considers factors like average service time, current staff availability, and real-time queue updates.",
      category: "Booking",
      tags: ["queue", "estimation", "wait time"]
    },
    {
      id: 2,
      question: "Is Book My Look free to use?",
      answer: "Yes, Book My Look is completely free for customers. You can book appointments, check queue status, and leave reviews without any charges. Salon partners pay a small subscription fee for advanced features and analytics.",
      category: "Pricing",
      tags: ["free", "pricing", "subscription"]
    },
    {
      id: 3,
      question: "How do I cancel or reschedule my appointment?",
      answer: "You can cancel or reschedule your appointment up to 2 hours before your scheduled time through your dashboard. Simply go to 'My Bookings', select the appointment, and choose 'Cancel' or 'Reschedule'. For last-minute changes, please contact the salon directly.",
      category: "Booking",
      tags: ["cancel", "reschedule", "appointment"]
    },
    {
      id: 4,
      question: "What payment methods are accepted?",
      answer: "We accept UPI, Razorpay, credit/debit cards, and cash payments. You can pay online during booking or choose to pay at the salon. All online payments are secure and encrypted.",
      category: "Payment",
      tags: ["payment", "upi", "razorpay", "cards"]
    },
    {
      id: 5,
      question: "How do I become a partner salon?",
      answer: "Contact our partnership team through the contact form or email us at partners@qthrough.com. We'll guide you through the onboarding process, which includes verification, setup, and training for your staff.",
      category: "Partnership",
      tags: ["partnership", "salon", "onboarding"]
    },
    {
      id: 6,
      question: "What if I'm running late for my appointment?",
      answer: "If you're running late, please contact the salon directly as soon as possible. They may be able to accommodate you or suggest rescheduling. Being more than 15 minutes late may result in your appointment being cancelled.",
      category: "Booking",
      tags: ["late", "appointment", "contact"]
    },
    {
      id: 7,
      question: "How accurate are the wait time estimates?",
      answer: "Our estimates are typically accurate within 5-10 minutes, but actual wait times may vary based on service complexity, unexpected delays, or walk-in customers. We continuously improve our algorithm based on real data.",
      category: "Booking",
      tags: ["accuracy", "wait time", "estimation"]
    },
    {
      id: 8,
      question: "Can I book multiple services in one appointment?",
      answer: "Yes, you can book multiple services during the same appointment slot. When booking, you can select multiple services and the system will calculate the total time and cost. Some salons may have specific packages for multiple services.",
      category: "Booking",
      tags: ["multiple services", "packages", "booking"]
    }
  ];

  const helpArticles: HelpArticle[] = [
    {
      id: 1,
      title: "Getting Started with QThrough",
      content: "Learn how to create an account, book your first appointment, and navigate the platform...",
      category: "Getting Started",
      lastUpdated: "2024-01-15",
      views: 1250
    },
    {
      id: 2,
      title: "Understanding Queue Management",
      content: "Discover how our real-time queue system works and how to make the most of it...",
      category: "Features",
      lastUpdated: "2024-01-12",
      views: 890
    },
    {
      id: 3,
      title: "Payment and Billing Guide",
      content: "Everything you need to know about payments, refunds, and billing on QThrough...",
      category: "Payment",
      lastUpdated: "2024-01-10",
      views: 650
    },
    {
      id: 4,
      title: "Salon Owner Dashboard Guide",
      content: "Complete guide to managing your salon operations through the owner dashboard...",
      category: "For Salon Owners",
      lastUpdated: "2024-01-08",
      views: 420
    }
  ];

  const categories = ["all", "Booking", "Payment", "Pricing", "Partnership", "Getting Started", "Features", "For Salon Owners"];

  const getFilteredFAQs = () => {
    let filtered = faqs;

    if (searchTerm) {
      filtered = filtered.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }

    return filtered;
  };

  const getFilteredArticles = () => {
    let filtered = helpArticles;

    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    return filtered;
  };

  return (
    <div className="min-h-screen bg-accent/10 flex flex-col relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>

      <div className="flex-1 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-20 px-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 rounded-full text-sm font-semibold border border-purple-200 mb-8"
          >
            <HelpCircle className="h-4 w-4" />
            Help & Support Center
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent leading-tight mb-6"
          >
            How Can We Help
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">You Today?</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12"
          >
            Find answers to your questions, browse our comprehensive FAQ, and access helpful resources.
            We're here to ensure you have the best experience possible.
          </motion.p>

          {/* Enhanced Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-xl ring-1 ring-white/20">
              <CardContent className="p-2">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
                    <Search className="h-6 w-6" />
                  </div>
                  <Input
                    placeholder="Search for help articles, FAQs, or topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-14 h-14 text-lg border-0 bg-transparent focus:ring-4 focus:ring-blue-500/10 text-slate-800 placeholder:text-slate-400"
                  />
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 h-10 px-6">
                      Search
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="container px-4 pb-20">
          <Tabs defaultValue="faq" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 p-1 rounded-xl shadow-inner border border-slate-200">
                <TabsTrigger value="faq" className="rounded-lg font-semibold text-slate-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300">
                  ❓ FAQ
                </TabsTrigger>
                <TabsTrigger value="articles" className="rounded-lg font-semibold text-slate-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300">
                  📚 Articles
                </TabsTrigger>
                <TabsTrigger value="resources" className="rounded-lg font-semibold text-slate-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300">
                  🎯 Resources
                </TabsTrigger>
              </TabsList>
            </motion.div>

            {/* FAQ Tab */}
            <TabsContent value="faq" className="space-y-8">
              {/* Category Filter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap justify-center gap-3"
              >
                {categories.slice(0, 5).map((category, index) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={`rounded-full px-6 py-2 font-semibold transition-all duration-300 ${
                        selectedCategory === category
                          ? "bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white shadow-lg"
                          : "border-2 border-slate-200 bg-white/80 hover:bg-slate-50 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      {category === "all" ? "📋 All Categories" : `🏷️ ${category}`}
                    </Button>
                  </motion.div>
                ))}
              </motion.div>

              {/* FAQ Accordion */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Accordion type="single" collapsible className="space-y-4 max-w-4xl mx-auto">
                  {getFilteredFAQs().map((faq, index) => (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                    >
                      <AccordionItem value={`faq-${faq.id}`} className="shadow-lg border-0 bg-gradient-to-br from-white via-slate-50/30 to-white backdrop-blur-sm hover:shadow-xl transition-all duration-500 rounded-xl overflow-hidden ring-1 ring-slate-200/50">
                        <AccordionTrigger className="px-8 py-6 text-left hover:no-underline group">
                          <div className="flex items-center gap-4 w-full">
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0"
                            >
                              <HelpCircle className="h-5 w-5 text-white" />
                            </motion.div>
                            <div className="flex-1">
                              <span className="font-bold text-lg text-slate-800 group-hover:text-slate-900 transition-colors duration-200">{faq.question}</span>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-700 border-slate-200">
                                  {faq.category}
                                </Badge>
                                {faq.tags.slice(0, 2).map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs border-slate-300 text-slate-600">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-8 pb-6">
                          <div className="pl-14">
                            <p className="text-slate-600 leading-relaxed mb-4 text-base">{faq.answer}</p>
                            <div className="flex flex-wrap gap-2">
                              {faq.tags.map((tag) => (
                                <motion.div
                                  key={tag}
                                  whileHover={{ scale: 1.05 }}
                                  className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full text-xs font-medium border border-blue-200 cursor-pointer"
                                >
                                  <span>🏷️</span>
                                  <span>{tag}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </Accordion>
              </motion.div>

              {getFilteredFAQs().length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <Card className="max-w-md mx-auto shadow-xl border-0 bg-gradient-to-br from-white via-slate-50/30 to-white backdrop-blur-sm ring-1 ring-slate-200/50">
                    <CardContent className="text-center py-12 px-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="text-5xl mb-6"
                      >
                        ❓
                      </motion.div>
                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl font-bold text-slate-800 mb-3"
                      >
                        No FAQs found
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-slate-600 mb-6 leading-relaxed"
                      >
                        Try adjusting your search terms or browse different categories.
                      </motion.p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </TabsContent>

            {/* Help Articles Tab */}
            <TabsContent value="articles" className="space-y-8">
              {/* Category Filter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap justify-center gap-3"
              >
                {categories.slice(0, 5).map((category, index) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={`rounded-full px-6 py-2 font-semibold transition-all duration-300 ${
                        selectedCategory === category
                          ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg"
                          : "border-2 border-slate-200 bg-white/80 hover:bg-slate-50 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      {category === "all" ? "📋 All Categories" : `🏷️ ${category}`}
                    </Button>
                  </motion.div>
                ))}
              </motion.div>

              {/* Help Articles Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="grid gap-8 md:grid-cols-2"
              >
                {getFilteredArticles().map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="group"
                  >
                    <Card className="shadow-xl border-0 bg-gradient-to-br from-white via-slate-50/30 to-white backdrop-blur-sm hover:shadow-2xl transition-all duration-500 overflow-hidden ring-1 ring-slate-200/50 hover:ring-slate-300/70 h-full">
                      <CardHeader className="bg-gradient-to-r from-blue-50/50 via-indigo-50/50 to-purple-50/50 border-b border-slate-100/60">
                        <div className="flex items-start justify-between mb-3">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg"
                          >
                            <BookOpen className="h-6 w-6 text-white" />
                          </motion.div>
                          <Badge variant="secondary" className="bg-slate-100 text-slate-700 border-slate-200 text-xs">
                            {article.category}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors duration-200 leading-tight">
                          {article.title}
                        </CardTitle>
                        <CardDescription className="text-slate-600 leading-relaxed mt-2">
                          {article.content}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center justify-between text-sm text-slate-500 mb-6">
                          <span className="flex items-center gap-1">
                            📅 Updated {new Date(article.lastUpdated).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            👁️ {article.views} views
                          </span>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="mt-auto"
                        >
                          <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 h-12">
                            <BookOpen className="h-4 w-4 mr-2" />
                            Read Article
                          </Button>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              {getFilteredArticles().length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <Card className="max-w-md mx-auto shadow-xl border-0 bg-gradient-to-br from-white via-slate-50/30 to-white backdrop-blur-sm ring-1 ring-slate-200/50">
                    <CardContent className="text-center py-12 px-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="text-5xl mb-6"
                      >
                        📚
                      </motion.div>
                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl font-bold text-slate-800 mb-3"
                      >
                        No articles found
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-slate-600 mb-6 leading-relaxed"
                      >
                        Try adjusting your search terms or browse different categories.
                      </motion.p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </TabsContent>

            {/* Resources Tab */}
            <TabsContent value="resources" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              >
                {[
                  {
                    icon: <Video className="h-6 w-6" />,
                    title: "Video Tutorials",
                    description: "Watch step-by-step video guides to learn how to use BookMyLook",
                    gradient: "from-red-500 to-pink-600",
                    bgColor: "from-red-50 to-pink-50",
                    emoji: "🎥"
                  },
                  {
                    icon: <Download className="h-6 w-6" />,
                    title: "User Guides",
                    description: "Download comprehensive PDF guides for customers and salon owners",
                    gradient: "from-green-500 to-emerald-600",
                    bgColor: "from-green-50 to-emerald-50",
                    emoji: "📄"
                  },
                  {
                    icon: <BookOpen className="h-6 w-6" />,
                    title: "API Documentation",
                    description: "Technical documentation for developers and integration partners",
                    gradient: "from-purple-500 to-indigo-600",
                    bgColor: "from-purple-50 to-indigo-50",
                    emoji: "⚙️"
                  }
                ].map((resource, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="group"
                  >
                    <Card className="shadow-xl border-0 bg-gradient-to-br from-white via-slate-50/30 to-white backdrop-blur-sm hover:shadow-2xl transition-all duration-500 overflow-hidden ring-1 ring-slate-200/50 hover:ring-slate-300/70 h-full">
                      <CardHeader className="text-center pb-4 bg-gradient-to-r from-blue-50/50 via-indigo-50/50 to-purple-50/50 border-b border-slate-100/60">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className={`w-16 h-16 bg-gradient-to-br ${resource.gradient} rounded-2xl flex items-center justify-center shadow-xl mx-auto mb-4`}
                        >
                          <div className="text-white">
                            {resource.icon}
                          </div>
                        </motion.div>
                        <CardTitle className="text-xl font-bold text-slate-800 mb-2">
                          {resource.emoji} {resource.title}
                        </CardTitle>
                        <CardDescription className="text-slate-600 leading-relaxed">
                          {resource.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-6 flex-1 flex flex-col">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="mt-auto"
                        >
                          <Button className={`w-full h-12 bg-gradient-to-r ${resource.gradient} hover:opacity-90 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300`}>
                            {resource.title === "Video Tutorials" && <Video className="h-4 w-4 mr-2" />}
                            {resource.title === "User Guides" && <Download className="h-4 w-4 mr-2" />}
                            {resource.title === "API Documentation" && <BookOpen className="h-4 w-4 mr-2" />}
                            {resource.title === "Video Tutorials" ? "Watch Videos" :
                             resource.title === "User Guides" ? "Download Guides" :
                             "View Docs"}
                          </Button>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              {/* Contact Support Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="text-center mt-16"
              >
                <Card className="max-w-2xl mx-auto shadow-xl border-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 backdrop-blur-sm ring-1 ring-emerald-200/50">
                  <CardContent className="p-8">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl mx-auto mb-6"
                    >
                      <MessageSquare className="h-8 w-8 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">Still Need Help?</h3>
                    <p className="text-slate-600 mb-8 leading-relaxed">
                      Can't find what you're looking for? Our support team is here to help you personally.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Contact Support
                      </Button>
                      <Button variant="outline" className="border-2 border-slate-300 bg-white/80 hover:bg-slate-50 font-semibold hover:border-slate-400 transition-all duration-300">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Us
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, type: "spring" }}
        className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full shadow-xl"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.3, type: "spring" }}
        className="absolute -bottom-6 -left-6 w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full shadow-xl"
      ></motion.div>
    </div>
  );
}
