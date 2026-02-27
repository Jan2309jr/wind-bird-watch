from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import json
from pathlib import Path

app = FastAPI(title="AviWind Insight API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # Vite dev URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_PATH = Path(__file__).parent / "data"
TURBINES_FILE = DATA_PATH / "turbines.json"
RISK_SERIES_FILE = DATA_PATH / "risk_series.json"

class RiskComponents(BaseModel):
    date: str
    overall: float
    category: str
    siting: float
    migration: float
    weather: float

class TurbineSummary(BaseModel):
    turbineId: str
    name: str
    state: str
    latitude: float
    longitude: float
    capacityMw: float
    hubHeightM: float
    rotorDiameterM: float
    commissioningYear: int
    risk: RiskComponents

class Alert(BaseModel):
    id: str
    name: str
    turbineId: str
    metric: str
    threshold: float
    channel: str
    active: bool

# In‑memory state
# Ensure directory exists
DATA_PATH.mkdir(parents=True, exist_ok=True)

def load_data():
    if not TURBINES_FILE.exists():
        return [], {}
    
    with TURBINES_FILE.open() as f:
        turbines = json.load(f)
    
    risk_series = {}
    if RISK_SERIES_FILE.exists():
        with RISK_SERIES_FILE.open() as f:
            risk_series = json.load(f)
    
    return turbines, risk_series

TURBINES, RISK_SERIES = load_data()
ALERTS: list[Alert] = []

@app.get("/api/turbines/risk", response_model=List[TurbineSummary])
def list_turbines():
    return TURBINES

@app.get("/api/turbines/{turbine_id}", response_model=TurbineSummary)
def get_turbine(turbine_id: str):
    for t in TURBINES:
        if t["turbineId"] == turbine_id:
            return t
    raise HTTPException(status_code=404, detail="Turbine not found")

@app.get("/api/turbines/{turbine_id}/risk-series", response_model=List[RiskComponents])
def risk_series(turbine_id: str):
    series = RISK_SERIES.get(turbine_id)
    if series is None:
        raise HTTPException(status_code=404, detail="No series")
    return series

@app.get("/api/alerts", response_model=List[Alert])
def list_alerts():
    return ALERTS

@app.post("/api/alerts", response_model=Alert)
def create_alert(alert: Alert):
    ALERTS.append(alert)
    return alert
