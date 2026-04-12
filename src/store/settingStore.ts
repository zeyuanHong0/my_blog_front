import { create } from "zustand";

import { setLocalStorage, getLocalStorage } from "@/utils/storage";

export type ThemeMode = "light" | "dark" | "system";

type settingState = {
  themeMode: ThemeMode;
  isDark: boolean;
  changeThemeMode: (themeMode: ThemeMode) => void;
};

const useSettingStore = create((set: any): settingState => {
  const initialThemeMode =
    (getLocalStorage("themeMode") as ThemeMode) || "light";

  const isSystemModeDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  const initialIsDark =
    initialThemeMode === "dark" ||
    (initialThemeMode === "system" && isSystemModeDark);

  // 初始化主题
  document.documentElement.classList.toggle("dark", initialIsDark);

  return {
    themeMode: initialThemeMode,
    isDark: initialIsDark,
    changeThemeMode: (themeMode: ThemeMode) => {
      const isSysDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      const newIsDark =
        themeMode === "dark" || (themeMode === "system" && isSysDark);
      document.documentElement.classList.toggle("dark", newIsDark);
      setLocalStorage("themeMode", themeMode);
      set({ themeMode, isDark: newIsDark });
    },
  };
});

// 监听操作系统主题变化
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    const currentMode = useSettingStore.getState().themeMode;
    if (currentMode === "system") {
      document.documentElement.classList.toggle("dark", e.matches);
      useSettingStore.setState({ isDark: e.matches });
    }
  });

export default useSettingStore;
