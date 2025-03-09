
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/2167f3bc-5e5f-4921-a824-acab3792d723.png" 
            alt="Tecentrix Logo" 
            className="h-10 md:h-12"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-tecentrix-darkgray hover:text-tecentrix-blue transition-colors">
            Home
          </Link>
          <Link to="/courses" className="text-tecentrix-darkgray hover:text-tecentrix-blue transition-colors">
            Courses
          </Link>
          <Link to="/about" className="text-tecentrix-darkgray hover:text-tecentrix-blue transition-colors">
            About
          </Link>
          <Link to="/testimonials" className="text-tecentrix-darkgray hover:text-tecentrix-blue transition-colors">
            Testimonials
          </Link>
          <Link to="/contact" className="text-tecentrix-darkgray hover:text-tecentrix-blue transition-colors">
            Contact
          </Link>
        </nav>

        <div className="hidden md:block">
          <Button className="tecentrix-primary-button">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-tecentrix-blue"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-tecentrix-darkgray hover:text-tecentrix-blue transition-colors py-2 border-b"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/courses" 
              className="text-tecentrix-darkgray hover:text-tecentrix-blue transition-colors py-2 border-b"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Courses
            </Link>
            <Link 
              to="/about" 
              className="text-tecentrix-darkgray hover:text-tecentrix-blue transition-colors py-2 border-b"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/testimonials" 
              className="text-tecentrix-darkgray hover:text-tecentrix-blue transition-colors py-2 border-b"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link 
              to="/contact" 
              className="text-tecentrix-darkgray hover:text-tecentrix-blue transition-colors py-2 border-b"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Button 
              className="tecentrix-primary-button w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
