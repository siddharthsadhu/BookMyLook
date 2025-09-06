import { motion } from "framer-motion";
import { useI18n } from "@/i18n";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Target, Zap, Shield, Heart } from "lucide-react";

export default function About() {
  const { t } = useI18n();

  const features = [
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Real-Time Queue Management",
      description: "Get accurate wait times and queue positions in real-time, so you know exactly when your turn is coming."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Multi-User Support",
      description: "Supporting customers, salon owners, barbers, and administrators with dedicated dashboards for each role."
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Smart Scheduling",
      description: "Intelligent appointment scheduling that considers service duration, current queue, and staff availability."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Instant Notifications",
      description: "Receive instant updates about your queue position, estimated wait time, and when it's your turn."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure & Reliable",
      description: "Your data is protected with enterprise-grade security and our system is built for reliability and uptime."
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Customer-First Design",
      description: "Every feature is designed with the customer experience in mind, making salon visits seamless and enjoyable."
    }
  ];

  const stats = [
    { number: "500+", label: "Partner Salons" },
    { number: "10K+", label: "Happy Customers" },
    { number: "50K+", label: "Appointments Booked" },
    { number: "99.9%", label: "Uptime" }
  ];

  const team = [
    {
      name: "Alex Johnson",
      role: "CEO & Founder",
      description: "Passionate about revolutionizing the salon industry with technology.",
      image: "👨‍💼"
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      description: "Full-stack developer with expertise in real-time systems and user experience.",
      image: "👩‍💻"
    },
    {
      name: "Mike Rodriguez",
      role: "Head of Operations",
      description: "Operations expert ensuring smooth salon partnerships and customer satisfaction.",
      image: "👨‍💼"
    },
    {
      name: "Emily Davis",
      role: "UX Designer",
      description: "Creating beautiful and intuitive experiences for all our users.",
      image: "👩‍🎨"
    }
  ];

  return (
    <div className="container py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About <span className="text-primary">Book My Look</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            We're revolutionizing the salon experience by eliminating wait times and bringing transparency to queue management. 
            Our platform connects customers with their favorite salons while providing real-time insights and seamless booking experiences.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              🚀 Founded in 2025
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              🏢 Based in India
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              💡 Innovation First
            </Badge>
          </div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
      >
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
              {stat.number}
            </div>
            <div className="text-sm text-muted-foreground">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Mission Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-16"
      >
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-center text-muted-foreground max-w-4xl mx-auto">
              To transform the traditional salon experience by providing real-time queue management, 
              transparent wait times, and seamless booking systems. We believe that every customer 
              deserves to know exactly when their service will begin, and every salon owner deserves 
              tools to manage their business efficiently.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mb-16"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Book My Look?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We've built a comprehensive platform that addresses every aspect of the salon experience.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="text-primary mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Team Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="mb-16"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The passionate people behind Book My Look, working to make your salon experience better.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
            >
              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="text-6xl mb-4">{member.image}</div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="font-medium text-primary">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Values Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Our Values</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="font-semibold mb-2">Transparency</h3>
                <p className="text-sm text-muted-foreground">
                  We believe in complete transparency in wait times, pricing, and service quality.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="font-semibold mb-2">Efficiency</h3>
                <p className="text-sm text-muted-foreground">
                  Every feature is designed to save time and make processes more efficient.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="font-semibold mb-2">Partnership</h3>
                <p className="text-sm text-muted-foreground">
                  We work closely with salon partners to ensure mutual success and growth.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
