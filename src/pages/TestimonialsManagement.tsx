
import React, { useState } from 'react';
import { useContentStore } from '@/store/contentStore';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TestimonialForm from '@/components/admin/TestimonialForm';
import { Plus, Pencil, Trash2, MessageSquare, Star } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from 'uuid';

const TestimonialsManagement = () => {
  const { testimonialsList, addTestimonial, updateTestimonial, deleteTestimonial } = useContentStore();
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);

  const handleAddTestimonial = (testimonialData: any) => {
    addTestimonial({
      ...testimonialData,
      id: uuidv4(),
    });
    setIsAddingTestimonial(false);
    toast({
      title: "Testimonial Added",
      description: "The testimonial has been successfully added",
      variant: "default",
    });
  };

  const handleUpdateTestimonial = (testimonialData: any) => {
    updateTestimonial(testimonialData.id, testimonialData);
    setEditingTestimonial(null);
    toast({
      title: "Testimonial Updated",
      description: "The testimonial has been successfully updated",
      variant: "default",
    });
  };

  const handleDeleteTestimonial = (id: string) => {
    deleteTestimonial(id);
    toast({
      title: "Testimonial Deleted",
      description: "The testimonial has been successfully removed",
      variant: "default",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-tecentrix-blue">Testimonials Management</h2>
          <p className="text-tecentrix-darkgray mt-1">
            Manage student testimonials displayed on the website
          </p>
        </div>
        <Button onClick={() => setIsAddingTestimonial(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Testimonial
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Testimonials ({testimonialsList.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {isAddingTestimonial && (
            <Card className="mb-6 border-tecentrix-orange border">
              <CardHeader>
                <CardTitle>Add New Testimonial</CardTitle>
                <CardDescription>Fill in the details for the new testimonial</CardDescription>
              </CardHeader>
              <CardContent>
                <TestimonialForm 
                  onSubmit={handleAddTestimonial} 
                  onCancel={() => setIsAddingTestimonial(false)} 
                />
              </CardContent>
            </Card>
          )}
          
          {editingTestimonial && (
            <Card className="mb-6 border-tecentrix-blue border">
              <CardHeader>
                <CardTitle>Edit Testimonial</CardTitle>
                <CardDescription>Update the testimonial details</CardDescription>
              </CardHeader>
              <CardContent>
                <TestimonialForm 
                  initialData={editingTestimonial} 
                  onSubmit={handleUpdateTestimonial} 
                  onCancel={() => setEditingTestimonial(null)} 
                />
              </CardContent>
            </Card>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {testimonialsList.map((testimonial) => (
              <Card key={testimonial.id} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-2">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                        <AvatarFallback>{getInitials(testimonial.author)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{testimonial.author}</CardTitle>
                        <CardDescription className="text-xs">{testimonial.role}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary" className="flex items-center">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Testimonial
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <blockquote className="text-sm italic border-l-2 border-tecentrix-orange/30 pl-3 py-1">
                    "{testimonial.content.length > 150 ? `${testimonial.content.substring(0, 150)}...` : testimonial.content}"
                  </blockquote>
                  <div className="flex mt-2 text-yellow-500">
                    <Star className="h-3 w-3 fill-current" />
                    <Star className="h-3 w-3 fill-current" />
                    <Star className="h-3 w-3 fill-current" />
                    <Star className="h-3 w-3 fill-current" />
                    <Star className="h-3 w-3 fill-current" />
                  </div>
                  {testimonial.company && (
                    <p className="text-xs text-tecentrix-orange mt-2">{testimonial.company}</p>
                  )}
                </CardContent>
                <CardFooter className="pt-0 flex justify-end gap-2">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => setEditingTestimonial(testimonial)}
                  >
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-600">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this testimonial from {testimonial.author}? 
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => handleDeleteTestimonial(testimonial.id)}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TestimonialsManagement;
