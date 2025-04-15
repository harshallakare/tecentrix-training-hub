
import { useEffect } from 'react';
import { useSettingsStore, refreshSettingsFromStorage } from '@/store/settingsStore';
import { settingsService } from '@/lib/supabase';
import { toast } from 'sonner';

/**
 * Custom hook to ensure settings are properly synced across different 
 * parts of the application and across mobile/desktop views
 */
export function useSettingsSync() {
  const { settings, updateSettings } = useSettingsStore();
  
  useEffect(() => {
    console.log("Setting up settings sync...");
    
    // Initial refresh to ensure we have latest settings
    refreshSettingsFromStorage();
    
    // Initial sync with Supabase database
    const syncWithDatabase = async () => {
      try {
        const generalSettings = await settingsService.getSiteSettings('general');
        const contactSettings = await settingsService.getSiteSettings('contact');
        const socialSettings = await settingsService.getSiteSettings('social');
        const emailSettings = await settingsService.getSiteSettings('email');
        const whatsappSettings = await settingsService.getSiteSettings('whatsapp');
        const adminSettings = await settingsService.getSiteSettings('admins');
        const recipientSettings = await settingsService.getSiteSettings('recipients');
        
        console.log("Synced settings from database:", { 
          generalSettings, 
          contactSettings, 
          socialSettings,
          emailSettings,
          whatsappSettings,
          adminSettings,
          recipientSettings
        });
        
        // Update with merged settings, but suppress notifications for auto-syncs
        updateSettings({
          ...generalSettings,
          contactInfo: contactSettings || settings.contactInfo,
          socialLinks: socialSettings || settings.socialLinks,
          smtpConfig: emailSettings || settings.smtpConfig,
          whatsAppConfig: whatsappSettings || settings.whatsAppConfig,
          adminCredentials: adminSettings || settings.adminCredentials,
          inquiryRecipients: Array.isArray(recipientSettings) ? recipientSettings : settings.inquiryRecipients
        }, false); // Pass false to prevent notification for automatic syncs
      } catch (error) {
        console.error("Failed to sync settings from database:", error);
        toast.error("Failed to load settings from database");
      }
    };
    
    syncWithDatabase();
    
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
        syncWithDatabase();
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
      setTimeout(syncWithDatabase, 3000);
    }
    
    // Clean up on unmount
    return () => {
      clearInterval(syncInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [updateSettings]);
  
  return settings;
}

/**
 * Simplified hook for components that only need the company name
 */
export function useCompanyName() {
  const settings = useSettingsSync();
  return settings.companyName;
}
