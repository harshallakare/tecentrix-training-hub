
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useContentStore } from '@/store/contentStore';
import { Lock, LayoutDashboard, Navigation, BarChart, Settings as SettingsIcon, BookOpen } from 'lucide-react';
import Footer from '@/components/Footer';
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';
import NavigationManager from '@/components/admin/NavigationManager';
import CoursesManagement from '@/pages/CoursesManagement';
import Settings from '@/pages/Settings';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();
  const { content, updateHeroContent, updateCoursesContent, updateFeaturesContent, updateCTAContent } = useContentStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'tecentrix') {
      setIsAuthenticated(true);
      toast({
        title: "Logged in successfully",
        description: "Welcome to the admin dashboard"
      });
    } else {
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: "Invalid username or password"
      });
    }
  };

  const handleHeroUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const heroData = {
      title: formData.get('heroTitle') as string,
      subtitle: formData.get('heroSubtitle') as string,
      ctaText: formData.get('heroCTA') as string,
    };
    
    updateHeroContent(heroData);
    toast({
      title: "Hero section updated",
      description: "Changes have been saved successfully"
    });
  };

  const handleCoursesUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const coursesData = {
      title: formData.get('coursesTitle') as string,
      subtitle: formData.get('coursesSubtitle') as string,
    };
    
    updateCoursesContent(coursesData);
    toast({
      title: "Courses section updated",
      description: "Changes have been saved successfully"
    });
  };

  const handleFeaturesUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const featuresData = {
      title: formData.get('featuresTitle') as string,
      subtitle: formData.get('featuresSubtitle') as string,
    };
    
    updateFeaturesContent(featuresData);
    toast({
      title: "Features section updated",
      description: "Changes have been saved successfully"
    });
  };

  const handleCTAUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const ctaData = {
      title: formData.get('ctaTitle') as string,
      specialOffer: formData.get('ctaSpecialOffer') as string,
    };
    
    updateCTAContent(ctaData);
    toast({
      title: "CTA section updated",
      description: "Changes have been saved successfully"
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-tecentrix-gray flex flex-col">
        <div className="container mx-auto px-4 py-20 flex-grow flex items-center justify-center">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="space-y-1">
              <div className="flex justify-center mb-4">
                <img 
                  src="/lovable-uploads/4c595448-842f-4b0f-85ed-498a0f4c4a4c.png" 
                  alt="Tecentrix Icon" 
                  className="h-16 w-16"
                />
              </div>
              <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access the admin dashboard
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input 
                    id="username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Enter your username" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Enter your password" 
                    required 
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" type="submit">
                  <Lock className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

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
            <Button variant="ghost" onClick={() => setIsAuthenticated(false)}>Logout</Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 flex-grow">
        <h1 className="text-3xl font-bold text-tecentrix-blue mb-8">Admin Dashboard</h1>
        
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="content">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Content
            </TabsTrigger>
            <TabsTrigger value="courses">
              <BookOpen className="h-4 w-4 mr-2" />
              Courses
            </TabsTrigger>
            <TabsTrigger value="settings">
              <SettingsIcon className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="navigation">
              <Navigation className="h-4 w-4 mr-2" />
              Navigation
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="content">
            <Tabs defaultValue="hero" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="hero">Hero Section</TabsTrigger>
                <TabsTrigger value="courses">Courses Section</TabsTrigger>
                <TabsTrigger value="features">Features Section</TabsTrigger>
                <TabsTrigger value="cta">CTA Section</TabsTrigger>
              </TabsList>
              
              <TabsContent value="hero">
                <Card>
                  <CardHeader>
                    <CardTitle>Edit Hero Section</CardTitle>
                    <CardDescription>
                      Update the title, subtitle and call-to-action text
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleHeroUpdate}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="heroTitle">Title</Label>
                        <Textarea 
                          id="heroTitle" 
                          name="heroTitle" 
                          defaultValue={content.hero.title}
                          placeholder="Enter the hero title" 
                          className="min-h-20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="heroSubtitle">Subtitle</Label>
                        <Textarea 
                          id="heroSubtitle" 
                          name="heroSubtitle" 
                          defaultValue={content.hero.subtitle}
                          placeholder="Enter the hero subtitle" 
                          className="min-h-20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="heroCTA">CTA Button Text</Label>
                        <Input 
                          id="heroCTA" 
                          name="heroCTA" 
                          defaultValue={content.hero.ctaText}
                          placeholder="Enter the call-to-action text" 
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit">Save Changes</Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
              
              <TabsContent value="courses">
                <Card>
                  <CardHeader>
                    <CardTitle>Edit Courses Section</CardTitle>
                    <CardDescription>
                      Update the title and subtitle for the courses section
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleCoursesUpdate}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="coursesTitle">Title</Label>
                        <Input 
                          id="coursesTitle" 
                          name="coursesTitle" 
                          defaultValue={content.courses.title}
                          placeholder="Enter the courses section title" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="coursesSubtitle">Subtitle</Label>
                        <Textarea 
                          id="coursesSubtitle" 
                          name="coursesSubtitle" 
                          defaultValue={content.courses.subtitle}
                          placeholder="Enter the courses section subtitle" 
                          className="min-h-20"
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit">Save Changes</Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
              
              <TabsContent value="features">
                <Card>
                  <CardHeader>
                    <CardTitle>Edit Features Section</CardTitle>
                    <CardDescription>
                      Update the title and subtitle for the features section
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleFeaturesUpdate}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="featuresTitle">Title</Label>
                        <Input 
                          id="featuresTitle" 
                          name="featuresTitle" 
                          defaultValue={content.features.title}
                          placeholder="Enter the features section title" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="featuresSubtitle">Subtitle</Label>
                        <Textarea 
                          id="featuresSubtitle" 
                          name="featuresSubtitle" 
                          defaultValue={content.features.subtitle}
                          placeholder="Enter the features section subtitle" 
                          className="min-h-20"
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit">Save Changes</Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
              
              <TabsContent value="cta">
                <Card>
                  <CardHeader>
                    <CardTitle>Edit CTA Section</CardTitle>
                    <CardDescription>
                      Update the title and special offer text for the Call-to-Action section
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleCTAUpdate}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="ctaTitle">Title</Label>
                        <Textarea 
                          id="ctaTitle" 
                          name="ctaTitle" 
                          defaultValue={content.cta.title}
                          placeholder="Enter the CTA section title" 
                          className="min-h-20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ctaSpecialOffer">Special Offer Text</Label>
                        <Input 
                          id="ctaSpecialOffer" 
                          name="ctaSpecialOffer" 
                          defaultValue={content.cta.specialOffer}
                          placeholder="Enter the special offer text" 
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit">Save Changes</Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>
          
          <TabsContent value="courses">
            <CoursesManagement />
          </TabsContent>
          
          <TabsContent value="settings">
            <Settings />
          </TabsContent>
          
          <TabsContent value="navigation">
            <NavigationManager />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Admin;
