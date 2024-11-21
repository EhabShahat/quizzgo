import { create } from 'zustand';

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
  addCode: (code: string, username: string) => void;
  addCodes: (codes: InviteCode[]) => void;
  removeCode: (code: string) => void;
  deleteCode: (code: string) => void;
  deleteAllCodes: () => void;
  isValidCode: (code: string) => boolean;
  markCodeAsUsed: (code: string) => void;
  getInviteCodeDetails: (code: string) => InviteCode | undefined;
}

export const useInviteCodeStore = create<InviteCodeStore>((set, get) => ({
  codes: [],
  addCode: (code, username) => 
    set(state => ({
      codes: [...state.codes, { 
        code, 
        used: false, 
        username,
        createdAt: new Date(),
        participantName: username
      }]
    })),
  addCodes: (newCodes) => 
    set(state => ({ 
      codes: [...state.codes, ...newCodes] 
    })),
  removeCode: (code) =>
    set(state => ({
      codes: state.codes.filter(c => c.code !== code)
    })),
  deleteCode: (code) =>
    set(state => ({
      codes: state.codes.filter(c => c.code !== code)
    })),
  deleteAllCodes: () => 
    set({ codes: [] }),
  isValidCode: (code) => {
    const state = get();
    const foundCode = state.codes.find(c => c.code === code);
    return foundCode ? !foundCode.used : false;
  },
  markCodeAsUsed: (code) =>
    set(state => ({
      codes: state.codes.map(c =>
        c.code === code ? { ...c, used: true, usedAt: new Date() } : c
      )
    })),
  getInviteCodeDetails: (code) => {
    const state = get();
    return state.codes.find(c => c.code === code);
  },
}));