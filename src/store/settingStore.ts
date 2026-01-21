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

      console.log("🚀 ~ event?.clientX:", event?.clientX);
      console.log("🚀 ~ event?.clientY:", event?.clientY);

      // 获取点击位置
      const x = event?.clientX ?? window.innerWidth / 2;
      const y = event?.clientY ?? window.innerHeight / 2;

      // 设置起点
      // dark => light: 从左下角开始
      // light => dark: 从点击位置开始
      if (newMode === "dark") {
        document.documentElement.style.setProperty("--x", `${x}px`);
        document.documentElement.style.setProperty("--y", `${y}px`);
      } else {
        document.documentElement.style.setProperty("--x", "0px");
        document.documentElement.style.setProperty(
          "--y",
          `${window.innerHeight}px`,
        );
      }

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
