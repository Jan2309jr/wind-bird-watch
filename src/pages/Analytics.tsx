import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useDashboard } from "@/context/DashboardContext";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Legend, PieChart, Pie, Cell 
} from "recharts";
import { TrendingUp, Activity, PieChart as PieIcon, BarChart3 } from "lucide-react";

const Analytics = () => {
  const { birdActivityScore, turbines } = useDashboard();

  // Mock historical data based on current score
  const trendData = Array.from({ length: 12 }, (_, i) => ({
    time: `${i * 2}h`,
    actual: Math.max(10, Math.min(100, birdActivityScore - 20 + Math.random() * 40)),
    predicted: Math.max(10, Math.min(100, birdActivityScore - 15 + Math.random() * 30)),
  }));

  const regionData = [
    { name: "Gujarat", risk: 42, active: 12 },
    { name: "Tamil Nadu", risk: 78, active: 8 },
    { name: "Rajasthan", risk: 25, active: 15 },
    { name: "Karnataka", risk: 55, active: 10 },
  ];

  const riskDistribution = [
    { name: "Low", value: turbines.filter(t => t.risk === "low").length, color: "hsl(150,70%,50%)" },
    { name: "Medium", value: turbines.filter(t => t.risk === "medium").length, color: "hsl(40,100%,55%)" },
    { name: "High", value: turbines.filter(t => t.risk === "high").length, color: "hsl(0,85%,60%)" },
  ];

  return (
    <DashboardLayout title="Advanced Analytics">
      <div className="space-y-6">
        {/* Main Trends */}
        <div className="glass-strong rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Bird Activity Trends
              </h3>
              <p className="text-xs text-muted-foreground">Historical vs. AI-predicted movement patterns (last 24h)</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold">
               <TrendingUp className="h-3 w-3" />
               PREDICTIVE ENGINE: ACTIVE
            </div>
          </div>
          <div className="h-[350px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsla(var(--border), 0.3)" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px" }}
                  itemStyle={{ fontSize: "12px" }}
                />
                <Area type="monotone" dataKey="predicted" stroke="hsl(var(--primary))" strokeDasharray="5 5" fill="transparent" />
                <Area type="monotone" dataKey="actual" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorActual)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
            {/* Risk Distribution */}
            <div className="glass-strong rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <PieIcon className="h-5 w-5 text-primary" />
                    Fleet Risk Distribution
                </h3>
                <div className="h-[300px] w-full flex items-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={riskDistribution}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={8}
                                dataKey="value"
                            >
                                {riskDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36}/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Regional Performance */}
            <div className="glass-strong rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    State-wise Risk Analysis
                </h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={regionData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsla(var(--border), 0.3)" />
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={100} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px" }}
                            />
                            <Bar dataKey="risk" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={20} />
                            <Bar dataKey="active" fill="hsl(var(--muted-foreground))" radius={[0, 4, 4, 0]} barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>

        {/* Insight Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-transparent to-transparent border border-primary/20">
            <h4 className="font-bold mb-2">AI Optimization Insight</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
                During previous migrations, bird activity scores above 65 in the <strong>Tamil Nadu</strong> sector 
                led to a 14% increase in successful preventative throttles. Current models suggest maintaining 
                a 20-minute alert buffer for maximum efficiency.
            </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
