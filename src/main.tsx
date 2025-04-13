
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add console logs to help debug initialization
console.log("Main entry point executing");

try {
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    console.error("Could not find root element");
    document.body.innerHTML = '<div style="color: red; padding: 20px;">Error: Root element not found.</div>';
  } else {
    console.log("Creating React root");
    const root = createRoot(rootElement);
    root.render(<App />);
    console.log("App rendered successfully");
  }
} catch (error) {
  console.error("Critical error during app initialization:", error);
  // Display a user-friendly error message
  document.body.innerHTML = '<div style="color: red; padding: 20px;">Sorry, the application failed to load. Please refresh the page.</div>';
}
