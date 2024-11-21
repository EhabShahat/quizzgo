import { create } from 'zustand';

interface InviteCode {
  code: string;
  used: boolean;
  createdAt: Date;
  usedAt?: Date;
  participantName?: string;
}

interface InviteCodeStore {
  codes: InviteCode[];
  addCode: (code: InviteCode) => void;
  addCodes: (codes: InviteCode[]) => void;
  markCodeAsUsed: (code: string) => void;
  deleteCode: (code: string) => void;
  deleteAllCodes: () => void;
  isValidCode: (code: string) => boolean;
}

export const useInviteCodeStore = create<InviteCodeStore>((set, get) => ({
  codes: [],
  addCode: (code) => set((state) => ({ codes: [...state.codes, code] })),
  addCodes: (newCodes) => set((state) => ({ codes: [...state.codes, ...newCodes] })),
  markCodeAsUsed: (code) =>
    set((state) => ({
      codes: state.codes.map((c) =>
        c.code === code ? { ...c, used: true, usedAt: new Date() } : c
      ),
    })),
  deleteCode: (code) =>
    set((state) => ({
      codes: state.codes.filter((c) => c.code !== code),
    })),
  deleteAllCodes: () => set({ codes: [] }),
  isValidCode: (code) => {
    const foundCode = get().codes.find((c) => c.code === code);
    return foundCode ? !foundCode.used : false;
  },
}));