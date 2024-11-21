import { create } from 'zustand';

export interface Score {
  username: string;
  participantName?: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
}

interface ScoresStore {
  scores: Score[];
  addScore: (score: Score) => void;
  updateScores: (scores: Score[]) => void;
}

export const useScoresStore = create<ScoresStore>((set) => ({
  scores: [],
  addScore: (score) => set((state) => ({ 
    scores: [...state.scores, score].sort((a, b) => b.score - a.score)
  })),
  updateScores: (scores) => set({ scores }),
}));