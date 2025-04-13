
import React, { useEffect } from 'react';
import { useContentSync } from '@/hooks/use-content-sync';

/**
 * This component is now deprecated and just preserved for backward compatibility
 * All syncing is now handled by the useContentSync hook directly
 */
const CourseSync: React.FC<{ onSync?: (course: any) => void }> = ({ onSync }) => {
  const { coursesList, refreshContent } = useContentSync(true);
  
  useEffect(() => {
    // Force a content refresh
    refreshContent();
    
    // If there's an onSync callback, call it with the first course (backward compatibility)
    if (onSync && coursesList.length > 0) {
      onSync(coursesList[0]);
    }
  }, [coursesList, onSync, refreshContent]);

  return null; // This is a utility component with no UI
};

export default CourseSync;
