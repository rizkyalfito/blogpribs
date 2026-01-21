import { createClient } from "@/lib/supabase-server"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { DeleteBlogButton } from "@/components/delete-blog-button"
import { Pencil } from "lucide-react"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

async function BlogsList() {
  const supabase = await createClient()
  const { data: blogs } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false })

  if (!blogs || blogs.length === 0) {
    return <p className="text-muted-foreground text-center py-10">Beloman ada postingan</p>
  }

  return (
    <div className="grid gap-4">
      {blogs.map((blog) => (
        <Card key={blog.id}>
          <CardHeader className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {blog.image_url && (
                <div className="relative w-full h-48 sm:w-28 sm:h-28 shrink-0 rounded-md overflow-hidden">
                  <Image
                    src={blog.image_url}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0 flex flex-col gap-2">
                <CardTitle className="wrap-break-words text-xl leading-tight">
                  {blog.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-sm">
                  {blog.content_description}
                </CardDescription>
              </div>
              <div className="flex sm:flex-col gap-2 shrink-0 items-start">
                <Button asChild variant="outline" size="icon" className="h-9 w-9 shrink-0 cursor-pointer">
                  <Link href={`/admin/${blog.id}/edit`}>
                    <Pencil className="w-4 h-4" />
                  </Link>
                </Button>
                <div className="h-9 w-9 shrink-0">
                  <DeleteBlogButton id={blog.id} />
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}

function BlogsListSkeleton() {
  return (
    <div className="grid gap-4">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader className="p-4">
            <div className="flex gap-4">
              <Skeleton className="w-28 h-28 rounded-md shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}

export default function AdminPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center mb-6">
        <h2 className="text-2xl font-semibold">Semua Postingan</h2>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/admin/new">Bikin Postingan Baru</Link>
        </Button>
      </div>

      <Suspense fallback={<BlogsListSkeleton />}>
        <BlogsList />
      </Suspense>
    </div>
  )
}