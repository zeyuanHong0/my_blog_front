import { motion } from "framer-motion";

import { NICKNAME, HOME_SLOGAN } from "@/constants";
import { cn } from "@/lib/utils";

const heroCard = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1 },
};

const smoothTransition = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1],
} as const;

const HeroCard = () => {
  return (
    <motion.div
      variants={heroCard}
      transition={smoothTransition}
      className={cn(
        "bg-card border-border/50 group relative",
        "flex min-h-[320px] flex-col justify-between overflow-hidden",
        "rounded-[2rem] border p-8 shadow-sm",
        "transition-all duration-500 ease-out hover:-translate-y-[2px] hover:shadow-lg hover:shadow-primary/5",
        "lg:col-span-2 lg:min-h-[400px]",
      )}
    >
      {/* 右上角装饰 */}
      <div className="flex items-center justify-between">
        <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-semibold tracking-widest uppercase">
          {"A Web <Developer /> ."}
        </span>
        <span className="text-muted-foreground/40 font-mono text-sm">
          {new Date().getFullYear()} ✦
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

      <div
        className={cn(
          "bg-primary/10 group-hover:bg-primary/20",
          "absolute -right-16 -bottom-16 h-72 w-72",
          "rounded-full blur-3xl transition-colors duration-700",
        )}
      />
    </motion.div>
  );
};

export default HeroCard;
