import { BlogList } from "@/components/blog-list";

export default function Home() {
  return (
    <div className="w-full">
      <div className="border-b bg-background">
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold">Latest Articles</h1>
          <p className="text-muted-foreground mt-2">Thoughts, stories and ideas</p>
        </div>
      </div>
      <div className="container mx-auto px-6 py-8">
        <BlogList />
      </div>
    </div>
  );
}