import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { settingsService } from '@/lib/supabase';
import { toast } from 'sonner';

export interface CompanyInfo {
  companyName: string;
  logo: string;
  logoText: string;
  favicon: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

export interface SocialLinks {
  facebook: string;
  twitter: string;
  linkedin: string;
  instagram: string;
  youtube?: string;
}

export interface SMTPConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  fromEmail: string;
  fromName: string;
  enabled: boolean;
  secure: boolean;
}

export interface InquiryRecipient {
  id: string;
  name: string;
  email: string;
  department: string;
  isDefault?: boolean;
}

export interface WhatsAppConfig {
  enabled: boolean;
  phoneNumber: string;
  message: string;
}

export interface AdminCredentials {
  username: string;
  password: string;
}

export interface Settings {
  companyName: string;
  tagline: string;
  contactInfo: ContactInfo;
  socialLinks: SocialLinks;
  footerText: string;
  enableBlog: boolean;
  showTestimonials: boolean;
  smtpConfig: SMTPConfig;
  inquiryRecipients: InquiryRecipient[];
  whatsAppConfig: WhatsAppConfig;
  adminCredentials: AdminCredentials;
}

interface SettingsState {
  settings: Settings;
  updateSettings: (settings: Partial<Settings>) => void;
  updateCompanyInfo: (companyInfo: Partial<CompanyInfo>) => void;
  updateContactInfo: (contactInfo: Partial<ContactInfo>) => void;
  updateSocialLinks: (socialLinks: Partial<SocialLinks>) => void;
  updateSMTPConfig: (smtpConfig: Partial<SMTPConfig>) => void;
  updateWhatsAppConfig: (whatsAppConfig: Partial<WhatsAppConfig>) => void;
  updateAdminCredentials: (credentials: AdminCredentials) => void;
  addInquiryRecipient: (recipient: InquiryRecipient) => void;
  updateInquiryRecipient: (id: string, recipient: Partial<InquiryRecipient>) => void;
  removeInquiryRecipient: (id: string) => void;
  getCompanyName: () => string;
}

const defaultSettings: Settings = {
  companyName: 'Tecentrix',
  tagline: 'Expert Linux Training & Certification',
  contactInfo: {
    email: 'info@tecentrix.com',
    phone: '+91 80 1234 5678',
    address: 'Level 5, Tech Park, Bangalore - 560037, Karnataka, India',
  },
  socialLinks: {
    facebook: 'https://facebook.com/tecentrix',
    twitter: 'https://twitter.com/tecentrix',
    linkedin: 'https://linkedin.com/company/tecentrix',
    instagram: 'https://instagram.com/tecentrix',
    youtube: 'https://youtube.com/tecentrix',
  },
  footerText: '© 2025 Tecentrix. All rights reserved.',
  enableBlog: false,
  showTestimonials: true,
  smtpConfig: {
    host: 'smtp.example.com',
    port: 587,
    username: 'username@example.com',
    password: '',
    fromEmail: 'notifications@tecentrix.com',
    fromName: 'Tecentrix Notifications',
    enabled: false,
    secure: true,
  },
  inquiryRecipients: [
    {
      id: '1',
      name: 'General Inquiries',
      email: 'info@tecentrix.com',
      department: 'General',
      isDefault: true
    },
    {
      id: '2',
      name: 'Admissions',
      email: 'admissions@tecentrix.com',
      department: 'Admissions'
    }
  ],
  whatsAppConfig: {
    enabled: true,
    phoneNumber: '+919876543210',
    message: 'Hello, I am interested in your Linux training courses.',
  },
  adminCredentials: {
    username: 'admin',
    password: 'tecentrix',
  },
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      settings: defaultSettings,
      updateSettings: async (newSettings) => {
        try {
          console.log("Updating settings in store:", newSettings);
          
          await settingsService.saveSiteSettings('general', {
            companyName: newSettings.companyName || get().settings.companyName,
            tagline: newSettings.tagline || get().settings.tagline,
            footerText: newSettings.footerText || get().settings.footerText,
            enableBlog: newSettings.enableBlog !== undefined ? newSettings.enableBlog : get().settings.enableBlog,
            showTestimonials: newSettings.showTestimonials !== undefined ? newSettings.showTestimonials : get().settings.showTestimonials,
          });
          
          set((state) => ({
            settings: {
              ...state.settings,
              ...newSettings,
            }
          }));
          
          setTimeout(() => {
            window.dispatchEvent(new Event('settings-updated'));
          }, 100);
          
          toast.success("Settings updated successfully");
        } catch (error) {
          console.error("Failed to update settings:", error);
          toast.error("Failed to save general settings");
        }
      },
      updateCompanyInfo: (companyInfo) => 
        set((state) => {
          console.log("Updating company info:", companyInfo);
          
          const updatedSettings = {
            settings: {
              ...state.settings,
              companyName: companyInfo.companyName ?? state.settings.companyName,
            }
          };
          
          setTimeout(() => {
            window.dispatchEvent(new Event('settings-updated'));
            window.dispatchEvent(new Event('storage'));
          }, 100);
          
          return updatedSettings;
        }),
      updateContactInfo: async (contactInfo) => {
        try {
          console.log("Updating contact info:", contactInfo);
          
          await settingsService.saveSiteSettings('contact', {
            ...get().settings.contactInfo,
            ...contactInfo
          });
          
          set((state) => ({
            settings: {
              ...state.settings,
              contactInfo: {
                ...state.settings.contactInfo,
                ...contactInfo,
              }
            }
          }));
          
          toast.success("Contact information updated successfully");
        } catch (error) {
          console.error("Failed to update contact settings:", error);
          toast.error("Failed to save contact information");
        }
      },
      updateSocialLinks: async (socialLinks) => {
        try {
          console.log("Updating social links:", socialLinks);
          
          await settingsService.saveSiteSettings('social', {
            ...get().settings.socialLinks,
            ...socialLinks
          });
          
          set((state) => ({
            settings: {
              ...state.settings,
              socialLinks: {
                ...state.settings.socialLinks,
                ...socialLinks,
              }
            }
          }));
          
          toast.success("Social links updated successfully");
        } catch (error) {
          console.error("Failed to update social links:", error);
          toast.error("Failed to save social links");
        }
      },
      updateSMTPConfig: async (smtpConfig) => {
        try {
          console.log("Updating SMTP config:", smtpConfig);
          
          await settingsService.saveSiteSettings('email', {
            ...get().settings.smtpConfig,
            ...smtpConfig
          });
          
          set((state) => ({
            settings: {
              ...state.settings,
              smtpConfig: {
                ...state.settings.smtpConfig,
                ...smtpConfig,
              }
            }
          }));
          
          toast.success("Email settings updated successfully");
        } catch (error) {
          console.error("Failed to update SMTP config:", error);
          toast.error("Failed to save email settings");
        }
      },
      updateWhatsAppConfig: async (whatsAppConfig) => {
        try {
          console.log("Updating WhatsApp config:", whatsAppConfig);
          
          await settingsService.saveSiteSettings('whatsapp', {
            ...get().settings.whatsAppConfig,
            ...whatsAppConfig
          });
          
          set((state) => ({
            settings: {
              ...state.settings,
              whatsAppConfig: {
                ...state.settings.whatsAppConfig,
                ...whatsAppConfig,
              }
            }
          }));
          
          toast.success("WhatsApp settings updated successfully");
        } catch (error) {
          console.error("Failed to update WhatsApp config:", error);
          toast.error("Failed to save WhatsApp settings");
        }
      },
      updateAdminCredentials: async (credentials) => {
        try {
          console.log("Updating admin credentials");
          
          await settingsService.saveSiteSettings('admins', {
            username: credentials.username,
            password: "*******"
          });
          
          set((state) => ({
            settings: {
              ...state.settings,
              adminCredentials: {
                ...credentials,
              }
            }
          }));
          
          toast.success("Admin credentials updated successfully");
        } catch (error) {
          console.error("Failed to update admin credentials:", error);
          toast.error("Failed to save admin credentials");
        }
      },
      addInquiryRecipient: async (recipient) => {
        try {
          const currentRecipients = [...get().settings.inquiryRecipients];
          const updatedRecipients = [...currentRecipients, recipient];
          
          await settingsService.saveSiteSettings('recipients', updatedRecipients);
          
          set((state) => ({
            settings: {
              ...state.settings,
              inquiryRecipients: updatedRecipients
            }
          }));
          
          toast.success(`${recipient.name} added as a recipient`);
        } catch (error) {
          console.error("Failed to add inquiry recipient:", error);
          toast.error("Failed to add recipient");
        }
      },
      updateInquiryRecipient: async (id, updatedRecipient) => {
        try {
          const currentRecipients = [...get().settings.inquiryRecipients];
          const updatedRecipients = currentRecipients.map(recipient => 
            recipient.id === id ? { ...recipient, ...updatedRecipient } : recipient
          );
          
          await settingsService.saveSiteSettings('recipients', updatedRecipients);
          
          set((state) => ({
            settings: {
              ...state.settings,
              inquiryRecipients: updatedRecipients
            }
          }));
          
          toast.success("Recipient updated successfully");
        } catch (error) {
          console.error("Failed to update inquiry recipient:", error);
          toast.error("Failed to update recipient");
        }
      },
      removeInquiryRecipient: async (id) => {
        try {
          const currentRecipients = [...get().settings.inquiryRecipients];
          const updatedRecipients = currentRecipients.filter(recipient => recipient.id !== id);
          
          await settingsService.saveSiteSettings('recipients', updatedRecipients);
          
          set((state) => ({
            settings: {
              ...state.settings,
              inquiryRecipients: updatedRecipients
            }
          }));
          
          toast.success("Recipient removed successfully");
        } catch (error) {
          console.error("Failed to remove inquiry recipient:", error);
          toast.error("Failed to remove recipient");
        }
      },
      getCompanyName: () => get().settings.companyName,
    }),
    {
      name: 'tecentrix-settings',
      version: 1,
      merge: (persistedState: any, currentState) => {
        const merged = {
          ...currentState,
          settings: {
            ...defaultSettings,
            ...(persistedState as any).settings,
          }
        };
        console.log("Storage hydrated with merged settings:", merged);
        return merged;
      },
    }
  )
);

export const refreshSettingsFromStorage = () => {
  const storedSettings = localStorage.getItem('tecentrix-settings');
  if (storedSettings) {
    try {
      const parsedSettings = JSON.parse(storedSettings);
      if (parsedSettings && parsedSettings.state && parsedSettings.state.settings) {
        useSettingsStore.setState({ 
          settings: {
            ...defaultSettings,
            ...parsedSettings.state.settings
          } 
        });
        console.log("Settings refreshed from storage:", parsedSettings.state.settings);
      }
    } catch (e) {
      console.error("Error parsing stored settings:", e);
    }
  }
};

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key === 'tecentrix-settings') {
      refreshSettingsFromStorage();
    }
  });
  
  window.addEventListener('settings-updated', () => {
    refreshSettingsFromStorage();
  });
}
