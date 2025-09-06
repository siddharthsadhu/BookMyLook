import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/i18n";

interface Salon { id: string; name: string; service: string; queue: number; eta: number; }

const baseSalons: Salon[] = [
  { id: "s1", name: "Fade Factory", service: "Haircut", queue: 5, eta: 12 },
  { id: "s2", name: "Urban Clippers", service: "Beard Trim", queue: 2, eta: 6 },
  { id: "s3", name: "Glow & Go Spa", service: "Facial", queue: 3, eta: 18 },
  { id: "s4", name: "Style Studio", service: "Coloring", queue: 4, eta: 25 },
];

export default function RealTimeQueue(){
  const { t } = useI18n();
  const [salons, setSalons] = useState<Salon[]>(baseSalons);

  useEffect(() => {
    const id = setInterval(() => {
      setSalons(prev => prev
        .map(s => ({
          ...s,
          queue: Math.max(0, s.queue + (Math.random() > 0.5 ? 1 : -1)),
          eta: Math.max(1, Math.round(s.eta + (Math.random() > 0.5 ? 1 : -1))),
        }))
        .slice(0, 4)
      );
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="container py-16" id="queue">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">{t("real_time_updates")}</h2>
          <p className="text-muted-foreground">Live {t("est_wait")} • {t("mins")}</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence initial={false}>
          {salons.map(s => (
            <motion.div layout key={s.id} className="rounded-2xl border p-4 hover:shadow-lg transition bg-background/80"
              initial={{opacity:0, y: 10}} animate={{opacity:1, y:0}} exit={{opacity:0, y: -10}}>
              <div className="font-semibold">{s.name}</div>
              <div className="text-sm text-muted-foreground">{s.service}</div>
              <div className="mt-3 flex items-center justify-between">
                <div className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{s.queue} in queue</div>
                <div className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">{t("est_wait")} {s.eta} {t("mins")}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
