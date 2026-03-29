import { useEffect, useState } from "react";

import { fetchFrontAllCategories } from "@/api/category";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import useDelayedSkeleton from "@/hooks/useDelayedSkeleton";

import CategoryList from "./list";
import { CategoryListSkeleton } from "@/components/skeleton";
import EmptyBox from "@/components/empty";

type Category = {
  id: string;
  name: string;
  blogCount: number;
};

const Categories = () => {
  useDocumentTitle("分类");
  const [categories, setCategories] = useState<Category[]>([]);
  const { loading, showSkeleton, executeRequest } = useDelayedSkeleton();

  useEffect(() => {
    executeRequest(async () => {
      const res: any = await fetchFrontAllCategories();
      setCategories(res.data?.list);
    });
  }, [executeRequest]);
  const renderContent = () => {
    if (loading) {
      return showSkeleton ? <CategoryListSkeleton /> : null;
    }
    if (categories.length > 0) {
      return <CategoryList categoriesList={categories} />;
    }
    return <EmptyBox iconSize={300} />;
  };
  return (
    <div className="max-w-wrapper mx-auto flex min-h-screen flex-col px-6 pt-12 pb-24 md:px-8 md:pt-16">
      <div className="mb-10 space-y-4">
        <h2 className="text-foreground text-3xl font-extrabold tracking-tight md:text-5xl lg:text-5xl">
          分类
        </h2>
        <div className="bg-primary/80 mt-4 h-1 w-20 rounded-full"></div>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 flex-1 duration-700 ease-in-out">
        {renderContent()}
      </div>
    </div>
  );
};

export default Categories;
