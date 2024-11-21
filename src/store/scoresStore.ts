import { create } from 'zustand';
import { supabase } from "@/integrations/supabase/client";

export interface Score {
  username: string;
  participantName?: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
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
      .insert([score]);
    
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
      .insert(scores);
    
    if (error) throw error;
    set({ scores });
  },
}));