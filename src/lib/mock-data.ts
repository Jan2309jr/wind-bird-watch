import type { TurbineSummary, BirdObservation, Alert, RiskTimeSeriesPoint } from "./types";

export const mockTurbines: TurbineSummary[] = [
  {
    turbineId: "US_TX_001234",
    projectName: "Sweetwater Wind Farm",
    state: "TX",
    latitude: 32.4461,
    longitude: -100.4468,
    capacityMw: 2.3,
    hubHeightM: 80,
    rotorDiameterM: 90,
    commissioningYear: 2014,
    risk: { date: "2026-03-01", overall: 0.78, category: "HIGH", siting: 0.65, migration: 0.9, weather: 0.7 },
  },
  {
    turbineId: "US_KS_000987",
    projectName: "Flat Ridge 2",
    state: "KS",
    latitude: 37.4895,
    longitude: -98.8852,
    capacityMw: 1.8,
    hubHeightM: 80,
    rotorDiameterM: 82,
    commissioningYear: 2012,
    risk: { date: "2026-03-01", overall: 0.32, category: "LOW", siting: 0.4, migration: 0.3, weather: 0.2 },
  },
  {
    turbineId: "US_OK_002345",
    projectName: "Canadian Hills",
    state: "OK",
    latitude: 35.5012,
    longitude: -97.9234,
    capacityMw: 2.5,
    hubHeightM: 85,
    rotorDiameterM: 100,
    commissioningYear: 2016,
    risk: { date: "2026-03-01", overall: 0.55, category: "MEDIUM", siting: 0.5, migration: 0.6, weather: 0.55 },
  },
  {
    turbineId: "US_IA_003456",
    projectName: "Heartland Divide",
    state: "IA",
    latitude: 42.0334,
    longitude: -93.4567,
    capacityMw: 3.0,
    hubHeightM: 90,
    rotorDiameterM: 110,
    commissioningYear: 2019,
    risk: { date: "2026-03-01", overall: 0.61, category: "MEDIUM", siting: 0.45, migration: 0.75, weather: 0.6 },
  },
  {
    turbineId: "US_MN_004567",
    projectName: "Prairie Rose",
    state: "MN",
    latitude: 44.2211,
    longitude: -95.1234,
    capacityMw: 2.0,
    hubHeightM: 80,
    rotorDiameterM: 88,
    commissioningYear: 2011,
    risk: { date: "2026-03-01", overall: 0.41, category: "LOW", siting: 0.35, migration: 0.5, weather: 0.35 },
  },
  {
    turbineId: "US_CO_005678",
    projectName: "Cedar Creek",
    state: "CO",
    latitude: 40.5789,
    longitude: -104.8901,
    capacityMw: 2.8,
    hubHeightM: 85,
    rotorDiameterM: 105,
    commissioningYear: 2018,
    risk: { date: "2026-03-01", overall: 0.82, category: "HIGH", siting: 0.7, migration: 0.95, weather: 0.8 },
  },
  {
    turbineId: "US_WY_006789",
    projectName: "Chokecherry Sierra Madre",
    state: "WY",
    latitude: 41.5678,
    longitude: -107.2345,
    capacityMw: 3.2,
    hubHeightM: 95,
    rotorDiameterM: 120,
    commissioningYear: 2021,
    risk: { date: "2026-03-01", overall: 0.71, category: "HIGH", siting: 0.8, migration: 0.65, weather: 0.68 },
  },
  {
    turbineId: "US_NE_007890",
    projectName: "Rattlesnake Creek",
    state: "NE",
    latitude: 40.8765,
    longitude: -100.3456,
    capacityMw: 2.1,
    hubHeightM: 80,
    rotorDiameterM: 92,
    commissioningYear: 2015,
    risk: { date: "2026-03-01", overall: 0.48, category: "MEDIUM", siting: 0.5, migration: 0.45, weather: 0.5 },
  },
];

export const mockObservations: BirdObservation[] = [
  { speciesCode: "treswa", comName: "Tree Swallow", sciName: "Tachycineta bicolor", howMany: 15, lat: 32.45, lng: -100.45, obsDt: "2026-02-24 08:15", locName: "Nolan County windbreak" },
  { speciesCode: "goleag", comName: "Golden Eagle", sciName: "Aquila chrysaetos", howMany: 1, lat: 32.48, lng: -100.42, obsDt: "2026-02-23 11:05", locName: "Sweetwater mesa" },
  { speciesCode: "ameker", comName: "American Kestrel", sciName: "Falco sparverius", howMany: 3, lat: 32.44, lng: -100.44, obsDt: "2026-02-25 07:30", locName: "County Road 208" },
  { speciesCode: "rewbla", comName: "Red-winged Blackbird", sciName: "Agelaius phoeniceus", howMany: 45, lat: 32.46, lng: -100.43, obsDt: "2026-02-25 06:45", locName: "Sweetwater Lake" },
  { speciesCode: "baleag", comName: "Bald Eagle", sciName: "Haliaeetus leucocephalus", howMany: 2, lat: 32.47, lng: -100.46, obsDt: "2026-02-22 14:20", locName: "Lake Sweetwater dam" },
];

export const mockAlerts: Alert[] = [
  { id: "alert_001", name: "High migration nights at Sweetwater", turbineIds: ["US_TX_001234"], metric: "migration", threshold: 0.7, channel: "email", email: "operator@example.com", active: true, createdAt: "2026-02-20T10:00:00Z" },
  { id: "alert_002", name: "Cedar Creek weather alert", turbineIds: ["US_CO_005678"], metric: "weather", threshold: 0.6, channel: "email", email: "manager@example.com", active: true, createdAt: "2026-02-18T08:00:00Z" },
  { id: "alert_003", name: "Golden Eagle siting risk", turbineIds: ["US_WY_006789"], metric: "siting", threshold: 0.75, channel: "sms", active: false, createdAt: "2026-02-15T12:00:00Z" },
];

export function generateRiskTimeSeries(turbine: TurbineSummary, days: number = 7): RiskTimeSeriesPoint[] {
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
      migration: Math.max(0, Math.min(1, turbine.risk.migration + variation * 1.2)),
      weather: Math.max(0, Math.min(1, turbine.risk.weather + Math.cos(i * 0.6) * 0.1)),
    });
  }
  return points;
}

export function getRiskColor(category: string): string {
  switch (category) {
    case "HIGH": return "text-risk-high";
    case "MEDIUM": return "text-risk-medium";
    case "LOW": return "text-risk-low";
    default: return "text-muted-foreground";
  }
}

export function getRiskBgColor(category: string): string {
  switch (category) {
    case "HIGH": return "bg-risk-high";
    case "MEDIUM": return "bg-risk-medium";
    case "LOW": return "bg-risk-low";
    default: return "bg-muted";
  }
}
