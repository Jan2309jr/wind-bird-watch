import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Dr. Sarah Chen",
    role: "Environmental Consultant",
    text: "The accuracy of bird movement prediction is revolutionary. It's the first time we've seen AI used so effectively for conservation in wind energy.",
    avatar: "SC"
  },
  {
    name: "James Wilson",
    role: "Wind Farm Operator",
    text: "Reducing downtime while maintaining safety is our top priority. EcoTurbines helps us achieve both with zero compromises.",
    avatar: "JW"
  },
  {
    name: "Elena Rodriguez",
    role: "Wildlife Policy Director",
    text: "A necessary tool for the modern energy transition. It bridges the gap between renewable scaling and biodiversity protection.",
    avatar: "ER"
  }
];

export const Reviews = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Industry Experts</h2>
          <p className="text-muted-foreground">Leading organizations use EcoTurbines to manage their environmental impact responsibly.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-2xl border-white/5"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm italic mb-6 text-muted-foreground">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-xs text-primary">
                  {r.avatar}
                </div>
                <div>
                  <div className="text-sm font-bold">{r.name}</div>
                  <div className="text-[10px] text-muted-foreground uppercase">{r.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
