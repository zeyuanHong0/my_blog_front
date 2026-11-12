import dayjs from "dayjs";

const BlogListItem = ({ blog }: { blog: any }) => {
  return (
    <article>
      <div className="text-muted-foreground mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
        <time>{dayjs(blog.createTime).format("MM月DD日, YYYY")}</time>
        <span aria-hidden="true">·</span>
        <span>{blog.author?.name || "无名侠"}</span>
      </div>

      <h4 className="text-foreground group-hover:text-muted-foreground mb-3 text-xl leading-snug font-semibold tracking-tight transition-colors sm:text-2xl">
        {blog.title}
      </h4>
      {blog.description && (
        <p className="text-muted-foreground line-clamp-2 max-w-3xl text-sm leading-7">
          {blog.description}
        </p>
      )}

      <div className="text-muted-foreground mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
        <span>{blog.category?.name || "未分类"}</span>
        {blog.tags.length > 0 && (
          <span aria-hidden="true" className="text-border">/</span>
        )}
        <ul className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {blog.tags.map((tag) => (
            <li key={tag.id}>#{tag.name}</li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default BlogListItem;
