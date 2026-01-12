import { Skeleton } from "@/components/ui/skeleton";

const BlogListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 gap-y-8 md:grid-cols-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="flex h-full flex-col justify-between rounded-lg px-6 py-4"
        >
          <div>
            {/* 标题 */}
            <Skeleton className="mb-2 h-7 w-3/4" />
            {/* 描述 */}
            <div className="mb-3 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
          {/* 底部信息 */}
          <div className="flex items-center gap-2 pt-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="ml-2 h-4 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogListSkeleton;
