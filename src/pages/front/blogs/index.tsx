import { useEffect, useState } from "react";

import { fetchAllBlogs } from "@/api/blog";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

import BlogList from "./list";
import EmptyBox from "@/components/empty";

const Blog = () => {
  useDocumentTitle("博客");
  const [blogs, setBlogs] = useState<any[]>([]);

  // 获取博客列表
  const handleGetAllBlogs = async () => {
    const res: any = await fetchAllBlogs();
    setBlogs(res.data);
  };
  useEffect(() => {
    handleGetAllBlogs();
  }, []);
  return (
    <div className="max-w-wrapper mx-auto flex min-h-screen flex-col px-6 pt-8 pb-24">
      <h2 className={`pb-8 text-3xl font-bold md:text-4xl`}>博客</h2>

      {blogs.length > 0 ? (
        <BlogList blogs={blogs} />
      ) : (
        <EmptyBox iconSize={300} />
      )}
    </div>
  );
};

export default Blog;
