import React from "react";

import { cn } from "@/lib/utils";

interface CategoryItemProps {
  category: any;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <div
      className={cn(
        "border-border flex items-center justify-between",
        "cursor-pointer rounded-2xl border border-solid px-6 py-8 text-4xl font-medium",
      )}
    >
      <span>{category.name}</span>
      <span className="text-muted-foreground text-sm">
        共{category.blogCount}篇博客
      </span>
    </div>
  );
};

export default CategoryItem;
