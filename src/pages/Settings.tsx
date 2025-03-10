
import React from 'react';
import { useSettingsStore } from '@/store/settingsStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Facebook, Twitter, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import Footer from '@/components/Footer';

const Settings = () => {
  const { settings, updateSettings, updateContactInfo, updateSocialLinks } = useSettingsStore();
  const { toast } = useToast();

  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    updateSettings({
      companyName: formData.get('companyName') as string,
      footerText: formData.get('footerText') as string,
      enableBlog: (formData.get('enableBlog') === 'on'),
      showTestimonials: (formData.get('showTestimonials') === 'on'),
    });

    toast({
      title: "Settings updated",
      description: "General settings have been saved successfully"
    });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    updateContactInfo({
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      address: formData.get('address') as string,
    });

    toast({
      title: "Contact information updated",
      description: "Contact details have been saved successfully"
    });
  };

  const handleSocialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    updateSocialLinks({
      facebook: formData.get('facebook') as string,
      twitter: formData.get('twitter') as string,
      linkedin: formData.get('linkedin') as string,
      youtube: formData.get('youtube') as string,
    });

    toast({
      title: "Social links updated",
      description: "Social media links have been saved successfully"
    });
  };

  return (
    <div className="min-h-screen bg-tecentrix-gray flex flex-col">
      <div className="container mx-auto px-4 py-10 flex-grow">
        <h1 className="text-3xl font-bold text-tecentrix-blue mb-8">Site Settings</h1>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Update your site's basic information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleGeneralSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    defaultValue={settings.companyName}
                    placeholder="Enter company name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="footerText">Footer Text</Label>
                  <Input
                    id="footerText"
                    name="footerText"
                    defaultValue={settings.footerText}
                    placeholder="Enter footer text"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="enableBlog"
                    name="enableBlog"
                    defaultChecked={settings.enableBlog}
                  />
                  <Label htmlFor="enableBlog">Enable Blog</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="showTestimonials"
                    name="showTestimonials"
                    defaultChecked={settings.showTestimonials}
                  />
                  <Label htmlFor="showTestimonials">Show Testimonials</Label>
                </div>
                <Button type="submit">Save General Settings</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Update your contact details</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" /> Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={settings.contactInfo.email}
                    placeholder="Enter contact email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" /> Phone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    defaultValue={settings.contactInfo.phone}
                    placeholder="Enter contact phone"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> Address
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    defaultValue={settings.contactInfo.address}
                    placeholder="Enter business address"
                  />
                </div>
                <Button type="submit">Save Contact Information</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
              <CardDescription>Connect your social media accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSocialSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="facebook" className="flex items-center gap-2">
                    <Facebook className="h-4 w-4" /> Facebook
                  </Label>
                  <Input
                    id="facebook"
                    name="facebook"
                    defaultValue={settings.socialLinks.facebook}
                    placeholder="Enter Facebook URL"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter" className="flex items-center gap-2">
                    <Twitter className="h-4 w-4" /> Twitter
                  </Label>
                  <Input
                    id="twitter"
                    name="twitter"
                    defaultValue={settings.socialLinks.twitter}
                    placeholder="Enter Twitter URL"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </Label>
                  <Input
                    id="linkedin"
                    name="linkedin"
                    defaultValue={settings.socialLinks.linkedin}
                    placeholder="Enter LinkedIn URL"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="youtube" className="flex items-center gap-2">
                    <Youtube className="h-4 w-4" /> YouTube
                  </Label>
                  <Input
                    id="youtube"
                    name="youtube"
                    defaultValue={settings.socialLinks.youtube}
                    placeholder="Enter YouTube URL"
                  />
                </div>
                <Button type="submit">Save Social Links</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;
