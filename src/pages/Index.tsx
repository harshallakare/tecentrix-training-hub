import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Courses from '@/components/Courses';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import { initializeNavigation } from '@/utils/initializeNavigation';

const Index = () => {
  useEffect(() => {
    // Initialize navigation items if needed
    initializeNavigation();
    
    const handleScroll = () => {
      const revealElements = document.querySelectorAll(
        '.reveal, .reveal-right, .reveal-left, .scale-reveal'
      );
      
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementHeight = element.getBoundingClientRect().height;
        
        // Only reveal when element is in viewport
        if (elementTop < window.innerHeight - elementHeight / 3) {
          if (element.classList.contains('reveal-right')) {
            element.classList.add('reveal-right-visible');
          } else if (element.classList.contains('reveal-left')) {
            element.classList.add('reveal-left-visible');
          } else if (element.classList.contains('scale-reveal')) {
            element.classList.add('scale-reveal-visible');
          } else {
            element.classList.add('reveal-visible');
          }
        }
      });
    };
    
    // Initial check on page load
    setTimeout(handleScroll, 100);
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <Courses />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
