
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

interface SmtpConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  fromEmail: string;
  fromName: string;
  secure: boolean;
  enabled: boolean;
}

interface InquiryRecipient {
  id: string;
  name: string;
  email: string;
  department: string;
  isDefault?: boolean;
}

interface WhatsAppConfig {
  enabled: boolean;
  phoneNumber: string;
  message: string;
}

interface AdminCredentials {
  username: string;
  password: string;
}

interface Settings {
  companyName: string;
  contactInfo: ContactInfo;
  socialLinks: SocialLinks;
  footerText: string;
  enableBlog: boolean;
  showTestimonials: boolean;
  smtpConfig: SmtpConfig;
  inquiryRecipients: InquiryRecipient[];
  whatsAppConfig: WhatsAppConfig;
  adminCredentials: AdminCredentials;
}

// Default settings to use when initializing store or handling missing data
const defaultSettings: Settings = {
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
  smtpConfig: {
    host: '',
    port: 587,
    username: '',
    password: '',
    fromEmail: 'noreply@tecentrix.com',
    fromName: 'Tecentrix Contact Form',
    secure: true,
    enabled: false,
  },
  inquiryRecipients: [
    {
      id: '1',
      name: 'Support Team',
      email: 'support@tecentrix.com',
      department: 'Support',
      isDefault: true,
    },
    {
      id: '2',
      name: 'Sales Department',
      email: 'sales@tecentrix.com',
      department: 'Sales',
    },
    {
      id: '3',
      name: 'Media Relations',
      email: 'media@tecentrix.com',
      department: 'PR & Media',
    }
  ],
  whatsAppConfig: {
    enabled: true,
    phoneNumber: '+918793044999',
    message: 'Hello, I\'m interested in your courses!',
  },
  adminCredentials: {
    username: 'admin',
    password: 'tecentrix',
  },
};

interface SettingsState {
  settings: Settings;
  updateSettings: (settings: Partial<Settings>) => void;
  updateContactInfo: (contactInfo: Partial<ContactInfo>) => void;
  updateSocialLinks: (socialLinks: Partial<SocialLinks>) => void;
  updateSmtpConfig: (smtpConfig: Partial<SmtpConfig>) => void;
  updateWhatsAppConfig: (whatsAppConfig: Partial<WhatsAppConfig>) => void;
  updateAdminCredentials: (credentials: Partial<AdminCredentials>) => void;
  addInquiryRecipient: (recipient: InquiryRecipient) => void;
  updateInquiryRecipient: (id: string, recipient: Partial<InquiryRecipient>) => void;
  removeInquiryRecipient: (id: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: defaultSettings,
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
      updateSmtpConfig: (newSmtpConfig) =>
        set((state) => ({
          settings: {
            ...state.settings,
            smtpConfig: { ...state.settings.smtpConfig, ...newSmtpConfig },
          },
        })),
      updateWhatsAppConfig: (newWhatsAppConfig) =>
        set((state) => ({
          settings: {
            ...state.settings,
            whatsAppConfig: { ...state.settings.whatsAppConfig, ...newWhatsAppConfig },
          },
        })),
      updateAdminCredentials: (newCredentials) =>
        set((state) => ({
          settings: {
            ...state.settings,
            adminCredentials: { ...state.settings.adminCredentials, ...newCredentials },
          },
        })),
      addInquiryRecipient: (recipient) =>
        set((state) => ({
          settings: {
            ...state.settings,
            inquiryRecipients: [...state.settings.inquiryRecipients, recipient],
          },
        })),
      updateInquiryRecipient: (id, updatedRecipient) =>
        set((state) => ({
          settings: {
            ...state.settings,
            inquiryRecipients: state.settings.inquiryRecipients.map(r => 
              r.id === id ? { ...r, ...updatedRecipient } : r
            ),
          },
        })),
      removeInquiryRecipient: (id) =>
        set((state) => ({
          settings: {
            ...state.settings,
            inquiryRecipients: state.settings.inquiryRecipients.filter(r => r.id !== id),
          },
        })),
    }),
    {
      name: 'tecentrix-settings',
      merge: (persistedState: any, currentState: SettingsState) => {
        // Convert to actual state objects - this ensures we're dealing with object types
        const safePersistedState = typeof persistedState === 'object' && persistedState !== null 
          ? persistedState as Partial<SettingsState> 
          : {};
        
        // Create a deep-merged settings object with defaults for any missing fields
        let mergedSettings: Settings;

        try {
          // First use the persisted settings if they exist
          const persistedSettings = safePersistedState.settings || {};
          
          // Deep merge with defaults to ensure all fields exist
          mergedSettings = {
            companyName: persistedSettings.companyName || defaultSettings.companyName,
            contactInfo: {
              email: persistedSettings.contactInfo?.email || defaultSettings.contactInfo.email,
              phone: persistedSettings.contactInfo?.phone || defaultSettings.contactInfo.phone,
              address: persistedSettings.contactInfo?.address || defaultSettings.contactInfo.address,
            },
            socialLinks: {
              facebook: persistedSettings.socialLinks?.facebook || defaultSettings.socialLinks.facebook,
              twitter: persistedSettings.socialLinks?.twitter || defaultSettings.socialLinks.twitter,
              linkedin: persistedSettings.socialLinks?.linkedin || defaultSettings.socialLinks.linkedin,
              youtube: persistedSettings.socialLinks?.youtube || defaultSettings.socialLinks.youtube,
            },
            footerText: persistedSettings.footerText || defaultSettings.footerText,
            enableBlog: persistedSettings.enableBlog !== undefined ? persistedSettings.enableBlog : defaultSettings.enableBlog,
            showTestimonials: persistedSettings.showTestimonials !== undefined ? persistedSettings.showTestimonials : defaultSettings.showTestimonials,
            smtpConfig: {
              host: persistedSettings.smtpConfig?.host || defaultSettings.smtpConfig.host,
              port: persistedSettings.smtpConfig?.port || defaultSettings.smtpConfig.port,
              username: persistedSettings.smtpConfig?.username || defaultSettings.smtpConfig.username,
              password: persistedSettings.smtpConfig?.password || defaultSettings.smtpConfig.password,
              fromEmail: persistedSettings.smtpConfig?.fromEmail || defaultSettings.smtpConfig.fromEmail,
              fromName: persistedSettings.smtpConfig?.fromName || defaultSettings.smtpConfig.fromName,
              secure: persistedSettings.smtpConfig?.secure !== undefined ? persistedSettings.smtpConfig.secure : defaultSettings.smtpConfig.secure,
              enabled: persistedSettings.smtpConfig?.enabled !== undefined ? persistedSettings.smtpConfig.enabled : defaultSettings.smtpConfig.enabled,
            },
            inquiryRecipients: persistedSettings.inquiryRecipients?.length 
              ? persistedSettings.inquiryRecipients 
              : defaultSettings.inquiryRecipients,
            whatsAppConfig: {
              enabled: persistedSettings.whatsAppConfig?.enabled !== undefined 
                ? persistedSettings.whatsAppConfig.enabled 
                : defaultSettings.whatsAppConfig.enabled,
              phoneNumber: persistedSettings.whatsAppConfig?.phoneNumber || defaultSettings.whatsAppConfig.phoneNumber,
              message: persistedSettings.whatsAppConfig?.message || defaultSettings.whatsAppConfig.message,
            },
            adminCredentials: {
              username: persistedSettings.adminCredentials?.username || defaultSettings.adminCredentials.username,
              password: persistedSettings.adminCredentials?.password || defaultSettings.adminCredentials.password,
            },
          };
        } catch (error) {
          console.error('Error merging settings, using defaults', error);
          mergedSettings = defaultSettings;
        }
        
        return {
          ...currentState,
          settings: mergedSettings,
        };
      },
    }
  )
);
