import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import type { InviteCode } from '@/types/database';

interface InviteCodeStore {
  codes: InviteCode[];
  currentCode: InviteCode | null;
  addCode: (code: string, participant_name?: string) => Promise<void>;
  addCodes: (newCodes: InviteCode[]) => Promise<void>;
  deleteCode: (code: string) => Promise<void>;
  deleteAllCodes: () => Promise<void>;
  isValidCode: (code: string) => Promise<boolean>;
  markCodeAsUsed: (code: string) => Promise<void>;
  getInviteCodeDetails: (code: string) => Promise<InviteCode | undefined>;
  fetchCodes: () => Promise<void>;
}

export const useInviteCodeStore = create<InviteCodeStore>((set, get) => ({
  codes: [],
  currentCode: null,

  fetchCodes: async () => {
    const { data, error } = await supabase
      .from('InviteCode')
      .select('*');
    
    if (error) throw error;
    set({ codes: data || [] });
  },

  addCode: async (code: string, participant_name?: string) => {
    const newCode: Omit<InviteCode, 'created_at'> = {
      code,
      participant_name: participant_name || null,
      used: false,
      used_at: null
    };

    const { error } = await supabase
      .from('InviteCode')
      .insert([newCode]);

    if (error) throw error;
    await get().fetchCodes();
  },

  addCodes: async (newCodes: InviteCode[]) => {
    const { error } = await supabase
      .from('InviteCode')
      .insert(newCodes.map(code => ({
        ...code,
        created_at: new Date().toISOString()
      })));

    if (error) throw error;
    await get().fetchCodes();
  },

  deleteCode: async (code: string) => {
    const { error } = await supabase
      .from('InviteCode')
      .delete()
      .eq('code', code);

    if (error) throw error;
    await get().fetchCodes();
  },

  deleteAllCodes: async () => {
    const { error } = await supabase
      .from('InviteCode')
      .delete()
      .neq('code', '');

    if (error) throw error;
    set({ codes: [] });
  },

  isValidCode: async (code: string) => {
    const { data, error } = await supabase
      .from('InviteCode')
      .select('used')
      .eq('code', code)
      .single();

    if (error) return false;
    return data ? !data.used : false;
  },

  markCodeAsUsed: async (code: string) => {
    const { error } = await supabase
      .from('InviteCode')
      .update({ used: true, used_at: new Date().toISOString() })
      .eq('code', code);

    if (error) throw error;
    await get().fetchCodes();
  },

  getInviteCodeDetails: async (code: string) => {
    const { data, error } = await supabase
      .from('InviteCode')
      .select('*')
      .eq('code', code)
      .single();

    if (error) return undefined;
    return data as InviteCode;
  },
}));