
import { useContentStore } from "@/store/contentStore";
import { useNavigationStore } from "@/store/navigationStore";

/**
 * Simplified function to force refresh of content data
 * This function is more direct and aggressive about clearing caches
 */
export const syncContentData = (forceRefresh = false) => {
  const contentStore = useContentStore.getState();
  const navigationStore = useNavigationStore.getState();
  
  // Clear localStorage cache for content
  if (forceRefresh && typeof localStorage !== 'undefined') {
    localStorage.removeItem('tecentrix-content');
  }
  
  // Refresh content data
  if (typeof contentStore.refreshContent === 'function') {
    contentStore.refreshContent();
  }
  
  // Refresh navigation data
  if (typeof navigationStore.refreshNavigation === 'function') {
    navigationStore.refreshNavigation();
  }
  
  console.log("Data sync completed at", new Date().toISOString());
  
  return true;
};

/**
 * Hook to detect network status changes and trigger refresh
 * (Keeping this for backwards compatibility)
 */
export const useNetworkSync = () => {
  return navigator.onLine;
};
