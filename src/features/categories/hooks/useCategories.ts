import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { categoriesService } from "../services/categories.service";
import type { Category } from "../types";

export function useCategories() {
  const queryClient = useQueryClient();

  const query = useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: categoriesService.getAll,
  });

  const createCategory = useMutation({
    mutationFn: categoriesService.create,

    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });

  const updateCategory = useMutation({
    mutationFn: (payload: FormData) => categoriesService.update(payload),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });

  const deleteCategory = useMutation({
    mutationFn: categoriesService.delete,

    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });

  return { ...query, createCategory, updateCategory, deleteCategory };
}
