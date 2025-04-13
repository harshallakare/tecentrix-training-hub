
import { useEffect, useState } from 'react';
import { useContentStore } from '@/store/contentStore';

/**
 * Hook to ensure content is properly synced with improved error handling
 * and SSR-safe implementation
 */
export function useContentSync(forceRefresh = false) {
  const [lastSync, setLastSync] = useState<number>(Date.now());
  const contentStore = useContentStore();
  
  // Simple refresh function that doesn't depend on complex logic
  const refreshContent = () => {
    try {
      console.log("Simple content refresh requested");
      
      // Safely refresh content store
      if (typeof contentStore.refreshContent === 'function') {
        contentStore.refreshContent();
        console.log("Content store refreshed successfully");
      }
      
      setLastSync(Date.now());
    } catch (error) {
      console.error("Error refreshing content:", error);
    }
  };
  
  useEffect(() => {
    console.log("useContentSync hook initialized");
    
    // Initial content refresh
    refreshContent();
    
    return () => {
      console.log("useContentSync hook unmounted");
    };
  }, []);

  return {
    ...contentStore,
    lastSync,
    refreshContent
  };
}
