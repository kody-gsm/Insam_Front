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

interface windowInnerWidth {
  wid: null | number,
  setWid: (wid: number) => void
}

export const widthStore = create<windowInnerWidth>((set) => ({
  wid: null,
  setWid: (w) => set((state) => ({ wid: w }))
}))