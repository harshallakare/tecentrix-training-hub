
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log("Main entry point executing", new Date().toISOString());

try {
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    console.error("Could not find root element");
    document.body.innerHTML = '<div style="color: red; padding: 20px;">Error: Root element not found.</div>';
  } else {
    console.log("Creating React root");
    
    // Create root and render app
    const root = createRoot(rootElement);
    root.render(<App />);
    
    console.log("App rendered successfully");
    
    // Set a flag in window to indicate successful render
    window.__APP_RENDERED = true;
  }
} catch (error) {
  console.error("Critical error during app initialization:", error);
  document.body.innerHTML = '<div style="color: red; padding: 20px;">Sorry, the application failed to load. Please refresh the page or check console for details.</div>';
}
