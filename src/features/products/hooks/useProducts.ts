import {
  useQuery,
  keepPreviousData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type { GetProductsParams, PaginatedProductsResponse } from "../types";
import { productService } from "../services/productsService";
import { toast } from "sonner";
import type { UseQueryResult } from "@tanstack/react-query";

type DeleteError = {
  response?: {
    data: {
      message?: string;
    };
  };
};

type UseProductsReturn = UseQueryResult<PaginatedProductsResponse> & {
  deleteProduct: ReturnType<typeof useMutation<void, DeleteError, number>>;
};

export function useProducts(params: GetProductsParams): UseProductsReturn {
  const queryClient = useQueryClient();

  const query = useQuery<PaginatedProductsResponse>({
    queryKey: ["products", params],
    queryFn: () => productService.getPaginated(params),
    placeholderData: keepPreviousData,
  });

  const deleteProduct = useMutation({
    mutationFn: productService.delete,

    onSuccess: () => {
      toast.success("Product deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["products", params] });
    },

    onError: (error: DeleteError) => {
      const message =
        error?.response?.data?.message || "Failed to delete product";

      toast.error(message);
    },
  });

  return { ...query, deleteProduct };
}
