import React from "react";

import { cn } from "@/lib/utils";

import TagItem from "../list-item";

interface TagsListProps {
  tags: any[];
}

const TagsList = ({ tags }: TagsListProps) => {
  return (
    <>
      <div className={cn("flex flex-wrap items-center gap-4")}>
        {tags.map((tag) => (
          <TagItem key={tag.id} tag={tag} />
        ))}
      </div>
    </>
  );
};

export default TagsList;
