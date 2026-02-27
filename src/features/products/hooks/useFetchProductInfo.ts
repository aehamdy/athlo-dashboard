import { useQuery } from "@tanstack/react-query";
import { productService } from "../services/productsService";
import type { Product } from "../types";

const useFetchProductInfo = (id: number | null | undefined) => {
  return useQuery<Product>({
    queryKey: ["product", id, "info"],
    queryFn: () => {
      if (!id) throw new Error("Product ID is required");
      return productService.getProductInfo(id);
    },
    enabled: !!id,
  });
};

export default useFetchProductInfo;
