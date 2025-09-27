import React from "react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import { NICKNAME } from "@/constants";

import Button from "@/components/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TypeIntro from "../type-intro";
import { socialMediaList } from "../social-media";

const HeroSection = () => {
  return (
    <div
      className={cn(
        "relative flex min-h-full max-w-screen-md flex-col justify-center gap-5 px-6",
        "md:px-10 2xl:max-w-7xl",
      )}
    >
      <div className="text-2xl tracking-widest md:text-5xl">你好，我是</div>
      <strong
        className={cn(
          "bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-5xl font-black tracking-widest",
          "md:text-8xl",
        )}
        style={{ WebkitTextFillColor: "transparent" }}
      >
        {NICKNAME}
      </strong>
      <div>
        <TypeIntro />
      </div>
      <div className="text-2xl tracking-widest md:text-5xl">
        喜欢<span className="font-semibold text-[#00d8ff]">React</span>、
        <span className="font-semibold text-[#3AAF78]">Vue</span>、
        <span className="font-semibold text-[#007acc]">TypeScript</span>
        <span className="ml-4">\owo/ ~</span>
      </div>
      <div className="text-base tracking-widest text-[#71717B] md:text-2xl">
        我在这个网站记录我的成长，努力 💪 成为一个更好的程序员。
      </div>
      <div className="flex items-center gap-3">
        <Button className="rounded-3xl px-3 py-2">
          <span className="text-[14px] font-medium">我的博客</span>
        </Button>
        <Button className="rounded-3xl px-3 py-2">
          <span className="text-[14px] font-medium">关于我</span>
        </Button>
      </div>
      <ul className={cn("flex space-x-4")}>
        {socialMediaList.map((el) => (
          <li key={el.link}>
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link to={el.link} target="_blank">
                    <Button className="rounded-full p-2">{el.icon}</Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="top">{el.label}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeroSection;
