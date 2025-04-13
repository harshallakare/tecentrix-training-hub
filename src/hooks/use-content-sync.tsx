
import { useEffect, useState } from 'react';
import { useContentStore } from '@/store/contentStore';

/**
 * Hook to ensure content is properly synced across all devices
 * Uses a more aggressive approach to force content refreshes
 */
export function useContentSync(forceRefresh = false) {
  const [lastSync, setLastSync] = useState(Date.now());
  const contentStore = useContentStore();
  
  useEffect(() => {
    // Immediately clear any cached content on mount
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('tecentrix-content');
    }
    
    // Force content refresh
    refreshContent();
    
    // Set up more frequent refresh
    const refreshInterval = setInterval(refreshContent, 5000); // More frequent refresh (5 seconds)
    
    // Also refresh when tab becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log("Tab became visible, forcing content refresh");
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
    if (useContentStore.getState().refreshContent) {
      useContentStore.getState().refreshContent();
    }
    
    setLastSync(Date.now());
    console.log("Content forcefully synced at", new Date().toISOString());
  };

  return {
    ...contentStore,
    lastSync,
    refreshContent
  };
}
