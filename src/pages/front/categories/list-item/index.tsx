import { ArrowRight } from "lucide-react";

interface CategoryItemProps {
  category: any;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <div className="flex min-h-24 items-center justify-between gap-4 py-7">
      <span className="text-foreground group-hover:text-muted-foreground min-w-0 text-lg leading-snug font-semibold break-words transition-colors sm:text-xl">
        {category.name}
      </span>
      <div className="text-muted-foreground flex shrink-0 items-center gap-3 text-xs">
        <span>{category.blogCount} 篇文章</span>
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform group-hover:translate-x-1"
        />
      </div>
    </div>
  );
};

export default CategoryItem;
