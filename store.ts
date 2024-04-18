import { create } from "zustand";

interface token {
  refresh: string,
  setRefresh: (refresh: string) => void
}
export const tokenStore = create<token>((set) => ({
  refresh: '',
  setRefresh: (ref) => {
    set((state) => ({ refresh: ref }));
  }
}));
