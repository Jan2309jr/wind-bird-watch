const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:8080";

export async function fetchTurbines() {
    const res = await fetch(`${API_BASE}/api/turbines/risk`);
    if (!res.ok) throw new Error("Failed to fetch turbines");
    return res.json();
}

export async function fetchRiskSeries(turbineId: string) {
    const res = await fetch(`${API_BASE}/api/turbines/${turbineId}/risk-series`);
    if (!res.ok) throw new Error("Failed to fetch series");
    return res.json();
}
