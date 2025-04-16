export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      content_settings: {
        Row: {
          courses: Json
          created_at: string
          cta: Json
          features: Json
          hero: Json
          id: string
        }
        Insert: {
          courses: Json
          created_at?: string
          cta: Json
          features: Json
          hero: Json
          id: string
        }
        Update: {
          courses?: Json
          created_at?: string
          cta?: Json
          features?: Json
          hero?: Json
          id?: string
        }
        Relationships: []
      }
      courses: {
        Row: {
          batch_details: Json | null
          color: string
          created_at: string
          curriculum: Json | null
          description: string
          duration: string
          enabled: boolean
          highlighted: boolean
          icon: string
          iconBg: string
          iconColor: string
          id: string
          language: string | null
          level: string
          modules: string[]
          paymentLink: string | null
          price: string
          title: string
          upcomingBatches: string[] | null
        }
        Insert: {
          batch_details?: Json | null
          color: string
          created_at?: string
          curriculum?: Json | null
          description: string
          duration: string
          enabled?: boolean
          highlighted?: boolean
          icon: string
          iconBg: string
          iconColor: string
          id?: string
          language?: string | null
          level: string
          modules: string[]
          paymentLink?: string | null
          price: string
          title: string
          upcomingBatches?: string[] | null
        }
        Update: {
          batch_details?: Json | null
          color?: string
          created_at?: string
          curriculum?: Json | null
          description?: string
          duration?: string
          enabled?: boolean
          highlighted?: boolean
          icon?: string
          iconBg?: string
          iconColor?: string
          id?: string
          language?: string | null
          level?: string
          modules?: string[]
          paymentLink?: string | null
          price?: string
          title?: string
          upcomingBatches?: string[] | null
        }
        Relationships: []
      }
      leadership_team: {
        Row: {
          bio: string
          created_at: string
          id: string
          image_url: string
          name: string
          role: string
          updated_at: string
        }
        Insert: {
          bio: string
          created_at?: string
          id?: string
          image_url: string
          name: string
          role: string
          updated_at?: string
        }
        Update: {
          bio?: string
          created_at?: string
          id?: string
          image_url?: string
          name?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      section_content: {
        Row: {
          content: Json
          id: string
          section: string
          updated_at: string
        }
        Insert: {
          content: Json
          id?: string
          section: string
          updated_at?: string
        }
        Update: {
          content?: Json
          id?: string
          section?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          id: string
          name: string
          updated_at: string
          value: Json
        }
        Insert: {
          id?: string
          name: string
          updated_at?: string
          value: Json
        }
        Update: {
          id?: string
          name?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          author: string
          avatar: string
          company: string
          content: string
          created_at: string
          id: string
          role: string
        }
        Insert: {
          author: string
          avatar: string
          company: string
          content: string
          created_at?: string
          id?: string
          role: string
        }
        Update: {
          author?: string
          avatar?: string
          company?: string
          content?: string
          created_at?: string
          id?: string
          role?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
