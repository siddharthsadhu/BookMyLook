# Book My Look - Salon Booking & Queue Management Platform

A comprehensive salon booking and queue management platform built with React, TypeScript, and Express.js. Book My Look revolutionizes the salon experience by providing real-time queue management, transparent wait times, and seamless booking systems.

## 🚀 Features

### For Customers
- **Real-time Queue Management**: See your exact position in the queue and estimated wait times
- **Easy Booking System**: Book appointments with live availability and instant confirmation
- **Multiple Payment Options**: Support for UPI, Razorpay, credit/debit cards, and cash
- **Review System**: Rate and review salon services
- **Profile Management**: Manage personal information and preferences
- **Notification System**: Get updates about queue position and appointment reminders

### For Salon Owners
- **Queue Dashboard**: Real-time view of current queue and customer status
- **Service Management**: Add, edit, and manage salon services
- **Staff Management**: Manage barbers and staff availability
- **Analytics & Reports**: Track performance, revenue, and customer satisfaction
- **Booking Management**: Handle appointments and customer requests

### For Administrators
- **System Overview**: Monitor platform health and performance
- **User Management**: Manage customers, salon owners, and staff
- **Salon Management**: Approve and manage partner salons
- **System Alerts**: Monitor and respond to system issues
- **Analytics Dashboard**: Platform-wide statistics and insights

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **React Router 6** for SPA routing
- **TailwindCSS 3** for styling
- **Radix UI** for accessible components
- **Framer Motion** for animations
- **Lucide React** for icons
- **React Query** for data fetching

### Backend
- **Express.js** with TypeScript
- **CORS** for cross-origin requests
- **JSON** for data exchange
- **Mock data** for demonstration (easily replaceable with real database)

### Development Tools
- **Vite** for fast development and building
- **PNPM** for package management
- **ESLint** for code linting
- **TypeScript** for type safety

## 📁 Project Structure

```
├── client/                   # React frontend
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Base UI components (Radix UI)
│   │   ├── home/           # Home page components
│   │   ├── site/           # Site-wide components (Navbar, Footer)
│   │   └── shared/         # Shared components
│   ├── pages/              # Page components
│   │   ├── Index.tsx       # Home page
│   │   ├── Services.tsx    # Services listing
│   │   ├── Booking.tsx     # Booking form
│   │   ├── Login.tsx       # Authentication
│   │   ├── Profile.tsx     # User profile
│   │   ├── Reviews.tsx     # Customer reviews
│   │   ├── Help.tsx        # Help center
│   │   └── ...             # Other pages
│   ├── layouts/            # Layout components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   └── i18n/               # Internationalization
├── server/                  # Express backend
│   ├── routes/             # API route handlers
│   │   ├── shops.ts        # Salon management
│   │   ├── services.ts     # Service management
│   │   ├── bookings.ts     # Booking management
│   │   ├── reviews.ts      # Review system
│   │   └── contact.ts      # Contact form
│   └── index.ts            # Server setup
├── shared/                  # Shared types and utilities
│   └── api.ts              # TypeScript interfaces
└── public/                  # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PNPM (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Book My Look"
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

### Available Scripts

- `pnpm dev` - Start development server (client + server)
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm typecheck` - Run TypeScript validation
- `pnpm test` - Run tests

## 📱 Pages & Features

### Public Pages
- **Home** (`/`) - Landing page with hero, features, and booking form
- **Services** (`/services`) - Browse salons and services with filtering
- **About** (`/about`) - Company information and team
- **Booking** (`/booking`) - Appointment booking form
- **Reviews** (`/reviews`) - Customer reviews and ratings
- **Help** (`/help`) - Help center with FAQs and support
- **Contact** (`/contact`) - Contact form and information
- **Terms** (`/terms`) - Terms of service
- **Privacy** (`/privacy`) - Privacy policy

### Authentication
- **Login** (`/login`) - User authentication with social login
- **Forgot Password** (`/forgot-password`) - Password reset

### User Dashboards
- **Customer Dashboard** (`/dashboard/customer`) - Manage bookings and reviews
- **Owner Dashboard** (`/dashboard/owner`) - Manage salon operations
- **Admin Dashboard** (`/dashboard/admin`) - System administration
- **Profile** (`/profile`) - User profile management

## 🔌 API Endpoints

### Salons & Services
- `GET /api/shops` - Get all salons
- `GET /api/services?shop_id={id}` - Get services for a salon

### Bookings
- `GET /api/bookings` - Get bookings (with filters)
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

### Reviews
- `GET /api/reviews` - Get reviews (with filters)
- `POST /api/reviews` - Create new review
- `GET /api/reviews/stats` - Get review statistics

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact/submissions` - Get contact submissions (admin)
- `GET /api/contact/stats` - Get contact statistics

### Queue Management
- `POST /api/estimate` - Get queue estimate

## 🎨 Design System

### Colors
- **Primary**: Blue gradient for main actions
- **Secondary**: Complementary colors for accents
- **Success**: Green for positive actions
- **Warning**: Yellow for caution
- **Error**: Red for errors
- **Muted**: Gray for secondary text

### Typography
- **Headings**: Bold, clear hierarchy
- **Body**: Readable, accessible font sizes
- **Code**: Monospace for technical content

### Components
- **Cards**: Consistent spacing and shadows
- **Buttons**: Multiple variants (primary, secondary, outline)
- **Forms**: Accessible inputs with validation
- **Navigation**: Responsive with mobile support

## 🌐 Internationalization

The platform supports multiple languages:
- English (EN)
- Hindi (हिं)
- Gujarati (ગુ)

Language files are located in `client/i18n/` and can be easily extended.

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Desktop**: Full feature set with sidebar navigation
- **Tablet**: Adapted layouts with touch-friendly controls
- **Mobile**: Streamlined interface with bottom navigation

## 🔒 Security Features

- **Input Validation**: All forms validate user input
- **CORS Protection**: Configured for secure cross-origin requests
- **Type Safety**: TypeScript prevents runtime errors
- **Secure Headers**: Express security middleware

## 🚀 Deployment

### Production Build
```bash
pnpm build
```

### Environment Variables
Create a `.env` file with:
```
PING_MESSAGE=Hello from QThrough!
```

### Deployment Options
- **Netlify**: Automatic deployment from Git
- **Vercel**: Serverless deployment
- **Traditional Hosting**: Static files + Node.js server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- **Email**: support@bookmylook.com
- **Phone**: +91 98765 43210
- **Help Center**: `/help` page in the application

## 🔮 Future Enhancements

- **Real-time Notifications**: WebSocket integration
- **Mobile App**: React Native version
- **Payment Integration**: Full Razorpay integration
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with refresh tokens
- **File Upload**: Image uploads for profiles
- **Analytics**: Google Analytics integration
- **SEO**: Meta tags and sitemap generation

---

**Book My Look** - Revolutionizing the salon experience, one booking at a time! ✨