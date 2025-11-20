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

import { cn } from "@/lib/utils";
import { NICKNAME, SLOGAN } from "@/constants";
import { useActiveNav } from "@/hooks/useActiveNav";

import { Iconify, SvgIcon } from "@/components/Icon";
import Button from "@/components/button";
import LogoIcon from "/blog.svg?raw";

const Header: React.FC = () => {
  const [showLeftSheet, setShowLeftSheet] = useState(false);

  const navList = [
    { label: "首页", path: "/home" },
    { label: "博客", path: "/blogs" },
    { label: "标签", path: "/tags" },
    // { label: "关于", path: "/about" },
  ];
  const { isActive } = useActiveNav(navList);

  const navClass = (path: string) => {
    return classNames(
      "cursor-pointer px-4 py-2 text-sm transition-colors hover:font-semibold hover:text-black",
      {
        "text-black font-semibold": isActive(path),
        "text-gray-600": !isActive(path),
      },
    );
  };
  const drawerNavClass = (path: string) => {
    return classNames(
      "cursor-pointer rounded-xl px-4 py-2 text-sm transition-colors",
      {
        "bg-black text-[#fff] hover:bg-[#333]": isActive(path),
        "hover:bg-[#F2F2F3]": !isActive(path),
      },
    );
  };
  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-10 w-full backdrop-blur transition-all",
          "bg-background/50 border-b border-[#E4E4E7]",
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
                className="rounded-full p-2"
                onClick={() => setShowLeftSheet(true)}
              >
                <Iconify icon="flowbite:bars-outline" size={20} />
              </Button>
            </div>
          </div>

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
            {/* 按钮 */}
            <div className="flex items-center gap-3">
              <Link to={"https://github.com/your-username"}>
                <Button className="rounded-full p-2">
                  <Iconify icon="tdesign:logo-github-filled" size={16} />
                </Button>
              </Link>
              <Link to={"/admin"}>
                <Button className="rounded-full p-2">
                  <Iconify icon="tdesign:user-setting" size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      {/* 侧边栏 */}
      <Sheet open={showLeftSheet} onOpenChange={setShowLeftSheet}>
        <SheetContent side="left" className="w-[80vw] p-0">
          <SheetHeader className="px-4 py-4 text-left">
            <SheetTitle className="text-base font-semibold text-black">
              {NICKNAME}
            </SheetTitle>
            <SheetDescription className="mt-1 text-sm text-gray-600">
              {SLOGAN}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-14 flex flex-col gap-4">
            {navList.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={drawerNavClass(item.path)}
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
