import { BlogCardSkeleton } from "./blog-card-skeleton"

export function BlogListSkeleton() {
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="break-inside-avoid">
          <BlogCardSkeleton />
        </div>
      ))}
    </div>
  )
}