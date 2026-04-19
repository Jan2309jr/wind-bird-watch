import { motion } from "framer-motion";
import { LayoutDashboard, Radar, BellRing } from "lucide-react";

const features = [
  { icon: LayoutDashboard, title: "User-friendly dashboard", desc: "Monitor every turbine, bird flock, and risk score from one clean interface." },
  { icon: Radar, title: "Real-time bird tracking", desc: "Live radar + AI vision detect flocks before they reach turbine zones." },
  { icon: BellRing, title: "Smart risk alerts", desc: "Automatic slow-down recommendations the moment risk exceeds thresholds." },
];

export const Features = () => {
  return (
    <section id="features" className="relative py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <h2 className="font-display text-5xl md:text-6xl font-bold mb-4">Features</h2>
          <p className="text-muted-foreground text-lg">
            Everything wind farm operators need to predict, monitor, and prevent collisions — in one platform.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-strong rounded-3xl p-8 hover:-translate-y-1 transition-all duration-500 group"
            >
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center mb-6 group-hover:glow-orange transition-all">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
