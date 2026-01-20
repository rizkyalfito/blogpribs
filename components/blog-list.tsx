import { supabase } from "@/lib/supabase"
import { BlogCard } from "./blog-card"  // ← ganti import
import { Blog } from "@/types/blog"

export async function BlogList() {
  const { data: blogs, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false })

  const items = blogs?.map((blog: Blog) => ({
  title: blog.title,
  description: blog.content_description || '',
  url: `/blog/${blog.id}`,
  image_url: blog.image_url 
})) || []
  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!blogs || blogs.length === 0) {
    return <div>No Articles found</div>
  }

  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
      {items.map((item) => (
        <div key={item.url} className="break-inside-avoid">
          <BlogCard {...item} />
        </div>
      ))}
    </div>
  )
}