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
          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:gap-4 sm:items-start sm:justify-between space-y-0">
            {blog.image_url && (
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-md overflow-hidden">
                <Image
                  src={blog.image_url}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg sm:text-xl break-words">{blog.title}</CardTitle>
              <CardDescription className="line-clamp-1 mt-1 sm:mt-2 truncate text-xs sm:text-sm">
                {blog.content_description}
              </CardDescription>
            </div>
            <div className="flex gap-2 flex-shrink-0 w-full sm:w-auto">
              <Button asChild variant="outline" size="sm" className="flex-1 sm:flex-none">
                <Link href={`/admin/${blog.id}/edit`}>
                  <Pencil className="w-4 h-4" />
                </Link>
              </Button>
              <DeleteBlogButton id={blog.id} />
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
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full mt-2" />
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}

export default function AdminPage() {
  return (
    <div>
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