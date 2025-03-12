
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon, SendIcon } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Your message has been sent!', {
        description: 'We will get back to you as soon as possible.'
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-tecentrix-gray py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center reveal">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-tecentrix-blue mb-6">
                Get in Touch
              </h1>
              <p className="text-lg text-tecentrix-darkgray/80">
                Have questions about our courses or services? Looking to partner with us?
                We'd love to hear from you!
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <MapPinIcon className="h-10 w-10 text-tecentrix-orange" />,
                  title: "Our Location",
                  details: ["123 Tech Avenue", "San Francisco, CA 94105", "United States"]
                },
                {
                  icon: <PhoneIcon className="h-10 w-10 text-tecentrix-orange" />,
                  title: "Phone Numbers",
                  details: ["Main: (415) 555-1234", "Support: (415) 555-5678", "Toll-free: 1-800-TECH-EDU"]
                },
                {
                  icon: <MailIcon className="h-10 w-10 text-tecentrix-orange" />,
                  title: "Email Us",
                  details: ["General: info@tecentrix.com", "Support: help@tecentrix.com", "Careers: jobs@tecentrix.com"]
                },
                {
                  icon: <ClockIcon className="h-10 w-10 text-tecentrix-orange" />,
                  title: "Business Hours",
                  details: ["Monday-Friday: 9AM-6PM PST", "Saturday: 10AM-4PM PST", "Sunday: Closed"]
                }
              ].map((item, index) => (
                <Card key={index} className="scale-reveal h-full border-none shadow-md" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="mb-4">{item.icon}</div>
                    <h3 className="text-xl font-semibold text-tecentrix-blue mb-3">{item.title}</h3>
                    <div className="space-y-1 text-tecentrix-darkgray/80">
                      {item.details.map((detail, i) => (
                        <p key={i}>{detail}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form and Map */}
        <section className="py-16 bg-tecentrix-gray">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="reveal-left">
                <Card className="border-none shadow-lg">
                  <CardContent className="p-8">
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
                        disabled={isSubmitting}
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
                    </form>
                  </CardContent>
                </Card>
              </div>
              <div className="reveal-right">
                <div className="h-full flex flex-col">
                  <h3 className="text-2xl font-bold text-tecentrix-blue mb-6">Find Us</h3>
                  <div className="flex-grow bg-white rounded-xl shadow-lg overflow-hidden relative min-h-[400px]">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50470.44097869996!2d-122.44889169235412!3d37.77492951191932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1656533278879!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Tecentrix Location"
                      className="absolute inset-0"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12 reveal">
              <h2 className="text-sm font-semibold text-tecentrix-orange uppercase tracking-wide">Questions & Answers</h2>
              <h3 className="mt-2 text-3xl font-bold text-tecentrix-blue">Frequently Asked Questions</h3>
            </div>
            
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  question: "How do I enroll in a course?",
                  answer: "You can enroll in any course by visiting the course page and clicking the 'Enroll Now' button. Follow the checkout process to complete your registration."
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept all major credit cards, PayPal, and bank transfers. For corporate training, we also offer invoice payment options."
                },
                {
                  question: "Are courses self-paced or scheduled?",
                  answer: "We offer both self-paced and scheduled courses. Self-paced courses allow you to learn at your own pace, while scheduled courses follow a specific timeline with live sessions."
                },
                {
                  question: "Do you offer corporate training?",
                  answer: "Yes, we provide customized corporate training solutions. Contact our sales team to discuss your organization's specific needs."
                },
                {
                  question: "What is your refund policy?",
                  answer: "We offer a 30-day money-back guarantee for most courses. If you're not satisfied, you can request a full refund within 30 days of purchase."
                },
                {
                  question: "Do I get a certificate upon completion?",
                  answer: "Yes, all courses include a certificate of completion. Our professional certification courses also provide industry-recognized credentials."
                }
              ].map((faq, index) => (
                <Card key={index} className="scale-reveal border-none shadow-md hover:shadow-lg transition-all duration-300" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold text-tecentrix-blue mb-2">{faq.question}</h4>
                    <p className="text-tecentrix-darkgray/80">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
