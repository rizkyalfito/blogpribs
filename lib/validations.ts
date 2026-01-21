import { z } from "zod"

export const CreateBlogSchema = z.object({
  title: z
    .string()
    .min(3, "Judul minimal 3 karakter")
    .max(200, "Judul maksimal 200 karakter")
    .trim(),
  content_description: z
    .string()
    .min(10, "Konten minimal 10 karakter")
    .max(50000, "Konten maksimal 50000 karakter")
    .trim(),
  category: z
    .string()
    .max(50, "Kategori maksimal 50 karakter")
    .trim()
    .optional()
    .nullable(),
  image_url: z
    .string()
    .url("Format URL gambar tidak valid")
    .optional()
    .nullable()
    .refine((url) => {
      if (!url) return true
      // Whitelist safe image domains
      try {
        const urlObj = new URL(url)
        const allowedDomains = [
          "emnpspqobragzftzbrpf.supabase.co",
          "images.unsplash.com",
          "images.pexels.com",
          "cdn.pixabay.com",
        ]
        return allowedDomains.some((domain) =>
          urlObj.hostname.includes(domain)
        )
      } catch {
        return false
      }
    }, "Sumber gambar tidak diizinkan. Gunakan: Supabase, Unsplash, Pexels, atau Pixabay"),
})

export const UpdateBlogSchema = CreateBlogSchema

export type CreateBlogInput = z.infer<typeof CreateBlogSchema>
export type UpdateBlogInput = z.infer<typeof UpdateBlogSchema>
