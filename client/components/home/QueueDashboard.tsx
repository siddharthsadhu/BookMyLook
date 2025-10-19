import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useI18n } from "@/i18n";
import { useNavigate } from "react-router-dom";
import { useQueue } from "@/contexts/QueueContext";

// Utility functions for queue status
const getQueueStatusColor = (status: string) => {
  switch (status) {
    case 'WAITING': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'CALLED': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'IN_SERVICE': return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'COMPLETED': return 'bg-green-100 text-green-800 border-green-200';
    case 'NO_SHOW': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
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

const formatEstimatedTime = (estimatedTime: string) => {
  // The estimatedTime is already a formatted time string like "2:30 PM"
  // Just return it as-is for display
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
      stats: salon1Stats
    },
    {
      id: salon2Id,
      name: 'Style Studio',
      entries: salon2Entries,
      stats: salon2Stats
    }
  ];

  const isLoading = false; // We have demo data loaded immediately

  if (isLoading) {
    return (
      <section className="container py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading queue data...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container py-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Live Queue Status</h2>
        <p className="text-muted-foreground">Real-time updates from our partner salons</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Queue Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border p-6 bg-background/80"
        >
          <h3 className="text-xl font-bold mb-4">Current Queue</h3>
          <div className="space-y-3">
            {allSalons.length > 0 ? (
              allSalons.map((salon) => (
                <div key={salon.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">{salon.name}</h4>
                    <span className="text-sm text-muted-foreground">
                      {salon.stats?.totalWaiting || 0} waiting
                    </span>
                  </div>
                  <div className="space-y-2">
                    {salon.entries.slice(0, 3).map((entry, index) => (
                      <div key={entry.id} className="flex items-center justify-between p-2 rounded bg-muted/50">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                            {entry.position}
                          </div>
                          <div>
                            <div className="text-sm font-medium">{entry.customerName}</div>
                            <div className="text-xs text-muted-foreground">{entry.serviceName}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-xs px-2 py-1 rounded-full ${getQueueStatusColor(entry.status)}`}>
                            {getQueueStatusText(entry.status)}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {entry.estimatedTime}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <div className="text-4xl mb-2">🎉</div>
                <p>No one in queue right now!</p>
                <p className="text-sm">Perfect time to book your appointment.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border p-6 bg-background/80"
        >
          <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
          <div className="space-y-4">
            <button
              onClick={() => navigate('/estimate')}
              className="w-full p-4 rounded-lg border-2 border-dashed border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-all duration-300 group"
            >
              <div className="text-2xl mb-2">⏱️</div>
              <div className="font-medium">Estimate Wait Time</div>
              <div className="text-sm text-muted-foreground">Get accurate wait time estimates</div>
            </button>

            <button
              onClick={() => navigate('/booking')}
              className="w-full p-4 rounded-lg border-2 border-dashed border-accent/30 hover:border-accent/60 hover:bg-accent/5 transition-all duration-300 group"
            >
              <div className="text-2xl mb-2">📅</div>
              <div className="font-medium">Book Appointment</div>
              <div className="text-sm text-muted-foreground">Schedule your next visit</div>
            </button>

            <button
              onClick={() => navigate('/services')}
              className="w-full p-4 rounded-lg border-2 border-dashed border-green-500/30 hover:border-green-500/60 hover:bg-green-500/5 transition-all duration-300 group"
            >
              <div className="text-2xl mb-2">🏪</div>
              <div className="font-medium">Find Salons</div>
              <div className="text-sm text-muted-foreground">Discover partner salons nearby</div>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="text-center p-4 rounded-lg bg-background/80 border">
          <div className="text-2xl font-bold text-primary">
            {allSalons.reduce((sum, salon) => sum + (salon.stats?.totalWaiting || 0), 0)}
          </div>
          <div className="text-sm text-muted-foreground">In Queue</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-background/80 border">
          <div className="text-2xl font-bold text-accent">{allSalons.length}</div>
          <div className="text-sm text-muted-foreground">Active Salons</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-background/80 border">
          <div className="text-2xl font-bold text-green-600">
            {allSalons.length > 0
              ? Math.round(allSalons.reduce((sum, salon) => sum + (salon.stats?.averageWaitTime || 0), 0) / allSalons.length)
              : 0}
          </div>
          <div className="text-sm text-muted-foreground">Avg. Wait (min)</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-background/80 border">
          <div className="text-2xl font-bold text-orange-600">98%</div>
          <div className="text-sm text-muted-foreground">Satisfaction</div>
        </div>
      </motion.div>
    </section>
  );
}
