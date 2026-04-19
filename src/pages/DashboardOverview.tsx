import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { ActivityChart, RiskChart } from "@/components/dashboard/Charts";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { MapPanel } from "@/components/dashboard/MapPanel";
import { Wind, Bird, ShieldAlert, BellRing } from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";

const DashboardOverview = () => {
  const context = useDashboard();
  
  if (!context) {
    return <div className="p-10 text-center">Loading dashboard configurations...</div>;
  }

  const { turbines, alerts, birdActivityScore } = context;
  
  const activeTurbines = turbines?.filter(t => t.status !== "offline").length || 0;
  const highRiskCount = turbines?.filter(t => t.risk === "high").length || 0;
  const activeAlerts = alerts?.filter(a => a.status === "active").length || 0;

  return (
    <DashboardLayout title="EcoTurbines Overview">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard 
            label="Active turbines" 
            value={activeTurbines.toString()} 
            change="+1.2%" 
            trend="up" 
            icon={Wind} 
            accent="orange" 
        />
        <StatCard 
            label="Bird activity score" 
            value={Math.round(birdActivityScore).toString()} 
            change={birdActivityScore > 50 ? "+5%" : "-2%"} 
            trend={birdActivityScore > 50 ? "up" : "down"} 
            icon={Bird} 
            accent="blue" 
        />
        <StatCard 
            label="High risk zones" 
            value={highRiskCount.toString()} 
            change={highRiskCount > 2 ? "+1" : "Stable"} 
            trend={highRiskCount > 2 ? "up" : "down"} 
            icon={ShieldAlert} 
            accent="red" 
        />
        <StatCard 
            label="Alerts active" 
            value={activeAlerts.toString()} 
            change={activeAlerts > 0 ? "Action req." : "Clear"} 
            trend={activeAlerts > 0 ? "up" : "down"} 
            icon={BellRing} 
            accent="green" 
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2"><ActivityChart /></div>
        <RiskChart />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2"><MapPanel height={400} /></div>
        <AlertsPanel />
      </div>
    </DashboardLayout>
  );
};

export default DashboardOverview;
