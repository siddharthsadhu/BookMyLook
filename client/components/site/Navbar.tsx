import { useEffect, useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { t, lang, setLang } = useI18n();
  const { theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navbarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Prevent duplicate navbar rendering
    const cleanupDuplicates = () => {
      const existingNavbars = document.querySelectorAll('#main-navbar');
      if (existingNavbars.length > 1) {
        // Remove duplicate navbars, keep only the first one
        for (let i = 1; i < existingNavbars.length; i++) {
          existingNavbars[i].remove();
        }
      }
    };

    // Run cleanup immediately
    cleanupDuplicates();

    // Also run cleanup after a short delay to catch any late-rendered duplicates
    const timeoutId = setTimeout(cleanupDuplicates, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <header 
      ref={navbarRef}
      id="main-navbar"
      className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", scrolled ? "backdrop-blur-md bg-background/95 border-b shadow-sm" : "bg-transparent")}
      onMouseLeave={() => setOpen(false)}
    >
      <nav className="container flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-2">
          {theme === 'salon' ? (
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 grid place-items-center text-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {/* Scissors */}
                <path d="M6 6l6 6" />
                <path d="M6 18l6-6" />
                <circle cx="6" cy="6" r="2" />
                <circle cx="6" cy="18" r="2" />
                <path d="M18 6l-6 6" />
                <path d="M18 18l-6-6" />
                <circle cx="18" cy="6" r="2" />
                <circle cx="18" cy="18" r="2" />
                {/* Comb */}
                <path d="M12 2v20" />
                <path d="M8 2h8" />
                <path d="M8 4h8" />
                <path d="M8 6h8" />
                <path d="M8 8h8" />
                <path d="M8 10h8" />
                <path d="M8 12h8" />
                <path d="M8 14h8" />
                <path d="M8 16h8" />
                <path d="M8 18h8" />
                <path d="M8 20h8" />
              </svg>
            </div>
          ) : (
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-accent grid place-items-center text-white font-bold">B</div>
          )}
          <span className="font-semibold text-lg">{t("app_name")}</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={({isActive}) => cn("text-sm font-medium transition-colors hover:text-primary relative py-2 px-1 focus:outline-none focus:ring-0", isActive && "text-primary")}>
            {({isActive}) => (
              <>
                {t("nav_home")}
                {isActive && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />}
              </>
            )}
          </NavLink>
          <NavLink to="/services" className={({isActive}) => cn("text-sm font-medium transition-colors hover:text-primary relative py-2 px-1 focus:outline-none focus:ring-0", isActive && "text-primary")}>
            {({isActive}) => (
              <>
                {t("nav_services")}
                {isActive && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />}
              </>
            )}
          </NavLink>
          <NavLink to="/about" className={({isActive}) => cn("text-sm font-medium transition-colors hover:text-primary relative py-2 px-1 focus:outline-none focus:ring-0", isActive && "text-primary")}>
            {({isActive}) => (
              <>
                {t("nav_about")}
                {isActive && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />}
              </>
            )}
          </NavLink>
          <NavLink to="/booking" className={({isActive}) => cn("text-sm font-medium transition-colors hover:text-primary relative py-2 px-1 focus:outline-none focus:ring-0", isActive && "text-primary")}>
            {({isActive}) => (
              <>
                {t("nav_booking")}
                {isActive && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />}
              </>
            )}
          </NavLink>
          <NavLink to="/reviews" className={({isActive}) => cn("text-sm font-medium transition-colors hover:text-primary relative py-2 px-1 focus:outline-none focus:ring-0", isActive && "text-primary")}>
            {({isActive}) => (
              <>
                Reviews
                {isActive && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />}
              </>
            )}
          </NavLink>
          <NavLink to="/help" className={({isActive}) => cn("text-sm font-medium transition-colors hover:text-primary relative py-2 px-1 focus:outline-none focus:ring-0", isActive && "text-primary")}>
            {({isActive}) => (
              <>
                Help
                {isActive && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />}
              </>
            )}
          </NavLink>
          <NavLink to="/contact" className={({isActive}) => cn("text-sm font-medium transition-colors hover:text-primary relative py-2 px-1 focus:outline-none focus:ring-0", isActive && "text-primary")}>
            {({isActive}) => (
              <>
                {t("nav_contact")}
                {isActive && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />}
              </>
            )}
          </NavLink>
          <div className="relative">
            <button 
              onClick={() => setOpen((v)=>!v)} 
              className="text-sm font-medium transition-colors hover:text-primary relative flex items-center gap-1 py-2 px-1 focus:outline-none focus:ring-0"
            >
              {t("nav_dashboards")}
              <svg className="w-4 h-4 transition-transform" style={{transform: open ? 'rotate(180deg)' : 'rotate(0deg)'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl p-2 shadow-lg bg-background/95 backdrop-blur-md border">
                <Link className="block px-3 py-2 rounded-md hover:bg-accent/10 transition-colors" to="/dashboard/customer">{t("customer")}</Link>
                <Link className="block px-3 py-2 rounded-md hover:bg-accent/10 transition-colors" to="/dashboard/owner">{t("owner")}</Link>
                <Link className="block px-3 py-2 rounded-md hover:bg-accent/10 transition-colors" to="/dashboard/admin">{t("admin")}</Link>
                <Link className="block px-3 py-2 rounded-md hover:bg-accent/10 transition-colors" to="/profile">Profile</Link>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex rounded-lg border overflow-hidden">
            <LangButton active={lang === "en"} onClick={() => setLang("en")}>EN</LangButton>
            <LangButton active={lang === "hi"} onClick={() => setLang("hi")}>हिं</LangButton>
            <LangButton active={lang === "gu"} onClick={() => setLang("gu")}>ગુ</LangButton>
          </div>
          <Button asChild className="hidden sm:inline-flex shadow-md bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
            <a href="#booking">{t("get_started")}</a>
          </Button>
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}

function LangButton({ active, onClick, children }: {active:boolean; onClick:()=>void; children: React.ReactNode}){
  return (
    <button onClick={onClick} className={cn("px-2.5 py-1 text-xs", active ? "bg-primary text-primary-foreground" : "hover:bg-accent/30")}>
      {children}
    </button>
  );
}

function MobileMenu(){
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border" onClick={()=>setOpen(v=>!v)} aria-label="Toggle menu">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      </button>
      {open && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={()=>setOpen(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div className="absolute right-0 top-0 h-full w-80 bg-background/95 backdrop-blur-md shadow-xl p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {theme === 'salon' ? (
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 grid place-items-center text-white">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {/* Scissors */}
                      <path d="M6 6l6 6" />
                      <path d="M6 18l6-6" />
                      <circle cx="6" cy="6" r="2" />
                      <circle cx="6" cy="18" r="2" />
                      <path d="M18 6l-6 6" />
                      <path d="M18 18l-6-6" />
                      <circle cx="18" cy="6" r="2" />
                      <circle cx="18" cy="18" r="2" />
                      {/* Comb */}
                      <path d="M12 2v20" />
                      <path d="M8 2h8" />
                      <path d="M8 4h8" />
                      <path d="M8 6h8" />
                      <path d="M8 8h8" />
                      <path d="M8 10h8" />
                      <path d="M8 12h8" />
                      <path d="M8 14h8" />
                      <path d="M8 16h8" />
                      <path d="M8 18h8" />
                      <path d="M8 20h8" />
                    </svg>
                  </div>
                ) : (
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent grid place-items-center text-white font-bold text-sm">B</div>
                )}
                <span className="font-semibold">{t("app_name")}</span>
              </div>
              <button onClick={()=>setOpen(false)} className="p-2 hover:bg-muted rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-1">
              <NavLink to="/" onClick={()=>setOpen(false)} className="block py-2 px-2 rounded-lg hover:bg-muted transition-colors focus:outline-none focus:ring-0">{t("nav_home")}</NavLink>
              <NavLink to="/services" onClick={()=>setOpen(false)} className="block py-2 px-2 rounded-lg hover:bg-muted transition-colors focus:outline-none focus:ring-0">{t("nav_services")}</NavLink>
              <NavLink to="/about" onClick={()=>setOpen(false)} className="block py-2 px-2 rounded-lg hover:bg-muted transition-colors focus:outline-none focus:ring-0">{t("nav_about")}</NavLink>
              <NavLink to="/booking" onClick={()=>setOpen(false)} className="block py-2 px-2 rounded-lg hover:bg-muted transition-colors focus:outline-none focus:ring-0">{t("nav_booking")}</NavLink>
              <NavLink to="/reviews" onClick={()=>setOpen(false)} className="block py-2 px-2 rounded-lg hover:bg-muted transition-colors focus:outline-none focus:ring-0">Reviews</NavLink>
              <NavLink to="/help" onClick={()=>setOpen(false)} className="block py-2 px-2 rounded-lg hover:bg-muted transition-colors focus:outline-none focus:ring-0">Help</NavLink>
              <NavLink to="/contact" onClick={()=>setOpen(false)} className="block py-2 px-2 rounded-lg hover:bg-muted transition-colors focus:outline-none focus:ring-0">{t("nav_contact")}</NavLink>
            </div>
            
            <div className="pt-4 border-t">
              <div className="text-xs text-muted-foreground mb-3 font-medium">{t("nav_dashboards")}</div>
              <div className="space-y-1">
                <NavLink to="/dashboard/customer" onClick={()=>setOpen(false)} className="block py-2 px-2 rounded-lg hover:bg-muted transition-colors text-sm focus:outline-none focus:ring-0">{t("customer")}</NavLink>
                <NavLink to="/dashboard/owner" onClick={()=>setOpen(false)} className="block py-2 px-2 rounded-lg hover:bg-muted transition-colors text-sm focus:outline-none focus:ring-0">{t("owner")}</NavLink>
                <NavLink to="/dashboard/admin" onClick={()=>setOpen(false)} className="block py-2 px-2 rounded-lg hover:bg-muted transition-colors text-sm focus:outline-none focus:ring-0">{t("admin")}</NavLink>
                <NavLink to="/profile" onClick={()=>setOpen(false)} className="block py-2 px-2 rounded-lg hover:bg-muted transition-colors text-sm focus:outline-none focus:ring-0">Profile</NavLink>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <div className="text-xs text-muted-foreground mb-3 font-medium">Account</div>
              <NavLink to="/login" onClick={()=>setOpen(false)} className="block py-2 px-2 rounded-lg hover:bg-muted transition-colors text-sm focus:outline-none focus:ring-0">Login</NavLink>
            </div>
            
            <Button asChild className="mt-auto bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
              <a href="#booking">{t("get_started")}</a>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
