
import { useContentStore } from "@/store/contentStore";
import { useNavigationStore } from "@/store/navigationStore";

/**
 * Safe content sync function with improved error handling
 * Prevents window/localStorage errors during SSR or when unavailable
 */
export const syncContentData = (forceRefresh = false) => {
  try {
    // Check if we're in a browser environment first
    if (typeof window === 'undefined') {
      console.log("Not in browser environment, skipping sync");
      return false;
    }
    
    const contentStore = useContentStore.getState();
    const navigationStore = useNavigationStore.getState();
    
    // Safely clear localStorage cache
    if (typeof localStorage !== 'undefined') {
      try {
        // Only remove content-related cache items
        Object.keys(localStorage).forEach(key => {
          if (key.includes('tecentrix-content') || key.includes('tecentrix-cache')) {
            localStorage.removeItem(key);
          }
        });
        
        // Add a cache-busting timestamp
        localStorage.setItem('tecentrix-sync-' + Date.now(), 'true');
      } catch (e) {
        console.error("Error accessing localStorage:", e);
      }
    }
    
    // Safely refresh content
    if (contentStore && typeof contentStore.refreshContent === 'function') {
      try {
        contentStore.refreshContent();
      } catch (e) {
        console.error("Error refreshing content:", e);
      }
    }
    
    // Safely refresh navigation
    if (navigationStore && typeof navigationStore.refreshNavigation === 'function') {
      try {
        navigationStore.refreshNavigation();
      } catch (e) {
        console.error("Error refreshing navigation:", e);
      }
    }
    
    // Safely perform a cache-busting network request
    try {
      const cacheBuster = Date.now();
      const abortController = new AbortController();
      const timeoutId = setTimeout(() => abortController.abort(), 3000);
      
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
        // Silent fail - just for cache busting
      });
    } catch (e) {
      // Ignore errors - this is just for cache busting
    }
    
    console.log("Data sync completed at", new Date().toISOString());
    return true;
  } catch (error) {
    console.error("Error during data sync:", error);
    return false;
  }
};

/**
 * Hook to detect network status changes with improved error handling
 */
export const useNetworkSync = () => {
  try {
    // Check if we're in a browser environment first
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return true; // Default to online for SSR
    }
    
    const isOnline = navigator.onLine;
    
    // If we're back online, force a sync
    if (isOnline) {
      // Use setTimeout to avoid immediate execution during render
      setTimeout(() => {
        try {
          syncContentData(true);
        } catch (e) {
          console.error("Error syncing on network change:", e);
        }
      }, 0);
    }
    
    return isOnline;
  } catch (error) {
    console.error("Error in network sync:", error);
    return true; // Default to online
  }
};
