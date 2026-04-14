import { useState } from "react";
import { Trash } from "lucide-react";

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
import EmptyBox from "@/components/empty";

export type User = {
  id: string;
  username: string;
  email: string;
  createTime: string;
  updateTime: string;
};

const createColumns = (
  onDeleteUser: (id: string, username: string) => void,
): ColumnDef<User>[] => [
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
    accessorKey: "username",
    header: () => <DataTableColumnHeader title="昵称" />,
    cell: ({ row }) => (
      <div className="min-w-[120px] whitespace-nowrap">
        {row.getValue("username")}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: () => <DataTableColumnHeader title="邮箱" />,
    cell: ({ row }) => (
      <div className="min-w-[120px] whitespace-nowrap">
        {row.getValue("email")}
      </div>
    ),
  },
  {
    accessorKey: "createTime",
    header: () => <DataTableColumnHeader title="创建时间" />,
    cell: ({ row }) => (
      <div className="min-w-[120px] whitespace-nowrap">
        {row.getValue("createTime")}
      </div>
    ),
  },
  {
    accessorKey: "updateTime",
    header: () => <DataTableColumnHeader title="更新时间" />,
    cell: ({ row }) => (
      <div className="min-w-[120px] whitespace-nowrap">
        {row.getValue("updateTime")}
      </div>
    ),
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
            className="text-destructive hover:text-destructive/90"
            onClick={() => onDeleteUser(row.original.id, row.original.username)}
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

interface UserTableProps {
  list: User[];
  paginationProps: PaginationProps;
  onDeleteUser?: (id: string, username: string) => void;
  loading?: boolean;
}

export default function UserTable({
  list,
  paginationProps,
  onDeleteUser = () => {},
  loading = false,
}: UserTableProps) {
  const columns = createColumns(onDeleteUser);

  return (
    <DataTable
      columns={columns}
      data={list}
      paginationProps={paginationProps}
      loading={loading}
    />
  );
}
