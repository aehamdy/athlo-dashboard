export type Brand = {
  id: number;
  name?: string;
  nameEn: string;
  nameAr: string;
  imageUrl: string;
};

export type BrandFormValues = {
  nameEn: string;
  nameAr: string;
  image: File | null;
};
