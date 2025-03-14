
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
}

interface SettingsState {
  settings: Settings;
  updateSettings: (settings: Partial<Settings>) => void;
  updateContactInfo: (contactInfo: Partial<ContactInfo>) => void;
  updateSocialLinks: (socialLinks: Partial<SocialLinks>) => void;
  updateSmtpConfig: (smtpConfig: Partial<SmtpConfig>) => void;
  updateWhatsAppConfig: (whatsAppConfig: Partial<WhatsAppConfig>) => void;
  addInquiryRecipient: (recipient: InquiryRecipient) => void;
  updateInquiryRecipient: (id: string, recipient: Partial<InquiryRecipient>) => void;
  removeInquiryRecipient: (id: string) => void;
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
          phoneNumber: '+918793044999',  // Updated to match console logs
          message: 'Hello, I\'m interested in your courses!',
        },
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
    }
  )
);
