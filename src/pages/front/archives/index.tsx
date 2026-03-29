import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { BookText } from "lucide-react";

import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { fetchBlogArchives } from "@/api/blog";

type Blog = {
  id: string;
  title: string;
  createTime: string;
};

type YearArchive = {
  year: number;
  total: number;
  months: {
    month: number;
    blogs: Blog[];
  }[];
};

type ArchivesMap = Record<number, YearArchive>;

const Archives = () => {
  useDocumentTitle("归档");
  const [total, setTotal] = useState(0);
  const [groupedArchivesList, setGroupedArchivesList] = useState<YearArchive[]>(
    [],
  );
  // 处理归档结构
  const groupArchives = (list: Blog[]) => {
    const archivesMap: ArchivesMap = {};
    list.forEach((item: Blog) => {
      const year = dayjs(item.createTime).year();
      const month = dayjs(item.createTime).month() + 1;
      if (!archivesMap[year]) {
        archivesMap[year] = {
          year,
          total: 0,
          months: [],
        };
      }
      archivesMap[year].total++;
      if (!archivesMap[year].months[month]) {
        archivesMap[year].months[month] = {
          month,
          blogs: [],
        };
      }
      archivesMap[year].months[month].blogs.push(item);
    });
    // console.log(Object.values(archivesMap));
    // =>数组，排序
    const groupedList = Object.values(archivesMap)
      .sort((a, b) => b.year - a.year)
      .map((item) => {
        return {
          ...item,
          months: Object.values(item.months).sort((a, b) => b.month - a.month),
        };
      });
    setGroupedArchivesList(groupedList);
  };
  useEffect(() => {
    const fetchData = async () => {
      const res: any = await fetchBlogArchives();
      setTotal(res.data?.length ?? 0);
      groupArchives(res.data || []);
    };
    fetchData();
  }, []);

  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col px-6 pt-12 pb-24 md:px-8 md:pt-16">
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

      <div className="animate-in fade-in slide-in-from-bottom-4 flex-1 duration-700 ease-in-out">
        <div className="border-muted relative mt-8 ml-3 border-l-2 md:ml-4">
          {groupedArchivesList.map((yearArchive) => (
            <div key={yearArchive.year} className="mb-12">
              <div className="relative">
                <div className="bg-background border-primary absolute top-2 -left-[9px] h-4 w-4 rounded-full border-[3px] md:-left-[9px]"></div>
                <h2 className="text-foreground ml-8 text-3xl font-bold tracking-tight">
                  {yearArchive.year}
                  <span className="text-muted-foreground ml-3 text-sm font-normal">
                    共 {yearArchive.total} 篇
                  </span>
                </h2>
              </div>

              <div className="mt-6 ml-8 space-y-8">
                {yearArchive.months.map((monthArchive) => (
                  <div key={monthArchive.month}>
                    <h3 className="text-muted-foreground mb-4 flex items-center gap-2 text-xl font-semibold">
                      <span className="bg-muted rounded-md px-2 py-1 text-sm">
                        {monthArchive.month} 月
                      </span>
                    </h3>
                    <ul className="space-y-2">
                      {monthArchive.blogs.map((blog) => (
                        <li key={blog.id}>
                          <Link
                            className="group hover:bg-muted/50 hover:border-border flex flex-col justify-between rounded-lg border border-transparent p-3 transition-colors md:flex-row md:items-center"
                            to={`/blog/${blog.id}`}
                          >
                            <div className="flex flex-1 items-center gap-3 overflow-hidden">
                              <BookText
                                size={18}
                                className="text-muted-foreground group-hover:text-primary flex-shrink-0 transition-colors"
                              />
                              <span className="group-hover:text-primary text-foreground truncate text-base transition-colors">
                                {blog.title}
                              </span>
                            </div>
                            <div className="text-muted-foreground mt-2 ml-8 flex-shrink-0 font-mono text-sm md:mt-0 md:ml-4">
                              {dayjs(blog.createTime).format("MM-DD")}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Archives;
