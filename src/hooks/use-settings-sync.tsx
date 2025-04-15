
import { useEffect } from 'react';
import { useSettingsStore, refreshSettingsFromStorage } from '@/store/settingsStore';

/**
 * Custom hook to ensure settings are properly synced across different 
 * parts of the application and across mobile/desktop views
 */
export function useSettingsSync() {
  const { settings } = useSettingsStore();
  
  useEffect(() => {
    // Initial refresh to ensure we have latest settings
    refreshSettingsFromStorage();
    
    // Set up interval to periodically check for settings changes
    // This helps ensure mobile and desktop views stay in sync
    const syncInterval = setInterval(() => {
      refreshSettingsFromStorage();
    }, 5000); // Check every 5 seconds
    
    // Add listeners for visibility changes (tab switching, mobile app coming to foreground)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log("Page became visible, refreshing settings...");
        refreshSettingsFromStorage();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Force refresh on mobile view detection
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobileView = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|mobi|phone/i.test(userAgent);
    
    if (isMobileView) {
      console.log("Mobile view detected, ensuring settings sync");
      // Add extra refresh for mobile with slight delay
      setTimeout(refreshSettingsFromStorage, 1000);
      setTimeout(refreshSettingsFromStorage, 3000);
    }
    
    // Clean up on unmount
    return () => {
      clearInterval(syncInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
  
  return settings;
}

/**
 * Simplified hook for components that only need the company name
 */
export function useCompanyName() {
  const settings = useSettingsSync();
  return settings.companyName;
}
