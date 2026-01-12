import { useEffect, useState } from "react";

import { fetchFrontAllTags } from "@/api/tag";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

import TagsList from "./list";
import Skeleton from "./skeleton";
import EmptyBox from "@/components/empty";

const Tags = () => {
  useDocumentTitle("标签");
  const [tags, setTags] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(false);

  // 获取标签列表
  const handleGetAllTags = async () => {
    try {
      setLoading(true);
      const skeletonTimer = setTimeout(() => {
        setShowSkeleton(true);
      }, 300);
      const res: any = await fetchFrontAllTags();
      setTags(res.data);
      clearTimeout(skeletonTimer);
    } finally {
      setLoading(false);
      setShowSkeleton(false);
    }
  };
  useEffect(() => {
    handleGetAllTags();
  }, []);
  const renderContent = () => {
    if (loading) {
      return showSkeleton ? <Skeleton /> : null;
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
