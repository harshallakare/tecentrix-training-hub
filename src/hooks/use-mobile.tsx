
import * as React from "react"

// Increase the breakpoint to catch more mobile devices including larger phones and small tablets
const MOBILE_BREAKPOINT = 768

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Function to check if device is mobile based on multiple factors
    const checkMobile = () => {
      // Method 1: Check viewport width
      const viewportWidth = window.innerWidth;
      const viewportBasedMobile = viewportWidth < MOBILE_BREAKPOINT;
      
      // Method 2: Check user agent for mobile devices
      const userAgent = navigator.userAgent.toLowerCase();
      const userAgentMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i.test(userAgent);
      
      // Method 3: Check touch points (most touch devices are mobile)
      const touchBasedMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // Combine checks - prioritize viewport size but consider other factors
      // This helps catch devices that might have larger screens but are still mobile
      const finalIsMobile = viewportBasedMobile || 
        (userAgentMobile && touchBasedMobile && viewportWidth < 1024);
      
      setIsMobile(finalIsMobile);
      
      // Store device info in localStorage to help with debugging
      localStorage.setItem("tecentrix-device-info", JSON.stringify({
        isMobile: finalIsMobile,
        orientation: window.innerHeight > window.innerWidth ? "portrait" : "landscape",
        width: viewportWidth,
        height: window.innerHeight,
        userAgent: navigator.userAgent,
        userAgentMobile: userAgentMobile,
        touchBasedMobile: touchBasedMobile,
        timestamp: new Date().toISOString()
      }));
      
      return finalIsMobile;
    };
    
    // Add various event listeners to catch all possible viewport changes
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    const onChange = () => {
      checkMobile();
    }
    
    // Add various event listeners to catch all possible viewport changes
    mql.addEventListener("change", onChange)
    window.addEventListener("resize", onChange)
    window.addEventListener("orientationchange", onChange)
    
    // Force a layout recalculation for mobile
    if (/iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase())) {
      // Add a small delay to ensure dimensions are correct after any OS UI elements appear/disappear
      setTimeout(onChange, 100);
    }
    
    // Set initial values
    onChange();
    
    return () => {
      mql.removeEventListener("change", onChange)
      window.removeEventListener("resize", onChange)
      window.removeEventListener("orientationchange", onChange)
    }
  }, [])

  return isMobile;
}

// Create a new hook for comprehensive mobile information
export function useMobileInfo() {
  const isMobile = useIsMobile();
  const [orientation, setOrientation] = React.useState<"portrait" | "landscape">("landscape")
  const [dimensions, setDimensions] = React.useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  React.useEffect(() => {
    const updateInfo = () => {
      const isPortrait = window.innerHeight > window.innerWidth;
      setOrientation(isPortrait ? "portrait" : "landscape");
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
      
      // Log actual dimensions for debugging
      console.log("Current dimensions:", { 
        width: window.innerWidth, 
        height: window.innerHeight,
        orientation: isPortrait ? "portrait" : "landscape",
        isMobile
      });
    }

    window.addEventListener("resize", updateInfo)
    window.addEventListener("orientationchange", updateInfo)
    
    // For iOS Safari specifically, which sometimes has delayed dimension reporting
    if (/iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase())) {
      // Check dimensions after a slight delay to ensure accuracy
      setTimeout(updateInfo, 100);
      
      // Also check after page is fully loaded
      window.addEventListener('load', () => setTimeout(updateInfo, 200));
    }

    updateInfo();

    return () => {
      window.removeEventListener("resize", updateInfo)
      window.removeEventListener("orientationchange", updateInfo)
    }
  }, [isMobile])

  return {
    isMobile,
    orientation,
    dimensions,
    isPortrait: orientation === "portrait",
    isLandscape: orientation === "landscape"
  }
}
