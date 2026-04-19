import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DashboardProvider } from "./context/DashboardContext";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import DashboardOverview from "./pages/DashboardOverview.tsx";
import LiveMap from "./pages/LiveMap.tsx";
import Alerts from "./pages/Alerts.tsx";
import Analytics from "./pages/Analytics.tsx";
import TurbineManagement from "./pages/TurbineManagement.tsx";
import Login from "./pages/Login.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DashboardProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<DashboardOverview />} />
            <Route path="/dashboard/map" element={<LiveMap />} />
            <Route path="/dashboard/alerts" element={<Alerts />} />
            <Route path="/dashboard/analytics" element={<Analytics />} />
            <Route path="/dashboard/management" element={<TurbineManagement />} />
            <Route path="/dashboard/settings" element={<DashboardOverview />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </DashboardProvider>
  </QueryClientProvider>
);

export default App;
