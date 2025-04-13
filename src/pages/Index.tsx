
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Courses from '@/components/Courses';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import { initializeNavigation } from '@/utils/initializeNavigation';
import { syncContentData } from '@/utils/dataSync';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  // Get basic mobile status for initialization
  const isMobile = useIsMobile();
  
  useEffect(() => {
    console.log("Index page mounting, initializing...");
    
    // Initialize navigation items and sync data on mount
    initializeNavigation();
    console.log("Navigation initialized");
    
    syncContentData();
    console.log("Content data synced");
    
    // Set page title
    document.title = "Tecentrix - Professional Training and Certification";
    
    // Set up IntersectionObserver for reveal animations
    try {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          // When element is intersecting (visible in viewport)
          if (entry.isIntersecting) {
            const element = entry.target;
            // Add the appropriate visible class based on the element's animation type
            if (element.classList.contains('reveal-right')) {
              element.classList.add('reveal-right-visible');
            } else if (element.classList.contains('reveal-left')) {
              element.classList.add('reveal-left-visible');
            } else if (element.classList.contains('scale-reveal')) {
              element.classList.add('scale-reveal-visible');
            } else if (element.classList.contains('reveal')) {
              element.classList.add('reveal-visible');
            }
          }
        });
      }, {
        // Adjust the threshold based on device type
        threshold: isMobile ? 0.1 : 0.2,
        // Start revealing when element is this % into the viewport
        rootMargin: isMobile ? '0px 0px -10% 0px' : '0px 0px -15% 0px',
      });
      
      // Target all elements with animation classes
      const revealElements = document.querySelectorAll(
        '.reveal, .reveal-right, .reveal-left, .scale-reveal'
      );
      
      // Observe each element
      revealElements.forEach(element => {
        observer.observe(element);
      });
      
      console.log("Animation observers initialized");
      
      // Clean up
      return () => {
        revealElements.forEach(element => {
          observer.unobserve(element);
        });
        console.log("Index page unmounting, cleaning up observers");
      };
    } catch (error) {
      console.error("Error setting up animations:", error);
    }
  }, [isMobile]);
  
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
