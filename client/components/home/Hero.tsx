import { motion } from "framer-motion";
import AnimatedButton from "@/components/shared/AnimatedButton";
import { useI18n } from "@/i18n";
import { useTheme } from "@/contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

export default function Hero({ stats, statsLoading }: { stats?: { salons: number; bookings: number }, statsLoading?: boolean }){
  const { t } = useI18n();
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/booking');
  };
  
  const handleDownloadApp = () => {
    // Future: Redirect to Play Store for mobile app
    // For now, this button is a placeholder
    console.log('Get the App - Coming soon! Redirect to Play Store');
  };
  
  return (
    <section className="relative overflow-hidden gradient-hero">
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl bg-primary/20"/>
      <div className="absolute -top-16 right-0 h-96 w-96 rounded-full blur-3xl bg-accent/20"/>
      <div className="container grid lg:grid-cols-2 gap-10 items-center py-20 md:py-28">
        <motion.div initial={{opacity:0, y: 30}} animate={{opacity:1, y:0}} transition={{duration:0.6}}>
          <span className="inline-flex items-center gap-2 text-xs px-2.5 py-1 rounded-full border bg-background/60">
            <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span>
            Live {t("real_time_updates")}
          </span>
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight">
            {t("app_name")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{t("tagline")}</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl">{t("hero_sub")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <AnimatedButton size="lg" onClick={handleGetStarted}>{t("get_started")}</AnimatedButton>
            <AnimatedButton size="lg" variant="secondary" onClick={handleDownloadApp}>{t("download_app")}</AnimatedButton>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
            <Stat 
              label={t("salons")} 
              value="8" 
            />
            <Stat 
              label="Bookings" 
              value="586+" 
            />
            <Stat 
              label={t("est_wait")} 
              value={`< 15 ${t("mins")}`} 
            />
          </div>
        </motion.div>
        <motion.div initial={{opacity:0, y: 30}} animate={{opacity:1, y:0}} transition={{duration:0.6, delay:0.1}}>
          <PhoneMockup />
        </motion.div>
      </div>
    </section>
  );
}

function Stat({label, value}:{label:string; value:string}){
  return (
    <div className="rounded-2xl border p-4 bg-background/80">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
    </div>
  );
}

function PhoneMockup(){
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  return (
    <div className="mx-auto w-[280px] sm:w-[320px] rounded-[32px] border shadow-2xl bg-black text-white p-3">
      <div className="h-8"/>
      <div className={`rounded-2xl overflow-hidden ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} text-foreground`}>
        <div className={`p-4 bg-gradient-to-r from-primary/10 to-accent/10 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Nearest Salon</div>
          <div className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Book My Look Partner Salon</div>
        </div>
        <div className="p-4 space-y-3">
          {[{name:"Hair Cut & Styling", wait: 12, price: "₹299"},{name:"Beard Grooming", wait:8, price: "₹149"},{name:"Hair Spa Treatment", wait:20, price: "₹799"}].map((s)=> (
            <div key={s.name} className={`flex items-center justify-between rounded-xl border p-3 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div>
                <div className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{s.name}</div>
                <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{s.price}</div>
              </div>
              <div className={`text-xs px-2 py-1 rounded-full ${theme === 'dark' ? 'bg-emerald-900/50 text-emerald-300 border border-emerald-700/50' : 'bg-green-100 text-green-700'}`}>{s.wait} min</div>
            </div>
          ))}
          <div className="flex gap-2">
            <button 
              onClick={() => navigate('/booking')}
              className="flex-1 h-11 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold shadow hover:opacity-95 transition"
            >
              Book Now
            </button>
            <button 
              onClick={() => navigate('/estimate')}
              className={`flex-1 h-11 rounded-xl border border-primary text-primary font-semibold hover:bg-primary/10 transition ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
            >
              Estimate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
