import { useEffect, useState } from "react";

import { fetchFrontAllCategories } from "@/api/category";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import useDelayedSkeleton from "@/hooks/useDelayedSkeleton";

import CategoryList from "./list";
import Skeleton from "./skeleton";
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
      return showSkeleton ? <Skeleton /> : null;
    }
    if (categories.length > 0) {
      return <CategoryList categoriesList={categories} />;
    }
    return <EmptyBox iconSize={300} />;
  };
  return (
    <div className="max-w-wrapper mx-auto flex min-h-screen flex-col px-6 pt-8 pb-24">
      <h2 className={`pb-8 text-3xl font-bold md:text-4xl`}>分类</h2>
      {renderContent()}
    </div>
  );
};

export default Categories;
