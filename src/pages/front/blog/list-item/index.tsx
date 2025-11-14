import { Calendar } from "lucide-react";
import dayjs from "dayjs";

import { cn } from "@/lib/utils";

import { SvgIcon } from "@/components/Icon";

const BlogListItem = ({ blog }: { blog: any }) => {
  return (
    <div
      className={cn(
        "flex h-full cursor-pointer flex-col justify-between rounded-lg px-6 py-4 transition-all",
        "hover:bg-accent hover:text-accent-foreground",
      )}
    >
      {/* 标签 */}
      <ul className="mb-1 flex space-x-4 text-xs font-medium">
        {blog.tags.map((tag) => (
          <li key={tag.id} className="flex items-center gap-1">
            <SvgIcon icon={tag.icon} className="h-4 w-4" />
            <span className="mr-1">{tag.name}</span>
          </li>
        ))}
      </ul>
      {/* 标题 */}
      <h4 className="mb-2 line-clamp-1 text-xl font-medium">{blog.title}</h4>
      {/* 描述 */}
      <p className="text-muted-foreground mb-3 line-clamp-2 text-sm">
        {blog.description}
      </p>
      {/* 日期 */}
      <div className="text-muted-foreground flex items-center gap-1 text-xs">
        {/* 图标 */}
        <Calendar className="h-4 w-4" />
        {dayjs(blog.createTime).format("MM月DD，YYYY")}
      </div>
    </div>
  );
};

export default BlogListItem;
