export interface InviteCode {
  code: string;
  used: boolean;
  username: string;
  participant_name: string | null;
  created_at: Date;
  used_at?: Date;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correct_answer: string;
  time_limit: number;
  type: 'multiple-choice' | 'true-false';
  created_at: Date;
}

export interface Score {
  id: number;
  username: string;
  participant_name: string | null;
  score: number;
  correct_answers: number;
  total_questions: number;
  created_at: Date;
}