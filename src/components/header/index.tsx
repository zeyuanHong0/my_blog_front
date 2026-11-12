import React from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  FileText,
  Hash,
  House,
  LayoutGrid,
} from "lucide-react";
import classNames from "classnames";

import { cn } from "@/lib/utils";
import { NICKNAME } from "@/constants";
import { useActiveNav } from "@/hooks/useActiveNav";

import { Iconify, SvgIcon } from "@/components/Icon";
import ThemeModeSwitcher from "@/components/ThemeModeSwitcher";
import Button from "@/components/button";
import LogoIcon from "/blog.svg?raw";

const Header: React.FC = () => {
  const navList = [
    { label: "首页", path: "/", icon: House },
    { label: "文章", path: "/blogs", icon: FileText },
    { label: "分类", path: "/categories", icon: LayoutGrid },
    { label: "标签", path: "/tags", icon: Hash },
    {
      label: "归档",
      path: "/archives",
      icon: CalendarDays,
    },
    // { label: "关于", path: "/about" },
  ];
  const { isActive } = useActiveNav(navList);

  const navClass = (path: string) => {
    return classNames(
      "cursor-pointer px-4 py-2 text-sm transition-colors hover:font-semibold hover:text-foreground",
      {
        "text-foreground font-semibold": isActive(path),
        "text-muted-foreground": !isActive(path),
      },
    );
  };
  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full backdrop-blur transition-all",
          "bg-background/50 border-border border-b",
        )}
      >
        <div className="mx-auto flex h-16 w-full items-center justify-between p-4 sm:p-8 md:max-w-screen-md 2xl:max-w-screen-xl">
          {/* logo */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center md:hidden">
              <SvgIcon className="h-7 w-7" icon={LogoIcon} />
              <span className="text-foreground ml-2 text-sm font-semibold">
                {NICKNAME}
              </span>
            </Link>
            <Link to="/" className="mr-4 hidden md:flex md:items-center">
              <SvgIcon className="h-8 w-8" icon={LogoIcon} />
              <span className="text-foreground ml-2 text-base font-semibold">
                {NICKNAME}
              </span>
            </Link>
          </div>

          {/* 导航 */}
          <div className="flex items-center">
            {/* nav */}
            <div
              className="mr-8 hidden items-center gap-3 md:flex"
              aria-label="主导航"
            >
              {navList.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={navClass(item.path)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          {/* 右侧按钮 */}
          <div className="flex items-center gap-3 md:gap-6">
            {/* <Button
              className="bg-background hover:bg-accent/50 rounded-full p-2"
              onClick={changeThemeMode}
            >
              {themeMode === "light" ? <Sun size={16} /> : <Moon size={16} />}
            </Button> */}
            <Link to={"/admin"} target="_blank" rel="noopener noreferrer">
              <Button className="bg-background hover:bg-accent rounded-full p-2">
                <Iconify icon="tdesign:user-setting" size={16} />
              </Button>
            </Link>
            {/* 主题切换 */}
            <ThemeModeSwitcher />
          </div>
        </div>
      </header>
      <nav
        aria-label="移动端主导航"
        className="border-border/70 bg-background/85 fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] z-50 mx-auto flex w-[calc(100%-1.5rem)] max-w-[420px] items-center gap-1 rounded-[1.4rem] border p-1.5 shadow-lg shadow-black/10 backdrop-blur-xl md:hidden"
      >
        {navList.map((item) => {
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-[1rem] py-2 text-[10px] transition-all",
                active
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground hover:bg-accent/70 hover:text-foreground",
              )}
            >
              <item.icon size={19} strokeWidth={active ? 2.25 : 1.75} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default Header;
