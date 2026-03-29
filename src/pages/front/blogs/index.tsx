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
    <div className="max-w-wrapper mx-auto flex min-h-screen flex-col px-6 pt-12 pb-24 md:pt-16 md:px-8">
      <div className="mb-10 space-y-4">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl lg:text-5xl text-foreground">
          博客
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
          在这里分享我的技术心得、生活感悟以及一些有趣的想法。
        </p>
        <div className="h-1 w-20 bg-primary/80 rounded-full mt-4"></div>
      </div>
      
      <div className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-in-out">
        {renderContent()}
      </div>
    </div>
  );
};

export default Blog;
