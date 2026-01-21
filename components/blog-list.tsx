import { supabase } from "@/lib/supabase"
import { BlogCard } from "./blog-card"
import { Blog } from "@/types/blog"
import { Button } from "./ui/button"
import { ChevronDown } from "lucide-react"

const POSTS_PER_PAGE = 12

interface BlogListProps {
  initialCursor?: string | null
}

export async function BlogList({ initialCursor }: BlogListProps) {
  const { data: blogs, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(POSTS_PER_PAGE + 1) // Fetch one extra to determine if there's a next page
    .range(initialCursor ? parseInt(initialCursor) : 0, (initialCursor ? parseInt(initialCursor) : 0) + POSTS_PER_PAGE)

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
        <p className="text-red-700 font-medium">⚠️ Gagal memuat artikel</p>
        <p className="text-sm text-red-600 mt-2">Terjadi kesalahan. Silakan coba lagi nanti.</p>
      </div>
    )
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-6 text-center">
        <p className="text-amber-800 font-medium">📝 Belum ada postingan</p>
        <p className="text-sm text-amber-700 mt-2">Postingan pertama akan segera hadir</p>
      </div>
    )
  }

  const hasMore = blogs.length > POSTS_PER_PAGE
  const items = blogs.slice(0, POSTS_PER_PAGE).map((blog: Blog) => ({
    title: blog.title,
    description: blog.content_description || '',
    url: `/blog/${blog.id}`,
    image_url: blog.image_url,
    category: blog.category
  }))

  const nextCursor = hasMore ? ((initialCursor ? parseInt(initialCursor) : 0) + POSTS_PER_PAGE).toString() : null

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <BlogCard key={item.url} {...item} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-4">
          <form action="/" method="get" className="w-full sm:w-auto">
            <input type="hidden" name="cursor" value={nextCursor || ''} />
            <Button 
              type="submit" 
              variant="outline" 
              className="w-full sm:w-auto cursor-pointer"
            >
              <ChevronDown className="w-4 h-4 mr-2" />
              Muat Lebih Banyak
            </Button>
          </form>
        </div>
      )}
    </div>
  )
}