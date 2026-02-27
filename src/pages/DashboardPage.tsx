import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockTurbines, getRiskColor, getRiskBgColor } from "@/lib/mock-data";
import { Wind, ExternalLink, Filter } from "lucide-react";
import "leaflet/dist/leaflet.css";

const riskColorHex = (category: string) => {
  switch (category) {
    case "HIGH": return "#ef4444";
    case "MEDIUM": return "#f59e0b";
    case "LOW": return "#14b8a6";
    default: return "#888";
  }
};

const DashboardPage = () => {
  const [riskMin, setRiskMin] = useState(0);
  const [showFilters, setShowFilters] = useState(true);

  const filtered = useMemo(
    () => mockTurbines.filter((t) => t.risk.overall >= riskMin),
    [riskMin]
  );

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col lg:flex-row">
      {/* Sidebar */}
      <div className={`${showFilters ? "w-full lg:w-80" : "w-0"} shrink-0 overflow-hidden border-r border-border bg-card transition-all`}>
        <div className="flex h-full flex-col">
          <div className="border-b border-border p-4">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Filter className="h-4 w-4 text-primary" />
              Filters
            </h2>
            <div className="mt-4">
              <label className="text-xs font-medium text-muted-foreground">
                Min Risk Threshold: {(riskMin * 100).toFixed(0)}%
              </label>
              <Slider
                value={[riskMin]}
                onValueChange={([v]) => setRiskMin(v)}
                min={0}
                max={1}
                step={0.05}
                className="mt-2"
              />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Showing {filtered.length} of {mockTurbines.length} turbines
            </p>
          </div>

          {/* Turbine list */}
          <div className="flex-1 overflow-y-auto p-2">
            {filtered
              .sort((a, b) => b.risk.overall - a.risk.overall)
              .map((t) => (
                <Link
                  key={t.turbineId}
                  to={`/turbine/${t.turbineId}`}
                  className="mb-2 block rounded-lg border border-border bg-background p-3 transition-colors hover:border-primary/30"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{t.projectName}</p>
                      <p className="text-xs text-muted-foreground">{t.turbineId} · {t.state}</p>
                    </div>
                    <Badge variant="outline" className={`${getRiskColor(t.risk.category)} border-current text-xs`}>
                      {t.risk.category}
                    </Badge>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1.5 flex-1 rounded-full bg-muted">
                      <div
                        className={`h-1.5 rounded-full ${getRiskBgColor(t.risk.category)}`}
                        style={{ width: `${t.risk.overall * 100}%` }}
                      />
                    </div>
                    <span className={`text-xs font-semibold ${getRiskColor(t.risk.category)}`}>
                      {(t.risk.overall * 100).toFixed(0)}%
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>

      {/* Map area */}
      <div className="relative flex-1">
        <Button
          variant="outline"
          size="sm"
          className="absolute left-2 top-2 z-[1000] lg:hidden"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="mr-1 h-3 w-3" /> Filters
        </Button>

        <MapContainer
          center={[38.5, -98.0]}
          zoom={5}
          className="h-full w-full"
          style={{ background: "hsl(222 47% 6%)" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          {filtered.map((t) => (
            <CircleMarker
              key={t.turbineId}
              center={[t.latitude, t.longitude]}
              radius={8 + t.risk.overall * 8}
              pathOptions={{
                color: riskColorHex(t.risk.category),
                fillColor: riskColorHex(t.risk.category),
                fillOpacity: 0.6,
                weight: 2,
              }}
            >
              <Popup>
                <div className="min-w-[180px] text-foreground">
                  <p className="font-semibold">{t.projectName}</p>
                  <p className="text-xs text-muted-foreground">{t.turbineId} · {t.state}</p>
                  <p className="mt-1 text-sm">
                    Risk: <span className="font-bold">{(t.risk.overall * 100).toFixed(0)}%</span> ({t.risk.category})
                  </p>
                  <Link
                    to={`/turbine/${t.turbineId}`}
                    className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                  >
                    View Details <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 z-[1000] rounded-lg border border-border bg-card/90 px-4 py-3 backdrop-blur-sm">
          <p className="mb-2 text-xs font-semibold text-foreground">Risk Level</p>
          <div className="flex flex-col gap-1">
            {[
              { label: "High (≥70%)", cls: "bg-risk-high" },
              { label: "Medium (40–69%)", cls: "bg-risk-medium" },
              { label: "Low (<40%)", cls: "bg-risk-low" },
            ].map((r) => (
              <div key={r.label} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className={`h-3 w-3 rounded-full ${r.cls}`} />
                {r.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
