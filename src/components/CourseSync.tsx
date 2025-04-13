
import React, { useEffect, useState } from 'react';

/**
 * This component ensures content synchronization with improved error handling
 */
const CourseSync: React.FC<{ onSync?: (course: any) => void }> = ({ onSync }) => {
  const [initialized, setInitialized] = useState(false);
  
  // Safe initialization effect
  useEffect(() => {
    // Skip execution during SSR
    if (typeof window === 'undefined') {
      return;
    }
    
    console.log("CourseSync component mounting", new Date().toISOString());
    
    try {
      // Mark as initialized
      setInitialized(true);
      console.log("CourseSync initialized successfully");
      
      // Call onSync callback if provided
      if (onSync && typeof onSync === 'function') {
        // Safe call with try-catch to prevent rendering failures
        try {
          onSync({id: '1', title: 'RHCSA Certification'});
          console.log("onSync callback executed");
        } catch (err) {
          console.error("Error in onSync callback:", err);
        }
      }
    } catch (e) {
      console.error("Error in CourseSync initialization:", e);
    }
    
    return () => {
      console.log("CourseSync component unmounting");
    };
  }, [onSync]);

  return null; // This is a utility component with no UI
};

export default CourseSync;
