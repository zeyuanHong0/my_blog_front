import React, { forwardRef } from "react";

import { cn } from "@/lib/utils";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  text?: string;
}

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ icon, text, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "flex items-center justify-center border border-[#E8E8EB] bg-white hover:bg-[#F2F2F3]",
          className,
        )}
        {...props}
      >
        {icon && icon}
        {text && <span className="text-[14px] font-medium">{text}</span>}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
