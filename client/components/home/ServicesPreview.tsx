import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useI18n } from "@/i18n";

const items = [
  { id: "svc1", name: "Haircut", price: "₹299", color: "from-purple-500 to-pink-500" },
  { id: "svc2", name: "Beard Trim", price: "₹149", color: "from-cyan-500 to-blue-500" },
  { id: "svc3", name: "Facial", price: "₹799", color: "from-rose-500 to-orange-500" },
  { id: "svc4", name: "Head Massage", price: "₹399", color: "from-emerald-500 to-teal-500" },
];

export default function ServicesPreview(){
  const { t } = useI18n();
  return (
    <section className="container py-16" id="services">
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">{t("services_title")}</h2>
        <Link to="/services" className="text-sm text-primary hover:underline">{t("view_all")}</Link>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i)=> (
          <motion.div key={it.id} initial={{opacity:0, y: 10}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay: i*0.05}}
            className={`group relative overflow-hidden rounded-2xl border p-5 bg-background/80`}
          >
            <div className={`absolute -top-10 -right-10 h-32 w-32 rounded-full blur-2xl opacity-30 bg-gradient-to-br ${it.color}`} />
            <div className="font-semibold">{it.name}</div>
            <div className="text-sm text-muted-foreground">Starting at {it.price}</div>
            <div className="mt-6 flex gap-2">
              <button className="flex-1 inline-flex items-center justify-center gap-2 text-sm bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:bg-primary/90 transition">
                Book <span>→</span>
              </button>
              <button 
                onClick={() => window.open('/queue_estimator.php', '_blank')}
                className="flex-1 inline-flex items-center justify-center gap-2 text-sm border border-primary text-primary px-3 py-2 rounded-lg hover:bg-primary/10 transition"
              >
                Estimate
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
