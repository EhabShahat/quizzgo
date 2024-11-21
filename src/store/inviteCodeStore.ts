import { create } from 'zustand';

interface InviteCode {
  code: string;
  used: boolean;
  username: string;
}

interface InviteCodeStore {
  codes: InviteCode[];
  addCode: (code: string, username: string) => void;
  removeCode: (code: string) => void;
  isValidCode: (code: string) => boolean;
  markCodeAsUsed: (code: string) => void;
  getInviteCodeDetails: (code: string) => InviteCode | undefined;
}

export const useInviteCodeStore = create<InviteCodeStore>((set, get) => ({
  codes: [],
  addCode: (code, username) => 
    set(state => ({
      codes: [...state.codes, { code, used: false, username }]
    })),
  removeCode: (code) =>
    set(state => ({
      codes: state.codes.filter(c => c.code !== code)
    })),
  isValidCode: (code) => {
    const state = get();
    const foundCode = state.codes.find(c => c.code === code);
    return foundCode ? !foundCode.used : false;
  },
  markCodeAsUsed: (code) =>
    set(state => ({
      codes: state.codes.map(c =>
        c.code === code ? { ...c, used: true } : c
      )
    })),
  getInviteCodeDetails: (code) => {
    const state = get();
    return state.codes.find(c => c.code === code);
  },
}));