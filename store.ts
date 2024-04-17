import { create } from "zustand";

interface token {
  access: string,
  refresh: string,
  setAccess: (access: string) => void,
  setRefresh: (refresh: string) => void
}
export const tokenStore = create<token>((set) => ({
  access: '',
  refresh: '',
  setAccess: (acc: string) => {
    set((state) => ({ access: acc }));
  },
  setRefresh: (ref) => {
    set((state) => ({ refresh: ref }));
  }
}));
