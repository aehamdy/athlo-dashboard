import { z } from "zod";

export const categorySchema = z.object({
  nameEn: z.string().min(3, "English name is required"),
  nameAr: z.string().min(3, "Arabic name is required"),
  image: z.instanceof(File).or(z.undefined()),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
