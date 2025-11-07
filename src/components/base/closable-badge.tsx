import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ClosableBadgeProps
  extends React.ComponentPropsWithoutRef<typeof Badge> {
  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ClosableBadge: React.FC<ClosableBadgeProps> = ({
  children,
  onClose,
  className,
  ...props
}) => {
  return (
    <Badge
      variant="secondary"
      className={cn("relative py-1.5 pr-7", className)}
      {...props}
    >
      {children}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="hover:bg-secondary-foreground/20 absolute top-1 right-1 h-5 w-5 rounded-full p-0 transition-colors"
      >
        <X size={4} strokeWidth={1} />
      </Button>
    </Badge>
  );
};

export default ClosableBadge;
