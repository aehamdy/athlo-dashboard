import DashboardPageLayout from '@/components/shared/DashboardPageLayout';
import Icon from '@/components/shared/Icon';
import { Button } from '@/components/ui/button';
import BrandForm from '@/features/brands/components/BrandForm';
import BrandsGrid from '@/features/brands/components/BrandsGrid';
import { useBrands } from '@/features/brands/hooks/useBrands';
import type { Brand } from '@/features/brands/types';
import ConfirmDeleteModal from '@/components/shared/ConfirmDeleteModal';
import { useState } from 'react';
import { toast } from 'sonner';

function Brands() {
  const [openForm, setOpenForm] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [brandToDelete, setBrandToDelete] = useState<Brand | null>(null);
  const { data: brands, createBrand, updateBrand, deleteBrand } = useBrands();

  const handleEdit = (id: number) => {
    const brand = brands?.find((brand) => brand.id === id);

    if (brand) {
      setSelectedBrand(brand);
      setOpenForm(true);
    }
  };

  const handleDeleteClick = (id: number) => {
    const brand = brands?.find((brand) => brand.id === id);
    if (brand) setBrandToDelete(brand);
  };

  const handleConfirmDelete = (brand: Brand) => {
    deleteBrand.mutate(brand.id, {
      onSuccess: () => {
        toast.success(
          `Brand "${brand.nameEn || brand.nameAr || brand.name || 'Unknown'}" deleted successfully`,
        );
        setBrandToDelete(null);
      },
      onError: () => {
        toast.error('Failed to delete brand. Please try again.');
      },
    });
  };

  const handleCancelDelete = () => setBrandToDelete(null);

  return (
    <>
      <DashboardPageLayout
        open={openForm}
        onOpenChange={setOpenForm}
        title="Brands"
        dialogLabel={selectedBrand ? 'Edit Brand ' : 'Add Brand'}
        description={
          selectedBrand
            ? 'Update an existing brand'
            : 'Add new brands to your collection'
        }
        action={
          <Button
            onClick={() => {
              setSelectedBrand(null);
              setOpenForm(true);
            }}
            className="flex items-center gap-sm"
          >
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
          onDelete={handleDeleteClick}
          brands={brands ?? []}
          isLoading={false}
        />
      </DashboardPageLayout>

      <ConfirmDeleteModal<Brand>
        item={brandToDelete}
        setItem={handleCancelDelete}
        itemLabel="brand"
        getDisplayName={(brand) => brand.name || brand.nameEn}
        onConfirm={() => brandToDelete && handleConfirmDelete(brandToDelete)}
        onCancel={handleCancelDelete}
        isPending={deleteBrand.status === 'pending'}
      />
    </>
  );
}

export default Brands;
