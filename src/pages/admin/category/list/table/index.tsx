import { useState } from "react";
import { Pen, Trash } from "lucide-react";

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

export type category = {
  id: string;
  name: string;
  createTime: string;
  updateTime: string;
};

const createColumns = (
  showEditForm: (id: string) => void,
  onDeleteCategory: (id: string, name: string) => void,
): ColumnDef<category>[] => [
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
    id: "actions",
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
            className="text-red-500 hover:text-red-500"
            onClick={() => onDeleteCategory(row.original.id, row.original.name)}
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

interface CategoryTableProps {
  showEditForm: (id: string) => void;
  list: category[];
  paginationProps: PaginationProps;
  onDeleteCategory?: (id: string, name: string) => void;
  loading?: boolean;
}

export default function CategoryTable({
  showEditForm,
  list,
  paginationProps,
  onDeleteCategory = () => {},
  loading = false,
}: CategoryTableProps) {
  const columns = createColumns(showEditForm, onDeleteCategory);

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
