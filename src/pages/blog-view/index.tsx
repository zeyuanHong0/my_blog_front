import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import { fetchFrontBlogDetail } from "@/api/blog";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import useSettingStore from "@/store/settingStore";
import ScrollToTop from "@/components/ScrollToTop";

import { SvgIcon } from "@/components/Icon";
import { BytemdViewer } from "@/components/bytemd/viewer";

type Tag = {
  id: string;
  name: string;
  icon: string;
  icon_dark: string | null;
};

type Category = {
  id: string;
  name: string;
};

type BlogType = {
  title: string;
  description: string;
  aiSummary?: string;
  content: string;
  createTime: string;
  updateTime: string;
  tags: Tag[];
  category: Category;
};

const BlogViewPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { themeMode } = useSettingStore();

  const [blog, setBlog] = useState<BlogType>({
    title: "",
    description: "",
    content: "",
    createTime: "",
    updateTime: "",
    tags: [],
    category: {
      id: "",
      name: "",
    },
  });

  // 获取博客详情
  const handleGetBlogDetail = useCallback(async () => {
    const res: any = await fetchFrontBlogDetail(id as string);
    const {
      title,
      description,
      aiSummary,
      content,
      tags,
      createTime,
      updateTime,
    } = res.data;
    setBlog({
      title,
      description,
      aiSummary,
      content,
      createTime,
      updateTime,
      tags: tags || [],
      category: res.data.category || { id: "", name: "" },
    });
  }, [id]);
  useEffect(() => {
    handleGetBlogDetail();
  }, [handleGetBlogDetail]);
  useDocumentTitle(blog.title || "博客详情");
  return (
    <div
      className={`max-w-prose-wrapper mx-auto flex flex-col px-4 pt-8 md:px-0`}
    >
      <ScrollToTop />
      <h1 className="mb-6 text-4xl font-semibold break-all">{blog.title}</h1>

      <p className="text-muted-foreground mb-6">{blog.description}</p>
      <div className="text-muted-foreground mb-6 flex items-center space-x-4 text-sm">
        <p>
          {dayjs(blog.createTime).format("YYYY/MM/DD")}
          （更新于{dayjs(blog.updateTime).format("YYYY/MM/DD")}）
        </p>
        {blog.category && blog.category.name && (
          <>
            <span>/</span>
            <span
              className="cursor-pointer underline-offset-4 hover:underline"
              onClick={() => navigate(`/category/${blog.category.id}`)}
            >
              {blog.category.name}
            </span>
          </>
        )}
      </div>

      {blog.aiSummary && (
        <div className="bg-card mb-6 rounded-xl border p-6 shadow-sm">
          <div className="text-primary mb-4 flex items-center gap-2 font-semibold">
            <span className="text-xl">✨</span> AI 总结
          </div>
          <div className="text-muted-foreground text-base leading-7">
            {blog.aiSummary}
          </div>
        </div>
      )}

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
                <SvgIcon
                  icon={
                    themeMode === "dark" && tag.icon_dark
                      ? tag.icon_dark
                      : tag.icon
                  }
                  size={14}
                />
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
