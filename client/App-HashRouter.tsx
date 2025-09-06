import "./global.css";
import "./styles.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { I18nProvider } from "@/i18n";
import { AnimatePresence, motion } from "framer-motion";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function RouterWithTransitions(){
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Page><Index /></Page>} />
        <Route path="/services" element={<Page><Services /></Page>} />
        <Route path="/about" element={<Page><Placeholder title="About" /></Page>} />
        <Route path="/booking" element={<Page><Placeholder title="Booking & Queue" /></Page>} />
        <Route path="/dashboard/customer" element={<Page><Placeholder title="Customer Dashboard" /></Page>} />
        <Route path="/dashboard/owner" element={<Page><Placeholder title="Owner Dashboard" /></Page>} />
        <Route path="/dashboard/admin" element={<Page><Placeholder title="Admin Dashboard" /></Page>} />
        <Route path="/contact" element={<Page><Placeholder title="Contact" /></Page>} />
        <Route path="*" element={<NotFound />} />
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
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <I18nProvider>
        <HashRouter>
          <RouterWithTransitions />
        </HashRouter>
      </I18nProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
