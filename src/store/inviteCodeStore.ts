import { create } from 'zustand';

interface InviteCode {
  code: string;
  username: string;
  participantName?: string;
  used: boolean;
}

interface InviteCodeStore {
  codes: InviteCode[];
  currentCode: InviteCode | null;
  addCode: (code: string) => void;
  isValidCode: (code: string) => boolean;
  markCodeAsUsed: (code: string) => void;
  getInviteCodeDetails: (code: string) => InviteCode | undefined;
  setCurrentCode: (code: InviteCode) => void;
}

export const useInviteCodeStore = create<InviteCodeStore>((set, get) => ({
  codes: [
    { code: "ABC123", username: "Johannes", participantName: "Johannes", used: false },
    { code: "DEF456", username: "Jennie", participantName: "Jennie", used: false },
    { code: "GHI789", username: "Victoria", participantName: "Victoria", used: false },
    { code: "JKL012", username: "Winner", participantName: "Winner", used: false },
    { code: "MNO345", username: "iLNzeJ", participantName: "iLNzeJ", used: false }
  ],
  currentCode: null,
  addCode: (code) => 
    set((state) => ({
      codes: [...state.codes, { code, username: code, used: false }]
    })),
  isValidCode: (code) => {
    const foundCode = get().codes.find(c => c.code === code);
    return !!foundCode;
  },
  markCodeAsUsed: (code) => 
    set((state) => ({
      codes: state.codes.map(c => 
        c.code === code ? { ...c, used: true } : c
      )
    })),
  getInviteCodeDetails: (code) => 
    get().codes.find(c => c.code === code),
  setCurrentCode: (code) => 
    set({ currentCode: code }),
}));