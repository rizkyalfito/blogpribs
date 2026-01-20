import { supabase } from "@/lib/supabase"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  
  const { data: blog, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !blog) {
    notFound()
  }

  return (
    <div className="w-full">
      <div className="border-b">
        <div className="container mx-auto px-6 py-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text- text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>

      <article className="container mx-auto max-w-4xl px-6 py-4">
        {blog.category && (
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {blog.category}
          </span>
        )}
        
        <h1 className="text-4xl md:text-4xl font-bold mt-2 mb-3">{blog.title}</h1>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-10 pb-10 border-b">
          <time dateTime={blog.created_at}>
            {new Date(blog.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </div>

        {blog.image_url && (
          <div className="relative w-full h-96 mb-10 rounded-lg overflow-hidden">
            <Image
              src={blog.image_url}
              alt={blog.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p className="text-lg leading-relaxed whitespace-pre-wrap">
            {blog.content_description}
          </p>
        </div>

        {blog.file_url && (
          <div className="mt-12 p-6 border rounded-lg bg-muted/50">
            <a 
              href={blog.file_url} 
              download
              className="inline-flex items-center gap-2 font-medium hover:text-primary transition-colors"
            >
              📎 Download attachment
            </a>
          </div>
        )}
      </article>
    </div>
  )
}