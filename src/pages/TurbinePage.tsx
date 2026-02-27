import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Wind, Calendar, Zap, Bird, AlertTriangle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockTurbines, mockObservations, generateRiskTimeSeries, getRiskColor, getRiskBgColor } from "@/lib/mock-data";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const TurbinePage = () => {
  const { id } = useParams<{ id: string }>();
  const turbine = mockTurbines.find((t) => t.turbineId === id);

  if (!turbine) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <AlertTriangle className="mb-4 h-12 w-12 text-accent" />
        <h2 className="text-xl font-bold text-foreground">Turbine not found</h2>
        <Button asChild variant="outline" className="mt-4">
          <Link to="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    );
  }

  const timeSeries = generateRiskTimeSeries(turbine);
  const drivers = [
    { name: "Siting", value: turbine.risk.siting, icon: MapPin },
    { name: "Migration", value: turbine.risk.migration, icon: Bird },
    { name: "Weather", value: turbine.risk.weather, icon: Wind },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Back */}
      <Button asChild variant="ghost" size="sm" className="mb-6 gap-1">
        <Link to="/dashboard"><ArrowLeft className="h-4 w-4" /> Dashboard</Link>
      </Button>

      {/* Header */}
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{turbine.projectName}</h1>
          <p className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{turbine.state}</span>
            <span className="flex items-center gap-1"><Zap className="h-3 w-3" />{turbine.capacityMw} MW</span>
            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />Since {turbine.commissioningYear}</span>
            <span>Hub: {turbine.hubHeightM}m · Rotor: {turbine.rotorDiameterM}m</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className={`${getRiskColor(turbine.risk.category)} border-current text-sm px-3 py-1`}>
            {turbine.risk.category} RISK
          </Badge>
          <span className={`text-2xl font-bold ${getRiskColor(turbine.risk.category)}`}>
            {(turbine.risk.overall * 100).toFixed(0)}%
          </span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Risk time series */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-card lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold text-foreground">7-Day Risk Forecast</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={timeSeries}>
              <defs>
                <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(173 85% 35%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(173 85% 35%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 20%)" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(215 15% 55%)" }} />
              <YAxis domain={[0, 1]} tick={{ fontSize: 11, fill: "hsl(215 15% 55%)" }} tickFormatter={(v: number) => `${(v * 100).toFixed(0)}%`} />
              <Tooltip
                contentStyle={{ background: "hsl(220 30% 12%)", border: "1px solid hsl(220 20% 20%)", borderRadius: "8px", color: "hsl(180 10% 92%)" }}
                formatter={(v: number) => `${(v * 100).toFixed(1)}%`}
              />
              <Area type="monotone" dataKey="overall" stroke="hsl(173 85% 35%)" fill="url(#riskGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="migration" stroke="hsl(38 92% 50%)" fill="none" strokeWidth={1.5} strokeDasharray="4 4" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Risk drivers */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h3 className="mb-4 text-sm font-semibold text-foreground">Risk Drivers</h3>
          <div className="space-y-4">
            {drivers.map((d) => {
              const cat = d.value >= 0.7 ? "HIGH" : d.value >= 0.4 ? "MEDIUM" : "LOW";
              return (
                <div key={d.name}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <d.icon className="h-4 w-4" /> {d.name}
                    </span>
                    <span className={`font-semibold ${getRiskColor(cat)}`}>{(d.value * 100).toFixed(0)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className={`h-2 rounded-full ${getRiskBgColor(cat)} transition-all`} style={{ width: `${d.value * 100}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Conservation */}
          <div className="mt-6 rounded-lg border border-border bg-background p-4">
            <h4 className="flex items-center gap-2 text-xs font-semibold text-foreground">
              <Shield className="h-3 w-3 text-primary" /> Conservation Context
            </h4>
            <p className="mt-2 text-xs text-muted-foreground">
              Nearest Important Bird Area: ~12 km NW. Species of concern in range include Golden Eagle and Whooping Crane.
            </p>
          </div>
        </div>

        {/* Bird Observations */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-card lg:col-span-3">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
            <Bird className="h-4 w-4 text-primary" /> Recent Bird Observations
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="pb-2 pr-4">Species</th>
                  <th className="pb-2 pr-4">Scientific Name</th>
                  <th className="pb-2 pr-4">Count</th>
                  <th className="pb-2 pr-4">Date</th>
                  <th className="pb-2">Location</th>
                </tr>
              </thead>
              <tbody>
                {mockObservations.map((obs) => (
                  <tr key={`${obs.speciesCode}-${obs.obsDt}`} className="border-b border-border/50">
                    <td className="py-2.5 pr-4 font-medium text-foreground">{obs.comName}</td>
                    <td className="py-2.5 pr-4 italic text-muted-foreground">{obs.sciName}</td>
                    <td className="py-2.5 pr-4 text-foreground">{obs.howMany}</td>
                    <td className="py-2.5 pr-4 text-muted-foreground">{obs.obsDt}</td>
                    <td className="py-2.5 text-muted-foreground">{obs.locName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TurbinePage;
