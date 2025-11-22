import { useEffect, useState } from "react";

import { fetchFrontAllTags } from "@/api/tag";

import TagsList from "./list";
import { showErrorToast } from "@/components/toast";

const Tags = () => {
  const [tags, setTags] = useState<any[]>([]);
  // 获取标签列表
  const handleGetAllTags = async () => {
    try {
      const res: any = await fetchFrontAllTags();
      setTags(res.data);
    } catch (error: any) {
      showErrorToast(error.message || "获取标签列表失败");
    }
  };
  useEffect(() => {
    handleGetAllTags();
  }, []);
  return (
    <div className="max-w-wrapper mx-auto flex min-h-screen flex-col px-6 pt-8 pb-24">
      <h2 className={`pb-8 text-3xl font-bold md:text-4xl`}>标签</h2>

      <TagsList tags={tags} />
    </div>
  );
};

export default Tags;
