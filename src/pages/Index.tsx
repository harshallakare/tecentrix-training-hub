import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Courses from '@/components/Courses';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import { initializeNavigation } from '@/utils/initializeNavigation';
import { syncContentData, useNetworkSync } from '@/utils/dataSync';
import { useIsMobile, useMobileInfo } from '@/hooks/use-mobile';
import { useSettingsSync } from '@/hooks/useSettingsSync';

const Index = () => {
  // Check network status
  const { isOnline } = useNetworkSync();
  const isMobile = useIsMobile();
  const { orientation } = useMobileInfo();
  // Force settings sync on homepage to ensure latest contact info
  const settings = useSettingsSync();
  
  useEffect(() => {
    // Initialize navigation items and sync data on mount
    initializeNavigation();
    syncContentData();
    
    // Set page title with company name from settings
    document.title = `${settings.companyName} - Professional Training and Certification`;
    
    const handleScroll = () => {
      const revealElements = document.querySelectorAll(
        '.reveal, .reveal-right, .reveal-left, .scale-reveal'
      );
      
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementHeight = element.getBoundingClientRect().height;
        
        // Adjust the reveal point based on device type
        const revealPoint = isMobile ? window.innerHeight - elementHeight / 4 : window.innerHeight - elementHeight / 3;
        
        // Only reveal when element is in viewport
        if (elementTop < revealPoint) {
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
    
    // Force a refresh when orientation changes
    const handleOrientationChange = () => {
      console.log("Orientation changed, refreshing data...");
      syncContentData(true);
      // Re-run scroll handler after orientation change
      setTimeout(handleScroll, 300);
    };
    
    window.addEventListener('orientationchange', handleOrientationChange);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [isMobile, orientation, settings.companyName]);
  
  // Debug info for development
  console.log(`Render Index - Mobile: ${isMobile}, Orientation: ${orientation}, Online: ${isOnline}, Company: ${settings.companyName}`);
  console.log(`Contact Info on Homepage:`, settings.contactInfo);
  
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
