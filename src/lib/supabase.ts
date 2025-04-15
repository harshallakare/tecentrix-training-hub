
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';
import { toast } from 'sonner';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://szwglhfbqygxoytzkxjt.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6d2dsaGZicXlneG95dHpreGp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2OTcwOTksImV4cCI6MjA2MDI3MzA5OX0.oEQiNpFsqkHhFXJr35ya3kYPalEsbuapwmkJRQQxiw0';

// Initialize the Supabase client with a check for required values
export const supabase = (() => {
  try {
    // Only create the client if both URL and key are provided
    if (supabaseUrl && supabaseAnonKey) {
      return createClient<Database>(supabaseUrl, supabaseAnonKey);
    }
    
    // Return a mock client that doesn't throw errors but logs warnings
    console.warn('Supabase is not configured. Using mock client.');
    return {
      from: () => ({
        select: () => ({ data: null, error: new Error('Supabase not configured') }),
        insert: () => ({ data: null, error: new Error('Supabase not configured') }),
        update: () => ({ data: null, error: new Error('Supabase not configured') }),
        delete: () => ({ data: null, error: new Error('Supabase not configured') }),
        upsert: () => ({ data: null, error: new Error('Supabase not configured') }),
        eq: () => ({ data: null, error: new Error('Supabase not configured') }),
        order: () => ({ data: null, error: new Error('Supabase not configured') }),
        limit: () => ({ data: null, error: new Error('Supabase not configured') }),
        single: () => ({ data: null, error: new Error('Supabase not configured') }),
      }),
      auth: {
        signUp: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
        signIn: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
        signOut: () => Promise.resolve({ error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
      storage: {
        from: () => ({
          upload: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
          getPublicUrl: () => ({ data: { publicUrl: '' } }),
        }),
      },
    } as any;
  } catch (error) {
    console.error('Error initializing Supabase client:', error);
    
    // Return a mock client on error
    return {
      from: () => ({
        select: () => ({ data: null, error }),
        insert: () => ({ data: null, error }),
        update: () => ({ data: null, error }),
        delete: () => ({ data: null, error }),
        upsert: () => ({ data: null, error }),
      }),
      auth: {
        signUp: () => Promise.resolve({ data: null, error }),
        signIn: () => Promise.resolve({ data: null, error }),
        signOut: () => Promise.resolve({ error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
      storage: {
        from: () => ({
          upload: () => Promise.resolve({ data: null, error }),
          getPublicUrl: () => ({ data: { publicUrl: '' } }),
        }),
      },
    } as any;
  }
})();

/**
 * Check if Supabase is properly configured
 */
export const isSupabaseConfigured = () => {
  return !!supabaseUrl && !!supabaseAnonKey;
};

/**
 * Handle Supabase operations with proper error handling and feedback
 * @param operation The database operation to execute
 * @param successMessage Message to show on success
 * @param errorPrefix Prefix for error message
 */
export const handleSupabaseOperation = async (
  operation: Promise<any>,
  successMessage?: string,
  errorPrefix = 'Operation failed'
) => {
  try {
    const { data, error } = await operation;
    
    if (error) {
      console.error(`${errorPrefix}:`, error);
      toast.error(`${errorPrefix}: ${error.message || 'Unknown error'}`);
      return { data: null, error };
    }
    
    if (successMessage) {
      toast.success(successMessage);
    }
    
    return { data, error: null };
  } catch (error: any) {
    console.error(`${errorPrefix}:`, error);
    toast.error(`${errorPrefix}: ${error.message || 'Unknown error'}`);
    return { data: null, error };
  }
};

// New helper methods for site settings and section content
export const settingsService = {
  async saveSiteSettings(name: string, value: Record<string, any>) {
    try {
      console.log(`Saving ${name} settings to Supabase:`, value);
      
      const { data, error } = await supabase
        .from('site_settings')
        .upsert({ name, value })
        .select();

      if (error) {
        console.error(`Error saving site settings for ${name}:`, error);
        toast.error(`Failed to save ${name} settings: ${error.message}`);
        throw error;
      }
      
      console.log(`Successfully saved ${name} settings:`, data);
      return data?.[0]?.value || {};
    } catch (error: any) {
      console.error(`Error saving site settings for ${name}:`, error);
      toast.error(`Failed to save ${name} settings: ${error.message || 'Unknown error'}`);
      throw error;
    }
  },

  async getSiteSettings(name: string) {
    try {
      console.log(`Fetching ${name} settings from Supabase`);
      
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('name', name)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned" which we handle gracefully
        console.error(`Error retrieving site settings for ${name}:`, error);
        return {};
      }
      
      console.log(`Retrieved ${name} settings:`, data?.value);
      return data?.value || {};
    } catch (error: any) {
      console.error(`Error retrieving site settings for ${name}:`, error);
      return {};
    }
  },

  async saveSectionContent(section: string, content: Record<string, any>) {
    try {
      console.log(`Saving ${section} content to Supabase:`, content);
      
      const { data, error } = await supabase
        .from('section_content')
        .upsert({ section, content })
        .select();

      if (error) {
        console.error(`Error saving section content for ${section}:`, error);
        toast.error(`Failed to save ${section} content: ${error.message}`);
        throw error;
      }
      
      console.log(`Successfully saved ${section} content:`, data);
      return data?.[0]?.content || {};
    } catch (error: any) {
      console.error(`Error saving section content for ${section}:`, error);
      toast.error(`Failed to save ${section} content: ${error.message || 'Unknown error'}`);
      throw error;
    }
  },

  async getSectionContent(section: string) {
    try {
      console.log(`Fetching ${section} content from Supabase`);
      
      const { data, error } = await supabase
        .from('section_content')
        .select('content')
        .eq('section', section)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned" which we handle gracefully
        console.error(`Error retrieving section content for ${section}:`, error);
        return {};
      }
      
      console.log(`Retrieved ${section} content:`, data?.content);
      return data?.content || {};
    } catch (error: any) {
      console.error(`Error retrieving section content for ${section}:`, error);
      return {};
    }
  }
};
