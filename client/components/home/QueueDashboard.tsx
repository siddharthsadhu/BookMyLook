import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useI18n } from "@/i18n";

interface QueueData {
  queue_id: number;
  customer_id: number;
  shop_id: number;
  service_id: number;
  queue_position: number;
  status: string;
  estimated_wait_time: number;
  queue_time: string;
  first_name: string;
  last_name: string;
  service_name: string;
}

export default function QueueDashboard() {
  const { t } = useI18n();
  const [queueData, setQueueData] = useState<QueueData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQueueData();
    // Refresh every 30 seconds
    const interval = setInterval(fetchQueueData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchQueueData = async () => {
    try {
      // For demo purposes, we'll use shop_id = 1
      const response = await fetch('/api/queue?shop_id=1');
      const data = await response.json();
      if (data.success) {
        setQueueData(data.data);
      }
    } catch (error) {
      console.error('Error fetching queue data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'waiting': return 'Waiting';
      case 'in_progress': return 'In Progress';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  if (loading) {
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
            {queueData.length > 0 ? (
              queueData.slice(0, 5).map((item, index) => (
                <div key={item.queue_id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      {item.queue_position}
                    </div>
                    <div>
                      <div className="font-medium">{item.first_name} {item.last_name}</div>
                      <div className="text-sm text-muted-foreground">{item.service_name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xs px-2 py-1 rounded-full ${getStatusColor(item.status)}`}>
                      {getStatusText(item.status)}
                    </div>
                    {item.estimated_wait_time > 0 && (
                      <div className="text-xs text-muted-foreground mt-1">
                        ~{item.estimated_wait_time} min
                      </div>
                    )}
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
          
          {queueData.length > 5 && (
            <div className="mt-4 text-center">
              <button className="text-sm text-primary hover:underline">
                View all {queueData.length} customers
              </button>
            </div>
          )}
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
              onClick={() => window.open('/queue_estimator.php', '_blank')}
              className="w-full p-4 rounded-lg border-2 border-dashed border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-all duration-300 group"
            >
              <div className="text-2xl mb-2">⏱️</div>
              <div className="font-medium">Estimate Wait Time</div>
              <div className="text-sm text-muted-foreground">Get accurate wait time estimates</div>
            </button>
            
            <button className="w-full p-4 rounded-lg border-2 border-dashed border-accent/30 hover:border-accent/60 hover:bg-accent/5 transition-all duration-300 group">
              <div className="text-2xl mb-2">📅</div>
              <div className="font-medium">Book Appointment</div>
              <div className="text-sm text-muted-foreground">Schedule your next visit</div>
            </button>
            
            <button className="w-full p-4 rounded-lg border-2 border-dashed border-green-500/30 hover:border-green-500/60 hover:bg-green-500/5 transition-all duration-300 group">
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
          <div className="text-2xl font-bold text-primary">{queueData.length}</div>
          <div className="text-sm text-muted-foreground">In Queue</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-background/80 border">
          <div className="text-2xl font-bold text-accent">3</div>
          <div className="text-sm text-muted-foreground">Active Salons</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-background/80 border">
          <div className="text-2xl font-bold text-green-600">12</div>
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
