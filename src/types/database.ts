
export interface InviteCode {
  code: string;
  used: boolean;
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
  participant_name: string;
  score: number;
  correct_answers: number;
  total_questions: number;
  created_at: string;
}

export interface QuizSettings {
  id: number;
  shuffle_questions: boolean;
  is_enabled: boolean;
  start_time: string | null;
  end_time: string | null;
  created_at: string;
  updated_at: string;
  sound_enabled: boolean;
  admin_password: string;
  main_title: string;
  logo_url: string;
}
