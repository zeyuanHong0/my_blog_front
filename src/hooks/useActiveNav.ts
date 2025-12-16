import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface NavItem {
  label: string;
  path: string;
  children?: NavItem[];
  [key: string]: any;
}

export function useActiveNav(navList: NavItem[]) {
  const location = useLocation();
  const [active, setActive] = useState("");

  useEffect(() => {
    const currentPath = location.pathname;

    const findActivePath = () => {
      for (const nav of navList) {
        if (nav.children?.length) {
          const matched = nav.children.some(
            (child) => currentPath === child.path,
          );
          if (matched) return nav.path;
        } else {
          if (currentPath === nav.path) {
            return nav.path;
          }
        }
      }
      return "";
    };

    setActive(findActivePath());
  }, [location.pathname, navList]);

  const isActive = (path: string) => {
    const currentPath = location.pathname;
    return currentPath === path;
  };

  return { active, isActive };
}
