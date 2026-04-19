import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Bell, Search } from "lucide-react";

export const DashboardLayout = ({ children, title }: { children: ReactNode; title: string }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 border-b border-border flex items-center justify-between px-6 sticky top-0 bg-background/80 backdrop-blur-xl z-20">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <div>
                <h1 className="font-display text-lg font-semibold">{title}</h1>
                <p className="text-xs text-muted-foreground">Real-time operations overview</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg glass">
                <Search className="h-4 w-4" />
              </button>
              <button className="relative h-9 w-9 flex items-center justify-center rounded-lg glass">
                <Bell className="h-4 w-4" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
              </button>
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm font-semibold text-background">
                E
              </div>
            </div>
          </header>
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};
