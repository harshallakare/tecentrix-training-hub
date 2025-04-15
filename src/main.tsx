
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Get the root element
const rootElement = document.getElementById("root");

// Ensure the root element exists before rendering
if (!rootElement) {
  console.error("Root element not found. Cannot mount React application.");
} else {
  try {
    const root = createRoot(rootElement);
    root.render(<App />);
    console.log("React application successfully mounted");
  } catch (error) {
    console.error("Failed to render React application:", error);
  }
}
