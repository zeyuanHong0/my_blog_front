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
      <ul className="mb-1 flex space-x-4 text-xs font-medium">
        {blog.tags.map((tag) => (
          <li key={tag.id} className="flex items-center">
            <span className="mr-1">#&nbsp;{tag.name}</span>
            {/* tagIcon */}
          </li>
        ))}
      </ul>
      {/* 标题 */}
      <h4 className="mb-2 line-clamp-1 text-xl font-medium">{blog.title}</h4>
      {/* 描述 */}
      <p className="text-muted-foreground mb-3 line-clamp-2 text-sm">
        这个是博客描述，这个是博客描述，这个是博客描述，这个是博客描述，这个是博客描述，这个是博客描述，这个是博客描述，这个是博客描述，这个是博客描述，这个是博客描述，这个是博客描述，这个是博客描述，这个是博客描述，这个是博客描述，这个是博客描述，这个是博客描述，这个是博客描述，这个是博客描述，这个是博客描述，这个是博客描述。
      </p>
      {/* 日期 */}
      <div className="text-muted-foreground flex items-center space-x-2 text-xs">
        {/* 图标 */}
        05月10，2025
      </div>
    </div>
  );
};

export default BlogListItem;
