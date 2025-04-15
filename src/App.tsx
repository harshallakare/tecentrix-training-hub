
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
import { useSettingsStore, refreshSettingsFromStorage } from "./store/settingsStore";
import { useSettingsSync } from "./hooks/use-settings-sync";

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
  const settings = useSettingsSync(); // Use our new settings sync hook
  const activeNavItems = navItems.filter(item => item.enabled);
  
  // Initialize navigation on routes component mount
  useEffect(() => {
    initializeNavigation();
    syncContentData();
    refreshSettingsFromStorage(); // Ensure settings are fresh
    
    // Log navigation state for debugging
    console.log("AppRoutes mounted - Active navigation items:", 
      activeNavItems.map(item => item.label).join(", "));
    console.log("Device info:", { isMobile, orientation, dimensions });
    console.log("Current company name from settings:", settings.companyName);
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
  const settings = useSettingsSync(); // Use our new settings sync hook
  
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
    
    // Add custom data attribute for company name to document
    document.documentElement.dataset.companyName = settings.companyName;
    
    initializeNavigation(true);
    syncContentData(true);
    refreshSettingsFromStorage(); // Ensure settings are fresh
    
    // Add manual refresh on visibility change (tab switching)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log("Tab became visible, refreshing data...");
        syncContentData(true);
        refreshSettingsFromStorage();
      }
    };
    
    // Forced refresh for mobile devices to ensure proper rendering
    // This helps keep mobile and desktop views in sync
    const isMobileDevice = /iphone|ipad|ipod|android|mobile/i.test(navigator.userAgent.toLowerCase());
    if (isMobileDevice) {
      console.log("Mobile device detected, forcing extra refreshes");
      // Multiple refreshes at different intervals increase chance of sync
      [1000, 3000, 7000].forEach(delay => {
        setTimeout(() => {
          refreshSettingsFromStorage();
          syncContentData(true);
        }, delay);
      });
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Listen for storage events to catch changes from other tabs/frames
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'tecentrix-settings') {
        console.log("Settings changed in storage, refreshing");
        refreshSettingsFromStorage();
        // Update the document attribute
        document.documentElement.dataset.companyName = useSettingsStore.getState().settings.companyName;
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [isMobile, orientation, dimensions, settings.companyName]);

  // Update the document attribute when company name changes
  useEffect(() => {
    document.documentElement.dataset.companyName = settings.companyName;
    document.title = `${settings.companyName} - Linux Administration Training`;
  }, [settings.companyName]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className={`app-root ${isMobile ? 'mobile-view' : 'desktop-view'} ${orientation}`}
               data-company-name={settings.companyName}>
            <AppRoutes />
            <WhatsAppButton />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
