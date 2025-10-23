import { motion } from "framer-motion";
import { useI18n } from "@/i18n";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Target, Zap, Shield, Heart, Star, Award, Sparkles } from "lucide-react";

export default function About() {
  const { t } = useI18n();

  const features = [
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Real-Time Queue Management",
      description: "Get accurate wait times and queue positions in real-time, so you know exactly when your turn is coming.",
      gradient: "from-blue-500 to-indigo-600",
      emoji: "⏱️"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Multi-User Support",
      description: "Supporting customers, salon owners, barbers, and administrators with dedicated dashboards for each role.",
      gradient: "from-emerald-500 to-teal-600",
      emoji: "👥"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Smart Scheduling",
      description: "Intelligent appointment scheduling that considers service duration, current queue, and staff availability.",
      gradient: "from-purple-500 to-pink-600",
      emoji: "🎯"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Notifications",
      description: "Receive instant updates about your queue position, estimated wait time, and when it's your turn.",
      gradient: "from-orange-500 to-red-600",
      emoji: "⚡"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure & Reliable",
      description: "Your data is protected with enterprise-grade security and our system is built for reliability and uptime.",
      gradient: "from-green-500 to-emerald-600",
      emoji: "🔒"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Customer-First Design",
      description: "Every feature is designed with the customer experience in mind, making salon visits seamless and enjoyable.",
      gradient: "from-pink-500 to-rose-600",
      emoji: "💝"
    }
  ];

  const stats = [
    { number: "500+", label: "Partner Salons", icon: "🏪", color: "from-blue-500 to-indigo-600" },
    { number: "10K+", label: "Happy Customers", icon: "😊", color: "from-emerald-500 to-teal-600" },
    { number: "50K+", label: "Appointments Booked", icon: "📅", color: "from-purple-500 to-pink-600" },
    { number: "99.9%", label: "Uptime", icon: "⚡", color: "from-orange-500 to-red-600" }
  ];

  const team = [
    {
      name: "Sadhu Siddharth",
      role: "CEO & Founder",
      description: "Passionate about revolutionizing the salon industry with technology.",
      image: "👨‍💼",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      name: "Shah Nirmam",
      role: "CTO",
      description: "Full-stack developer with expertise in real-time systems and user experience.",
      image: "👩‍💻",
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      name: "Harshil Siddhapura",
      role: "Head of Operations",
      description: "Operations expert ensuring smooth salon partnerships and customer satisfaction.",
      image: "👨‍💼",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      name: "Dhruvil Jadavs",
      role: "UX Designer",
      description: "Creating beautiful and intuitive experiences for all our users.",
      image: "👩‍🎨",
      gradient: "from-pink-500 to-rose-600"
    }
  ];

  const values = [
    {
      icon: "🎯",
      title: "Transparency",
      description: "We believe in complete transparency in wait times, pricing, and service quality.",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: "⚡",
      title: "Efficiency",
      description: "Every feature is designed to save time and make processes more efficient.",
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      icon: "🤝",
      title: "Partnership",
      description: "We work closely with salon partners to ensure mutual success and growth.",
      gradient: "from-purple-500 to-pink-600"
    }
  ];

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
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 rounded-full text-sm font-semibold border border-emerald-200 mb-8"
          >
            <Sparkles className="h-4 w-4" />
            About BookMyLook
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent leading-tight mb-6"
          >
            Revolutionizing the
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">Salon Experience</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-12"
          >
            We're revolutionizing the salon experience by eliminating wait times and bringing transparency to queue management.
            Our platform connects customers with their favorite salons while providing real-time insights and seamless booking experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Badge className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-sm font-semibold cursor-pointer">
                🚀 Founded in 2025
              </Badge>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Badge className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-sm font-semibold cursor-pointer">
                🏢 Based in India
              </Badge>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Badge className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-sm font-semibold cursor-pointer">
                💡 Innovation First
              </Badge>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="container px-4 mb-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center"
              >
                <Card className="shadow-xl border-0 bg-gradient-to-br from-white via-slate-50/30 to-white backdrop-blur-sm hover:shadow-2xl transition-all duration-500 ring-1 ring-slate-200/50 hover:ring-slate-300/70">
                  <CardContent className="p-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg mx-auto mb-4`}
                    >
                      <span className="text-xl">{stat.icon}</span>
                    </motion.div>
                    <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                      {stat.number}
                    </div>
                    <div className="text-sm font-medium text-slate-600">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="container px-4 mb-20"
        >
          <Card className="shadow-2xl border-0 bg-gradient-to-br from-white via-slate-50/30 to-white backdrop-blur-xl ring-1 ring-slate-200/50">
            <CardHeader className="text-center bg-gradient-to-r from-emerald-50/50 via-teal-50/50 to-cyan-50/50 border-b border-slate-100/60">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl mx-auto mb-4"
              >
                <Target className="h-8 w-8 text-white" />
              </motion.div>
              <CardTitle className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="p-8 md:p-12">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-lg md:text-xl text-center text-slate-600 max-w-4xl mx-auto leading-relaxed"
              >
                To transform the traditional salon experience by providing real-time queue management,
                transparent wait times, and seamless booking systems. We believe that every customer
                deserves to know exactly when their service will begin, and every salon owner deserves
                tools to manage their business efficiently.
              </motion.p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="container px-4 mb-20"
        >
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="text-2xl md:text-3xl font-bold text-slate-800 mb-4"
            >
              Why Choose BookMyLook?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="text-lg text-slate-600 max-w-2xl mx-auto"
            >
              We've built a comprehensive platform that addresses every aspect of the salon experience.
            </motion.p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Card className="shadow-xl border-0 bg-gradient-to-br from-white via-slate-50/30 to-white backdrop-blur-sm hover:shadow-2xl transition-all duration-500 overflow-hidden ring-1 ring-slate-200/50 hover:ring-slate-300/70 h-full">
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <CardHeader className="relative text-center pb-4 bg-gradient-to-r from-blue-50/50 via-indigo-50/50 to-purple-50/50 border-b border-slate-100/60">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-xl mx-auto mb-4`}
                    >
                      <div className="text-white">
                        {feature.icon}
                      </div>
                    </motion.div>
                    <CardTitle className="text-lg md:text-xl font-bold text-slate-800 mb-2 flex items-center justify-center gap-2">
                      <span className="text-lg">{feature.emoji}</span>
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 flex-1">
                    <CardDescription className="text-slate-600 leading-relaxed text-center">
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
          transition={{ delay: 1.3 }}
          className="container px-4 mb-20"
        >
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="text-2xl md:text-3xl font-bold text-slate-800 mb-4"
            >
              Meet Our Team
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="text-lg text-slate-600 max-w-2xl mx-auto"
            >
              The passionate people behind BookMyLook, working to make your salon experience better.
            </motion.p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Card className="shadow-xl border-0 bg-gradient-to-br from-white via-slate-50/30 to-white backdrop-blur-sm hover:shadow-2xl transition-all duration-500 overflow-hidden ring-1 ring-slate-200/50 hover:ring-slate-300/70 text-center h-full">
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <CardHeader className="relative pb-4 bg-gradient-to-r from-blue-50/50 via-indigo-50/50 to-purple-50/50 border-b border-slate-100/60">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-16 h-16 bg-gradient-to-br ${member.gradient} rounded-2xl flex items-center justify-center shadow-xl mx-auto mb-4 text-2xl`}
                    >
                      {member.image}
                    </motion.div>
                    <CardTitle className="text-lg font-bold text-slate-800 mb-1">
                      {member.name}
                    </CardTitle>
                    <Badge className={`bg-gradient-to-r ${member.gradient} hover:opacity-90 text-white border-0 shadow-sm text-xs font-semibold px-3 py-1 justify-center`}>
                      {member.role}
                    </Badge>
                  </CardHeader>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <p className="text-sm text-slate-600 leading-relaxed flex-1">
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
          transition={{ delay: 1.7 }}
          className="container px-4 mb-20"
        >
          <Card className="shadow-2xl border-0 bg-gradient-to-br from-white via-slate-50/30 to-white backdrop-blur-xl ring-1 ring-slate-200/50">
            <CardHeader className="text-center bg-gradient-to-r from-orange-50/50 via-red-50/50 to-pink-50/50 border-b border-slate-100/60">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-xl mx-auto mb-4"
              >
                <Award className="h-8 w-8 text-white" />
              </motion.div>
              <CardTitle className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Our Values</CardTitle>
            </CardHeader>
            <CardContent className="p-8 md:p-12">
              <div className="grid gap-8 md:grid-cols-3">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="text-center group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-14 h-14 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center shadow-xl mx-auto mb-4 text-2xl`}
                    >
                      {value.icon}
                    </motion.div>
                    <h3 className="font-bold text-lg text-slate-800 mb-3 group-hover:text-slate-900 transition-colors duration-200">
                      {value.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-200">
                      {value.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.9, type: "spring" }}
        className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full shadow-xl"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.1, type: "spring" }}
        className="absolute -bottom-6 -left-6 w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full shadow-xl"
      ></motion.div>
    </div>
  );
}
