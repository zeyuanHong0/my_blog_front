import { Column } from "@tanstack/react-table";

import { cn } from "@/lib/utils";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

function DataTableColumnHeader<TData, TValue>({
  title,
  className,
}: Omit<DataTableColumnHeaderProps<TData, TValue>, "column">) {
  return (
    <div className={cn("flex items-center font-bold text-black", className)}>
      {title}
    </div>
  );
}

export default DataTableColumnHeader;
