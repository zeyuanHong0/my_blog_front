import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import useStatus from "@/hooks/useStatus";

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const smoothTransition = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1],
} as const;

const StatusCard = () => {
  const status = useStatus();
  return (
    <motion.div
      variants={cardVariants}
      transition={smoothTransition}
      className={cn(
        "bg-card border-border/50 flex flex-1 cursor-pointer flex-col justify-between",
        "rounded-[2rem] border p-6 shadow-sm",
        "hover:shadow-primary/5 transition-all duration-500 ease-out hover:-translate-y-[2px] hover:shadow-lg",
      )}
    >
      <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
        <span className="relative flex h-2.5 w-2.5">
          <span
            className={cn(
              "absolute inline-flex h-full w-full",
              "rounded-full opacity-75",
              status?.is_online ? "bg-green-400" : "bg-gray-400",
              status?.is_online ? "animate-ping" : "",
            )}
          ></span>
          <span
            className={cn(
              "relative inline-flex h-2.5 w-2.5 rounded-full",
              status?.is_online ? "bg-green-500" : "bg-gray-500",
            )}
          ></span>
        </span>
        当前状态
      </div>
      <div>
        <h3 className="text-foreground mb-1 text-xl font-bold">
          {status?.status_text}
        </h3>
        <p className="text-muted-foreground text-sm">{status?.status_desc}</p>
      </div>
    </motion.div>
  );
};

export default StatusCard;
