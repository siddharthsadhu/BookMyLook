import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useI18n } from "@/i18n";
import { useNavigate } from "react-router-dom";
import { useQueue } from "@/contexts/QueueContext";
import {
  Users,
  Clock,
  TrendingUp,
  Zap,
  Eye,
  Calendar,
  MapPin,
  Star,
  ChevronRight,
  Wifi,
  WifiOff,
  Activity,
  Timer,
  UserCheck,
  AlertCircle,
  CheckCircle2,
  Sparkles
} from "lucide-react";

// Utility functions for queue status
const getQueueStatusColor = (status: string) => {
  switch (status) {
    case 'WAITING': return 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-yellow-300';
    case 'CALLED': return 'bg-gradient-to-r from-blue-400 to-blue-500 text-white border-blue-300';
    case 'IN_SERVICE': return 'bg-gradient-to-r from-purple-400 to-purple-500 text-white border-purple-300';
    case 'COMPLETED': return 'bg-gradient-to-r from-green-400 to-green-500 text-white border-green-300';
    case 'NO_SHOW': return 'bg-gradient-to-r from-red-400 to-red-500 text-white border-red-300';
    default: return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white border-gray-300';
  }
};

const getQueueStatusText = (status: string) => {
  switch (status) {
    case 'WAITING': return 'Waiting';
    case 'CALLED': return 'Called';
    case 'IN_SERVICE': return 'In Service';
    case 'COMPLETED': return 'Completed';
    case 'NO_SHOW': return 'No Show';
    default: return status;
  }
};

const getQueueStatusIcon = (status: string) => {
  switch (status) {
    case 'WAITING': return <Clock className="h-3 w-3" />;
    case 'CALLED': return <UserCheck className="h-3 w-3" />;
    case 'IN_SERVICE': return <Activity className="h-3 w-3" />;
    case 'COMPLETED': return <CheckCircle2 className="h-3 w-3" />;
    case 'NO_SHOW': return <AlertCircle className="h-3 w-3" />;
    default: return <Clock className="h-3 w-3" />;
  }
};

const formatEstimatedTime = (estimatedTime: string) => {
  return estimatedTime;
};

export default function QueueDashboard() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { getQueueForSalon, getQueueStats } = useQueue();

  // Get queue data for both salons
  const salon1Id = 'salon_gentleman_zone';
  const salon2Id = 'salon_style_studio';

  const salon1Entries = getQueueForSalon(salon1Id);
  const salon2Entries = getQueueForSalon(salon2Id);
  const salon1Stats = getQueueStats(salon1Id);
  const salon2Stats = getQueueStats(salon2Id);

  // Combine all salons for display
  const allSalons = [
    {
      id: salon1Id,
      name: "The Gentlemen's Zone",
      entries: salon1Entries,
      stats: salon1Stats,
      rating: 4.8,
      location: "Connaught Place"
    },
    {
      id: salon2Id,
      name: 'Style Studio',
      entries: salon2Entries,
      stats: salon2Stats,
      rating: 4.6,
      location: "Sector 18"
    }
  ];

  const totalInQueue = allSalons.reduce((sum, salon) => sum + (salon.stats?.totalWaiting || 0), 0);
  const averageWaitTime = allSalons.length > 0
    ? Math.round(allSalons.reduce((sum, salon) => sum + (salon.stats?.averageWaitTime || 0), 0) / allSalons.length)
    : 0;

  const isLoading = false; // We have demo data loaded immediately

  if (isLoading) {
    return (
      <section className="relative py-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container relative">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full mx-auto mb-6"
            ></motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            >
              Loading Live Queue Data...
            </motion.p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container relative">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium mb-6">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <Wifi className="h-3 w-3" />
            Live Updates
          </div>

          <motion.h2
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"
          >
            Live Queue Status
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Real-time queue monitoring with instant updates from our premium salon partners
          </motion.p>

          {/* Live Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-8 mt-8"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-sm rounded-2xl border shadow-lg">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-bold text-lg text-primary">{totalInQueue}</span>
              <span className="text-sm text-muted-foreground">in queue</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-sm rounded-2xl border shadow-lg">
              <Clock className="h-5 w-5 text-accent" />
              <span className="font-bold text-lg text-accent">{averageWaitTime}</span>
              <span className="text-sm text-muted-foreground">min avg wait</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-sm rounded-2xl border shadow-lg">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="font-bold text-lg text-yellow-600">98%</span>
              <span className="text-sm text-muted-foreground">satisfaction</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid gap-8 xl:grid-cols-3">
          {/* Queue Overview - Takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="xl:col-span-2 space-y-6"
          >
            <div className="relative">
              {/* Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-accent/5 rounded-3xl"></div>

              <div className="relative bg-background/80 backdrop-blur-sm rounded-3xl border shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="p-8 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">Current Queue</h3>
                        <p className="text-muted-foreground">Live status from all salons</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                      <Activity className="h-3 w-3" />
                      Live
                    </div>
                  </div>
                </div>

                {/* Queue Content */}
                <div className="p-8">
                  {allSalons.length > 0 ? (
                    <div className="space-y-8">
                      {allSalons.map((salon, salonIndex) => (
                        <motion.div
                          key={salon.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: salonIndex * 0.1 }}
                          className="relative"
                        >
                          {/* Salon Card Background */}
                          <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-white/30 rounded-2xl"></div>
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl"></div>

                          <div className="relative border rounded-2xl p-6 shadow-lg bg-background/80 backdrop-blur-sm">
                            {/* Salon Header */}
                            <div className="flex items-center justify-between mb-6">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
                                  <MapPin className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                  <h4 className="text-xl font-bold">{salon.name}</h4>
                                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                      <MapPin className="h-3 w-3" />
                                      {salon.location}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                      {salon.rating}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-primary">{salon.stats?.totalWaiting || 0}</div>
                                <div className="text-sm text-muted-foreground">waiting</div>
                              </div>
                            </div>

                            {/* Queue Entries */}
                            <div className="space-y-3">
                              {salon.entries.slice(0, 4).map((entry, index) => (
                                <motion.div
                                  key={entry.id}
                                  initial={{ opacity: 0, x: -20 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: (salonIndex * 0.1) + (index * 0.05) }}
                                  className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border hover:shadow-md transition-all duration-300"
                                >
                                  <div className="flex items-center gap-4">
                                    {/* Position Badge */}
                                    <div className="relative">
                                      <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                                        {entry.position}
                                      </div>
                                      {entry.position === 1 && (
                                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                                          <Sparkles className="h-2 w-2 text-white" />
                                        </div>
                                      )}
                                    </div>

                                    {/* Customer Info */}
                                    <div>
                                      <div className="font-semibold text-lg">{entry.customerName}</div>
                                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                                        <Timer className="h-3 w-3" />
                                        {entry.serviceName}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="text-right space-y-2">
                                    {/* Status Badge */}
                                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getQueueStatusColor(entry.status)} shadow-sm`}>
                                      {getQueueStatusIcon(entry.status)}
                                      {getQueueStatusText(entry.status)}
                                    </div>
                                    {/* Estimated Time */}
                                    <div className="text-xs text-muted-foreground flex items-center justify-end gap-1">
                                      <Clock className="h-3 w-3" />
                                      {entry.estimatedTime}
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>

                            {/* View More Button */}
                            {salon.entries.length > 4 && (
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full mt-4 p-3 rounded-xl border-2 border-dashed border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-all duration-300 flex items-center justify-center gap-2 text-primary font-medium"
                              >
                                View All Queue
                                <ChevronRight className="h-4 w-4" />
                              </motion.button>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className="text-center py-16"
                    >
                      <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                        <CheckCircle2 className="h-12 w-12 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                        All Clear!
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        No customers waiting right now. Perfect time to book your appointment!
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/booking')}
                        className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Book Now
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Quick Actions Card */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-secondary/10 rounded-3xl"></div>
              <div className="relative bg-background/80 backdrop-blur-sm rounded-3xl border shadow-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-accent to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Quick Actions</h3>
                    <p className="text-muted-foreground">Everything you need</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      icon: <Timer className="h-6 w-6" />,
                      title: "Estimate Wait Time",
                      description: "Get accurate wait time estimates",
                      gradient: "from-blue-500 to-cyan-500",
                      bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
                      action: () => navigate('/estimate')
                    },
                    {
                      icon: <Calendar className="h-6 w-6" />,
                      title: "Book Appointment",
                      description: "Schedule your next visit",
                      gradient: "from-primary to-accent",
                      bgGradient: "from-primary/5 to-accent/5",
                      action: () => navigate('/booking')
                    },
                    {
                      icon: <MapPin className="h-6 w-6" />,
                      title: "Find Salons",
                      description: "Discover partner salons nearby",
                      gradient: "from-green-500 to-emerald-500",
                      bgGradient: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
                      action: () => navigate('/services')
                    }
                  ].map((action, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + (index * 0.1) }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={action.action}
                      className={`w-full p-6 rounded-2xl border-2 border-dashed border-transparent hover:border-current transition-all duration-300 group text-left ${action.bgGradient}`}
                    >
                      <div className={`w-12 h-12 bg-gradient-to-r ${action.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                        <div className="text-white">
                          {action.icon}
                        </div>
                      </div>
                      <div className="font-bold text-lg mb-1">{action.title}</div>
                      <div className="text-sm text-muted-foreground">{action.description}</div>
                      <div className="flex items-center justify-end mt-4">
                        <ChevronRight className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${action.gradient.split(' ')[1].replace('to-', 'text-')}`} />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Real-time Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple/10 to-pink/10 rounded-3xl"></div>
              <div className="relative bg-background/80 backdrop-blur-sm rounded-3xl border shadow-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Live Stats</h3>
                    <p className="text-muted-foreground">Real-time insights</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    { label: "Active Salons", value: allSalons.length, color: "text-primary", bg: "bg-primary/10" },
                    { label: "Total Served Today", value: 127, color: "text-green-600", bg: "bg-green-100 dark:bg-green-900/30" },
                    { label: "Avg Service Time", value: "45min", color: "text-accent", bg: "bg-accent/10" },
                    { label: "Peak Hours", value: "2-6 PM", color: "text-orange-600", bg: "bg-orange-100 dark:bg-orange-900/30" }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7 + (index * 0.1) }}
                      className="flex items-center justify-between p-4 rounded-xl bg-background/50 border"
                    >
                      <span className="text-sm text-muted-foreground">{stat.label}</span>
                      <span className={`font-bold text-lg px-3 py-1 rounded-lg ${stat.bg} ${stat.color}`}>
                        {stat.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            {
              icon: <Users className="h-8 w-8" />,
              value: totalInQueue,
              label: "In Queue",
              gradient: "from-primary to-accent",
              bg: "from-primary/5 to-accent/5"
            },
            {
              icon: <MapPin className="h-8 w-8" />,
              value: allSalons.length,
              label: "Active Salons",
              gradient: "from-accent to-secondary",
              bg: "from-accent/5 to-secondary/5"
            },
            {
              icon: <Clock className="h-8 w-8" />,
              value: `${averageWaitTime}min`,
              label: "Avg. Wait",
              gradient: "from-green-500 to-emerald-500",
              bg: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
            },
            {
              icon: <Star className="h-8 w-8" />,
              value: "98%",
              label: "Satisfaction",
              gradient: "from-yellow-400 to-orange-400",
              bg: "from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20"
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 + (index * 0.1) }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`relative p-6 rounded-2xl bg-gradient-to-br ${stat.bg} border shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group`}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${stat.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                <div className="text-white">
                  {stat.icon}
                </div>
              </div>
              <div className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}>
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
              {/* Animated border effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
