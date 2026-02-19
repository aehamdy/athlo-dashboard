import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Brand } from "../types";
import { brandsService } from "../services/brands.service";

export const brandKeys = {
  all: ["brands"] as const,
};

export function useBrands() {
  const queryClient = useQueryClient();

  const query = useQuery<Brand[], Error>({
    queryKey: brandKeys.all,
    queryFn: brandsService.getAll,
  });

  const createBrand = useMutation({
    mutationFn: brandsService.create,

    onSuccess: () => queryClient.invalidateQueries({ queryKey: brandKeys.all }),
  });

  const updateBrand = useMutation({
    mutationFn: brandsService.update,

    onSuccess: () => queryClient.invalidateQueries({ queryKey: brandKeys.all }),
  });

  const deleteBrand = useMutation({
    mutationFn: brandsService.delete,

    onSuccess: () => queryClient.invalidateQueries({ queryKey: brandKeys.all }),
  });

  return { ...query, createBrand, updateBrand, deleteBrand };
}
