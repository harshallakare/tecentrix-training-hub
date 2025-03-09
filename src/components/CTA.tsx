
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
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
        <div className="max-w-4xl mx-auto text-center">
          <div className="reveal flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full pl-2 pr-5 py-2 w-fit mx-auto mb-6">
            <span className="bg-tecentrix-orange text-white text-xs font-medium rounded-full px-3 py-1">LIMITED TIME</span>
            <span className="text-sm text-white">20% off all courses for new students</span>
          </div>
          
          <h2 className="reveal text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Advance Your Linux Skills?
          </h2>
          
          <p className="reveal text-lg text-white/80 mb-10 max-w-3xl mx-auto">
            Join our community of Linux professionals and start your journey toward mastering Linux administration. New courses starting every month.
          </p>
          
          <div className="reveal flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-white text-tecentrix-blue hover:bg-white/90 tecentrix-button group">
              Enroll Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button className="border-2 border-white bg-transparent text-white hover:bg-white/10 tecentrix-button">
              View Course Calendar
            </Button>
          </div>
          
          <div className="reveal mt-10 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-tecentrix-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Expert Instructors</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-tecentrix-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Hands-on Labs</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-tecentrix-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Job Placement Assistance</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
