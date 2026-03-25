import React from "react";

import { cn } from "@/lib/utils";

interface CategoryItemProps {
  category: any;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <div
      className={cn(
        "border-border flex cursor-pointer flex-col items-start gap-3 border border-solid sm:flex-row sm:items-center sm:justify-between",
        "rounded-xl p-5 sm:rounded-2xl sm:px-6 sm:py-8",
      )}
    >
      <span className="text-2xl font-medium sm:text-4xl">{category.name}</span>
      <span className="text-muted-foreground text-sm">
        共{category.blogCount}篇博客
      </span>
    </div>
  );
};

export default CategoryItem;
