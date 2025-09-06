import { motion } from "framer-motion";
import { useI18n } from "@/i18n";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Clock, Users, DollarSign, Star, TrendingUp, Calendar, Phone, Mail, MapPin, Plus } from "lucide-react";

interface QueueItem {
  customer_id: number;
  customer_name: string;
  service_name: string;
  queue_position: number;
  estimated_wait: number;
  appointment_time: string;
  phone: string;
}

interface Service {
  service_id: number;
  service_name: string;
  description: string;
  duration_minutes: number;
  price: number;
  is_active: boolean;
}

interface Staff {
  barber_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  is_available: boolean;
}

export default function OwnerDashboard() {
  const { t } = useI18n();
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCustomers: 0,
    todayRevenue: 0,
    averageRating: 0,
    activeServices: 0
  });

  useEffect(() => {
    // Simulate loading salon data
    setTimeout(() => {
      setQueue([
        {
          customer_id: 1,
          customer_name: "John Doe",
          service_name: "Men's Haircut",
          queue_position: 1,
          estimated_wait: 0,
          appointment_time: "14:30",
          phone: "+91 98765 43210"
        },
        {
          customer_id: 2,
          customer_name: "Jane Smith",
          service_name: "Beard Trim",
          queue_position: 2,
          estimated_wait: 30,
          appointment_time: "15:00",
          phone: "+91 98765 43211"
        }
      ]);

      setServices([
        {
          service_id: 1,
          service_name: "Men's Haircut",
          description: "A standard haircut and style",
          duration_minutes: 30,
          price: 25,
          is_active: true
        },
        {
          service_id: 2,
          service_name: "Beard Trim",
          description: "Professional beard trimming and styling",
          duration_minutes: 20,
          price: 15,
          is_active: true
        }
      ]);

      setStaff([
        {
          barber_id: 1,
          first_name: "Jane",
          last_name: "Smith",
          email: "jane.smith@example.com",
          phone_number: "555-123-4567",
          is_available: true
        }
      ]);

      setStats({
        totalCustomers: 156,
        todayRevenue: 450,
        averageRating: 4.8,
        activeServices: 2
      });

      setLoading(false);
    }, 1000);
  }, []);

  const handleNextCustomer = (customerId: number) => {
    // Move customer to next position or mark as completed
    setQueue(prev => prev.filter(item => item.customer_id !== customerId));
  };

  const handleAddToQueue = () => {
    // Open modal to add new customer to queue
    console.log('Add new customer to queue');
  };

  if (loading) {
    return (
      <div className="container py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your salon dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Salon Owner Dashboard</h1>
        <p className="text-muted-foreground">Manage your salon operations and customer queue</p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                  <p className="text-2xl font-bold">{stats.totalCustomers}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Today's Revenue</p>
                  <p className="text-2xl font-bold">₹{stats.todayRevenue}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                  <p className="text-2xl font-bold">{stats.averageRating}</p>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Services</p>
                  <p className="text-2xl font-bold">{stats.activeServices}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="queue" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="queue">Current Queue</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="queue" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Current Queue</h2>
            <Button onClick={handleAddToQueue}>
              <Plus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </div>

          <div className="grid gap-4">
            {queue.map((item, index) => (
              <motion.div
                key={item.customer_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-full font-bold text-lg">
                          {item.queue_position}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{item.customer_name}</h3>
                          <p className="text-sm text-muted-foreground">{item.service_name}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {item.appointment_time}
                            </span>
                            <span className="text-sm flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {item.phone}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {item.estimated_wait > 0 && (
                          <Badge variant="secondary">
                            Wait: {item.estimated_wait} min
                          </Badge>
                        )}
                        <Button 
                          size="sm" 
                          onClick={() => handleNextCustomer(item.customer_id)}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {queue.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No customers in queue</h3>
                  <p className="text-muted-foreground">
                    Add customers to start managing your queue.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Services Management</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </div>

          <div className="grid gap-4">
            {services.map((service, index) => (
              <motion.div
                key={service.service_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{service.service_name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span>Duration: {service.duration_minutes} min</span>
                          <span>Price: ₹{service.price}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={service.is_active ? "default" : "secondary"}>
                          {service.is_active ? "Active" : "Inactive"}
                        </Badge>
                        <Button size="sm" variant="outline">Edit</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="staff" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Staff Management</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Staff
            </Button>
          </div>

          <div className="grid gap-4">
            {staff.map((member, index) => (
              <motion.div
                key={member.barber_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {member.first_name} {member.last_name}
                        </h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {member.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {member.phone_number}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={member.is_available ? "default" : "secondary"}>
                          {member.is_available ? "Available" : "Busy"}
                        </Badge>
                        <Button size="sm" variant="outline">Edit</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <h2 className="text-2xl font-bold">Analytics & Reports</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Daily Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Customer Satisfaction</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Queue Efficiency</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Service Completion</span>
                      <span>98%</span>
                    </div>
                    <Progress value={98} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>John Doe completed Men's Haircut</span>
                    <span className="text-muted-foreground ml-auto">2 min ago</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Jane Smith joined queue</span>
                    <span className="text-muted-foreground ml-auto">5 min ago</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>New review received (5 stars)</span>
                    <span className="text-muted-foreground ml-auto">1 hour ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
