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
    set({ scores: data });
  },

  addScore: async (score) => {
    const newScore = {
      ...score,
      created_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from('scores')
      .insert([newScore]);

    if (error) throw error;
    await get().fetchScores();
  },

  updateScores: async (scores) => {
    const { error } = await supabase
      .from('scores')
      .upsert(scores.map(score => ({
        ...score,
        created_at: new Date().toISOString()
      })));

    if (error) throw error;
    await get().fetchScores();
  },
}));