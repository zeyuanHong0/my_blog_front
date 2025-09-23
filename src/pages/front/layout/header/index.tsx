import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import classNames from "classnames";

import { cn } from "@/lib/utils";

import { Iconify } from "@/components/Icon";
import Button from "@/components/button";

const Header: React.FC = () => {
  const [showLeftSheet, setShowLeftSheet] = useState(false);
  const navigate = useNavigate();
  //   找到当前激活的链接
  const currentPath = window.location.pathname;
  const isActive = (path: string) => currentPath === path;

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
      "cursor-pointer rounded-xl px-4 py-2 text-sm transition-colors hover:bg-[#F2F2F3]",
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
              <span className="ml-2 text-base font-semibold !text-black">
                哲理源
              </span>
            </Link>
            <div className="sm:hidden">
              <Button
                icon={<Iconify icon="flowbite:bars-outline" size={20} />}
                onClick={() => setShowLeftSheet(true)}
              />
            </div>
          </div>

          <div className="flex items-center">
            {/* nav */}
            <div
              className="mr-8 hidden items-center gap-3 sm:flex"
              aria-label="主导航"
            >
              <div
                className={navClass("/home")}
                onClick={() => navigate("/home")}
              >
                首页
              </div>
              <div
                className={navClass("/blog")}
                onClick={() => navigate("/blog")}
              >
                博客
              </div>
              <div
                className={navClass("/about")}
                onClick={() => navigate("/about")}
              >
                关于
              </div>
            </div>
            {/* 按钮 */}
            <div className="flex items-center gap-3">
              <Button
                className="rounded-full px-2 py-2"
                icon={<Iconify icon="tdesign:logo-github-filled" size={16} />}
              />
              <Button
                className="rounded-full px-2 py-2"
                icon={<Iconify icon="tdesign:user-setting" size={16} />}
              />
            </div>
          </div>
        </div>
      </header>
      {/* 侧边栏 */}
      <Sheet open={showLeftSheet} onOpenChange={setShowLeftSheet}>
        <SheetContent side="left" className="w-[400px] p-0">
          <SheetHeader className="px-4 py-4 text-left">
            <SheetTitle className="text-base font-semibold text-black">
              哲理源
            </SheetTitle>
            <SheetDescription className="mt-1 text-sm text-gray-600">
              努力做一个更好的程序员
            </SheetDescription>
          </SheetHeader>
          <div className="mt-14 flex flex-col gap-4">
            <div
              className={drawerNavClass("/home")}
              onClick={() => {
                navigate("/home");
                setShowLeftSheet(false);
              }}
            >
              首页
            </div>
            <div
              className={drawerNavClass("/blog")}
              onClick={() => {
                navigate("/blog");
                setShowLeftSheet(false);
              }}
            >
              博客
            </div>
            <div
              className={drawerNavClass("/about")}
              onClick={() => {
                navigate("/about");
                setShowLeftSheet(false);
              }}
            >
              关于
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Header;
