import { create } from "zustand";

import { setLocalStorage, getLocalStorage } from "@/utils/storage";

type settingState = {
  themeMode: "light" | "dark";
  changeThemeMode: (event?: React.MouseEvent) => void;
};

const useSettingStore = create((set: any): settingState => {
  const initialThemeMode =
    (getLocalStorage("themeMode") as "light" | "dark") || "light";
  document.documentElement.classList.toggle(
    "dark",
    initialThemeMode === "dark",
  );
  return {
    themeMode: initialThemeMode,

    changeThemeMode: (event?: React.MouseEvent) => {
      const newMode =
        useSettingStore.getState().themeMode === "light" ? "dark" : "light";

      // 判断浏览器是否支持 api
      if (!document.startViewTransition) {
        document.documentElement.classList.toggle("dark", newMode === "dark");
        setLocalStorage("themeMode", newMode);
        set({ themeMode: newMode });
        return;
      }

      // 获取点击位置
      const x = event?.clientX ?? window.innerWidth / 2;
      const y = event?.clientY ?? window.innerHeight / 2;

      // 设置起点
      document.documentElement.style.setProperty("--x", `${x}px`);
      document.documentElement.style.setProperty("--y", `${y}px`);

      // 执行
      document.startViewTransition(() => {
        document.documentElement.classList.toggle("dark", newMode === "dark");
        setLocalStorage("themeMode", newMode);
        set({ themeMode: newMode });
      });
    },
  };
});

export default useSettingStore;
