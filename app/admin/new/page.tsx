"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { CreateBlogSchema } from "@/lib/validations"
import { useFormValidation } from "@/hooks/use-form-validation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function NewBlogPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { errors, validate, clearErrors } = useFormValidation(CreateBlogSchema)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    clearErrors()
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const data = {
      title: formData.get("title") as string,
      content_description: formData.get("content") as string,
      category: (formData.get("category") as string) || null,
      image_url: (formData.get("image_url") as string) || null,
    }

    // Validate input
    const validation = validate(data)
    if (!validation.success) {
      toast.error("Validasi gagal. Periksa form Anda")
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.from("blogs").insert(validation.data)

      if (error) {
        toast.error("Gagal membuat postingan")
        console.error("[Create Blog Error]", error)
      } else {
        toast.success("Postingan berhasil dibuat")
        router.push("/admin")
        router.refresh()
      }
    } catch (err) {
      toast.error("Terjadi kesalahan")
      console.error("[Create Blog Exception]", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-semibold mb-6">Buat Postingan Baru</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1.5">
          <Label htmlFor="title">Judul *</Label>
          <Input 
            id="title" 
            name="title" 
            required 
            maxLength={200}
            disabled={loading}
          />
          {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="category">Kategori</Label>
          <Input 
            id="category" 
            name="category"
            maxLength={50}
            disabled={loading}
          />
          {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="image_url">Link Gambar</Label>
          <Input 
            id="image_url" 
            name="image_url" 
            type="url" 
            placeholder="https://emnpspqobragzftzbrpf.supabase.co/..."
            disabled={loading}
          />
          <p className="text-xs text-muted-foreground">Format: Supabase, Unsplash, Pexels, atau Pixabay</p>
          {errors.image_url && <p className="text-sm text-red-500">{errors.image_url}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="content">Isi Konten *</Label>
          <Textarea 
            id="content" 
            name="content" 
            rows={10} 
            required
            maxLength={50000}
            disabled={loading}
          />
          {errors.content_description && <p className="text-sm text-red-500">{errors.content_description}</p>}
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? 'Membuat...' : 'Buat Postingan'}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={loading}>
            Batal
          </Button>
        </div>
      </form>
    </div>
  )
}