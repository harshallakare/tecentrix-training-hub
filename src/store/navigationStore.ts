
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface NavItem {
  id: string;
  label: string;
  path: string;
  enabled: boolean;
  isNew?: boolean;
}

interface NavigationState {
  navItems: NavItem[];
  updateNavItems: (items: NavItem[]) => void;
}

export const useNavigationStore = create<NavigationState>()(
  persist(
    (set) => ({
      navItems: [
        { id: '1', label: 'Home', path: '/', enabled: true },
        { id: '2', label: 'Courses', path: '/courses', enabled: true },
        { id: '3', label: 'About', path: '/about', enabled: true },
        { id: '4', label: 'Testimonials', path: '/testimonials', enabled: true },
        { id: '5', label: 'Contact', path: '/contact', enabled: true },
      ],
      updateNavItems: (items) => set({ navItems: items }),
    }),
    {
      name: 'tecentrix-navigation',
    }
  )
);
