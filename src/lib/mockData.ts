export type RiskLevel = "low" | "medium" | "high";
export type TurbineStatus = "active" | "throttled" | "offline";

export interface Turbine {
  id: string;
  lat: number;
  lng: number;
  state: string;
  status: TurbineStatus;
  risk: RiskLevel;
  birds: number; // current bird activity score
}

export interface Alert {
  id: string;
  turbineId: string;
  level: RiskLevel;
  title: string;
  time: string;
  action: string;
  status: "active" | "resolved";
  timestamp: number;
}

// Initial set of turbines across India
export const initialTurbines: Turbine[] = [
  { id: "T-01", lat: 23.0225, lng: 72.5714, state: "Gujarat", status: "active", risk: "low", birds: 15 },
  { id: "T-02", lat: 22.3072, lng: 70.8022, state: "Gujarat", status: "active", risk: "medium", birds: 45 },
  { id: "T-03", lat: 8.7139, lng: 77.7567, state: "Tamil Nadu", status: "active", risk: "high", birds: 82 },
  { id: "T-04", lat: 26.9124, lng: 70.9126, state: "Rajasthan", status: "active", risk: "low", birds: 10 },
  { id: "T-05", lat: 14.4673, lng: 75.9218, state: "Karnataka", status: "active", risk: "medium", birds: 55 },
  { id: "T-06", lat: 11.1271, lng: 78.6569, state: "Tamil Nadu", status: "active", risk: "low", birds: 20 },
  { id: "T-07", lat: 19.0760, lng: 72.8777, state: "Maharashtra", status: "active", risk: "medium", birds: 35 },
  { id: "T-08", lat: 17.3850, lng: 78.4867, state: "Telangana", status: "active", risk: "high", birds: 75 },
];

export const initialAlerts: Alert[] = [
  { 
    id: "A-01", 
    turbineId: "T-03", 
    level: "high", 
    title: "High bird activity detected near Tirunelveli cluster", 
    time: "2 min ago", 
    action: "Reduce speed recommended", 
    status: "active",
    timestamp: Date.now() - 120000 
  },
  { 
    id: "A-02", 
    turbineId: "T-08", 
    level: "medium", 
    title: "Large flock approaching Sector H", 
    time: "15 min ago", 
    action: "Monitor closely", 
    status: "active",
    timestamp: Date.now() - 900000
  },
];
