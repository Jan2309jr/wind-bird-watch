import { Database, Bird, Radar, BookOpen, AlertTriangle, Calculator } from "lucide-react";

const dataSources = [
  { icon: Database, name: "USGS USWTDB", desc: "U.S. Wind Turbine Database with locations, specs, and commissioning years for 76,000+ turbines across 45 states." },
  { icon: Bird, name: "eBird / Cornell Lab", desc: "Community science platform providing recent bird observations near turbine locations for species presence and abundance." },
  { icon: Radar, name: "BirdCast", desc: "Migration intensity forecasts trained on 23 years of bird movement detected by weather radar, linked with weather variables." },
];

const AboutPage = () => (
  <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
    <div className="mb-12">
      <h1 className="text-3xl font-bold text-foreground">About & Methodology</h1>
      <p className="mt-3 text-muted-foreground">
        EcoTurbine predicts bird–wind turbine collision risk by combining turbine siting data, real-time bird observations, and migration forecasts into a single, actionable risk index.
      </p>
    </div>

    {/* Data Sources */}
    <section className="mb-12">
      <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-foreground">
        <BookOpen className="h-5 w-5 text-primary" /> Data Sources
      </h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {dataSources.map((ds) => (
          <div key={ds.name} className="rounded-xl border border-border bg-card p-5 shadow-card">
            <ds.icon className="mb-3 h-8 w-8 text-primary" />
            <h3 className="mb-2 font-semibold text-foreground">{ds.name}</h3>
            <p className="text-sm text-muted-foreground">{ds.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Risk Model */}
    <section className="mb-12">
      <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-foreground">
        <Calculator className="h-5 w-5 text-primary" /> Risk Model
      </h2>
      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <p className="mb-4 text-sm text-muted-foreground">
          The collision risk index is computed as a weighted combination of three components:
        </p>
        <div className="mb-4 rounded-lg border border-border bg-background px-5 py-4 font-mono text-sm text-foreground">
          Risk<sub>overall</sub> = w₁ · Siting + w₂ · Migration + w₃ · Weather
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><strong className="text-foreground">Siting Risk:</strong> Based on turbine proximity to sensitive habitats, Important Bird Areas, and known flyways. Static per turbine.</li>
          <li><strong className="text-foreground">Migration Risk:</strong> Derived from BirdCast-style nightly migration intensity forecasts and eBird recent observations. Dynamic, updated daily.</li>
          <li><strong className="text-foreground">Weather Risk:</strong> Factors like low cloud ceiling, fog, and wind patterns that increase collision likelihood. Dynamic.</li>
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">
          Default weights: w₁ = 0.25, w₂ = 0.45, w₃ = 0.30. Categories: LOW (&lt;40%), MEDIUM (40–69%), HIGH (≥70%).
        </p>
      </div>
    </section>

    {/* Limitations */}
    <section>
      <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-foreground">
        <AlertTriangle className="h-5 w-5 text-accent" /> Limitations & Future Work
      </h2>
      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• This is an MVP using surrogate risk variables; actual collision data requires post-construction monitoring.</li>
          <li>• Migration forecasts are approximated for this demo; production use would integrate live BirdCast API feeds.</li>
          <li>• Currently limited to a U.S. demo region; architecture supports expansion to other geographies.</li>
          <li>• Species-specific vulnerability weights are not yet incorporated but planned for future iterations.</li>
          <li>• The alert notification system is simulated; real deployment would use email/SMS services.</li>
        </ul>
      </div>
    </section>
  </div>
);

export default AboutPage;
