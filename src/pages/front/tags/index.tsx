import { useEffect, useState } from "react";

import { fetchFrontAllTags } from "@/api/tag";

import TagsList from "./list";
import EmptyBox from "@/components/empty";

const Tags = () => {
  const [tags, setTags] = useState<any[]>([]);
  // 获取标签列表
  const handleGetAllTags = async () => {
    const res: any = await fetchFrontAllTags();
    setTags(res.data);
  };
  useEffect(() => {
    handleGetAllTags();
  }, []);
  return (
    <div className="max-w-wrapper mx-auto flex min-h-screen flex-col px-6 pt-8 pb-24">
      <h2 className={`pb-8 text-3xl font-bold md:text-4xl`}>标签</h2>

      {tags.length > 0 ? <TagsList tags={tags} /> : <EmptyBox iconSize={300} />}
    </div>
  );
};

export default Tags;
