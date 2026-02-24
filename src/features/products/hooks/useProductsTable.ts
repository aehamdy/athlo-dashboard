import { useState } from "react";
import type { SortingState } from "@tanstack/react-table";

export function useProductsTable() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 15,
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [search, setSearch] = useState("");

  return {
    pagination,
    setPagination,
    sorting,
    setSorting,
    search,
    setSearch,
  };
}
