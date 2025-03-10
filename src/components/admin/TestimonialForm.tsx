
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TestimonialFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const TestimonialForm: React.FC<TestimonialFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    id: '',
    content: '',
    author: '',
    role: '',
    company: '',
    avatar: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        ...formData,
        id: uuidv4(),
        avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 70)}.jpg`,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.content || !formData.author || !formData.role) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }
    
    onSubmit(formData);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const randomizeAvatar = () => {
    setFormData({
      ...formData,
      avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 70)}.jpg?v=${Date.now()}`,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="content">Testimonial Content*</Label>
            <Textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="What did they say about your course?"
              className="min-h-[150px]"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="author">Name*</Label>
            <Input
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="e.g. John Smith"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="role">Role/Position*</Label>
            <Input
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="e.g. Senior Linux Administrator at TechSolutions"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. TechSolutions"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label>Avatar Preview</Label>
            <Card className="mt-2">
              <CardContent className="flex flex-col items-center justify-center py-6">
                <div className="mb-4">
                  <Avatar className="h-24 w-24 border-2 border-gray-200">
                    <AvatarImage src={formData.avatar} alt={formData.author || "Testimonial author"} />
                    <AvatarFallback>{formData.author ? getInitials(formData.author) : "..."}</AvatarFallback>
                  </Avatar>
                </div>
                
                <div className="space-y-4 w-full">
                  <div>
                    <Label htmlFor="avatar">Avatar URL</Label>
                    <Input
                      id="avatar"
                      name="avatar"
                      value={formData.avatar}
                      onChange={handleChange}
                      placeholder="URL to profile image"
                    />
                  </div>
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={randomizeAvatar}
                    className="w-full"
                  >
                    Generate Random Avatar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-medium text-sm mb-2">Preview</h4>
            <div className="p-4 bg-white rounded-md border border-gray-200">
              <blockquote className="text-sm italic text-gray-700">
                "{formData.content || "Testimonial content will appear here"}"
              </blockquote>
              <div className="mt-2 flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={formData.avatar} alt={formData.author || "Testimonial author"} />
                  <AvatarFallback>{formData.author ? getInitials(formData.author) : "..."}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-semibold">{formData.author || "Author name"}</div>
                  <div className="text-xs text-gray-500">{formData.role || "Role/Position"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">{initialData ? 'Update Testimonial' : 'Create Testimonial'}</Button>
      </div>
    </form>
  );
};

export default TestimonialForm;
