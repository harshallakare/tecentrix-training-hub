
import { useContentStore } from "@/store/contentStore";
import { useNavigationStore } from "@/store/navigationStore";

/**
 * Aggressive content sync function that ensures data is fresh
 * Includes cache-busting mechanisms for more reliable synchronization
 */
export const syncContentData = (forceRefresh = false) => {
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
  
  // Attempt a cache-busting network request
  try {
    const cacheBuster = Date.now();
    fetch(`/api/ping?t=${cacheBuster}`, { cache: 'no-store' })
      .catch(() => {}); // Ignore errors, this is just for cache busting
  } catch (e) {
    // Ignore any errors
  }
  
  console.log("Aggressive data sync completed at", new Date().toISOString());
  
  return true;
};

/**
 * Hook to detect network status changes and trigger refresh
 */
export const useNetworkSync = () => {
  const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
  
  // If we're back online, force a sync
  if (isOnline) {
    syncContentData(true);
  }
  
  return isOnline;
};
