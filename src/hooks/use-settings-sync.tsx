
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
    // Initial refresh to ensure we have latest settings
    refreshSettingsFromStorage();
    setLastSync(Date.now());
    
    // Update document attributes for CSS targeting
    document.documentElement.dataset.companyName = settings.companyName;
    document.title = `${settings.companyName} - Linux Administration Training`;
    
    // Listen for storage events (changes from other tabs)
    const handleStorageChange = (event) => {
      if (event.key === 'tecentrix-settings' || event.key === null) {
        refreshSettingsFromStorage();
        setLastSync(Date.now());
      }
    };
    
    // Add visibility change detection
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        refreshSettingsFromStorage();
        setLastSync(Date.now());
      }
    };
    
    // Add listeners
    window.addEventListener('storage', handleStorageChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Set up a simple refresh interval (much less aggressive than before)
    const syncInterval = setInterval(() => {
      refreshSettingsFromStorage();
      setLastSync(Date.now());
    }, 30000); // Every 30 seconds is plenty
    
    // Clean up on unmount
    return () => {
      clearInterval(syncInterval);
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [settings.companyName]);
  
  // Include lastSync in returned object to allow components to know when settings refreshed
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
  refreshSettingsFromStorage();
  return true;
}
