import { motion } from "framer-motion";
import { Github } from "lucide-react";

import { cn } from "@/lib/utils";
import useSettingStore from "@/store/settingStore";

const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const smoothTransition = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1],
} as const;

const GitHubCard = () => {
  const { isDark } = useSettingStore(); // 主题
  return (
    <motion.div
      variants={card}
      initial="hidden"
      animate="show"
      transition={{ ...smoothTransition, delay: 0.4 }}
      className={cn(
        "bg-card border-border/50 group relative z-10",
        "mx-auto mt-4 flex w-full max-w-5xl cursor-pointer flex-col overflow-hidden",
        "rounded-[2rem] border p-6 shadow-sm",
        "hover:shadow-primary/5 transition-all duration-500 ease-out hover:-translate-y-[2px] hover:shadow-lg",
        "md:p-8",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          "-translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent",
          "transition-transform duration-700 group-hover:translate-x-full",
        )}
      />

      {/* 标题 */}
      <div className="z-10 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-secondary flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
            <Github size={18} />
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
      <div className="z-10 w-full overflow-hidden rounded-xl">
        <img
          src={
            isDark
              ? "https://ghchart.rshah.org/4AE168/zeyuanHong0"
              : "https://ghchart.rshah.org/30a14e/zeyuanHong0"
          }
          alt="GitHub 贡献热力图"
          className={cn(
            "w-full object-contain opacity-90 transition-opacity duration-300 group-hover:opacity-100",
            "dark:brightness-90 dark:hue-rotate-180 dark:invert",
          )}
          style={{ imageRendering: "crisp-edges" }}
        />
      </div>
    </motion.div>
  );
};

export default GitHubCard;
