import { Skeleton } from "@/components/ui/skeleton";

const TagSkeleton = () => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <Skeleton className="h-9 w-24 rounded-none" key={index} />
      ))}
    </div>
  );
};

export default TagSkeleton;
