
import * as React from "react"

// Increase the breakpoint to catch more mobile devices including larger phones and small tablets
const MOBILE_BREAKPOINT = 768

/**
 * Simple hook to detect mobile devices based primarily on viewport width
 * This hook is intentionally simplified to rely more on CSS media queries
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = React.useState<boolean>(
    typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT
  );

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return isMobile;
}

/**
 * Simplified hook that provides just the essential information about
 * the device's screen orientation and dimensions
 */
export function useMobileInfo() {
  const isMobile = useIsMobile();
  const [orientation, setOrientation] = React.useState<"portrait" | "landscape">(
    typeof window !== 'undefined' && window.innerHeight > window.innerWidth ? "portrait" : "landscape"
  );
  const [dimensions, setDimensions] = React.useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio : 1,
  });

  React.useEffect(() => {
    const updateInfo = () => {
      const isPortrait = window.innerHeight > window.innerWidth;
      setOrientation(isPortrait ? "portrait" : "landscape");
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: window.devicePixelRatio,
      });
    };

    // Add event listeners
    window.addEventListener('resize', updateInfo);
    window.addEventListener('orientationchange', updateInfo);
    
    // Initial update
    updateInfo();

    return () => {
      window.removeEventListener('resize', updateInfo);
      window.removeEventListener('orientationchange', updateInfo);
    };
  }, []);

  return {
    isMobile,
    orientation,
    dimensions,
    isPortrait: orientation === "portrait",
    isLandscape: orientation === "landscape"
  };
}
