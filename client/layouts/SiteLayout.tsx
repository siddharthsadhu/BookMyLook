import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { ReactNode, useEffect, useRef } from "react";

export default function SiteLayout({ children }: {children: ReactNode}){
  const footerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Ensure only one footer is rendered
    if (footerRef.current) {
      const existingFooters = document.querySelectorAll('footer');
      if (existingFooters.length > 1) {
        // Remove duplicate footers
        for (let i = 1; i < existingFooters.length; i++) {
          existingFooters[i].remove();
        }
      }
    }
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-10">{children}</main>
      <div ref={footerRef}>
        <Footer />
      </div>
      <ThemeToggle />
    </div>
  );
}
