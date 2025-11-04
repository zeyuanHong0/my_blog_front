"use client";

import { useState } from "react";
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

export type Blog = {
  id: string;
  title: string;
  tags: string[];
  published: number;
  createTime: string;
  updateTime: string;
};

const createColumns = (
  onDeleteBlog: (id: string, name: string) => void,
  onChangeBlogStatus: (id: string, published: boolean) => void,
  toEditForm: (id: string) => void,
  toBlogInfo: (id: string) => void,
): ColumnDef<Blog>[] => [
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
      const tags = row.getValue("tags") as { id: string; name: string }[];
      return (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag.id}
              className="rounded-full bg-black px-2 py-1 text-xs text-white"
            >
              {tag.name}
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
      const published = row.getValue("published") === 1 ? true : false;
      return (
        <Switch
          checked={published}
          onCheckedChange={(value) =>
            onChangeBlogStatus(row.original.id, value)
          }
        />
      );
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
      const blog = row.original;
      return (
        <div className="flex items-center gap-2">
          <Button
            size={"icon"}
            variant="outline"
            onClick={() => toBlogInfo(blog.id)}
          >
            <Eye />
          </Button>
          <Button
            size={"icon"}
            variant="outline"
            onClick={() => toEditForm(blog.id)}
          >
            <Pen />
          </Button>
          <Button
            size={"icon"}
            variant="outline"
            className="text-red-500 hover:text-red-500"
            onClick={() => onDeleteBlog(blog.id, blog.title)}
          >
            <Trash />
          </Button>
        </div>
      );
    },
  },
];

interface PaginationProps {
  pageNum: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  paginationProps: PaginationProps;
  loading?: boolean;
}

function DataTable<TData, TValue>({
  columns,
  data,
  paginationProps,
  loading = false,
}: DataTableProps<TData, TValue>) {
  const { total, pageNum, pageSize, onPageChange, onPageSizeChange } =
    paginationProps;
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true, // 启用手动分页
    pageCount: Math.ceil(total / pageSize), // 总页数
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
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  加载中...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
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
        <DataTablePagination
          table={table}
          total={total}
          pageNum={pageNum}
          pageSize={pageSize}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </div>
    </div>
  );
}

interface BlogTableProps {
  list: Blog[];
  paginationProps: PaginationProps;
  onDeleteBlog?: (id: string, title: string) => void;
  onChangeBlogStatus?: (id: string, published: boolean) => void;
  toEditForm?: (id: string) => void;
  toBlogInfo?: (id: string) => void;
  loading?: boolean;
}

export default function BlogTable({
  list,
  paginationProps,
  onDeleteBlog = () => {},
  onChangeBlogStatus = () => {},
  toEditForm = () => {},
  toBlogInfo = () => {},
  loading = false,
}: BlogTableProps) {
  const columns = createColumns(
    onDeleteBlog,
    onChangeBlogStatus,
    toEditForm,
    toBlogInfo,
  );

  return (
    <DataTable
      columns={columns}
      data={list}
      paginationProps={paginationProps}
      loading={loading}
    />
  );
}
