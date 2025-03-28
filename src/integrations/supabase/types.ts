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
      InviteCode: {
        Row: {
          code: string
          created_at: string | null
          participant_name: string | null
          used: boolean | null
          used_at: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          participant_name?: string | null
          used?: boolean | null
          used_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          participant_name?: string | null
          used?: boolean | null
          used_at?: string | null
        }
        Relationships: []
      }
      questions: {
        Row: {
          correct_answer: string
          created_at: string | null
          id: number
          options: string[]
          text: string
          time_limit: number
          type: string
        }
        Insert: {
          correct_answer: string
          created_at?: string | null
          id?: number
          options: string[]
          text: string
          time_limit?: number
          type?: string
        }
        Update: {
          correct_answer?: string
          created_at?: string | null
          id?: number
          options?: string[]
          text?: string
          time_limit?: number
          type?: string
        }
        Relationships: []
      }
      quiz_settings: {
        Row: {
          admin_password: string
          created_at: string | null
          end_time: string | null
          id: number
          is_enabled: boolean | null
          logo_url: string | null
          main_title: string | null
          shuffle_questions: boolean | null
          sound_enabled: boolean | null
          start_time: string | null
          updated_at: string | null
        }
        Insert: {
          admin_password?: string
          created_at?: string | null
          end_time?: string | null
          id?: number
          is_enabled?: boolean | null
          logo_url?: string | null
          main_title?: string | null
          shuffle_questions?: boolean | null
          sound_enabled?: boolean | null
          start_time?: string | null
          updated_at?: string | null
        }
        Update: {
          admin_password?: string
          created_at?: string | null
          end_time?: string | null
          id?: number
          is_enabled?: boolean | null
          logo_url?: string | null
          main_title?: string | null
          shuffle_questions?: boolean | null
          sound_enabled?: boolean | null
          start_time?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      scores: {
        Row: {
          correct_answers: number
          created_at: string | null
          id: number
          participant_name: string
          score: number
          total_questions: number
        }
        Insert: {
          correct_answers: number
          created_at?: string | null
          id?: number
          participant_name: string
          score: number
          total_questions: number
        }
        Update: {
          correct_answers?: number
          created_at?: string | null
          id?: number
          participant_name?: string
          score?: number
          total_questions?: number
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
