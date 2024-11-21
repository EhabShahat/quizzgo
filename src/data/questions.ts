export interface Question {
  id?: number;
  text: string;
  options: string[];
  correct_answer: string;
  time_limit: number;
  type: string;
  created_at?: string;
}
