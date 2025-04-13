
import { useContentStore } from "@/store/contentStore";
import { useNavigationStore } from "@/store/navigationStore";

/**
 * Safe content sync function with improved error handling
 */
export const syncContentData = (forceRefresh = false) => {
  console.log("Syncing content data...");
  
  try {
    // Get store states safely
    let contentStore;
    let navigationStore;
    
    try {
      contentStore = useContentStore.getState();
    } catch (e) {
      console.error("Error accessing content store:", e);
    }
    
    try {
      navigationStore = useNavigationStore.getState();
    } catch (e) {
      console.error("Error accessing navigation store:", e);
    }
    
    // Basic refresh operations with safety checks
    if (contentStore && typeof contentStore.refreshContent === 'function') {
      try {
        contentStore.refreshContent();
        console.log("Content store refreshed successfully");
      } catch (e) {
        console.error("Error refreshing content store:", e);
      }
    }
    
    if (navigationStore && typeof navigationStore.refreshNavigation === 'function') {
      try {
        navigationStore.refreshNavigation();
        console.log("Navigation refreshed successfully");
      } catch (e) {
        console.error("Error refreshing navigation:", e);
      }
    }
    
    console.log("Data sync completed at", new Date().toISOString());
    return true;
  } catch (error) {
    console.error("Error during data sync:", error);
    return false;
  }
};

/**
 * Hook to detect network status changes
 */
export const useNetworkSync = () => {
  try {
    // Safe check for browser environment
    if (typeof navigator !== 'undefined' && 'onLine' in navigator) {
      return navigator.onLine;
    }
    return true; // Default to online in SSR context
  } catch (error) {
    console.error("Error in network sync:", error);
    return true; // Default to online
  }
};
