import { BlogListSkeleton } from "@/components/blog-list-skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <main className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8">
          <div className="h-10 w-64 bg-muted animate-pulse rounded" />
        </div>
        <BlogListSkeleton />
      </main>
    </div>
  )
}