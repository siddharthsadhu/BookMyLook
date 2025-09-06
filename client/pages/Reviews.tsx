import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Search, Filter, ThumbsUp, MessageSquare, Calendar, User } from "lucide-react";
import { Review } from "@shared/api";

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState<string>("all");
  const [filterSalon, setFilterSalon] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");

  useEffect(() => {
    // Simulate loading reviews
    setTimeout(() => {
      setReviews([
        {
          review_id: 1,
          customer_id: 1,
          customer_name: "John Doe",
          shop_id: 1,
          salon_name: "Style Studio",
          service_id: 1,
          service_name: "Haircut & Styling",
          rating: 5,
          comment: "Excellent service! The stylist was very professional and the haircut was exactly what I wanted. The salon is clean and modern.",
          review_date: "2024-01-20",
          is_verified: true
        },
        {
          review_id: 2,
          customer_id: 2,
          customer_name: "Jane Smith",
          shop_id: 1,
          salon_name: "Style Studio",
          service_id: 2,
          service_name: "Beard Trim",
          rating: 4,
          comment: "Good service overall. The beard trim was precise and the staff was friendly. Would recommend to others.",
          review_date: "2024-01-18",
          is_verified: true
        },
        {
          review_id: 3,
          customer_id: 3,
          customer_name: "Mike Johnson",
          shop_id: 2,
          salon_name: "Beauty Lounge",
          service_id: 4,
          service_name: "Facial Treatment",
          rating: 5,
          comment: "Amazing facial treatment! My skin feels so refreshed and the therapist was very knowledgeable. Will definitely come back.",
          review_date: "2024-01-15",
          is_verified: true
        },
        {
          review_id: 4,
          customer_id: 4,
          customer_name: "Sarah Wilson",
          shop_id: 3,
          salon_name: "Hair & Beyond",
          service_id: 7,
          service_name: "Premium Haircut",
          rating: 3,
          comment: "The haircut was okay, but it took longer than expected. The stylist was nice but seemed inexperienced.",
          review_date: "2024-01-12",
          is_verified: false
        },
        {
          review_id: 5,
          customer_id: 5,
          customer_name: "David Brown",
          shop_id: 2,
          salon_name: "Beauty Lounge",
          service_id: 5,
          service_name: "Manicure & Pedicure",
          rating: 5,
          comment: "Perfect manicure and pedicure! The nail technician was very skilled and the salon environment was relaxing.",
          review_date: "2024-01-10",
          is_verified: true
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const getFilteredReviews = () => {
    let filtered = reviews;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(review =>
        review.salon_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.service_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by rating
    if (filterRating !== "all") {
      const rating = parseInt(filterRating);
      filtered = filtered.filter(review => review.rating === rating);
    }

    // Filter by salon
    if (filterSalon !== "all") {
      filtered = filtered.filter(review => review.salon_name === filterSalon);
    }

    // Sort reviews
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.review_date).getTime() - new Date(a.review_date).getTime();
        case "oldest":
          return new Date(a.review_date).getTime() - new Date(b.review_date).getTime();
        case "highest_rating":
          return b.rating - a.rating;
        case "lowest_rating":
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

    return filtered;
  };

  const getUniqueSalons = () => {
    return [...new Set(reviews.map(review => review.salon_name))];
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return "0.0";
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating as keyof typeof distribution]++;
    });
    return distribution;
  };

  if (loading) {
    return (
      <div className="container py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Customer Reviews</h1>
        <p className="text-muted-foreground">Read what our customers say about their salon experiences</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Reviews Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Reviews Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{getAverageRating()}</div>
                <div className="flex justify-center mb-2">
                  {renderStars(Math.round(parseFloat(getAverageRating())))}
                </div>
                <div className="text-sm text-muted-foreground">
                  Based on {reviews.length} reviews
                </div>
              </div>

              <div className="space-y-3">
                {Object.entries(getRatingDistribution()).reverse().map(([rating, count]) => (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="text-sm w-8">{rating}★</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: `${(count / reviews.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-8">{count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All Reviews</TabsTrigger>
              <TabsTrigger value="verified">Verified Reviews</TabsTrigger>
              <TabsTrigger value="recent">Recent Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              {/* Search and Filter Controls */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search reviews..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={filterRating} onValueChange={setFilterRating}>
                      <SelectTrigger className="w-full md:w-48">
                        <SelectValue placeholder="Filter by rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Ratings</SelectItem>
                        <SelectItem value="5">5 Stars</SelectItem>
                        <SelectItem value="4">4 Stars</SelectItem>
                        <SelectItem value="3">3 Stars</SelectItem>
                        <SelectItem value="2">2 Stars</SelectItem>
                        <SelectItem value="1">1 Star</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={filterSalon} onValueChange={setFilterSalon}>
                      <SelectTrigger className="w-full md:w-48">
                        <SelectValue placeholder="Filter by salon" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Salons</SelectItem>
                        {getUniqueSalons().map((salon) => (
                          <SelectItem key={salon} value={salon}>
                            {salon}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-full md:w-48">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="highest_rating">Highest Rating</SelectItem>
                        <SelectItem value="lowest_rating">Lowest Rating</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Reviews List */}
              <div className="space-y-6">
                {getFilteredReviews().map((review, index) => (
                  <motion.div
                    key={review.review_id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{review.customer_name}</h3>
                                {review.is_verified && (
                                  <Badge variant="secondary" className="text-xs">
                                    Verified
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>{review.salon_name}</span>
                                <span>•</span>
                                <span>{review.service_name}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 mb-1">
                              {renderStars(review.rating)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(review.review_date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-relaxed mb-4">{review.comment}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <Button variant="ghost" size="sm" className="h-8">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            Helpful
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Reply
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}

                {getFilteredReviews().length === 0 && (
                  <Card>
                    <CardContent className="text-center py-16">
                      <div className="text-6xl mb-4">📝</div>
                      <h3 className="text-xl font-semibold mb-2">No reviews found</h3>
                      <p className="text-muted-foreground">
                        Try adjusting your search criteria or check back later for new reviews.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="verified" className="space-y-6">
              <div className="space-y-6">
                {getFilteredReviews()
                  .filter(review => review.is_verified)
                  .map((review, index) => (
                    <motion.div
                      key={review.review_id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <User className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold">{review.customer_name}</h3>
                                  <Badge variant="secondary" className="text-xs">
                                    Verified
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <span>{review.salon_name}</span>
                                  <span>•</span>
                                  <span>{review.service_name}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1 mb-1">
                                {renderStars(review.rating)}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {new Date(review.review_date).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm leading-relaxed">{review.comment}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="recent" className="space-y-6">
              <div className="space-y-6">
                {getFilteredReviews()
                  .slice(0, 5)
                  .map((review, index) => (
                    <motion.div
                      key={review.review_id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <User className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold">{review.customer_name}</h3>
                                  {review.is_verified && (
                                    <Badge variant="secondary" className="text-xs">
                                      Verified
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <span>{review.salon_name}</span>
                                  <span>•</span>
                                  <span>{review.service_name}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1 mb-1">
                                {renderStars(review.rating)}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {new Date(review.review_date).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm leading-relaxed">{review.comment}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
