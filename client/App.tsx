import "./global.css";
import "./styles.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { I18nProvider } from "@/i18n";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { QueueProvider } from "@/contexts/QueueContext";
import { RealTimeProvider } from "@/contexts/RealTimeContext";
import { AnimatePresence, motion } from "framer-motion";
import SiteLayout from "./layouts/SiteLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy load components for better performance
import { lazy, Suspense } from "react";

const Index = lazy(() => import("./pages/Index"));
const Services = lazy(() => import("./pages/Services"));
const Booking = lazy(() => import("./pages/Booking"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const CustomerDashboard = lazy(() => import("./pages/CustomerDashboard"));
const OwnerDashboard = lazy(() => import("./pages/OwnerDashboard"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Profile = lazy(() => import("./pages/Profile"));
const Reviews = lazy(() => import("./pages/Reviews"));
const Help = lazy(() => import("./pages/Help"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Estimate = lazy(() => import("./pages/Estimate"));
const SalonDetails = lazy(() => import("./pages/SalonDetails"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

const queryClient = new QueryClient();

function RouterWithTransitions(){
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Pages */}
        <Route path="/" element={<SiteLayout><Page><Suspense fallback={<PageLoader />}><Index /></Suspense></Page></SiteLayout>} />
        <Route path="/services" element={<SiteLayout><Page><Suspense fallback={<PageLoader />}><Services /></Suspense></Page></SiteLayout>} />
        <Route path="/salon/:slug" element={<SiteLayout><Page><Suspense fallback={<PageLoader />}><ErrorBoundary><SalonDetails /></ErrorBoundary></Suspense></Page></SiteLayout>} />
        <Route path="/about" element={<SiteLayout><Page><Suspense fallback={<PageLoader />}><About /></Suspense></Page></SiteLayout>} />
        <Route path="/booking" element={<SiteLayout><Page><Suspense fallback={<PageLoader />}><Booking /></Suspense></Page></SiteLayout>} />
        <Route path="/contact" element={<SiteLayout><Page><Suspense fallback={<PageLoader />}><Contact /></Suspense></Page></SiteLayout>} />
        <Route path="/reviews" element={<SiteLayout><Page><Suspense fallback={<PageLoader />}><Reviews /></Suspense></Page></SiteLayout>} />
        <Route path="/help" element={<SiteLayout><Page><Suspense fallback={<PageLoader />}><Help /></Suspense></Page></SiteLayout>} />
        <Route path="/terms" element={<SiteLayout><Page><Suspense fallback={<PageLoader />}><Terms /></Suspense></Page></SiteLayout>} />
        <Route path="/privacy" element={<SiteLayout><Page><Suspense fallback={<PageLoader />}><Privacy /></Suspense></Page></SiteLayout>} />
        <Route path="/estimate" element={<SiteLayout><Page><Suspense fallback={<PageLoader />}><Estimate /></Suspense></Page></SiteLayout>} />
        
        {/* Authentication Pages */}
        <Route path="/login" element={
          <ProtectedRoute requireAuth={false}>
            <Suspense fallback={<PageLoader />}><Login /></Suspense>
          </ProtectedRoute>
        } />
        <Route path="/register" element={
          <ProtectedRoute requireAuth={false}>
            <Suspense fallback={<PageLoader />}><Register /></Suspense>
          </ProtectedRoute>
        } />
        <Route path="/reset-password" element={
          <ProtectedRoute requireAuth={false}>
            <Suspense fallback={<PageLoader />}><ResetPassword /></Suspense>
          </ProtectedRoute>
        } />
        
        {/* Dashboard Pages */}
        <Route path="/dashboard/customer" element={
          <ProtectedRoute allowedRoles={['CUSTOMER']}>
            <SiteLayout><Page><Suspense fallback={<PageLoader />}><CustomerDashboard /></Suspense></Page></SiteLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/owner" element={
          <ProtectedRoute allowedRoles={['SALON_OWNER']}>
            <SiteLayout><Page><Suspense fallback={<PageLoader />}><OwnerDashboard /></Suspense></Page></SiteLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/admin" element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <SiteLayout><Page><Suspense fallback={<PageLoader />}><AdminDashboard /></Suspense></Page></SiteLayout>
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <SiteLayout><Page><Suspense fallback={<PageLoader />}><Profile /></Suspense></Page></SiteLayout>
          </ProtectedRoute>
        } />
        
        {/* 404 Page */}
        <Route path="*" element={<SiteLayout><Suspense fallback={<PageLoader />}><NotFound /></Suspense></SiteLayout>} />
      </Routes>
    </AnimatePresence>
  );
}

function Page({ children }: {children: React.ReactNode}){
  return (
    <motion.div initial={{opacity:0, y: 10}} animate={{opacity:1, y:0}} exit={{opacity:0, y: -10}} transition={{duration:0.2}}>
      {children}
    </motion.div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <RealTimeProvider>
          <QueueProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <I18nProvider>
                <BrowserRouter future={{
                  v7_startTransition: true,
                  v7_relativeSplatPath: true,
                }}>
                  <ScrollToTop />
                  <ErrorBoundary>
                    <RouterWithTransitions />
                  </ErrorBoundary>
                </BrowserRouter>
              </I18nProvider>
            </TooltipProvider>
          </QueueProvider>
        </RealTimeProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
