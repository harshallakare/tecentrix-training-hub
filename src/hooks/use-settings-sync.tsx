
import { useEffect, useState } from 'react';
import { useSettingsStore, refreshSettingsFromStorage } from '@/store/settingsStore';

/**
 * Custom hook to ensure settings are properly synced across different 
 * parts of the application and across mobile/desktop views
 */
export function useSettingsSync() {
  const { settings } = useSettingsStore();
  const [lastSync, setLastSync] = useState(Date.now());
  
  useEffect(() => {
    console.log("Settings sync hook initialized");
    
    // Initial refresh to ensure we have latest settings
    refreshSettingsFromStorage();
    setLastSync(Date.now());
    
    // Function to force refresh settings from storage
    const forceRefresh = () => {
      refreshSettingsFromStorage();
      console.log("Settings forcefully refreshed at", new Date().toISOString());
      setLastSync(Date.now());
      
      // Update global HTML attributes for CSS targeting
      document.documentElement.dataset.lastSettingsSync = Date.now().toString();
      document.documentElement.dataset.companyName = useSettingsStore.getState().settings.companyName;
      
      // Force title update
      document.title = `${useSettingsStore.getState().settings.companyName} - Linux Administration Training`;
    };
    
    // Set up more aggressive interval to ensure settings stay in sync
    const syncInterval = setInterval(forceRefresh, 3000); // Check every 3 seconds
    
    // Secondary longer interval as backup
    const backupInterval = setInterval(forceRefresh, 15000); // Every 15 seconds
    
    // Add listeners for visibility changes (tab switching, mobile app coming to foreground)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log("Page became visible, refreshing settings...");
        forceRefresh();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Listen for custom events that might indicate settings changes
    const handleSettingsEvent = () => {
      console.log("Settings event detected, refreshing...");
      forceRefresh();
    };
    
    window.addEventListener('settings-updated', handleSettingsEvent);
    window.addEventListener('settings-sync', handleSettingsEvent);
    window.addEventListener('company-name-updated', handleSettingsEvent);
    
    // Force refresh on storage events (changes from other tabs/windows)
    const handleStorageChange = (event) => {
      if (event.key === 'tecentrix-settings' || event.key === null) {
        console.log("Storage change detected, refreshing settings...");
        forceRefresh();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Create mutation observer to detect changes to company name in DOM
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && 
            mutation.attributeName === 'data-company-name' &&
            mutation.target === document.documentElement) {
          const newCompanyName = document.documentElement.dataset.companyName;
          const currentCompanyName = useSettingsStore.getState().settings.companyName;
          
          if (newCompanyName && newCompanyName !== currentCompanyName) {
            console.log(`Company name changed in DOM: ${currentCompanyName} -> ${newCompanyName}`);
            useSettingsStore.getState().updateCompanyInfo({ companyName: newCompanyName });
            forceRefresh();
          }
        }
      });
    });
    
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['data-company-name'] 
    });
    
    // Force refresh on orientation change
    const handleOrientationChange = () => {
      console.log("Orientation changed, refreshing settings");
      setTimeout(forceRefresh, 100);
      setTimeout(forceRefresh, 500);
    };
    
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', () => {
      // Only refresh on significant size changes
      if (Math.abs(window.innerWidth - window.lastWidth || 0) > 50) {
        window.lastWidth = window.innerWidth;
        handleOrientationChange();
      }
    });
    
    // Clean up on unmount
    return () => {
      clearInterval(syncInterval);
      clearInterval(backupInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('settings-updated', handleSettingsEvent);
      window.removeEventListener('settings-sync', handleSettingsEvent);
      window.removeEventListener('company-name-updated', handleSettingsEvent);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('orientationchange', handleOrientationChange);
      observer.disconnect();
    };
  }, []);
  
  // Include lastSync in returned object to force re-renders when settings are refreshed
  return { ...settings, _lastSync: lastSync };
}

/**
 * Simplified hook for components that only need the company name
 */
export function useCompanyName() {
  const settings = useSettingsSync();
  return settings.companyName;
}

/**
 * Force an immediate settings refresh from any component
 */
export function forceSettingsRefresh() {
  console.log("Forcing immediate settings refresh");
  refreshSettingsFromStorage();
  document.documentElement.dataset.forceRefresh = Date.now().toString();
  window.dispatchEvent(new CustomEvent('settings-updated'));
  return true;
}
