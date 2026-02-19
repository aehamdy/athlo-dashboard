import AppGrid from "@/components/shared/AppGrid";
import type { Brand } from "../types";
import EntityCard from "@/components/shared/EntityCard";

type Props = {
  brands: Brand[];
  isLoading: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

function BrandsGrid({ brands, onEdit, onDelete }: Props) {
  return (
    <AppGrid>
      {brands.map((brand) => (
        <EntityCard
          key={brand.id}
          entity={brand}
          onEdit={() => onEdit(brand.id)}
          onDelete={() => onDelete(brand.id)}
        />
      ))}
    </AppGrid>
  );
}

export default BrandsGrid;
