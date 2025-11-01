import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Receipt,
  PieChart,
  BarChart3,
  Download,
  Calendar,
  IndianRupee,
  Percent,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mock financial data - will be replaced with real API
const financialData = {
  totalRevenue: 2456780,
  monthlyRevenue: 198450,
  totalBookings: 12543,
  averageBookingValue: 196,
  gstCollected: 294814, // 12% GST
  platformFees: 245678, // 10% platform fee
  salonPayouts: 1917288,
  pendingPayouts: 45678,
};

const revenueData = [
  { month: "Jul", revenue: 165000, gst: 19800, platformFee: 16500 },
  { month: "Aug", revenue: 178000, gst: 21360, platformFee: 17800 },
  { month: "Sep", revenue: 189000, gst: 22680, platformFee: 18900 },
  { month: "Oct", revenue: 195000, gst: 23400, platformFee: 19500 },
  { month: "Nov", revenue: 201000, gst: 24120, platformFee: 20100 },
  { month: "Dec", revenue: 198450, gst: 23814, platformFee: 19845 },
];

const paymentMethodsData = [
  { method: "UPI", amount: 1200000, percentage: 49 },
  { method: "Credit Card", amount: 850000, percentage: 35 },
  { method: "Debit Card", amount: 300000, percentage: 12 },
  { method: "Net Banking", amount: 106780, percentage: 4 },
];

const salonRevenueData = [
  { salon: "The Gents Cut", revenue: 450000, bookings: 1500, commission: 45000 },
  { salon: "Style Studio", revenue: 380000, bookings: 1200, commission: 38000 },
  { salon: "Beauty Hub", revenue: 320000, bookings: 1000, commission: 32000 },
  { salon: "Glamour Salon", revenue: 290000, bookings: 950, commission: 29000 },
  { salon: "Elite Cuts", revenue: 250000, bookings: 800, commission: 25000 },
];

const gstBreakdownData = [
  { category: "Services (18%)", amount: 180000, percentage: 61 },
  { category: "Products (12%)", amount: 95000, percentage: 32 },
  { category: "Others (5%)", amount: 19814, percentage: 7 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function AdminFinancialDashboard() {
  const [timeRange, setTimeRange] = useState("6m");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate API call for different time ranges
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  }, [timeRange]);

  const formatCurrency = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;
  const formatNumber = (num: number) => num.toLocaleString('en-IN');

  const totalExpenses = financialData.platformFees + 50000; // Adding operational costs
  const netProfit = financialData.totalRevenue - financialData.gstCollected - totalExpenses;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Financial Dashboard</h1>
          <p className="text-muted-foreground">Revenue tracking, GST calculations, and financial insights</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Last month</SelectItem>
              <SelectItem value="3m">Last 3 months</SelectItem>
              <SelectItem value="6m">Last 6 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Financial Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(financialData.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="mr-1 h-3 w-3" />
                +12.5% from last period
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">GST Collected</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(financialData.gstCollected)}</div>
            <p className="text-xs text-muted-foreground">
              12% of total revenue
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(netProfit)}</div>
            <p className="text-xs text-muted-foreground">
              After GST and expenses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
            <CreditCard className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(financialData.pendingPayouts)}</div>
            <p className="text-xs text-muted-foreground">
              To be paid to salons
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Financial Charts */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="revenue">Revenue Trends</TabsTrigger>
          <TabsTrigger value="breakdown">Revenue Breakdown</TabsTrigger>
          <TabsTrigger value="salons">Salon Performance</TabsTrigger>
          <TabsTrigger value="gst">GST Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(value) => [formatCurrency(value as number), 'Revenue']} />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stackId="1"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Revenue distribution by payment method</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={paymentMethodsData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ method, percentage }) => `${method} ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="amount"
                    >
                      {paymentMethodsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [formatCurrency(value as number), 'Amount']} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
              <CardDescription>Detailed breakdown of revenue streams</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">Service Revenue</p>
                      <p className="text-sm text-muted-foreground">From salon services</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{formatCurrency(financialData.totalRevenue * 0.85)}</p>
                    <p className="text-sm text-muted-foreground">85%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">Product Sales</p>
                      <p className="text-sm text-muted-foreground">From product purchases</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{formatCurrency(financialData.totalRevenue * 0.12)}</p>
                    <p className="text-sm text-muted-foreground">12%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">Other Revenue</p>
                      <p className="text-sm text-muted-foreground">Miscellaneous income</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{formatCurrency(financialData.totalRevenue * 0.03)}</p>
                    <p className="text-sm text-muted-foreground">3%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="salons" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Salons</CardTitle>
              <CardDescription>Revenue and commission breakdown by salon</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Salon Name</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Bookings</TableHead>
                    <TableHead>Commission (10%)</TableHead>
                    <TableHead>Payout Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salonRevenueData.map((salon, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{salon.salon}</TableCell>
                      <TableCell>{formatCurrency(salon.revenue)}</TableCell>
                      <TableCell>{formatNumber(salon.bookings)}</TableCell>
                      <TableCell>{formatCurrency(salon.commission)}</TableCell>
                      <TableCell>
                        <Badge variant={index < 3 ? "default" : "secondary"}>
                          {index < 3 ? "Paid" : "Pending"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gst" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>GST Breakdown</CardTitle>
                <CardDescription>GST collection by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={gstBreakdownData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(value) => [formatCurrency(value as number), 'GST Amount']} />
                    <Bar dataKey="amount" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>GST Summary</CardTitle>
                <CardDescription>Monthly GST collection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total GST Collected</span>
                    <span className="font-bold">{formatCurrency(financialData.gstCollected)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">GST Rate</span>
                    <span className="font-bold">12%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Taxable Amount</span>
                    <span className="font-bold">{formatCurrency(financialData.totalRevenue)}</span>
                  </div>
                  <div className="flex justify-between items-center border-t pt-2">
                    <span className="text-sm font-medium">GST Payable</span>
                    <span className="font-bold text-green-600">{formatCurrency(financialData.gstCollected)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Financial Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Summary</CardTitle>
          <CardDescription>Complete overview of platform finances</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <h4 className="font-medium text-green-600">Revenue</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Total Revenue</span>
                  <span>{formatCurrency(financialData.totalRevenue)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Revenue</span>
                  <span>{formatCurrency(financialData.monthlyRevenue)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Booking Value</span>
                  <span>{formatCurrency(financialData.averageBookingValue)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-blue-600">Expenses</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>GST Collected</span>
                  <span>{formatCurrency(financialData.gstCollected)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Fees</span>
                  <span>{formatCurrency(financialData.platformFees)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Operational Costs</span>
                  <span>{formatCurrency(50000)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-purple-600">Payouts</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Paid to Salons</span>
                  <span>{formatCurrency(financialData.salonPayouts)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pending Payouts</span>
                  <span>{formatCurrency(financialData.pendingPayouts)}</span>
                </div>
                <div className="flex justify-between font-medium border-t pt-1">
                  <span>Net Profit</span>
                  <span className="text-green-600">{formatCurrency(netProfit)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-2">
        <Button variant="outline">
          <Receipt className="mr-2 h-4 w-4" />
          Generate GST Report
        </Button>
        <Button variant="outline">
          <BarChart3 className="mr-2 h-4 w-4" />
          Detailed Analytics
        </Button>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Download Financial Report
        </Button>
      </div>
    </div>
  );
}
