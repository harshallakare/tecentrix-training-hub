
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
    
    // Basic initialization without complex logic
    try {
      initializeNavigation();
      syncContentData();
      
      // Set page title
      document.title = "Tecentrix - Professional Training and Certification";
      console.log("Index page initialized successfully");
    } catch (error) {
      console.error("Error initializing Index page:", error);
    }
    
    return () => {
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
