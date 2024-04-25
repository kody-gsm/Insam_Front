import { create } from "zustand";

interface token {
  access: string,
  refresh: string,
  setAccess: (refresh: string) => void
  setRefresh: (refresh: string) => void
}
export const tokenStore = create<token>((set) => ({
  access: '',
  refresh: '',
  setRefresh: (ref) => {
    set((state) => ({ refresh: ref }));
  },
  setAccess: (ref) => {
    set((state) => ({ access: ref }));
  }
}));
