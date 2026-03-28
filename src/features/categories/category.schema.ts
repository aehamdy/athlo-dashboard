import { z } from 'zod';

export const categorySchema = (isEditMode: boolean) =>
  z.object({
    nameEn: z.string().min(1, 'English name is required'),
    nameAr: z.string().min(1, 'Arabic name is required'),
    image: isEditMode
      ? z.any().optional()
      : z.instanceof(File).refine((file) => file.size > 0, 'Image is required'),
  });
