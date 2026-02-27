import type { TurbineSummary, BirdObservation, Alert, RiskTimeSeriesPoint } from "./types";

/* INDIA WIND STATES CONFIG */

const INDIAN_WIND_STATES = [
  { code: "TN", name: "Tamil Nadu", lat: 10.5, lng: 77.5 },
  { code: "GJ", name: "Gujarat", lat: 22.5, lng: 71.5 },
  { code: "KA", name: "Karnataka", lat: 15.3, lng: 75.7 },
  { code: "MH", name: "Maharashtra", lat: 19.5, lng: 75.3 },
  { code: "RJ", name: "Rajasthan", lat: 26.9, lng: 73.8 },
  { code: "AP", name: "Andhra Pradesh", lat: 15.9, lng: 79.7 },
  { code: "MP", name: "Madhya Pradesh", lat: 23.5, lng: 77.4 },
];

const WIND_PROJECT_NAMES = [
  "Muppandal Wind Farm",
  "Jaisalmer Wind Park",
  "Kutch Wind Cluster",
  "Chitradurga Wind Corridor",
  "Satara Wind Project",
  "Anantapur Wind Zone",
  "Ratlam Renewable Park",
];

const CURRENT_DATE = "2026-03-01";

/* GENERATE 100 TURBINES */

export const mockTurbines: TurbineSummary[] = Array.from({ length: 100 }).map((_, i) => {
  const state = INDIAN_WIND_STATES[i % INDIAN_WIND_STATES.length];
  const project = WIND_PROJECT_NAMES[i % WIND_PROJECT_NAMES.length];

  const overall = Math.random();
  const siting = Math.random();
  const migration = Math.random();
  const weather = Math.random();

  const category =
    overall > 0.7 ? "HIGH" : overall > 0.4 ? "MEDIUM" : "LOW";

  return {
    turbineId: `IN_${state.code}_${String(i + 1).padStart(4, "0")}`,
    projectName: project,
    state: state.code,
    latitude: state.lat + (Math.random() - 0.5) * 1.2,
    longitude: state.lng + (Math.random() - 0.5) * 1.2,
    capacityMw: Number((2 + Math.random() * 2).toFixed(1)), // 2–4 MW typical India
    hubHeightM: 80 + Math.floor(Math.random() * 30),
    rotorDiameterM: 90 + Math.floor(Math.random() * 30),
    commissioningYear: 2012 + Math.floor(Math.random() * 14),
    risk: {
      date: CURRENT_DATE,
      overall,
      category,
      siting,
      migration,
      weather,
    },
  };
});

/* INDIA BIRD OBSERVATIONS */

export const mockObservations: BirdObservation[] = [
  {
    speciesCode: "gibust",
    comName: "Great Indian Bustard",
    sciName: "Ardeotis nigriceps",
    howMany: 2,
    lat: 26.9,
    lng: 70.9,
    obsDt: "2026-02-25 07:15",
    locName: "Desert National Park, Rajasthan",
  },
  {
    speciesCode: "steppeagle",
    comName: "Steppe Eagle",
    sciName: "Aquila nipalensis",
    howMany: 1,
    lat: 22.6,
    lng: 71.2,
    obsDt: "2026-02-23 10:40",
    locName: "Kutch grasslands, Gujarat",
  },
  {
    speciesCode: "blackkite",
    comName: "Black Kite",
    sciName: "Milvus migrans",
    howMany: 12,
    lat: 13.3,
    lng: 77.1,
    obsDt: "2026-02-26 08:20",
    locName: "Chitradurga, Karnataka",
  },
  {
    speciesCode: "indvulture",
    comName: "Indian Vulture",
    sciName: "Gyps indicus",
    howMany: 3,
    lat: 19.4,
    lng: 74.6,
    obsDt: "2026-02-24 09:30",
    locName: "Satara Plateau, Maharashtra",
  },
];

/* ALERTS (INDIA) */

export const mockAlerts: Alert[] = [
  {
    id: "alert_IN_001",
    name: "High Bustard Migration Risk - Rajasthan",
    turbineIds: ["IN_RJ_0001", "IN_RJ_0002"],
    metric: "migration",
    threshold: 0.75,
    channel: "email",
    email: "operator@windindia.com",
    active: true,
    createdAt: "2026-02-20T10:00:00Z",
  },
  {
    id: "alert_IN_002",
    name: "Kutch Wind Corridor Weather Alert",
    turbineIds: ["IN_GJ_0003"],
    metric: "weather",
    threshold: 0.65,
    channel: "email",
    email: "manager@renewpower.in",
    active: true,
    createdAt: "2026-02-18T08:00:00Z",
  },
];

/* RISK TIME SERIES */

export function generateRiskTimeSeries(
  turbine: TurbineSummary,
  days: number = 7
): RiskTimeSeriesPoint[] {
  const points: RiskTimeSeriesPoint[] = [];
  const baseDate = new Date("2026-03-01");

  for (let i = 0; i < days; i++) {
    const d = new Date(baseDate);
    d.setDate(d.getDate() + i);

    const variation = Math.sin(i * 0.8) * 0.15;

    points.push({
      date: d.toISOString().split("T")[0],
      overall: Math.max(0, Math.min(1, turbine.risk.overall + variation)),
      siting: turbine.risk.siting,
      migration: Math.max(
        0,
        Math.min(1, turbine.risk.migration + variation * 1.2)
      ),
      weather: Math.max(
        0,
        Math.min(1, turbine.risk.weather + Math.cos(i * 0.6) * 0.1)
      ),
    });
  }

  return points;
}

/* UI HELPERS */

export function getRiskColor(category: string): string {
  switch (category) {
    case "HIGH":
      return "text-red-600";
    case "MEDIUM":
      return "text-yellow-600";
    case "LOW":
      return "text-green-600";
    default:
      return "text-muted-foreground";
  }
}

export function getRiskBgColor(category: string): string {
  switch (category) {
    case "HIGH":
      return "bg-red-100";
    case "MEDIUM":
      return "bg-yellow-100";
    case "LOW":
      return "bg-green-100";
    default:
      return "bg-muted";
  }
}