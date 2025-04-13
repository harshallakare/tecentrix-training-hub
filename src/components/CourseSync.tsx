
import React, { useEffect } from 'react';
import { useContentSync } from '@/hooks/use-content-sync';
import { toast } from 'sonner';

/**
 * This component aggressively ensures content synchronization
 * Added error handling to prevent socket issues
 */
const CourseSync: React.FC<{ onSync?: (course: any) => void }> = ({ onSync }) => {
  const { coursesList, refreshContent } = useContentSync(true);
  
  useEffect(() => {
    try {
      // Clear cache and force refresh immediately
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('tecentrix-content');
      }
      
      // Force content refresh multiple times to ensure sync
      refreshContent();
      
      // Add a second refresh after a short delay to ensure data is updated
      const secondRefresh = setTimeout(() => {
        try {
          refreshContent();
          console.log("Secondary content refresh triggered");
          
          // If running on mobile, show a sync notification
          if (window.innerWidth < 768) {
            toast.info("Syncing latest course data...");
          }
        } catch (e) {
          console.error("Error during secondary refresh:", e);
        }
      }, 1000);
      
      // On mobile, set up more aggressive polling
      const mobileRefresh = setInterval(() => {
        if (window.innerWidth < 768) {
          try {
            refreshContent();
            console.log("Mobile refresh cycle triggered");
          } catch (e) {
            console.error("Error during mobile refresh cycle:", e);
          }
        }
      }, 10000); // Every 10 seconds on mobile
      
      // If there's an onSync callback, call it with the first course (backward compatibility)
      if (onSync && coursesList.length > 0) {
        try {
          onSync(coursesList[0]);
        } catch (e) {
          console.error("Error in onSync callback:", e);
        }
      }
      
      return () => {
        clearTimeout(secondRefresh);
        clearInterval(mobileRefresh);
      };
    } catch (error) {
      console.error("Error in CourseSync effect:", error);
    }
  }, [coursesList, onSync, refreshContent]);

  // Force network request to bust cache
  useEffect(() => {
    try {
      // Create a unique URL to bypass cache
      const bustCache = () => {
        try {
          const uniqueUrl = `${window.location.origin}/api/ping?cache=${Date.now()}`;
          const abortController = new AbortController();
          const timeoutId = setTimeout(() => abortController.abort(), 3000); // 3 second timeout
          
          fetch(uniqueUrl, { 
            cache: 'no-store',
            signal: abortController.signal,
            headers: {
              'Pragma': 'no-cache',
              'Cache-Control': 'no-cache'
            }
          })
          .then(() => clearTimeout(timeoutId))
          .catch(() => {
            clearTimeout(timeoutId);
            console.log("Cache-busting ping completed");
          });
        } catch (e) {
          // Silently ignore network errors
        }
      };
      
      // Run immediately and set interval
      bustCache();
      const interval = setInterval(bustCache, 15000);
      
      return () => clearInterval(interval);
    } catch (error) {
      console.error("Error setting up cache busting:", error);
    }
  }, []);

  return null; // This is a utility component with no UI
};

export default CourseSync;
