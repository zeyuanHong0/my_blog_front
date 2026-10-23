import { useEffect, useState } from "react";

import { fetchAllBlogs } from "@/api/blog";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import useDelayedSkeleton from "@/hooks/useDelayedSkeleton";

import BlogList from "@/components/SearchableBlogList";
import { BlogListSkeleton } from "@/components/skeleton";

const Blog = () => {
  useDocumentTitle("博客");
  const [blogs, setBlogs] = useState<any[]>([]);
  const { loading, showSkeleton, executeRequest } = useDelayedSkeleton();

  const handleChangeBlogs = (newBlogs: any[]) => {
    setBlogs(newBlogs);
  };

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
    return <BlogList blogs={blogs} changeBlogs={handleChangeBlogs} />;
  };
  return (
    <div className="max-w-wrapper mx-auto flex min-h-screen flex-col px-6 pt-12 pb-24 md:px-8 md:pt-16">
      <div className="mb-10 space-y-4">
        <h2 className="text-foreground text-3xl font-extrabold tracking-tight md:text-5xl lg:text-5xl">
          博客
        </h2>
        <p className="text-muted-foreground max-w-2xl text-base md:text-lg">
          在这里分享我的技术心得、生活感悟以及一些有趣的想法。
        </p>
        <div className="bg-primary/80 mt-4 h-1 w-20 rounded-full"></div>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 flex-1 duration-700 ease-in-out">
        {renderContent()}
      </div>
    </div>
  );
};

export default Blog;
