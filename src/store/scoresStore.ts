import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import type { Score } from '@/types/database';

interface ScoresStore {
  scores: Score[];
  addScore: (score: Omit<Score, 'id' | 'created_at'>) => Promise<void>;
  updateScores: (scores: Score[]) => Promise<void>;
  fetchScores: () => Promise<void>;
}

export const useScoresStore = create<ScoresStore>((set, get) => ({
  scores: [],

  fetchScores: async () => {
    const { data, error } = await supabase
      .from('scores')
      .select('*')
      .order('score', { ascending: false });
    
    if (error) throw error;
    set({ scores: data as Score[] });
  },

  addScore: async (score) => {
    const { error } = await supabase
      .from('scores')
      .insert([score]);

    if (error) throw error;
    await get().fetchScores();
  },

  updateScores: async (scores) => {
    const { error } = await supabase
      .from('scores')
      .upsert(scores);

    if (error) throw error;
    await get().fetchScores();
  },
}));