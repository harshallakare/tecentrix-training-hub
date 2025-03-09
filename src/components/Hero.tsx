
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Terminal, Server, ArrowRight, Award, Users } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

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
    <div ref={heroRef} className="min-h-screen pt-20 flex flex-col justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-tecentrix-orange/10 animate-float blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full bg-tecentrix-blue/10 animate-float blur-3xl" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="flex flex-col space-y-6 max-w-xl">
          <div className="reveal flex items-center space-x-2 bg-tecentrix-gray/80 backdrop-blur-sm rounded-full pl-2 pr-5 py-2 w-fit border border-tecentrix-blue/20">
            <span className="bg-tecentrix-blue text-white text-xs font-medium rounded-full px-3 py-1">NEW</span>
            <span className="text-sm text-tecentrix-darkgray">RHCSA & RHCE Certification Courses Available</span>
          </div>
          
          <div className="reveal mb-2">
            <img 
              src="/lovable-uploads/2167f3bc-5e5f-4921-a824-acab3792d723.png" 
              alt="Tecentrix Logo" 
              className="h-16 md:h-20"
            />
          </div>
          
          <h1 className="reveal text-4xl md:text-5xl lg:text-6xl font-bold hero-text-gradient leading-tight">
            Become a Linux Expert with Industry Recognized Training
          </h1>
          
          <p className="reveal text-lg text-tecentrix-darkgray/80 leading-relaxed">
            Join our comprehensive RHCSA, RHCE, and advanced Linux programs designed by industry experts with 15+ years of experience. Get hands-on training with real-world scenarios and certified instructors.
          </p>
          
          <div className="reveal flex flex-wrap gap-4 pt-2">
            <Button className="tecentrix-primary-button group">
              Explore Certification Paths
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button className="tecentrix-outline-button">
              Free Assessment Test
            </Button>
          </div>
          
          <div className="reveal grid grid-cols-2 gap-4 pt-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-tecentrix-orange/10">
                <Award className="h-5 w-5 text-tecentrix-orange" />
              </div>
              <div>
                <p className="text-sm font-medium text-tecentrix-blue">Red Hat Certified</p>
                <p className="text-xs text-tecentrix-darkgray">Official Training Partner</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-tecentrix-blue/10">
                <Users className="h-5 w-5 text-tecentrix-blue" />
              </div>
              <div>
                <p className="text-sm font-medium text-tecentrix-blue">3000+ Alumni</p>
                <p className="text-xs text-tecentrix-darkgray">Success Stories</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="reveal flex justify-center lg:justify-end relative">
          <div className="relative w-full max-w-md">
            <div className="absolute -top-10 -left-10 w-full h-full bg-tecentrix-orange/20 rounded-xl transform rotate-6"></div>
            <div className="absolute -bottom-10 -right-10 w-full h-full bg-tecentrix-blue/20 rounded-xl transform -rotate-6"></div>
            
            <div className="relative bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 z-10">
              <div className="bg-tecentrix-blue text-white px-6 py-4 flex items-center space-x-2">
                <Terminal size={20} />
                <span className="font-mono font-medium">terminal</span>
              </div>
              
              <div className="bg-tecentrix-darkgray p-6 font-mono text-sm text-green-400 space-y-2">
                <p><span className="text-white">$</span> sudo systemctl status httpd</p>
                <p className="text-green-300">● httpd.service - The Apache HTTP Server</p>
                <p className="text-green-300">   Loaded: loaded (/usr/lib/systemd/system/httpd.service; enabled; vendor preset: disabled)</p>
                <p className="text-green-300">   Active: active (running) since Mon 2023-05-22 14:30:05 UTC; 3 days ago</p>
                <p><span className="text-white">$</span> firewall-cmd --permanent --add-service=http</p>
                <p>success</p>
                <p><span className="text-white">$</span> firewall-cmd --reload</p>
                <p>success</p>
                <p><span className="text-white">$</span> <span className="animate-pulse">_</span></p>
              </div>
            </div>
            
            <div className="absolute -bottom-5 -right-5 bg-white rounded-lg p-4 shadow-lg border border-gray-100 flex items-center space-x-3 z-20">
              <div className="bg-tecentrix-orange/20 rounded-full p-2">
                <Server className="h-6 w-6 text-tecentrix-orange" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Upcoming Batch</p>
                <p className="text-sm font-medium">RHCSA - June 15</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-16 lg:mt-24">
        <div className="reveal flex flex-wrap justify-center gap-8 md:gap-16 opacity-60">
          {['Red Hat', 'Ubuntu', 'AWS', 'IBM', 'Oracle Linux', 'CentOS'].map((partner) => (
            <div key={partner} className="text-xl font-bold text-tecentrix-darkgray/70">
              {partner}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
