import { z } from "zod";

export const brandSchema = z.object({
  nameEn: z.string().min(3, "English name is required"),
  nameAr: z.string().min(3, "Arabic name is required"),
  image: z.instanceof(File).or(z.undefined()),
});

export type BrandFormValues = z.infer<typeof brandSchema>;
