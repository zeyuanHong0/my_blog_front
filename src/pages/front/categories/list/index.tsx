import React from "react";
import { useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";

import CategoryItem from "../list-item";

interface CategoriesListProps {
  categoriesList: any[];
}

const CategoriesList = ({ categoriesList }: CategoriesListProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div className={cn("grid grid-cols-2 gap-8")}>
        {categoriesList.map((category) => (
          <div
            onClick={() => navigate(`/category/${category.id}`)}
            key={category.id}
          >
            <CategoryItem category={category} />
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoriesList;
