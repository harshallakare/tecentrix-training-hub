
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContentStore } from '@/store/contentStore';
import { toast } from 'sonner';
import { syncContentData } from '@/utils/dataSync';

/**
 * Component to ensure course data is properly synced
 * This helps address inconsistencies between mobile and desktop views
 */
const CourseSync: React.FC<{ onSync?: (course: any) => void }> = ({ onSync }) => {
  const { courseId } = useParams<{ courseId?: string }>();
  const navigate = useNavigate();
  const { coursesList, refreshContent } = useContentStore();
  
  useEffect(() => {
    // First, try to force a content refresh
    if (refreshContent) {
      refreshContent();
    }
    
    // Next, check if we have the course in our list
    const course = coursesList.find(c => c.id === courseId);
    
    // If course is not found after refresh and we have courses loaded
    if (!course && coursesList.length > 0) {
      console.error(`Course ${courseId} not found in list of ${coursesList.length} courses`);
      toast.error("Course not found", {
        description: "The course you're looking for doesn't exist or has been removed."
      });
      navigate('/courses');
      return;
    }
    
    // If we found the course, call the onSync callback
    if (course && onSync) {
      onSync(course);
    }
    
    // Force a full data sync on course page load
    syncContentData(true);
    
  }, [courseId, coursesList, refreshContent, navigate, onSync]);

  return null; // This is a utility component with no UI
};

export default CourseSync;
