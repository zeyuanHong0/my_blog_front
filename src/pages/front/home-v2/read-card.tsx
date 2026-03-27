import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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

const ReadCard = () => {
  const navigate = useNavigate();

  // 前往博客列表页
  const handleReadBlogs = () => {
    navigate("/blogs");
  };
  return (
    <motion.div
      variants={cardVariants}
      transition={smoothTransition}
      className={cn(
        "bg-primary/5 border-primary/10 group",
        "flex flex-1 cursor-pointer flex-col items-start justify-between",
        "rounded-[2rem] border p-6 shadow-sm",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
      )}
    >
      <p className="text-primary text-xs font-semibold tracking-widest uppercase">
        最近更新
      </p>
      <div className="flex w-full items-end justify-between">
        <h3
          onClick={handleReadBlogs}
          className={cn(
            "text-foreground max-w-[65%] text-2xl font-bold",
            "decoration-2 underline-offset-4 group-hover:underline"
          )}
        >
          阅读博客
        </h3>
        <div
          onClick={handleReadBlogs}
          className={cn(
            "bg-primary text-primary-foreground",
            "flex h-10 w-10 items-center justify-center rounded-full shadow",
            "transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md"
          )}
        >
          <ArrowRight size={18} strokeWidth={2.5} />
        </div>
      </div>
    </motion.div>
  );
};

export default ReadCard;
