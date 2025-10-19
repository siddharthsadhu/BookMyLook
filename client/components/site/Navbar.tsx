import { useEffect, useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

type Theme = 'light' | 'dark' | 'salon' | 'customer';

export default function Navbar() {
  const { t, lang, setLang } = useI18n();
  const { theme } = useTheme() as { theme: Theme };
  const { user, isAuthenticated, logout } = useAuth();
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

  const getDashboardPath = () => {
    if (!user?.role) return '/dashboard/customer';
    
    switch (user.role) {
      case 'ADMIN':
        return '/dashboard/admin';
      case 'SALON_OWNER':
        return '/dashboard/owner';
      case 'CUSTOMER':
      default:
        return '/dashboard/customer';
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header 
      ref={navbarRef}
      id="main-navbar"
      className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", scrolled ? "backdrop-blur-md bg-background/95 border-b shadow-sm" : "bg-transparent")}
      onMouseLeave={() => setOpen(false)}
    >
      <nav className="container flex items-center justify-between py-3 px-4 md:px-6 lg:px-8">
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

        <div className="hidden md:flex items-center gap-4 lg:gap-5 mr-3 lg:mr-4">
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
          {isAuthenticated && (
            <NavLink to={getDashboardPath()} className={({isActive}) => cn("text-sm font-medium transition-colors hover:text-primary relative py-2 px-1 focus:outline-none focus:ring-0", isActive && "text-primary")}>
              {({isActive}) => (
                <>
                  Dashboard
                  {isActive && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />}
                </>
              )}
            </NavLink>
          )}
        </div>

        <div className="flex items-center gap-4 lg:gap-5">
          <div className="hidden sm:flex rounded-lg border overflow-hidden">
            <LangButton active={lang === "en"} onClick={() => setLang("en")}>EN</LangButton>
            <LangButton active={lang === "hi"} onClick={() => setLang("hi")}>हिं</LangButton>
            <LangButton active={lang === "gu"} onClick={() => setLang("gu")}>ગુ</LangButton>
          </div>
          {!isAuthenticated ? (
            <div className="hidden sm:flex items-center gap-2">
              <Button asChild className="shadow-md bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild className="shadow-md bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                <Link to="/register">Sign Up</Link>
              </Button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Welcome, {user?.firstName}
              </span>
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="text-foreground hover:text-primary"
              >
                Logout
              </Button>
            </div>
          )}
          <MobileMenu isAuthenticated={isAuthenticated} user={user} handleLogout={handleLogout} open={open} setOpen={setOpen} />
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

function MobileMenu({ isAuthenticated, user, handleLogout, open, setOpen }: { isAuthenticated: boolean; user: any; handleLogout: () => void; open: boolean; setOpen: (value: boolean | ((prev: boolean) => boolean)) => void }){
  const { t } = useI18n();

  const getDashboardPath = () => {
    if (!user?.role) return '/dashboard/customer';
    
    switch (user.role) {
      case 'ADMIN':
        return '/dashboard/admin';
      case 'SALON_OWNER':
        return '/dashboard/owner';
      case 'CUSTOMER':
      default:
        return '/dashboard/customer';
    }
  };
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
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent grid place-items-center text-white font-bold text-sm">B</div>
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
                {isAuthenticated && (
                  <NavLink to={getDashboardPath()} onClick={()=>setOpen(false)} className="block py-2 px-2 rounded-lg hover:bg-muted transition-colors text-sm focus:outline-none focus:ring-0">
                    Dashboard
                  </NavLink>
                )}
                <NavLink to="/profile" onClick={()=>setOpen(false)} className="block py-2 px-2 rounded-lg hover:bg-muted transition-colors text-sm focus:outline-none focus:ring-0">Profile</NavLink>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <div className="text-xs text-muted-foreground mb-3 font-medium">Account</div>
              {!isAuthenticated ? (
                <>
                  <NavLink to="/login" onClick={()=>setOpen(false)} className="block py-2 px-2 rounded-lg hover:bg-muted transition-colors text-sm focus:outline-none focus:ring-0">Login</NavLink>
                  <NavLink to="/register" onClick={()=>setOpen(false)} className="block py-2 px-2 rounded-lg hover:bg-muted transition-colors text-sm focus:outline-none focus:ring-0">Register</NavLink>
                </>
              ) : (
                <button 
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }} 
                  className="block w-full text-left py-2 px-2 rounded-lg hover:bg-muted transition-colors text-sm focus:outline-none focus:ring-0"
                >
                  Logout ({user?.firstName})
                </button>
              )}
            </div>
            
          </div>
        </div>
      )}
    </>
  );
}
