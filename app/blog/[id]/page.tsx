import { supabase } from "@/lib/supabase"
import { notFound } from "next/navigation"
import Image from "next/image"

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
    <article className="container mx-auto max-w-4xl px-4 py-8">
      {blog.image_url && (
        <div className="mb-8 flex justify-center">
          <Image
            src={blog.image_url}
            alt={blog.title}
            width={500}
            height={300}
            className="max-w-md h-auto rounded-lg object-fill shadow-md"
          />
        </div>
      )}

      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
        <time dateTime={blog.created_at}>
          {new Date(blog.created_at).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </time>
      </div>

      <div className="prose prose-lg max-w-none dark:prose-invert">
        <p className="whitespace-pre-wrap">
          {blog.content_description}
        </p>
      </div>

      {blog.file_url && (
        <div className="mt-8 p-4 border rounded-lg">
          <a 
            href={blog.file_url} 
            download
            className="text-primary hover:underline"
          >
            📎 Download attachment
          </a>
        </div>
      )}
    </article>
  )
}