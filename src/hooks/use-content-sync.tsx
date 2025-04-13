
import { useEffect, useState } from 'react';
import { useContentStore } from '@/store/contentStore';

/**
 * Hook to ensure content is properly synced across all devices
 * Uses a simple timestamp-based approach to force content refreshes
 */
export function useContentSync(forceRefresh = false) {
  const [lastSync, setLastSync] = useState(Date.now());
  const contentStore = useContentStore();
  
  useEffect(() => {
    // Always refresh content on mount to ensure latest data
    refreshContent();
    
    // Set up periodic refresh
    const refreshInterval = setInterval(refreshContent, 15000);
    
    // Also refresh when tab becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        refreshContent();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Clean up on unmount
    return () => {
      clearInterval(refreshInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const refreshContent = () => {
    // Clear any localStorage cache except for critical items
    const keysToKeep = ['tecentrix-settings'];
    Object.keys(localStorage).forEach(key => {
      if (!keysToKeep.includes(key) && key.startsWith('tecentrix-')) {
        localStorage.removeItem(key);
      }
    });
    
    // Re-fetch content
    localStorage.removeItem('tecentrix-content');
    useContentStore.getState().refreshContent?.();
    
    setLastSync(Date.now());
    console.log("Content synced at", new Date().toISOString());
  };

  return {
    ...contentStore,
    lastSync,
    refreshContent
  };
}
