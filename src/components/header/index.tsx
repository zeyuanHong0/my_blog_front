import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import classNames from "classnames";
import { Sun, Moon } from "lucide-react";

import { cn } from "@/lib/utils";
import { NICKNAME, SLOGAN } from "@/constants";
import { useActiveNav } from "@/hooks/useActiveNav";
import useSettingStore from "@/store/settingStore";

import { Iconify, SvgIcon } from "@/components/Icon";
import Button from "@/components/button";
import LogoIcon from "/blog.svg?raw";

const Header: React.FC = () => {
  const [showLeftSheet, setShowLeftSheet] = useState(false);
  const { themeMode, changeThemeMode } = useSettingStore();

  const navList = [
    { label: "首页", path: "/" },
    { label: "博客", path: "/blogs" },
    { label: "分类", path: "/categories" },
    { label: "标签", path: "/tags" },
    { label: "归档", path: "/archives" },
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
  const drawerNavClass = (path: string) => {
    return classNames(
      "cursor-pointer rounded-xl px-4 py-2 text-sm transition-colors",
      {
        "bg-primary text-primary-foreground hover:bg-primary/90":
          isActive(path),
        "text-foreground hover:bg-accent": !isActive(path),
      },
    );
  };
  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-10 w-full backdrop-blur transition-all",
          "bg-background/50 border-border border-b",
        )}
      >
        <div className="mx-auto flex h-16 w-full items-center justify-between p-4 sm:p-8 md:max-w-screen-md 2xl:max-w-screen-xl">
          {/* logo */}
          <div className="flex items-center gap-4">
            <Link to="/" className="mr-4 hidden sm:flex sm:items-center">
              <SvgIcon className="h-8 w-8" icon={LogoIcon} />
              <span className="ml-2 text-base font-semibold !text-black">
                {NICKNAME}
              </span>
            </Link>
            <div className="sm:hidden">
              <Button
                className="bg-background hover:bg-accent/50 rounded-full p-2"
                onClick={() => setShowLeftSheet(true)}
              >
                <Iconify icon="flowbite:bars-outline" size={20} />
              </Button>
            </div>
          </div>

          {/* 导航 */}
          <div className="flex items-center">
            {/* nav */}
            <div
              className="mr-8 hidden items-center gap-3 sm:flex"
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
          <div className="flex items-center gap-3">
            <Button
              className="bg-background hover:bg-accent/50 rounded-full p-2"
              onClick={changeThemeMode}
            >
              {themeMode === "light" ? <Sun size={16} /> : <Moon size={16} />}
            </Button>
            <Link to={"/admin"} target="_blank" rel="noopener noreferrer">
              <Button className="bg-background hover:bg-accent rounded-full p-2">
                <Iconify icon="tdesign:user-setting" size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </header>
      {/* 侧边栏 */}
      <Sheet open={showLeftSheet} onOpenChange={setShowLeftSheet}>
        <SheetContent side="left" className="w-[80vw] p-0">
          <SheetHeader className="px-4 py-4 text-left">
            <SheetTitle className="text-foreground text-base font-semibold">
              {NICKNAME}
            </SheetTitle>
            <SheetDescription className="text-muted-foreground mt-1 text-sm">
              {SLOGAN}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-14 flex flex-col gap-4">
            {navList.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={drawerNavClass(item.path)}
                onClick={() => setShowLeftSheet(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Header;
