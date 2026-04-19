import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useDashboard } from "@/context/DashboardContext";
import { AlertCircle, CheckCircle2, Trash2, Plus, Bell } from "lucide-react";
import { RiskLevel } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Alerts = () => {
  const { alerts, turbines, resolveAlert, deleteAlert, addAlert } = useDashboard();
  const [newAlert, setNewAlert] = useState<{ 
    turbineId: string; 
    level: RiskLevel; 
    title: string; 
    action: string; 
  }>({
    turbineId: "",
    level: "low",
    title: "",
    action: "",
  });

  const activeAlerts = alerts.filter((a) => a.status === "active");
  const resolvedAlerts = alerts.filter((a) => a.status === "resolved");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlert.turbineId || !newAlert.title) return;
    addAlert(newAlert);
    setNewAlert({ turbineId: "", level: "low", title: "", action: "" });
  };

  return (
    <DashboardLayout title="Alert Management">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Alert List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-strong rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Active Alerts ({activeAlerts.length})
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Turbine</TableHead>
                  <TableHead>Risk</TableHead>
                  <TableHead>Notification</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeAlerts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                      No active alerts. System status nominal.
                    </TableCell>
                  </TableRow>
                ) : (
                  activeAlerts.map((alert) => (
                    <TableRow key={alert.id} className="group">
                      <TableCell className="font-semibold">{alert.turbineId}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                          alert.level === "high" ? "bg-destructive/10 text-destructive border border-destructive/20" :
                          alert.level === "medium" ? "bg-warning/10 text-warning border border-warning/20" :
                          "bg-primary/10 text-primary border border-primary/20"
                        }`}>
                          {alert.level}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-medium">{alert.title}</div>
                        <div className="text-xs text-muted-foreground">{alert.action}</div>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{alert.time}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => resolveAlert(alert.id)}
                            className="h-8 w-8 text-success hover:bg-success/10"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => deleteAlert(alert.id)}
                            className="h-8 w-8 text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="glass-strong rounded-2xl p-6 opacity-60">
            <h3 className="text-sm font-semibold mb-4 text-muted-foreground">Recently Resolved</h3>
            <div className="space-y-3">
              {resolvedAlerts.slice(0, 3).map((alert) => (
                <div key={alert.id} className="flex items-center justify-between text-xs border-b border-border/40 pb-2">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <div>
                      <div className="font-medium">{alert.title}</div>
                      <div className="text-muted-foreground text-[10px]">{alert.turbineId} • {alert.time}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Manual Creation Form */}
        <div className="space-y-6">
          <div className="glass-strong rounded-2xl p-6 sticky top-22">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Manual Alert
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase">Turbine ID</label>
                <Select 
                  value={newAlert.turbineId} 
                  onValueChange={(val) => setNewAlert({ ...newAlert, turbineId: val })}
                >
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Select Turbine" />
                  </SelectTrigger>
                  <SelectContent>
                    {turbines.map(t => (
                      <SelectItem key={t.id} value={t.id}>{t.id} - {t.state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase">Risk Level</label>
                <Select 
                  value={newAlert.level} 
                  onValueChange={(val: RiskLevel) => setNewAlert({ ...newAlert, level: val })}
                >
                  <SelectTrigger className="bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase">Description</label>
                <Input 
                  placeholder="e.g. Visual spotting of raptors" 
                  value={newAlert.title}
                  onChange={(e) => setNewAlert({ ...newAlert, title: e.target.value })}
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase">Action Taken</label>
                <Input 
                  placeholder="e.g. Scheduled manual check" 
                  value={newAlert.action}
                  onChange={(e) => setNewAlert({ ...newAlert, action: e.target.value })}
                  className="bg-background/50"
                />
              </div>

              <Button type="submit" className="w-full h-11 glow-orange mt-2" disabled={!newAlert.turbineId || !newAlert.title}>
                Generate Alert
              </Button>
            </form>
          </div>

          <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5">
                <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-primary shrink-0" />
                    <div className="text-xs space-y-1">
                        <div className="font-bold">Protocol Info</div>
                        <p className="text-muted-foreground leading-relaxed">
                            Generating a <strong>High Risk</strong> alert will automatically trigger the turbine's safety throttle protocol.
                        </p>
                    </div>
                </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Alerts;
