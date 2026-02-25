import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { categoriesService } from "../services/categoriesService";
import type { Category } from "../types";

export const categoryKeys = {
  all: ["categories"] as const,
};

export function useCategories() {
  const queryClient = useQueryClient();

  const query = useQuery<Category[], Error>({
    queryKey: categoryKeys.all,
    queryFn: categoriesService.getAll,
  });

  const createCategory = useMutation({
    mutationFn: categoriesService.create,

    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: categoryKeys.all }),
  });

  const updateCategory = useMutation({
    mutationFn: (payload: FormData) => categoriesService.update(payload),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: categoryKeys.all,
      });
    },
  });

  const deleteCategory = useMutation({
    mutationFn: categoriesService.delete,

    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: categoryKeys.all }),
  });

  return { ...query, createCategory, updateCategory, deleteCategory };
}
