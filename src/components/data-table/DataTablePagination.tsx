import { Button } from "../ui/button";
import type { Table, PaginationState } from "@tanstack/react-table";

type DataTablePaginationProps<TData = unknown> = {
  table: Table<TData>;
  pagination: PaginationState;
  pageCount: number;
};

function DataTablePagination<TData = unknown>({
  table,
  pagination,
  pageCount,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex justify-between py-sm px-md">
      <Button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Previous
      </Button>

      <span className="px-base py-sm">
        Page {pagination.pageIndex + 1} of {pageCount}
      </span>

      <Button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Next
      </Button>
    </div>
  );
}

export default DataTablePagination;
