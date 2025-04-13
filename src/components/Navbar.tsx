
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useNavigationStore } from '@/store/navigationStore';
import { useCompanyName } from '@/hooks/use-settings-sync';
import { refreshSettingsFromStorage } from '@/store/settingsStore';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { navItems } = useNavigationStore();
  const companyName = useCompanyName(); // Use our company name hook for reactive updates
  
  // Filter out disabled nav items
  const activeNavItems = navItems.filter(item => item.enabled);

  useEffect(() => {
    // Force refresh settings when navbar mounts
    refreshSettingsFromStorage();
    
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Listen for company name updates
    const handleCompanyNameUpdate = () => {
      console.log("Company name updated event received in Navbar");
      // Force a re-render
      setIsScrolled(prev => !prev);
      setTimeout(() => setIsScrolled(prev => !prev), 0);
    };
    
    window.addEventListener('company-name-updated', handleCompanyNameUpdate);
    window.addEventListener('settings-updated', handleCompanyNameUpdate);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('company-name-updated', handleCompanyNameUpdate);
      window.removeEventListener('settings-updated', handleCompanyNameUpdate);
    };
  }, []);
  
  // Log whenever company name changes
  useEffect(() => {
    console.log("Navbar rendering with company name:", companyName);
  }, [companyName]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
      }`}
      data-company-name={companyName} // Add data attribute for tracking
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/4c595448-842f-4b0f-85ed-498a0f4c4a4c.png" 
            alt={`${companyName} Icon`} 
            className="h-12 w-12"
          />
          <img 
            src="/lovable-uploads/ecf53e64-9a0d-42a7-9f33-45ff3799daef.png" 
            alt={`${companyName} Text`} 
            className="h-8 md:h-10"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {activeNavItems.map((item) => (
            <Link 
              key={item.id}
              to={item.path} 
              className="text-tecentrix-darkgray hover:text-tecentrix-blue transition-colors"
            >
              {item.label}
            </Link>
          ))}
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
            {activeNavItems.map((item) => (
              <Link 
                key={item.id}
                to={item.path} 
                className="text-tecentrix-darkgray hover:text-tecentrix-blue transition-colors py-2 border-b"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
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
