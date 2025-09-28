import { cn } from "@/lib/utils";

import BlogListItem from "../list-item";

interface Props {
  blogs: any[];
}
const BlogList = ({ blogs }: Props) => {
  return (
    <ul className={cn("grid grid-cols-1 gap-4 gap-y-8", "md:grid-cols-2")}>
      {blogs.map((el) => (
        <li key={el.id}>
          <BlogListItem blog={el} />
        </li>
      ))}
    </ul>
  );
};

export default BlogList;
