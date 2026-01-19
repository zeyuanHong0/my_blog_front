import { create } from "zustand";

import { setLocalStorage, getLocalStorage } from "@/utils/storage";

type settingState = {
  themeMode: "light" | "dark";
  changeThemeMode: () => void;
};

const useSettingStore = create((set: any): settingState => {
  return {
    themeMode: (getLocalStorage("themeMode") as "light" | "dark") || "light",

    changeThemeMode: () => {
      set((state: settingState) => {
        const newMode = state.themeMode === "light" ? "dark" : "light";
        document.documentElement.classList.toggle("dark", newMode === "dark");
        setLocalStorage("themeMode", newMode);
        return { themeMode: newMode };
      });
    },
  };
});

export default useSettingStore;
