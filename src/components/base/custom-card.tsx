import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface CustomCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  icon?: React.ReactNode;
  description?: string;
  contentClassName?: string;
}

const CustomCard: React.FC<CustomCardProps> = ({
  title,
  icon,
  description,
  children,
  className,
  contentClassName,
  ...props
}) => {
  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader className="relative flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="z-10 w-full space-y-1 pr-6">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {description && (
            <CardDescription className="text-xs">{description}</CardDescription>
          )}
        </div>
        {icon && (
          <div className="text-muted-foreground absolute top-6 right-6 z-0">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent className={contentClassName}>{children}</CardContent>
    </Card>
  );
};

export default CustomCard;
