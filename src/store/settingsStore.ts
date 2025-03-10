
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SocialLinks {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
}

interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

interface Settings {
  companyName: string;
  contactInfo: ContactInfo;
  socialLinks: SocialLinks;
  footerText: string;
  enableBlog: boolean;
  showTestimonials: boolean;
}

interface SettingsState {
  settings: Settings;
  updateSettings: (settings: Partial<Settings>) => void;
  updateContactInfo: (contactInfo: Partial<ContactInfo>) => void;
  updateSocialLinks: (socialLinks: Partial<SocialLinks>) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: {
        companyName: 'Tecentrix',
        contactInfo: {
          email: 'info@tecentrix.com',
          phone: '+1 (555) 123-4567',
          address: '123 Tech Street, Silicon Valley, CA 94025',
        },
        socialLinks: {
          facebook: 'https://facebook.com/tecentrix',
          twitter: 'https://twitter.com/tecentrix',
          linkedin: 'https://linkedin.com/company/tecentrix',
          youtube: 'https://youtube.com/tecentrix',
        },
        footerText: '© 2024 Tecentrix. All rights reserved.',
        enableBlog: true,
        showTestimonials: true,
      },
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
      updateContactInfo: (newContactInfo) =>
        set((state) => ({
          settings: {
            ...state.settings,
            contactInfo: { ...state.settings.contactInfo, ...newContactInfo },
          },
        })),
      updateSocialLinks: (newSocialLinks) =>
        set((state) => ({
          settings: {
            ...state.settings,
            socialLinks: { ...state.settings.socialLinks, ...newSocialLinks },
          },
        })),
    }),
    {
      name: 'tecentrix-settings',
    }
  )
);
