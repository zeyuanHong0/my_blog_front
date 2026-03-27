import React from "react";
import { motion } from "framer-motion";

import HeroCard from "./hero-card";
import GitHubCard from "./github-card";
import StatusCard from "./status-card";
import ReadCard from "./read-card";
import TechCard from "./tech-card";

const Home = () => {
  return (
    <div className="relative flex min-h-[calc(100vh-64px)] w-full flex-col items-center justify-center px-4 py-10 sm:px-8">
      {/* 上半部分：主卡 + 右侧3小卡并排 */}
      <motion.div
        className="z-10 mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 lg:grid-cols-3"
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.12 }}
      >
        {/* ── 卡片 1：主视觉区 (lg: 占左侧2/3) ── */}
        <HeroCard />
        {/* ── 右侧纵向 3 小卡容器 ── */}
        <motion.div
          transition={{ staggerChildren: 0.08 }}
          className="flex flex-col gap-4"
        >
          {/* ── 卡片 2：当前状态 ── */}
          <StatusCard />
          {/* ── 卡片 3：阅读博客入口 ── */}
          <ReadCard />
          {/* ── 卡片 4：技能栈 ── */}
          <TechCard />
        </motion.div>
      </motion.div>
      {/* ── 下半部分：Github 活跃度 ── */}
      <GitHubCard />
    </div>
  );
};

export default Home;
