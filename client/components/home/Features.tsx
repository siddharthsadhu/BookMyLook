import { motion } from "framer-motion";
import { useI18n } from "@/i18n";

export default function Features(){
  const { t } = useI18n();
  const items = [
    { title: t("f1"), desc: "Track positions and get pinged when next.", icon: "🟢" },
    { title: t("f2"), desc: "Book your slot in seconds with smart time windows.", icon: "⚡" },
    { title: t("f3"), desc: "Earn points on every visit and unlock perks.", icon: "🎁" },
    { title: t("f4"), desc: "Pay via UPI/Razorpay with one-tap checkout.", icon: "🔐" },
  ];
  return (
    <section className="container py-16">
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">{t("features_title")}</h2>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i)=> (
          <motion.div key={it.title} initial={{opacity:0, y: 10}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay: i*0.05}} className="rounded-2xl border p-5 hover:shadow-xl hover:-translate-y-1 transition bg-background/80">
            <div className="text-3xl">{it.icon}</div>
            <div className="mt-2 font-semibold">{it.title}</div>
            <p className="text-sm text-muted-foreground mt-1">{it.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
