import Link from "next/link"
import Image from "next/image"
import { Card } from "./ui/card"

interface BlogCardProps {
  title: string
  description: string
  url: string
  image_url?: string | null
  category?: string | null
}

export function BlogCard({ title, description, url, image_url, category }: BlogCardProps) {
  return (
    <Link href={url} className="group block h-full">
      <Card className="overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        {image_url && (
          <div className="relative w-full h-52 shrink-0 overflow-hidden bg-muted">
            <Image
              src={image_url}
              alt={title}
              fill
              priority={false}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="p-6 flex-1">
          {category && (
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {category}
            </span>
          )}
          <h3 className="text-xl font-semibold mt-2 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground mt-3 line-clamp-3 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </Card>
    </Link>
  )
}