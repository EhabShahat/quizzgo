export interface Question {
  id?: number;
  text: string;
  options: string[];
  correct_answer: string;
  time_limit: number;
  type: 'multiple-choice' | 'true-false';
  created_at?: string;
}