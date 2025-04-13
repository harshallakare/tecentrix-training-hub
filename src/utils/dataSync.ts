
import { useContentStore } from "@/store/contentStore";
import { useNavigationStore } from "@/store/navigationStore";

/**
 * Safe content sync function with improved error handling
 */
export const syncContentData = (forceRefresh = false) => {
  console.log("Syncing content data...");
  
  try {
    // Simple direct access to stores
    const contentStore = useContentStore.getState();
    const navigationStore = useNavigationStore.getState();
    
    // Basic refresh operations
    if (contentStore && typeof contentStore.refreshContent === 'function') {
      contentStore.refreshContent();
      console.log("Content store refreshed successfully");
    }
    
    if (navigationStore && typeof navigationStore.refreshNavigation === 'function') {
      navigationStore.refreshNavigation();
      console.log("Navigation refreshed successfully");
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
    return navigator.onLine;
  } catch (error) {
    console.error("Error in network sync:", error);
    return true; // Default to online
  }
};
