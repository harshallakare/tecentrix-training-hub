
import React from 'react';
import { useContentStore } from "@/store/contentStore";
import { useNavigationStore } from "@/store/navigationStore";
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { toast } from 'sonner';

/**
 * Force refresh of content data to ensure consistency across devices
 * @param forceRefresh - Whether to force a clean refresh regardless of cache
 */
export const syncContentData = async (forceRefresh = false) => {
  try {
    const contentStore = useContentStore.getState();
    const navigationStore = useNavigationStore.getState();
    
    // Check if Supabase is configured, otherwise fall back to local storage
    if (!isSupabaseConfigured()) {
      console.log("Supabase not configured, using local storage fallback");
      
      // Add a timestamp to force cache bust for local storage
      if (forceRefresh) {
        console.log("Forcing local data refresh...");
        localStorage.setItem("tecentrix-last-sync", Date.now().toString());
      }
      
      // Refresh content and navigation data from local storage if the functions exist
      if (typeof contentStore?.refreshContent === 'function') {
        contentStore.refreshContent();
      }
      
      if (typeof navigationStore?.refreshNavigation === 'function') {
        navigationStore.refreshNavigation();
      }
      
      return true;
    }
    
    // Supabase is configured, fetch data from there
    console.log("Syncing data from Supabase...");
    
    // Fetch courses
    const { data: courses, error: coursesError } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (coursesError) {
      console.error("Error fetching courses:", coursesError);
    } else if (courses) {
      contentStore.setCoursesList(courses);
    }
    
    // Fetch testimonials
    const { data: testimonials, error: testimonialsError } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (testimonialsError) {
      console.error("Error fetching testimonials:", testimonialsError);
    } else if (testimonials) {
      contentStore.setTestimonialsList(testimonials);
    }
    
    // Fetch content settings
    const { data: settings, error: settingsError } = await supabase
      .from('content_settings')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
      
    if (settingsError) {
      console.error("Error fetching content settings:", settingsError);
    } else if (settings) {
      // Update content store with settings
      contentStore.updateHeroContent(settings.hero);
      contentStore.updateCoursesContent(settings.courses);
      contentStore.updateFeaturesContent(settings.features);
      contentStore.updateCTAContent(settings.cta);
    }
    
    return true;
  } catch (error) {
    console.error("Error syncing data:", error);
    return false;
  }
};

/**
 * Hook to detect network status changes and trigger refresh
 * This must only be used within React components
 */
export const useNetworkSync = () => {
  // This is a React hook and must be used within a component
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = React.useState(false);
  
  React.useEffect(() => {
    // Network status change handlers
    const handleOnline = async () => {
      setIsOnline(true);
      setIsSyncing(true);
      
      try {
        // When coming back online, force a data refresh
        await syncContentData(true);
        toast.success("Data synchronized successfully");
      } catch (error) {
        console.error("Failed to sync data:", error);
        toast.error("Failed to synchronize data");
      } finally {
        setIsSyncing(false);
      }
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      toast.warning("You are offline. Some features may not work properly.");
    };
    
    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Clean up
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  return { isOnline, isSyncing };
};

