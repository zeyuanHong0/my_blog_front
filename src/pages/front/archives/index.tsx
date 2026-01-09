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
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-8 pt-8 pb-24">
      <h2 className="pb-4 text-3xl font-bold md:text-4xl">归档</h2>
      <p className="text-muted-foreground text-lg">
        嗯... 目前共计 <span className="font-medium">{total}</span> 篇博客。
        继续努力！
      </p>
      {/* 博客列表 */}
      <div className="mt-12">
        {groupedArchivesList.map((yearArchive) => (
          <React.Fragment key={yearArchive.year}>
            <h2 className="mb-4 text-2xl font-bold">
              <span>{yearArchive.year}</span>
              <span className="text-muted-foreground ml-4 text-sm font-normal">
                共{yearArchive.total}篇博客
              </span>
            </h2>
            {yearArchive.months.map((monthArchive) => (
              <div>
                <h3 className="text-xl font-bold">{monthArchive.month}月</h3>
                <ul className="my-4 list-inside">
                  {monthArchive.blogs.map((blog) => (
                    <li className="text-muted-foreground hover:text-primary mb-4 flex items-center">
                      <BookText size={16} className="mr-2" />
                      <Link
                        className="flex flex-1 items-center justify-between text-sm"
                        to={`/blog/${blog.id}`}
                      >
                        <div className="mr-4 line-clamp-1 flex-1 break-all">
                          {blog.title}
                        </div>
                        <div className="text-muted-foreground w-20 text-xs">
                          {dayjs(blog.createTime).format("M月 DD, YYYY")}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Archives;
