
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import Settings from "./pages/Settings";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import CoursesManagement from "./pages/CoursesManagement";
import About from "./pages/About";
import Contact from "./pages/Contact";
import WhatsAppButton from "./components/WhatsAppButton";
import { useNavigationStore } from "./store/navigationStore";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { navItems } = useNavigationStore();
  const activeNavItems = navItems.filter(item => item.enabled);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      
      {/* Static routes for main pages */}
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:courseId" element={<CourseDetails />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      
      {/* Dynamic routes based on navigation store */}
      {activeNavItems.map(item => {
        // Skip the routes that already have dedicated components
        if (["/", "/courses", "/about", "/contact"].includes(item.path)) return null;
        return <Route key={item.id} path={item.path} element={<Index />} />;
      })}
      
      {/* Admin routes */}
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/settings" element={<Settings />} />
      <Route path="/admin/courses" element={<CoursesManagement />} />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
        <WhatsAppButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
