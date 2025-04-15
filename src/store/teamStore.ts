
import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image_url: string;
  created_at?: string;
  updated_at?: string;
}

interface TeamState {
  teamMembers: TeamMember[];
  isLoading: boolean;
  error: string | null;
  fetchTeamMembers: () => Promise<void>;
  addTeamMember: (member: Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>) => Promise<boolean>;
  updateTeamMember: (id: string, member: Partial<TeamMember>) => Promise<boolean>;
  deleteTeamMember: (id: string) => Promise<boolean>;
}

export const useTeamStore = create<TeamState>((set, get) => ({
  teamMembers: [],
  isLoading: false,
  error: null,

  fetchTeamMembers: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('leadership_team')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      set({ teamMembers: data, isLoading: false });
    } catch (error: any) {
      console.error('Error fetching team members:', error);
      set({ error: error.message, isLoading: false });
      toast.error('Failed to load team members');
    }
  },

  addTeamMember: async (member) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('leadership_team')
        .insert(member)
        .select()
        .single();

      if (error) throw error;

      // Update local state with the new member
      set((state) => ({
        teamMembers: [...state.teamMembers, data],
        isLoading: false
      }));
      
      toast.success('Team member added successfully');
      return true;
    } catch (error: any) {
      console.error('Error adding team member:', error);
      set({ error: error.message, isLoading: false });
      toast.error('Failed to add team member');
      return false;
    }
  },

  updateTeamMember: async (id, member) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('leadership_team')
        .update(member)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      // Update local state with the updated member
      set((state) => ({
        teamMembers: state.teamMembers.map((m) => (m.id === id ? data : m)),
        isLoading: false
      }));
      
      toast.success('Team member updated successfully');
      return true;
    } catch (error: any) {
      console.error('Error updating team member:', error);
      set({ error: error.message, isLoading: false });
      toast.error('Failed to update team member');
      return false;
    }
  },

  deleteTeamMember: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase
        .from('leadership_team')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Update local state by removing the deleted member
      set((state) => ({
        teamMembers: state.teamMembers.filter((m) => m.id !== id),
        isLoading: false
      }));
      
      toast.success('Team member removed successfully');
      return true;
    } catch (error: any) {
      console.error('Error deleting team member:', error);
      set({ error: error.message, isLoading: false });
      toast.error('Failed to delete team member');
      return false;
    }
  }
}));
