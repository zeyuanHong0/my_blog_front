import { useEffect, useState } from "react";

import BlogList from "./list";

const Blog = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  useEffect(() => {
    // 模拟获取博客数据
    setBlogs([
      {
        id: 1,
        title: "在浏览器中使用 localStorage 和 sessionStorage",
        tags: [
          { id: 1, name: "react" },
          { id: 2, name: "javascript" },
        ],
      },
      { id: 2, title: "使用 CSS Grid 布局", tags: [{ id: 3, name: "css" }] },
      { id: 3, title: "深入理解 HTML 语义化", tags: [{ id: 4, name: "html" }] },
    ]);
  }, []);
  return (
    <div className="max-w-wrapper mx-auto flex min-h-screen flex-col px-6 pt-8 pb-24">
      <h2 className={`pb-8 text-3xl font-bold md:text-4xl`}>最新文章</h2>

      <BlogList blogs={blogs} />
    </div>
  );
};

export default Blog;
