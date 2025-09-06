import { motion } from "framer-motion";
import AnimatedButton from "@/components/shared/AnimatedButton";
import { useI18n } from "@/i18n";

export default function Hero(){
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden gradient-hero">
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl bg-primary/20"/>
      <div className="absolute -top-16 right-0 h-96 w-96 rounded-full blur-3xl bg-accent/20"/>
      <div className="container grid lg:grid-cols-2 gap-10 items-center py-20 md:py-28">
        <motion.div initial={{opacity:0, y: 30}} animate={{opacity:1, y:0}} transition={{duration:0.6}}>
          <span className="inline-flex items-center gap-2 text-xs px-2.5 py-1 rounded-full border bg-background/60">
            <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></span>
            Live {t("real_time_updates")}
          </span>
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight">
            {t("app_name")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{t("tagline")}</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl">{t("hero_sub")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <AnimatedButton size="lg">{t("get_started")}</AnimatedButton>
            <AnimatedButton size="lg" variant="secondary">{t("download_app")}</AnimatedButton>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
            <Stat label={t("salons")} value="1.2k+" />
            <Stat label="Bookings" value="250k+" />
            <Stat label={t("est_wait")} value={`08 ${t("mins")}`} />
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
  return (
    <div className="mx-auto w-[280px] sm:w-[320px] rounded-[32px] border shadow-2xl bg-black text-white p-3">
      <div className="h-8"/>
      <div className="rounded-2xl overflow-hidden bg-white text-foreground">
        <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 border-b">
          <div className="text-sm text-muted-foreground">Nearest Salon</div>
          <div className="font-semibold">Book My Look Partner Salon</div>
        </div>
        <div className="p-4 space-y-3">
          {[{name:"Haircut", wait: 12, price: "₹299"},{name:"Beard Trim", wait:8, price: "₹149"},{name:"Facial", wait:20, price: "₹799"}].map((s)=> (
            <div key={s.name} className="flex items-center justify-between rounded-xl border p-3">
              <div>
                <div className="font-medium">{s.name}</div>
                <div className="text-xs text-muted-foreground">{s.price}</div>
              </div>
              <div className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">{s.wait} min</div>
            </div>
          ))}
          <div className="flex gap-2">
            <button className="flex-1 h-11 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold shadow hover:opacity-95 transition">Book Now</button>
            <button 
              onClick={() => window.open('/queue_estimator.php', '_blank')}
              className="flex-1 h-11 rounded-xl border border-primary text-primary font-semibold hover:bg-primary/10 transition"
            >
              Estimate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
