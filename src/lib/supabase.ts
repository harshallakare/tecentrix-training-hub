
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

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
  return supabaseUrl !== '' && supabaseAnonKey !== '';
};
