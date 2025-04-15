import React, { useEffect, useState } from 'react';
import { useContentStore } from '@/store/contentStore';
const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const {
    testimonialsList
  } = useContentStore();
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, {
      threshold: 0.1
    });
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));
    return () => {
      revealElements.forEach(el => observer.unobserve(el));
    };
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % testimonialsList.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonialsList.length]);
  return <section className="section-padding bg-gradient-to-b from-tecentrix-gray to-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-64 h-64 rounded-full bg-tecentrix-orange/10 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 rounded-full bg-tecentrix-blue/10 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-semibold text-tecentrix-orange uppercase tracking-wide reveal">Success Stories</h2>
          <h3 className="mt-2 text-3xl md:text-4xl font-bold text-tecentrix-blue reveal">
            What Our Alumni Say
          </h3>
          <p className="mt-4 text-lg text-tecentrix-darkgray/80 reveal">
            Hear from professionals who have advanced their careers with our Linux certification training programs.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative h-[400px] md:h-[300px]">
            {testimonialsList.map((testimonial, index) => <div key={testimonial.id} className={`absolute top-0 left-0 right-0 transition-all duration-500 ease-in-out glass-card rounded-xl p-8 md:p-10 ${index === activeIndex ? 'opacity-100 translate-y-0 z-10' : 'opacity-0 translate-y-8 -z-10'}`}>
                <div className="flex flex-col md:flex-row md:items-center gap-8">
                  <div className="flex-shrink-0 flex justify-center">
                    <div className="relative">
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden ring-4 ring-white">
                        <img src={testimonial.avatar} alt={testimonial.author} className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute -bottom-3 -right-3 bg-tecentrix-orange rounded-full w-8 h-8 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <blockquote className="text-lg md:text-xl italic text-tecentrix-darkgray leading-relaxed">
                      "{testimonial.content}"
                    </blockquote>
                    
                    <div className="mt-4">
                      <div className="font-semibold text-tecentrix-blue">{testimonial.author}</div>
                      <div className="text-sm text-tecentrix-darkgray/70">{testimonial.role}</div>
                      <div className="text-sm text-tecentrix-orange mt-1">RHCE Certified Professional</div>
                    </div>
                  </div>
                </div>
              </div>)}
          </div>
          
          <div className="flex justify-center space-x-2 mt-8">
            {testimonialsList.map((_, index) => <button key={index} onClick={() => setActiveIndex(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex ? 'bg-tecentrix-orange scale-125' : 'bg-gray-300 hover:bg-gray-400'}`} aria-label={`View testimonial ${index + 1}`}></button>)}
          </div>
          
          <div className="mt-12 text-center reveal">
            <p className="text-tecentrix-darkgray mb-4">Join our community of 3000+ certified Linux professionals</p>
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="bg-white p-4 rounded-lg shadow-sm flex items-center space-x-3">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Red_Hat_logo.svg/1200px-Red_Hat_logo.svg.png" alt="Red Hat" className="h-8" />
                <span className="text-sm font-medium">Red Hat Certified</span>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm flex items-center space-x-3">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/UbuntuCoF.svg/512px-UbuntuCoF.svg.png" alt="Ubuntu" className="h-8" />
                <span className="text-sm font-medium">Ubuntu Certified</span>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm flex items-center space-x-3">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1024px-Amazon_Web_Services_Logo.svg.png" alt="AWS" className="h-8" />
                <span className="text-sm font-medium">AWS Training Partner</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Testimonials;