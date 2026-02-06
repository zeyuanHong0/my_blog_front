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
    <div className="max-w-wrapper mx-auto flex min-h-screen flex-col px-6 pt-8 pb-24">
      <h2 className={`pb-8 text-3xl font-bold md:text-4xl`}>标签</h2>
      {renderContent()}
    </div>
  );
};

export default Tags;
