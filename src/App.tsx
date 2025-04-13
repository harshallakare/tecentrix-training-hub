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

const AppRoutes = () => {
  const { navItems } = useNavigationStore();
  const { isMobile, orientation, dimensions } = useMobileInfo();
  const settings = useSettingsSync();
  const activeNavItems = navItems.filter(item => item.enabled);
  
  useEffect(() => {
    initializeNavigation(true);
    syncContentData(true);
    refreshSettingsFromStorage();
    
    console.log("AppRoutes mounted - Active navigation items:", 
      activeNavItems.map(item => item.label).join(", "));
    console.log("Device info:", { isMobile, orientation, dimensions });
    console.log("Current company name from settings:", settings.companyName);
    
    const syncInterval = setInterval(() => {
      syncContentData(true);
      refreshSettingsFromStorage();
    }, 30000);
    
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
  const { isMobile, orientation, dimensions } = useMobileInfo();
  const settings = useSettingsSync();
  
  useEffect(() => {
    document.documentElement.classList.toggle('is-mobile', isMobile);
    document.documentElement.classList.toggle('is-portrait', orientation === 'portrait');
    document.documentElement.classList.toggle('is-landscape', orientation === 'landscape');
    
    console.log("App initialized with device info:", { 
      isMobile, 
      orientation, 
      width: dimensions.width,
      height: dimensions.height,
      pixelRatio: dimensions.pixelRatio,
      userAgent: navigator.userAgent
    });
    
    document.documentElement.dataset.companyName = settings.companyName;
    
    initializeNavigation(true);
    syncContentData(true);
    refreshSettingsFromStorage();
    
    if ('caches' in window) {
      caches.keys().then(cacheNames => {
        cacheNames.forEach(cacheName => {
          caches.delete(cacheName);
        });
      });
    }
    
    const clearLocalStorageCache = () => {
      const keysToKeep = ['tecentrix-settings'];
      Object.keys(localStorage).forEach(key => {
        if (!keysToKeep.includes(key)) {
          localStorage.removeItem(key);
        }
      });
      syncContentData(true);
    };
    
    clearLocalStorageCache();
    
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log("Tab became visible, refreshing data...");
        syncContentData(true);
        refreshSettingsFromStorage();
      }
    };
    
    [500, 1500, 3000, 7000].forEach(delay => {
      setTimeout(() => {
        refreshSettingsFromStorage();
        syncContentData(true);
        document.documentElement.dataset.lastRefresh = new Date().toISOString();
      }, delay);
    });
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    const handleStorageChange = (event) => {
      if (event.key === 'tecentrix-settings' || event.key === null) {
        console.log("Settings changed in storage, refreshing");
        refreshSettingsFromStorage();
        document.documentElement.dataset.companyName = useSettingsStore.getState().settings.companyName;
        window.dispatchEvent(new CustomEvent('settings-updated'));
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    const persistentSyncInterval = setInterval(() => {
      refreshSettingsFromStorage();
      syncContentData(true);
      document.documentElement.dataset.lastSync = new Date().toISOString();
    }, 15000);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(persistentSyncInterval);
    };
  }, [isMobile, orientation, dimensions, settings.companyName]);

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
