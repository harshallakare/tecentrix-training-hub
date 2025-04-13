
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

// Safe initialization function
function initializeApp() {
  try {
    const rootElement = document.getElementById("root");
    
    if (!rootElement) {
      console.error("Could not find root element");
      document.body.innerHTML = '<div style="color: red; padding: 20px;">Error: Root element not found.</div>';
      return false;
    }
    
    console.log("Creating React root");
    
    // Create root and render app
    const root = createRoot(rootElement);
    root.render(<App />);
    
    console.log("App rendered successfully");
    
    // Set a flag in window to indicate successful render
    window.__APP_RENDERED = true;
    
    return true;
  } catch (error) {
    console.error("Critical error during app initialization:", error);
    document.body.innerHTML = '<div style="color: red; padding: 20px;">Sorry, the application failed to load. Please refresh the page or check console for details.</div>';
    return false;
  }
}

// Start app initialization
initializeApp();
