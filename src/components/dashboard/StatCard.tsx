import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down";
  icon: LucideIcon;
  accent?: "orange" | "blue" | "green" | "red";
}

const accents = {
  orange: "from-primary to-primary-glow",
  blue: "from-secondary to-secondary-glow",
  green: "from-success to-success",
  red: "from-destructive to-destructive",
};

export const StatCard = ({ label, value, change, trend, icon: Icon, accent = "orange" }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-strong rounded-2xl p-5 hover:-translate-y-0.5 transition-transform"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${accents[accent]} flex items-center justify-center`}>
          <Icon className="h-5 w-5 text-background" />
        </div>
        {change && (
          <div className={`flex items-center gap-1 text-xs ${trend === "up" ? "text-success" : "text-destructive"}`}>
            {trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {change}
          </div>
        )}
      </div>
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className="font-display text-3xl font-bold">{value}</div>
    </motion.div>
  );
};
