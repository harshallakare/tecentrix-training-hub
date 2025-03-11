
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import Settings from "./pages/Settings";
import { useNavigationStore } from "./store/navigationStore";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { navItems } = useNavigationStore();
  const activeNavItems = navItems.filter(item => item.enabled);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      
      {/* Dynamic routes based on navigation store */}
      {activeNavItems.map(item => {
        // Skip the home route as it's already defined
        if (item.path === "/") return null;
        return <Route key={item.id} path={item.path} element={<Index />} />;
      })}
      
      {/* Admin routes */}
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/settings" element={<Settings />} />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
