import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";

const BlogListItem = ({ blog }: { blog: any }) => {
  return (
    <div
      className={cn(
        "flex h-full cursor-pointer flex-col justify-between rounded-lg px-6 py-4 transition-all",
        "hover:bg-accent hover:text-accent-foreground",
      )}
    >
      {/* 标签 */}
      {/* 标题 */}
      {/* 描述 */}
      {/* 日期 */}
    </div>
  );
};

export default BlogListItem;
