import { createClient } from "@/lib/supabase-server"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: blog } = await supabase
    .from('blogs')
    .select('*')
    .eq('id', id)
    .single()

  if (!blog) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground mb-4">Blog tidak ditemukan</p>
        <Button asChild>
          <Link href="/admin">Kembali ke Semua Postingan</Link>
        </Button>
      </div>
    )
  }

  return (
    <div>
      <Button asChild variant="outline" className="mb-6">
        <Link href="/admin">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>{blog.title}</CardTitle>
          {blog.category && (
            <CardDescription>{blog.category}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {blog.image_url && (
            <div className="relative w-full h-80 rounded-md overflow-hidden">
              <Image
                src={blog.image_url}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="prose max-w-none">
            <p className="whitespace-pre-wrap text-foreground">{blog.content_description}</p>
          </div>
          <div className="text-sm text-muted-foreground pt-4 border-t">
            <p>Dibuat: {new Date(blog.created_at).toLocaleDateString('id-ID')}</p>
            <p>Diupdate: {new Date(blog.updated_at).toLocaleDateString('id-ID')}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
