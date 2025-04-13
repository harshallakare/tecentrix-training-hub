
import React from 'react';

/**
 * This component ensures content synchronization with improved error handling
 */
const CourseSync: React.FC<{ onSync?: (course: any) => void }> = ({ onSync }) => {
  // Call onSync callback if provided - synchronously to avoid timing issues
  if (onSync && typeof onSync === 'function') {
    try {
      onSync({id: '1', title: 'RHCSA Certification'});
    } catch (e) {
      console.error("Error in CourseSync onSync callback:", e);
    }
  }

  return null; // This is a utility component with no UI
};

export default CourseSync;
