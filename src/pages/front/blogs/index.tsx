import { useEffect, useState } from "react";

import { fetchAllBlogs } from "@/api/blog";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Skeleton } from "@/components/ui/skeleton";

import BlogList from "./list";
import BlogListSkeleton from "./skeleton";
import EmptyBox from "@/components/empty";

const Blog = () => {
  useDocumentTitle("博客");
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(false);

  // 获取博客列表
  const handleGetAllBlogs = async () => {
    try {
      setLoading(true);
      const skeletonTimer = setTimeout(() => {
        setShowSkeleton(true);
      }, 300);
      const res: any = await fetchAllBlogs();
      setBlogs(res.data);
      clearTimeout(skeletonTimer);
    } finally {
      setLoading(false);
      setShowSkeleton(false);
    }
  };
  useEffect(() => {
    handleGetAllBlogs();
  }, []);
  const renderContent = () => {
    if (loading) {
      return showSkeleton ? <Skeleton /> : null;
    }
    if (blogs.length > 0) {
      return <BlogList blogs={blogs} />;
    }
    return <EmptyBox iconSize={300} />;
  };
  return (
    <div className="max-w-wrapper mx-auto flex min-h-screen flex-col px-6 pt-8 pb-24">
      <h2 className={`pb-8 text-3xl font-bold md:text-4xl`}>博客</h2>
      {renderContent()}
    </div>
  );
};

export default Blog;
