import { create } from "zustand";

export type AuthView = "login" | "register" | "forgetPassword";

type AuthDialogState = {
  isOpen: boolean;
  view: AuthView;
  openDialog: (view?: AuthView) => void;
  closeDialog: () => void;
  setView: (view: AuthView) => void;
};

const useAuthDialogStore = create((set: any): AuthDialogState => {
  return {
    isOpen: false,
    view: "login",
    openDialog: (view?: AuthView) => set({ isOpen: true, view: view || "login" }),
    closeDialog: () => set({ isOpen: false }),
    setView: (view: AuthView) => set({ view }),
  };
});

export default useAuthDialogStore;
