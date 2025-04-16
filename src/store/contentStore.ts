import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { toast } from 'sonner';

interface HeroContent {
  title: string;
  subtitle: string;
  ctaText: string;
}

interface CoursesContent {
  title: string;
  subtitle: string;
}

interface FeaturesContent {
  title: string;
  subtitle: string;
}

interface CTAContent {
  title: string;
  specialOffer: string;
}

export interface CurriculumSection {
  title: string;
  description: string;
}

export interface BatchDetail {
  id: string;
  date: string;
  time: string;
  languages: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  price: string;
  color: string;
  iconBg: string;
  iconColor: string;
  icon: string;
  modules: string[];
  highlighted: boolean;
  enabled?: boolean;
  upcomingBatches?: string[];
  upcomingBatch?: string;
  language?: string;
  paymentLink?: string;
  curriculum?: CurriculumSection[];
  batch_details?: BatchDetail[];
}

interface Testimonial {
  id: string;
  content: string;
  author: string;
  role: string;
  avatar: string;
  company: string;
}

interface ContentState {
  content: {
    hero: HeroContent;
    courses: CoursesContent;
    features: FeaturesContent;
    cta: CTAContent;
  };
  coursesList: Course[];
  testimonialsList: Testimonial[];
  isSyncing: boolean;
  refreshContent?: () => void;
  setCoursesList: (courses: Course[]) => void;
  setTestimonialsList: (testimonials: Testimonial[]) => void;
  updateHeroContent: (heroContent: Partial<HeroContent>) => void;
  updateCoursesContent: (coursesContent: Partial<CoursesContent>) => void;
  updateFeaturesContent: (featuresContent: Partial<FeaturesContent>) => void;
  updateCTAContent: (ctaContent: Partial<CTAContent>) => void;
  addCourse: (course: Course) => void;
  updateCourse: (id: string, course: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  addTestimonial: (testimonial: Testimonial) => void;
  updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
}

export const useContentStore = create<ContentState>()(
  persist(
    (set, get) => ({
      content: {
        hero: {
          title: 'Become a Linux Expert with Industry Recognized Training',
          subtitle: 'Join our comprehensive RHCSA, RHCE, and advanced Linux programs designed by industry experts with 15+ years of experience. Get hands-on training with real-world scenarios and certified instructors.',
          ctaText: 'Explore Certification Paths',
        },
        courses: {
          title: 'Industry-Recognized Linux Certifications',
          subtitle: 'Prepare for globally recognized Red Hat certifications with our comprehensive training programs led by certified instructors.',
        },
        features: {
          title: 'The Tecentrix Training Advantage',
          subtitle: 'Our training methodology combines theoretical concepts with extensive hands-on practice, ensuring you\'re job-ready upon completion.',
        },
        cta: {
          title: 'Start Your Linux Certification Journey Today',
          specialOffer: '25% early bird discount for June RHCSA batch',
        },
      },
      coursesList: [
        {
          id: '1',
          icon: 'Terminal',
          title: "RHCSA Certification",
          level: "Foundation",
          duration: "6 Weeks",
          description: "Red Hat Certified System Administrator course covering essential Linux skills required for RHCSA EX200 exam certification.",
          modules: ["System Configuration & Management", "File Systems & Storage", "User Administration", "Software Management", "Network Configuration"],
          highlighted: false,
          enabled: true,
          color: "bg-blue-50",
          iconBg: "bg-blue-100",
          iconColor: "text-tecentrix-blue",
          price: "₹35,000",
          upcomingBatches: ["June 15, 2025"], // Convert to array
          language: "English",
          paymentLink: "https://rzp.io/l/tecentrix-rhcsa"
        },
        {
          id: '2',
          icon: 'Server',
          title: "RHCE Certification",
          level: "Advanced",
          duration: "8 Weeks",
          description: "Comprehensive Red Hat Certified Engineer training program covering advanced system administration and automation with Ansible.",
          modules: ["Ansible Automation", "Web Services", "SELinux Configuration", "Advanced Networking", "Troubleshooting Skills"],
          highlighted: true,
          enabled: true,
          color: "bg-orange-50",
          iconBg: "bg-orange-100",
          iconColor: "text-tecentrix-orange",
          price: "₹45,000",
          upcomingBatches: ["July 10, 2025"], // Convert to array
          language: "English",
          paymentLink: "https://rzp.io/l/tecentrix-rhce"
        },
        {
          id: '3',
          icon: 'Shield',
          title: "Linux Security Specialist",
          level: "Advanced",
          duration: "6 Weeks",
          description: "Master Linux security hardening, penetration testing, intrusion detection systems, and security compliance standards.",
          modules: ["Security Fundamentals", "Threat Detection", "Firewall Configuration", "SELinux Advanced", "Security Auditing"],
          highlighted: false,
          enabled: true,
          color: "bg-green-50",
          iconBg: "bg-green-100",
          iconColor: "text-green-600",
          price: "₹40,000",
          upcomingBatches: ["August 5, 2025"], // Convert to array
          language: "English",
          paymentLink: "https://rzp.io/l/tecentrix-security"
        },
        {
          id: '4',
          icon: 'Cloud',
          title: "Linux Cloud Administration",
          level: "Advanced",
          duration: "8 Weeks",
          description: "Learn to deploy and manage Linux environments on AWS, Azure, and Google Cloud platforms with DevOps integration.",
          modules: ["Cloud Architecture", "Containers & Kubernetes", "CI/CD Pipelines", "Infrastructure as Code", "Cloud Security"],
          highlighted: false,
          enabled: true,
          color: "bg-purple-50",
          iconBg: "bg-purple-100",
          iconColor: "text-purple-600",
          price: "₹50,000",
          upcomingBatches: ["September 1, 2025"], // Convert to array
          language: "English/Hindi",
          paymentLink: "https://rzp.io/l/tecentrix-cloud"
        }
      ],
      testimonialsList: [
        {
          id: '1',
          content: "The RHCE course at Tecentrix completely transformed my career. The hands-on lab sessions and real-world scenarios prepared me for challenges I now face daily. Within two months of certification, I secured a Senior Linux Administrator role with a 40% salary increase.",
          author: "Rajesh Kumar",
          role: "Senior Linux Administrator at TechSolutions",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          company: "TechSolutions"
        },
        {
          id: '2',
          content: "As someone transitioning from Windows administration, Tecentrix's RHCSA course provided the perfect foundation. The instructors were patient and highly knowledgeable. The 24/7 lab access helped me practice concepts even after class hours.",
          author: "Priya Sharma",
          role: "System Engineer at CloudWorks IT",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
          company: "CloudWorks IT"
        },
        {
          id: '3',
          content: "The Linux Security Specialist program is comprehensive and rigorous. It covers everything from basic hardening to advanced threat detection. The course material was up-to-date with current security practices, which is crucial in the security field.",
          author: "Mohammed Ali",
          role: "Information Security Analyst at SecureNet",
          avatar: "https://randomuser.me/api/portraits/men/62.jpg",
          company: "SecureNet"
        },
        {
          id: '4',
          content: "I've taken Linux courses from several training providers, but Tecentrix stands out. Their teaching methodology focusing on practical implementations made complex concepts accessible. The placement assistance helped me land a job at a top MNC.",
          author: "Kavita Desai",
          role: "DevOps Engineer at TechInnovate Solutions",
          avatar: "https://randomuser.me/api/portraits/women/26.jpg",
          company: "TechInnovate Solutions"
        }
      ],
      isSyncing: false,
      
      refreshContent: async () => {
        console.log("Refreshing content data...");
        
        // Check if Supabase is configured
        if (isSupabaseConfigured()) {
          set({ isSyncing: true });
          
          try {
            // Fetch from Supabase
            const { data: settings, error: settingsError } = await supabase
              .from('content_settings')
              .select('*')
              .order('created_at', { ascending: false })
              .limit(1)
              .single();
              
            if (settingsError) {
              console.error("Error fetching content settings:", settingsError);
            } else if (settings) {
              set(state => ({
                content: {
                  hero: settings.hero || state.content.hero,
                  courses: settings.courses || state.content.courses,
                  features: settings.features || state.content.features,
                  cta: settings.cta || state.content.cta,
                }
              }));
            }
            
            // Fetch courses
            const { data: courses, error: coursesError } = await supabase
              .from('courses')
              .select('*')
              .order('created_at', { ascending: false });
              
            if (coursesError) {
              console.error("Error fetching courses:", coursesError);
            } else if (courses) {
              set({ coursesList: courses });
            }
            
            // Fetch testimonials
            const { data: testimonials, error: testimonialsError } = await supabase
              .from('testimonials')
              .select('*')
              .order('created_at', { ascending: false });
              
            if (testimonialsError) {
              console.error("Error fetching testimonials:", testimonialsError);
            } else if (testimonials) {
              set({ testimonialsList: testimonials });
            }
          } catch (error) {
            console.error("Error refreshing content from Supabase:", error);
          } finally {
            set({ isSyncing: false });
          }
        } else {
          // Simply triggers a re-render by setting state to itself (local storage mode)
          set(state => ({ ...state }));
        }
      },
      
      setCoursesList: (courses) => set({ coursesList: courses }),
      setTestimonialsList: (testimonials) => set({ testimonialsList: testimonials }),
      
      updateHeroContent: async (heroContent) => {
        // Update local state first for immediate UI update
        set((state) => ({
          content: {
            ...state.content,
            hero: {
              ...state.content.hero,
              ...heroContent,
            },
          },
        }));
        
        // If Supabase is configured, update the remote data
        if (isSupabaseConfigured()) {
          try {
            const currentContent = get().content;
            const { data, error } = await supabase
              .from('content_settings')
              .upsert({
                id: '1', // Use a fixed ID for the content settings
                hero: {
                  ...currentContent.hero,
                  ...heroContent,
                },
                courses: currentContent.courses,
                features: currentContent.features,
                cta: currentContent.cta,
              })
              .select();
              
            if (error) {
              console.error("Error updating hero content:", error);
              toast.error("Failed to save hero content");
            }
          } catch (error) {
            console.error("Error updating hero content:", error);
          }
        }
      },
      
      updateCoursesContent: async (coursesContent) => {
        // Update local state
        set((state) => ({
          content: {
            ...state.content,
            courses: {
              ...state.content.courses,
              ...coursesContent,
            },
          },
        }));
        
        // Update Supabase if configured
        if (isSupabaseConfigured()) {
          try {
            const currentContent = get().content;
            const { error } = await supabase
              .from('content_settings')
              .upsert({
                id: '1',
                hero: currentContent.hero,
                courses: {
                  ...currentContent.courses,
                  ...coursesContent,
                },
                features: currentContent.features,
                cta: currentContent.cta,
              });
              
            if (error) {
              console.error("Error updating courses content:", error);
              toast.error("Failed to save courses content");
            }
          } catch (error) {
            console.error("Error updating courses content:", error);
          }
        }
      },
      
      updateFeaturesContent: async (featuresContent) => {
        // Update local state
        set((state) => ({
          content: {
            ...state.content,
            features: {
              ...state.content.features,
              ...featuresContent,
            },
          },
        }));
        
        // Update Supabase if configured
        if (isSupabaseConfigured()) {
          try {
            const currentContent = get().content;
            const { error } = await supabase
              .from('content_settings')
              .upsert({
                id: '1',
                hero: currentContent.hero,
                courses: currentContent.courses,
                features: {
                  ...currentContent.features,
                  ...featuresContent,
                },
                cta: currentContent.cta,
              });
              
            if (error) {
              console.error("Error updating features content:", error);
              toast.error("Failed to save features content");
            }
          } catch (error) {
            console.error("Error updating features content:", error);
          }
        }
      },
      
      updateCTAContent: async (ctaContent) => {
        // Update local state
        set((state) => ({
          content: {
            ...state.content,
            cta: {
              ...state.content.cta,
              ...ctaContent,
            },
          },
        }));
        
        // Update Supabase if configured
        if (isSupabaseConfigured()) {
          try {
            const currentContent = get().content;
            const { error } = await supabase
              .from('content_settings')
              .upsert({
                id: '1',
                hero: currentContent.hero,
                courses: currentContent.courses,
                features: currentContent.features,
                cta: {
                  ...currentContent.cta,
                  ...ctaContent,
                },
              });
              
            if (error) {
              console.error("Error updating CTA content:", error);
              toast.error("Failed to save CTA content");
            }
          } catch (error) {
            console.error("Error updating CTA content:", error);
          }
        }
      },
      
      addCourse: async (course) => {
        // Add to local state first for immediate UI update
        set((state) => ({
          coursesList: [...state.coursesList, course]
        }));
        
        // Add to Supabase if configured
        if (isSupabaseConfigured()) {
          try {
            const { error } = await supabase
              .from('courses')
              .insert(course);
              
            if (error) {
              console.error("Error adding course:", error);
              toast.error(`Failed to save course: ${error.message || 'Unknown error'}`);
              
              // If we encounter an error, we can log more details to help with debugging
              console.log("Course data that failed to save:", JSON.stringify(course, null, 2));
              
              // Optionally rollback the local state if needed
              // set((state) => ({
              //   coursesList: state.coursesList.filter(c => c.id !== course.id)
              // }));
            } else {
              toast.success("Course added successfully");
            }
          } catch (error: any) {
            console.error("Error adding course:", error);
            toast.error(`Failed to save course: ${error.message || 'Unknown error'}`);
          }
        }
      },
      
      updateCourse: async (id, updatedCourse) => {
        // Update local state first for immediate UI update
        set((state) => ({
          coursesList: state.coursesList.map(course => 
            course.id === id ? { ...course, ...updatedCourse } : course
          )
        }));
        
        // Update in Supabase if configured
        if (isSupabaseConfigured()) {
          try {
            const { error } = await supabase
              .from('courses')
              .update(updatedCourse)
              .eq('id', id);
              
            if (error) {
              console.error("Error updating course:", error);
              toast.error(`Failed to update course: ${error.message || 'Unknown error'}`);
              
              // Log more details for debugging
              console.log("Course update that failed:", JSON.stringify(updatedCourse, null, 2));
            } else {
              toast.success("Course updated successfully");
            }
          } catch (error: any) {
            console.error("Error updating course:", error);
            toast.error(`Failed to update course: ${error.message || 'Unknown error'}`);
          }
        }
      },
      
      deleteCourse: async (id) => {
        // Delete from local state
        set((state) => ({
          coursesList: state.coursesList.filter(course => course.id !== id)
        }));
        
        // Delete from Supabase if configured
        if (isSupabaseConfigured()) {
          try {
            const { error } = await supabase
              .from('courses')
              .delete()
              .eq('id', id);
              
            if (error) {
              console.error("Error deleting course:", error);
              toast.error("Failed to delete course");
            } else {
              toast.success("Course deleted successfully");
            }
          } catch (error) {
            console.error("Error deleting course:", error);
          }
        }
      },
      
      addTestimonial: async (testimonial) => {
        // Add to local state
        set((state) => ({
          testimonialsList: [...state.testimonialsList, testimonial]
        }));
        
        // Add to Supabase if configured
        if (isSupabaseConfigured()) {
          try {
            const { error } = await supabase
              .from('testimonials')
              .insert(testimonial);
              
            if (error) {
              console.error("Error adding testimonial:", error);
              toast.error("Failed to save testimonial");
            } else {
              toast.success("Testimonial added successfully");
            }
          } catch (error) {
            console.error("Error adding testimonial:", error);
          }
        }
      },
      
      updateTestimonial: async (id, updatedTestimonial) => {
        // Update local state
        set((state) => ({
          testimonialsList: state.testimonialsList.map(testimonial => 
            testimonial.id === id ? { ...testimonial, ...updatedTestimonial } : testimonial
          )
        }));
        
        // Update in Supabase if configured
        if (isSupabaseConfigured()) {
          try {
            const { error } = await supabase
              .from('testimonials')
              .update(updatedTestimonial)
              .eq('id', id);
              
            if (error) {
              console.error("Error updating testimonial:", error);
              toast.error("Failed to update testimonial");
            } else {
              toast.success("Testimonial updated successfully");
            }
          } catch (error) {
            console.error("Error updating testimonial:", error);
          }
        }
      },
      
      deleteTestimonial: async (id) => {
        // Delete from local state
        set((state) => ({
          testimonialsList: state.testimonialsList.filter(testimonial => testimonial.id !== id)
        }));
        
        // Delete from Supabase if configured
        if (isSupabaseConfigured()) {
          try {
            const { error } = await supabase
              .from('testimonials')
              .delete()
              .eq('id', id);
              
            if (error) {
              console.error("Error deleting testimonial:", error);
              toast.error("Failed to delete testimonial");
            } else {
              toast.success("Testimonial deleted successfully");
            }
          } catch (error) {
            console.error("Error deleting testimonial:", error);
          }
        }
      },
    }),
    {
      name: 'tecentrix-content',
    }
  )
);
