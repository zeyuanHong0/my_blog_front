import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { BookText } from "lucide-react";

const Archives = () => {
  const list = [
    {
      id: 1,
      title: "测试博客1",
      createTime: "2026-01-01",
    },
    {
      id: 2,
      title: "测试博客2",
      createTime: "2025-10-02",
    },
    {
      id: 3,
      title: "测试博客3",
      createTime: "2025-05-03",
    },
    {
      id: 4,
      title: "测试博客4",
      createTime: "2025-01-04",
    },
  ];
  useEffect(() => {
    list.map((item) => {
      console.log(item.title);
    });
  }, []);
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-8 pt-8 pb-24">
      <h2 className="pb-4 text-3xl font-bold md:text-4xl">归档</h2>
      <p className="text-muted-foreground text-lg">
        嗯... 目前共计 <span className="font-medium">26</span> 篇博客。
        继续努力！
      </p>
      {/* 博客列表 */}
      <div className="mt-14">
        <h2 className="mb-4 text-2xl font-bold">
          <span>2026</span>
          <span className="text-muted-foreground ml-4 text-sm font-normal">
            共3篇博客
          </span>
        </h2>
        <div>
          <h3 className="text-xl font-bold">1月</h3>
          <ul className="my-4 list-inside">
            <li className="text-muted-foreground hover:text-primary mb-4 flex items-center">
              <BookText size={16} className="mr-2" />
              <Link
                className="flex flex-1 items-center justify-between text-sm"
                to="/blog/1"
              >
                <div className="mr-4 line-clamp-1 flex-1 break-all">
                  {" "}
                  测试博客1
                </div>
                <div className="text-muted-foreground w-20 text-xs">
                  1月 06, 2026
                </div>
              </Link>
            </li>
            <li className="text-muted-foreground hover:text-primary mb-4 flex items-center">
              <BookText size={16} className="mr-2" />
              <Link
                className="flex flex-1 items-center justify-between text-sm"
                to="/blog/2"
              >
                <div className="mr-4 line-clamp-1 flex-1 break-all">
                  测试博客2
                </div>
                <div className="text-muted-foreground w-20 text-xs">
                  1月 06, 2026
                </div>
              </Link>
            </li>
            <li className="text-muted-foreground hover:text-primary mb-4 flex items-center">
              <BookText size={16} className="mr-2" />
              <Link
                className="flex flex-1 items-center justify-between text-sm"
                to="/blog/3"
              >
                <div className="mr-4 line-clamp-1 flex-1 break-all">
                  测试博客3
                </div>
                <div className="text-muted-foreground w-20 text-xs">
                  1月 03, 2026
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Archives;
