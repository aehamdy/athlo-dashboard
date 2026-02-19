export type Category = {
  id: number;
  name?: string;
  nameEn: string;
  nameAr: string;
  imageUrl: string;
};

export type CategoryFormValues = {
  nameEn: string;
  nameAr: string;
  image: File | null;
};
