import { motion } from "framer-motion";
import { useI18n } from "@/i18n";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, MapPin, Phone, Calendar, Star, Users, AlertCircle, CheckCircle } from "lucide-react";

interface Booking {
  booking_id: number;
  salon_name: string;
  service_name: string;
  appointment_date: string;
  appointment_time: string;
  status: 'upcoming' | 'in_progress' | 'completed' | 'cancelled';
  queue_position?: number;
  estimated_wait?: number;
  price: number;
  salon_address: string;
  salon_phone: string;
}

interface Review {
  review_id: number;
  salon_name: string;
  service_name: string;
  rating: number;
  comment: string;
  review_date: string;
}

export default function CustomerDashboard() {
  const { t } = useI18n();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user data
    setTimeout(() => {
      setBookings([
        {
          booking_id: 1,
          salon_name: "The Gents Cut",
          service_name: "Men's Haircut",
          appointment_date: "2024-01-20",
          appointment_time: "14:30",
          status: 'upcoming',
          queue_position: 2,
          estimated_wait: 15,
          price: 25,
          salon_address: "123 Main Street, Anytown",
          salon_phone: "555-123-4567"
        },
        {
          booking_id: 2,
          salon_name: "Style Studio",
          service_name: "Beard Trim",
          appointment_date: "2024-01-18",
          appointment_time: "10:00",
          status: 'completed',
          price: 15,
          salon_address: "456 Oak Avenue, Anytown",
          salon_phone: "555-987-6543"
        }
      ]);

      setReviews([
        {
          review_id: 1,
          salon_name: "Style Studio",
          service_name: "Beard Trim",
          rating: 5,
          comment: "Excellent service! The barber was very professional and the trim was perfect.",
          review_date: "2024-01-18"
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge variant="default">Upcoming</Badge>;
      case 'in_progress':
        return <Badge variant="secondary">In Progress</Badge>;
      case 'completed':
        return <Badge variant="outline" className="text-green-600 border-green-600">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="container py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Customer Dashboard</h1>
        <p className="text-muted-foreground">Manage your appointments and salon experiences</p>
      </div>

      <Tabs defaultValue="bookings" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          <TabsTrigger value="reviews">My Reviews</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings" className="space-y-6">
          <div className="grid gap-6">
            {bookings.map((booking, index) => (
              <motion.div
                key={booking.booking_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{booking.salon_name}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <MapPin className="h-4 w-4" />
                          {booking.salon_address}
                        </CardDescription>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {new Date(booking.appointment_date).toLocaleDateString()} at {booking.appointment_time}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Service:</span> {booking.service_name}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Price:</span> ₹{booking.price}
                        </div>
                        {booking.salon_phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{booking.salon_phone}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        {booking.status === 'upcoming' && booking.queue_position && (
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <Users className="h-4 w-4 text-blue-600" />
                              <span className="text-sm font-medium text-blue-800">
                                Queue Position: #{booking.queue_position}
                              </span>
                            </div>
                            {booking.estimated_wait && (
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-blue-600" />
                                <span className="text-sm text-blue-700">
                                  Est. Wait: {booking.estimated_wait} minutes
                                </span>
                              </div>
                            )}
                          </div>
                        )}

                        {booking.status === 'in_progress' && (
                          <div className="bg-yellow-50 p-3 rounded-lg">
                            <div className="flex items-center gap-2">
                              <AlertCircle className="h-4 w-4 text-yellow-600" />
                              <span className="text-sm font-medium text-yellow-800">
                                Service in progress
                              </span>
                            </div>
                          </div>
                        )}

                        {booking.status === 'completed' && (
                          <div className="bg-green-50 p-3 rounded-lg">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="text-sm font-medium text-green-800">
                                Service completed
                              </span>
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2">
                          {booking.status === 'upcoming' && (
                            <>
                              <Button size="sm" variant="outline">
                                Reschedule
                              </Button>
                              <Button size="sm" variant="destructive">
                                Cancel
                              </Button>
                            </>
                          )}
                          {booking.status === 'completed' && (
                            <Button size="sm">
                              Leave Review
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {bookings.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No bookings yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start by booking your first appointment with one of our partner salons.
                  </p>
                  <Button>Browse Salons</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-6">
          <div className="grid gap-6">
            {reviews.map((review, index) => (
              <motion.div
                key={review.review_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{review.salon_name}</CardTitle>
                        <CardDescription>{review.service_name}</CardDescription>
                      </div>
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      {review.comment}
                    </p>
                    <div className="text-xs text-muted-foreground">
                      Reviewed on {new Date(review.review_date).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {reviews.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No reviews yet</h3>
                  <p className="text-muted-foreground">
                    Your reviews will appear here after you complete appointments.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Manage your personal information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <p className="text-sm text-muted-foreground">John Doe</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Member Since</label>
                  <p className="text-sm text-muted-foreground">January 2024</p>
                </div>
              </div>
              <Button>Edit Profile</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
