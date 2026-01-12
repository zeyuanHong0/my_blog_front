import { Skeleton } from "@/components/ui/skeleton";

const CategorySkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 gap-y-8 md:grid-cols-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton className="h-24 w-full rounded-2xl" key={index} />
      ))}
    </div>
  );
};

export default CategorySkeleton;
