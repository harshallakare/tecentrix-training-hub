
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useContentStore } from '@/store/contentStore';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Star, Quote, MessageSquare } from 'lucide-react';

const Testimonials = () => {
  const { testimonialsList } = useContentStore();

  useEffect(() => {
    document.title = "Testimonials | Tecentrix";
    
    // Animate testimonials on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  if (!testimonialsList || testimonialsList.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-medium text-gray-600">No testimonials available yet</h2>
            <p className="mt-2 text-gray-500">Check back soon for student success stories</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-tecentrix-blue/10 to-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-tecentrix-blue mb-4 reveal">
              Student Testimonials
            </h1>
            <p className="text-lg md:text-xl text-tecentrix-darkgray max-w-3xl mx-auto reveal">
              Hear from our community of certified Linux professionals who have transformed their careers with our training programs
            </p>
          </div>
        </section>
        
        {/* Testimonials Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonialsList.map((testimonial, index) => (
                <div 
                  key={testimonial.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-100 reveal"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <Avatar className="h-12 w-12 mr-4 ring-2 ring-tecentrix-orange/20">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                        <AvatarFallback>{getInitials(testimonial.author)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg text-tecentrix-blue">{testimonial.author}</h3>
                        <p className="text-sm text-tecentrix-darkgray/70">{testimonial.role}</p>
                        {testimonial.company && (
                          <p className="text-xs text-tecentrix-orange">{testimonial.company}</p>
                        )}
                      </div>
                    </div>
                    <Quote className="text-tecentrix-orange/30 h-8 w-8" />
                  </div>
                  
                  <div className="mb-4">
                    <blockquote className="italic text-tecentrix-darkgray">
                      "{testimonial.content}"
                    </blockquote>
                  </div>
                  
                  <div className="flex items-center text-yellow-500 mt-4">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center reveal">
              <h2 className="text-2xl md:text-3xl font-bold text-tecentrix-blue mb-6">
                Join Our Community of Linux Professionals
              </h2>
              <p className="text-lg text-tecentrix-darkgray max-w-3xl mx-auto mb-8">
                Start your Linux certification journey today and be our next success story. Our industry-recognized training programs are designed to help you advance your career.
              </p>
              <a 
                href="/courses" 
                className="inline-block bg-tecentrix-orange text-white px-6 py-3 rounded-md hover:bg-tecentrix-orange/90 transition-colors font-medium"
              >
                Explore Our Courses
              </a>
            </div>
          </div>
        </section>

        {/* Certification Partners */}
        <section className="py-16 bg-tecentrix-gray/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-tecentrix-blue mb-12 reveal">
              Industry-Recognized Certifications
            </h2>
            <div className="flex flex-wrap justify-center gap-10 items-center reveal">
              <div className="bg-white p-4 rounded-lg shadow-sm flex items-center space-x-3">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Red_Hat_logo.svg/1200px-Red_Hat_logo.svg.png" alt="Red Hat" className="h-10" />
                <span className="text-sm font-medium">Red Hat Partner</span>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm flex items-center space-x-3">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/UbuntuCoF.svg/512px-UbuntuCoF.svg.png" alt="Ubuntu" className="h-10" />
                <span className="text-sm font-medium">Ubuntu Certified</span>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm flex items-center space-x-3">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1024px-Amazon_Web_Services_Logo.svg.png" alt="AWS" className="h-10" />
                <span className="text-sm font-medium">AWS Training Partner</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Testimonials;
