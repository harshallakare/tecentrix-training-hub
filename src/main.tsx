
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Extend Window interface to include our custom property with correct typing
declare global {
  interface Window {
    __APP_RENDERED?: boolean;
  }
}

console.log("Main entry point executing", new Date().toISOString());

// Simplified initialization function to reduce potential issues
function initializeApp() {
  try {
    const rootElement = document.getElementById("root");
    
    if (!rootElement) {
      console.error("Could not find root element");
      return false;
    }
    
    console.log("Creating React root");
    
    // Create root and render app with simple error boundary
    const root = createRoot(rootElement);
    root.render(<App />);
    
    console.log("App rendered successfully");
    window.__APP_RENDERED = true;
    
    return true;
  } catch (error) {
    console.error("Critical error during app initialization:", error);
    
    // Add fallback UI in case of critical error
    try {
      document.body.innerHTML = '<div style="color: red; padding: 20px;">Sorry, the application failed to load. Please refresh the page.</div>';
    } catch (e) {
      // Last resort fallback
      console.error("Failed to show error message:", e);
    }
    
    return false;
  }
}

// Start app initialization with a small delay to ensure DOM is ready
setTimeout(initializeApp, 0);
