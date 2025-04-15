
import { useEffect } from 'react';
import { settingsService } from '@/lib/supabase';
import { useSettingsStore } from '@/store/settingsStore';

export function useSettingsSync() {
  const { settings, updateSettings } = useSettingsStore();

  useEffect(() => {
    // Fetch and sync settings from the database on mount
    const syncSettings = async () => {
      try {
        const generalSettings = await settingsService.getSiteSettings('general');
        const contactSettings = await settingsService.getSiteSettings('contact');
        const socialSettings = await settingsService.getSiteSettings('social');
        
        updateSettings({
          ...generalSettings,
          contactInfo: contactSettings,
          socialLinks: socialSettings
        });
      } catch (error) {
        console.error("Failed to sync settings:", error);
      }
    };

    syncSettings();
  }, []);

  return settings;
}
