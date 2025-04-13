
import React, { useEffect, useState } from 'react';
import { useContentSync } from '@/hooks/use-content-sync';
import { toast } from 'sonner';

/**
 * This component ensures content synchronization with improved error handling
 */
const CourseSync: React.FC<{ onSync?: (course: any) => void }> = ({ onSync }) => {
  const [initialized, setInitialized] = useState(false);
  const { coursesList, refreshContent } = useContentSync(false);
  
  // Safe initialization effect
  useEffect(() => {
    // Skip execution during SSR
    if (typeof window === 'undefined') {
      return;
    }
    
    console.log("CourseSync component mounting");
    
    // Perform initial refresh without aggressive cache clearing
    const safeRefresh = () => {
      refreshContent();
      console.log("Content refreshed successfully");
      setInitialized(true);
    };
    
    // Initial refresh with a small delay to ensure other components are ready
    const initialRefresh = setTimeout(safeRefresh, 100);
    
    // Call onSync callback if provided and courses are available
    if (onSync && coursesList.length > 0 && !initialized) {
      try {
        onSync(coursesList[0]);
        console.log("onSync callback executed");
      } catch (e) {
        console.error("Error in onSync callback:", e);
      }
    }
    
    return () => {
      clearTimeout(initialRefresh);
    };
  }, [coursesList, onSync, refreshContent, initialized]);

  return null; // This is a utility component with no UI
};

export default CourseSync;
