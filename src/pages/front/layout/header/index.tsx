import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";

import { IconButton, SvgIcon, Iconify } from "@/components/Icon";
import Button from "../button";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  //   找到当前激活的链接
  const currentPath = window.location.pathname;
  const isActive = (path: string) => currentPath === path;

  return (
    <header className="bg-white sticky top-0 z-10 w-full border-b border-[#E4E4E7]">
      <div className="mx-auto flex h-16 w-full items-center justify-between p-4 sm:p-8 md:max-w-screen-md 2xl:max-w-screen-xl">
        {/* logo */}
        <div className="flex items-center gap-4">
          <Link to="/" className="mr-4 hidden sm:flex sm:items-center">
            <span className="ml-2 text-base font-semibold !text-black">
              哲理源
            </span>
          </Link>
        </div>

        <div className="flex items-center">
          {/* nav */}
          <div
            className="mr-8 hidden items-center gap-3 md:flex"
            aria-label="主导航"
          >
            <div
              className={classNames(
                "cursor-pointer px-4 py-2 text-sm transition-colors hover:font-semibold hover:text-black",
                {
                  "text-black": isActive("/"),
                  "font-semibold": isActive("/"),
                  "text-gray-600": !isActive("/"),
                },
              )}
              onClick={() => navigate("/")}
            >
              首页
            </div>
            <div
              className={classNames(
                "cursor-pointer px-4 py-2 text-sm transition-colors hover:font-semibold hover:text-black",
                {
                  "text-black": isActive("/blog"),
                  "font-semibold": isActive("/blog"),
                  "text-gray-600": !isActive("/blog"),
                },
              )}
              onClick={() => navigate("/blog")}
            >
              博客
            </div>
            <div
              className={classNames(
                "cursor-pointer px-4 py-2 text-sm transition-colors hover:font-semibold hover:text-black",
                {
                  "text-black": isActive("/about"),
                  "font-semibold": isActive("/about"),
                  "text-gray-600": !isActive("/about"),
                },
              )}
              onClick={() => navigate("/about")}
            >
              关于
            </div>
          </div>
          {/* 按钮 */}
          <div className="flex items-center gap-3">
            <Button
              icon={<Iconify icon="tdesign:logo-github-filled" size={16} />}
            />
            <Button icon={<Iconify icon="tdesign:user-setting" size={16} />} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
