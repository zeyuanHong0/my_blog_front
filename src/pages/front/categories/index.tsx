import { useEffect, useState } from "react";

import { fetchFrontAllCategories } from "@/api/category";

import CategoryList from "./list";
import EmptyBox from "@/components/empty";

type Category = {
  id: string;
  name: string;
  blogCount: number;
};

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const handleGetAllCategories = async () => {
      try {
        const res: any = await fetchFrontAllCategories();
        setCategories(res.data?.list);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    handleGetAllCategories();
  }, []);
  return (
    <div className="max-w-wrapper mx-auto flex min-h-screen flex-col px-6 pt-8 pb-24">
      <h2 className={`pb-8 text-3xl font-bold md:text-4xl`}>分类</h2>
      {categories.length > 0 ? (
        <CategoryList categoriesList={categories} />
      ) : (
        <EmptyBox iconSize={300} />
      )}
    </div>
  );
};

export default Categories;
