import React from "react";
import { motion } from "framer-motion";

import { NICKNAME, HOME_SLOGAN } from "@/constants";
// import IntroScrollMouse from "./intro-scroll-mouse";

// 卡片进场动画：从下方浮上来
const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const Home = () => {
  return (
    <div className="relative flex min-h-[calc(100vh-64px)] w-full flex-col items-center justify-center px-4 py-10 sm:px-8">
      {/* 上半部分：主卡 + 右侧3小卡并排 */}
      <motion.div
        className="z-10 mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 lg:grid-cols-3"
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.08 }}
      >
        {/* ── 卡片 1：主视觉区 (lg: 占左侧2/3) ── */}
        <motion.div
          variants={card}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="bg-card border-border/50 group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-[2rem] border p-8 shadow-sm transition-shadow duration-300 hover:shadow-md lg:col-span-2 lg:min-h-[400px]"
        >
          {/* 右上角装饰 */}
          <div className="flex items-center justify-between">
            <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-semibold tracking-widest uppercase">
              Frontend Dev
            </span>
            <span className="text-muted-foreground/40 font-mono text-sm">
              2026 ✦
            </span>
          </div>

          {/* 主标题 */}
          <div className="z-10 flex flex-col gap-3">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-[3.25rem]">
              你好，我是{" "}
              <span className="text-primary relative">
                {NICKNAME}
                {/* 下划线装饰 */}
                <span className="bg-primary/30 absolute -bottom-1 left-0 h-[3px] w-full rounded-full"></span>
              </span>
            </h1>
            <p className="text-muted-foreground max-w-[90%] text-base leading-relaxed md:text-lg">
              {HOME_SLOGAN}
            </p>
          </div>

          <div className="bg-primary/10 group-hover:bg-primary/20 absolute -right-16 -bottom-16 h-72 w-72 rounded-full blur-3xl transition-colors duration-700" />
        </motion.div>

        {/* ── 右侧纵向 3 小卡容器 ── */}
        <motion.div variants={card} className="flex flex-col gap-4">
          {/* ── 卡片 2：当前状态 ── */}
          <motion.div
            variants={card}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="bg-card border-border/50 flex flex-1 flex-col justify-between rounded-[2rem] border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
              </span>
              当前状态
            </div>
            <div>
              <h3 className="text-foreground mb-1 text-xl font-bold">活跃中</h3>
              <p className="text-muted-foreground text-sm">
                正在努力敲代码中...
              </p>
            </div>
          </motion.div>

          {/* ── 卡片 3：阅读博客入口 ── */}
          <motion.div
            variants={card}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="bg-primary/5 border-primary/10 group flex flex-1 cursor-pointer flex-col items-start justify-between rounded-[2rem] border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <p className="text-primary text-xs font-semibold tracking-widest uppercase">
              最近更新
            </p>
            <div className="flex w-full items-end justify-between">
              <h3 className="text-foreground max-w-[65%] text-2xl font-bold decoration-2 underline-offset-4 group-hover:underline">
                阅读博客
              </h3>
              <div className="bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full shadow transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* ── 卡片 4：技能栈 ── */}
          <motion.div
            variants={card}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="bg-card border-border/50 flex flex-1 flex-col rounded-[2rem] border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <h3 className="mb-3 text-base font-bold tracking-wide">
              技能 / 技术栈
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "React",
                "Vue",
                "TypeScript",
                "Tailwind CSS",
                "Node.js",
                "Nest.js",
              ].map((tech) => (
                <span
                  key={tech}
                  className="bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── 下半部分：Github 活跃度 ── */}
      <motion.div
        variants={card}
        initial="hidden"
        animate="show"
        transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.4 }}
        className="bg-card border-border/50 group relative z-10 mx-auto mt-4 flex w-full max-w-5xl cursor-pointer flex-col overflow-hidden rounded-[2rem] border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-8"
      >
        <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

        {/* 标题 */}
        <div className="z-10 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-secondary flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-foreground"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </div>
            <div>
              <p className="text-foreground text-sm font-bold">@zeyuanHong0</p>
              <p className="text-muted-foreground text-xs">GitHub 年度贡献</p>
            </div>
          </div>
          <span className="text-muted-foreground/60 font-mono text-xs">
            {} contributions
          </span>
        </div>

        {/* 贡献热力图（直接用 ghchart.rshah.org 的公开 SVG API，无需 token） */}
        {/*  TODO https://ghchart.rshah.org/40c463/zeyuanHong0 dark 模式 */}
        <div className="z-10 w-full overflow-hidden rounded-xl">
          <img
            src="https://ghchart.rshah.org/zeyuanHong0"
            alt="GitHub 贡献热力图"
            className="w-full object-contain opacity-90 transition-opacity duration-300 group-hover:opacity-100"
            style={{ imageRendering: "crisp-edges" }}
          />
        </div>
      </motion.div>

      {/* 底部滚动提示 */}
      {/* <div className="absolute inset-x-0 bottom-4 grid place-content-center opacity-60 md:bottom-6">
        <IntroScrollMouse />
      </div> */}
    </div>
  );
};

export default Home;
