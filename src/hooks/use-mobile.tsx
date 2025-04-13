
import * as React from "react"

// Increase the breakpoint to catch more mobile devices including larger phones and small tablets
const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)
  const [orientation, setOrientation] = React.useState<"portrait" | "landscape" | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    const onChange = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      const isPortrait = window.innerHeight > window.innerWidth;
      
      setIsMobile(mobile);
      setOrientation(isPortrait ? "portrait" : "landscape");
      
      // Store device info in localStorage to help with debugging
      localStorage.setItem("tecentrix-device-info", JSON.stringify({
        isMobile: mobile,
        orientation: isPortrait ? "portrait" : "landscape",
        width: window.innerWidth,
        height: window.innerHeight,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      }));
    }
    
    // Add various event listeners to catch all possible viewport changes
    mql.addEventListener("change", onChange)
    window.addEventListener("resize", onChange)
    window.addEventListener("orientationchange", onChange)
    
    // Set initial values
    onChange();
    
    return () => {
      mql.removeEventListener("change", onChange)
      window.removeEventListener("resize", onChange)
      window.removeEventListener("orientationchange", onChange)
    }
  }, [])

  return {
    isMobile: !!isMobile,
    orientation,
    isPortrait: orientation === "portrait",
    isLandscape: orientation === "landscape"
  }
}
