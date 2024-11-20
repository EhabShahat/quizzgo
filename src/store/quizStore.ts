import { create } from 'zustand';

interface QuizState {
  isEnabled: boolean;
  startTime: Date | null;
  setEnabled: (enabled: boolean) => void;
  setStartTime: (time: Date | null) => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  isEnabled: true,
  startTime: null,
  setEnabled: (enabled) => set({ isEnabled: enabled }),
  setStartTime: (time) => set({ startTime: time }),
}));