export type RiskCategory = "LOW" | "MEDIUM" | "HIGH";

export interface RiskComponents {
  date: string;
  overall: number;
  category: RiskCategory;
  siting: number;
  migration: number;
  weather: number;
}

export interface TurbineSummary {
  turbineId: string;
  projectName: string;
  state: string;
  latitude: number;
  longitude: number;
  capacityMw: number;
  hubHeightM: number;
  rotorDiameterM: number;
  commissioningYear: number;
  risk: RiskComponents;
}

export interface BirdObservation {
  speciesCode: string;
  comName: string;
  sciName: string;
  howMany: number;
  lat: number;
  lng: number;
  obsDt: string;
  locName: string;
}

export interface Alert {
  id: string;
  name: string;
  turbineIds: string[];
  metric: "overall" | "migration" | "weather" | "siting";
  threshold: number;
  channel: "email" | "sms" | "webhook";
  email?: string;
  active: boolean;
  createdAt: string;
}

export interface RiskTimeSeriesPoint {
  date: string;
  overall: number;
  siting: number;
  migration: number;
  weather: number;
}
