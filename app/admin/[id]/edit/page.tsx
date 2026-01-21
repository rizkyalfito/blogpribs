"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { UpdateBlogSchema } from "@/lib/validations"
import { useFormValidation } from "@/hooks/use-form-validation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { use } from "react"
import { Blog } from "@/types/blog"

export default function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [blog, setBlog] = useState<Blog | null>(null)
  const { errors, validate, clearErrors } = useFormValidation(UpdateBlogSchema)

  useEffect(() => {
    async function fetchBlog() {
      const { data } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .single()
      
      setBlog(data)
    }
    fetchBlog()
  }, [id])

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
      const { error } = await supabase
        .from("blogs")
        .update(validation.data)
        .eq("id", id)

      if (error) {
        toast.error("Gagal mengupdate postingan")
        console.error("[Update Blog Error]", error)
      } else {
        toast.success("Postingan berhasil diupdate")
        router.push("/admin")
        router.refresh()
      }
    } catch (err) {
      toast.error("Terjadi kesalahan")
      console.error("[Update Blog Exception]", err)
    } finally {
      setLoading(false)
    }
  }

  if (!blog) {
    return (
      <div className="max-w-2xl">
        <Skeleton className="h-8 w-32 mb-6" />
        <div className="space-y-6">
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-semibold mb-6">Edit Postingan</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1.5">
          <Label htmlFor="title">Judul *</Label>
          <Input 
            id="title" 
            name="title" 
            defaultValue={blog.title} 
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
            defaultValue={blog.category || ""} 
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
            defaultValue={blog.image_url || ""} 
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
            defaultValue={blog.content_description || ""} 
            required
            maxLength={50000}
            disabled={loading}
          />
          {errors.content_description && <p className="text-sm text-red-500">{errors.content_description}</p>}
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={loading}>
            Batal
          </Button>
        </div>
      </form>
    </div>
  )
}