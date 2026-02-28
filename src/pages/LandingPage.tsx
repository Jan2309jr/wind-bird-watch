import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Wind, Bird, Radar, Shield, Database, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

const stats = [
  {
    value: "4,464",
    label: "birds killed per 1,000 km² annually",
    detail: "Thar Desert wind farms (world's highest rate)[web:82]",
    color: "text-amber-400"
  },
  {
    value: "1,200+",
    label: "Indian turbines mapped & risk-scored",
    detail: "Sinnar, Dharapuram, Thar hotspots live[web:82][file:82]",
    color: "text-emerald-400"
  },
  {
    value: "141+",
    label: "species tracked via eBird API",
    detail: "Cranes, ibises, raptors at Sinnar wind farm[web:33]",
    color: "text-blue-400"
  },
];

const steps = [
  { icon: Database, title: "Ingest Data", desc: "Pull turbine specs, bird observations, and migration forecasts from TheWindPower.net, eBird.org API, and WII Thar." },
  { icon: BarChart3, title: "Predict Risk", desc: "Combine siting, migration intensity, and weather into a per-turbine collision risk score." },
  { icon: Shield, title: "Alert & Mitigate", desc: "Notify operators when risk spikes so they can curtail turbines during peak migration." },
];

const LandingPage = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Wind turbines with migrating birds at twilight" className="h-full w-full object-cover" />
          <div className="absolute inset-0 gradient-hero" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Bird className="h-3 w-3" />
              Climate-Tech for Wildlife
            </div>
            <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Predict bird collision risk{" "}
              <span className="text-accent">before it happens.</span>
            </h1>
            <p className="mb-8 max-w-lg text-lg text-muted-foreground">
              A map-first decision tool that blends turbine data, bird observations, and migration forecasts to highlight when and where birds are most at risk.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="gap-2">
                <Link to="/dashboard">
                  Open Risk Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link to="/about">
                  <BookOpen className="h-4 w-4" />
                  Explore Methodology
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-card/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-card p-8 shadow-card text-center transition-all hover:bg-card/80">
                <p className={`text-4xl font-bold ${s.color} mb-2`}>{s.value}</p>
                <p className="text-lg font-medium text-gray-300 mb-1">{s.label}</p>
                <p className="text-sm text-gray-500">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground">How It Works</h2>
            <p className="mt-2 text-muted-foreground">Three steps from raw data to actionable insight</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.title} className="group relative rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:border-primary/30 hover:shadow-glow">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <step.icon className="h-6 w-6" />
                </div>
                <div className="mb-2 text-xs font-medium text-muted-foreground">Step {i + 1}</div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Sources */}
      <section className="border-t border-border bg-card/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-foreground">Powered by Trusted Data</h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
            {["TheWindPower.net", "eBird.org API", "WII Thar"].map((name) => (
              <div key={name} className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium">
                <Radar className="h-4 w-4 text-primary" />
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Wind className="mx-auto mb-4 h-10 w-10 text-primary" />
          <h2 className="mb-4 text-3xl font-bold text-foreground">
            Ready to explore turbine risk?
          </h2>
          <p className="mb-8 text-muted-foreground">
            Dive into the interactive dashboard to see real-time collision risk for Indian wind turbines.
          </p>
          <Button asChild size="lg" className="gap-2">
            <Link to="/dashboard">
              Launch Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
