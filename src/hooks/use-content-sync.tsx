
import { useEffect, useState, useCallback, useRef } from 'react';
import { useContentStore } from '@/store/contentStore';

/**
 * Hook to ensure content is properly synced with improved error handling
 * and SSR-safe implementation
 */
export function useContentSync(forceRefresh = false) {
  const [lastSync, setLastSync] = useState<number>(Date.now());
  const contentStore = useContentStore();
  const initializedRef = useRef(false);
  
  // Memoized refresh function to prevent recreation on each render
  const refreshContent = useCallback(() => {
    if (typeof window === 'undefined') return; // Safety check for SSR
    
    try {
      console.log("Content refresh requested");
      
      // Safely refresh content store
      if (contentStore && typeof contentStore.refreshContent === 'function') {
        contentStore.refreshContent();
        console.log("Content store refreshed successfully");
      } else {
        console.warn("Content store or refreshContent function not available");
      }
      
      setLastSync(Date.now());
    } catch (error) {
      console.error("Error refreshing content:", error);
    }
  }, [contentStore]);
  
  useEffect(() => {
    // Skip if already initialized to prevent multiple refreshes
    if (initializedRef.current) return;
    
    console.log("useContentSync hook initialized");
    initializedRef.current = true;
    
    // Initial content refresh
    refreshContent();
    
    return () => {
      console.log("useContentSync hook unmounted");
    };
  }, [refreshContent]);

  return {
    ...contentStore,
    lastSync,
    refreshContent
  };
}
