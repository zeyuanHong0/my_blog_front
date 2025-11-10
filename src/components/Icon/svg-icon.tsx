import parse from "html-react-parser";
import { cn } from "@/lib/utils";

interface SvgIconProps {
  icon: string;
  size?: number | string;
  className?: string;
}

export default function SvgIcon({ icon, size, className = "" }: SvgIconProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center [&>svg]:h-full [&>svg]:w-full",
        !size && "h-4 w-4",
        className,
      )}
      style={size ? { width: size, height: size } : undefined}
    >
      {parse(icon)}
    </div>
  );
}
