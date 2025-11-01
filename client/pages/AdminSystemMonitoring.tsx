import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Server,
  Database,
  Wifi,
  Shield,
  Activity,
  Cpu,
  HardDrive,
  RefreshCw,
  AlertCircle,
  Zap,
} from "lucide-react";

// Mock system monitoring data
const systemHealth = {
  overall: "healthy",
  uptime: "99.9%",
  responseTime: 120, // ms
  activeUsers: 1247,
  totalRequests: 45632,
};

const serverMetrics = [
  { name: "API Server", status: "healthy", cpu: 45, memory: 67, uptime: "30d 12h" },
  { name: "Database", status: "healthy", cpu: 23, memory: 78, uptime: "45d 8h" },
  { name: "Cache Server", status: "warning", cpu: 89, memory: 92, uptime: "15d 6h" },
  { name: "File Server", status: "healthy", cpu: 12, memory: 34, uptime: "60d 2h" },
];

const errorLogs = [
  {
    id: 1,
    timestamp: "2024-01-22 14:30:25",
    level: "ERROR",
    message: "Database connection timeout",
    service: "API Server",
    resolved: false,
  },
  {
    id: 2,
    timestamp: "2024-01-22 13:15:10",
    level: "WARNING",
    message: "High memory usage detected",
    service: "Cache Server",
    resolved: true,
  },
  {
    id: 3,
    timestamp: "2024-01-22 11:45:33",
    level: "ERROR",
    message: "Payment gateway timeout",
    service: "Payment Service",
    resolved: true,
  },
];

const apiPerformance = [
  { endpoint: "/api/bookings", requests: 12543, avgResponse: 145, errorRate: 0.1 },
  { endpoint: "/api/users", requests: 8765, avgResponse: 98, errorRate: 0.05 },
  { endpoint: "/api/salons", requests: 5432, avgResponse: 234, errorRate: 0.2 },
  { endpoint: "/api/payments", requests: 3210, avgResponse: 567, errorRate: 0.8 },
];

const alerts = [
  {
    id: 1,
    type: "warning",
    title: "High Memory Usage",
    message: "Cache server memory usage is above 90%",
    timestamp: "2024-01-22 14:15:00",
    acknowledged: false,
  },
  {
    id: 2,
    type: "info",
    title: "Scheduled Maintenance",
    message: "Database maintenance scheduled for tonight 2:00 AM",
    timestamp: "2024-01-22 10:00:00",
    acknowledged: true,
  },
];

export default function AdminSystemMonitoring() {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState("overview");

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => setRefreshing(false), 2000);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      healthy: "default",
      warning: "secondary",
      error: "destructive",
    } as const;
    const icons = {
      healthy: CheckCircle,
      warning: AlertTriangle,
      error: XCircle,
    } as const;
    const Icon = icons[status as keyof typeof icons];
    return (
      <Badge variant={variants[status as keyof typeof variants] || "outline"} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getAlertIcon = (type: string) => {
    const icons = {
      warning: AlertTriangle,
      error: XCircle,
      info: AlertCircle,
    } as const;
    const Icon = icons[type as keyof typeof icons] || AlertCircle;
    return <Icon className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">System Monitoring</h1>
          <p className="text-muted-foreground">Monitor server health, performance, and system alerts</p>
        </div>
        <Button onClick={handleRefresh} disabled={refreshing}>
          <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Refreshing...' : 'Refresh Data'}
        </Button>
      </div>

      {/* System Health Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-lg font-bold capitalize">{systemHealth.overall}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemHealth.uptime}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemHealth.responseTime}ms</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemHealth.activeUsers.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Monitoring Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="servers">Servers</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Server Health</CardTitle>
                <CardDescription>Real-time status of all system components</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {serverMetrics.map((server, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(server.status)}
                        <span className="font-medium">{server.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{server.uptime}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>CPU</span>
                          <span>{server.cpu}%</span>
                        </div>
                        <Progress value={server.cpu} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Memory</span>
                          <span>{server.memory}%</span>
                        </div>
                        <Progress value={server.memory} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest system events and activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Database backup completed successfully</span>
                    <span className="text-muted-foreground ml-auto">2 min ago</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>New user registration peak detected</span>
                    <span className="text-muted-foreground ml-auto">15 min ago</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>Cache server memory usage warning</span>
                    <span className="text-muted-foreground ml-auto">1 hour ago</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Payment gateway sync completed</span>
                    <span className="text-muted-foreground ml-auto">2 hours ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="servers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Server Details</CardTitle>
              <CardDescription>Detailed metrics for all servers</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Server</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>CPU Usage</TableHead>
                    <TableHead>Memory Usage</TableHead>
                    <TableHead>Uptime</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {serverMetrics.map((server, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{server.name}</TableCell>
                      <TableCell>{getStatusBadge(server.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress value={server.cpu} className="w-16 h-2" />
                          <span className="text-sm">{server.cpu}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress value={server.memory} className="w-16 h-2" />
                          <span className="text-sm">{server.memory}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{server.uptime}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          View Logs
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Performance</CardTitle>
              <CardDescription>Endpoint response times and error rates</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Endpoint</TableHead>
                    <TableHead>Requests</TableHead>
                    <TableHead>Avg Response (ms)</TableHead>
                    <TableHead>Error Rate (%)</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiPerformance.map((api, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono text-sm">{api.endpoint}</TableCell>
                      <TableCell>{api.requests.toLocaleString()}</TableCell>
                      <TableCell>{api.avgResponse}ms</TableCell>
                      <TableCell>
                        <span className={api.errorRate > 0.5 ? 'text-red-600' : 'text-green-600'}>
                          {api.errorRate}%
                        </span>
                      </TableCell>
                      <TableCell>
                        {api.avgResponse > 500 ? (
                          <Badge variant="destructive">Slow</Badge>
                        ) : api.errorRate > 0.5 ? (
                          <Badge variant="destructive">High Errors</Badge>
                        ) : (
                          <Badge variant="default">Healthy</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Error Logs</CardTitle>
              <CardDescription>Recent system errors and warnings</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {errorLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                      <TableCell>
                        <Badge variant={log.level === 'ERROR' ? 'destructive' : 'secondary'}>
                          {log.level}
                        </Badge>
                      </TableCell>
                      <TableCell>{log.service}</TableCell>
                      <TableCell>{log.message}</TableCell>
                      <TableCell>
                        {log.resolved ? (
                          <Badge variant="default">Resolved</Badge>
                        ) : (
                          <Badge variant="destructive">Active</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>Active alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="mt-1">
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{alert.title}</h4>
                        <Badge variant={alert.acknowledged ? "default" : "destructive"}>
                          {alert.acknowledged ? "Acknowledged" : "New"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">{alert.timestamp}</p>
                    </div>
                    <div className="flex space-x-2">
                      {!alert.acknowledged && (
                        <Button size="sm" variant="outline">
                          Acknowledge
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
