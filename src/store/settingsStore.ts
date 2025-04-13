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
  youtube?: string; // Added youtube as optional
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

// Changed to a recipient object type
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
  inquiryRecipients: InquiryRecipient[]; // Changed to an array of InquiryRecipient
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
  // Added getter functions for simplicity
  getCompanyName: () => string;
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
    youtube: 'https://youtube.com/tecentrix', // Added youtube
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
  inquiryRecipients: [ // Changed to an array of recipients
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

// Improved sync function with more forceful updates
const forceSyncToStorage = (state: SettingsState) => {
  try {
    // Direct localStorage write for immediate syncing
    localStorage.setItem('tecentrix-settings-raw', JSON.stringify(state.settings));
    
    // Update HTML document attributes for CSS targeting
    document.documentElement.dataset.companyName = state.settings.companyName;
    document.title = `${state.settings.companyName} - Linux Administration Training`;
    
    // Dispatch events to notify all components of the change
    window.dispatchEvent(new CustomEvent('settings-updated'));
    window.dispatchEvent(new Event('storage')); // Simulate storage event for cross-tab sync
    
    // Additional dispatch for specific company name changes
    window.dispatchEvent(new CustomEvent('company-name-updated', {
      detail: { companyName: state.settings.companyName }
    }));
    
    console.log(`Settings synced to storage with company name: ${state.settings.companyName}`);
    
    return true;
  } catch (e) {
    console.error("Error forcefully syncing settings:", e);
    return false;
  }
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      settings: defaultSettings,
      updateSettings: (newSettings) => 
        set((state) => {
          console.log("Updating settings with:", newSettings);
          
          const updatedState = {
            settings: {
              ...state.settings,
              ...newSettings,
            }
          };
          
          // Force immediate sync
          setTimeout(() => {
            forceSyncToStorage({ ...get(), settings: updatedState.settings });
            // Double dispatch for reliability
            window.dispatchEvent(new Event('storage'));
          }, 0);
          
          return updatedState;
        }),
      updateCompanyInfo: (companyInfo) => 
        set((state) => {
          console.log("Updating company info:", companyInfo);
          
          const updatedSettings = {
            settings: {
              ...state.settings,
              companyName: companyInfo.companyName ?? state.settings.companyName,
              // Add other company info properties as needed
            }
          };
          
          // Force immediate sync with extra safeguards
          setTimeout(() => {
            forceSyncToStorage({ ...get(), settings: updatedSettings.settings });
            
            // Update the document directly for immediate visual feedback
            if (companyInfo.companyName) {
              document.documentElement.dataset.companyName = companyInfo.companyName;
              document.title = `${companyInfo.companyName} - Linux Administration Training`;
            }
            
            // Multiple event dispatches for reliability
            window.dispatchEvent(new CustomEvent('settings-updated'));
            window.dispatchEvent(new Event('storage'));
            window.dispatchEvent(new CustomEvent('company-name-updated', {
              detail: { companyName: companyInfo.companyName || state.settings.companyName }
            }));
          }, 0);
          
          return updatedSettings;
        }),
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
      addInquiryRecipient: (recipient) => 
        set((state) => ({
          settings: {
            ...state.settings,
            inquiryRecipients: [...state.settings.inquiryRecipients, recipient]
          }
        })),
      updateInquiryRecipient: (id, updatedRecipient) => 
        set((state) => ({
          settings: {
            ...state.settings,
            inquiryRecipients: state.settings.inquiryRecipients.map(recipient => 
              recipient.id === id ? { ...recipient, ...updatedRecipient } : recipient
            )
          }
        })),
      removeInquiryRecipient: (id) => 
        set((state) => ({
          settings: {
            ...state.settings,
            inquiryRecipients: state.settings.inquiryRecipients.filter(recipient => recipient.id !== id)
          }
        })),
      getCompanyName: () => get().settings.companyName,
    }),
    {
      name: 'tecentrix-settings',
      // Improve storage settings with version information
      version: 2, // Incremented version to force reset if needed
      // Add merge function to ensure settings are properly merged on hydration
      merge: (persistedState: any, currentState) => {
        const merged = {
          ...currentState,
          settings: {
            ...defaultSettings,
            ...(persistedState as any).settings,
          }
        };
        console.log("Storage hydrated with merged settings:", merged);
        
        // Force immediate sync after hydration
        setTimeout(() => {
          forceSyncToStorage(merged);
        }, 0);
        
        return merged;
      },
      // Add onRehydrateStorage to know when storage has been rehydrated
      onRehydrateStorage: () => (state) => {
        if (state) {
          console.log("Settings rehydrated successfully");
          // Force sync after rehydration
          forceSyncToStorage(state);
        }
      },
    }
  )
);

// Improved refresh function with better error handling and multiple sync attempts
export const refreshSettingsFromStorage = () => {
  const storedSettings = localStorage.getItem('tecentrix-settings');
  const rawSettings = localStorage.getItem('tecentrix-settings-raw');
  
  try {
    // Try first with raw settings for more immediate updates
    if (rawSettings) {
      const parsedRawSettings = JSON.parse(rawSettings);
      if (parsedRawSettings) {
        useSettingsStore.setState({ 
          settings: {
            ...defaultSettings,
            ...parsedRawSettings
          } 
        });
        console.log("Settings refreshed from raw storage:", parsedRawSettings);
        return true;
      }
    }
    
    // Fall back to persisted storage format
    if (storedSettings) {
      const parsedSettings = JSON.parse(storedSettings);
      if (parsedSettings && parsedSettings.state && parsedSettings.state.settings) {
        useSettingsStore.setState({ 
          settings: {
            ...defaultSettings,
            ...parsedSettings.state.settings
          } 
        });
        console.log("Settings refreshed from persisted storage:", parsedSettings.state.settings);
        
        // Update document for immediate visual feedback
        document.documentElement.dataset.companyName = parsedSettings.state.settings.companyName;
        document.title = `${parsedSettings.state.settings.companyName} - Linux Administration Training`;
        
        return true;
      }
    }
    
    // If we get here, we couldn't refresh from storage
    console.warn("No valid settings found in storage");
    return false;
    
  } catch (e) {
    console.error("Error parsing stored settings:", e);
    return false;
  }
};

// Add event listener to sync settings across tabs/frames
if (typeof window !== 'undefined') {
  // Handle storage events for cross-tab synchronization
  window.addEventListener('storage', (event) => {
    if (event.key === 'tecentrix-settings' || event.key === 'tecentrix-settings-raw') {
      console.log("Storage event detected:", event.key);
      refreshSettingsFromStorage();
    }
  });
  
  // Listen for custom events
  window.addEventListener('settings-updated', () => {
    console.log("Settings updated event received");
    refreshSettingsFromStorage();
  });
  
  // Initialize with a forced refresh
  setTimeout(refreshSettingsFromStorage, 0);
  
  // Add multiple delayed refreshes for reliability
  [100, 500, 1000, 2000].forEach(delay => {
    setTimeout(refreshSettingsFromStorage, delay);
  });
}
