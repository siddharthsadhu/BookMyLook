import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FileText,
  MessageSquare,
  Image,
  Plus,
  Edit,
  Trash2,
  Eye,
  Send,
  Mail,
  Phone,
  HelpCircle,
  Settings,
  MoreHorizontal,
} from "lucide-react";

// Mock content data
const pages = [
  {
    id: 1,
    title: "About Us",
    slug: "about",
    status: "published",
    lastModified: "2024-01-20",
    author: "Admin",
  },
  {
    id: 2,
    title: "Terms of Service",
    slug: "terms",
    status: "published",
    lastModified: "2024-01-18",
    author: "Admin",
  },
  {
    id: 3,
    title: "Privacy Policy",
    slug: "privacy",
    status: "draft",
    lastModified: "2024-01-15",
    author: "Admin",
  },
];

const faqs = [
  {
    id: 1,
    question: "How do I book a salon appointment?",
    answer: "You can book an appointment by selecting a salon, choosing your preferred service and time slot, and completing the payment.",
    category: "Booking",
    status: "published",
  },
  {
    id: 2,
    question: "What payment methods are accepted?",
    answer: "We accept UPI, credit cards, debit cards, and net banking for all bookings.",
    category: "Payment",
    status: "published",
  },
  {
    id: 3,
    question: "Can I cancel my booking?",
    answer: "Yes, you can cancel your booking up to 2 hours before the appointment time through your dashboard.",
    category: "Booking",
    status: "published",
  },
];

const emailTemplates = [
  {
    id: 1,
    name: "Booking Confirmation",
    subject: "Your booking is confirmed - {{booking_id}}",
    type: "booking",
    lastUsed: "2024-01-22",
  },
  {
    id: 2,
    name: "Payment Receipt",
    subject: "Payment receipt for booking {{booking_id}}",
    type: "payment",
    lastUsed: "2024-01-21",
  },
  {
    id: 3,
    name: "Cancellation Notice",
    subject: "Booking cancelled - {{booking_id}}",
    type: "cancellation",
    lastUsed: "2024-01-20",
  },
];

const announcements = [
  {
    id: 1,
    title: "New Salon Partnership Program",
    message: "We're excited to announce our new partnership program for salons. Apply now to join our network!",
    type: "info",
    status: "active",
    createdAt: "2024-01-20",
    expiresAt: "2024-02-20",
  },
  {
    id: 2,
    title: "Scheduled Maintenance",
    message: "The platform will be under maintenance on Jan 25th from 2-4 AM. We apologize for any inconvenience.",
    type: "warning",
    status: "active",
    createdAt: "2024-01-22",
    expiresAt: "2024-01-25",
  },
];

export default function AdminContentManagement() {
  const [selectedTab, setSelectedTab] = useState("pages");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const getStatusBadge = (status: string) => {
    const variants = {
      published: "default",
      draft: "secondary",
      active: "default",
      inactive: "secondary",
    } as const;
    return <Badge variant={variants[status as keyof typeof variants] || "outline"}>{status}</Badge>;
  };

  const handleCreate = () => {
    // Handle create logic
    setIsCreateDialogOpen(false);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setIsCreateDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Content Management</h1>
          <p className="text-muted-foreground">Manage website content, FAQs, templates, and announcements</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create New
        </Button>
      </div>

      {/* Content Management Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>

        <TabsContent value="pages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Static Pages</CardTitle>
              <CardDescription>Manage website pages and content</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pages.map((page) => (
                    <TableRow key={page.id}>
                      <TableCell className="font-medium">{page.title}</TableCell>
                      <TableCell className="font-mono text-sm">/{page.slug}</TableCell>
                      <TableCell>{getStatusBadge(page.status)}</TableCell>
                      <TableCell>{page.lastModified}</TableCell>
                      <TableCell>{page.author}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleEdit(page)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
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

        <TabsContent value="faqs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Manage help content and customer support questions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Question</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {faqs.map((faq) => (
                    <TableRow key={faq.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{faq.question}</div>
                          <div className="text-sm text-muted-foreground line-clamp-2">{faq.answer}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{faq.category}</Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(faq.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleEdit(faq)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
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

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email & SMS Templates</CardTitle>
              <CardDescription>Manage communication templates</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Template Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {emailTemplates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell className="font-medium">{template.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{template.type}</Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{template.subject}</TableCell>
                      <TableCell>{template.lastUsed}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleEdit(template)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Template
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Send className="mr-2 h-4 w-4" />
                              Send Test
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
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

        <TabsContent value="announcements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Announcements</CardTitle>
              <CardDescription>Manage platform-wide announcements and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {announcements.map((announcement) => (
                    <TableRow key={announcement.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{announcement.title}</div>
                          <div className="text-sm text-muted-foreground line-clamp-2">{announcement.message}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={announcement.type === 'warning' ? 'destructive' : 'default'}>
                          {announcement.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(announcement.status)}</TableCell>
                      <TableCell>{announcement.expiresAt}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleEdit(announcement)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Send className="mr-2 h-4 w-4" />
                              Send Now
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
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
      </Tabs>

      {/* Create/Edit Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? `Edit ${selectedTab.slice(0, -1)}` : `Create New ${selectedTab.slice(0, -1)}`}
            </DialogTitle>
            <DialogDescription>
              {editingItem ? 'Update the content details.' : 'Fill in the details for the new content.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedTab === 'pages' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="page-title">Title</Label>
                    <Input id="page-title" placeholder="Page title" />
                  </div>
                  <div>
                    <Label htmlFor="page-slug">Slug</Label>
                    <Input id="page-slug" placeholder="page-slug" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="page-content">Content</Label>
                  <Textarea id="page-content" placeholder="Page content..." rows={8} />
                </div>
              </>
            )}

            {selectedTab === 'faqs' && (
              <>
                <div>
                  <Label htmlFor="faq-question">Question</Label>
                  <Input id="faq-question" placeholder="FAQ question" />
                </div>
                <div>
                  <Label htmlFor="faq-answer">Answer</Label>
                  <Textarea id="faq-answer" placeholder="FAQ answer..." rows={4} />
                </div>
                <div>
                  <Label htmlFor="faq-category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="booking">Booking</SelectItem>
                      <SelectItem value="payment">Payment</SelectItem>
                      <SelectItem value="account">Account</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {selectedTab === 'templates' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="template-name">Template Name</Label>
                    <Input id="template-name" placeholder="Template name" />
                  </div>
                  <div>
                    <Label htmlFor="template-type">Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="sms">SMS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="template-subject">Subject</Label>
                  <Input id="template-subject" placeholder="Email subject or SMS preview" />
                </div>
                <div>
                  <Label htmlFor="template-content">Content</Label>
                  <Textarea id="template-content" placeholder="Template content..." rows={6} />
                </div>
              </>
            )}

            {selectedTab === 'announcements' && (
              <>
                <div>
                  <Label htmlFor="announcement-title">Title</Label>
                  <Input id="announcement-title" placeholder="Announcement title" />
                </div>
                <div>
                  <Label htmlFor="announcement-message">Message</Label>
                  <Textarea id="announcement-message" placeholder="Announcement message..." rows={4} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="announcement-type">Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="success">Success</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="announcement-expires">Expires At</Label>
                    <Input id="announcement-expires" type="datetime-local" />
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreate}>
                {editingItem ? 'Update' : 'Create'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
