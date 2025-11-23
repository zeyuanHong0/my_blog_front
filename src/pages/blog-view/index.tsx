import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

import { fetchFrontBlogDetail } from "@/api/blog";

import { SvgIcon } from "@/components/Icon";
import { BytemdViewer } from "@/components/bytemd/viewer";
import { showErrorToast } from "@/components/toast";

type Tag = {
  id: string;
  name: string;
  icon: string;
};

type BlogType = {
  title: string;
  description: string;
  content: string;
  createTime: string;
  updateTime: string;
  tags: Tag[];
};

const BlogViewPage = () => {
  const { id } = useParams<{ id: string }>();

  const [blog, setBlog] = useState<BlogType>({
    title: "",
    description: "",
    content: "",
    createTime: "",
    updateTime: "",
    tags: [],
  });

  // 获取博客详情
  const handleGetBlogDetail = useCallback(async () => {
    const res: any = await fetchFrontBlogDetail(id as string);
    const { title, description, content, tags, createTime, updateTime } =
      res.data;
    setBlog({
      title,
      description,
      content,
      createTime,
      updateTime,
      tags: tags || [],
    });
  }, [id]);
  useEffect(() => {
    handleGetBlogDetail();
  }, [handleGetBlogDetail]);

  return (
    <div className={`max-w-prose-wrapper mx-auto flex flex-col pt-8 md:!px-0`}>
      <h1 className="mb-6 text-4xl font-semibold break-all">{blog.title}</h1>

      <p className="text-muted-foreground mb-6">{blog.description}</p>
      <div className="text-muted-foreground mb-6 flex items-center space-x-4 text-sm">
        <p>
          {dayjs(blog.createTime).format("YYYY/MM/DD")}
          （更新于{dayjs(blog.updateTime).format("YYYY/MM/DD")}）
        </p>
      </div>

      <BytemdViewer body={blog.content || ""} />

      <div className="pt-14 pb-14">
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {blog.tags.map((tag) => (
              <div className="flex items-center gap-1" key={tag.id}>
                {/* svg */}
                <div
                  className="flex h-4 w-4 items-center justify-center [&>svg]:h-full [&>svg]:w-full"
                  dangerouslySetInnerHTML={{ __html: tag.icon }}
                />
                <span key={tag.id} className="text-sm text-[#727272]">
                  {tag.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogViewPage;
