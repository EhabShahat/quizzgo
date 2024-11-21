import { InviteCode, Question, Score } from './database';

export interface Database {
  public: {
    Tables: {
      invite_codes: {
        Row: InviteCode;
        Insert: Omit<InviteCode, 'created_at' | 'used_at'>;
        Update: Partial<InviteCode>;
      };
      questions: {
        Row: Question;
        Insert: Omit<Question, 'id' | 'created_at'>;
        Update: Partial<Question>;
      };
      scores: {
        Row: Score;
        Insert: Omit<Score, 'id' | 'created_at'>;
        Update: Partial<Score>;
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

export type Tables = Database['public']['Tables'];
export type TableName = keyof Tables;
export type Row<T extends TableName> = Tables[T]['Row'];
export type Insert<T extends TableName> = Tables[T]['Insert'];
export type Update<T extends TableName> = Tables[T]['Update'];