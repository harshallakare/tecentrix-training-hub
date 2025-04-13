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
import { refreshSettingsFromStorage, useSettingsStore } from "./store/settingsStore";
import { useSettingsSync } from "./hooks/use-settings-sync";

// Configure QueryClient with better caching behavior for mobile
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      staleTime: 1 * 60 * 1000, // Reduced to 1 minute to keep content fresher
      gcTime: 5 * 60 * 1000, // 5 minutes, formerly cacheTime
    },
  },
});

const AppRoutes = () => {
  const { navItems } = useNavigationStore();
  const { isMobile, orientation, dimensions } = useMobileInfo();
  const settings = useSettingsSync(); // Use our settings sync hook
  const activeNavItems = navItems.filter(item => item.enabled);
  
  // Initialize navigation on routes component mount
  useEffect(() => {
    // Force sync data on every mount
    initializeNavigation(true);
    syncContentData(true);
    refreshSettingsFromStorage(); // Ensure settings are fresh
    
    // Log navigation state for debugging
    console.log("AppRoutes mounted - Active navigation items:", 
      activeNavItems.map(item => item.label).join(", "));
    console.log("Device info:", { isMobile, orientation, dimensions });
    console.log("Current company name from settings:", settings.companyName);
    
    // Set up interval to keep syncing data periodically
    const syncInterval = setInterval(() => {
      syncContentData(true);
      refreshSettingsFromStorage();
    }, 30000); // Every 30 seconds
    
    return () => {
      clearInterval(syncInterval);
    };
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
  const settings = useSettingsSync(); // Use our settings sync hook
  
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
    
    // Force data refresh on mount
    initializeNavigation(true);
    syncContentData(true);
    refreshSettingsFromStorage(); // Ensure settings are fresh
    
    // Clear any existing caches to ensure fresh content
    if ('caches' in window) {
      caches.keys().then(cacheNames => {
        cacheNames.forEach(cacheName => {
          caches.delete(cacheName);
        });
      });
    }
    
    // Force clear localStorage cache and reload fresh data
    const clearLocalStorageCache = () => {
      // Only clear data-related cache, not user settings
      const keysToKeep = ['tecentrix-settings'];
      Object.keys(localStorage).forEach(key => {
        if (!keysToKeep.includes(key)) {
          localStorage.removeItem(key);
        }
      });
      syncContentData(true);
    };
    
    // Clear cache on initial load
    clearLocalStorageCache();
    
    // Add manual refresh on visibility change (tab switching)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log("Tab became visible, refreshing data...");
        syncContentData(true);
        refreshSettingsFromStorage();
      }
    };
    
    // More aggressive refreshes for all devices
    console.log("Setting up interval refreshes for consistent experience");
    [500, 1500, 3000, 7000].forEach(delay => {
      setTimeout(() => {
        refreshSettingsFromStorage();
        syncContentData(true);
        // Force UI update by toggling a data attribute
        document.documentElement.dataset.lastRefresh = new Date().toISOString();
      }, delay);
    });
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Listen for storage events to catch changes from other tabs/frames
    const handleStorageChange = (event) => {
      if (event.key === 'tecentrix-settings' || event.key === null) {
        console.log("Settings changed in storage, refreshing");
        refreshSettingsFromStorage();
        // Update the document attribute
        document.documentElement.dataset.companyName = useSettingsStore.getState().settings.companyName;
        
        // Force re-render by dispatching a custom event
        window.dispatchEvent(new CustomEvent('settings-updated'));
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Create a persistent sync interval
    const persistentSyncInterval = setInterval(() => {
      refreshSettingsFromStorage();
      syncContentData(true);
      document.documentElement.dataset.lastSync = new Date().toISOString();
    }, 15000); // Every 15 seconds
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(persistentSyncInterval);
    };
  }, [isMobile, orientation, dimensions, settings.companyName]);

  // Update the document attribute when company name changes
  useEffect(() => {
    document.documentElement.dataset.companyName = settings.companyName;
    document.title = `${settings.companyName} - Linux Administration Training`;
    
    // Force component updates by dispatching an event
    window.dispatchEvent(new CustomEvent('company-name-updated', {
      detail: { companyName: settings.companyName }
    }));
  }, [settings.companyName]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className={`app-root ${isMobile ? 'mobile-view' : 'desktop-view'} ${orientation}`}
               data-company-name={settings.companyName}
               data-device-type={isMobile ? 'mobile' : 'desktop'}
               data-orientation={orientation}
               data-viewport-width={dimensions.width}
               data-render-timestamp={Date.now()}>
            <AppRoutes />
            <WhatsAppButton />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
