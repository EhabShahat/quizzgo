import { create } from 'zustand';
import { supabase } from "@/integrations/supabase/client";

export interface Score {
  id?: number;
  username: string;
  participant_name?: string;
  score: number;
  correct_answers: number;
  total_questions: number;
  created_at?: string;
}

interface ScoresStore {
  scores: Score[];
  fetchScores: () => Promise<void>;
  addScore: (score: Score) => Promise<void>;
  updateScores: (scores: Score[]) => Promise<void>;
}

export const useScoresStore = create<ScoresStore>((set) => ({
  scores: [],
  fetchScores: async () => {
    const { data, error } = await supabase
      .from('scores')
      .select('*')
      .order('score', { ascending: false });
    
    if (error) throw error;
    set({ scores: data });
  },
  addScore: async (score) => {
    const { error } = await supabase
      .from('scores')
      .insert([{
        username: score.username,
        participant_name: score.participant_name,
        score: score.score,
        correct_answers: score.correct_answers,
        total_questions: score.total_questions
      }]);
    
    if (error) throw error;
    
    const { data: updatedScores } = await supabase
      .from('scores')
      .select('*')
      .order('score', { ascending: false });
      
    if (updatedScores) {
      set({ scores: updatedScores });
    }
  },
  updateScores: async (scores) => {
    const { error } = await supabase
      .from('scores')
      .insert(scores.map(score => ({
        username: score.username,
        participant_name: score.participant_name,
        score: score.score,
        correct_answers: score.correct_answers,
        total_questions: score.total_questions
      })));
    
    if (error) throw error;
    set({ scores });
  },
}));