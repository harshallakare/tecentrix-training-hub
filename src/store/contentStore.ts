
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

interface Course {
  id: string;
  icon: string;
  title: string;
  level: string;
  duration: string;
  description: string;
  modules: string[];
  highlighted: boolean;
  color: string;
  iconBg: string;
  iconColor: string;
  price: string;
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
    (set) => ({
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
          color: "bg-blue-50",
          iconBg: "bg-blue-100",
          iconColor: "text-tecentrix-blue",
          price: "₹35,000"
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
          color: "bg-orange-50",
          iconBg: "bg-orange-100",
          iconColor: "text-tecentrix-orange",
          price: "₹45,000"
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
          color: "bg-green-50",
          iconBg: "bg-green-100",
          iconColor: "text-green-600",
          price: "₹40,000"
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
          color: "bg-purple-50",
          iconBg: "bg-purple-100",
          iconColor: "text-purple-600",
          price: "₹50,000"
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
      updateHeroContent: (heroContent) => 
        set((state) => ({
          content: {
            ...state.content,
            hero: {
              ...state.content.hero,
              ...heroContent,
            },
          },
        })),
      updateCoursesContent: (coursesContent) => 
        set((state) => ({
          content: {
            ...state.content,
            courses: {
              ...state.content.courses,
              ...coursesContent,
            },
          },
        })),
      updateFeaturesContent: (featuresContent) => 
        set((state) => ({
          content: {
            ...state.content,
            features: {
              ...state.content.features,
              ...featuresContent,
            },
          },
        })),
      updateCTAContent: (ctaContent) => 
        set((state) => ({
          content: {
            ...state.content,
            cta: {
              ...state.content.cta,
              ...ctaContent,
            },
          },
        })),
      addCourse: (course) =>
        set((state) => ({
          coursesList: [...state.coursesList, course]
        })),
      updateCourse: (id, updatedCourse) =>
        set((state) => ({
          coursesList: state.coursesList.map(course => 
            course.id === id ? { ...course, ...updatedCourse } : course
          )
        })),
      deleteCourse: (id) =>
        set((state) => ({
          coursesList: state.coursesList.filter(course => course.id !== id)
        })),
      addTestimonial: (testimonial) =>
        set((state) => ({
          testimonialsList: [...state.testimonialsList, testimonial]
        })),
      updateTestimonial: (id, updatedTestimonial) =>
        set((state) => ({
          testimonialsList: state.testimonialsList.map(testimonial => 
            testimonial.id === id ? { ...testimonial, ...updatedTestimonial } : testimonial
          )
        })),
      deleteTestimonial: (id) =>
        set((state) => ({
          testimonialsList: state.testimonialsList.filter(testimonial => testimonial.id !== id)
        })),
    }),
    {
      name: 'tecentrix-content',
    }
  )
);
