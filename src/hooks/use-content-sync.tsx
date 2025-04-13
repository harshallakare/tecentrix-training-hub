
import { useEffect, useState } from 'react';
import { useContentStore } from '@/store/contentStore';
import { toast } from 'sonner';

/**
 * Hook to ensure content is properly synced across all devices
 * Uses a more aggressive approach to force content refreshes
 * Added error handling to prevent socket issues
 */
export function useContentSync(forceRefresh = false) {
  const [lastSync, setLastSync] = useState(Date.now());
  const contentStore = useContentStore();
  
  useEffect(() => {
    let isMounted = true;
    
    // Immediately clear any cached content on mount
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.removeItem('tecentrix-content');
      } catch (e) {
        console.error("Error clearing localStorage:", e);
      }
    }
    
    // Force content refresh
    refreshContent();
    
    // Set up more frequent refresh with error handling
    const refreshInterval = setInterval(() => {
      if (isMounted) {
        try {
          refreshContent();
        } catch (e) {
          console.error("Error during refresh cycle:", e);
        }
      }
    }, 5000);
    
    // Also refresh when tab becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isMounted) {
        console.log("Tab became visible, forcing content refresh");
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
      // Aggressively clear localStorage cache
      if (typeof localStorage !== 'undefined') {
        // Remove all Tecentrix content-related items
        Object.keys(localStorage).forEach(key => {
          if (key.includes('tecentrix-content')) {
            localStorage.removeItem(key);
          }
        });
        
        // Force timestamp update to invalidate any potential cache
        localStorage.setItem('tecentrix-cache-buster', Date.now().toString());
      }
      
      // Re-fetch content by forcing store refresh
      if (typeof useContentStore.getState().refreshContent === 'function') {
        useContentStore.getState().refreshContent();
      }
      
      setLastSync(Date.now());
      console.log("Content forcefully synced at", new Date().toISOString());
    } catch (error) {
      console.error("Error refreshing content:", error);
      
      // Show error toast on mobile devices where debugging is harder
      if (window.innerWidth < 768) {
        toast.error("Error syncing data", {
          description: "Please try refreshing the page"
        });
      }
    }
  };

  return {
    ...contentStore,
    lastSync,
    refreshContent
  };
}
