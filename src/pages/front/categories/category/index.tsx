import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchFrontCategoryDetail } from "@/api/category";

import BlogList from "@/pages/front/blogs/list";
import EmptyBox from "@/components/empty";

const Category = () => {
  const { id } = useParams();
  const [categoryInfo, setCategoryInfo] = useState<any>({});
  useEffect(() => {
    const loadData = async () => {
      const res: any = await fetchFrontCategoryDetail(id!);
      setCategoryInfo(res.data);
    };
    loadData();
  }, [id]);
  return (
    <div className="max-w-wrapper mx-auto flex min-h-screen flex-col px-6 pt-8 pb-24">
      <div className="flex items-center">
        <h2 className={`pb-8 text-3xl font-bold md:text-4xl`}>
          分类 <span className="mx-3">|</span>
          {categoryInfo.name}
        </h2>
      </div>
      <div className="text-muted-foreground pb-8 text-sm">
        共计{categoryInfo.blogs?.length ?? 0}篇博客
      </div>
      <div className="mt-3">
        {categoryInfo.blogs?.length > 0 ? (
          <BlogList blogs={categoryInfo.blogs ?? []} />
        ) : (
          <EmptyBox iconSize={300} />
        )}
      </div>
    </div>
  );
};

export default Category;
