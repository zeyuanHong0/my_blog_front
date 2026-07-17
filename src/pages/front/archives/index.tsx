import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import useDelayedSkeleton from "@/hooks/useDelayedSkeleton";
import { fetchBlogArchives } from "@/api/blog";
import styles from "./index.module.scss";
import { cn } from "@/lib/utils";

import ArchivesSkeleton from "@/components/skeleton/archives-skeleton";

type Blog = {
  id: string;
  title: string;
  createTime: string;
  globalIndex?: number;
};

type YearArchive = {
  year: number;
  total: number;
  blogs: Blog[];
};

type ArchivesMap = Record<number, YearArchive>;

const Archives = () => {
  useDocumentTitle("归档");
  const { showSkeleton, executeRequest } = useDelayedSkeleton();
  const [total, setTotal] = useState(0);
  const [activeYear, setActiveYear] = useState<number | null>(null);
  const [groupedArchivesList, setGroupedArchivesList] = useState<YearArchive[]>(
    [],
  );
  // 处理归档结构
  const groupArchives = (list: Blog[]) => {
    const archivesMap: ArchivesMap = {};
    list.forEach((item: Blog) => {
      const year = dayjs(item.createTime).year();
      if (!archivesMap[year]) {
        archivesMap[year] = {
          year,
          total: 0,
          blogs: [],
        };
      }
      archivesMap[year].total++;
      archivesMap[year].blogs.push(item);
    });
    let globalIndex = 0;
    const groupedList = Object.values(archivesMap)
      .sort((a, b) => b.year - a.year)
      .map((item) => {
        return {
          ...item,
          blogs: item.blogs
            .sort((a, b) => {
              return (
                dayjs(b.createTime).valueOf() - dayjs(a.createTime).valueOf()
              );
            })
            .map((blog) => ({ ...blog, globalIndex: globalIndex++ })),
        };
      });
    setGroupedArchivesList(groupedList);
  };
  useEffect(() => {
    executeRequest(async () => {
      const res: any = await fetchBlogArchives();
      setTotal(res.data?.length ?? 0);
      groupArchives(res.data || []);
    });
  }, []);

  // 卡片滚动入场动画
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            if (el.classList.contains(styles.card)) {
              const idx = [
                ...document.querySelectorAll(`.${styles.card}`),
              ].indexOf(el);
              const delay = (idx % 6) * 80;
              setTimeout(() => {
                el.classList.add(styles.visible);
              }, delay);
            } else {
              el.classList.add(styles.visible);
            }
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    const cards = document.querySelectorAll(`.${styles.card}`);
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [groupedArchivesList]);

  // 监听当前年份
  useEffect(() => {
    const yearEls = document.querySelectorAll("[data-year]");
    if (!yearEls.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const year = Number(entry.target.getAttribute("data-year"));
            if (year) setActiveYear(year);
          }
        });
      },
      { rootMargin: "-10% 0px -50% 0px" },
    );
    yearEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [groupedArchivesList]);

  const scrollToYear = (year: number) => {
    const el = document.querySelector(`[data-year="${year}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (showSkeleton) return <ArchivesSkeleton />;

  return (
    <div className="relative mx-auto flex min-h-screen max-w-4xl flex-col px-6 pt-12 pb-24 md:px-8 md:pt-16">
      <div className="mb-10 space-y-4">
        <h2 className="text-foreground text-3xl font-extrabold tracking-tight md:text-5xl lg:text-5xl">
          归档
        </h2>
        <p className="text-muted-foreground max-w-2xl text-base md:text-lg">
          嗯... 目前共计{" "}
          <span className="text-primary font-semibold">{total}</span>{" "}
          篇博客，继续努力！
        </p>
        <div className="bg-primary/80 mt-4 h-1 w-20 rounded-full"></div>
      </div>

      {/* 时间轴 */}
      <div className={cn(styles.timeline, "relative")}>
        {groupedArchivesList.map((yearArchive) => (
          <React.Fragment key={yearArchive.year}>
            {/* 年份 */}
            <div
              data-year={yearArchive.year}
              className="relative z-10 flex scroll-mt-8 items-center gap-4 py-8 pl-2 md:justify-center md:pl-0"
            >
              <div
                className={cn(styles.leftLine, "hidden h-px flex-1 md:block")}
              ></div>
              <div
                className={cn(
                  "bg-card border-line rounded-full border",
                  "flex items-center gap-3 px-4 py-2 text-sm",
                  "shadow-[0_2px_8px_rgba(0,0,0,0.2)] md:px-6 md:py-3 md:text-base",
                )}
              >
                <div className="bg-foreground h-1.5 w-1.5 rounded-full"></div>
                <span className="text-2xl font-bold tracking-[-0.01em]">
                  {yearArchive.year}
                </span>
                <span className="text-muted-foreground text-sm">
                  共 {yearArchive.total} 篇
                </span>
              </div>
              <div className={cn(styles.rightLine, "h-px flex-1")}></div>
            </div>
            {/* 卡片容器 */}
            <div className="relative flex flex-col items-center gap-6 py-4">
              {yearArchive.blogs.map((blog) => (
                <div
                  key={blog.id}
                  className={cn(
                    styles.card,
                    (blog.globalIndex! + 1) % 2 === 0
                      ? styles.right
                      : styles.left,
                    "relative ml-12 w-[calc(100%-4rem)] self-start",
                    "md:ml-0 md:w-[calc(50%-2.5rem)]",
                    (blog.globalIndex! + 1) % 2 === 0
                      ? "md:self-end"
                      : "md:self-start",
                  )}
                >
                  <div
                    className={`${styles.connector} absolute top-6 hidden h-0.5 w-10 md:block`}
                  ></div>
                  <div
                    className={`${styles.dot} bg-sidebar-accent-foreground absolute top-[calc(1.5rem-2px)] z-[2] hidden h-1.5 w-1.5 rounded-full md:block`}
                  ></div>
                  <Link to={`/blog/${blog.id}`}>
                    <div
                      className={`${styles.cardInner} border-line bg-card relative cursor-pointer overflow-hidden rounded-xl border p-5`}
                    >
                      <h4 className="text-foreground line-clamp-2 text-[0.95rem] leading-normal font-medium">
                        {blog.title}
                      </h4>
                      <time className="text-muted-foreground mt-2 block text-right text-[0.8rem]">
                        {dayjs(blog.createTime).format("YYYY-MM-DD")}
                      </time>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </React.Fragment>
        ))}

        <div className="bg-background relative z-10 flex justify-center pt-12 pb-16">
          <div className="bg-card border-line text-muted-foreground flex items-center gap-2 rounded-full border px-4 py-2 text-sm">
            <span className="bg-muted-foreground h-1.5 w-1.5 rounded-full"></span>
            已经到底啦 ~
          </div>
        </div>
      </div>

      {/* 右侧年份锚点 */}
      {groupedArchivesList.length > 1 && (
        <nav className="fixed top-1/2 right-8 z-20 hidden -translate-y-1/2 flex-col gap-2 md:flex">
          {groupedArchivesList.map((item) => (
            <button
              key={item.year}
              className={cn(
                "cursor-pointer rounded-md border-none bg-transparent",
                "text-muted-foreground px-3 py-1 text-right text-sm",
                "hover:bg-accent hover:text-foreground transition-colors duration-200",
                activeYear === item.year &&
                  "bg-foreground text-background hover:bg-foreground hover:text-background font-semibold",
              )}
              onClick={() => scrollToYear(item.year)}
            >
              {item.year}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
};

export default Archives;
