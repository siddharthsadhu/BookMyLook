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
import { AnimatePresence, motion } from "framer-motion";
import SiteLayout from "./layouts/SiteLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CustomerDashboard from "./pages/CustomerDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Reviews from "./pages/Reviews";
import Help from "./pages/Help";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Estimate from "./pages/Estimate";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function RouterWithTransitions(){
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Pages */}
        <Route path="/" element={<SiteLayout><Page><Index /></Page></SiteLayout>} />
        <Route path="/services" element={<SiteLayout><Page><Services /></Page></SiteLayout>} />
        <Route path="/about" element={<SiteLayout><Page><About /></Page></SiteLayout>} />
        <Route path="/booking" element={<SiteLayout><Page><Booking /></Page></SiteLayout>} />
        <Route path="/contact" element={<SiteLayout><Page><Contact /></Page></SiteLayout>} />
        <Route path="/reviews" element={<SiteLayout><Page><Reviews /></Page></SiteLayout>} />
        <Route path="/help" element={<SiteLayout><Page><Help /></Page></SiteLayout>} />
        <Route path="/terms" element={<SiteLayout><Page><Terms /></Page></SiteLayout>} />
        <Route path="/privacy" element={<SiteLayout><Page><Privacy /></Page></SiteLayout>} />
        <Route path="/estimate" element={<SiteLayout><Page><Estimate /></Page></SiteLayout>} />
        
        {/* Authentication Pages */}
        <Route path="/login" element={
          <ProtectedRoute requireAuth={false}>
            <Login />
          </ProtectedRoute>
        } />
        <Route path="/register" element={
          <ProtectedRoute requireAuth={false}>
            <Register />
          </ProtectedRoute>
        } />
        
        {/* Dashboard Pages */}
        <Route path="/dashboard/customer" element={
          <ProtectedRoute allowedRoles={['CUSTOMER']}>
            <SiteLayout><Page><CustomerDashboard /></Page></SiteLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/owner" element={
          <ProtectedRoute allowedRoles={['SALON_OWNER']}>
            <SiteLayout><Page><OwnerDashboard /></Page></SiteLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/admin" element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <SiteLayout><Page><AdminDashboard /></Page></SiteLayout>
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <SiteLayout><Page><Profile /></Page></SiteLayout>
          </ProtectedRoute>
        } />
        
        {/* 404 Page */}
        <Route path="*" element={<SiteLayout><NotFound /></SiteLayout>} />
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
      <QueueProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <I18nProvider>
              <BrowserRouter future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
              }}>
                <RouterWithTransitions />
              </BrowserRouter>
            </I18nProvider>
          </TooltipProvider>
        </AuthProvider>
      </QueueProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
