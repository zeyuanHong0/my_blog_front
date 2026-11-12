import { Link } from "react-router-dom";

import CategoryItem from "../list-item";

interface CategoriesListProps {
  categoriesList: any[];
}

const CategoriesList = ({ categoriesList }: CategoriesListProps) => {
  return (
    <ul className="grid grid-cols-1 gap-x-12 px-4 pt-4 md:grid-cols-2">
      {categoriesList.map((category) => (
        <li key={category.id} className="border-border/70 min-w-0 border-b">
          <Link
            to={`/blogs?${new URLSearchParams({ categoryId: category.id })}`}
            className="group block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            <CategoryItem category={category} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CategoriesList;
