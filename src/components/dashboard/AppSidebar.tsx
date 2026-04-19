import { LayoutDashboard, Map, BellRing, BarChart3, Settings, Wind, LogOut } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu,
  SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Live Map", url: "/dashboard/map", icon: Map },
  { title: "Alerts", url: "/dashboard/alerts", icon: BellRing },
  { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
  { title: "Turbine Management", url: "/dashboard/management", icon: Wind },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export const AppSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="p-4">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 shrink-0 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center glow-orange">
            <Wind className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && <span className="font-display font-bold">EcoTurbines</span>}
        </NavLink>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={active}>
                      <NavLink to={item.url} end className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                          isActive
                            ? "bg-gradient-to-r from-primary/20 to-transparent text-foreground border-l-2 border-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
                        }`
                      }>
                        <item.icon className="h-4 w-4 shrink-0" />
                        {!collapsed && <span className="text-sm">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        <NavLink to="/login" className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-foreground rounded-lg">
          <LogOut className="h-4 w-4" />
          {!collapsed && <span className="text-sm">Sign out</span>}
        </NavLink>
      </SidebarFooter>
    </Sidebar>
  );
};
