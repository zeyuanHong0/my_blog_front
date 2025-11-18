import { useEffect, useState } from "react";

import { fetchAllBlogs } from "@/api/blog";

import BlogList from "./list";
import { showErrorToast } from "@/components/toast";

const Blog = () => {
  const [blogs, setBlogs] = useState<any[]>([]);

  // 获取博客列表
  const handleGetAllBlogs = async () => {
    try {
      const res: any = await fetchAllBlogs();
      setBlogs(res.data);
    } catch (error: any) {
      showErrorToast(error.message || "获取博客列表失败");
    }
  };
  useEffect(() => {
    handleGetAllBlogs();
  }, []);
  return (
    <div className="max-w-wrapper mx-auto flex min-h-screen flex-col px-6 pt-8 pb-24">
      <h2 className={`pb-8 text-3xl font-bold md:text-4xl`}>最新文章</h2>

      <BlogList blogs={blogs} />
    </div>
  );
};

export default Blog;
