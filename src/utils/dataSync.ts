
import { useContentStore } from "@/store/contentStore";
import { useNavigationStore } from "@/store/navigationStore";

// Flag to prevent concurrent sync operations
let isSyncing = false;

/**
 * Safe content sync function with improved error handling and anti-recursion protections
 */
export const syncContentData = (forceRefresh = false) => {
  // Prevent multiple synchronous calls
  if (isSyncing && !forceRefresh) {
    console.log("Sync already in progress, skipping");
    return false;
  }
  
  console.log("Syncing content data...");
  isSyncing = true;
  
  try {
    // Safely get store states with individual error handling
    let contentStore = null;
    let navigationStore = null;
    
    try {
      if (typeof useContentStore.getState === 'function') {
        contentStore = useContentStore.getState();
      }
    } catch (e) {
      console.error("Error accessing content store:", e);
    }
    
    try {
      if (typeof useNavigationStore.getState === 'function') {
        navigationStore = useNavigationStore.getState();
      }
    } catch (e) {
      console.error("Error accessing navigation store:", e);
    }
    
    // Only refresh if stores were successfully retrieved
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
  } finally {
    // Always reset sync flag even if an error occurred
    isSyncing = false;
  }
};

/**
 * Hook to detect network status changes with better error handling
 */
export const useNetworkSync = () => {
  try {
    // Safe check for browser environment
    if (typeof window !== 'undefined' && 'navigator' in window && 'onLine' in navigator) {
      return navigator.onLine;
    }
    return true; // Default to online in SSR context
  } catch (error) {
    console.error("Error in network sync:", error);
    return true; // Default to online on error
  }
};
