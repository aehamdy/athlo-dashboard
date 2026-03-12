import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import type { DataTableProps } from "@/features/products/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import DataTablePagination from "./DataTablePagination";
import CustomSelect from "../shared/CustomSelect";
import Error from "../shared/Error";

export function DataTable<TData extends object>({
  data,
  columns,
  isLoading = false,
  pagination,
  onPaginationChange,
  pageCount,
  sorting,
  onSortingChange,
  pageSizeOptions,
  error,
  onRowClick,
  globalFilter,
  className,
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
      sorting,
      globalFilter,
    },
    onPaginationChange,
    onSortingChange,
    manualPagination: !!pagination,
    manualSorting: !!sorting,
    pageCount,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  const isClickable = !!onRowClick;

  if (error) {
    return <Error title="Products" message="Failed to load data" />;
  }

  return (
    <div
      className={`flex flex-col justify-between h-full rounded-xl overflow-hidden ${className ?? ""}`}
    >
      <div className="max-h-[78vh] lg:max-h-[71vh] overflow-x-auto">
        <div className="overflow-y-auto scroll-thin">
          <Table>
            <TableHeader className="bg-muted/90">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="transition-colors hover:bg-muted/40 border-b"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="h-12 font-semibold text-xs uppercase text-center first:text-start last:text-end tracking-wide text-muted-foreground"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {isLoading ? (
                // Skeleton loading rows
                [...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    {columns.map((_, index) => (
                      <TableCell key={index} className="py-4">
                        <div className="w-full h-4 bg-muted rounded animate-pulse" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row, rowIndex) => (
                  <TableRow
                    key={row.id}
                    role={isClickable ? "button" : undefined}
                    tabIndex={isClickable ? 0 : undefined}
                    aria-label={isClickable ? "View details" : undefined}
                    onClick={() => onRowClick?.(row.original)}
                    onKeyDown={(e) => {
                      if (!onRowClick) return;

                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onRowClick(row.original);
                      }
                    }}
                    className={`
                    hover:bg-muted/50
                    ${rowIndex % 2 === 0 ? "bg-background" : "bg-muted/20"} focus-visible:outline-accent transition-colors cursor-pointer
                  `}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="py-regular px-sm text-xs md:text-sm first:text-start last:text-end text-center"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                // Empty state
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No data available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex justify-between items-center">
        {pageSizeOptions && (
          <div className="flex items-center gap-sm">
            <CustomSelect<number>
              label="Items per page"
              placeholder="Items per page"
              value={pagination?.pageSize ?? 15}
              onChange={(value) =>
                onPaginationChange?.({
                  pageIndex: 0,
                  pageSize: value,
                })
              }
              options={pageSizeOptions ?? []}
            />
          </div>
        )}

        {!isLoading &&
          pagination &&
          onPaginationChange &&
          pageCount !== undefined &&
          data &&
          data.length > 0 && (
            <DataTablePagination
              table={table}
              pagination={pagination}
              pageCount={pageCount}
            />
          )}
      </div>
    </div>
  );
}
