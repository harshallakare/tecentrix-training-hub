
import { useEffect, useState } from 'react';
import { useContentStore } from '@/store/contentStore';
import { toast } from 'sonner';

/**
 * Hook to ensure content is properly synced with improved error handling
 * and SSR-safe implementation
 */
export function useContentSync(forceRefresh = false) {
  const [lastSync, setLastSync] = useState(() => Date.now());
  const contentStore = useContentStore();
  
  useEffect(() => {
    // Skip execution during SSR
    if (typeof window === 'undefined') {
      return;
    }
    
    let isMounted = true;
    
    console.log("useContentSync hook initialized");
    
    // Initial content refresh with error handling
    try {
      refreshContent();
      console.log("Initial content refresh completed");
    } catch (e) {
      console.error("Error during initial refresh:", e);
    }
    
    // Set up a moderate refresh interval
    const refreshInterval = setInterval(() => {
      if (isMounted) {
        try {
          refreshContent();
        } catch (e) {
          console.error("Error during refresh cycle:", e);
        }
      }
    }, 60000); // Every 60 seconds is enough
    
    // Refresh when tab becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isMounted) {
        try {
          refreshContent();
          console.log("Content refreshed on visibility change");
        } catch (e) {
          console.error("Error during visibility refresh:", e);
        }
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Clean up on unmount
    return () => {
      isMounted = false;
      clearInterval(refreshInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      console.log("useContentSync hook unmounted");
    };
  }, []);

  const refreshContent = () => {
    try {
      console.log("Refreshing content...");
      
      // Safely refresh content store
      if (typeof useContentStore.getState().refreshContent === 'function') {
        useContentStore.getState().refreshContent();
        console.log("Content store refreshed successfully");
      }
      
      setLastSync(Date.now());
    } catch (error) {
      console.error("Error refreshing content:", error);
    }
  };

  return {
    ...contentStore,
    lastSync,
    refreshContent
  };
}
