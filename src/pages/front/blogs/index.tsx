import { useEffect, useState } from "react";

import { fetchAllBlogs } from "@/api/blog";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import useDelayedSkeleton from "@/hooks/useDelayedSkeleton";

import BlogList from "./list";
import { BlogListSkeleton } from "@/components/skeleton";
import EmptyBox from "@/components/empty";

const Blog = () => {
  useDocumentTitle("博客");
  const [blogs, setBlogs] = useState<any[]>([]);
  const { loading, showSkeleton, executeRequest } = useDelayedSkeleton();

  useEffect(() => {
    executeRequest(async () => {
      const res: any = await fetchAllBlogs();
      setBlogs(res.data);
    });
  }, [executeRequest]);
  const renderContent = () => {
    if (loading) {
      return showSkeleton ? <BlogListSkeleton /> : null;
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
