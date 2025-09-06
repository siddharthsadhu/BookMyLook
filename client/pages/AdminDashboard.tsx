import { motion } from "framer-motion";
import { useI18n } from "@/i18n";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Users, Building2, TrendingUp, DollarSign, Star, AlertTriangle, CheckCircle, Clock, Plus, Settings } from "lucide-react";

interface Salon {
  shop_id: number;
  shop_name: string;
  address: string;
  city: string;
  status: 'active' | 'pending' | 'suspended';
  total_customers: number;
  revenue: number;
  rating: number;
  created_at: string;
}

interface User {
  user_id: number;
  name: string;
  email: string;
  role: 'customer' | 'owner' | 'barber';
  status: 'active' | 'inactive' | 'suspended';
  created_at: string;
  last_login: string;
}

interface SystemAlert {
  id: number;
  type: 'warning' | 'error' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
}

export default function AdminDashboard() {
  const { t } = useI18n();
  const [salons, setSalons] = useState<Salon[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [systemStats, setSystemStats] = useState({
    totalUsers: 0,
    totalSalons: 0,
    totalRevenue: 0,
    systemUptime: 0
  });

  useEffect(() => {
    // Simulate loading admin data
    setTimeout(() => {
      setSalons([
        {
          shop_id: 1,
          shop_name: "The Gents Cut",
          address: "123 Main Street",
          city: "Anytown",
          status: 'active',
          total_customers: 156,
          revenue: 4500,
          rating: 4.8,
          created_at: "2024-01-01"
        },
        {
          shop_id: 2,
          shop_name: "Style Studio",
          address: "456 Oak Avenue",
          city: "Anytown",
          status: 'pending',
          total_customers: 89,
          revenue: 2300,
          rating: 4.5,
          created_at: "2024-01-15"
        }
      ]);

      setUsers([
        {
          user_id: 1,
          name: "John Doe",
          email: "john.doe@example.com",
          role: 'customer',
          status: 'active',
          created_at: "2024-01-01",
          last_login: "2024-01-20"
        },
        {
          user_id: 2,
          name: "Jane Smith",
          email: "jane.smith@example.com",
          role: 'barber',
          status: 'active',
          created_at: "2024-01-01",
          last_login: "2024-01-20"
        }
      ]);

      setAlerts([
        {
          id: 1,
          type: 'warning',
          title: 'High Queue Load',
          message: 'The Gents Cut has 15+ customers in queue',
          timestamp: '2024-01-20 14:30'
        },
        {
          id: 2,
          type: 'info',
          title: 'New Salon Registration',
          message: 'Style Studio is pending approval',
          timestamp: '2024-01-20 12:15'
        }
      ]);

      setSystemStats({
        totalUsers: 1250,
        totalSalons: 45,
        totalRevenue: 125000,
        systemUptime: 99.9
      });

      setLoading(false);
    }, 1000);
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Active</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'suspended':
        return <Badge variant="destructive">Suspended</Badge>;
      case 'inactive':
        return <Badge variant="outline">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Clock className="h-4 w-4 text-blue-500" />;
    }
  };

  if (loading) {
    return (
      <div className="container py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">System overview and management</p>
      </div>

      {/* System Stats */}
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
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{systemStats.totalUsers.toLocaleString()}</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Partner Salons</p>
                  <p className="text-2xl font-bold">{systemStats.totalSalons}</p>
                </div>
                <Building2 className="h-8 w-8 text-blue-600" />
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
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">₹{systemStats.totalRevenue.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
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
                  <p className="text-sm font-medium text-muted-foreground">System Uptime</p>
                  <p className="text-2xl font-bold">{systemStats.systemUptime}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="salons">Salons</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>API Response Time</span>
                      <span>120ms</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Database Performance</span>
                      <span>98%</span>
                    </div>
                    <Progress value={98} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Queue Processing</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
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
                    <span>New salon registration: Style Studio</span>
                    <span className="text-muted-foreground ml-auto">2 hours ago</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>System backup completed successfully</span>
                    <span className="text-muted-foreground ml-auto">4 hours ago</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>High traffic detected on API endpoints</span>
                    <span className="text-muted-foreground ml-auto">6 hours ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="salons" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Partner Salons</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Salon
            </Button>
          </div>

          <div className="grid gap-4">
            {salons.map((salon, index) => (
              <motion.div
                key={salon.shop_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{salon.shop_name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {salon.address}, {salon.city}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <span>Customers: {salon.total_customers}</span>
                          <span>Revenue: ₹{salon.revenue}</span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            {salon.rating}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusBadge(salon.status)}
                        <Button size="sm" variant="outline">Manage</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">User Management</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>

          <div className="grid gap-4">
            {users.map((user, index) => (
              <motion.div
                key={user.user_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{user.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{user.email}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span>Role: {user.role}</span>
                          <span>Last login: {user.last_login}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusBadge(user.status)}
                        <Button size="sm" variant="outline">Manage</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <h2 className="text-2xl font-bold">System Alerts</h2>

          <div className="grid gap-4">
            {alerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        {getAlertIcon(alert.type)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{alert.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                        <div className="text-xs text-muted-foreground">
                          {alert.timestamp}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Acknowledge</Button>
                        <Button size="sm" variant="destructive">Dismiss</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <h2 className="text-2xl font-bold">System Settings</h2>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Maintenance Mode</span>
                  <Button size="sm" variant="outline">Toggle</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Auto Backup</span>
                  <Button size="sm" variant="outline">Configure</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Email Notifications</span>
                  <Button size="sm" variant="outline">Settings</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Two-Factor Authentication</span>
                  <Button size="sm" variant="outline">Enable</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>API Rate Limiting</span>
                  <Button size="sm" variant="outline">Configure</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Audit Logs</span>
                  <Button size="sm" variant="outline">View</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
