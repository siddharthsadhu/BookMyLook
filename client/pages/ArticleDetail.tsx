import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Eye, BookOpen } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function ArticleDetail() {
  const { id } = useParams();

  // Mock article data based on ID
  const articles = {
    "1": {
      id: 1,
      title: "Getting Started with BookMyLook",
      category: "Getting Started",
      lastUpdated: "2024-01-15",
      views: 1250,
      readTime: "5 min read",
      author: "BookMyLook Team",
      content: `
        <h2>Welcome to BookMyLook!</h2>
        <p>BookMyLook is your ultimate salon booking companion, designed to make finding and booking beauty services effortless. Whether you're a customer looking for the perfect haircut or a salon owner managing appointments, BookMyLook has everything you need.</p>

        <h3>Why Choose BookMyLook?</h3>
        <ul>
          <li><strong>Real-Time Queue Management:</strong> Know exactly when your turn is coming with live queue updates</li>
          <li><strong>AI-Powered Recommendations:</strong> Get personalized suggestions based on your preferences</li>
          <li><strong>Secure Payments:</strong> Multiple payment options with bank-grade security</li>
          <li><strong>24/7 Support:</strong> Our team is always here to help</li>
        </ul>

        <h3>Creating Your Account</h3>
        <p>Getting started is easy! Simply:</p>
        <ol>
          <li>Click "Sign Up" in the top navigation</li>
          <li>Enter your email and create a password</li>
          <li>Verify your email address</li>
          <li>Complete your profile with your preferences</li>
        </ol>

        <h3>Finding and Booking Services</h3>
        <p>Browse salons by location, service type, or rating. Each salon profile shows:</p>
        <ul>
          <li>Service menu with prices</li>
          <li>Customer reviews and ratings</li>
          <li>Current queue status</li>
          <li>Estimated wait times</li>
        </ul>

        <h3>Managing Your Bookings</h3>
        <p>Access your dashboard to:</p>
        <ul>
          <li>View upcoming appointments</li>
          <li>Reschedule or cancel bookings</li>
          <li>Track your booking history</li>
          <li>Manage payment methods</li>
        </ul>

        <h3>Getting Help</h3>
        <p>If you need assistance, you can:</p>
        <ul>
          <li>Visit our Help Center</li>
          <li>Contact support via chat or email</li>
          <li>Check our FAQ section</li>
          <li>Read our comprehensive guides</li>
        </ul>

        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h4 style="color: #0369a1; margin-top: 0;">💡 Pro Tip</h4>
          <p style="margin-bottom: 0;">Enable push notifications to get real-time updates about your queue position and appointment reminders!</p>
        </div>
      `,
      relatedArticles: [
        { id: 2, title: "Understanding Queue Management", category: "Features" },
        { id: 3, title: "Payment and Billing Guide", category: "Payment" },
        { id: 4, title: "Salon Owner Dashboard Guide", category: "For Salon Owners" }
      ]
    },
    "2": {
      id: 2,
      title: "Understanding Queue Management",
      category: "Features",
      lastUpdated: "2024-01-12",
      views: 890,
      readTime: "7 min read",
      author: "BookMyLook Team",
      content: `
        <h2>How Our Queue System Works</h2>
        <p>BookMyLook's intelligent queue management system revolutionizes the traditional salon experience by providing transparency, accuracy, and convenience.</p>

        <h3>The Problem with Traditional Queues</h3>
        <p>Traditional salon queues often leave customers guessing:</p>
        <ul>
          <li>How long will I wait?</li>
          <li>Am I next in line?</li>
          <li>When should I arrive?</li>
          <li>Will my stylist be available?</li>
        </ul>

        <h3>BookMyLook's Solution</h3>
        <p>Our AI-powered system provides real-time answers to these questions:</p>

        <h4>1. Real-Time Position Tracking</h4>
        <p>Know exactly where you stand in the queue with live updates. No more guessing!</p>

        <h4>2. Accurate Wait Time Predictions</h4>
        <p>Our algorithm considers:</p>
        <ul>
          <li>Current queue length</li>
          <li>Average service duration</li>
          <li>Staff availability</li>
          <li>Historical data</li>
          <li>Walk-in customers</li>
        </ul>

        <h4>3. Smart Notifications</h4>
        <p>Get notified when:</p>
        <ul>
          <li>Your turn is approaching (15 minutes)</li>
          <li>It's your turn to be served</li>
          <li>Your service is complete</li>
          <li>Any changes occur</li>
        </ul>

        <h3>How to Use the Queue System</h3>

        <h4>For Customers:</h4>
        <ol>
          <li>Book your appointment online</li>
          <li>Arrive at the salon at your suggested time</li>
          <li>Check your position via the app or SMS</li>
          <li>Get notified when it's your turn</li>
        </ol>

        <h4>For Salon Staff:</h4>
        <ol>
          <li>Update queue positions in real-time</li>
          <li>Send notifications to customers</li>
          <li>Manage walk-in customers</li>
          <li>Track service completion</li>
        </ol>

        <h3>Benefits of Our Queue System</h3>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 20px 0;">
          <div style="background: linear-gradient(135deg, #e0f2fe, #b3e5fc); padding: 20px; border-radius: 8px; text-align: center;">
            <h4 style="color: #0277bd; margin-top: 0;">For Customers</h4>
            <ul style="text-align: left; margin-bottom: 0;">
              <li>No more waiting in line</li>
              <li>Accurate wait times</li>
              <li>Freedom to shop/go elsewhere</li>
              <li>Reduced stress and anxiety</li>
            </ul>
          </div>
          <div style="background: linear-gradient(135deg, #f3e5f5, #e1bee7); padding: 20px; border-radius: 8px; text-align: center;">
            <h4 style="color: #7b1fa2; margin-top: 0;">For Salons</h4>
            <ul style="text-align: left; margin-bottom: 0;">
              <li>Better customer satisfaction</li>
              <li>Reduced customer complaints</li>
              <li>Improved operational efficiency</li>
              <li>Higher customer retention</li>
            </ul>
          </div>
        </div>

        <h3>Privacy and Data Protection</h3>
        <p>We take your privacy seriously. Queue information is encrypted and only accessible to authorized salon staff and the customer who made the booking.</p>

        <h3>Troubleshooting</h3>

        <h4>Why is my position not updating?</h4>
        <p>The salon staff updates positions manually. If you notice delays, please inform the salon staff directly.</p>

        <h4>What if I arrive late?</h4>
        <p>Arrive within 15 minutes of your estimated time. For longer delays, contact the salon to reschedule.</p>

        <h4>Can I leave while waiting?</h4>
        <p>Yes! That's the beauty of our system. You'll receive notifications when it's your turn.</p>
      `,
      relatedArticles: [
        { id: 1, title: "Getting Started with BookMyLook", category: "Getting Started" },
        { id: 3, title: "Payment and Billing Guide", category: "Payment" },
        { id: 4, title: "Salon Owner Dashboard Guide", category: "For Salon Owners" }
      ]
    },
    "3": {
      id: 3,
      title: "Payment and Billing Guide",
      category: "Payment",
      lastUpdated: "2024-01-10",
      views: 650,
      readTime: "6 min read",
      author: "BookMyLook Team",
      content: `
        <h2>Complete Guide to Payments and Billing</h2>
        <p>Understanding how payments work on BookMyLook is essential for a smooth booking experience. This comprehensive guide covers everything you need to know about payments, billing, refunds, and financial transactions.</p>

        <h3>Supported Payment Methods</h3>
        <p>We offer multiple secure payment options to ensure convenience for all our customers:</p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0;">
          <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; text-align: center; border: 1px solid #bae6fd;">
            <div style="font-size: 24px; margin-bottom: 8px;">📱</div>
            <h4 style="color: #0369a1; margin: 0;">UPI</h4>
            <p style="color: #0369a1; margin: 5px 0 0 0; font-size: 14px;">Google Pay, PhonePe, Paytm</p>
          </div>
          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; text-align: center; border: 1px solid #fde68a;">
            <div style="font-size: 24px; margin-bottom: 8px;">💳</div>
            <h4 style="color: #92400e; margin: 0;">Cards</h4>
            <p style="color: #92400e; margin: 5px 0 0 0; font-size: 14px;">Credit & Debit Cards</p>
          </div>
          <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; text-align: center; border: 1px solid #bbf7d0;">
            <div style="font-size: 24px; margin-bottom: 8px;">💵</div>
            <h4 style="color: #166534; margin: 0;">Cash</h4>
            <p style="color: #166534; margin: 5px 0 0 0; font-size: 14px;">Pay at Salon</p>
          </div>
          <div style="background: #fdf4ff; padding: 15px; border-radius: 8px; text-align: center; border: 1px solid #e9d5ff;">
            <div style="font-size: 24px; margin-bottom: 8px;">🏦</div>
            <h4 style="color: #7c3aed; margin: 0;">Net Banking</h4>
            <p style="color: #7c3aed; margin: 5px 0 0 0; font-size: 14px;">Online Banking</p>
          </div>
        </div>

        <h3>How Online Payments Work</h3>

        <h4>1. Secure Payment Processing</h4>
        <p>All online payments are processed through Razorpay, India's leading payment gateway. Your financial information is encrypted and never stored on our servers.</p>

        <h4>2. Payment Flow</h4>
        <ol>
          <li>Select your services and book an appointment</li>
          <li>Choose your preferred payment method</li>
          <li>Complete the secure payment process</li>
          <li>Receive instant confirmation</li>
          <li>Get notified when payment is processed</li>
        </ol>

        <h4>3. Payment Security</h4>
        <ul>
          <li><strong>SSL Encryption:</strong> All data is encrypted in transit</li>
          <li><strong>PCI DSS Compliance:</strong> Meets highest security standards</li>
          <li><strong>Tokenization:</strong> Card details are tokenized for security</li>
          <li><strong>Two-Factor Authentication:</strong> Additional security layer</li>
        </ul>

        <h3>Billing and Invoicing</h3>

        <h4>Understanding Your Bill</h4>
        <p>Your booking confirmation includes a detailed breakdown:</p>
        <ul>
          <li>Service charges</li>
          <li>Applicable taxes (GST)</li>
          <li>Platform fees (if any)</li>
          <li>Total amount</li>
        </ul>

        <h4>Tax Information</h4>
        <p>As per Indian regulations, GST is applicable on salon services. The rate varies by service type and location.</p>

        <h3>Refund Policy</h3>

        <h4>When Can You Get a Refund?</h4>
        <ul>
          <li><strong>Cancellation:</strong> Full refund if cancelled 24+ hours before appointment</li>
          <li><strong>Service Issues:</strong> Partial/full refund based on service completion</li>
          <li><strong>Technical Issues:</strong> Full refund if booking fails due to our system</li>
          <li><strong>Salon Closure:</strong> Full refund if salon is unable to provide service</li>
        </ul>

        <h4>Refund Processing Time</h4>
        <ul>
          <li><strong>UPI Payments:</strong> 1-2 business days</li>
          <li><strong>Credit/Debit Cards:</strong> 5-7 business days</li>
          <li><strong>Net Banking:</strong> 3-5 business days</li>
        </ul>

        <h3>Failed Payments</h3>

        <h4>Common Reasons for Payment Failure:</h4>
        <ul>
          <li>Insufficient funds in account</li>
          <li>Incorrect card details</li>
          <li>Card expired or blocked</li>
          <li>Bank security restrictions</li>
          <li>Network connectivity issues</li>
        </ul>

        <h4>What to Do If Payment Fails:</h4>
        <ol>
          <li>Check your account balance/limits</li>
          <li>Verify payment details</li>
          <li>Contact your bank if needed</li>
          <li>Try alternative payment method</li>
          <li>Contact our support team</li>
        </ol>

        <h3>Payment Disputes</h3>
        <p>If you have a dispute regarding a payment:</p>
        <ol>
          <li>Contact the salon directly first</li>
          <li>If unresolved, contact our support team</li>
          <li>Provide booking reference and payment details</li>
          <li>We investigate and resolve within 48 hours</li>
        </ol>

        <h3>Billing History</h3>
        <p>Access your complete billing history in your dashboard:</p>
        <ul>
          <li>View all past payments</li>
          <li>Download invoices and receipts</li>
          <li>Track refund status</li>
          <li>Manage payment methods</li>
        </ul>

        <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #fde68a;">
          <h4 style="color: #92400e; margin-top: 0;">⚠️ Important Note</h4>
          <p style="margin-bottom: 0; color: #92400e;">Always keep your booking confirmation and payment receipt. These documents are required for any refund requests or disputes.</p>
        </div>

        <h3>Contact Information</h3>
        <p>For payment-related queries:</p>
        <ul>
          <li><strong>Email:</strong> billing@bookmylook.com</li>
          <li><strong>Phone:</strong> +91 94276 73752</li>
          <li><strong>Response Time:</strong> Within 24 hours</li>
        </ul>
      `,
      relatedArticles: [
        { id: 1, title: "Getting Started with BookMyLook", category: "Getting Started" },
        { id: 2, title: "Understanding Queue Management", category: "Features" },
        { id: 4, title: "Salon Owner Dashboard Guide", category: "For Salon Owners" }
      ]
    },
    "4": {
      id: 4,
      title: "Salon Owner Dashboard Guide",
      category: "For Salon Owners",
      lastUpdated: "2024-01-08",
      views: 420,
      readTime: "8 min read",
      author: "BookMyLook Team",
      content: `
        <h2>Complete Salon Owner Dashboard Guide</h2>
        <p>Welcome to the BookMyLook Salon Owner Dashboard! This comprehensive guide will help you maximize your salon's performance on our platform and provide excellent service to your customers.</p>

        <h3>Getting Started as a Salon Owner</h3>

        <h4>1. Registration Process</h4>
        <ol>
          <li>Create your account as a "Salon Owner"</li>
          <li>Verify your identity and business documents</li>
          <li>Complete your salon profile setup</li>
          <li>Add your services and pricing</li>
          <li>Set your operating hours and staff</li>
        </ol>

        <h4>2. Profile Setup</h4>
        <p>Your salon profile is crucial for attracting customers. Include:</p>
        <ul>
          <li>High-quality photos of your salon</li>
          <li>Detailed service descriptions</li>
          <li>Accurate location and contact information</li>
          <li>Operating hours and appointment policies</li>
          <li>Staff profiles and specializations</li>
        </ul>

        <h3>Dashboard Overview</h3>

        <h4>Main Dashboard Sections:</h4>
        <ul>
          <li><strong>Overview:</strong> Key metrics and performance summary</li>
          <li><strong>Bookings:</strong> Manage appointments and schedule</li>
          <li><strong>Services:</strong> Configure your service menu</li>
          <li><strong>Staff:</strong> Manage your team</li>
          <li><strong>Analytics:</strong> Performance insights and reports</li>
          <li><strong>Settings:</strong> Configure your salon preferences</li>
        </ul>

        <h3>Managing Bookings</h3>

        <h4>Viewing Appointments</h4>
        <p>The booking calendar shows:</p>
        <ul>
          <li>Confirmed appointments</li>
          <li>Pending bookings awaiting confirmation</li>
          <li>Cancelled appointments</li>
          <li>Walk-in customers</li>
        </ul>

        <h4>Appointment Management</h4>
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h4 style="color: #0369a1; margin-top: 0;">📅 Daily Workflow</h4>
          <ol style="color: #0369a1; margin-bottom: 0;">
            <li>Review today's appointments first thing in the morning</li>
            <li>Confirm any pending bookings within 2 hours</li>
            <li>Update queue positions as customers arrive</li>
            <li>Mark services complete and add notes</li>
            <li>Review daily performance at end of day</li>
          </ol>
        </div>

        <h4>Queue Management</h4>
        <p>Real-time queue management is key to customer satisfaction:</p>
        <ul>
          <li>Update customer positions as they arrive</li>
          <li>Send notifications when turns approach</li>
          <li>Handle walk-ins efficiently</li>
          <li>Monitor wait times and adjust staffing</li>
        </ul>

        <h3>Service Configuration</h3>

        <h4>Adding Services</h4>
        <p>For each service, provide:</p>
        <ul>
          <li>Service name and detailed description</li>
          <li>Duration (in minutes)</li>
          <li>Pricing (including GST)</li>
          <li>Category classification</li>
          <li>Staff members who can perform it</li>
        </ul>

        <h4>Service Categories</h4>
        <ul>
          <li>Hair Services (Cut, Styling, Coloring)</li>
          <li>Beauty Treatments (Facials, Waxing)</li>
          <li>Nail Services (Manicure, Pedicure)</li>
          <li>Spa Treatments (Massage, Body Scrubs)</li>
          <li>Special Packages (Bridal, Events)</li>
        </ul>

        <h4>Pricing Strategy</h4>
        <p>Tips for competitive pricing:</p>
        <ul>
          <li>Research local market rates</li>
          <li>Consider service quality and duration</li>
          <li>Include all taxes and fees</li>
          <li>Offer package deals for multiple services</li>
          <li>Update prices regularly</li>
        </ul>

        <h3>Staff Management</h3>

        <h4>Adding Staff Members</h4>
        <p>For each staff member:</p>
        <ul>
          <li>Personal information and contact details</li>
          <li>Profile photo and bio</li>
          <li>Specializations and skills</li>
          <li>Working hours and availability</li>
          <li>Service assignments</li>
        </ul>

        <h4>Scheduling</h4>
        <p>Efficient scheduling ensures optimal utilization:</p>
        <ul>
          <li>Set staff working hours</li>
          <li>Manage breaks and lunch periods</li>
          <li>Handle shift rotations</li>
          <li>Accommodate staff preferences</li>
          <li>Plan for peak hours</li>
        </ul>

        <h3>Analytics and Reporting</h3>

        <h4>Key Metrics to Monitor</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0;">
          <div style="background: #e0f2fe; padding: 15px; border-radius: 8px; text-align: center;">
            <div style="font-size: 24px; margin-bottom: 8px;">📊</div>
            <h4 style="color: #0277bd; margin: 0;">Revenue</h4>
            <p style="color: #0277bd; margin: 5px 0 0 0; font-size: 14px;">Daily/Monthly earnings</p>
          </div>
          <div style="background: #f3e5f5; padding: 15px; border-radius: 8px; text-align: center;">
            <div style="font-size: 24px; margin-bottom: 8px;">👥</div>
            <h4 style="color: #7b1fa2; margin: 0;">Customers</h4>
            <p style="color: #7b1fa2; margin: 5px 0 0 0; font-size: 14px;">New vs returning</p>
          </div>
          <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; text-align: center;">
            <div style="font-size: 24px; margin-bottom: 8px;">⭐</div>
            <h4 style="color: #2e7d32; margin: 0;">Ratings</h4>
            <p style="color: #2e7d32; margin: 5px 0 0 0; font-size: 14px;">Average reviews</p>
          </div>
          <div style="background: #fff3e0; padding: 15px; border-radius: 8px; text-align: center;">
            <div style="font-size: 24px; margin-bottom: 8px;">⏱️</div>
            <h4 style="color: #ef6c00; margin: 0;">Wait Times</h4>
            <p style="color: #ef6c00; margin: 5px 0 0 0; font-size: 14px;">Average duration</p>
          </div>
        </div>

        <h4>Popular Reports</h4>
        <ul>
          <li><strong>Revenue Report:</strong> Daily, weekly, monthly earnings breakdown</li>
          <li><strong>Booking Report:</strong> Appointment trends and peak hours</li>
          <li><strong>Customer Report:</strong> Demographics and satisfaction scores</li>
          <li><strong>Staff Performance:</strong> Individual productivity metrics</li>
          <li><strong>Service Popularity:</strong> Most booked services analysis</li>
        </ul>

        <h3>Customer Communication</h3>

        <h4>Managing Customer Interactions</h4>
        <ul>
          <li>Respond to booking requests within 2 hours</li>
          <li>Send confirmation and reminder notifications</li>
          <li>Handle special requests professionally</li>
          <li>Follow up after service completion</li>
          <li>Address customer feedback promptly</li>
        </ul>

        <h4>Review Management</h4>
        <p>Customer reviews are crucial for your reputation:</p>
        <ul>
          <li>Respond to all reviews within 24 hours</li>
          <li>Thank customers for positive feedback</li>
          <li>Address negative reviews professionally</li>
          <li>Highlight your strengths in responses</li>
          <li>Use feedback to improve services</li>
        </ul>

        <h3>Settings and Configuration</h3>

        <h4>Business Settings</h4>
        <ul>
          <li>Operating hours and holidays</li>
          <li>Cancellation and refund policies</li>
          <li>Payment preferences</li>
          <li>Notification settings</li>
          <li>Privacy preferences</li>
        </ul>

        <h4>Integration Settings</h4>
        <ul>
          <li>Calendar sync with external systems</li>
          <li>POS system integration</li>
          <li>Marketing tool connections</li>
          <li>API access management</li>
        </ul>

        <h3>Best Practices for Success</h3>

        <h4>Customer Service Excellence</h4>
        <ul>
          <li>Maintain high response times to booking requests</li>
          <li>Keep your profile and services updated</li>
          <li>Provide accurate wait time estimates</li>
          <li>Handle complaints and issues professionally</li>
          <li>Collect and respond to customer feedback</li>
        </ul>

        <h4>Operational Efficiency</h4>
        <ul>
          <li>Optimize staff scheduling for peak hours</li>
          <li>Regularly update service pricing</li>
          <li>Monitor and improve queue management</li>
          <li>Analyze performance metrics weekly</li>
          <li>Keep customer data accurate and current</li>
        </ul>

        <h3>Support and Resources</h3>

        <h4>Getting Help</h4>
        <p>If you need assistance:</p>
        <ul>
          <li><strong>Help Center:</strong> Comprehensive guides and tutorials</li>
          <li><strong>Email Support:</strong> support@bookmylook.com</li>
          <li><strong>Phone Support:</strong> +91 94276 73752</li>
          <li><strong>Live Chat:</strong> Available during business hours</li>
        </ul>

        <h4>Training Resources</h4>
        <ul>
          <li>Video tutorials for dashboard features</li>
          <li>Webinars on best practices</li>
          <li>Community forums for salon owners</li>
          <li>Regular updates and feature releases</li>
        </ul>

        <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #c8e6c9;">
          <h4 style="color: #2e7d32; margin-top: 0;">💡 Success Tip</h4>
          <p style="margin-bottom: 0; color: #2e7d32;">Spend 15 minutes each morning reviewing your dashboard and planning your day. This small investment in time management will significantly improve your salon's efficiency and customer satisfaction.</p>
        </div>

        <h3>Conclusion</h3>
        <p>The BookMyLook Salon Owner Dashboard is a powerful tool designed to help you grow your business and provide exceptional service to your customers. Regular use of these features and following best practices will help you maximize your success on our platform.</p>

        <p>Remember, we're here to support your success. Don't hesitate to reach out if you need help with any aspect of managing your salon on BookMyLook.</p>
      `,
      relatedArticles: [
        { id: 1, title: "Getting Started with BookMyLook", category: "Getting Started" },
        { id: 2, title: "Understanding Queue Management", category: "Features" },
        { id: 3, title: "Payment and Billing Guide", category: "Payment" }
      ]
    }
  };

  const article = articles[id as keyof typeof articles] || articles["1"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Header */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white">
        <div className="container py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/help">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Help
              </Button>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                {article.category}
              </Badge>
              <div className="flex items-center gap-4 text-sm text-slate-300">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {article.readTime}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {article.views} views
                </span>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>

            <div className="flex items-center gap-4 text-slate-300">
              <span>By {article.author}</span>
              <span>•</span>
              <span>Updated {new Date(article.lastUpdated).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container max-w-4xl">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div
                      className="prose prose-slate max-w-none"
                      dangerouslySetInnerHTML={{ __html: article.content }}
                      style={{
                        color: 'hsl(var(--foreground))',
                        lineHeight: '1.7'
                      }}
                    />

                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Table of Contents */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="sticky top-8">
                  <CardHeader>
                    <CardTitle className="text-lg">Table of Contents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <nav className="space-y-2">
                      <a href="#introduction" className="block text-sm text-slate-600 hover:text-blue-600 transition-colors py-1">
                        Introduction
                      </a>
                      <a href="#getting-started" className="block text-sm text-slate-600 hover:text-blue-600 transition-colors py-1">
                        Getting Started
                      </a>
                      <a href="#features" className="block text-sm text-slate-600 hover:text-blue-600 transition-colors py-1">
                        Features
                      </a>
                      <a href="#troubleshooting" className="block text-sm text-slate-600 hover:text-blue-600 transition-colors py-1">
                        Troubleshooting
                      </a>
                    </nav>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Related Articles */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Related Articles</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {article.relatedArticles.map((related) => (
                      <Link key={related.id} to={`/help/article/${related.id}`}>
                        <div className="p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
                          <h4 className="font-medium text-sm text-slate-800 mb-1">{related.title}</h4>
                          <Badge variant="outline" className="text-xs">{related.category}</Badge>
                        </div>
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                  <CardContent className="p-6 text-center">
                    <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-slate-800 mb-2">Need More Help?</h3>
                    <p className="text-sm text-slate-600 mb-4">Browse our complete help library</p>
                    <Button asChild className="w-full">
                      <Link to="/help">Back to Help Center</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
