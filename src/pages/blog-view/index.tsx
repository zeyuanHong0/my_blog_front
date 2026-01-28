import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import { cn } from "@/lib/utils";
import { fetchFrontBlogDetail } from "@/api/blog";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import useSettingStore from "@/store/settingStore";
import ScrollToTop from "@/components/ScrollToTop";
import { tocPlugin, type TocItem } from "@/plugins/toc";

import { SvgIcon } from "@/components/Icon";
import { BytemdViewer } from "@/components/bytemd/viewer";
import { set } from "zod";

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
  const [toc, setToc] = useState<TocItem[]>([]); // 目录

  // 当前高亮的目录
  const [tocItemId, setTocItemId] = useState<string>("");
  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      // 如果 intersectionRatio 为 0，则目标在视野外，
      // if (entries[0].intersectionRatio <= 0) return;
      // if (entries[0].isIntersecting) {
      //   setTocItemId(entries[0].target.id);
      // }
      // 优化一下(处理多个标题同时进入视野的情况)，取离顶部最近的那个
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visibleEntries.length > 0) {
        setTocItemId(visibleEntries[0].target.id);
      }
    });
    // 开始监听
    document.querySelectorAll("h1,h2,h3,h4,h5,h6").forEach((el) => {
      intersectionObserver.observe(el);
    });
    return () => {
      intersectionObserver.disconnect();
    };
  }, [toc]);

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

  // 缓存tocPlugin,避免无限渲染
  const tocPluginInstance = useMemo(
    () => tocPlugin({ onChange: setToc }),
    [setToc],
  );

  const iconShow = (tag: Tag) => {
    if (!tag.icon && !tag.icon_dark)
      return <span className="text-sm text-[#717171]">#</span>;
    return (
      <SvgIcon
        icon={themeMode === "dark" && tag.icon_dark ? tag.icon_dark : tag.icon}
        size={14}
      />
    );
  };
  return (
    <div className={cn("flex flex-1 flex-col px-4 pt-8 md:px-12")}>
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

      <div className="flex items-start gap-8">
        <div className="min-w-0 flex-1">
          {blog.aiSummary && (
            <div className="border-l-primary mb-6 border-l-4 px-6 py-2 italic">
              <div className="text-primary mb-4 flex items-center gap-2 font-semibold">
                <span className="text-xl">✨</span> AI 总结
              </div>
              <div className="text-muted-foreground text-base leading-7">
                {blog.aiSummary}
              </div>
            </div>
          )}

          <BytemdViewer
            body={blog.content || ""}
            otherPlugins={[tocPluginInstance]}
          />

          <div className="pt-14 pb-14">
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {blog.tags.map((tag) => (
                  <div
                    className="flex items-center gap-1"
                    key={tag.id}
                    onClick={() => navigate(`/tag/${tag.id}`)}
                  >
                    {iconShow(tag)}
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
        {/* 目录 */}
        <aside className="sticky top-20 hidden w-80 shrink-0 lg:block">
          <h3 className="mb-4 text-base font-semibold">目录</h3>
          <nav className="max-h-[calc(100vh-10rem)] overflow-y-auto pr-1">
            <ul className="space-y-1">
              {toc.map((item) => (
                <li
                  key={item.id}
                  className="text-sm"
                  style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
                >
                  <a
                    href={`#${item.id}`}
                    // className="text-muted-foreground hover:text-primary block truncate py-1 transition-colors"
                    className={cn(
                      "hover:text-primary block truncate py-1 transition-colors",
                      tocItemId === item.id
                        ? "text-primary font-medium"
                        : "text-muted-foreground",
                    )}
                    onClick={() => setTocItemId(item.id)}
                    title={item.text}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
    </div>
  );
};

export default BlogViewPage;
