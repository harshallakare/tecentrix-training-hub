export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      courses: {
        Row: {
          id: string;
          title: string;
          level: string;
          duration: string;
          description: string;
          modules: string[];
          highlighted: boolean;
          enabled: boolean;
          color: string;
          iconBg: string;
          iconColor: string;
          price: string;
          upcomingBatches: string[];
          language?: string;
          paymentLink?: string;
          icon: string;
          created_at?: string;
          curriculum?: Json; // Added curriculum field
        };
        Insert: Omit<Database['public']['Tables']['courses']['Row'], 'created_at'>;
        Update: Partial<Database['public']['Tables']['courses']['Row']>;
      };
      testimonials: {
        Row: {
          id: string;
          content: string;
          author: string;
          role: string;
          avatar: string;
          company: string;
          created_at?: string;
        };
        Insert: Omit<Database['public']['Tables']['testimonials']['Row'], 'created_at'>;
        Update: Partial<Database['public']['Tables']['testimonials']['Row']>;
      };
      content_settings: {
        Row: {
          id: string;
          hero: Json;
          courses: Json;
          features: Json;
          cta: Json;
          created_at?: string;
        };
        Insert: Omit<Database['public']['Tables']['content_settings']['Row'], 'created_at'>;
        Update: Partial<Database['public']['Tables']['content_settings']['Row']>;
      };
      leadership_team: {
        Row: {
          id: string;
          name: string;
          role: string;
          bio: string;
          image_url: string;
          created_at?: string;
          updated_at?: string;
        };
        Insert: Omit<Database['public']['Tables']['leadership_team']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['leadership_team']['Row']>;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
