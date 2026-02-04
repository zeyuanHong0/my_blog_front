import { Skeleton } from "@/components/ui/skeleton";

const BlogViewSkeleton = () => {
  return (
    <div className="flex flex-1 flex-col px-4 pt-8 md:px-12">
      {/* Back button */}
      <div className="mb-12"></div>

      <div>
        {/* Title area */}
        <Skeleton className="mb-6 h-8 w-4/5 md:h-10" />
        <Skeleton className="text-muted-foreground mb-6 h-6 w-full md:w-2/3" />

        {/* Meta info */}
        <div className="mb-6 flex items-center space-x-4">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-20" />
        </div>

        <div className="flex items-start gap-8">
          <div className="min-w-0 flex-1">
            {/* AI Summary */}
            <div className="border-muted mb-6 border-l-4 px-6 py-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-[90%]" />
            </div>

            {/* Content Body */}
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[95%]" />
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[98%]" />
            </div>

            <div className="mt-10 space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[95%]" />
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[92%]" />
            </div>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogViewSkeleton;
