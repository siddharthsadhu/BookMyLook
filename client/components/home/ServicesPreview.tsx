import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useI18n } from "@/i18n";

const items = [
  { id: "svc1", name: "Hair Cut & Styling", price: "₹299", color: "from-purple-500 to-pink-500", salonId: "salon_gentleman_zone", serviceId: "service_haircut" },
  { id: "svc2", name: "Beard Grooming", price: "₹149", color: "from-cyan-500 to-blue-500", salonId: "salon_gentleman_zone", serviceId: "service_beard" },
  { id: "svc3", name: "Hair Spa Treatment", price: "₹799", color: "from-rose-500 to-orange-500", salonId: "salon_style_studio", serviceId: "service_spa" },
  { id: "svc4", name: "Swedish Massage", price: "₹1,499", color: "from-emerald-500 to-teal-500", salonId: "salon_bliss_spa", serviceId: "service_swedish_massage" },
  { id: "svc5", name: "Bridal Makeup", price: "₹2,999", color: "from-pink-500 to-rose-500", salonId: "salon_glamour_zone", serviceId: "service_bridal_makeup" },
  { id: "svc6", name: "Hair Extensions", price: "₹2,499", color: "from-amber-500 to-orange-500", salonId: "salon_trendy_tresses", serviceId: "service_hair_extensions" },
  { id: "svc7", name: "Hot Towel Shave", price: "₹299", color: "from-gray-600 to-gray-800", salonId: "salon_classic_cuts", serviceId: "service_hot_towel_shave" },
  { id: "svc8", name: "Basic Haircut", price: "₹199", color: "from-green-500 to-emerald-500", salonId: "salon_beauty_boulevard", serviceId: "service_basic_haircut" },
];

export default function ServicesPreview(){
  const { t } = useI18n();
  const navigate = useNavigate();
  
  const handleBookClick = (item: {salonId: string, serviceId: string}) => {
    navigate(`/booking?salon=${item.salonId}&service=${item.serviceId}`);
  };
  
  const handleEstimateClick = (item: {salonId: string, serviceId: string}) => {
    navigate(`/estimate?salonId=${item.salonId}&serviceId=${item.serviceId}`);
  };
  
  return (
    <section className="container py-16" id="services">
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">{t("services_title")}</h2>
        <Link to="/services" className="text-sm text-primary hover:underline">{t("view_all")}</Link>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
        {items.map((it, i)=> (
          <motion.div key={it.id} initial={{opacity:0, y: 10}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay: i*0.05}}
            className={`group relative overflow-hidden rounded-2xl border p-5 bg-background/80`}
          >
            <div className={`absolute -top-10 -right-10 h-32 w-32 rounded-full blur-2xl opacity-30 bg-gradient-to-br ${it.color}`} />
            <div className="font-semibold">{it.name}</div>
            <div className="text-sm text-muted-foreground">Starting at {it.price}</div>
            <div className="mt-6 flex gap-2">
              <button 
                onClick={() => handleBookClick({ salonId: it.salonId, serviceId: it.serviceId })}
                className="flex-1 inline-flex items-center justify-center gap-2 text-sm bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:bg-primary/90 transition"
              >
                Book <span>→</span>
              </button>
              <button 
                onClick={() => handleEstimateClick({ salonId: it.salonId, serviceId: it.serviceId })}
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
