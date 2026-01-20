import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <article className="container mx-auto max-w-4xl px-4 py-8">
      <Skeleton className="w-full h-[400px] mb-8 rounded-lg" />
      <Skeleton className="h-12 w-3/4 mb-4" />
      <Skeleton className="h-4 w-32 mb-8" />
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </article>
  )
}