import { z } from 'zod';

// Product Info
export const productInfoSchema = z.object({
  nameEn: z.string().min(3, 'Name must be at least 3 characters'),
  nameAr: z.string().min(3, 'الاسم يجب أن يكون على الأقل 3 أحرف'),
  descriptionEn: z.string().min(8, 'Description must be at least 8 characters'),
  descriptionAr: z.string().min(8, 'الوصف يجب أن يكون على الأقل 8 أحرف'),
  clubEn: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length >= 3,
      'Club name must be at least 3 characters',
    ),
  clubAr: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length >= 3,
      'اسم النادي يجب أن يكون على الأقل 3 أحرف',
    ),
  season: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length >= 4,
      'Season must be at least 4 characters',
    ),
  code: z.string().min(3, 'Code must be at least 3 characters'),
  categoryId: z.coerce
    .number()
    .positive()
    .min(1, 'Category ID must be positive'),
  brandId: z.coerce.number().positive().min(1, 'Brand ID must be positive'),
  attributeKeyEn: z.string().optional(),
  attributeKeyAr: z.string().optional(),
  basePrice: z.coerce.number().positive('Base price must be positive'),
});

export type ProductInfoFormType = z.input<typeof productInfoSchema>;

// Product Images
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const productImagesSchema = z.object({
  images: z
    .array(z.instanceof(File))
    .min(1, 'At least one image is required')
    .refine(
      (files) =>
        files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      'Only .jpg, .jpeg, .png and .webp files are allowed',
    )
    .refine(
      (files) => files.every((file) => file.size <= MAX_FILE_SIZE),
      'Each file must be less than 5MB',
    ),
});

export type ProductImagesFormType = z.infer<typeof productImagesSchema>;

export type VariantType = ProductVariantsFormType['variants'][number];

// Product Variant
export const productVariantsSchema = z.object({
  variants: z
    .array(
      z.object({
        attributeValueEn: z.string().optional(),
        attributeValueAr: z.string().optional(),
        unit: z.string().optional(),
        colorCode: z.union([
          z.literal(''),
          z.string().regex(/^#([0-9A-Fa-f]{6})$/, 'Invalid HEX color'),
        ]),
        colorName: z.string().optional(),
        price: z.number().positive('Price is required'),
        stockQuantity: z.number().positive('Stock is required'),
      }),
    )
    .min(1, 'At least one variant is required'),
});

export type ProductVariantsFormType = z.infer<typeof productVariantsSchema>;
