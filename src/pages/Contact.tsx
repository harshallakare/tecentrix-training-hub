import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useSettingsStore } from '@/store/settingsStore';
import { 
  MapPinIcon, 
  PhoneIcon, 
  MailIcon, 
  ClockIcon, 
  SendIcon, 
  BuildingIcon, 
  GlobeIcon, 
  InstagramIcon, 
  TwitterIcon, 
  FacebookIcon, 
  LinkedinIcon,
  UserIcon
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Contact = () => {
  const { settings } = useSettingsStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    recipientId: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (settings.inquiryRecipients.length > 0) {
      const defaultRecipient = settings.inquiryRecipients.find(r => r.isDefault) || settings.inquiryRecipients[0];
      setFormData(prev => ({ ...prev, recipientId: defaultRecipient.id }));
    }
  }, [settings.inquiryRecipients]);

  useEffect(() => {
    const revealElements = () => {
      const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .scale-reveal');
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          if (reveals[i].classList.contains('reveal')) {
            reveals[i].classList.add('reveal-visible');
          } else if (reveals[i].classList.contains('reveal-left')) {
            reveals[i].classList.add('reveal-left-visible');
          } else if (reveals[i].classList.contains('reveal-right')) {
            reveals[i].classList.add('reveal-right-visible');
          } else if (reveals[i].classList.contains('scale-reveal')) {
            reveals[i].classList.add('scale-reveal-visible');
          }
        }
      }
    };

    window.addEventListener('scroll', revealElements);
    revealElements(); // Call on load

    return () => window.removeEventListener('scroll', revealElements);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const selectedRecipient = settings.inquiryRecipients.find(r => r.id === formData.recipientId);
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Your message has been sent!', {
        description: selectedRecipient 
          ? `Your inquiry has been sent to ${selectedRecipient.name}.`
          : 'We will get back to you as soon as possible.'
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        recipientId: formData.recipientId,
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-tecentrix-gray py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center reveal">
              <Badge variant="orange" className="mb-4">CONNECT WITH US</Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-tecentrix-blue mb-6">
                Let's Start a Conversation
              </h1>
              <p className="text-lg text-tecentrix-darkgray/80">
                Whether you have questions about our programs, want to partner with us, or 
                are interested in joining our team, we're here to help.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="reveal-left">
                <Card className="border-none shadow-lg h-full">
                  <CardContent className="p-8">
                    <Badge variant="blue" className="mb-4">GET IN TOUCH</Badge>
                    <h3 className="text-2xl font-bold text-tecentrix-blue mb-6">Send Us a Message</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium text-tecentrix-darkgray">
                            Your Name*
                          </label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium text-tecentrix-darkgray">
                            Email Address*
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="john.doe@example.com"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-sm font-medium text-tecentrix-darkgray">
                            Phone Number
                          </label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="(123) 456-7890"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="recipient" className="text-sm font-medium text-tecentrix-darkgray flex items-center gap-1">
                            <UserIcon className="h-3.5 w-3.5 text-tecentrix-orange" />
                            Send To*
                          </label>
                          <Select 
                            value={formData.recipientId} 
                            onValueChange={(value) => handleSelectChange('recipientId', value)}
                            disabled={settings.inquiryRecipients.length === 0}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              {settings.inquiryRecipients.length === 0 ? (
                                <SelectItem value="none" disabled>No recipients configured</SelectItem>
                              ) : (
                                settings.inquiryRecipients.map((recipient) => (
                                  <SelectItem key={recipient.id} value={recipient.id}>
                                    {recipient.name} ({recipient.department})
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium text-tecentrix-darkgray">
                          Subject*
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          placeholder="How can we help you?"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-tecentrix-darkgray">
                          Your Message*
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          placeholder="Tell us more about your inquiry..."
                          className="min-h-32"
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="tecentrix-primary-button w-full"
                        disabled={isSubmitting || !formData.recipientId || settings.inquiryRecipients.length === 0}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <SendIcon className="mr-2 h-5 w-5" />
                            Send Message
                          </span>
                        )}
                      </Button>
                      
                      {settings.inquiryRecipients.length === 0 && (
                        <div className="text-sm text-yellow-600 bg-yellow-50 p-3 rounded-md">
                          Contact form recipients need to be configured in the admin settings.
                        </div>
                      )}
                    </form>
                  </CardContent>
                </Card>
              </div>
              
              <div className="reveal-right space-y-8">
                <div>
                  <Badge variant="blue" className="mb-4">CONTACT INFO</Badge>
                  <h3 className="text-2xl font-bold text-tecentrix-blue mb-6">How to Reach Us</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Card className="scale-reveal border-none shadow-md" style={{ animationDelay: '0.1s' }}>
                      <CardContent className="p-6">
                        <div className="flex items-start">
                          <div className="mr-4">
                            <MapPinIcon className="h-6 w-6 text-tecentrix-orange" />
                          </div>
                          <div>
                            <h4 className="font-medium text-tecentrix-blue">Location</h4>
                            <address className="not-italic text-tecentrix-darkgray/80 mt-1">
                              123 Tech Avenue<br />
                              San Francisco, CA 94105<br />
                              United States
                            </address>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="scale-reveal border-none shadow-md" style={{ animationDelay: '0.2s' }}>
                      <CardContent className="p-6">
                        <div className="flex items-start">
                          <div className="mr-4">
                            <MailIcon className="h-6 w-6 text-tecentrix-orange" />
                          </div>
                          <div>
                            <h4 className="font-medium text-tecentrix-blue">Email Us</h4>
                            <div className="text-tecentrix-darkgray/80 mt-1 space-y-1">
                              <p>info@tecentrix.com</p>
                              <p>support@tecentrix.com</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="scale-reveal border-none shadow-md" style={{ animationDelay: '0.3s' }}>
                      <CardContent className="p-6">
                        <div className="flex items-start">
                          <div className="mr-4">
                            <PhoneIcon className="h-6 w-6 text-tecentrix-orange" />
                          </div>
                          <div>
                            <h4 className="font-medium text-tecentrix-blue">Call Us</h4>
                            <div className="text-tecentrix-darkgray/80 mt-1 space-y-1">
                              <p>Main: (415) 555-1234</p>
                              <p>Support: (415) 555-5678</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="scale-reveal border-none shadow-md" style={{ animationDelay: '0.4s' }}>
                      <CardContent className="p-6">
                        <div className="flex items-start">
                          <div className="mr-4">
                            <ClockIcon className="h-6 w-6 text-tecentrix-orange" />
                          </div>
                          <div>
                            <h4 className="font-medium text-tecentrix-blue">Hours</h4>
                            <div className="text-tecentrix-darkgray/80 mt-1 space-y-1">
                              <p>Monday-Friday: 9AM-6PM</p>
                              <p>Saturday: 10AM-4PM</p>
                              <p>Sunday: Closed</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="font-semibold text-tecentrix-blue mb-4">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="p-2 bg-tecentrix-gray rounded-full hover:bg-tecentrix-orange/10 transition-colors">
                      <LinkedinIcon className="h-5 w-5 text-tecentrix-blue" />
                    </a>
                    <a href="#" className="p-2 bg-tecentrix-gray rounded-full hover:bg-tecentrix-orange/10 transition-colors">
                      <TwitterIcon className="h-5 w-5 text-tecentrix-blue" />
                    </a>
                    <a href="#" className="p-2 bg-tecentrix-gray rounded-full hover:bg-tecentrix-orange/10 transition-colors">
                      <FacebookIcon className="h-5 w-5 text-tecentrix-blue" />
                    </a>
                    <a href="#" className="p-2 bg-tecentrix-gray rounded-full hover:bg-tecentrix-orange/10 transition-colors">
                      <InstagramIcon className="h-5 w-5 text-tecentrix-blue" />
                    </a>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="font-semibold text-tecentrix-blue mb-4">Our Location</h4>
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[250px]">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50470.44097869996!2d-122.44889169235412!3d37.77492951191932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1656533278879!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Tecentrix Location"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-tecentrix-gray">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 reveal">
                <Badge variant="orange" className="mb-4">CORPORATE INQUIRIES</Badge>
                <h3 className="text-2xl font-bold text-tecentrix-blue mb-4">Enterprise Solutions</h3>
                <p className="text-tecentrix-darkgray/80">
                  Looking for large-scale training solutions or partnership opportunities? 
                  Our enterprise team is ready to create a customized plan for your organization.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="scale-reveal border-none shadow-md" style={{ animationDelay: '0.1s' }}>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <BuildingIcon className="h-10 w-10 text-tecentrix-orange mb-4" />
                    <h4 className="font-semibold text-tecentrix-blue">Corporate Training</h4>
                    <p className="text-tecentrix-darkgray/80 mt-2">
                      Custom training programs for your team's specific needs and goals.
                    </p>
                    <Button variant="outline" className="mt-4">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="scale-reveal border-none shadow-md" style={{ animationDelay: '0.2s' }}>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <GlobeIcon className="h-10 w-10 text-tecentrix-orange mb-4" />
                    <h4 className="font-semibold text-tecentrix-blue">Global Partnerships</h4>
                    <p className="text-tecentrix-darkgray/80 mt-2">
                      Collaborate with us to expand educational opportunities worldwide.
                    </p>
                    <Button variant="outline" className="mt-4">
                      Partner With Us
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="scale-reveal border-none shadow-md" style={{ animationDelay: '0.3s' }}>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <MailIcon className="h-10 w-10 text-tecentrix-orange mb-4" />
                    <h4 className="font-semibold text-tecentrix-blue">Media Inquiries</h4>
                    <p className="text-tecentrix-darkgray/80 mt-2">
                      Get in touch with our PR team for interviews, press kits, and more.
                    </p>
                    <Button variant="outline" className="mt-4">
                      Contact PR
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
