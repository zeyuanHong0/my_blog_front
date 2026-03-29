import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchFrontCategoryDetail } from "@/api/category";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import useDelayedSkeleton from "@/hooks/useDelayedSkeleton";

import BlogList from "@/pages/front/blogs/list";
import EmptyBox from "@/components/empty";
import { BlogListSkeleton } from "@/components/skeleton";

const Category = () => {
  const { id } = useParams();
  const { loading, showSkeleton, executeRequest } = useDelayedSkeleton();
  const [categoryInfo, setCategoryInfo] = useState<any>({});
  useEffect(() => {
    executeRequest(async () => {
      const res: any = await fetchFrontCategoryDetail(id!);
      const blogs = res.data.blogs.map((blog: any) => {
        return {
          ...blog,
          category: { name: res.data.name },
        };
      });
      setCategoryInfo({ ...res.data, blogs });
    });
  }, [executeRequest, id]);
  const renderContent = () => {
    if (loading) {
      return showSkeleton ? <BlogListSkeleton /> : null;
    }
    if (categoryInfo?.blogs.length > 0) {
      return <BlogList blogs={categoryInfo.blogs ?? []} />;
    }
    return <EmptyBox iconSize={300} />;
  };
  useDocumentTitle(categoryInfo.name || "分类详情");
  return (
    <div className="max-w-wrapper mx-auto flex min-h-screen flex-col px-6 pt-12 pb-24 md:px-8 md:pt-16">
      <div className="mb-10 space-y-4">
        <h2 className="text-foreground text-3xl font-extrabold tracking-tight md:text-5xl lg:text-5xl">
          {categoryInfo.name || "..."}
          <span className="text-muted-foreground ml-4 text-xl font-normal md:text-2xl">
            分类
          </span>
        </h2>
        <div className="bg-primary/80 mt-4 h-1 w-20 rounded-full"></div>
        <div className="text-muted-foreground pt-2 text-sm md:text-base">
          共计 {categoryInfo.blogs?.length ?? 0} 篇博客
        </div>
      </div>
      <div className="animate-in fade-in slide-in-from-bottom-4 mt-3 flex-1 duration-700 ease-in-out">
        {renderContent()}
      </div>
    </div>
  );
};

export default Category;
