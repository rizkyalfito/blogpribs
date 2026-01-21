"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function NewBlogPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData(event.currentTarget)

    const { error } = await supabase.from("blogs").insert({
      title: formData.get("title") as string,
      content_description: formData.get("content") as string,
      category: formData.get("category") as string,
      image_url: formData.get("image_url") as string
    })

    if (error) {
      toast.error("Failed to create post")
    } else {
      toast.success("Post created successfully")
      router.push("/admin")
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-semibold mb-6">Create New Post</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1.5">
          <Label htmlFor="title">Judul</Label>
          <Input id="title" name="title" required />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="category">Kategori</Label>
          <Input id="category" name="category" />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="image_url">Link Gambar</Label>
          <Input id="image_url" name="image_url" type="url" placeholder="https://..." />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="content">Isi konten</Label>
          <Textarea id="content" name="content" rows={10} required />
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? 'Membuat...' : 'Buat Postingan'}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Batal
          </Button>
        </div>
      </form>
    </div>
  )
}