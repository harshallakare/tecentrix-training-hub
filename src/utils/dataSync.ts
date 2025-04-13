
import { useContentStore } from "@/store/contentStore";
import { useNavigationStore } from "@/store/navigationStore";

/**
 * Safe content sync function with improved error handling
 */
export const syncContentData = (forceRefresh = false) => {
  try {
    let contentStore = null;
    let navigationStore = null;
    
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
    
    if (contentStore && typeof contentStore.refreshContent === 'function') {
      contentStore.refreshContent();
    }
    
    if (navigationStore && typeof navigationStore.refreshNavigation === 'function') {
      navigationStore.refreshNavigation();
    }
    
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
    if (typeof window !== 'undefined' && 'navigator' in window && 'onLine' in navigator) {
      return navigator.onLine;
    }
    return true;
  } catch (error) {
    console.error("Error in network sync:", error);
    return true;
  }
};
