import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MapPanel } from "@/components/dashboard/MapPanel";
import { useDashboard } from "@/context/DashboardContext";
import { ShieldAlert, Wind, Map as MapIcon } from "lucide-react";

const LiveMap = () => {
    const { turbines } = useDashboard();
    
    const highRisk = turbines.filter(t => t.risk === 'high');
    const throttled = turbines.filter(t => t.status === 'throttled');

    return (
        <DashboardLayout title="Live Fleet Map">
            <div className="flex flex-col h-full space-y-4">
                {/* Map Control Bar */}
                <div className="flex flex-wrap gap-4 items-center justify-between p-4 glass rounded-2xl border-white/10">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <MapIcon className="h-4 w-4 text-primary" />
                            <span className="text-sm font-semibold">India Operations Center</span>
                        </div>
                        <div className="h-6 w-px bg-border hidden md:block" />
                        <div className="flex gap-4 text-xs font-medium">
                            <div className="flex items-center gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-success animate-pulse-glow" /> 
                                {turbines.filter(t => t.status === 'active').length} Active
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-warning" /> 
                                {throttled.length} Throttled
                            </div>
                            <div className="flex items-center gap-1.5 text-destructive underline decoration-2 underline-offset-4">
                                <ShieldAlert className="h-3 w-3" />
                                {highRisk.length} High Risk Units
                            </div>
                        </div>
                    </div>
                </div>

                {/* Full Screen Map Container */}
                <div className="flex-1 relative min-h-[600px]">
                    <MapPanel height={650} />
                    
                    {/* Floating Fleet Legend */}
                    <div className="absolute bottom-10 left-10 z-[1000] p-4 glass-strong rounded-2xl border border-white/10 hidden md:block w-64 shadow-2xl animate-fade-in">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                             <Wind className="h-3 w-3" /> Fleet Intelligence
                        </h4>
                        <div className="space-y-3">
                            {highRisk.length > 0 ? (
                                highRisk.map(t => (
                                    <div key={t.id} className="flex justify-between items-center bg-destructive/5 p-2 rounded-lg border border-destructive/20">
                                        <span className="text-xs font-bold">{t.id}</span>
                                        <span className="text-[10px] bg-destructive text-white px-2 py-0.5 rounded-full">ACTION REQ</span>
                                    </div>
                                ))
                            ) : (
                                <div className="text-[10px] text-muted-foreground italic">No immediate threats detected across clusters.</div>
                            )}
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
                            <div className="flex justify-between text-[10px]">
                                <span className="text-muted-foreground">Bird Migration Wave</span>
                                <span className="text-primary font-bold">In-Bound</span>
                            </div>
                            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-primary/40 w-2/3" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default LiveMap;
