import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  //   PaginationEllipsis,
} from "@/components/ui/pagination";

interface PaginationProps {
  total: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function AppPagination({
  total,
  pageSize,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Pagination aria-label="Pagination Navigation">
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious onClick={() => onPageChange(currentPage - 1)} />
          </PaginationItem>
        )}

        {pages.map((page) => (
          <PaginationItem key={page} className="cursor-pointer">
            <PaginationLink
              isActive={page === currentPage}
              onClick={() => onPageChange(page)}
              className={`${page === currentPage ? "bg-accent" : ""}`}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {currentPage < totalPages && (
          <PaginationItem className="cursor-pointer">
            <PaginationNext onClick={() => onPageChange(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
