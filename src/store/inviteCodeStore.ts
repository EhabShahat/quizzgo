import { create } from 'zustand';
import { supabase } from "@/integrations/supabase/client";

interface InviteCode {
  code: string;
  used: boolean;
  username: string;
  createdAt: Date;
  usedAt?: Date;
  participantName?: string;
}

interface InviteCodeStore {
  codes: InviteCode[];
  currentCode: InviteCode | null;
  fetchCodes: () => Promise<void>;
  addCode: (code: string, username: string) => Promise<void>;
  addCodes: (codes: InviteCode[]) => Promise<void>;
  deleteCode: (code: string) => Promise<void>;
  deleteAllCodes: () => Promise<void>;
  isValidCode: (code: string) => Promise<boolean>;
  markCodeAsUsed: (code: string) => Promise<void>;
  getInviteCodeDetails: (code: string) => Promise<InviteCode | undefined>;
}

export const useInviteCodeStore = create<InviteCodeStore>((set, get) => ({
  codes: [],
  currentCode: null,
  fetchCodes: async () => {
    const { data, error } = await supabase
      .from('invite_codes')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    set({ codes: data.map(code => ({
      ...code,
      createdAt: new Date(code.created_at),
      usedAt: code.used_at ? new Date(code.used_at) : undefined
    }))});
  },
  addCode: async (code, username) => {
    const { error } = await supabase
      .from('invite_codes')
      .insert([{ 
        code, 
        username,
        participant_name: username,
        used: false
      }]);
    
    if (error) throw error;
    await get().fetchCodes();
  },
  addCodes: async (newCodes) => {
    const { error } = await supabase
      .from('invite_codes')
      .insert(newCodes.map(code => ({
        code: code.code,
        username: code.username,
        participant_name: code.participantName,
        used: false
      })));
    
    if (error) throw error;
    await get().fetchCodes();
  },
  deleteCode: async (code) => {
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
  isValidCode: async (code) => {
    const { data, error } = await supabase
      .from('invite_codes')
      .select('used')
      .eq('code', code)
      .single();
    
    if (error) return false;
    return !data.used;
  },
  markCodeAsUsed: async (code) => {
    const { error } = await supabase
      .from('invite_codes')
      .update({ 
        used: true,
        used_at: new Date().toISOString()
      })
      .eq('code', code);
    
    if (error) throw error;
    
    const { data: codeDetails } = await supabase
      .from('invite_codes')
      .select('*')
      .eq('code', code)
      .single();
      
    if (codeDetails) {
      set({ 
        currentCode: {
          ...codeDetails,
          createdAt: new Date(codeDetails.created_at),
          usedAt: codeDetails.used_at ? new Date(codeDetails.used_at) : undefined
        }
      });
    }
    
    await get().fetchCodes();
  },
  getInviteCodeDetails: async (code) => {
    const { data, error } = await supabase
      .from('invite_codes')
      .select('*')
      .eq('code', code)
      .single();
    
    if (error) return undefined;
    return {
      ...data,
      createdAt: new Date(data.created_at),
      usedAt: data.used_at ? new Date(data.used_at) : undefined
    };
  },
}));