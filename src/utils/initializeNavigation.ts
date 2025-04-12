
import { useNavigationStore } from "@/store/navigationStore";

/**
 * Initialize navigation with standard pages including testimonials
 */
export const initializeNavigation = () => {
  const { navItems, updateNavItems } = useNavigationStore.getState();
  
  // Check if we need to add the testimonials page
  const hasTestimonials = navItems.some(item => item.path === "/testimonials");
  
  if (!hasTestimonials) {
    // Add testimonials to navigation
    const updatedNavItems = [
      ...navItems,
      {
        id: "testimonials",
        label: "Testimonials",
        path: "/testimonials",
        enabled: true
      }
    ];
    
    updateNavItems(updatedNavItems);
    console.log("Added Testimonials to navigation menu");
  }
};
