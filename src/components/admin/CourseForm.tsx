import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Trash, Plus, Terminal, Server, Shield, Network, Cloud, Database, Calendar, Languages } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/use-toast';

interface CourseFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const iconOptions = [
  { value: 'Terminal', label: 'Terminal', icon: <Terminal className="h-4 w-4" /> },
  { value: 'Server', label: 'Server', icon: <Server className="h-4 w-4" /> },
  { value: 'Shield', label: 'Shield', icon: <Shield className="h-4 w-4" /> },
  { value: 'Network', label: 'Network', icon: <Network className="h-4 w-4" /> },
  { value: 'Cloud', label: 'Cloud', icon: <Cloud className="h-4 w-4" /> },
  { value: 'Database', label: 'Database', icon: <Database className="h-4 w-4" /> },
];

const languageOptions = [
  { value: 'English', label: 'English' },
  { value: 'Hindi', label: 'Hindi' },
  { value: 'English/Hindi', label: 'English/Hindi' },
];

const colorOptions = [
  { value: 'bg-blue-50', label: 'Blue', color: 'bg-blue-50' },
  { value: 'bg-orange-50', label: 'Orange', color: 'bg-orange-50' },
  { value: 'bg-green-50', label: 'Green', color: 'bg-green-50' },
  { value: 'bg-purple-50', label: 'Purple', color: 'bg-purple-50' },
  { value: 'bg-red-50', label: 'Red', color: 'bg-red-50' },
  { value: 'bg-yellow-50', label: 'Yellow', color: 'bg-yellow-50' },
];

const iconBgOptions = [
  { value: 'bg-blue-100', label: 'Blue', color: 'bg-blue-100' },
  { value: 'bg-orange-100', label: 'Orange', color: 'bg-orange-100' },
  { value: 'bg-green-100', label: 'Green', color: 'bg-green-100' },
  { value: 'bg-purple-100', label: 'Purple', color: 'bg-purple-100' },
  { value: 'bg-red-100', label: 'Red', color: 'bg-red-100' },
  { value: 'bg-yellow-100', label: 'Yellow', color: 'bg-yellow-100' },
];

const iconColorOptions = [
  { value: 'text-tecentrix-blue', label: 'Blue', color: 'text-tecentrix-blue' },
  { value: 'text-tecentrix-orange', label: 'Orange', color: 'text-tecentrix-orange' },
  { value: 'text-green-600', label: 'Green', color: 'text-green-600' },
  { value: 'text-purple-600', label: 'Purple', color: 'text-purple-600' },
  { value: 'text-red-600', label: 'Red', color: 'text-red-600' },
  { value: 'text-yellow-600', label: 'Yellow', color: 'text-yellow-600' },
];

const CourseForm: React.FC<CourseFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    level: 'Foundation',
    duration: '',
    description: '',
    price: '',
    icon: 'Terminal',
    color: 'bg-blue-50',
    iconBg: 'bg-blue-100',
    iconColor: 'text-tecentrix-blue',
    highlighted: false,
    modules: [''],
    upcomingBatch: '',
    language: 'English',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        ...formData,
        id: uuidv4(),
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleHighlightedChange = (checked: boolean) => {
    setFormData({ ...formData, highlighted: checked });
  };

  const handleModuleChange = (index: number, value: string) => {
    const updatedModules = [...formData.modules];
    updatedModules[index] = value;
    setFormData({ ...formData, modules: updatedModules });
  };

  const handleAddModule = () => {
    setFormData({ ...formData, modules: [...formData.modules, ''] });
  };

  const handleRemoveModule = (index: number) => {
    const updatedModules = [...formData.modules];
    updatedModules.splice(index, 1);
    setFormData({ ...formData, modules: updatedModules });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.duration || !formData.description || !formData.price) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Filter out empty modules
    const filteredModules = formData.modules.filter(module => module.trim() !== '');
    if (filteredModules.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please add at least one module",
        variant: "destructive"
      });
      return;
    }
    
    // Submit form with cleaned data
    onSubmit({
      ...formData,
      modules: filteredModules,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Course Title*</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. RHCSA Certification"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="level">Level</Label>
              <Select 
                value={formData.level} 
                onValueChange={(value) => handleSelectChange('level', value)}
              >
                <SelectTrigger id="level">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Foundation">Foundation</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="duration">Duration*</Label>
              <Input
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g. 6 Weeks"
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="price">Price*</Label>
            <Input
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g. ₹35,000"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="upcomingBatch">Upcoming Batch</Label>
              <div className="relative">
                <Input
                  id="upcomingBatch"
                  name="upcomingBatch"
                  value={formData.upcomingBatch}
                  onChange={handleChange}
                  placeholder="e.g. June 15, 2025"
                />
                <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div>
              <Label htmlFor="language">Language</Label>
              <Select 
                value={formData.language} 
                onValueChange={(value) => handleSelectChange('language', value)}
              >
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languageOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Description*</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter course description"
              className="min-h-20"
              required
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="highlighted" 
              checked={formData.highlighted}
              onCheckedChange={handleHighlightedChange}
            />
            <Label htmlFor="highlighted">Mark as Featured Course</Label>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label>Course Appearance</Label>
            <Card className="mt-2">
              <CardContent className="pt-6 grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="icon" className="text-xs">Icon</Label>
                  <Select 
                    value={formData.icon} 
                    onValueChange={(value) => handleSelectChange('icon', value)}
                  >
                    <SelectTrigger id="icon" className="mt-1">
                      <SelectValue placeholder="Select icon" />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center">
                            {option.icon}
                            <span className="ml-2">{option.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="color" className="text-xs">Background Color</Label>
                  <Select 
                    value={formData.color} 
                    onValueChange={(value) => handleSelectChange('color', value)}
                  >
                    <SelectTrigger id="color" className="mt-1">
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {colorOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center">
                            <div className={`w-4 h-4 rounded ${option.color} border border-gray-200`}></div>
                            <span className="ml-2">{option.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="iconBg" className="text-xs">Icon Background</Label>
                  <Select 
                    value={formData.iconBg} 
                    onValueChange={(value) => handleSelectChange('iconBg', value)}
                  >
                    <SelectTrigger id="iconBg" className="mt-1">
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {iconBgOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center">
                            <div className={`w-4 h-4 rounded ${option.color} border border-gray-200`}></div>
                            <span className="ml-2">{option.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="iconColor" className="text-xs">Icon Color</Label>
                  <Select 
                    value={formData.iconColor} 
                    onValueChange={(value) => handleSelectChange('iconColor', value)}
                  >
                    <SelectTrigger id="iconColor" className="mt-1">
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {iconColorOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center">
                            <div className={`w-4 h-4 rounded bg-white border border-gray-200 flex items-center justify-center`}>
                              <div className={`w-2 h-2 rounded-full ${option.color.replace('text', 'bg')}`}></div>
                            </div>
                            <span className="ml-2">{option.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label>Course Modules*</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={handleAddModule}
                className="h-8"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Module
              </Button>
            </div>
            <div className="space-y-2">
              {formData.modules.map((module, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={module}
                    onChange={(e) => handleModuleChange(index, e.target.value)}
                    placeholder={`Module ${index + 1}`}
                  />
                  {formData.modules.length > 1 && (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleRemoveModule(index)}
                      className="h-10 w-10 shrink-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">{initialData ? 'Update Course' : 'Create Course'}</Button>
      </div>
    </form>
  );
};

export default CourseForm;
