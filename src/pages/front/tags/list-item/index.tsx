import React from "react";

import { cn } from "@/lib/utils";
import useSettingStore from "@/store/settingStore";

import { SvgIcon } from "@/components/Icon";

interface TagItemProps {
  tag: any;
}

const TagItem = ({ tag }: TagItemProps) => {
  const { themeMode } = useSettingStore();
  return (
    <div
      className={cn(
        "inline-flex h-9 shrink-0 items-center justify-center gap-2",
        "px-4 py-2 text-sm font-medium whitespace-nowrap",
        "bg-background text-foreground border border-transparent shadow-xs",
        "hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all outline-none",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
      )}
    >
      {tag.icon && (
        <SvgIcon
          icon={
            themeMode === "dark" && tag.icon_dark ? tag.icon_dark : tag.icon
          }
          size={18}
        />
      )}
      <span>{tag.name}</span>
      {Number(tag.blogCount) > 0 && (
        <div
          className={cn(
            "flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap",
            "bg-secondary text-secondary-foreground border-transparent",
          )}
        >
          <span>{tag.blogCount}</span>
        </div>
      )}
    </div>
  );
};

export default TagItem;
