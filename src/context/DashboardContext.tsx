import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Turbine, Alert, initialTurbines, initialAlerts, RiskLevel, TurbineStatus } from "@/lib/mockData";
import { toast } from "sonner";

interface DashboardContextType {
  turbines: Turbine[];
  alerts: Alert[];
  addTurbine: (turbine: Omit<Turbine, "id">) => void;
  updateTurbine: (id: string, updates: Partial<Turbine>) => void;
  deleteTurbine: (id: string) => void;
  addAlert: (alert: Omit<Alert, "id" | "time" | "timestamp">) => void;
  resolveAlert: (id: string) => void;
  deleteAlert: (id: string) => void;
  birdActivityScore: number;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [turbines, setTurbines] = useState<Turbine[]>(initialTurbines);
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [birdActivityScore, setBirdActivityScore] = useState(45);

  // Simulation Logic
  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Randomly update global bird activity score
      setBirdActivityScore((prev) => Math.max(10, Math.min(100, prev + (Math.random() * 20 - 10))));

      // 2. Update individual turbine risk and bird counts
      setTurbines((prev) =>
        prev.map((t) => {
          const birdChange = Math.random() * 10 - 5;
          const newBirds = Math.max(1, Math.min(100, Math.round(t.birds + birdChange)));
          
          let newRisk: RiskLevel = "low";
          if (newBirds > 70) newRisk = "high";
          else if (newBirds > 30) newRisk = "medium";

          // Auto-throttle if high risk
          let newStatus = t.status;
          if (newRisk === "high" && t.status === "active") {
             newStatus = "throttled";
          }

          return { ...t, birds: newBirds, risk: newRisk, status: newStatus };
        })
      );
    }, 10000); // Slower interval for better UI stability

    return () => clearInterval(interval);
  }, []); // Only run once on mount

  // Alert Generation Logic
  useEffect(() => {
    turbines.forEach(t => {
      if (t.risk === "high" && !alerts.some(a => a.turbineId === t.id && a.status === "active")) {
        const newAlert: Alert = {
          id: `A-${Math.random().toString(36).substring(2, 11)}`,
          turbineId: t.id,
          level: "high",
          title: `Critical Risk: ${t.id} sector`,
          time: "Just now",
          action: "Protocol T-70 activated (auto-throttle)",
          status: "active",
          timestamp: Date.now()
        };
        setAlerts(prev => [newAlert, ...prev]);
        toast.error(`System Protocol Activated: ${t.id}`, {
          description: "Critical bird activity detected. Turbine throttled."
        });
      }
    });
  }, [turbines, alerts]);

  const addTurbine = (turbine: Omit<Turbine, "id">) => {
    const newId = `T-${String(turbines.length + 1).padStart(2, "0")}`;
    setTurbines(prev => [...prev, { ...turbine, id: newId }]);
    toast.success(`Unit ${newId} registered to fleet`);
  };

  const updateTurbine = (id: string, updates: Partial<Turbine>) => {
    setTurbines(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTurbine = (id: string) => {
    setTurbines(prev => prev.filter(t => t.id !== id));
    toast.info(`Unit ${id} decommissioned`);
  };

  const addAlert = (alert: Omit<Alert, "id" | "time" | "timestamp">) => {
    const newAlert: Alert = {
      ...alert,
      id: `A-${Math.random().toString(36).substring(2, 11)}`,
      time: "Just now",
      timestamp: Date.now(),
      status: "active"
    };
    setAlerts(prev => [newAlert, ...prev]);
    toast(`Alert Manual Entry: ${alert.title}`);
  };

  const resolveAlert = (id: string) => {
    const alert = alerts.find(a => a.id === id);
    if (alert) {
      setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: "resolved" } : a));
      updateTurbine(alert.turbineId, { status: "active" });
      toast.success("Sector cleared. Resuming operational mode.");
    }
  };

  const deleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  return (
    <DashboardContext.Provider value={{ 
      turbines, alerts, addTurbine, updateTurbine, deleteTurbine, 
      addAlert, resolveAlert, deleteAlert, birdActivityScore 
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
