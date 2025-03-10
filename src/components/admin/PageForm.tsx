
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/use-toast';
import MarkdownEditor from '../MarkdownEditor';

interface PageFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const PageForm: React.FC<PageFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    slug: '',
    content: '',
    isPublished: true,
    createdAt: '',
    updatedAt: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      const now = new Date().toISOString();
      setFormData({
        ...formData,
        id: uuidv4(),
        createdAt: now,
        updatedAt: now,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContentChange = (content: string) => {
    setFormData({ ...formData, content });
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let slug = e.target.value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    setFormData({ ...formData, slug });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData({ ...formData, title });
    
    // Auto-generate slug from title if slug is empty
    if (!formData.slug) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handlePublishedChange = (checked: boolean) => {
    setFormData({ ...formData, isPublished: checked });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.slug || !formData.content) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const now = new Date().toISOString();
    onSubmit({
      ...formData,
      updatedAt: now,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4 md:col-span-2">
          <div>
            <Label htmlFor="title">Page Title*</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="e.g. About Us"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="slug">URL Slug*</Label>
            <div className="flex items-center">
              <span className="text-gray-500 mr-1 text-sm">/</span>
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleSlugChange}
                placeholder="e.g. about-us"
                required
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              This will be used for the page URL: yourdomain.com/{formData.slug || 'page-slug'}
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-medium text-sm mb-4">Page Settings</h4>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="isPublished" className="cursor-pointer">Published</Label>
                <Switch 
                  id="isPublished" 
                  checked={formData.isPublished}
                  onCheckedChange={handlePublishedChange}
                />
              </div>
              
              {initialData && (
                <>
                  <div>
                    <span className="text-xs text-gray-500 block">Created</span>
                    <span className="text-sm">
                      {new Date(formData.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'short', day: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-xs text-gray-500 block">Last Updated</span>
                    <span className="text-sm">
                      {new Date(formData.updatedAt).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'short', day: 'numeric'
                      })}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <Label htmlFor="content" className="mb-2 block">Page Content*</Label>
        <MarkdownEditor 
          value={formData.content}
          onChange={handleContentChange}
          height="min-h-[500px]"
        />
      </div>
      
      <div className="flex justify-end space-x-2 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">{initialData ? 'Update Page' : 'Create Page'}</Button>
      </div>
    </form>
  );
};

export default PageForm;
