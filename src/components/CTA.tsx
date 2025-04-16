
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Phone, Mail } from 'lucide-react';
import { useContentStore } from '@/store/contentStore';
import { useSettingsSync } from '@/hooks/useSettingsSync';

const CTA = () => {
  const { content } = useContentStore();
  const settings = useSettingsSync(); // Use settings from the settings store
  
  useEffect(() => {
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

  return (
    <section className="py-20 bg-tecentrix-blue relative overflow-hidden">
      {/* Abstract shapes background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-tecentrix-orange/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-tecentrix-orange/10 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="reveal flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full pl-2 pr-5 py-2 w-fit mx-auto mb-6">
            <span className="bg-tecentrix-orange text-white text-xs font-medium rounded-full px-3 py-1">SPECIAL OFFER</span>
            <span className="text-sm text-white">{content.cta.specialOffer}</span>
          </div>
          
          <h2 className="reveal text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight text-center">
            {content.cta.title}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="reveal bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Upcoming Batches</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Calendar className="h-5 w-5 text-tecentrix-orange mr-3 mt-1 shrink-0" />
                  <div>
                    <div className="text-white font-medium">RHCSA Certification</div>
                    <div className="text-white/70 text-sm">June 15, 2023 (Weekend Batch)</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <Calendar className="h-5 w-5 text-tecentrix-orange mr-3 mt-1 shrink-0" />
                  <div>
                    <div className="text-white font-medium">RHCE Advanced Training</div>
                    <div className="text-white/70 text-sm">July 10, 2023 (Weekday Evening)</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <Calendar className="h-5 w-5 text-tecentrix-orange mr-3 mt-1 shrink-0" />
                  <div>
                    <div className="text-white font-medium">Linux Security Specialist</div>
                    <div className="text-white/70 text-sm">August 5, 2023 (Weekend Batch)</div>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="reveal bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Phone className="h-5 w-5 text-tecentrix-orange mr-3 mt-1 shrink-0" />
                  <div>
                    <div className="text-white font-medium">Call Us</div>
                    <div className="text-white/70 text-sm">
                      {settings.contactInfo && settings.contactInfo.phone ? settings.contactInfo.phone : "+91 9876543210"}
                    </div>
                  </div>
                </li>
                <li className="flex items-start">
                  <Mail className="h-5 w-5 text-tecentrix-orange mr-3 mt-1 shrink-0" />
                  <div>
                    <div className="text-white font-medium">Email</div>
                    <div className="text-white/70 text-sm">
                      {settings.contactInfo && settings.contactInfo.email ? settings.contactInfo.email : "training@tecentrix.com"}
                    </div>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-tecentrix-orange mr-3 mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <div className="text-white font-medium">Training Center</div>
                    <div className="text-white/70 text-sm">
                      {settings.contactInfo && settings.contactInfo.address ? settings.contactInfo.address : "123 Tech Park, IT Hub, Bangalore - 560001"}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="reveal flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-white text-tecentrix-blue hover:bg-white/90 tecentrix-button group">
              Book Free Counseling Session
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button className="border-2 border-white bg-transparent text-white hover:bg-white/10 tecentrix-button">
              Download Course Brochure
            </Button>
          </div>
          
          <div className="reveal mt-10 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-tecentrix-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Certified Trainers</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-tecentrix-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>24/7 Lab Access</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-tecentrix-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Placement Assistance</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
