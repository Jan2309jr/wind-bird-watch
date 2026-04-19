import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useDashboard } from "@/context/DashboardContext";
import { Wind, Power, Settings2, Plus, Search, Trash2, Edit2 } from "lucide-react";
import { TurbineStatus, RiskLevel } from "@/lib/mockData";
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

const TurbineManagement = () => {
  const { turbines, addTurbine, updateTurbine, deleteTurbine } = useDashboard();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTurbine, setNewTurbine] = useState({
    lat: 20,
    lng: 78,
    state: "Gujarat",
    status: "active" as TurbineStatus,
    risk: "low" as RiskLevel,
    birds: 0
  });

  const filteredTurbines = turbines.filter(t => 
    t.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addTurbine(newTurbine);
    setShowAddForm(false);
  };

  const toggleStatus = (id: string, current: TurbineStatus) => {
    const next: TurbineStatus = current === "active" ? "offline" : "active";
    updateTurbine(id, { status: next });
  };

  return (
    <DashboardLayout title="Turbine Management">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by ID or State..." 
              className="pl-10 bg-background/50 h-11"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={() => setShowAddForm(true)} className="w-full md:w-auto h-11 glow-orange">
            <Plus className="mr-2 h-4 w-4" /> Add Turbine
          </Button>
        </div>

        {/* Add Form (Overlay Simple) */}
        {showAddForm && (
          <div className="glass-strong rounded-2xl p-6 border-primary/20 bg-primary/5 animate-accordion-down">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">Register New Turbine Unit</h3>
            <form onSubmit={handleAdd} className="grid md:grid-cols-4 gap-4">
              <Input 
                type="number" 
                placeholder="Lat" 
                step="0.0001"
                onChange={e => setNewTurbine({ ...newTurbine, lat: parseFloat(e.target.value) })}
                className="bg-background"
              />
              <Input 
                type="number" 
                placeholder="Lng" 
                step="0.0001"
                onChange={e => setNewTurbine({ ...newTurbine, lng: parseFloat(e.target.value) })}
                className="bg-background"
              />
              <Select onValueChange={v => setNewTurbine({ ...newTurbine, state: v })}>
                <SelectTrigger className="bg-background"><SelectValue placeholder="State" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Gujarat">Gujarat</SelectItem>
                  <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                  <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                  <SelectItem value="Karnataka">Karnataka</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1 bg-primary text-primary-foreground">Confirm</Button>
                <Button variant="ghost" type="button" onClick={() => setShowAddForm(false)}>Cancel</Button>
              </div>
            </form>
          </div>
        )}

        {/* Turbine Table */}
        <div className="glass-strong rounded-2xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead>Unit ID</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Current Risk</TableHead>
                <TableHead>Bird Density</TableHead>
                <TableHead>Operational Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTurbines.map((t) => (
                <TableRow key={t.id} className="group hover:bg-muted/10 transition-colors">
                  <TableCell className="font-bold tracking-tight">
                    <div className="flex items-center gap-2">
                        <Wind className={`h-4 w-4 ${t.status === 'active' ? 'text-primary' : 'text-muted-foreground'}`} />
                        {t.id}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{t.state}</div>
                    <div className="text-[10px] text-muted-foreground uppercase">{t.lat.toFixed(3)}, {t.lng.toFixed(3)}</div>
                  </TableCell>
                  <TableCell>
                    <div className={`text-xs font-bold capitalize flex items-center gap-1.5 ${
                        t.risk === 'high' ? 'text-destructive' : t.risk === 'medium' ? 'text-warning' : 'text-success'
                    }`}>
                        <span className={`h-2 w-2 rounded-full ${
                             t.risk === 'high' ? 'bg-destructive shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 
                             t.risk === 'medium' ? 'bg-warning shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 
                             'bg-success shadow-[0_0_8px_rgba(16,185,129,0.5)]'
                        }`} />
                        {t.risk} risk
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="w-full max-w-[100px] h-1.5 bg-muted rounded-full overflow-hidden">
                        <div 
                            className={`h-full transition-all duration-1000 ${
                                t.birds > 70 ? 'bg-destructive' : t.birds > 30 ? 'bg-warning' : 'bg-success'
                            }`}
                            style={{ width: `${t.birds}%` }}
                        />
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-1 block px-1">{t.birds} activity score</span>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => toggleStatus(t.id, t.status)}
                      className={`h-8 rounded-full text-[10px] uppercase font-bold border-2 transition-all ${
                        t.status === 'active' 
                            ? 'bg-success/5 border-success text-success hover:bg-success/10' 
                            : t.status === 'throttled'
                            ? 'bg-warning/5 border-warning text-warning hover:bg-warning/10'
                            : 'bg-muted border-border text-muted-foreground'
                      }`}
                    >
                      <Power className="h-3 w-3 mr-1.5" />
                      {t.status}
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-primary"><Edit2 className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteTurbine(t.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><Settings2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Fleet Summary Card */}
        <div className="grid md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl glass-strong border-l-4 border-primary">
                <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Fleet Operational Rate</div>
                <div className="text-2xl font-display font-bold">{(turbines.filter(t => t.status === 'active').length / turbines.length * 100).toFixed(1)}%</div>
            </div>
            <div className="p-5 rounded-2xl glass-strong border-l-4 border-warning">
                <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Automated Throttles Policy</div>
                <div className="text-2xl font-display font-bold">ENABLED</div>
            </div>
            <div className="p-5 rounded-2xl glass-strong border-l-4 border-success">
                <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Average Risk Score</div>
                <div className="text-2xl font-display font-bold">
                    {(turbines.reduce((acc, t) => acc + t.birds, 0) / turbines.length).toFixed(1)}
                </div>
            </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TurbineManagement;
