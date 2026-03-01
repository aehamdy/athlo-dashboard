import { useQuery } from "@tanstack/react-query";
import { productService } from "../services/productsService";

const useFetchProductMediaAndVariants = (id: number | null) => {
  return useQuery({
    queryKey: ["product", id, "media"],
    queryFn: () => {
      if (!id) throw new Error("Product ID is required");
      return productService.getProductImagesAndVariants(id);
    },
    enabled: !!id,
  });
};

export default useFetchProductMediaAndVariants;
