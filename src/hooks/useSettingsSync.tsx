
import { useEffect } from 'react';
import { useSettingsStore } from '@/store/settingsStore';
import { settingsService } from '@/lib/supabase';
import { toast } from 'sonner';

export function useSettingsSync() {
  const { settings, updateSettings } = useSettingsStore();

  useEffect(() => {
    // Fetch and sync settings from the database on mount
    const syncSettings = async () => {
      try {
        console.log("Syncing settings from Supabase...");
        const generalSettings = await settingsService.getSiteSettings('general');
        const contactSettings = await settingsService.getSiteSettings('contact');
        const socialSettings = await settingsService.getSiteSettings('social');
        const emailSettings = await settingsService.getSiteSettings('email');
        const whatsappSettings = await settingsService.getSiteSettings('whatsapp');
        const adminSettings = await settingsService.getSiteSettings('admins');
        const recipientSettings = await settingsService.getSiteSettings('recipients');
        
        console.log("Retrieved settings:", { 
          generalSettings, 
          contactSettings, 
          socialSettings,
          emailSettings,
          whatsappSettings,
          adminSettings,
          recipientSettings
        });
        
        // Update with merged settings, but suppress notifications during initial sync
        updateSettings({
          ...generalSettings,
          contactInfo: contactSettings || settings.contactInfo,
          socialLinks: socialSettings || settings.socialLinks,
          smtpConfig: emailSettings || settings.smtpConfig,
          whatsAppConfig: whatsappSettings || settings.whatsAppConfig,
          adminCredentials: adminSettings || settings.adminCredentials,
          inquiryRecipients: Array.isArray(recipientSettings) ? recipientSettings : settings.inquiryRecipients
        }, false); // Pass false to suppress notifications during initial sync
      } catch (error) {
        console.error("Failed to sync settings:", error);
        toast.error("Failed to load settings from database");
      }
    };

    syncSettings();
    
    // Set up a periodic refresh to ensure data stays in sync
    const refreshInterval = setInterval(syncSettings, 60000); // Refresh every minute
    
    return () => {
      clearInterval(refreshInterval);
    };
  }, [settings.contactInfo, settings.socialLinks, updateSettings]);

  return settings;
}
