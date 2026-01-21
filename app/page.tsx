import { BlogList } from "@/components/blog-list";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="w-full px-4 sm:px-0">
      <div className="container mx-auto py-6 sm:p-10 cursor-pointer">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Tulisan Terkini</h1>
            <p className="text-muted-foreground text-sm sm:text-base">Pemikiran, cerita dan ide</p>
          </div>
          <form action="/admin" method="post" className="w-full sm:w-auto">
            <Button type="submit" variant="outline" className="w-full sm:w-auto">Admin Panel</Button>
          </form>
        </div>
        <div className="container mx-auto px-0 sm:px-6 py-4 sm:py-8">
          <BlogList />
        </div>
      </div>
    </div>
  );
}