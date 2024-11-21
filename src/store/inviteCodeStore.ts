import { create } from 'zustand';

export interface InviteCode {
  code: string;
  username: string;
  participantName?: string;
  used: boolean;
  createdAt: Date;
  usedAt?: Date;
}

interface InviteCodeStore {
  codes: InviteCode[];
  currentCode: InviteCode | null;
  addCode: (code: string, username: string) => void;
  addCodes: (codes: InviteCode[]) => void;
  deleteCode: (code: string) => void;
  deleteAllCodes: () => void;
  isValidCode: (code: string) => boolean;
  markCodeAsUsed: (code: string) => void;
  getInviteCodeDetails: (code: string) => InviteCode | undefined;
  setCurrentCode: (code: InviteCode) => void;
}

export const useInviteCodeStore = create<InviteCodeStore>((set, get) => ({
  codes: [
    { 
      code: "ABC123", 
      username: "Johannes", 
      participantName: "Johannes", 
      used: false,
      createdAt: new Date()
    },
    { 
      code: "DEF456", 
      username: "Jennie", 
      participantName: "Jennie", 
      used: false,
      createdAt: new Date()
    },
    { 
      code: "GHI789", 
      username: "Victoria", 
      participantName: "Victoria", 
      used: false,
      createdAt: new Date()
    },
    { 
      code: "JKL012", 
      username: "Winner", 
      participantName: "Winner", 
      used: false,
      createdAt: new Date()
    },
    { 
      code: "MNO345", 
      username: "iLNzeJ", 
      participantName: "iLNzeJ", 
      used: false,
      createdAt: new Date()
    }
  ],
  currentCode: null,
  addCode: (code, username) => 
    set((state) => ({
      codes: [...state.codes, { 
        code, 
        username, 
        used: false, 
        createdAt: new Date() 
      }]
    })),
  addCodes: (newCodes) => 
    set((state) => ({
      codes: [...state.codes, ...newCodes]
    })),
  deleteCode: (codeToDelete) => 
    set((state) => ({
      codes: state.codes.filter(c => c.code !== codeToDelete)
    })),
  deleteAllCodes: () => 
    set({ codes: [] }),
  isValidCode: (code) => {
    const foundCode = get().codes.find(c => c.code === code);
    return !!foundCode;
  },
  markCodeAsUsed: (code) => 
    set((state) => ({
      codes: state.codes.map(c => 
        c.code === code ? { ...c, used: true, usedAt: new Date() } : c
      )
    })),
  getInviteCodeDetails: (code) => 
    get().codes.find(c => c.code === code),
  setCurrentCode: (code) => 
    set({ currentCode: code }),
}));