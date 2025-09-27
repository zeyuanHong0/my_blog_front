import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// admin使用 store
// import { useNavStore } from '@/store/nav';

// 用于front端导航高亮
export function useActiveNav(navList: { label: string; path: string }[]) {
  // 如果是admin，更新 store
  // const navStore = useNavStore();
  // navStore.setNav(match?.path || '');

  const location = useLocation();
  const [active, setActive] = useState("");

  useEffect(() => {
    const currentPath = location.pathname;

    // 找到匹配的 nav
    const match = navList.find(
      (nav) =>
        currentPath === nav.path || currentPath.startsWith(nav.path + "/"),
    );
    setActive(match?.path || "");
  }, [location.pathname, navList]);

  const isActive = (path: string) => active === path;

  return { active, isActive };
}
