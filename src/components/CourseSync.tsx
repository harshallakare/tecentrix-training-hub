
import React, { useEffect } from 'react';
import { useContentSync } from '@/hooks/use-content-sync';
import { toast } from 'sonner';

/**
 * This component ensures content synchronization with improved error handling
 */
const CourseSync: React.FC<{ onSync?: (course: any) => void }> = ({ onSync }) => {
  const { coursesList, refreshContent } = useContentSync(false); // Less aggressive
  
  useEffect(() => {
    // Skip execution during SSR
    if (typeof window === 'undefined') {
      return;
    }
    
    try {
      // Safely clear cache
      if (typeof localStorage !== 'undefined') {
        try {
          localStorage.removeItem('tecentrix-content');
        } catch (e) {
          console.error("Error clearing localStorage:", e);
        }
      }
      
      // Initial refresh
      refreshContent();
      
      // Less aggressive second refresh
      const secondRefresh = setTimeout(() => {
        try {
          refreshContent();
        } catch (e) {
          console.error("Error during secondary refresh:", e);
        }
      }, 5000);
      
      // Notify on mobile only if needed
      if (typeof window !== 'undefined' && window.innerWidth < 768) {
        try {
          toast.info("Syncing course data...");
        } catch (e) {
          console.error("Error showing toast:", e);
        }
      }
      
      // Call onSync callback if provided and courses are available
      if (onSync && coursesList.length > 0) {
        try {
          onSync(coursesList[0]);
        } catch (e) {
          console.error("Error in onSync callback:", e);
        }
      }
      
      return () => {
        clearTimeout(secondRefresh);
      };
    } catch (error) {
      console.error("Error in CourseSync effect:", error);
    }
  }, [coursesList, onSync, refreshContent]);

  // Single network request to bust cache, with less frequency
  useEffect(() => {
    // Skip execution during SSR
    if (typeof window === 'undefined') {
      return;
    }
    
    try {
      const bustCache = () => {
        try {
          const uniqueUrl = `/api/ping?cache=${Date.now()}`;
          fetch(uniqueUrl, { 
            cache: 'no-store',
            headers: {
              'Pragma': 'no-cache',
              'Cache-Control': 'no-cache'
            }
          }).catch(() => {
            // Silent fail - just for cache busting
          });
        } catch (e) {
          // Silent fail
        }
      };
      
      // Run once after a short delay
      const initialTimeout = setTimeout(bustCache, 2000);
      
      return () => {
        clearTimeout(initialTimeout);
      };
    } catch (error) {
      console.error("Error setting up cache busting:", error);
    }
  }, []);

  return null; // This is a utility component with no UI
};

export default CourseSync;
