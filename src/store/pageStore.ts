
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PageState {
  pages: Page[];
  addPage: (page: Page) => void;
  updatePage: (id: string, page: Partial<Page>) => void;
  deletePage: (id: string) => void;
  togglePagePublishStatus: (id: string) => void;
}

export const usePageStore = create<PageState>()(
  persist(
    (set) => ({
      pages: [
        {
          id: '1',
          title: 'About Us',
          slug: 'about',
          content: `
# About Tecentrix

Tecentrix is a premier Linux training institution established in 2010, with a mission to create world-class Linux professionals through immersive, hands-on training.

## Our Journey

What started as a small training center with just 5 students has now grown into one of India's most respected Linux training institutes, with over 3000 successful alumni working in top technology companies worldwide.

## Our Approach

We believe in a practical approach to learning Linux. Our lab-intensive programs ensure that students spend more than 70% of their training time solving real-world challenges, making them job-ready from day one.

## Our Team

Our instructors are industry veterans with a minimum of 10 years of experience in Linux system administration, DevOps, and cloud technologies. All our trainers hold multiple Red Hat certifications and have worked with enterprise-grade Linux environments.
          `,
          isPublished: true,
          createdAt: '2023-07-15T10:30:00Z',
          updatedAt: '2023-08-20T14:45:00Z',
        },
        {
          id: '2',
          title: 'Contact Us',
          slug: 'contact',
          content: `
# Get in Touch

We'd love to hear from you! Whether you're interested in our courses, have questions about certification paths, or want to discuss corporate training options, our team is here to help.

## Office Location

Tecentrix Training Center
Level 5, Tech Park
Bangalore - 560037
Karnataka, India

## Contact Information

- **Phone**: +91 80 1234 5678
- **Email**: info@tecentrix.com
- **Training Inquiries**: training@tecentrix.com
- **Corporate Programs**: corporate@tecentrix.com

## Office Hours

Monday to Friday: 9:00 AM to 6:00 PM
Saturday: 10:00 AM to 2:00 PM (by appointment only)
Closed on Sundays and Public Holidays
          `,
          isPublished: true,
          createdAt: '2023-07-20T11:15:00Z',
          updatedAt: '2023-09-05T09:30:00Z',
        },
        {
          id: '3',
          title: 'Testimonials',
          slug: 'testimonials',
          content: `
# Student Testimonials

Our students are our greatest ambassadors. Hear what they have to say about their learning experience at Tecentrix.

## Success Stories

From career changers to experienced professionals seeking to advance their skills, our alumni have gone on to work at top technology companies across the globe. Many have seen significant career growth and salary increases after completing our certification programs.

## Industry Recognition

Our training methodologies and quality of instruction have been recognized by leading technology companies and certification bodies worldwide. We pride ourselves on maintaining high standards that prepare our students for real-world challenges.
          `,
          isPublished: true,
          createdAt: '2023-09-10T08:45:00Z',
          updatedAt: '2023-09-10T08:45:00Z',
        }
      ],
      addPage: (page) => 
        set((state) => ({
          pages: [...state.pages, page]
        })),
      updatePage: (id, updatedPage) => 
        set((state) => ({
          pages: state.pages.map(page => 
            page.id === id 
              ? { 
                  ...page, 
                  ...updatedPage, 
                  updatedAt: new Date().toISOString() 
                } 
              : page
          )
        })),
      deletePage: (id) => 
        set((state) => ({
          pages: state.pages.filter(page => page.id !== id)
        })),
      togglePagePublishStatus: (id) => 
        set((state) => ({
          pages: state.pages.map(page => 
            page.id === id 
              ? { 
                  ...page, 
                  isPublished: !page.isPublished,
                  updatedAt: new Date().toISOString() 
                } 
              : page
          )
        })),
    }),
    {
      name: 'tecentrix-pages',
    }
  )
);
