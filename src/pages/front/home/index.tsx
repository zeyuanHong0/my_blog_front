import React from "react";

import { cn } from "@/lib/utils";

import Button from "@/components/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipArrow,
} from "@/components/ui/tooltip";
import TypeIntro from "./type-intro";
import { socialMediaList } from "./social-media";

const Home = () => {
  return (
    <div
      className={`flex min-h-full max-w-screen-md flex-col justify-center gap-5 px-6 md:px-10 2xl:max-w-7xl`}
    >
      <div className="text-2xl tracking-widest md:text-5xl">你好，我是</div>
      <strong
        className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-5xl font-black tracking-widest md:text-8xl"
        style={{ WebkitTextFillColor: "transparent" }}
      >
        哲理源
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
        <Button text="我的博客" className="rounded-3xl px-3 py-2" />
        <Button text="关于我" className="rounded-3xl px-3 py-2" />
      </div>
      <ul className={cn("flex space-x-4")}>
        {socialMediaList.map((el) => (
          <li key={el.link}>
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button icon={el.icon} className="rounded-full p-2" />
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

export default Home;
