
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

export interface InquiryRecipients {
  general: string[];
  admissions: string;
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
  inquiryRecipients: InquiryRecipients;
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
}

// Initialize with default values
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
  inquiryRecipients: {
    general: ['info@tecentrix.com'],
    admissions: 'admissions@tecentrix.com',
  },
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
    (set) => ({
      settings: defaultSettings,
      updateSettings: (newSettings) => 
        set((state) => ({
          settings: {
            ...state.settings,
            ...newSettings,
          }
        })),
      updateCompanyInfo: (companyInfo) => 
        set((state) => ({
          settings: {
            ...state.settings,
            companyName: companyInfo.companyName ?? state.settings.companyName,
            // Add other company info properties as needed
          }
        })),
      updateContactInfo: (contactInfo) => 
        set((state) => ({
          settings: {
            ...state.settings,
            contactInfo: {
              ...state.settings.contactInfo,
              ...contactInfo,
            }
          }
        })),
      updateSocialLinks: (socialLinks) => 
        set((state) => ({
          settings: {
            ...state.settings,
            socialLinks: {
              ...state.settings.socialLinks,
              ...socialLinks,
            }
          }
        })),
      updateSMTPConfig: (smtpConfig) => 
        set((state) => ({
          settings: {
            ...state.settings,
            smtpConfig: {
              ...state.settings.smtpConfig,
              ...smtpConfig,
            }
          }
        })),
      updateWhatsAppConfig: (whatsAppConfig) => 
        set((state) => ({
          settings: {
            ...state.settings,
            whatsAppConfig: {
              ...state.settings.whatsAppConfig,
              ...whatsAppConfig,
            }
          }
        })),
      updateAdminCredentials: (credentials) => 
        set((state) => ({
          settings: {
            ...state.settings,
            adminCredentials: {
              ...credentials,
            }
          }
        })),
    }),
    {
      name: 'tecentrix-settings',
    }
  )
);
