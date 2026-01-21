import { useState } from "react";
import { Pen, Trash } from "lucide-react";

import { formatDateTime } from "@/utils/getTime";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { SvgIcon } from "@/components/Icon";
import EmptyBox from "@/components/empty";

export type tag = {
  id: string;
  name: string;
  icon: string;
  createTime: string;
  updateTime: string;
};

const createColumns = (
  showEditForm: (id: string) => void,
  onDeleteTag: (id: string, name: string) => void,
): ColumnDef<tag>[] => [
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
    accessorKey: "name",
    header: () => <DataTableColumnHeader title="名称" />,
    cell: ({ row }) => (
      <div className="min-w-[120px] whitespace-nowrap">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "icon",
    header: () => <DataTableColumnHeader title="图标" />,
    cell: ({ row }) => {
      const icon = row.getValue("icon") as string;
      return (
        <div className="min-w-[120px] whitespace-nowrap">
          <SvgIcon icon={icon} size={40} />
        </div>
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
    header: () => <DataTableColumnHeader title="操作" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Button
            size={"icon"}
            variant="outline"
            onClick={() => showEditForm(row.original.id)}
          >
            <Pen />
          </Button>
          <Button
            size={"icon"}
            variant="outline"
            className="text-destructive hover:text-destructive/90"
            onClick={() => onDeleteTag(row.original.id, row.original.name)}
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
  showEditForm: (id: string) => void;
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
                  <EmptyBox iconSize={200}>
                    <p>暂无数据</p>
                  </EmptyBox>
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

interface TagTableProps {
  showEditForm: (id: string) => void;
  list: tag[];
  paginationProps: PaginationProps;
  onDeleteTag?: (id: string, name: string) => void;
  loading?: boolean;
}

export default function TagTable({
  showEditForm,
  list,
  paginationProps,
  onDeleteTag = () => {},
  loading = false,
}: TagTableProps) {
  const columns = createColumns(showEditForm, onDeleteTag);

  return (
    <DataTable
      columns={columns}
      data={list}
      paginationProps={paginationProps}
      showEditForm={showEditForm}
      loading={loading}
    />
  );
}
