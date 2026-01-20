import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card"

interface BlogCardProps {
  title: string
  description: string
  url: string
  image_url?: string | null
}

export function BlogCard({ title, description, url, image_url }: BlogCardProps) {
  return (
    <Link href={url} className="block">
      <Card className="hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer h-full overflow-hidden flex flex-col">
        {image_url && (
          <div className="w-full flex-shrink-0">
            <img
              src={image_url}
              alt={title}
              className="w-full h-32 object-cover rounded-lg shadow-md"
            />
          </div>
        )}
        <CardHeader className="flex-grow flex flex-col">
          <CardTitle className="text-xl line-clamp-2">{title}</CardTitle>
          <CardDescription className="line-clamp-3 mt-2 text-sm">
            {description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}