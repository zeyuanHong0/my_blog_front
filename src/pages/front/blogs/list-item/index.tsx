import { Calendar, Tag, User } from "lucide-react";
import dayjs from "dayjs";

import { cn } from "@/lib/utils";

const BlogListItem = ({ blog }: { blog: any }) => {
  return (
    <div
      className={cn(
        "flex h-full cursor-pointer flex-col justify-between rounded-lg px-6 py-4 transition-all",
        "hover:bg-accent hover:text-accent-foreground",
      )}
    >
      <div>
        {/* 标题 */}
        <h4 className="text-foreground mb-2 line-clamp-1 text-xl font-medium">
          {blog.title}
        </h4>

        {/* 作者与时间  */}
        <div className="text-muted-foreground mb-3 flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1">
            <User className="h-3.5 w-3.5" />
            <span>{blog.author?.name || "无名侠"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>{dayjs(blog.createTime).format("MM月DD日, YYYY")}</span>
          </div>
        </div>

        {/* 描述 */}
        <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
          {blog.description}
        </p>
      </div>

      {/* 分类和标签 */}
      <div className="text-muted-foreground flex flex-wrap items-center gap-2 overflow-hidden text-xs">
        {/* 分类 */}
        <span className="bg-muted shrink-0 rounded-md px-2 py-1 font-medium">
          {blog.category?.name || "未分类"}
        </span>

        {/* 标签 */}
        <ul className="flex flex-wrap items-center gap-2 font-medium">
          {blog.tags.map((tag) => (
            <li key={tag.id} className="flex shrink-0 items-center gap-1">
              <Tag size={12} className="opacity-70" />
              <span>{tag.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogListItem;
