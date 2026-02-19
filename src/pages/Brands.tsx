import DashboardPageLayout from "@/components/shared/DashboardPageLayout";
import Icon from "@/components/shared/Icon";
import { Button } from "@/components/ui/button";
import BrandForm from "@/features/brands/components/BrandForm";
import BrandsGrid from "@/features/brands/components/BrandsGrid";
import { useBrands } from "@/features/brands/hooks/useBrands";
import type { Brand } from "@/features/brands/types";
import { useState } from "react";

function Brands() {
  const [openForm, setOpenForm] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const { data: brands, createBrand, updateBrand } = useBrands();

  const handleEdit = (id: number) => {
    const brand = brands?.find((brand) => brand.id === id);

    if (brand) {
      setSelectedBrand(brand);
      setOpenForm(true);
    }
  };

  return (
    <DashboardPageLayout
      open={openForm}
      onOpenChange={setOpenForm}
      title="Brands"
      dialogLabel="Add Brand"
      description="Add new brands to your collection"
      action={
        <Button className="flex items-center gap-sm">
          <Icon name="Plus" /> Add Brand
        </Button>
      }
      formComponent={
        <BrandForm
          brand={selectedBrand}
          createBrand={createBrand}
          updateBrand={updateBrand}
          onSuccess={() => {
            setOpenForm(false);
            setSelectedBrand(null);
          }}
        />
      }
    >
      <BrandsGrid
        onEdit={handleEdit}
        onDelete={() => {}}
        brands={brands ?? []}
        isLoading={false}
      />
    </DashboardPageLayout>
  );
}

export default Brands;
