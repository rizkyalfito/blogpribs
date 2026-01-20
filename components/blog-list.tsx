import { supabase } from "@/lib/supabase"
import { BlogCard } from "./blog-card"
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
    image_url: blog.image_url,
    category: blog.category
  })) || []

  if (error) {
    return <div className="text-center py-20 text-muted-foreground">Error loading articles</div>
  }

  if (!blogs || blogs.length === 0) {
    return <div className="text-center py-20 text-muted-foreground">No articles yet</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item) => (
        <BlogCard key={item.url} {...item} />
      ))}
    </div>
  )
}