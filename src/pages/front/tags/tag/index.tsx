import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchFrontTagDetail } from "@/api/tag";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import useDelayedSkeleton from "@/hooks/useDelayedSkeleton";

import BlogList from "@/pages/front/blogs/list";
import EmptyBox from "@/components/empty";
import { BlogListSkeleton } from "@/components/skeleton";

const Tag = () => {
  const { id } = useParams();
  const { loading, showSkeleton, executeRequest } = useDelayedSkeleton();
  const [tagInfo, setTagInfo] = useState<any>({});
  useEffect(() => {
    executeRequest(async () => {
      const res: any = await fetchFrontTagDetail(id!);
      setTagInfo(res.data);
    });
  }, [executeRequest, id]);
  useDocumentTitle(tagInfo.name || "标签详情");
  const renderContent = () => {
    if (loading) {
      return showSkeleton ? <BlogListSkeleton /> : null;
    }
    if (tagInfo?.blogs.length > 0) {
      return <BlogList blogs={tagInfo.blogs ?? []} />;
    }
    return <EmptyBox iconSize={300} />;
  };
  return (
    <div className="max-w-wrapper mx-auto flex min-h-screen flex-col px-6 pt-8 pb-24">
      <div className="flex items-center">
        <h2 className={`pb-8 text-3xl font-bold md:text-4xl`}>
          标签 <span className="mx-3">|</span>
          {tagInfo.name}
        </h2>
      </div>
      <div className="text-muted-foreground pb-8 text-sm">
        共计{tagInfo.blogs?.length ?? 0}篇博客
      </div>
      <div className="mt-3">{renderContent()}</div>
    </div>
  );
};

export default Tag;
