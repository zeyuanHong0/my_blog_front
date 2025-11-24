import React from "react";
import { useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";

import TagItem from "../list-item";

interface TagsListProps {
  tags: any[];
}

const TagsList = ({ tags }: TagsListProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div className={cn("flex flex-wrap items-center gap-4")}>
        {tags.map((tag) => (
          <div onClick={() => navigate(`/tag/${tag.id}`)} key={tag.id}>
            <TagItem tag={tag} />
          </div>
        ))}
      </div>
    </>
  );
};

export default TagsList;
