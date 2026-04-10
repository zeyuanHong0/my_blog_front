import { useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

import { cn } from "@/lib/utils";

const ThemeModeSwitcher = () => {
  const themeModesList = [
    { icon: <Sun size={16} />, mode: "light" },
    { icon: <Monitor size={16} />, mode: "system" },
    { icon: <Moon size={16} />, mode: "dark" },
  ];
  const [themeMode, setThemeMode] = useState("light");
  return (
    <div className="border-border bg-muted flex items-center gap-2 rounded-full border px-1">
      {themeModesList.map((item, index) => (
        <div
          key={index}
          className={cn(
            "text-muted-foreground flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg p-1",
            "transition-all",
            themeMode === item.mode
              ? "bg-background text-foreground shadow-sm"
              : "hover:bg-theme-hover-1 hover:text-foreground hover:shadow-sm",
          )}
          onClick={() => setThemeMode(item.mode)}
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
};

export default ThemeModeSwitcher;
