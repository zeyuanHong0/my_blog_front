import { motion } from "framer-motion";

import { TECH_STACK } from "@/constants";
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

const TechCard = () => {
  return (
    <motion.div
      variants={cardVariants}
      transition={smoothTransition}
      className={cn(
        "bg-card border-border/50 flex flex-1 flex-col",
        "rounded-[2rem] border p-6 shadow-sm",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
      )}
    >
      <h3 className="mb-3 text-base font-bold tracking-wide">技能 / 技术栈</h3>
      <div className="flex flex-wrap gap-2">
        {TECH_STACK.map((tech) => (
          <span
            key={tech}
            className={cn(
              "bg-secondary text-secondary-foreground rounded-lg",
              "px-3 py-1.5 text-xs font-medium",
              "hover:bg-primary/10 hover:text-primary transition-colors"
            )}
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default TechCard;
