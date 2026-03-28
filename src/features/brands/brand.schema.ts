import { z } from 'zod';

export const brandSchema = (isEditMode: boolean) =>
  z.object({
    nameEn: z.string().min(3, 'English name is required'),
    nameAr: z.string().min(3, 'Arabic name is required'),
    image: isEditMode
      ? z.any().optional()
      : z.instanceof(File).refine((file) => file.size > 0, 'Image is required'),
  });

export type BrandFormValues = z.infer<ReturnType<typeof brandSchema>>;
