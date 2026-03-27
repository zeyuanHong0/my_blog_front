import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const smoothTransition = {
  type: "spring",
  stiffness: 260,
  damping: 24,
} as const;

const StatusCard = () => {
  return (
    <motion.div
      variants={cardVariants}
      transition={smoothTransition}
      className={cn(
        "bg-card border-border/50 flex flex-1 cursor-pointer flex-col justify-between",
        "rounded-[2rem] border p-6 shadow-sm",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
      )}
    >
      <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
        <span className="relative flex h-2.5 w-2.5">
          <span className={cn(
            "absolute inline-flex h-full w-full",
            "animate-ping rounded-full bg-green-400 opacity-75"
          )}></span>
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
        </span>
        当前状态
      </div>
      <div>
        <h3 className="text-foreground mb-1 text-xl font-bold">活跃中</h3>
        <p className="text-muted-foreground text-sm">正在努力敲代码中...</p>
      </div>
    </motion.div>
  );
};

export default StatusCard;
