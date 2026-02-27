import { useState } from "react";
import { Bell, Plus, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { mockAlerts, mockTurbines } from "@/lib/mock-data";
import type { Alert } from "@/lib/types";

const AlertsPage = () => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [name, setName] = useState("");
  const [turbineId, setTurbineId] = useState("");
  const [metric, setMetric] = useState<Alert["metric"]>("overall");
  const [threshold, setThreshold] = useState(0.7);
  const [channel, setChannel] = useState<Alert["channel"]>("email");

  const addAlert = () => {
    if (!name || !turbineId) return;
    const newAlert: Alert = {
      id: `alert_${Date.now()}`,
      name,
      turbineIds: [turbineId],
      metric,
      threshold,
      channel,
      active: true,
      createdAt: new Date().toISOString(),
    };
    setAlerts([newAlert, ...alerts]);
    setName("");
  };

  const toggleAlert = (id: string) => {
    setAlerts(alerts.map((a) => (a.id === id ? { ...a, active: !a.active } : a)));
  };

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter((a) => a.id !== id));
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-foreground">
          <Bell className="h-6 w-6 text-primary" /> Alerts & Notifications
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          We check risk forecasts nightly using bird migration and weather data, and notify you when thresholds are exceeded.
        </p>
      </div>

      {/* Create Alert */}
      <div className="mb-8 rounded-xl border border-border bg-card p-6 shadow-card">
        <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
          <Plus className="h-4 w-4 text-primary" /> Create New Alert
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input placeholder="Alert name" value={name} onChange={(e) => setName(e.target.value)} />
          <Select value={turbineId} onValueChange={setTurbineId}>
            <SelectTrigger><SelectValue placeholder="Select turbine" /></SelectTrigger>
            <SelectContent>
              {mockTurbines.map((t) => (
                <SelectItem key={t.turbineId} value={t.turbineId}>{t.projectName} ({t.turbineId})</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={metric} onValueChange={(v) => setMetric(v as Alert["metric"])}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="overall">Overall Risk</SelectItem>
              <SelectItem value="migration">Migration</SelectItem>
              <SelectItem value="weather">Weather</SelectItem>
              <SelectItem value="siting">Siting</SelectItem>
            </SelectContent>
          </Select>
          <Select value={channel} onValueChange={(v) => setChannel(v as Alert["channel"])}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="sms">SMS</SelectItem>
              <SelectItem value="webhook">Webhook</SelectItem>
            </SelectContent>
          </Select>
          <div className="sm:col-span-2">
            <label className="text-xs font-medium text-muted-foreground">
              Threshold: {(threshold * 100).toFixed(0)}%
            </label>
            <Slider value={[threshold]} onValueChange={([v]) => setThreshold(v)} min={0} max={1} step={0.05} className="mt-2" />
          </div>
        </div>
        <Button onClick={addAlert} className="mt-4 gap-2" disabled={!name || !turbineId}>
          <Plus className="h-4 w-4" /> Create Alert
        </Button>
      </div>

      {/* Alerts Table */}
      <div className="rounded-xl border border-border bg-card shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="p-4">Name</th>
                <th className="p-4">Metric</th>
                <th className="p-4">Threshold</th>
                <th className="p-4">Channel</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((a) => (
                <tr key={a.id} className="border-b border-border/50">
                  <td className="p-4 font-medium text-foreground">{a.name}</td>
                  <td className="p-4 capitalize text-muted-foreground">{a.metric}</td>
                  <td className="p-4 text-foreground">{(a.threshold * 100).toFixed(0)}%</td>
                  <td className="p-4 text-muted-foreground">{a.channel}</td>
                  <td className="p-4">
                    <Badge variant={a.active ? "default" : "secondary"}>
                      {a.active ? "Active" : "Paused"}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => toggleAlert(a.id)}>
                        {a.active ? <ToggleRight className="h-4 w-4 text-primary" /> : <ToggleLeft className="h-4 w-4 text-muted-foreground" />}
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteAlert(a.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {alerts.length === 0 && (
                <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No alerts configured yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;
