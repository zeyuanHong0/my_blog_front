import { useEffect, useState } from "react";

import { fetchFrontAllTags } from "@/api/tag";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import useDelayedSkeleton from "@/hooks/useDelayedSkeleton";

import TagsList from "./list";
import { TagListSkeleton } from "@/components/skeleton";
import EmptyBox from "@/components/empty";

const Tags = () => {
  useDocumentTitle("标签");
  const [tags, setTags] = useState<any[]>([]);
  const { loading, showSkeleton, executeRequest } = useDelayedSkeleton();

  useEffect(() => {
    executeRequest(async () => {
      const res: any = await fetchFrontAllTags();
      setTags(res.data);
    });
  }, [executeRequest]);

  const renderContent = () => {
    if (loading) {
      return showSkeleton ? <TagListSkeleton /> : null;
    }
    if (tags.length > 0) {
      return <TagsList tags={tags} />;
    }
    return <EmptyBox iconSize={300} />;
  };
  return (
    <div className="max-w-wrapper mx-auto flex min-h-screen flex-col px-6 pt-12 pb-24 md:px-8 md:pt-16 lg:px-20 xl:px-40">
      <div className="mb-10 space-y-4">
        <h2 className="text-foreground text-3xl font-extrabold tracking-tight md:text-4xl lg:text-4xl">
          标签
        </h2>
        <div className="bg-primary/80 mt-4 h-1 w-20 rounded-full"></div>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 flex-1 duration-700 ease-in-out">
        {renderContent()}
      </div>
    </div>
  );
};

export default Tags;
