import { useEffect, useState } from "react";

import BlogList from "./list";

const Blog = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  useEffect(() => {
    // 模拟获取博客数据
    setBlogs([
      { id: 1, title: "First Blog Post" },
      { id: 2, title: "Second Blog Post" },
      { id: 3, title: "Third Blog Post" },
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
