
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useContentStore } from '@/store/contentStore';
import CourseForm from '@/components/admin/CourseForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash, Plus, Terminal, Server, Shield, Network, Cloud, Database } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import Footer from '@/components/Footer';

// Icon mapping for displaying the correct icon for each course
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
  const { toast } = useToast();

  // Get the icon component based on icon name
  const getIconComponent = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap] || <Terminal className="h-6 w-6" />;
  };

  // Handle opening the form for adding a new course
  const handleAddCourse = () => {
    setCurrentCourse(null);
    setIsEditing(false);
    setIsFormOpen(true);
  };

  // Handle opening the form for editing an existing course
  const handleEditCourse = (course: any) => {
    setCurrentCourse(course);
    setIsEditing(true);
    setIsFormOpen(true);
  };

  // Handle opening the delete confirmation dialog
  const handleDeleteClick = (course: any) => {
    setCurrentCourse(course);
    setIsDeleteDialogOpen(true);
  };

  // Handle confirming deletion of a course
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

  // Handle form submission for both add and edit operations
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

  return (
    <div className="min-h-screen bg-tecentrix-gray flex flex-col">
      <div className="bg-white/90 backdrop-blur-md shadow-md text-tecentrix-darkgray py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/4c595448-842f-4b0f-85ed-498a0f4c4a4c.png" 
              alt="Tecentrix Icon" 
              className="h-8 w-8"
            />
            <img 
              src="/lovable-uploads/ecf53e64-9a0d-42a7-9f33-45ff3799daef.png" 
              alt="Tecentrix Text" 
              className="h-6"
            />
            <span className="ml-2 text-sm font-medium bg-tecentrix-blue text-white px-2 py-1 rounded-md">Admin</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => window.location.href = '/admin'}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 flex-grow">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-tecentrix-blue">Course Management</h1>
          <Button onClick={handleAddCourse}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Course
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {coursesList.map((course) => (
            <Card key={course.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className={`${course.color} p-6`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className={`${course.iconBg} p-3 rounded-lg ${course.iconColor}`}>
                        {getIconComponent(course.icon)}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-semibold text-tecentrix-blue">{course.title}</h3>
                        <div className="flex space-x-3 mt-1">
                          <span className="text-sm text-tecentrix-darkgray/70">{course.level}</span>
                          <span className="text-sm text-tecentrix-darkgray/70">•</span>
                          <span className="text-sm text-tecentrix-darkgray/70">{course.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
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
                  
                  <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-tecentrix-blue">{course.price}</span>
                      {course.highlighted && (
                        <span className="ml-3 bg-tecentrix-orange text-white text-xs font-semibold px-3 py-1 rounded-full">
                          Featured Course
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Form Dialog */}
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

      {/* Delete Confirmation Dialog */}
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
      
      <Footer />
    </div>
  );
};

export default CoursesManagement;
