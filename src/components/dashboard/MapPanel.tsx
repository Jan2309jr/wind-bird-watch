import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import { useDashboard } from "@/context/DashboardContext";

const turbineIcon = (risk: string) => L.divIcon({
  className: "",
  html: `<div style="
    width:22px;height:22px;border-radius:50%;
    background:${risk === "high" ? "hsl(0,85%,60%)" : risk === "medium" ? "hsl(40,100%,55%)" : "hsl(150,70%,50%)"};
    box-shadow:0 0 0 4px ${risk === "high" ? "hsla(0,85%,60%,0.3)" : risk === "medium" ? "hsla(40,100%,55%,0.3)" : "hsla(150,70%,50%,0.3)"};
    border:2px solid white;
    display:flex;align-items:center;justify-content:center;
    transition: all 0.3s ease;">
    <div style="width:6px;height:6px;border-radius:50%;background:white;animation:pulse 2s infinite;"></div>
    </div>`,
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

const colorFor = (risk: string) =>
  risk === "high" ? "hsl(0,85%,60%)" : risk === "medium" ? "hsl(40,100%,55%)" : "hsl(150,70%,50%)";

export const MapPanel = ({ height = 380 }: { height?: number }) => {
  const { turbines } = useDashboard();

  return (
    <div className="glass-strong rounded-2xl p-3 overflow-hidden animate-fade-in">
      <div className="flex justify-between items-center px-3 pt-2 pb-3">
        <div>
          <h3 className="font-display font-semibold">Live map</h3>
          <p className="text-xs text-muted-foreground">Turbines + bird activity hotspots (India)</p>
        </div>
        <div className="flex gap-3 text-xs">
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-success" /> Low risk</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-warning" /> Med risk</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-destructive" /> High risk</span>
        </div>
      </div>
      <div className="rounded-xl overflow-hidden" style={{ height }}>
        <MapContainer 
          center={[20.5937, 78.9629]} 
          zoom={5} 
          scrollWheelZoom={true} 
          style={{ height: "100%", width: "100%", background: "hsl(var(--muted))" }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          {turbines.map((t) => (
            <div key={t.id}>
              {/* Heatmap-like simulation for bird activity */}
              <Circle 
                center={[t.lat, t.lng]} 
                radius={t.birds * 500} 
                pathOptions={{ 
                    color: t.birds > 60 ? "hsl(0,85%,60%)" : "hsl(150,70%,50%)", 
                    fillOpacity: 0.1, 
                    weight: 1 
                }} 
              />
              <Marker position={[t.lat, t.lng]} icon={turbineIcon(t.risk)}>
                <Popup className="custom-popup">
                  <div className="p-1 min-w-[150px]">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-sm tracking-tight">{t.id}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                            t.status === "active" ? "bg-success/10 text-success border-success/20" : 
                            t.status === "throttled" ? "bg-warning/10 text-warning border-warning/20" : 
                            "bg-muted text-muted-foreground border-border"
                        }`}>
                            {t.status.toUpperCase()}
                        </span>
                    </div>
                    <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Risk level:</span>
                            <span className="font-medium capitalize">{t.risk}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Bird score:</span>
                            <span className="font-medium">{t.birds}</span>
                        </div>
                        <div className="mt-3 pt-2 border-t border-border">
                            <div className="text-[10px] uppercase text-muted-foreground font-semibold mb-1">Recommended Action:</div>
                            <div className="p-2 rounded bg-muted/50 font-medium text-primary">
                                {t.risk === "high" ? "🚨 Immediate Throttle" : t.risk === "medium" ? "⚠️ Manual Monitor" : "✅ Normal Ops"}
                            </div>
                        </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            </div>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};
