import { create } from 'zustand';

export interface Score {
  username: string;
  participantName?: string;
  score: number;
  outOf: number;
}

interface ScoresStore {
  scores: Score[];
  addScore: (score: Score) => void;
  getScores: () => Score[];
}

export const useScoresStore = create<ScoresStore>((set, get) => ({
  scores: [],
  addScore: (score) => set((state) => ({ 
    scores: [...state.scores, score] 
  })),
  getScores: () => get().scores,
}));