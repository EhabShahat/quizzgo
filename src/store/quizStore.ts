import { create } from 'zustand';
import { supabase } from "@/integrations/supabase/client";
import type { Question } from '@/data/questions';

interface QuizState {
  isEnabled: boolean;
  startTime: Date | null;
  endTime: Date | null;
  shuffleQuestions: boolean;
  setEnabled: (enabled: boolean) => void;
  setStartTime: (time: Date | null) => void;
  setEndTime: (time: Date | null) => void;
  setShuffleQuestions: (shuffle: boolean) => void;
  fetchQuestions: () => Promise<Question[]>;
  addQuestion: (question: Omit<Question, 'id'>) => Promise<void>;
  updateQuestion: (id: number, question: Partial<Question>) => Promise<void>;
  deleteQuestion: (id: number) => Promise<void>;
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
  fetchQuestions: async () => {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .order('id', { ascending: true });
    
    if (error) throw error;
    return data as Question[];
  },
  addQuestion: async (question) => {
    const { error } = await supabase
      .from('questions')
      .insert([question]);
    
    if (error) throw error;
  },
  updateQuestion: async (id, question) => {
    const { error } = await supabase
      .from('questions')
      .update(question)
      .eq('id', id);
    
    if (error) throw error;
  },
  deleteQuestion: async (id) => {
    const { error } = await supabase
      .from('questions')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },
}));