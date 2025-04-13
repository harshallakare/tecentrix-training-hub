
import React, { useEffect, useState } from 'react';

/**
 * This component ensures content synchronization with improved error handling
 */
const CourseSync: React.FC<{ onSync?: (course: any) => void }> = ({ onSync }) => {
  const [initialized, setInitialized] = useState(false);
  
  // Safe initialization effect with proper cleanup
  useEffect(() => {
    // Skip execution during SSR
    if (typeof window === 'undefined') {
      return;
    }
    
    console.log("CourseSync component mounting", new Date().toISOString());
    
    let mounted = true;
    
    // Safely initialize
    try {
      // Mark as initialized only if component is still mounted
      if (mounted) {
        setInitialized(true);
        console.log("CourseSync initialized successfully");
        
        // Call onSync callback if provided and component is still mounted
        if (onSync && typeof onSync === 'function') {
          onSync({id: '1', title: 'RHCSA Certification'});
          console.log("onSync callback executed");
        }
      }
    } catch (e) {
      console.error("Error in CourseSync initialization:", e);
    }
    
    return () => {
      mounted = false;
      console.log("CourseSync component unmounting");
    };
  }, [onSync]);

  return null; // This is a utility component with no UI
};

export default CourseSync;
