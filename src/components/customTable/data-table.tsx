import * as React from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
  VisibilityState,
  PaginationState,
} from "@tanstack/react-table";
import { DataTablePagination } from "./data-table-pagination";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu.tsx";
//import { Input } from "../ui/input.tsx";
import { Button } from "../ui/button.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table.tsx";
import IconDisplay from "../iconComponent/IconDisplay.tsx";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterPlaceholderName: string;
  filterHeaderName: string;
  paginationShow?: boolean;
  changePagination: (
    states: PaginationState,
    listType: string,
    sort: SortingState
  ) => void;
  handleDelete: (selectedRows: any[]) => void;
  maxCount: number;
  onRowDoubleClick?: (row: TData) => void;
  textFilter?: boolean;
  listType: string;
  allowHandleDelete?: boolean;
  countName?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  // filterPlaceholderName,
  //filterHeaderName,
  paginationShow = true,
  changePagination,
  handleDelete,
  maxCount,
  onRowDoubleClick,
  textFilter = false,
  listType,
  allowHandleDelete = false,
  countName = "",
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 100,
  });

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(maxCount / pagination.pageSize),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: (newSorting) => {
      setSorting(newSorting);
    },
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    manualPagination: true, // Manual pagination
  });

  const handleDeleteForSelectedRows = () => {
    handleDelete(table.getFilteredSelectedRowModel().rows);
  };

  React.useEffect(() => {
    changePagination(
      table.getState().pagination,
      listType,
      table.getState().sorting
    );
  }, [
    table.getState().pagination.pageIndex,
    table.getState().pagination.pageSize,
    table.getState().sorting,
  ]);

  return (
    <div>
      {textFilter && (
        <div className="flex items-center justify-end py-4 gap-4">
          {maxCount === 1 ? (
            ""
          ) : (
            <span>
              {countName} Count: {maxCount}
            </span>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Columns</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value: any) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      <div className="rounded-md border max-h-[620px] overflow-y-auto">
        <Table className="min-w-full divide-y divide-gray-200">
          <TableHeader className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="table-row h-10">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="table-cell px-4 py-2">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
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
                  onDoubleClick={() => onRowDoubleClick?.(row.original)}
                  className="table-row h-10"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="table-cell px-4 py-2 text-xs"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-xs"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-row gap-2.5 mt-3">
        {allowHandleDelete &&
          table.getFilteredSelectedRowModel().rows.length > 0 && (
            <Button
              className="w-[225px]"
              variant="destructive"
              onClick={handleDeleteForSelectedRows}
            >
              <IconDisplay iconName="Trash" addStyle="mr-2" />
              Delete Selected Rows
            </Button>
          )}
        {paginationShow && <DataTablePagination table={table} />}
      </div>
    </div>
  );
}
