import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Activity, Bird, Shield } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-hero-gradient">
      {/* glow orbs */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-primary/30 blur-[140px]" />
      <div className="pointer-events-none absolute -right-32 top-20 h-[400px] w-[400px] rounded-full bg-secondary/30 blur-[140px]" />

      <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse-glow" />
            AI-powered · Live bird tracking
          </div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6">
            Predict. Protect.<br />
            <span className="text-gradient-orange">Power Wind Energy</span><br />
            Safely.
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
            EcoTurbines uses AI and real-time environmental data to predict bird
            movement, prevent collisions, and keep wind farms running responsibly.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground hover:opacity-90 glow-orange">
              <Link to="/dashboard">
                Get Started <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="glass border-border">
              <Play className="mr-1 h-4 w-4" /> View Demo
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-12 max-w-md">
            {[
              { v: "98%", l: "Detection accuracy" },
              { v: "1.2k+", l: "Turbines monitored" },
              { v: "24/7", l: "Real-time alerts" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-2xl font-bold text-gradient-orange">{s.v}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mock dashboard preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl" />
          <div className="relative glass-strong rounded-3xl p-6 animate-float">
            <div className="flex items-center gap-2 mb-5">
              <div className="h-3 w-3 rounded-full bg-destructive/70" />
              <div className="h-3 w-3 rounded-full bg-warning/70" />
              <div className="h-3 w-3 rounded-full bg-success/70" />
              <div className="ml-3 text-xs text-muted-foreground">ecoturbines.io / dashboard</div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { i: Activity, l: "Active", v: "248", c: "from-primary to-primary-glow" },
                { i: Bird, l: "Birds", v: "1.4k", c: "from-secondary to-secondary-glow" },
                { i: Shield, l: "Risk", v: "Low", c: "from-success to-success" },
              ].map((c, i) => (
                <div key={i} className="glass rounded-xl p-3">
                  <div className={`h-7 w-7 rounded-lg bg-gradient-to-br ${c.c} flex items-center justify-center mb-2`}>
                    <c.i className="h-3.5 w-3.5 text-background" />
                  </div>
                  <div className="text-xs text-muted-foreground">{c.l}</div>
                  <div className="font-display text-lg font-bold">{c.v}</div>
                </div>
              ))}
            </div>

            <div className="glass rounded-xl p-4 h-40 relative overflow-hidden">
              <div className="text-xs text-muted-foreground mb-2">Bird activity · last 24h</div>
              <svg className="w-full h-24" viewBox="0 0 300 80" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,60 C40,40 60,55 90,35 C120,15 150,45 180,30 C210,18 240,40 300,20 L300,80 L0,80 Z" fill="url(#g)" />
                <path d="M0,60 C40,40 60,55 90,35 C120,15 150,45 180,30 C210,18 240,40 300,20" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
              </svg>
            </div>
          </div>

          <div className="absolute -bottom-4 -left-4 glass-strong rounded-2xl px-4 py-3 flex items-center gap-3 animate-float" style={{ animationDelay: "1s" }}>
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-secondary to-secondary-glow flex items-center justify-center">
              <Bird className="h-4 w-4 text-background" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Flock detected</div>
              <div className="text-sm font-semibold">Turbine #12 · 2.4km</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
