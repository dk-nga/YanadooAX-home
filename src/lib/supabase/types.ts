export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      education_stats: {
        Row: {
          created_at: string
          display_order: number
          id: string
          is_active: boolean
          stat_key: string
          stat_label: string
          stat_suffix: string | null
          stat_value: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          id?: string
          is_active?: boolean
          stat_key: string
          stat_label: string
          stat_suffix?: string | null
          stat_value: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          is_active?: boolean
          stat_key?: string
          stat_label?: string
          stat_suffix?: string | null
          stat_value?: string
          updated_at?: string
        }
        Relationships: []
      }
      inquiries: {
        Row: {
          additional_info: string | null
          ai_interests: string[] | null
          ai_level: string | null
          ai_status: string | null
          budget: string | null
          company: string
          company_type: string | null
          created_at: string
          department: string | null
          download_file: string | null
          email: string
          employee_count: string | null
          id: string
          inquiry_type: string
          ip_address: string | null
          marketing_agreed: boolean
          message: string | null
          name: string
          pain_points: string[] | null
          phone: string | null
          position: string | null
          privacy_agreed: boolean
          source_url: string | null
          target_areas: string[] | null
          timeline: string | null
          topic: string | null
          user_agent: string | null
          visit_path: string | null
        }
        Insert: {
          additional_info?: string | null
          ai_interests?: string[] | null
          ai_level?: string | null
          ai_status?: string | null
          budget?: string | null
          company: string
          company_type?: string | null
          created_at?: string
          department?: string | null
          download_file?: string | null
          email: string
          employee_count?: string | null
          id?: string
          inquiry_type: string
          ip_address?: string | null
          marketing_agreed?: boolean
          message?: string | null
          name: string
          pain_points?: string[] | null
          phone?: string | null
          position?: string | null
          privacy_agreed?: boolean
          source_url?: string | null
          target_areas?: string[] | null
          timeline?: string | null
          topic?: string | null
          user_agent?: string | null
          visit_path?: string | null
        }
        Update: {
          additional_info?: string | null
          ai_interests?: string[] | null
          ai_level?: string | null
          ai_status?: string | null
          budget?: string | null
          company?: string
          company_type?: string | null
          created_at?: string
          department?: string | null
          download_file?: string | null
          email?: string
          employee_count?: string | null
          id?: string
          inquiry_type?: string
          ip_address?: string | null
          marketing_agreed?: boolean
          message?: string | null
          name?: string
          pain_points?: string[] | null
          phone?: string | null
          position?: string | null
          privacy_agreed?: boolean
          source_url?: string | null
          target_areas?: string[] | null
          timeline?: string | null
          topic?: string | null
          user_agent?: string | null
          visit_path?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          author_avatar_url: string | null
          author_company_size: string | null
          author_name: string
          author_title: string
          category: string
          content: string
          created_at: string
          display_order: number
          id: string
          is_active: boolean
          language: string
          subtitle: string
          title: string
          updated_at: string
        }
        Insert: {
          author_avatar_url?: string | null
          author_company_size?: string | null
          author_name: string
          author_title: string
          category?: string
          content: string
          created_at?: string
          display_order?: number
          id?: string
          is_active?: boolean
          language?: string
          subtitle: string
          title: string
          updated_at?: string
        }
        Update: {
          author_avatar_url?: string | null
          author_company_size?: string | null
          author_name?: string
          author_title?: string
          category?: string
          content?: string
          created_at?: string
          display_order?: number
          id?: string
          is_active?: boolean
          language?: string
          subtitle?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
