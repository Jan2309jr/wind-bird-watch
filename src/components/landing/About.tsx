import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export const About = () => {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full bg-primary/20 blur-[160px]" />

      <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-strong rounded-3xl p-10"
        >
          <div className="inline-flex items-center gap-2 text-xs text-primary mb-4">
            <Sparkles className="h-3.5 w-3.5" /> What we do
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
            What is <span className="text-gradient-orange">EcoTurbines?</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            EcoTurbines is an AI platform that predicts bird movement using
            real-time weather, migration patterns, and on-site sensors — then
            tells your turbines exactly when to slow down to prevent collisions.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Cleaner energy. Safer skies. Zero compromise.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <div className="aspect-[4/3] rounded-3xl glass-strong p-3 overflow-hidden">
            <div className="h-full w-full rounded-2xl bg-gradient-to-br from-primary/40 via-background to-secondary/40 relative overflow-hidden flex items-center justify-center">
              <svg viewBox="0 0 400 300" className="w-full h-full">
                <defs>
                  <radialGradient id="r1" cx="30%" cy="60%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                  <radialGradient id="r2" cx="80%" cy="30%">
                    <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                </defs>
                <rect width="400" height="300" fill="url(#r1)" />
                <rect width="400" height="300" fill="url(#r2)" />
                {/* turbines */}
                {[80, 200, 320].map((x, i) => (
                  <g key={i} transform={`translate(${x}, 200)`}>
                    <rect x="-2" y="0" width="4" height="60" fill="hsl(var(--foreground) / 0.7)" />
                    <circle cx="0" cy="0" r="4" fill="hsl(var(--foreground))" />
                    <g style={{ transformOrigin: "0 0", animation: `spin ${3 + i}s linear infinite` }}>
                      <rect x="-1.5" y="-32" width="3" height="32" fill="hsl(var(--foreground) / 0.8)" />
                      <rect x="-1.5" y="0" width="3" height="32" fill="hsl(var(--foreground) / 0.8)" transform="rotate(120)" />
                      <rect x="-1.5" y="0" width="3" height="32" fill="hsl(var(--foreground) / 0.8)" transform="rotate(240)" />
                    </g>
                  </g>
                ))}
                {/* birds */}
                {[[60, 80], [150, 50], [240, 90], [310, 60]].map(([x, y], i) => (
                  <path key={i} d={`M${x},${y} q5,-6 10,0 q5,-6 10,0`} stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none" />
                ))}
              </svg>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
