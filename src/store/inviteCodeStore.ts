import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import type { InviteCode } from '@/types/database';

interface InviteCodeStore {
  codes: InviteCode[];
  currentCode: InviteCode | null;
  addCode: (code: string, username: string) => Promise<void>;
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
      .from('invite_codes')
      .select('*');
    
    if (error) throw error;
    set({ codes: data as InviteCode[] });
  },

  addCode: async (code: string, username: string) => {
    const { error } = await supabase
      .from('invite_codes')
      .insert([{ code, username, used: false }]);

    if (error) throw error;
    await get().fetchCodes();
  },

  addCodes: async (newCodes: InviteCode[]) => {
    const { error } = await supabase
      .from('invite_codes')
      .insert(newCodes);

    if (error) throw error;
    await get().fetchCodes();
  },

  deleteCode: async (code: string) => {
    const { error } = await supabase
      .from('invite_codes')
      .delete()
      .eq('code', code);

    if (error) throw error;
    await get().fetchCodes();
  },

  deleteAllCodes: async () => {
    const { error } = await supabase
      .from('invite_codes')
      .delete()
      .neq('code', '');

    if (error) throw error;
    set({ codes: [] });
  },

  isValidCode: async (code: string) => {
    const { data, error } = await supabase
      .from('invite_codes')
      .select('used')
      .eq('code', code)
      .single();

    if (error) return false;
    return data ? !data.used : false;
  },

  markCodeAsUsed: async (code: string) => {
    const { error } = await supabase
      .from('invite_codes')
      .update({ used: true, used_at: new Date().toISOString() })
      .eq('code', code);

    if (error) throw error;
    await get().fetchCodes();
  },

  getInviteCodeDetails: async (code: string) => {
    const { data, error } = await supabase
      .from('invite_codes')
      .select('*')
      .eq('code', code)
      .single();

    if (error) return undefined;
    return data as InviteCode;
  },
}));