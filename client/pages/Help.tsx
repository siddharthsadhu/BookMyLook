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
    <div className="container py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Help Center</h1>
        <p className="text-muted-foreground">Find answers to your questions and learn how to use Book My Look</p>
      </div>

      {/* Search Bar */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for help articles, FAQs, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="faq" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="articles">Help Articles</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category === "all" ? "All Categories" : category}
              </Button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {getFilteredFAQs().map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <AccordionItem value={`faq-${faq.id}`} className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 text-primary" />
                      <span className="font-medium">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <p className="text-muted-foreground leading-relaxed mb-4">{faq.answer}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {faq.category}
                      </Badge>
                      {faq.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>

          {getFilteredFAQs().length === 0 && (
            <Card>
              <CardContent className="text-center py-16">
                <div className="text-6xl mb-4">❓</div>
                <h3 className="text-xl font-semibold mb-2">No FAQs found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or browse different categories.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="articles" className="space-y-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category === "all" ? "All Categories" : category}
              </Button>
            ))}
          </div>

          {/* Help Articles */}
          <div className="grid gap-6 md:grid-cols-2">
            {getFilteredArticles().map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{article.title}</CardTitle>
                        <CardDescription className="mt-2">
                          {article.content}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {article.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Updated {new Date(article.lastUpdated).toLocaleDateString()}</span>
                      <span>{article.views} views</span>
                    </div>
                    <Button className="w-full mt-4">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Read Article
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {getFilteredArticles().length === 0 && (
            <Card>
              <CardContent className="text-center py-16">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or browse different categories.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Video Tutorials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Watch step-by-step video guides to learn how to use QThrough
                </p>
                <Button className="w-full">
                  <Video className="h-4 w-4 mr-2" />
                  Watch Videos
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  User Guides
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Download comprehensive PDF guides for customers and salon owners
                </p>
                <Button className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Guides
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  API Documentation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Technical documentation for developers and integration partners
                </p>
                <Button className="w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  View Docs
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
