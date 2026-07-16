import { Skeleton } from "@/components/ui/skeleton";

const ArchivesSkeleton = () => {
  return (
    <div className="relative mx-auto flex min-h-screen max-w-4xl flex-col px-6 pt-12 pb-24 md:px-8 md:pt-16">
      {/* 标题区域 */}
      <div className="mb-10 space-y-4">
        <Skeleton className="h-10 w-24 md:h-14 md:w-32" />
        <Skeleton className="h-5 w-64 md:h-6 md:w-80" />
        <Skeleton className="mt-4 h-1 w-20 rounded-full" />
      </div>

      {/* 时间轴 */}
      <div className="relative">
        {Array.from({ length: 2 }).map((_, yearIdx) => (
          <div key={yearIdx}>
            {/* 年份徽章 */}
            <div className="relative z-10 flex items-center gap-4 py-8 pl-2 md:justify-center md:pl-0">
              <div className="hidden h-px flex-1 md:block">
                <Skeleton className="h-full w-full" />
              </div>
              <Skeleton className="h-10 w-40 rounded-full md:h-12 md:w-48" />
              <div className="h-px flex-1">
                <Skeleton className="h-full w-full" />
              </div>
            </div>
            {/* 卡片 */}
            <div className="relative flex flex-col items-center gap-6 py-4">
              {Array.from({ length: 3 }).map((_, cardIdx) => (
                <div
                  key={cardIdx}
                  className="relative ml-12 w-[calc(100%-4rem)] self-start md:ml-0 md:w-[calc(50%-2.5rem)]"
                >
                  <Skeleton className="rounded-xl p-5">
                    <Skeleton className="mb-2 h-5 w-3/4 bg-primary/20" />
                    <Skeleton className="h-4 w-24 bg-primary/20" />
                  </Skeleton>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchivesSkeleton;
