
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
    
    // Safely clear content cache on mount
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.removeItem('tecentrix-content');
      } catch (e) {
        console.error("Error clearing localStorage:", e);
      }
    }
    
    // Initial content refresh with error handling
    try {
      refreshContent();
    } catch (e) {
      console.error("Error during initial refresh:", e);
    }
    
    // Set up a less aggressive refresh interval
    const refreshInterval = setInterval(() => {
      if (isMounted) {
        try {
          refreshContent();
        } catch (e) {
          console.error("Error during refresh cycle:", e);
        }
      }
    }, 30000); // Every 30 seconds is enough
    
    // Refresh when tab becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isMounted) {
        try {
          refreshContent();
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
    };
  }, []);

  const refreshContent = () => {
    try {
      // Safely clear localStorage cache
      if (typeof localStorage !== 'undefined') {
        // Remove Tecentrix content-related items
        Object.keys(localStorage).forEach(key => {
          if (key.includes('tecentrix-content')) {
            localStorage.removeItem(key);
          }
        });
        
        // Add a cache-busting timestamp
        localStorage.setItem('tecentrix-cache-buster', Date.now().toString());
      }
      
      // Safely refresh content store
      if (typeof useContentStore.getState().refreshContent === 'function') {
        useContentStore.getState().refreshContent();
      }
      
      setLastSync(Date.now());
      console.log("Content synced at", new Date().toISOString());
    } catch (error) {
      console.error("Error refreshing content:", error);
      
      // Only show toast on mobile devices and only if we're in a browser
      if (typeof window !== 'undefined' && window.innerWidth < 768) {
        try {
          toast.error("Error syncing data", {
            description: "Please try refreshing the page"
          });
        } catch (e) {
          console.error("Error showing toast:", e);
        }
      }
    }
  };

  return {
    ...contentStore,
    lastSync,
    refreshContent
  };
}
