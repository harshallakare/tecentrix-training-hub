
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Extend Window interface to include our custom property with correct typing
declare global {
  interface Window {
    __APP_RENDERED?: boolean;
  }
}

// Very simplified initialization to prevent any possible issues
const rootElement = document.getElementById("root");

if (rootElement) {
  try {
    console.log("Creating React root and rendering app");
    const root = createRoot(rootElement);
    root.render(<App />);
    window.__APP_RENDERED = true;
    console.log("App rendered successfully");
  } catch (error) {
    console.error("Critical error during app initialization:", error);
    document.body.innerHTML = '<div style="color: red; padding: 20px;">Sorry, the application failed to load. Please refresh the page.</div>';
  }
} else {
  console.error("Could not find root element");
}
