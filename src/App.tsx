
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Testimonials from "./pages/Testimonials";
import WhatsAppButton from "./components/WhatsAppButton";
import { useNavigationStore } from "./store/navigationStore";
import { useEffect } from "react";
import { initializeNavigation } from "./utils/initializeNavigation";
import { syncContentData } from "./utils/dataSync";

// Configure QueryClient with better caching behavior for mobile
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

const AppRoutes = () => {
  const { navItems } = useNavigationStore();
  const activeNavItems = navItems.filter(item => item.enabled);
  
  // Initialize navigation on routes component mount
  useEffect(() => {
    initializeNavigation();
    syncContentData();
    
    // Log navigation state for debugging
    console.log("AppRoutes mounted - Active navigation items:", 
      activeNavItems.map(item => item.label).join(", "));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      
      {/* Static routes for main pages */}
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:courseId" element={<CourseDetails />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/testimonials" element={<Testimonials />} />
      
      {/* Dynamic routes based on navigation store */}
      {activeNavItems.map(item => {
        // Skip the routes that already have dedicated components
        if (["/", "/courses", "/about", "/contact", "/testimonials"].includes(item.path)) return null;
        return <Route key={item.id} path={item.path} element={<Index />} />;
      })}
      
      {/* Admin route - now consolidated to a single entry point */}
      <Route path="/admin/*" element={<Admin />} />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  // Force data sync when app first loads
  useEffect(() => {
    initializeNavigation(true);
    syncContentData(true);
    
    // Add manual refresh on visibility change (tab switching)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log("Tab became visible, refreshing data...");
        syncContentData(true);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
          <WhatsAppButton />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
