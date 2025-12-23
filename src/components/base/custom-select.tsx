import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  list: { label: string; value: string }[];
}

const CustomSelect = ({ list, value, onChange }: CustomSelectProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="请选择分类" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {list.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
