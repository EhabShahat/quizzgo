import { create } from 'zustand';

interface QuizState {
  isEnabled: boolean;
  startTime: Date | null;
  endTime: Date | null;
  shuffleQuestions: boolean;
  setEnabled: (enabled: boolean) => void;
  setStartTime: (time: Date | null) => void;
  setEndTime: (time: Date | null) => void;
  setShuffleQuestions: (shuffle: boolean) => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  isEnabled: true,
  startTime: null,
  endTime: null,
  shuffleQuestions: false,
  setEnabled: (enabled) => set({ isEnabled: enabled }),
  setStartTime: (time) => set({ startTime: time }),
  setEndTime: (time) => set({ endTime: time }),
  setShuffleQuestions: (shuffle) => set({ shuffleQuestions: shuffle }),
}));