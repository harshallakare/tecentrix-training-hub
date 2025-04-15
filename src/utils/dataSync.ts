
import React, { useState, useEffect } from 'react';
import { useContentStore } from "@/store/contentStore";
import { useNavigationStore } from "@/store/navigationStore";

/**
 * Force refresh of content data to ensure consistency across devices
 * @param forceRefresh - Whether to force a clean refresh regardless of cache
 */
export const syncContentData = (forceRefresh = false) => {
  const contentStore = useContentStore.getState();
  const navigationStore = useNavigationStore.getState();
  
  // Add a timestamp to force cache bust
  if (forceRefresh) {
    console.log("Forcing data refresh...");
    localStorage.setItem("tecentrix-last-sync", Date.now().toString());
  }
  
  // Refresh content data if the function exists
  if (typeof contentStore.refreshContent === 'function') {
    contentStore.refreshContent();
  }
  
  // Refresh navigation data if the function exists
  if (typeof navigationStore.refreshNavigation === 'function') {
    navigationStore.refreshNavigation();
  }
  
  return true;
};

/**
 * Hook to detect network status changes and trigger refresh
 */
export const useNetworkSync = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    // Network status change handlers
    const handleOnline = () => {
      setIsOnline(true);
      // When coming back online, force a data refresh
      syncContentData(true);
    };
    
    const handleOffline = () => {
      setIsOnline(false);
    };
    
    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Clean up
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  return isOnline;
};
