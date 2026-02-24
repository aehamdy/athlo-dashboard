import Icon from "../shared/Icon";
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
    <div className="flex justify-between items-center gap-regular py-sm px-md">
      <Button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <Icon name="ArrowLeft" />
        <span className="hidden md:flex">Previous</span>
      </Button>

      <span className="text-sm font-medium">
        <span className="md:hidden">
          {pagination.pageIndex + 1} / {pageCount}
        </span>

        <span className="hidden md:inline">
          Page {pagination.pageIndex + 1} of {pageCount}
        </span>
      </span>

      <Button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <span className="hidden md:flex">Next</span>
        <Icon name="ArrowRight" />
      </Button>
    </div>
  );
}

export default DataTablePagination;
