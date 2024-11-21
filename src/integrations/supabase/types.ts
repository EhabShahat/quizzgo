// Database types
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Split into smaller type definitions for better organization
export type InviteCode = {
  code: string;
  used: boolean;
  username: string;
  participant_name: string | null;
  created_at: string | null;
  used_at: string | null;
};

export type Question = {
  id: number;
  text: string;
  options: string[];
  correct_answer: string;
  time_limit: number;
  type: string;
  created_at: string | null;
};

export type Score = {
  id: number;
  username: string;
  participant_name: string | null;
  score: number;
  correct_answers: number;
  total_questions: number;
  created_at: string | null;
};

// Database schema types
export type Tables = {
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

// Helper types for better type inference
export type TableName = keyof Tables;
export type Row<T extends TableName> = Tables[T]['Row'];
export type Insert<T extends TableName> = Tables[T]['Insert'];
export type Update<T extends TableName> = Tables[T]['Update'];