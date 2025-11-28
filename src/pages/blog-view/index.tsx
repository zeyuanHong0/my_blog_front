import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import { fetchFrontBlogDetail } from "@/api/blog";
import ScrollToTop from "@/components/ScrollToTop";

import { SvgIcon } from "@/components/Icon";
import { BytemdViewer } from "@/components/bytemd/viewer";

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
  const navigate = useNavigate();
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
      <ScrollToTop />
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
              <div
                className="flex items-center gap-1"
                key={tag.id}
                onClick={() => navigate(`/tag/${tag.id}`)}
              >
                <SvgIcon icon={tag.icon} size={14} />
                <span
                  key={tag.id}
                  className="cursor-pointer text-sm text-[#717171] hover:text-[#787878]"
                >
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
