import AppGrid from "@/components/shared/AppGrid";
import type { Category } from "../types";
import EntityCard from "@/components/shared/EntityCard";

type Props = {
  categories: Category[];
  isLoading: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

function CategoriesGrid({ categories, onEdit, onDelete }: Props) {
  return (
    <AppGrid>
      {categories.map((category) => (
        <EntityCard
          key={category.id}
          entity={category}
          onEdit={() => onEdit(category.id)}
          onDelete={() => onDelete(category.id)}
        />
      ))}
    </AppGrid>
  );
}

export default CategoriesGrid;
