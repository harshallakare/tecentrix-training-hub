
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

interface ContentState {
  content: {
    hero: HeroContent;
    courses: CoursesContent;
    features: FeaturesContent;
    cta: CTAContent;
  };
  updateHeroContent: (heroContent: Partial<HeroContent>) => void;
  updateCoursesContent: (coursesContent: Partial<CoursesContent>) => void;
  updateFeaturesContent: (featuresContent: Partial<FeaturesContent>) => void;
  updateCTAContent: (ctaContent: Partial<CTAContent>) => void;
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
    }),
    {
      name: 'tecentrix-content',
    }
  )
);
