
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
import { useMobileInfo } from "./hooks/use-mobile";

// Configure QueryClient with better caching behavior for mobile
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes, formerly cacheTime
    },
  },
});

const AppRoutes = () => {
  const { navItems } = useNavigationStore();
  const { isMobile, orientation, dimensions } = useMobileInfo();
  const activeNavItems = navItems.filter(item => item.enabled);
  
  // Initialize navigation on routes component mount
  useEffect(() => {
    initializeNavigation();
    syncContentData();
    
    // Log navigation state for debugging
    console.log("AppRoutes mounted - Active navigation items:", 
      activeNavItems.map(item => item.label).join(", "));
    console.log("Device info:", { isMobile, orientation, dimensions });
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
  const { isMobile, orientation, dimensions } = useMobileInfo();
  
  // Force data sync when app first loads
  useEffect(() => {
    // Set device classes on root HTML element for CSS targeting
    document.documentElement.classList.toggle('is-mobile', isMobile);
    document.documentElement.classList.toggle('is-portrait', orientation === 'portrait');
    document.documentElement.classList.toggle('is-landscape', orientation === 'landscape');
    
    // Log device info
    console.log("App initialized with device info:", { 
      isMobile, 
      orientation, 
      width: dimensions.width,
      height: dimensions.height,
      pixelRatio: dimensions.pixelRatio,
      userAgent: navigator.userAgent
    });
    
    initializeNavigation(true);
    syncContentData(true);
    
    // Add manual refresh on visibility change (tab switching)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log("Tab became visible, refreshing data...");
        syncContentData(true);
      }
    };
    
    // Forced refresh for iOS devices to ensure proper rendering
    if (/iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase())) {
      setTimeout(() => {
        console.log("Forced refresh for iOS device");
        syncContentData(true);
      }, 1000);
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isMobile, orientation, dimensions]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className={`app-root ${isMobile ? 'mobile-view' : 'desktop-view'} ${orientation}`}>
            <AppRoutes />
            <WhatsAppButton />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
