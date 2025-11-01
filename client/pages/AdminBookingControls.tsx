import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Search,
  Filter,
  MoreHorizontal,
  Calendar as CalendarIcon,
  Clock,
  User,
  Scissors,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Edit,
  Trash2,
  Plus,
  RefreshCw,
  Download,
} from "lucide-react";
import { format, isToday, isTomorrow, isYesterday } from "date-fns";

// Mock booking data - will be replaced with real API
interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  salonName: string;
  serviceName: string;
  servicePrice: number;
  status: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  bookingDate: string;
  bookingTime: string;
  duration: number; // in minutes
  notes?: string;
  createdAt: string;
  customerAvatar?: string;
}

const mockBookings: Booking[] = [
  {
    id: '1',
    customerName: 'John Doe',
    customerEmail: 'john.doe@example.com',
    customerPhone: '+91 9876543210',
    salonName: 'The Gents Cut',
    serviceName: 'Hair Cut',
    servicePrice: 300,
    status: 'CONFIRMED',
    bookingDate: '2024-01-22',
    bookingTime: '10:00',
    duration: 30,
    notes: 'Regular customer, prefers short back and sides',
    createdAt: '2024-01-20T14:30:00Z'
  },
  {
    id: '2',
    customerName: 'Jane Smith',
    customerEmail: 'jane.smith@example.com',
    customerPhone: '+91 9876543211',
    salonName: 'Style Studio',
    serviceName: 'Hair Color',
    servicePrice: 1500,
    status: 'PENDING',
    bookingDate: '2024-01-23',
    bookingTime: '14:30',
    duration: 120,
    notes: 'First time customer, allergic to ammonia',
    createdAt: '2024-01-21T09:15:00Z'
  },
  {
    id: '3',
    customerName: 'Mike Johnson',
    customerEmail: 'mike.j@example.com',
    customerPhone: '+91 9876543212',
    salonName: 'Beauty Hub',
    serviceName: 'Facial',
    servicePrice: 800,
    status: 'COMPLETED',
    bookingDate: '2024-01-20',
    bookingTime: '16:00',
    duration: 60,
    notes: 'Completed successfully',
    createdAt: '2024-01-19T11:45:00Z'
  },
  {
    id: '4',
    customerName: 'Sarah Wilson',
    customerEmail: 'sarah.w@example.com',
    customerPhone: '+91 9876543213',
    salonName: 'Glamour Salon',
    serviceName: 'Manicure',
    servicePrice: 400,
    status: 'CANCELLED',
    bookingDate: '2024-01-21',
    bookingTime: '11:00',
    duration: 45,
    notes: 'Customer cancelled due to emergency',
    createdAt: '2024-01-20T08:30:00Z'
  }
];

export default function AdminBookingControls() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>(mockBookings);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    let filtered = bookings;

    if (searchTerm) {
      filtered = filtered.filter(booking =>
        booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.salonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }

    if (dateFilter) {
      filtered = filtered.filter(booking => booking.bookingDate === format(dateFilter, 'yyyy-MM-dd'));
    }

    setFilteredBookings(filtered);
  }, [bookings, searchTerm, statusFilter, dateFilter]);

  const getStatusBadge = (status: string) => {
    const variants = {
      PENDING: 'secondary',
      CONFIRMED: 'default',
      IN_PROGRESS: 'outline',
      COMPLETED: 'default',
      CANCELLED: 'destructive'
    } as const;
    const icons = {
      PENDING: Clock,
      CONFIRMED: CheckCircle,
      IN_PROGRESS: RefreshCw,
      COMPLETED: CheckCircle,
      CANCELLED: XCircle
    } as const;
    const Icon = icons[status as keyof typeof icons];
    return (
      <Badge variant={variants[status as keyof typeof variants] || 'outline'} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status.replace('_', ' ')}
      </Badge>
    );
  };

  const getDateLabel = (dateString: string) => {
    const date = new Date(dateString);
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    if (isYesterday(date)) return 'Yesterday';
    return format(date, 'MMM dd, yyyy');
  };

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setBookings(bookings.map(booking =>
        booking.id === bookingId ? { ...booking, status: newStatus as Booking['status'] } : booking
      ));
      setLoading(false);
    }, 1000);
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (!cancelReason.trim()) {
      alert('Please provide a reason for cancellation.');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setBookings(bookings.map(booking =>
        booking.id === bookingId ? { ...booking, status: 'CANCELLED' as Booking['status'] } : booking
      ));
      setLoading(false);
      setIsCancelDialogOpen(false);
      setSelectedBooking(null);
      setCancelReason('');
    }, 1000);
  };

  const formatCurrency = (amount: number) => `₹${amount.toLocaleString()}`;
  const formatDateTime = (date: string, time: string) => `${format(new Date(date), 'MMM dd, yyyy')} at ${time}`;

  // Get bookings for selected date in calendar view
  const getBookingsForDate = (date: Date) => {
    return bookings.filter(booking => booking.bookingDate === format(date, 'yyyy-MM-dd'));
  };

  const todayBookings = bookings.filter(booking => booking.bookingDate === format(new Date(), 'yyyy-MM-dd'));
  const pendingBookings = bookings.filter(booking => booking.status === 'PENDING');
  const confirmedBookings = bookings.filter(booking => booking.status === 'CONFIRMED');
  const completedBookings = bookings.filter(booking => booking.status === 'COMPLETED');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Booking Controls</h1>
          <p className="text-muted-foreground">Manage all bookings, schedules, and reservations</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Booking
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Bookings</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayBookings.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingBookings.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{confirmedBookings.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedBookings.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="search">Search Bookings</Label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search by customer, salon, or service..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <div className="sm:w-48">
                  <Label htmlFor="status-filter">Status</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                      <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                      <SelectItem value="COMPLETED">Completed</SelectItem>
                      <SelectItem value="CANCELLED">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:w-48">
                  <Label>Date</Label>
                  <Select
                    value={dateFilter ? format(dateFilter, 'yyyy-MM-dd') : 'all'}
                    onValueChange={(value) => setDateFilter(value === 'all' ? undefined : new Date(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Dates" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Dates</SelectItem>
                      <SelectItem value={format(new Date(), 'yyyy-MM-dd')}>Today</SelectItem>
                      <SelectItem value={format(new Date(Date.now() + 86400000), 'yyyy-MM-dd')}>Tomorrow</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bookings Table */}
          <Card>
            <CardHeader>
              <CardTitle>Bookings ({filteredBookings.length})</CardTitle>
              <CardDescription>Manage and monitor all booking reservations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Salon</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={booking.customerAvatar} alt={booking.customerName} />
                            <AvatarFallback>{booking.customerName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{booking.customerName}</div>
                            <div className="text-sm text-muted-foreground">{booking.customerEmail}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{booking.serviceName}</div>
                          <div className="text-sm text-muted-foreground">{booking.duration} min</div>
                        </div>
                      </TableCell>
                      <TableCell>{booking.salonName}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{getDateLabel(booking.bookingDate)}</div>
                          <div className="text-sm text-muted-foreground">{booking.bookingTime}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(booking.status)}</TableCell>
                      <TableCell>{formatCurrency(booking.servicePrice)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => setSelectedBooking(booking)}>
                              <User className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSelectedBooking(booking)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Booking
                            </DropdownMenuItem>
                            {booking.status === 'PENDING' && (
                              <DropdownMenuItem
                                onClick={() => handleStatusChange(booking.id, 'CONFIRMED')}
                                className="text-green-600"
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Confirm
                              </DropdownMenuItem>
                            )}
                            {booking.status === 'CONFIRMED' && (
                              <DropdownMenuItem
                                onClick={() => handleStatusChange(booking.id, 'IN_PROGRESS')}
                              >
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Mark In Progress
                              </DropdownMenuItem>
                            )}
                            {booking.status === 'IN_PROGRESS' && (
                              <DropdownMenuItem
                                onClick={() => handleStatusChange(booking.id, 'COMPLETED')}
                                className="text-blue-600"
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Mark Completed
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedBooking(booking);
                                setIsCancelDialogOpen(true);
                              }}
                              className="text-red-600"
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Cancel Booking
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>
                  Bookings for {selectedDate ? format(selectedDate, 'MMMM dd, yyyy') : 'Selected Date'}
                </CardTitle>
                <CardDescription>
                  {getBookingsForDate(selectedDate || new Date()).length} booking(s) scheduled
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getBookingsForDate(selectedDate || new Date()).map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={booking.customerAvatar} alt={booking.customerName} />
                          <AvatarFallback>{booking.customerName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{booking.customerName}</div>
                          <div className="text-sm text-muted-foreground">
                            {booking.serviceName} at {booking.salonName}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-right">
                          <div className="font-medium">{booking.bookingTime}</div>
                          <div className="text-sm text-muted-foreground">{booking.duration} min</div>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>
                    </div>
                  ))}
                  {getBookingsForDate(selectedDate || new Date()).length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No bookings scheduled for this date
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Booking Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Booking</DialogTitle>
            <DialogDescription>
              Modify booking details and status.
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-customer">Customer</Label>
                  <Input id="edit-customer" defaultValue={selectedBooking.customerName} />
                </div>
                <div>
                  <Label htmlFor="edit-service">Service</Label>
                  <Input id="edit-service" defaultValue={selectedBooking.serviceName} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-date">Date</Label>
                  <Input id="edit-date" type="date" defaultValue={selectedBooking.bookingDate} />
                </div>
                <div>
                  <Label htmlFor="edit-time">Time</Label>
                  <Input id="edit-time" type="time" defaultValue={selectedBooking.bookingTime} />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-notes">Notes</Label>
                <Textarea id="edit-notes" defaultValue={selectedBooking.notes} rows={3} />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsEditDialogOpen(false)}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Cancel Booking Dialog */}
      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
            <DialogDescription>
              Please provide a reason for cancelling this booking.
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-medium mb-2">Booking Details</h4>
                <div className="space-y-1 text-sm">
                  <p><strong>Customer:</strong> {selectedBooking.customerName}</p>
                  <p><strong>Service:</strong> {selectedBooking.serviceName}</p>
                  <p><strong>Date:</strong> {formatDateTime(selectedBooking.bookingDate, selectedBooking.bookingTime)}</p>
                </div>
              </div>
              <div>
                <Label htmlFor="cancel-reason">Cancellation Reason</Label>
                <Textarea
                  id="cancel-reason"
                  placeholder="Please provide a detailed reason for cancellation..."
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCancelDialogOpen(false)}>
                  Keep Booking
                </Button>
                <Button
                  onClick={() => handleCancelBooking(selectedBooking.id)}
                  disabled={loading || !cancelReason.trim()}
                  variant="destructive"
                >
                  {loading ? 'Cancelling...' : 'Cancel Booking'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
