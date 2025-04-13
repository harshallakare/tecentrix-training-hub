
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

const Index = () => {
  useEffect(() => {
    console.log("Index page mounting");
    
    // Use a timeout with increased delay to ensure the DOM is ready
    const initTimeout = setTimeout(() => {
      // Basic initialization with careful error handling
      try {
        initializeNavigation();
        console.log("Navigation initialized successfully");
      } catch (error) {
        console.error("Error initializing navigation:", error);
      }
      
      try {
        syncContentData();
        console.log("Content data synced successfully");
      } catch (error) {
        console.error("Error syncing content data:", error);
      }
      
      // Set page title
      try {
        document.title = "Tecentrix - Professional Training and Certification";
        console.log("Index page initialized successfully");
      } catch (error) {
        console.error("Error setting page title:", error);
      }
    }, 200);
    
    return () => {
      clearTimeout(initTimeout);
      console.log("Index page unmounting");
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
