
import React, { useEffect } from 'react';
import { useContentSync } from '@/hooks/use-content-sync';
import { toast } from 'sonner';

/**
 * This component aggressively ensures content synchronization
 */
const CourseSync: React.FC<{ onSync?: (course: any) => void }> = ({ onSync }) => {
  const { coursesList, refreshContent } = useContentSync(true);
  
  useEffect(() => {
    // Clear cache and force refresh immediately
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('tecentrix-content');
    }
    
    // Force content refresh multiple times to ensure sync
    refreshContent();
    
    // Add a second refresh after a short delay to ensure data is updated
    const secondRefresh = setTimeout(() => {
      refreshContent();
      console.log("Secondary content refresh triggered");
      
      // If running on mobile, show a sync notification
      if (window.innerWidth < 768) {
        toast.info("Syncing latest course data...");
      }
    }, 1000);
    
    // On mobile, set up more aggressive polling
    const mobileRefresh = setInterval(() => {
      if (window.innerWidth < 768) {
        refreshContent();
        console.log("Mobile refresh cycle triggered");
      }
    }, 10000); // Every 10 seconds on mobile
    
    // If there's an onSync callback, call it with the first course (backward compatibility)
    if (onSync && coursesList.length > 0) {
      onSync(coursesList[0]);
    }
    
    return () => {
      clearTimeout(secondRefresh);
      clearInterval(mobileRefresh);
    };
  }, [coursesList, onSync, refreshContent]);

  // Force network request to bust cache
  useEffect(() => {
    // Create a unique URL to bypass cache
    const bustCache = () => {
      const uniqueUrl = `${window.location.origin}/api/ping?cache=${Date.now()}`;
      fetch(uniqueUrl, { cache: 'no-store' })
        .catch(() => console.log("Cache-busting ping completed"));
    };
    
    // Run immediately and set interval
    bustCache();
    const interval = setInterval(bustCache, 15000);
    
    return () => clearInterval(interval);
  }, []);

  return null; // This is a utility component with no UI
};

export default CourseSync;
