import { Bird } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-card/50 px-4 py-8">
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2">
          <Bird className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">AviWind Insight</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Data sources: USWTDB · eBird · BirdCast · USGS · BirdLife International
        </p>
        <p className="text-xs text-muted-foreground">© 2026 AviWind Insight. Hackathon MVP.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
