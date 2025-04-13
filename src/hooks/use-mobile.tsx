
import * as React from "react"

// Increase the breakpoint to catch more mobile devices including larger phones and small tablets
const MOBILE_BREAKPOINT = 768

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Initialize by checking device immediately
    checkMobile();
    
    // Function to check if device is mobile based on multiple factors
    function checkMobile() {
      // Method 1: Check viewport width
      const viewportWidth = window.innerWidth;
      const viewportBasedMobile = viewportWidth < MOBILE_BREAKPOINT;
      
      // Method 2: Check user agent for mobile devices - comprehensive pattern
      const userAgent = navigator.userAgent.toLowerCase();
      const userAgentMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|mobi|phone|tablet|silk|kindle|playbook/i.test(userAgent);
      
      // Method 3: Check touch points (most touch devices are mobile)
      const touchBasedMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // Method 4: Check for orientation API (mostly available on mobile)
      const hasOrientationAPI = typeof window.orientation !== 'undefined' || navigator.userAgent.indexOf('IEMobile') !== -1;
      
      // Combine checks - using a more aggressive approach to ensure mobile detection
      const finalIsMobile = viewportBasedMobile || 
        (userAgentMobile && touchBasedMobile) || 
        (touchBasedMobile && viewportWidth < 1024) ||
        (hasOrientationAPI && viewportWidth < 1200);
      
      setIsMobile(finalIsMobile);
      
      // Store detailed device info in localStorage to help with debugging
      try {
        localStorage.setItem("tecentrix-device-info", JSON.stringify({
          isMobile: finalIsMobile,
          orientation: window.innerHeight > window.innerWidth ? "portrait" : "landscape",
          width: viewportWidth,
          height: window.innerHeight,
          pixelRatio: window.devicePixelRatio || 1,
          userAgent: navigator.userAgent,
          userAgentMobile: userAgentMobile,
          touchBasedMobile: touchBasedMobile,
          hasOrientationAPI: hasOrientationAPI,
          viewportBasedMobile: viewportBasedMobile,
          timestamp: new Date().toISOString()
        }));
      } catch (e) {
        console.error("Error storing device info:", e);
      }
      
      // Force body class update for CSS targeting
      if (finalIsMobile) {
        document.body.classList.add('is-mobile-device');
      } else {
        document.body.classList.remove('is-mobile-device');
      }
      
      // Log for debugging
      console.log(`Device detection: Mobile=${finalIsMobile}, Width=${viewportWidth}, Ratio=${window.devicePixelRatio || 1}`);
      
      return finalIsMobile;
    };
    
    // Add various event listeners to catch all possible viewport changes
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Force layout recalculation on all major events
    const events = ["resize", "orientationchange", "load", "visibilitychange"];
    events.forEach(event => {
      window.addEventListener(event, checkMobile);
    });
    
    // Media query listener
    try {
      // Modern browsers
      mql.addEventListener("change", checkMobile);
    } catch (e) {
      // Fallback for older browsers
      try {
        mql.addListener(checkMobile);
      } catch (e2) {
        console.warn("Media query listeners not supported", e2);
      }
    }
    
    // Force iOS Specific checks
    if (/iphone|ipad|ipod|mac/i.test(navigator.userAgent.toLowerCase())) {
      // Add a small delay to ensure dimensions are correct after any OS UI elements appear/disappear
      setTimeout(checkMobile, 100);
      setTimeout(checkMobile, 500);  // Secondary check after longer delay
      
      // Set meta viewport dynamically to ensure proper scaling
      const metaViewport = document.querySelector('meta[name="viewport"]');
      if (metaViewport) {
        // Set viewport content
        metaViewport.setAttribute('content', 
          'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no, viewport-fit=cover');
      }
    }
    
    // Initial check
    checkMobile();
    
    return () => {
      // Clean up listeners
      events.forEach(event => {
        window.removeEventListener(event, checkMobile);
      });
      
      try {
        mql.removeEventListener("change", checkMobile);
      } catch (e) {
        try {
          mql.removeListener(checkMobile);
        } catch (e2) {
          console.warn("Could not remove media query listener", e2);
        }
      }
    }
  }, [])

  return isMobile;
}

// Create a new hook for comprehensive mobile information
export function useMobileInfo() {
  const isMobile = useIsMobile();
  const [orientation, setOrientation] = React.useState<"portrait" | "landscape">(
    typeof window !== 'undefined' && window.innerHeight > window.innerWidth ? "portrait" : "landscape"
  );
  const [dimensions, setDimensions] = React.useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
  });

  React.useEffect(() => {
    function updateInfo() {
      const isPortrait = window.innerHeight > window.innerWidth;
      setOrientation(isPortrait ? "portrait" : "landscape");
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: window.devicePixelRatio || 1
      });
      
      // Log actual dimensions for debugging
      console.log("Current dimensions:", { 
        width: window.innerWidth, 
        height: window.innerHeight,
        pixelRatio: window.devicePixelRatio || 1,
        orientation: isPortrait ? "portrait" : "landscape",
        isMobile
      });
      
      // Force re-render for iOS and problematic devices
      if (/iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase())) {
        // Force layout calculation
        document.body.style.display = 'none';
        // Force a reflow
        void document.body.offsetHeight;
        document.body.style.display = '';
      }
    }

    // Comprehensive event listeners for maximum reliability
    const events = ["resize", "orientationchange", "load", "visibilitychange"];
    events.forEach(event => {
      window.addEventListener(event, updateInfo);
    });
    
    // For iOS Safari specifically, which sometimes has delayed dimension reporting
    if (/iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase())) {
      // Check dimensions after multiple delays to ensure accuracy
      [100, 300, 500, 1000].forEach(delay => {
        setTimeout(updateInfo, delay);
      });
    }

    // Initial update
    updateInfo();

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, updateInfo);
      });
    }
  }, [isMobile]);

  return {
    isMobile,
    orientation,
    dimensions,
    isPortrait: orientation === "portrait",
    isLandscape: orientation === "landscape",
    pixelRatio: dimensions.pixelRatio
  }
}
