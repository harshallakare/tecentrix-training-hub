
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useContentStore } from '@/store/contentStore';
import CourseForm from '@/components/admin/CourseForm';
import { Card, CardContent } from '@/components/ui/card';
import { Edit, Trash, Plus, Terminal, Server, Shield, Network, Cloud, Database, Calendar, Languages, Power, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import { Switch } from '@/components/ui/switch';
import ReactMarkdown from 'react-markdown';

const iconMap = {
  'Terminal': <Terminal className="h-6 w-6" />,
  'Server': <Server className="h-6 w-6" />,
  'Shield': <Shield className="h-6 w-6" />,
  'Network': <Network className="h-6 w-6" />,
  'Cloud': <Cloud className="h-6 w-6" />,
  'Database': <Database className="h-6 w-6" />,
};

const CoursesManagement = () => {
  const { coursesList, addCourse, updateCourse, deleteCourse } = useContentStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);
  const { toast } = useToast();

  const getIconComponent = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap] || <Terminal className="h-6 w-6" />;
  };

  const handleAddCourse = () => {
    setCurrentCourse(null);
    setIsEditing(false);
    setIsFormOpen(true);
  };

  const handleEditCourse = (course: any) => {
    setCurrentCourse(course);
    setIsEditing(true);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (course: any) => {
    setCurrentCourse(course);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (currentCourse) {
      deleteCourse(currentCourse.id);
      toast({
        title: "Course deleted",
        description: `'${currentCourse.title}' has been removed successfully.`
      });
      setIsDeleteDialogOpen(false);
      setCurrentCourse(null);
    }
  };

  const handleFormSubmit = (courseData: any) => {
    if (isEditing) {
      updateCourse(courseData.id, courseData);
      toast({
        title: "Course updated",
        description: `'${courseData.title}' has been updated successfully.`
      });
    } else {
      addCourse(courseData);
      toast({
        title: "Course added",
        description: `'${courseData.title}' has been added successfully.`
      });
    }
    setIsFormOpen(false);
  };

  const handleToggleEnabled = (course: any) => {
    const updatedCourse = { ...course, enabled: !course.enabled };
    updateCourse(course.id, updatedCourse);
    
    toast({
      title: updatedCourse.enabled ? "Course enabled" : "Course disabled",
      description: `'${course.title}' is now ${updatedCourse.enabled ? 'visible' : 'hidden'} on the website.`
    });
  };

  const toggleCurriculumExpand = (courseId: string) => {
    setExpandedCourseId(expandedCourseId === courseId ? null : courseId);
  };

  // Helper function to display batch dates
  const renderBatchDates = (course) => {
    // Handle backwards compatibility with old data format
    const batches = course.upcomingBatches || (course.upcomingBatch ? [course.upcomingBatch] : []);
    
    if (batches.length === 0) return null;
    
    if (batches.length === 1) {
      return (
        <div className="flex items-center text-sm text-tecentrix-darkgray/80">
          <Calendar className="h-4 w-4 mr-1.5 text-tecentrix-blue" />
          <span>Next Batch: {batches[0]}</span>
        </div>
      );
    }
    
    return (
      <div className="flex flex-col space-y-1">
        <div className="flex items-center text-sm text-tecentrix-darkgray/80">
          <Calendar className="h-4 w-4 mr-1.5 text-tecentrix-blue" />
          <span>Upcoming Batches:</span>
        </div>
        <ul className="pl-6 text-sm text-tecentrix-darkgray/80 space-y-0.5">
          {batches.map((batch, index) => (
            <li key={index} className="list-disc">{batch}</li>
          ))}
        </ul>
      </div>
    );
  };

  // Helper function to render curriculum content
  const renderCurriculum = (course) => {
    if (!course.curriculum || course.curriculum.length === 0) {
      return (
        <div className="text-sm text-tecentrix-darkgray/80 italic">
          No curriculum content added yet.
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {course.curriculum.map((section, index) => (
          <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
            <h4 className="font-medium text-tecentrix-blue mb-2">{section.title || `Section ${index + 1}`}</h4>
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown>
                {section.description || 'No description provided.'}
              </ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-tecentrix-blue">Course Management</h2>
        <Button onClick={handleAddCourse}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Course
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {coursesList.map((course) => (
          <Card key={course.id} className={`overflow-hidden ${!course.enabled ? 'opacity-75' : ''}`}>
            <CardContent className="p-0">
              <div className={`${course.color} p-6`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className={`${course.iconBg} p-3 rounded-lg ${course.iconColor}`}>
                      {getIconComponent(course.icon)}
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <h3 className="text-xl font-semibold text-tecentrix-blue">{course.title}</h3>
                        {!course.enabled && (
                          <span className="ml-2 bg-gray-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                            Hidden
                          </span>
                        )}
                      </div>
                      <div className="flex space-x-3 mt-1">
                        <span className="text-sm text-tecentrix-darkgray/70">{course.level}</span>
                        <span className="text-sm text-tecentrix-darkgray/70">•</span>
                        <span className="text-sm text-tecentrix-darkgray/70">{course.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="flex items-center mr-2">
                      <Switch 
                        checked={course.enabled !== false}
                        onCheckedChange={() => handleToggleEnabled(course)}
                        className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-300"
                      />
                      <span className="ml-2 text-sm text-tecentrix-darkgray/70">
                        {course.enabled !== false ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleEditCourse(course)}
                      className="h-8 w-8 text-tecentrix-blue hover:text-tecentrix-blue/80 hover:bg-gray-100"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDeleteClick(course)}
                      className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <p className="mt-4 text-tecentrix-darkgray/80">
                  {course.description}
                </p>
                
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-tecentrix-blue mb-2">Course Modules:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {course.modules.map((module: string, i: number) => (
                      <li key={i} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-tecentrix-darkgray/80">{module}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {course.curriculum && course.curriculum.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Button 
                      variant="ghost" 
                      className="flex w-full justify-between items-center p-0 h-auto"
                      onClick={() => toggleCurriculumExpand(course.id)}
                    >
                      <div className="flex items-center text-tecentrix-blue">
                        <FileText className="h-4 w-4 mr-2" />
                        <span className="font-semibold">Curriculum</span>
                        <span className="ml-2 text-xs text-gray-500">
                          ({course.curriculum.length} {course.curriculum.length === 1 ? 'section' : 'sections'})
                        </span>
                      </div>
                      {expandedCourseId === course.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                    
                    {expandedCourseId === course.id && (
                      <div className="mt-4 p-4 bg-white rounded-md border border-gray-100">
                        {renderCurriculum(course)}
                      </div>
                    )}
                  </div>
                )}
                
                <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap justify-between items-center gap-2">
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-tecentrix-blue">{course.price}</span>
                    {course.highlighted && (
                      <span className="ml-3 bg-tecentrix-orange text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Featured Course
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 w-full md:w-auto">
                    {renderBatchDates(course)}
                    {course.language && (
                      <div className="flex items-center text-sm text-tecentrix-darkgray/80">
                        <Languages className="h-4 w-4 mr-1.5 text-tecentrix-blue" />
                        <span>Language: {course.language}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Course' : 'Add New Course'}</DialogTitle>
            <DialogDescription>
              {isEditing 
                ? 'Update the course information below.' 
                : 'Fill in the details to add a new course to your catalog.'}
            </DialogDescription>
          </DialogHeader>
          <CourseForm
            initialData={currentCourse}
            onSubmit={handleFormSubmit}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the course "{currentCourse?.title}". 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CoursesManagement;
