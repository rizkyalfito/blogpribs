import { BlogList } from "@/components/blog-list";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="w-full">
      <div className="container mx-auto p-10 cursor-pointer">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Tulisan Terkini</h1>
            <p className="text-muted-foreground">Pemikiran, cerita dan ide</p>
          </div>
          <form action="/admin" method="post">
            <Button type="submit" variant="outline">Admin Panel</Button>
          </form>
        </div>
        <div className="container mx-auto px-6 py-8">
          <BlogList />
        </div>
      </div>
    </div>
  );
}