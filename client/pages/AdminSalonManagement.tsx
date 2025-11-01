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
import {
  Search,
  Filter,
  MoreHorizontal,
  Building2,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  Users,
  DollarSign,
  MapPin,
  Phone,
  Mail,
  Eye,
  Edit,
  Trash2,
  AlertTriangle,
} from "lucide-react";

// Mock salon data - will be replaced with real API
interface Salon {
  id: string;
  name: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'ACTIVE' | 'SUSPENDED';
  address: string;
  city: string;
  state: string;
  services: string[];
  rating: number;
  totalCustomers: number;
  totalRevenue: number;
  createdAt: string;
  partnershipRequestDate?: string;
  rejectionReason?: string;
  avatar?: string;
}

const mockSalons: Salon[] = [
  {
    id: '1',
    name: 'The Gents Cut',
    ownerName: 'Rajesh Kumar',
    ownerEmail: 'rajesh.kumar@example.com',
    ownerPhone: '+91 9876543210',
    status: 'ACTIVE',
    address: '123 Main Street, Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    services: ['Hair Cut', 'Shaving', 'Facial'],
    rating: 4.8,
    totalCustomers: 1250,
    totalRevenue: 187500,
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Style Studio',
    ownerName: 'Priya Sharma',
    ownerEmail: 'priya.sharma@example.com',
    ownerPhone: '+91 9876543211',
    status: 'PENDING',
    address: '456 Oak Avenue, Connaught Place',
    city: 'Delhi',
    state: 'Delhi',
    services: ['Hair Color', 'Hair Wash', 'Manicure'],
    rating: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    createdAt: '2024-01-20T14:30:00Z',
    partnershipRequestDate: '2024-01-20T14:30:00Z'
  },
  {
    id: '3',
    name: 'Beauty Hub',
    ownerName: 'Amit Singh',
    ownerEmail: 'amit.singh@example.com',
    ownerPhone: '+91 9876543212',
    status: 'REJECTED',
    address: '789 Pine Road, MG Road',
    city: 'Bangalore',
    state: 'Karnataka',
    services: ['Pedicure', 'Hair Treatment'],
    rating: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    createdAt: '2024-01-18T09:15:00Z',
    partnershipRequestDate: '2024-01-18T09:15:00Z',
    rejectionReason: 'Incomplete documentation provided'
  },
  {
    id: '4',
    name: 'Glamour Salon',
    ownerName: 'Sneha Patel',
    ownerEmail: 'sneha.patel@example.com',
    ownerPhone: '+91 9876543213',
    status: 'SUSPENDED',
    address: '321 Elm Street, T Nagar',
    city: 'Chennai',
    state: 'Tamil Nadu',
    services: ['Hair Cut', 'Facial', 'Massage'],
    rating: 4.2,
    totalCustomers: 890,
    totalRevenue: 133500,
    createdAt: '2024-01-10T16:45:00Z'
  }
];

export default function AdminSalonManagement() {
  const [salons, setSalons] = useState<Salon[]>(mockSalons);
  const [filteredSalons, setFilteredSalons] = useState<Salon[]>(mockSalons);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false);
  const [isRejectionDialogOpen, setIsRejectionDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let filtered = salons;

    if (searchTerm) {
      filtered = filtered.filter(salon =>
        salon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        salon.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        salon.ownerEmail.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(salon => salon.status === statusFilter);
    }

    setFilteredSalons(filtered);
  }, [salons, searchTerm, statusFilter]);

  const getStatusBadge = (status: string) => {
    const variants = {
      ACTIVE: 'default',
      PENDING: 'secondary',
      APPROVED: 'default',
      REJECTED: 'destructive',
      SUSPENDED: 'destructive'
    } as const;
    const icons = {
      ACTIVE: CheckCircle,
      PENDING: Clock,
      APPROVED: CheckCircle,
      REJECTED: XCircle,
      SUSPENDED: AlertTriangle
    } as const;
    const Icon = icons[status as keyof typeof icons];
    return (
      <Badge variant={variants[status as keyof typeof variants] || 'outline'} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  const handleApproveSalon = async (salonId: string) => {
    setLoading(true);
    // Simulate API call - approve salon and grant SALON_OWNER role to owner
    setTimeout(() => {
      setSalons(salons.map(salon =>
        salon.id === salonId ? { ...salon, status: 'APPROVED' as Salon['status'] } : salon
      ));
      setLoading(false);
      setIsApprovalDialogOpen(false);
      setSelectedSalon(null);
    }, 1000);
  };

  const handleRejectSalon = async (salonId: string) => {
    if (!rejectionReason.trim()) {
      alert('Please provide a reason for rejection.');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSalons(salons.map(salon =>
        salon.id === salonId ? {
          ...salon,
          status: 'REJECTED' as Salon['status'],
          rejectionReason
        } : salon
      ));
      setLoading(false);
      setIsRejectionDialogOpen(false);
      setSelectedSalon(null);
      setRejectionReason('');
    }, 1000);
  };

  const handleStatusChange = async (salonId: string, newStatus: string) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSalons(salons.map(salon =>
        salon.id === salonId ? { ...salon, status: newStatus as Salon['status'] } : salon
      ));
      setLoading(false);
    }, 1000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => `₹${amount.toLocaleString()}`;

  const pendingSalons = salons.filter(s => s.status === 'PENDING');
  const activeSalons = salons.filter(s => s.status === 'ACTIVE' || s.status === 'APPROVED');
  const rejectedSalons = salons.filter(s => s.status === 'REJECTED');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Salon Management</h1>
          <p className="text-muted-foreground">Manage salon partnerships and approvals</p>
        </div>
        <Button>
          <Building2 className="mr-2 h-4 w-4" />
          Add Salon
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Salons</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{salons.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Salons</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSalons.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingSalons.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejectedSalons.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Partnership Requests Alert */}
      {pendingSalons.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-800">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div>
                <h3 className="font-medium text-yellow-800 dark:text-yellow-200">
                  {pendingSalons.length} Partnership Request{pendingSalons.length > 1 ? 's' : ''} Pending
                </h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Review and approve new salon partnership applications.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search Salons</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by salon name, owner, or email..."
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
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="APPROVED">Approved</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                  <SelectItem value="SUSPENDED">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Salons Table */}
      <Card>
        <CardHeader>
          <CardTitle>Salons ({filteredSalons.length})</CardTitle>
          <CardDescription>Manage salon partnerships and monitor performance</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Salon</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Customers</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSalons.map((salon) => (
                <TableRow key={salon.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={salon.avatar} alt={salon.name} />
                        <AvatarFallback>{salon.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{salon.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {salon.services.slice(0, 2).join(', ')}
                          {salon.services.length > 2 && ` +${salon.services.length - 2} more`}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{salon.ownerName}</div>
                      <div className="text-sm text-muted-foreground">{salon.ownerEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(salon.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <MapPin className="mr-1 h-3 w-3" />
                      {salon.city}
                    </div>
                  </TableCell>
                  <TableCell>
                    {salon.rating > 0 ? (
                      <div className="flex items-center">
                        <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {salon.rating}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>{salon.totalCustomers.toLocaleString()}</TableCell>
                  <TableCell>{formatCurrency(salon.totalRevenue)}</TableCell>
                  <TableCell>{formatDate(salon.createdAt)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Salon
                        </DropdownMenuItem>
                        {salon.status === 'PENDING' && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedSalon(salon);
                                setIsApprovalDialogOpen(true);
                              }}
                              className="text-green-600"
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve Partnership
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedSalon(salon);
                                setIsRejectionDialogOpen(true);
                              }}
                              className="text-red-600"
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Reject Partnership
                            </DropdownMenuItem>
                          </>
                        )}
                        {salon.status === 'ACTIVE' && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(salon.id, 'SUSPENDED')}
                              className="text-red-600"
                            >
                              <AlertTriangle className="mr-2 h-4 w-4" />
                              Suspend Salon
                            </DropdownMenuItem>
                          </>
                        )}
                        {salon.status === 'SUSPENDED' && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(salon.id, 'ACTIVE')}
                              className="text-green-600"
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Reactivate Salon
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Approval Dialog */}
      <Dialog open={isApprovalDialogOpen} onOpenChange={setIsApprovalDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Partnership Request</DialogTitle>
            <DialogDescription>
              Approving this request will grant {selectedSalon?.ownerName} salon owner privileges and activate their salon on the platform.
            </DialogDescription>
          </DialogHeader>
          {selectedSalon && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-medium mb-2">Salon Details</h4>
                <div className="space-y-1 text-sm">
                  <p><strong>Name:</strong> {selectedSalon.name}</p>
                  <p><strong>Owner:</strong> {selectedSalon.ownerName}</p>
                  <p><strong>Location:</strong> {selectedSalon.address}, {selectedSalon.city}</p>
                  <p><strong>Services:</strong> {selectedSalon.services.join(', ')}</p>
                  <p><strong>Requested:</strong> {selectedSalon.partnershipRequestDate ? formatDate(selectedSalon.partnershipRequestDate) : 'N/A'}</p>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsApprovalDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => handleApproveSalon(selectedSalon.id)}
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {loading ? 'Approving...' : 'Approve Partnership'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Rejection Dialog */}
      <Dialog open={isRejectionDialogOpen} onOpenChange={setIsRejectionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Partnership Request</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this partnership request.
            </DialogDescription>
          </DialogHeader>
          {selectedSalon && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-medium mb-2">Salon Details</h4>
                <div className="space-y-1 text-sm">
                  <p><strong>Name:</strong> {selectedSalon.name}</p>
                  <p><strong>Owner:</strong> {selectedSalon.ownerName}</p>
                </div>
              </div>
              <div>
                <Label htmlFor="rejection-reason">Rejection Reason</Label>
                <Textarea
                  id="rejection-reason"
                  placeholder="Please provide a detailed reason for rejection..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsRejectionDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => handleRejectSalon(selectedSalon.id)}
                  disabled={loading || !rejectionReason.trim()}
                  variant="destructive"
                >
                  {loading ? 'Rejecting...' : 'Reject Partnership'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
