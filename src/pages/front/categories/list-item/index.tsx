interface CategoryItemProps {
  category: any;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <div className="border-border hover:bg-muted/60 flex cursor-pointer flex-col items-start gap-2 rounded-xl border p-5 transition-colors sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-7">
      <span className="text-foreground text-xl font-medium sm:text-3xl">
        {category.name}
      </span>
      <span className="text-muted-foreground text-sm">
        共{category.blogCount}篇文章
      </span>
    </div>
  );
};

export default CategoryItem;
