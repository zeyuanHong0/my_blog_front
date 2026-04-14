import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import useDelayedSkeleton from "@/hooks/useDelayedSkeleton";
import { fetchStatus, type Status } from "@/api/status";
import { wsService } from "@/utils/websocket";
import { Skeleton } from "@/components/ui/skeleton";

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const smoothTransition = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1],
} as const;

const StatusCard = () => {
  const [status, setStatus] = useState<Status | null>(null);
  const { showSkeleton, executeRequest } = useDelayedSkeleton(300);

  useEffect(() => {
    executeRequest(async () => {
      try {
        const res = await fetchStatus();
        setStatus({
          ...res.data,
          is_online: res.data.is_online === 1,
        });
      } catch {
        setStatus({
          is_online: false,
          status_text: "离线",
          status_desc: "服务已离线",
        });
      }
    });

    wsService.connect((message) => {
      if (message.event !== "status_update") return;
      setStatus({
        is_online: message.data.is_online === 1,
        status_text: message.data.status_text,
        status_desc: message.data.status_desc,
      });
    });

    return () => {
      wsService.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (showSkeleton) {
    return (
      <div
        className={cn(
          "bg-card border-border/50 flex flex-1 flex-col justify-between",
          "rounded-[2rem] border p-6 shadow-sm",
        )}
      >
        <Skeleton className="h-4 w-20 mb-2" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
    );
  }

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
