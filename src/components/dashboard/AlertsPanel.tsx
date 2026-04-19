import { useDashboard } from "@/context/DashboardContext";
import { AlertTriangle, Info, AlertCircle } from "lucide-react";

const config = {
  high: { icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10 border-destructive/30" },
  medium: { icon: AlertCircle, color: "text-warning", bg: "bg-warning/10 border-warning/30" },
  low: { icon: Info, color: "text-success", bg: "bg-success/10 border-success/30" },
} as const;

export const AlertsPanel = () => {
  const { alerts } = useDashboard();
  const activeAlerts = alerts.filter(a => a.status === "active").slice(0, 5);

  return (
    <div className="glass-strong rounded-2xl p-6 h-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-display font-semibold text-lg">Live alerts</h3>
          <p className="text-xs text-muted-foreground">Updated in real time</p>
        </div>
        <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/30 uppercase tracking-tighter">
            {activeAlerts.length} active
        </span>
      </div>
      <div className="space-y-3">
        {activeAlerts.length === 0 ? (
            <div className="py-10 text-center text-xs text-muted-foreground italic">No active alerts.</div>
        ) : (
            activeAlerts.map((a) => {
                const c = config[a.level as keyof typeof config] || config.low;
                const Icon = c.icon;
                return (
                    <div key={a.id} className={`flex gap-3 p-3 rounded-xl border transition-all hover:scale-[1.02] ${c.bg}`}>
                    <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${c.color}`} />
                    <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-bold truncate tracking-tight">{a.title}</div>
                        <div className="text-[11px] text-muted-foreground/80 mt-0.5">{a.action} · {a.time}</div>
                    </div>
                    </div>
                );
            })
        )}
      </div>
    </div>
  );
};
