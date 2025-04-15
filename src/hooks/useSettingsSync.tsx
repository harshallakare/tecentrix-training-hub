
import { useEffect } from 'react';
import { settingsService } from '@/lib/supabase';
import { useSettingsStore } from '@/store/settingsStore';
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
        
        console.log("Retrieved settings:", { generalSettings, contactSettings, socialSettings });
        
        // Use the quiet update method that doesn't show toast notifications
        updateSettings({
          ...generalSettings,
          contactInfo: contactSettings,
          socialLinks: socialSettings
        }, false); // Pass false to suppress notifications during initial sync
      } catch (error) {
        console.error("Failed to sync settings:", error);
        toast.error("Failed to load settings from database");
      }
    };

    syncSettings();
  }, [updateSettings]);

  return settings;
}
