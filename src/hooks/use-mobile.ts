import { useEffect, useState } from "react";

/**
 * 检测当前是否为移动端设备
 */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < breakpoint);
    checkScreen(); // 初始化时检查
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, [breakpoint]);

  return isMobile;
}
