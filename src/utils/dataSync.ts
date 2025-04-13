
import { useContentStore } from "@/store/contentStore";
import { useNavigationStore } from "@/store/navigationStore";

/**
 * Aggressive content sync function that ensures data is fresh
 * Includes cache-busting mechanisms for more reliable synchronization
 * Added error handling to prevent socket issues
 */
export const syncContentData = (forceRefresh = false) => {
  try {
    const contentStore = useContentStore.getState();
    const navigationStore = useNavigationStore.getState();
    
    // Clear ALL localStorage cache for content
    if (typeof localStorage !== 'undefined') {
      // Remove all content-related cache items
      Object.keys(localStorage).forEach(key => {
        if (key.includes('tecentrix-content') || key.includes('tecentrix-cache')) {
          localStorage.removeItem(key);
        }
      });
      
      // Add a cache-busting timestamp
      localStorage.setItem('tecentrix-sync-' + Date.now(), 'true');
    }
    
    // Force content refresh
    if (typeof contentStore.refreshContent === 'function') {
      contentStore.refreshContent();
      
      // Double-refresh for extra reliability
      setTimeout(() => {
        if (typeof contentStore.refreshContent === 'function') {
          contentStore.refreshContent();
        }
      }, 500);
    }
    
    // Refresh navigation data
    if (typeof navigationStore.refreshNavigation === 'function') {
      navigationStore.refreshNavigation();
    }
    
    // Attempt a cache-busting network request with proper error handling
    try {
      const cacheBuster = Date.now();
      const abortController = new AbortController();
      const timeoutId = setTimeout(() => abortController.abort(), 3000); // 3 second timeout
      
      fetch(`/api/ping?t=${cacheBuster}`, { 
        cache: 'no-store',
        signal: abortController.signal,
        headers: {
          'Pragma': 'no-cache',
          'Cache-Control': 'no-cache'
        }
      })
      .then(() => clearTimeout(timeoutId))
      .catch(() => {
        clearTimeout(timeoutId);
        // Silently fail - this is just for cache busting
      });
    } catch (e) {
      // Ignore any errors, this is just for cache busting
    }
    
    console.log("Aggressive data sync completed at", new Date().toISOString());
    
    return true;
  } catch (error) {
    console.error("Error during data sync:", error);
    return false;
  }
};

/**
 * Hook to detect network status changes and trigger refresh
 * Added try-catch to prevent uncaught exceptions
 */
export const useNetworkSync = () => {
  try {
    const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
    
    // If we're back online, force a sync
    if (isOnline) {
      syncContentData(true);
    }
    
    return isOnline;
  } catch (error) {
    console.error("Error in network sync:", error);
    return true; // Default to online
  }
};
