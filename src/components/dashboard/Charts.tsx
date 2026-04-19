import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts";
import { useDashboard } from "@/context/DashboardContext";

const tooltipStyle = {
  background: "hsl(var(--popover))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "12px",
  fontSize: "12px",
};

export const ActivityChart = () => {
  const { birdActivityScore } = useDashboard();
  
  // Create a 24h trend based on current score
  const birdActivity = Array.from({ length: 12 }, (_, i) => ({
    hour: `${i * 2}:00`,
    birds: Math.max(10, Math.min(100, birdActivityScore - 15 + Math.random() * 30)),
    predicted: Math.max(10, Math.min(100, birdActivityScore - 10 + Math.random() * 20)),
  }));

  return (
    <div className="glass-strong rounded-2xl p-6 h-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-display font-semibold text-lg">Bird activity over time</h3>
          <p className="text-xs text-muted-foreground">Detected vs AI prediction · last 24h</p>
        </div>
        <div className="flex gap-4 text-[10px] font-bold uppercase tracking-wider">
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" /> Detected</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-secondary" /> Predicted</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={birdActivity}>
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity={0.4} />
              <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="hsl(var(--border) / 0.5)" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} interval={1} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={tooltipStyle} />
          <Area type="monotone" dataKey="predicted" stroke="hsl(var(--secondary))" fill="url(#g2)" strokeWidth={2} />
          <Area type="monotone" dataKey="birds" stroke="hsl(var(--primary))" fill="url(#g1)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const RiskChart = () => {
  const { turbines } = useDashboard();
  
  const chartData = turbines.map(t => ({
    turbine: t.id,
    risk: t.birds
  }));

  return (
    <div className="glass-strong rounded-2xl p-6 h-full">
      <div className="mb-4">
        <h3 className="font-display font-semibold text-lg">Risk prediction by turbine</h3>
        <p className="text-xs text-muted-foreground">AI-scored collision risk (0-100)</p>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={chartData}>
          <CartesianGrid stroke="hsl(var(--border) / 0.5)" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="turbine" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "hsl(var(--muted) / 0.1)" }} />
          <Bar dataKey="risk" radius={[8, 8, 0, 0]} barSize={32}>
            {chartData.map((d, i) => (
              <Cell key={i} fill={d.risk > 70 ? "hsl(var(--destructive))" : d.risk > 30 ? "hsl(var(--warning))" : "hsl(var(--success))"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
