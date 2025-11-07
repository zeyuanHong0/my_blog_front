import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import ClosableBadge from "@/components/base/closable-badge";

interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  options: Option[];
  placeholder?: string;
}

function MultiSelect({
  value,
  onChange,
  options,
  placeholder = "请选择",
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);

  const toggleValue = (val: string) => {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange([...value, val]);
    }
  };

  const clearAll = () => onChange([]);

  const selectedLabels = options
    .filter((opt) => value.includes(opt.value))
    .map((opt) => opt.label);

  // 移除某个已选标签
  const handleRemoveBadge = (
    e: React.MouseEvent<HTMLButtonElement>,
    label: string,
  ) => {
    e.stopPropagation();
    if (!label) return;
    const option = options.find((opt) => opt.label === label);
    if (option) {
      const valToRemove = option.value;
      onChange(value.filter((v) => v !== valToRemove));
    }
  };

  // console.log("MultiSelect open state:", open); // 调试日志

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          role="combobox"
          aria-expanded={open}
          className={cn(
            "border-input ring-offset-background placeholder:text-muted-foreground min-h-9 w-full px-3 py-1 text-sm shadow-sm",
            "flex cursor-pointer items-center justify-between rounded-md border bg-transparent",
            "focus:ring-ring focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          )}
        >
          <div className="flex max-w-full flex-wrap gap-1">
            {selectedLabels.length ? (
              selectedLabels.map((label) => (
                // <Badge key={label} variant="secondary" className="text-xs">
                //   {label}
                // </Badge>
                <ClosableBadge
                  key={label}
                  onClose={(e) => handleRemoveBadge(e, label)}
                  className="text-xs"
                >
                  {label}
                </ClosableBadge>
              ))
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="搜索..." />
          <CommandEmpty>未找到选项</CommandEmpty>
          <CommandGroup className="max-h-60 overflow-y-auto">
            {options.map((opt) => (
              <CommandItem
                key={opt.value}
                value={opt.label}
                onSelect={() => {
                  console.log("Selecting:", opt.value); // 调试日志
                  toggleValue(opt.value);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value.includes(opt.value) ? "opacity-100" : "opacity-0",
                  )}
                />
                {opt.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
        {value.length > 0 && (
          <div className="border-t p-2 text-right">
            <Button size="sm" variant="ghost" onClick={clearAll}>
              清空
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default MultiSelect;
