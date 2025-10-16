"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Pen, Trash } from "lucide-react";

import { formatDateTime } from "@/utils/getTime";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DataTableColumnHeader from "@/components/data-table-column-header";
import DataTablePagination from "@/components/Pagination";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export type blog = {
  id: string;
  title: string;
  tags: string[];
  published: boolean;
  createTime: string;
  updateTime: string;
};

const columns: ColumnDef<blog>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: () => <DataTableColumnHeader title="标题" />,
    cell: ({ row }) => (
      <div className="min-w-[120px] whitespace-nowrap">
        {row.getValue("title")}
      </div>
    ),
  },
  {
    accessorKey: "tags",
    header: () => <DataTableColumnHeader title="标签" />,
    cell: ({ row }) => {
      const tags = row.getValue("tags") as string[];
      return (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-black px-2 py-1 text-xs text-white"
            >
              {tag}
            </span>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "published",
    header: () => <DataTableColumnHeader title="发布状态" />,
    cell: ({ row }) => {
      const published = row.getValue("published") as boolean;
      return <Switch checked={published} />;
    },
  },
  {
    accessorKey: "createTime",
    header: () => <DataTableColumnHeader title="创建时间" />,
    cell: ({ row }) => {
      const [date, time] = formatDateTime(row.getValue("createTime"));
      return (
        <div className="flex flex-col gap-1">
          <div>{date}</div>
          <div className="text-muted-foreground text-xs">{time}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "updateTime",
    header: () => <DataTableColumnHeader title="更新时间" />,
    cell: ({ row }) => {
      const [date, time] = formatDateTime(row.getValue("updateTime"));
      return (
        <div className="flex flex-col gap-1">
          <div>{date}</div>
          <div className="text-muted-foreground text-xs">{time}</div>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Button size={"icon"} variant="outline">
            <Eye />
          </Button>
          <Button size={"icon"} variant="outline">
            <Pen />
          </Button>
          <Button size={"icon"} variant="outline">
            <Trash />
          </Button>
        </div>
      );
    },
  },
];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  return (
    <div className="w-full rounded-lg border">
      <div className="w-full">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="p-4">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="h-20"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div>
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}

export default function BlogTable() {
  const data = [
    {
      id: "1",
      title: "使用 tailwindcss-debug-screens 实时显示屏幕断点",
      tags: ["React", "JavaScript"],
      published: true,
      createTime: "2023-10-01 10:00:00",
      updateTime: "2023-10-02 12:00:00",
    },
    {
      id: "2",
      title: "在浏览器中使用 js 获取视频和图片的信息",
      tags: ["TypeScript", "Web Development"],
      published: false,
      createTime: "2023-10-03 14:30:00",
      updateTime: "2023-10-04 16:45:00",
    },
    {
      id: "3",
      title:
        "解决 Mac 上 Gin 服务每次 Build 后都会弹出【你要应用程序“main”接受传入网络连接吗？】",
      tags: ["CSS", "Design"],
      published: true,
      createTime: "2023-10-05 09:15:00",
      updateTime: "2023-10-06 11:20:00",
    },
    {
      id: "4",
      title: "Fourth Blog",
      tags: ["HTML", "Frontend"],
      published: false,
      createTime: "2023-10-07 13:50:00",
      updateTime: "2023-10-08 15:30:00",
    },
    {
      id: "5",
      title: "Fifth Blog",
      tags: ["Node.js", "Backend"],
      published: true,
      createTime: "2023-10-09 08:40:00",
      updateTime: "2023-10-10 10:55:00",
    },
  ];

  return <DataTable columns={columns} data={data} />;
}
