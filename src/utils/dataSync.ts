
import { useContentStore } from "@/store/contentStore";
import { useNavigationStore } from "@/store/navigationStore";

/**
 * Safe content sync function with improved error handling
 * Prevents window/localStorage errors during SSR or when unavailable
 */
export const syncContentData = (forceRefresh = false) => {
  // Check if we're in a browser environment first
  if (typeof window === 'undefined') {
    console.log("Not in browser environment, skipping sync");
    return false;
  }
  
  console.log("Syncing content data...");
  
  try {
    const contentStore = useContentStore.getState();
    const navigationStore = useNavigationStore.getState();
    
    // Safely refresh content
    if (contentStore && typeof contentStore.refreshContent === 'function') {
      contentStore.refreshContent();
      console.log("Content store refreshed successfully");
    }
    
    // Safely refresh navigation
    if (navigationStore && typeof navigationStore.refreshNavigation === 'function') {
      navigationStore.refreshNavigation();
      console.log("Navigation refreshed successfully");
    }
    
    console.log("Data sync completed at", new Date().toISOString());
    return true;
  } catch (error) {
    console.error("Critical error during data sync:", error);
    return false;
  }
};

/**
 * Hook to detect network status changes with improved error handling
 */
export const useNetworkSync = () => {
  // Check if we're in a browser environment first
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return true; // Default to online for SSR
  }
  
  try {
    const isOnline = navigator.onLine;
    
    // If we're back online, force a sync
    if (isOnline) {
      // Use setTimeout to avoid immediate execution during render
      setTimeout(() => {
        try {
          syncContentData(true);
          console.log("Network is online, syncing data");
        } catch (e) {
          console.error("Error syncing on network change:", e);
        }
      }, 100);
    }
    
    return isOnline;
  } catch (error) {
    console.error("Error in network sync:", error);
    return true; // Default to online
  }
};
