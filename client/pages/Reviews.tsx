import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Search, ThumbsUp, MessageSquare, Calendar, User, Sparkles, Heart, MapPin, Scissors } from "lucide-react";
import { Review } from "@shared/api";

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState<string>("all");
  const [filterSalon, setFilterSalon] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [activeTab, setActiveTab] = useState("all");
  const [likedReviews, setLikedReviews] = useState<Set<string>>(new Set());
  const [replies, setReplies] = useState<{[key: string]: string[]}>({});

  useEffect(() => {
    setTimeout(() => {
      setReviews([
        {
          id: "1",
          bookingId: "b1",
          userId: "u1",
          salonId: "s1",
          rating: 5,
          comment: "Absolutely incredible experience! The stylist was incredibly skilled and took time to understand exactly what I wanted. The salon is pristine, modern, and the staff made me feel like royalty. Highly recommend!",
          isVerified: true,
          isVisible: true,
          createdAt: new Date("2024-01-20"),
          updatedAt: new Date("2024-01-20"),
          user: {
            id: "u1",
            email: "john@example.com",
            firstName: "John",
            lastName: "Doe",
            role: "CUSTOMER",
            emailVerified: true,
            phoneVerified: true,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          salon: {
            id: "s1",
            name: "Style Studio",
            slug: "style-studio",
            description: "Luxury beauty salon offering complete beauty solutions and wellness treatments",
            ownerId: "o1",
            email: "hello@stylestudio.com",
            phone: "+91 98765 43211",
            address: "Sector 18, Noida",
            city: "Noida",
            state: "Uttar Pradesh",
            pincode: "201301",
            isActive: true,
            isVerified: true,
            acceptsOnlinePayment: true,
            instantBooking: true,
            openingTime: "10:00",
            closingTime: "20:00",
            workingDays: [1, 2, 3, 4, 5, 6],
            averageRating: 4.8,
            totalReviews: 98,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          booking: {
            id: "b1",
            bookingNumber: "BML-20240120-001",
            userId: "u1",
            salonId: "s1",
            serviceId: "srv1",
            appointmentDate: new Date("2024-01-20"),
            appointmentTime: "14:00",
            endTime: "15:30",
            servicePrice: 800,
            discount: 0,
            tax: 144,
            totalAmount: 944,
            depositAmount: 200,
            status: "COMPLETED",
            paymentStatus: "PAID",
            customerName: "John Doe",
            customerPhone: "+91 9876543210",
            customerEmail: "john@example.com",
            createdAt: new Date("2024-01-20"),
            updatedAt: new Date("2024-01-20"),
            service: {
              id: "srv1",
              salonId: "s1",
              name: "Haircut & Styling",
              description: "Professional haircut with modern styling techniques",
              categoryId: "cat1",
              price: 800,
              durationMinutes: 90,
              isActive: true,
              requiresDeposit: false,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          },
        },
        {
          id: "2",
          bookingId: "b2",
          userId: "u2",
          salonId: "s2",
          rating: 4,
          comment: "Great service overall! The facial was very relaxing and the therapist was professional. Only minor issue was a slight delay in appointment time, but they were very apologetic. Clean facility and good ambiance.",
          isVerified: true,
          isVisible: true,
          createdAt: new Date("2024-01-18"),
          updatedAt: new Date("2024-01-18"),
          user: {
            id: "u2",
            email: "sarah@example.com",
            firstName: "Sarah",
            lastName: "Wilson",
            role: "CUSTOMER",
            emailVerified: true,
            phoneVerified: true,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          salon: {
            id: "s2",
            name: "Beauty Bliss",
            slug: "beauty-bliss",
            description: "Premium beauty and wellness center with expert therapists",
            ownerId: "o2",
            email: "info@beautybliss.com",
            phone: "+91 98765 43222",
            address: "Connaught Place, Delhi",
            city: "Delhi",
            state: "Delhi",
            pincode: "110001",
            isActive: true,
            isVerified: true,
            acceptsOnlinePayment: true,
            instantBooking: true,
            openingTime: "09:00",
            closingTime: "21:00",
            workingDays: [1, 2, 3, 4, 5, 6, 7],
            averageRating: 4.6,
            totalReviews: 156,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          booking: {
            id: "b2",
            bookingNumber: "BML-20240118-002",
            userId: "u2",
            salonId: "s2",
            serviceId: "srv2",
            appointmentDate: new Date("2024-01-18"),
            appointmentTime: "16:00",
            endTime: "17:30",
            servicePrice: 1200,
            discount: 120,
            tax: 216,
            totalAmount: 1296,
            depositAmount: 300,
            status: "COMPLETED",
            paymentStatus: "PAID",
            customerName: "Sarah Wilson",
            customerPhone: "+91 9876543211",
            customerEmail: "sarah@example.com",
            createdAt: new Date("2024-01-18"),
            updatedAt: new Date("2024-01-18"),
            service: {
              id: "srv2",
              salonId: "s2",
              name: "Hydrating Facial",
              description: "Deep cleansing facial with hydration and anti-aging benefits",
              categoryId: "cat2",
              price: 1200,
              durationMinutes: 90,
              isActive: true,
              requiresDeposit: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          },
        },
        {
          id: "3",
          bookingId: "b3",
          userId: "u3",
          salonId: "s1",
          rating: 5,
          comment: "Outstanding manicure and pedicure experience! The nail artist was incredibly talented and paid great attention to detail. The salon uses high-quality products and the results lasted for weeks. Will definitely be back!",
          isVerified: false,
          isVisible: true,
          createdAt: new Date("2024-01-15"),
          updatedAt: new Date("2024-01-15"),
          user: {
            id: "u3",
            email: "emma@example.com",
            firstName: "Emma",
            lastName: "Thompson",
            role: "CUSTOMER",
            emailVerified: true,
            phoneVerified: false,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          salon: {
            id: "s1",
            name: "Style Studio",
            slug: "style-studio",
            description: "Luxury beauty salon offering complete beauty solutions and wellness treatments",
            ownerId: "o1",
            email: "hello@stylestudio.com",
            phone: "+91 98765 43211",
            address: "Sector 18, Noida",
            city: "Noida",
            state: "Uttar Pradesh",
            pincode: "201301",
            isActive: true,
            isVerified: true,
            acceptsOnlinePayment: true,
            instantBooking: true,
            openingTime: "10:00",
            closingTime: "20:00",
            workingDays: [1, 2, 3, 4, 5, 6],
            averageRating: 4.8,
            totalReviews: 98,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          booking: {
            id: "b3",
            bookingNumber: "BML-20240115-003",
            userId: "u3",
            salonId: "s1",
            serviceId: "srv3",
            appointmentDate: new Date("2024-01-15"),
            appointmentTime: "11:00",
            endTime: "12:30",
            servicePrice: 600,
            discount: 0,
            tax: 108,
            totalAmount: 708,
            depositAmount: 150,
            status: "COMPLETED",
            paymentStatus: "PAID",
            customerName: "Emma Thompson",
            customerPhone: "+91 9876543212",
            customerEmail: "emma@example.com",
            createdAt: new Date("2024-01-15"),
            updatedAt: new Date("2024-01-15"),
            service: {
              id: "srv3",
              salonId: "s1",
              name: "Manicure & Pedicure",
              description: "Complete nail care service with gel polish application",
              categoryId: "cat3",
              price: 600,
              durationMinutes: 90,
              isActive: true,
              requiresDeposit: false,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          },
        },
        {
          id: "4",
          bookingId: "b4",
          userId: "u4",
          salonId: "s3",
          rating: 3,
          comment: "Decent haircut but nothing exceptional. The stylist seemed rushed and didn't really consult me about my preferences. The salon is nice and clean though. Average experience overall.",
          isVerified: true,
          isVisible: true,
          createdAt: new Date("2024-01-12"),
          updatedAt: new Date("2024-01-12"),
          user: {
            id: "u4",
            email: "mike@example.com",
            firstName: "Mike",
            lastName: "Johnson",
            role: "CUSTOMER",
            emailVerified: true,
            phoneVerified: true,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          salon: {
            id: "s3",
            name: "Glamour Hub",
            slug: "glamour-hub",
            description: "Contemporary salon specializing in modern cuts and styling",
            ownerId: "o3",
            email: "contact@glamourhub.com",
            phone: "+91 98765 43233",
            address: "DLF Phase 3, Gurgaon",
            city: "Gurgaon",
            state: "Haryana",
            pincode: "122002",
            isActive: true,
            isVerified: true,
            acceptsOnlinePayment: true,
            instantBooking: false,
            openingTime: "10:00",
            closingTime: "19:00",
            workingDays: [1, 2, 3, 4, 5, 6],
            averageRating: 4.2,
            totalReviews: 89,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          booking: {
            id: "b4",
            bookingNumber: "BML-20240112-004",
            userId: "u4",
            salonId: "s3",
            serviceId: "srv4",
            appointmentDate: new Date("2024-01-12"),
            appointmentTime: "13:00",
            endTime: "14:00",
            servicePrice: 500,
            discount: 50,
            tax: 81,
            totalAmount: 531,
            depositAmount: 100,
            status: "COMPLETED",
            paymentStatus: "PAID",
            customerName: "Mike Johnson",
            customerPhone: "+91 9876543213",
            customerEmail: "mike@example.com",
            createdAt: new Date("2024-01-12"),
            updatedAt: new Date("2024-01-12"),
            service: {
              id: "srv4",
              salonId: "s3",
              name: "Gentlemen's Haircut",
              description: "Classic men's haircut with precision styling",
              categoryId: "cat1",
              price: 500,
              durationMinutes: 60,
              isActive: true,
              requiresDeposit: false,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          },
        },
        {
          id: "5",
          bookingId: "b5",
          userId: "u5",
          salonId: "s4",
          rating: 5,
          comment: "Absolutely amazing bridal makeup! The makeup artist was an artist herself. The makeup looked flawless, lasted all day through photos and reception, and I received so many compliments. Highly recommend for any special occasion!",
          isVerified: true,
          isVisible: true,
          createdAt: new Date("2024-01-10"),
          updatedAt: new Date("2024-01-10"),
          user: {
            id: "u5",
            email: "priya@example.com",
            firstName: "Priya",
            lastName: "Sharma",
            role: "CUSTOMER",
            emailVerified: true,
            phoneVerified: true,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          salon: {
            id: "s4",
            name: "Bridal Beauty",
            slug: "bridal-beauty",
            description: "Specialized in bridal and special occasion makeup and hairstyling",
            ownerId: "o4",
            email: "bridal@bridalbeauty.com",
            phone: "+91 98765 43244",
            address: "Rajouri Garden, Delhi",
            city: "Delhi",
            state: "Delhi",
            pincode: "110027",
            isActive: true,
            isVerified: true,
            acceptsOnlinePayment: true,
            instantBooking: false,
            openingTime: "08:00",
            closingTime: "22:00",
            workingDays: [1, 2, 3, 4, 5, 6, 7],
            averageRating: 4.9,
            totalReviews: 203,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          booking: {
            id: "b5",
            bookingNumber: "BML-20240110-005",
            userId: "u5",
            salonId: "s4",
            serviceId: "srv5",
            appointmentDate: new Date("2024-01-10"),
            appointmentTime: "09:00",
            endTime: "12:00",
            servicePrice: 2500,
            discount: 250,
            tax: 405,
            totalAmount: 2655,
            depositAmount: 500,
            status: "COMPLETED",
            paymentStatus: "PAID",
            customerName: "Priya Sharma",
            customerPhone: "+91 9876543214",
            customerEmail: "priya@example.com",
            createdAt: new Date("2024-01-10"),
            updatedAt: new Date("2024-01-10"),
            service: {
              id: "srv5",
              salonId: "s4",
              name: "Bridal Makeup",
              description: "Complete bridal makeup with airbrush technique and long-lasting products",
              categoryId: "cat4",
              price: 2500,
              durationMinutes: 180,
              isActive: true,
              requiresDeposit: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          },
        },
        {
          id: "6",
          bookingId: "b6",
          userId: "u6",
          salonId: "s2",
          rating: 4,
          comment: "Very relaxing massage experience. The therapist was skilled and the ambiance was perfect. The only thing that could be improved is the music volume - it was a bit loud. Overall, great value for money!",
          isVerified: false,
          isVisible: true,
          createdAt: new Date("2024-01-08"),
          updatedAt: new Date("2024-01-08"),
          user: {
            id: "u6",
            email: "rahul@example.com",
            firstName: "Rahul",
            lastName: "Verma",
            role: "CUSTOMER",
            emailVerified: true,
            phoneVerified: false,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          salon: {
            id: "s2",
            name: "Beauty Bliss",
            slug: "beauty-bliss",
            description: "Premium beauty and wellness center with expert therapists",
            ownerId: "o2",
            email: "info@beautybliss.com",
            phone: "+91 98765 43222",
            address: "Connaught Place, Delhi",
            city: "Delhi",
            state: "Delhi",
            pincode: "110001",
            isActive: true,
            isVerified: true,
            acceptsOnlinePayment: true,
            instantBooking: true,
            openingTime: "09:00",
            closingTime: "21:00",
            workingDays: [1, 2, 3, 4, 5, 6, 7],
            averageRating: 4.6,
            totalReviews: 156,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          booking: {
            id: "b6",
            bookingNumber: "BML-20240108-006",
            userId: "u6",
            salonId: "s2",
            serviceId: "srv6",
            appointmentDate: new Date("2024-01-08"),
            appointmentTime: "18:00",
            endTime: "19:30",
            servicePrice: 1000,
            discount: 100,
            tax: 162,
            totalAmount: 1062,
            depositAmount: 200,
            status: "COMPLETED",
            paymentStatus: "PAID",
            customerName: "Rahul Verma",
            customerPhone: "+91 9876543215",
            customerEmail: "rahul@example.com",
            createdAt: new Date("2024-01-08"),
            updatedAt: new Date("2024-01-08"),
            service: {
              id: "srv6",
              salonId: "s2",
              name: "Swedish Massage",
              description: "Full body relaxation massage using Swedish techniques",
              categoryId: "cat5",
              price: 1000,
              durationMinutes: 90,
              isActive: true,
              requiresDeposit: false,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          },
        },
        {
          id: "7",
          bookingId: "b7",
          userId: "u7",
          salonId: "s5",
          rating: 2,
          comment: "Disappointing experience. The stylist was late, seemed disinterested, and the haircut was uneven. When I pointed it out, they were defensive rather than apologetic. Won't be returning to this salon.",
          isVerified: true,
          isVisible: true,
          createdAt: new Date("2024-01-05"),
          updatedAt: new Date("2024-01-05"),
          user: {
            id: "u7",
            email: "alex@example.com",
            firstName: "Alex",
            lastName: "Brown",
            role: "CUSTOMER",
            emailVerified: true,
            phoneVerified: true,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          salon: {
            id: "s5",
            name: "Quick Cuts",
            slug: "quick-cuts",
            description: "Affordable and quick hair services for busy professionals",
            ownerId: "o5",
            email: "cuts@quickcuts.com",
            phone: "+91 98765 43255",
            address: "Karol Bagh, Delhi",
            city: "Delhi",
            state: "Delhi",
            pincode: "110005",
            isActive: true,
            isVerified: false,
            acceptsOnlinePayment: false,
            instantBooking: true,
            openingTime: "08:00",
            closingTime: "20:00",
            workingDays: [1, 2, 3, 4, 5, 6, 7],
            averageRating: 3.5,
            totalReviews: 67,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          booking: {
            id: "b7",
            bookingNumber: "BML-20240105-007",
            userId: "u7",
            salonId: "s5",
            serviceId: "srv7",
            appointmentDate: new Date("2024-01-05"),
            appointmentTime: "17:00",
            endTime: "17:45",
            servicePrice: 300,
            discount: 0,
            tax: 54,
            totalAmount: 354,
            depositAmount: 0,
            status: "COMPLETED",
            paymentStatus: "PAID",
            customerName: "Alex Brown",
            customerPhone: "+91 9876543216",
            customerEmail: "alex@example.com",
            createdAt: new Date("2024-01-05"),
            updatedAt: new Date("2024-01-05"),
            service: {
              id: "srv7",
              salonId: "s5",
              name: "Basic Haircut",
              description: "Simple haircut service for basic styling needs",
              categoryId: "cat1",
              price: 300,
              durationMinutes: 45,
              isActive: true,
              requiresDeposit: false,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          },
        },
        {
          id: "8",
          bookingId: "b8",
          userId: "u8",
          salonId: "s1",
          rating: 5,
          comment: "Exceptional hair coloring service! The colorist was extremely knowledgeable and helped me choose the perfect shade. The result was exactly what I wanted and the color is still vibrant after weeks. Professional and friendly staff throughout.",
          isVerified: true,
          isVisible: true,
          createdAt: new Date("2024-01-03"),
          updatedAt: new Date("2024-01-03"),
          user: {
            id: "u8",
            email: "lisa@example.com",
            firstName: "Lisa",
            lastName: "Garcia",
            role: "CUSTOMER",
            emailVerified: true,
            phoneVerified: true,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          salon: {
            id: "s1",
            name: "Style Studio",
            slug: "style-studio",
            description: "Luxury beauty salon offering complete beauty solutions and wellness treatments",
            ownerId: "o1",
            email: "hello@stylestudio.com",
            phone: "+91 98765 43211",
            address: "Sector 18, Noida",
            city: "Noida",
            state: "Uttar Pradesh",
            pincode: "201301",
            isActive: true,
            isVerified: true,
            acceptsOnlinePayment: true,
            instantBooking: true,
            openingTime: "10:00",
            closingTime: "20:00",
            workingDays: [1, 2, 3, 4, 5, 6],
            averageRating: 4.8,
            totalReviews: 98,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          booking: {
            id: "b8",
            bookingNumber: "BML-20240103-008",
            userId: "u8",
            salonId: "s1",
            serviceId: "srv8",
            appointmentDate: new Date("2024-01-03"),
            appointmentTime: "10:00",
            endTime: "12:00",
            servicePrice: 1500,
            discount: 150,
            tax: 243,
            totalAmount: 1593,
            depositAmount: 300,
            status: "COMPLETED",
            paymentStatus: "PAID",
            customerName: "Lisa Garcia",
            customerPhone: "+91 9876543217",
            customerEmail: "lisa@example.com",
            createdAt: new Date("2024-01-03"),
            updatedAt: new Date("2024-01-03"),
            service: {
              id: "srv8",
              salonId: "s1",
              name: "Hair Coloring",
              description: "Professional hair coloring with premium products",
              categoryId: "cat6",
              price: 1500,
              durationMinutes: 120,
              isActive: true,
              requiresDeposit: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          },
        },
        {
          id: "9",
          bookingId: "b9",
          userId: "u9",
          salonId: "s3",
          rating: 4,
          comment: "Good threading service. The technician was quick and efficient. A bit painful as expected, but they were gentle and professional. Clean environment and reasonable pricing. Would recommend for eyebrow threading.",
          isVerified: false,
          isVisible: true,
          createdAt: new Date("2024-01-01"),
          updatedAt: new Date("2024-01-01"),
          user: {
            id: "u9",
            email: "anjali@example.com",
            firstName: "Anjali",
            lastName: "Patel",
            role: "CUSTOMER",
            emailVerified: true,
            phoneVerified: false,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          salon: {
            id: "s3",
            name: "Glamour Hub",
            slug: "glamour-hub",
            description: "Contemporary salon specializing in modern cuts and styling",
            ownerId: "o3",
            email: "contact@glamourhub.com",
            phone: "+91 98765 43233",
            address: "DLF Phase 3, Gurgaon",
            city: "Gurgaon",
            state: "Haryana",
            pincode: "122002",
            isActive: true,
            isVerified: true,
            acceptsOnlinePayment: true,
            instantBooking: false,
            openingTime: "10:00",
            closingTime: "19:00",
            workingDays: [1, 2, 3, 4, 5, 6],
            averageRating: 4.2,
            totalReviews: 89,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          booking: {
            id: "b9",
            bookingNumber: "BML-20240101-009",
            userId: "u9",
            salonId: "s3",
            serviceId: "srv9",
            appointmentDate: new Date("2024-01-01"),
            appointmentTime: "15:00",
            endTime: "15:30",
            servicePrice: 200,
            discount: 20,
            tax: 32.4,
            totalAmount: 212.4,
            depositAmount: 0,
            status: "COMPLETED",
            paymentStatus: "PAID",
            customerName: "Anjali Patel",
            customerPhone: "+91 9876543218",
            customerEmail: "anjali@example.com",
            createdAt: new Date("2024-01-01"),
            updatedAt: new Date("2024-01-01"),
            service: {
              id: "srv9",
              salonId: "s3",
              name: "Eyebrow Threading",
              description: "Precise eyebrow shaping using traditional threading technique",
              categoryId: "cat7",
              price: 200,
              durationMinutes: 30,
              isActive: true,
              requiresDeposit: false,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          },
        },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <motion.div
        key={i}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
      >
        <Star
          className={`h-4 w-4 ${
            i < rating
              ? "fill-yellow-400 text-yellow-400 drop-shadow-sm"
              : "text-gray-300"
          }`}
        />
      </motion.div>
    ));
  };

  const getFilteredReviews = () => {
    let filtered = [...reviews];

    if (searchTerm) {
      filtered = filtered.filter(
        (review) =>
          review.salon?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          review.booking?.service?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
          `${review.user?.firstName || ""} ${review.user?.lastName || ""}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    if (filterRating !== "all") {
      const rating = parseInt(filterRating);
      filtered = filtered.filter((review) => review.rating === rating);
    }

    if (filterSalon !== "all") {
      filtered = filtered.filter((review) => review.salon?.name === filterSalon);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
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

  const getUniqueSalons = useMemo(() => {
    return [...new Set(reviews.map(review => review.salon?.name || '').filter(Boolean))];
  }, [reviews]);

  const getAverageRating = useMemo(() => {
    if (reviews.length === 0) return "0.0";
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  }, [reviews]);

  const toggleLike = (reviewId: string) => {
    setLikedReviews(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  const getTabContent = () => {
    switch (activeTab) {
      case "verified":
        return getFilteredReviews().filter(review => review.isVerified);
      case "recent":
        return getFilteredReviews().slice(0, 5);
      default:
        return getFilteredReviews();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-slate-800 mt-4"
        >
          Loading Reviews...
        </motion.h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.08%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-60" />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center py-20 px-4"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent leading-tight mb-6"
          >
            What Our Customers
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Are Saying
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12"
          >
            Discover authentic reviews from real customers about their salon experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-8 mt-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20"
            >
              <motion.div
                className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
              >
                {getAverageRating}★
              </motion.div>
              <div className="text-sm text-slate-600 font-medium">Average Rating</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20"
            >
              <motion.div
                className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
              >
                {reviews.length}+
              </motion.div>
              <div className="text-sm text-slate-600 font-medium">Total Reviews</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20"
            >
              <motion.div
                className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
              >
                {Math.round((reviews.filter(r => r.isVerified).length / reviews.length) * 100)}%
              </motion.div>
              <div className="text-sm text-slate-600 font-medium">Verified Reviews</div>
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="container mx-auto px-4 pb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-12"
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-2xl">
              <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-white/90 via-slate-50/90 to-white/90 backdrop-blur-xl p-2 rounded-3xl shadow-2xl border-2 border-white/50 hover:border-white/70 transition-all duration-500">
                <TabsTrigger
                  value="all"
                  className="rounded-2xl font-bold text-slate-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-2xl transition-all duration-500 py-3 text-base relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-500/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    📝 All Reviews
                    <motion.span
                      className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                    >
                      {getFilteredReviews().length}
                    </motion.span>
                  </span>
                </TabsTrigger>

                <TabsTrigger
                  value="verified"
                  className="rounded-2xl font-bold text-slate-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-2xl transition-all duration-500 py-3 text-base relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-500/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    ✅ Verified
                    <motion.span
                      className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6, type: "spring" }}
                    >
                      {getFilteredReviews().filter((r) => r.isVerified).length}
                    </motion.span>
                  </span>
                </TabsTrigger>

                <TabsTrigger
                  value="recent"
                  className="rounded-2xl font-bold text-slate-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-2xl transition-all duration-500 py-3 text-base relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-500/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    🕒 Recent
                    <motion.span
                      className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.7, type: "spring" }}
                    >
                      {Math.min(5, getFilteredReviews().length)}
                    </motion.span>
                  </span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-white/95 via-slate-50/95 to-white/95 backdrop-blur-2xl ring-1 ring-white/50 hover:ring-white/70 overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-lg opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="relative flex-1 group">
                        <motion.div
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-300"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Search className="h-5 w-5" />
                        </motion.div>
                        <Input
                          placeholder="Search reviews, customers, salons..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-12 h-14 border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 bg-white/90 backdrop-blur-sm text-slate-800 placeholder:text-slate-400 transition-all duration-300 rounded-xl shadow-lg"
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <Select value={filterRating} onValueChange={setFilterRating}>
                          <SelectTrigger className="h-14 border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 bg-white/90 backdrop-blur-sm text-slate-800 transition-all duration-300 rounded-xl shadow-lg">
                            <SelectValue placeholder="Filter by rating" />
                          </SelectTrigger>
                          <SelectContent className="bg-white/95 backdrop-blur-2xl border-slate-200 rounded-xl shadow-2xl">
                            <SelectItem value="all" className="hover:bg-blue-50 rounded-lg">All Ratings</SelectItem>
                            <SelectItem value="5" className="hover:bg-blue-50 rounded-lg">⭐ 5 Stars</SelectItem>
                            <SelectItem value="4" className="hover:bg-blue-50 rounded-lg">⭐ 4 Stars</SelectItem>
                            <SelectItem value="3" className="hover:bg-blue-50 rounded-lg">⭐ 3 Stars</SelectItem>
                            <SelectItem value="2" className="hover:bg-blue-50 rounded-lg">⭐ 2 Stars</SelectItem>
                            <SelectItem value="1" className="hover:bg-blue-50 rounded-lg">⭐ 1 Star</SelectItem>
                          </SelectContent>
                        </Select>

                        <Select value={filterSalon} onValueChange={setFilterSalon}>
                          <SelectTrigger className="h-14 border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 bg-white/90 backdrop-blur-sm text-slate-800 transition-all duration-300 rounded-xl shadow-lg">
                            <SelectValue placeholder="Filter by salon" />
                          </SelectTrigger>
                          <SelectContent className="bg-white/95 backdrop-blur-2xl border-slate-200 rounded-xl shadow-2xl">
                            <SelectItem value="all" className="hover:bg-blue-50 rounded-lg">All Salons</SelectItem>
                            {getUniqueSalons.map((salon) => (
                              <SelectItem key={salon} value={salon} className="hover:bg-blue-50 rounded-lg">
                                🏪 {salon}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Select value={sortBy} onValueChange={setSortBy}>
                          <SelectTrigger className="h-14 border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 bg-white/90 backdrop-blur-sm text-slate-800 transition-all duration-300 rounded-xl shadow-lg">
                            <SelectValue placeholder="Sort by" />
                          </SelectTrigger>
                          <SelectContent className="bg-white/95 backdrop-blur-2xl border-slate-200 rounded-xl shadow-2xl">
                            <SelectItem value="newest" className="hover:bg-blue-50 rounded-lg">🕒 Newest First</SelectItem>
                            <SelectItem value="oldest" className="hover:bg-blue-50 rounded-lg">📅 Oldest First</SelectItem>
                            <SelectItem value="highest_rating" className="hover:bg-blue-50 rounded-lg">⭐ Highest Rating</SelectItem>
                            <SelectItem value="lowest_rating" className="hover:bg-blue-50 rounded-lg">📉 Lowest Rating</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <div className="space-y-6">
                <AnimatePresence>
                  {getTabContent().length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="text-center py-20"
                    >
                      <Card className="max-w-lg mx-auto shadow-2xl border-0 bg-gradient-to-br from-white/95 via-slate-50/95 to-white/95 backdrop-blur-2xl ring-1 ring-white/50">
                        <CardContent className="text-center py-16 px-8">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="text-7xl mb-6"
                          >
                            🔍
                          </motion.div>
                          <motion.h3
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-2xl font-bold text-slate-800 mb-4"
                          >
                            No reviews found
                          </motion.h3>
                          <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-slate-600 mb-8 leading-relaxed"
                          >
                            Try adjusting your search criteria or filters to find more reviews.
                          </motion.p>
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                          >
                            <button
                              onClick={() => {
                                setSearchTerm("");
                                setFilterRating("all");
                                setFilterSalon("all");
                                setSortBy("newest");
                              }}
                              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 rounded-xl px-8 py-3 border-none cursor-pointer"
                            >
                              Clear Filters
                            </button>
                          </motion.div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ) : (
                    getTabContent().map((review, index) => (
                      <motion.div
                        key={review.id}
                        layout
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -30, scale: 0.95 }}
                        transition={{
                          delay: index * 0.1,
                          type: "spring",
                          stiffness: 100,
                          damping: 20
                        }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="group"
                      >
                        <Card className="shadow-2xl border-0 bg-gradient-to-br from-white/95 via-slate-50/95 to-white/95 backdrop-blur-2xl hover:shadow-3xl transition-all duration-700 overflow-hidden ring-1 ring-white/50 hover:ring-white/70">
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-xl opacity-0"
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.4 }}
                          />

                          <CardHeader className="relative bg-gradient-to-r from-white/80 via-blue-50/50 to-purple-50/50 border-b border-white/60">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-6">
                                <motion.div
                                  whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                                  transition={{ duration: 0.6 }}
                                  className="relative"
                                >
                                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl ring-4 ring-white/50">
                                    <User className="h-8 w-8 text-white" />
                                  </div>
                                  {review.isVerified && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{ delay: 0.5, type: "spring" }}
                                      className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg"
                                    >
                                      <span className="text-white text-xs font-bold">✓</span>
                                    </motion.div>
                                  )}
                                </motion.div>

                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <motion.h3
                                      className="text-xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors duration-300"
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.2 }}
                                    >
                                      {`${review.user?.firstName || ''} ${review.user?.lastName || ''}`.trim() || 'Anonymous'}
                                    </motion.h3>
                                    {review.isVerified && (
                                      <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-bold rounded-full shadow-lg"
                                      >
                                        ✓ Verified
                                      </motion.div>
                                    )}
                                  </div>

                                  <motion.div
                                    className="flex items-center gap-4 text-sm text-slate-600 mb-3"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                  >
                                    <span className="flex items-center gap-1">
                                      <MapPin className="h-4 w-4" />
                                      {review.salon?.name || 'Unknown Salon'}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Scissors className="h-4 w-4" />
                                      {review.booking?.service?.name || 'Unknown Service'}
                                    </span>
                                  </motion.div>
                                </div>
                              </div>

                              <div className="text-right">
                                <motion.div
                                  className="flex items-center gap-1 mb-3"
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.4, type: "spring" }}
                                >
                                  {renderStars(review.rating)}
                                </motion.div>
                                <motion.div
                                  className="text-sm text-slate-600 font-medium flex items-center gap-1"
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.5 }}
                                >
                                  <Calendar className="h-3 w-3" />
                                  {new Date(review.createdAt).toLocaleDateString()}
                                </motion.div>
                              </div>
                            </div>
                          </CardHeader>

                          <CardContent className="p-8">
                            <motion.p
                              className="text-slate-700 leading-relaxed mb-8 text-base group-hover:text-slate-800 transition-colors duration-300"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.6 }}
                            >
                              "{review.comment}"
                            </motion.p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                  <button
                                    onClick={() => toggleLike(review.id)}
                                    className={`font-medium transition-all duration-300 rounded-xl px-4 py-2 border-none bg-transparent cursor-pointer ${
                                      likedReviews.has(review.id)
                                        ? 'text-red-600 bg-red-50 hover:bg-red-100'
                                        : 'text-slate-600 hover:text-red-600 hover:bg-red-50'
                                    }`}
                                  >
                                    <motion.div
                                      animate={{ scale: likedReviews.has(review.id) ? [1, 1.3, 1] : 1 }}
                                      transition={{ duration: 0.3 }}
                                      className="flex items-center gap-2"
                                    >
                                      <Heart className={`h-4 w-4 ${likedReviews.has(review.id) ? 'fill-current' : ''}`} />
                                      <span>Helpful ({likedReviews.has(review.id) ? '1' : '0'})</span>
                                    </motion.div>
                                  </button>
                                </motion.div>

                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                  <button
                                    onClick={() => {
                                      const reply = prompt(`Reply to ${review.user?.firstName || 'Customer'}:`, '');
                                      if (reply && reply.trim()) {
                                        setReplies(prev => ({
                                          ...prev,
                                          [review.id]: [...(prev[review.id] || []), reply.trim()]
                                        }));
                                        alert('Reply sent successfully!');
                                      }
                                    }}
                                    className="font-medium transition-all duration-300 rounded-xl px-4 py-2 border-none bg-transparent cursor-pointer text-slate-600 hover:text-purple-600 hover:bg-purple-50 flex items-center gap-2"
                                  >
                                    <MessageSquare className="h-4 w-4" />
                                    <span>Reply ({replies[review.id]?.length || 0})</span>
                                  </button>
                                </motion.div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
        className="absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full blur-2xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ delay: 2, type: "spring" }}
        className="absolute -bottom-16 -left-16 w-40 h-40 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full blur-2xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.08, scale: 1 }}
        transition={{ delay: 2.5, type: "spring" }}
        className="absolute top-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full blur-xl"
      />
    </div>
  );
}
