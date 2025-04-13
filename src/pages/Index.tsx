
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Courses from '@/components/Courses';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

const Index = () => {
  // No useEffect - we'll initialize in App.tsx instead
  
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
