export interface InviteCode {
  code: string;
  used: boolean;
  username: string | null;
  participant_name: string | null;
  created_at: string;
  used_at: string | null;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correct_answer: string;
  time_limit: number;
  type: 'multiple-choice' | 'true-false';
  created_at: string;
}

export interface Score {
  id: number;
  username: string;
  participant_name: string | null;
  score: number;
  correct_answers: number;
  total_questions: number;
  created_at: string;
}