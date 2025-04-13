
import { useState, useCallback, useRef, useEffect } from 'react';
import { useContentStore } from '@/store/contentStore';

/**
 * Hook to ensure content is properly synced with improved error handling
 */
export function useContentSync(forceRefresh = false) {
  const [lastSync, setLastSync] = useState<number>(Date.now());
  const contentStore = useContentStore();
  const initializedRef = useRef(false);
  
  // Memoized refresh function to prevent recreation on each render
  const refreshContent = useCallback(() => {
    try {
      if (contentStore && typeof contentStore.refreshContent === 'function') {
        contentStore.refreshContent();
      }
      setLastSync(Date.now());
    } catch (error) {
      console.error("Error refreshing content:", error);
    }
  }, [contentStore]);
  
  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      refreshContent();
    }
  }, [refreshContent]);

  return {
    ...contentStore,
    lastSync,
    refreshContent
  };
}
