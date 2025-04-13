
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
import { refreshSettingsFromStorage, useSettingsStore } from "./store/settingsStore";
import { useSettingsSync } from "./hooks/use-settings-sync";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      staleTime: 1 * 60 * 1000,
      gcTime: 5 * 60 * 1000,
    },
  },
});

// Cache buster that runs on app start
const cacheBuster = () => {
  // Clear any stale data from localStorage
  const keysToKeep = ['tecentrix-settings'];
  Object.keys(localStorage).forEach(key => {
    if (!keysToKeep.includes(key) && key.startsWith('tecentrix-')) {
      localStorage.removeItem(key);
    }
  });
  
  // Clear browser cache if possible
  if ('caches' in window) {
    caches.keys().then(cacheNames => {
      cacheNames.forEach(cacheName => {
        caches.delete(cacheName);
      });
    });
  }
  
  console.log("Cache busted at startup:", new Date().toISOString());
  return true;
};

// Run cache buster on app load
cacheBuster();

const AppRoutes = () => {
  const { navItems } = useNavigationStore();
  const settings = useSettingsSync();
  const activeNavItems = navItems.filter(item => item.enabled);
  
  useEffect(() => {
    // Initialize on mount
    initializeNavigation(true);
    syncContentData(true);
    refreshSettingsFromStorage();
    
    console.log("AppRoutes mounted - Active navigation items:", 
      activeNavItems.map(item => item.label).join(", "));
    console.log("Current company name from settings:", settings.companyName);
    
    // Periodic sync with reduced frequency
    const syncInterval = setInterval(() => {
      syncContentData(true);
      refreshSettingsFromStorage();
    }, 60000); // Every minute is plenty
    
    return () => {
      clearInterval(syncInterval);
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:courseId" element={<CourseDetails />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/testimonials" element={<Testimonials />} />
      
      {activeNavItems.map(item => {
        if (["/", "/courses", "/about", "/contact", "/testimonials"].includes(item.path)) return null;
        return <Route key={item.id} path={item.path} element={<Index />} />;
      })}
      
      <Route path="/admin/*" element={<Admin />} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  const settings = useSettingsSync();
  
  useEffect(() => {
    // Apply responsive classes through CSS rather than JS
    document.documentElement.classList.add('responsive-ready');
    
    // Initialize data on app start
    initializeNavigation(true);
    syncContentData(true);
    refreshSettingsFromStorage();
    
    // Set up visibility change handler
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log("Tab became visible, refreshing data...");
        syncContentData(true);
        refreshSettingsFromStorage();
      }
    };
    
    // Set up storage change handler
    const handleStorageChange = (event) => {
      if (event.key === 'tecentrix-settings' || event.key === null) {
        console.log("Settings changed in storage, refreshing");
        refreshSettingsFromStorage();
        document.documentElement.dataset.companyName = useSettingsStore.getState().settings.companyName;
        window.dispatchEvent(new CustomEvent('settings-updated'));
      }
    };
    
    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('storage', handleStorageChange);
    
    // Set up a lighter-weight sync interval
    const persistentSyncInterval = setInterval(() => {
      refreshSettingsFromStorage();
      syncContentData(true);
      document.documentElement.dataset.lastSync = new Date().toISOString();
    }, 60000); // Every minute is plenty
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(persistentSyncInterval);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.companyName = settings.companyName;
    document.title = `${settings.companyName} - Linux Administration Training`;
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
          <div className="app-root"
               data-company-name={settings.companyName}
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
