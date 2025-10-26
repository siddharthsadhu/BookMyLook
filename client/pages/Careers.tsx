import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Users,
  Target,
  Zap,
  Heart,
  Award,
  Sparkles,
  MapPin,
  Clock,
  DollarSign,
  Coffee,
  Home,
  Car,
  Star,
  ArrowRight,
  Send,
  CheckCircle2,
  Briefcase,
  TrendingUp,
  Lightbulb,
  Shield,
  Globe,
  Laptop,
  BookOpen,
  Gamepad,
  Utensils,
  Plane,
  Baby,
  GraduationCap
} from "lucide-react";

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationForm, setApplicationForm] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    resume: null,
    coverLetter: '',
    portfolio: ''
  });
  const [isApplying, setIsApplying] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { toast } = useToast();

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Senior Frontend Developer",
      image: "👨‍💻",
      quote: "BookMyLook gave me the opportunity to work on cutting-edge technology while making a real impact on the beauty industry. The team is incredibly supportive and innovative.",
      joined: "2 years ago",
      growth: "Promoted twice, led 3 major projects"
    },
    {
      name: "Priya Patel",
      role: "Product Manager",
      image: "👩‍💼",
      quote: "The culture here is amazing - everyone is passionate about solving real problems. I've grown tremendously both professionally and personally.",
      joined: "18 months ago",
      growth: "Led product strategy, increased user engagement by 40%"
    },
    {
      name: "Arjun Kumar",
      role: "UX Designer",
      image: "👨‍🎨",
      quote: "Working at BookMyLook feels like being part of a revolution. Our designs directly impact millions of users and transform the salon experience.",
      joined: "1 year ago",
      growth: "Designed 15+ features, won 2 design awards"
    },
    {
      name: "Sneha Gupta",
      role: "Backend Engineer",
      image: "👩‍💻",
      quote: "The technical challenges here are incredible. Building scalable systems that serve millions of users has been the highlight of my career so far.",
      joined: "14 months ago",
      growth: "Built 4 microservices, mentored 3 junior developers"
    },
    {
      name: "Vikram Singh",
      role: "DevOps Engineer",
      image: "👨‍🔧",
      quote: "Infrastructure that scales automatically and deploys seamlessly - that's what we do. Every day brings new challenges and victories.",
      joined: "2 years ago",
      growth: "Reduced deployment time by 80%, built auto-scaling infra"
    },
    {
      name: "Kavita Reddy",
      role: "Data Scientist",
      image: "👩‍🔬",
      quote: "The data insights we generate help salons make better decisions and grow faster. It's incredibly rewarding to see the direct impact of our work.",
      joined: "10 months ago",
      growth: "Developed ML models, increased prediction accuracy by 35%"
    },
    {
      name: "Amit Joshi",
      role: "Mobile Developer",
      image: "👨‍📱",
      quote: "Creating beautiful, fast mobile experiences for both iOS and Android users. The cross-platform challenges keep things exciting and innovative.",
      joined: "16 months ago",
      growth: "Launched 2 apps, achieved 4.8★ ratings"
    },
    {
      name: "Meera Iyer",
      role: "QA Engineer",
      image: "👩‍💻",
      quote: "Quality is paramount, and our testing ensures millions of users have flawless experiences. Every bug we catch prevents a thousand frustrations.",
      joined: "1.5 years ago",
      growth: "Established QA processes, reduced production bugs by 60%"
    }
  ];

  // Auto-rotate testimonials - faster and more engaging
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000); // Faster: every 4 seconds instead of 5

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  // Add floating particles effect
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const particleArray = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 5,
      delay: Math.random() * 2
    }));
    setParticles(particleArray);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const stats = [
    { number: "50+", label: "Team Members", icon: "👥", color: "from-blue-500 to-indigo-600" },
    { number: "25+", label: "Countries Served", icon: "🌍", color: "from-emerald-500 to-teal-600" },
    { number: "99%", label: "Employee Satisfaction", icon: "😊", color: "from-purple-500 to-pink-600" },
    { number: "3x", label: "Industry Growth", icon: "📈", color: "from-orange-500 to-red-600" }
  ];

  const values = [
    {
      icon: "🚀",
      title: "Innovation First",
      description: "We push boundaries and embrace new technologies to solve real problems in the beauty industry.",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: "🤝",
      title: "Collaboration",
      description: "We believe great ideas come from diverse perspectives and open communication.",
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      icon: "🎯",
      title: "Impact Driven",
      description: "Every team member has the opportunity to make a meaningful impact on millions of users.",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: "🌟",
      title: "Growth Mindset",
      description: "We invest in your development and provide opportunities to grow both personally and professionally.",
      gradient: "from-pink-500 to-rose-600"
    }
  ];

  const benefits = [
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Competitive Salary",
      description: "Market-leading compensation with performance bonuses"
    },
    {
      icon: <Home className="h-6 w-6" />,
      title: "Work from Home",
      description: "Flexible remote work options and modern office spaces"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness programs"
    },
    {
      icon: <Coffee className="h-6 w-6" />,
      title: "Learning Budget",
      description: "Annual budget for courses, conferences, and skill development"
    },
    {
      icon: <Car className="h-6 w-6" />,
      title: "Transportation",
      description: "Cabs for late nights and convenient commute options"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Recognition",
      description: "Spot bonuses, peer recognition, and career advancement"
    }
  ];

  const companyPerks = [
    {
      category: "Work-Life Balance",
      icon: <Home className="h-6 w-6" />,
      perks: [
        { icon: <Clock className="h-4 w-4" />, text: "Flexible working hours" },
        { icon: <Home className="h-4 w-4" />, text: "Work from anywhere" },
        { icon: <Plane className="h-4 w-4" />, text: "Unlimited paid time off" },
        { icon: <Baby className="h-4 w-4" />, text: "Parental leave (6 months)" }
      ]
    },
    {
      category: "Professional Growth",
      icon: <TrendingUp className="h-6 w-6" />,
      perks: [
        { icon: <BookOpen className="h-4 w-4" />, text: "₹50K annual learning budget" },
        { icon: <GraduationCap className="h-4 w-4" />, text: "Conference sponsorship" },
        { icon: <Laptop className="h-4 w-4" />, text: "Latest equipment & tools" },
        { icon: <Award className="h-4 w-4" />, text: "Career development programs" }
      ]
    },
    {
      category: "Health & Wellness",
      icon: <Heart className="h-6 w-6" />,
      perks: [
        { icon: <Shield className="h-4 w-4" />, text: "Comprehensive health insurance" },
        { icon: <Utensils className="h-4 w-4" />, text: "Free meals & snacks" },
        { icon: <Gamepad className="h-4 w-4" />, text: "Recreation & game room" },
        { icon: <Heart className="h-4 w-4" />, text: "Mental health support" }
      ]
    }
  ];

  const jobs = [
    {
      id: "senior-frontend-dev",
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote / Delhi NCR",
      type: "Full-time",
      experience: "3-5 years",
      salary: "₹15-25 LPA",
      urgent: true,
      description: "Build next-generation salon booking experiences with React, TypeScript, and modern web technologies.",
      requirements: [
        "3+ years of React/TypeScript experience",
        "Strong understanding of modern web technologies",
        "Experience with state management (Redux/Zustand)",
        "Knowledge of testing frameworks (Jest, Cypress)",
        "Familiarity with CI/CD and deployment processes"
      ],
      responsibilities: [
        "Develop and maintain high-quality frontend applications",
        "Collaborate with designers to implement pixel-perfect UIs",
        "Optimize applications for maximum speed and scalability",
        "Mentor junior developers and conduct code reviews",
        "Participate in architectural decisions and technical planning"
      ]
    },
    {
      id: "product-manager",
      title: "Product Manager",
      department: "Product",
      location: "Delhi NCR",
      type: "Full-time",
      experience: "2-4 years",
      salary: "₹18-28 LPA",
      urgent: false,
      description: "Drive product strategy and execution for our salon booking platform, working closely with engineering and design teams.",
      requirements: [
        "2+ years of product management experience",
        "Strong analytical and problem-solving skills",
        "Experience with user research and data analysis",
        "Excellent communication and leadership skills",
        "Understanding of B2B and B2C product dynamics"
      ],
      responsibilities: [
        "Define product vision and strategy for salon booking features",
        "Conduct user research and analyze product metrics",
        "Work with engineering teams to deliver high-quality features",
        "Collaborate with stakeholders to prioritize roadmap",
        "Monitor product performance and iterate based on data"
      ]
    },
    {
      id: "ux-designer",
      title: "UX Designer",
      department: "Design",
      location: "Remote / Delhi NCR",
      type: "Full-time",
      experience: "2-4 years",
      salary: "₹12-20 LPA",
      urgent: false,
      description: "Create intuitive and beautiful user experiences for our salon booking platform and mobile applications.",
      requirements: [
        "2+ years of UX/UI design experience",
        "Proficiency in Figma, Sketch, or Adobe XD",
        "Strong portfolio demonstrating user-centered design",
        "Understanding of mobile and web design principles",
        "Experience with user research and usability testing"
      ],
      responsibilities: [
        "Design user interfaces for web and mobile applications",
        "Conduct user research and usability testing",
        "Create wireframes, prototypes, and design systems",
        "Collaborate with product and engineering teams",
        "Ensure design consistency across all platforms"
      ]
    },
    {
      id: "business-development",
      title: "Business Development Manager",
      department: "Business",
      location: "Delhi NCR / Mumbai",
      type: "Full-time",
      experience: "3-5 years",
      salary: "₹10-18 LPA",
      urgent: false,
      description: "Expand our salon network by building partnerships with premium salons and beauty businesses across India.",
      requirements: [
        "3+ years in business development or sales",
        "Strong relationship-building and negotiation skills",
        "Experience in B2B partnerships and contracts",
        "Understanding of beauty and wellness industry",
        "Excellent communication and presentation skills"
      ],
      responsibilities: [
        "Identify and establish partnerships with premium salons",
        "Negotiate partnership terms and commercial agreements",
        "Develop and execute business development strategies",
        "Maintain relationships with existing partners",
        "Analyze market opportunities and competitive landscape"
      ]
    },
    {
      id: "customer-success",
      title: "Customer Success Manager",
      department: "Operations",
      location: "Delhi NCR",
      type: "Full-time",
      experience: "2-4 years",
      salary: "₹8-14 LPA",
      urgent: true,
      description: "Ensure our salon partners have exceptional experiences and drive retention through proactive support and engagement.",
      requirements: [
        "2+ years in customer success or account management",
        "Strong communication and relationship-building skills",
        "Experience in SaaS or service-based businesses",
        "Problem-solving and analytical mindset",
        "Understanding of customer lifecycle management"
      ],
      responsibilities: [
        "Onboard new salon partners and ensure smooth adoption",
        "Provide ongoing support and training to partners",
        "Monitor partner satisfaction and identify opportunities",
        "Develop retention strategies and reduce churn",
        "Collaborate with product teams to improve partner experience"
      ]
    }
  ];

  const handleApply = (job) => {
    setSelectedJob(job);
    setApplicationForm(prev => ({ ...prev, position: job.title }));
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    setIsApplying(true);

    // Simulate API call
    setTimeout(() => {
      setIsApplying(false);
      setSelectedJob(null);
      setApplicationForm({
        name: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        resume: null,
        coverLetter: '',
        portfolio: ''
      });

      toast({
        title: "Application Submitted Successfully! 🎉",
        description: "Thank you for your interest in BookMyLook. We'll review your application and get back to you within 3-5 business days.",
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
              <Sparkles className="h-4 w-4" />
              Join Our Growing Team
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"
            >
              Shape the Future of
              <br />
              Beauty Technology
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              We're building the most innovative salon booking platform in India.
              Join us in revolutionizing how millions discover and book beauty services.
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
                onClick={() => document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Open Positions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-3 rounded-xl font-semibold border-2 hover:bg-primary/5 transition-all duration-300"
                onClick={() => document.getElementById('culture')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Our Culture
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

      {/* Our Values */}
      <section id="culture" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Our Values Drive Everything</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're not just building a product – we're creating a movement that transforms the beauty industry.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${value.gradient} flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {value.icon}
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-background via-primary/5 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Why Work With Us?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We offer more than just a job – we provide an environment where you can thrive, grow, and make an impact.
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
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {benefit.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                        <p className="text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Employee Testimonials - Interactive Carousel */}
      <section className="py-20 bg-gradient-to-r from-background via-primary/5 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">What Our Team Says</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hear from the talented individuals who are building the future of salon technology.
            </p>
          </motion.div>

          {/* Testimonial Carousel */}
          <div className="relative max-w-4xl mx-auto">
            {/* Floating Particles Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-sm"
                  style={{
                    width: particle.size,
                    height: particle.size,
                    left: `${particle.x}%`,
                    top: `${particle.y}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: particle.duration,
                    delay: particle.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {/* Main Testimonial Display */}
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{
                duration: 0.6,
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
              className="text-center relative z-10"
            >
              <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 group mx-auto max-w-3xl bg-gradient-to-br from-white via-white to-primary/5 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 overflow-hidden">
                {/* Animated Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <CardContent className="p-6 md:p-8 relative z-10">
                  {/* Enhanced Quote Icon with pulsing effect */}
                  <motion.div
                    className="relative mx-auto mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-3xl shadow-xl relative overflow-hidden">
                      💬
                      {/* Pulsing ring effect */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-primary/30"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-md"></div>
                    </div>
                  </motion.div>

                  {/* Enhanced Quote with better typography */}
                  <motion.blockquote
                    className="text-xl md:text-2xl font-medium text-muted-foreground italic mb-8 leading-relaxed relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="text-4xl text-primary/60 absolute -top-2 -left-2">"</span>
                    {testimonials[currentTestimonial].quote}
                    <span className="text-4xl text-primary/60 absolute -bottom-6 -right-2">"</span>
                  </motion.blockquote>

                  {/* Enhanced Author Info */}
                  <motion.div
                    className="flex items-center justify-center gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-3xl shadow-xl relative overflow-hidden">
                        {testimonials[currentTestimonial].image}
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-md"></div>
                      </div>
                    </motion.div>

                    <div className="text-left">
                      <motion.h3
                        className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        {testimonials[currentTestimonial].name}
                      </motion.h3>
                      <motion.p
                        className="text-muted-foreground font-medium"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        {testimonials[currentTestimonial].role}
                      </motion.p>
                      <motion.div
                        className="flex items-center gap-4 mt-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {testimonials[currentTestimonial].joined}
                        </Badge>
                        <Badge className="bg-gradient-to-r from-primary to-accent text-white">
                          {testimonials[currentTestimonial].growth}
                        </Badge>
                      </motion.div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Side Testimonials Preview (Desktop Only) */}
            <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 left-0 -translate-x-8 opacity-40 hover:opacity-80 transition-all duration-500">
              <motion.div
                initial={{ opacity: 0, x: -20, scale: 0.8 }}
                animate={{ opacity: 0.4, x: 0, scale: 0.9 }}
                transition={{ delay: 0.2 }}
                className="w-16 h-16 bg-gradient-to-r from-primary/40 to-accent/40 rounded-2xl flex items-center justify-center text-xl shadow-lg cursor-pointer hover:scale-110 transition-all duration-300 backdrop-blur-sm"
                onClick={() => goToTestimonial((currentTestimonial - 1 + testimonials.length) % testimonials.length)}
              >
                {testimonials[(currentTestimonial - 1 + testimonials.length) % testimonials.length].image}
              </motion.div>
            </div>

            <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 right-0 translate-x-8 opacity-40 hover:opacity-80 transition-all duration-500">
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 0.4, x: 0, scale: 0.9 }}
                transition={{ delay: 0.2 }}
                className="w-16 h-16 bg-gradient-to-r from-primary/40 to-accent/40 rounded-2xl flex items-center justify-center text-xl shadow-lg cursor-pointer hover:scale-110 transition-all duration-300 backdrop-blur-sm"
                onClick={() => goToTestimonial((currentTestimonial + 1) % testimonials.length)}
              >
                {testimonials[(currentTestimonial + 1) % testimonials.length].image}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Perks */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Life at BookMyLook</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're more than just a workplace – we're a community that supports your growth and celebrates your success.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {companyPerks.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group h-full">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                    <CardTitle className="text-xl">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.perks.map((perk, perkIndex) => (
                        <div key={perkIndex} className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            {perk.icon}
                          </div>
                          <span className="text-sm">{perk.text}</span>
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

      {/* Job Openings */}
      <section id="jobs" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Open Positions</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join our talented team and help us build the future of salon technology.
            </p>
          </motion.div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center text-white shadow-lg">
                            <Briefcase className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-2xl font-bold">{job.title}</h3>
                              {job.urgent && (
                                <Badge className="bg-red-500 hover:bg-red-600">Urgent Hiring</Badge>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {job.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {job.type}
                              </span>
                              <span className="flex items-center gap-1">
                                <TrendingUp className="h-4 w-4" />
                                {job.experience}
                              </span>
                              <span className="font-medium text-primary">{job.salary}</span>
                            </div>
                            <p className="text-muted-foreground mb-4">{job.description}</p>
                            <Badge variant="outline" className="mb-4">{job.department}</Badge>
                          </div>
                        </div>
                      </div>

                      <div className="lg:text-right">
                        <Button
                          onClick={() => handleApply(job)}
                          className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          Apply Now
                          <Send className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {selectedJob && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedJob(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Apply for {selectedJob.title}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedJob(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </Button>
              </div>

              <form onSubmit={handleApplicationSubmit} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      required
                      value={applicationForm.name}
                      onChange={(e) => setApplicationForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={applicationForm.email}
                      onChange={(e) => setApplicationForm(prev => ({ ...prev, email: e.target.value }))}
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
                      value={applicationForm.phone}
                      onChange={(e) => setApplicationForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Select value={applicationForm.experience} onValueChange={(value) => setApplicationForm(prev => ({ ...prev, experience: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-1">0-1 years</SelectItem>
                        <SelectItem value="1-3">1-3 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="5+">5+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coverLetter">Cover Letter</Label>
                  <Textarea
                    id="coverLetter"
                    value={applicationForm.coverLetter}
                    onChange={(e) => setApplicationForm(prev => ({ ...prev, coverLetter: e.target.value }))}
                    placeholder="Tell us why you're interested in this position..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="portfolio">Portfolio/LinkedIn URL</Label>
                  <Input
                    id="portfolio"
                    value={applicationForm.portfolio}
                    onChange={(e) => setApplicationForm(prev => ({ ...prev, portfolio: e.target.value }))}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setSelectedJob(null)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isApplying}
                    className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                  >
                    {isApplying ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Join Our Team?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Don't see a perfect match? We're always looking for talented individuals who share our vision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-3 rounded-xl font-semibold border-2 hover:bg-primary/5 hover:text-primary transition-all duration-300"
                onClick={() => window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=careers@bookmylook.com&su=${encodeURIComponent('Application for Position at BookMyLook')}&body=${encodeURIComponent(`Dear BookMyLook Hiring Team,

I am writing to express my interest in joining the BookMyLook team.

Position Applied For: [Please specify the position you're interested in]

About Me:
- Full Name: [Your Full Name]
- Current Location: [Your City, Country]
- Phone Number: [Your Phone Number]
- LinkedIn Profile: [Your LinkedIn URL]
- Portfolio/GitHub: [Your portfolio or GitHub URL]

Professional Experience:
[Briefly describe your relevant experience and skills]

Why BookMyLook:
[Explain why you're interested in BookMyLook and how you can contribute]

Availability:
[When can you start?]

Please find my resume attached to this email.

I look forward to the opportunity to discuss how my skills and experience align with BookMyLook's vision.

Best regards,
[Your Full Name]
[Your Phone Number]
[Your Email Address]`)}`, '_blank')}
              >
                Send Us Your Resume
                <Send className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
