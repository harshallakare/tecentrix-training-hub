
import { useNavigationStore } from "@/store/navigationStore";

/**
 * Initialize navigation with standard pages including testimonials
 * @param forceRefresh - Whether to force refresh navigation even if items already exist
 */
export const initializeNavigation = (forceRefresh = false) => {
  const { navItems, updateNavItems } = useNavigationStore.getState();
  
  // Check if we need to add the testimonials page
  const hasTestimonials = navItems.some(item => item.path === "/testimonials");
  
  if (!hasTestimonials || forceRefresh) {
    // Make sure all core routes are present and enabled
    const coreRoutes = [
      { id: "home", label: "Home", path: "/", enabled: true },
      { id: "courses", label: "Courses", path: "/courses", enabled: true },
      { id: "about", label: "About", path: "/about", enabled: true },
      { id: "contact", label: "Contact", path: "/contact", enabled: true },
      { id: "testimonials", label: "Testimonials", path: "/testimonials", enabled: true }
    ];
    
    // Filter out existing core routes from navItems
    const existingNonCoreItems = navItems.filter(
      item => !coreRoutes.some(core => core.path === item.path)
    );
    
    // Merge core routes with existing non-core items
    const updatedNavItems = [
      ...coreRoutes,
      ...existingNonCoreItems
    ];
    
    updateNavItems(updatedNavItems);
    console.log("Navigation menu initialized with core pages");
    
    // If refreshNavigation exists, call it
    const navigationStore = useNavigationStore.getState();
    if (typeof navigationStore.refreshNavigation === 'function') {
      navigationStore.refreshNavigation();
    }
  }
  
  return navItems;
};
