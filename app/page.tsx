import { BlogList } from "@/components/blog-list";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-6xl mx-auto px-4 py-8">
        <BlogList />
      </main>
    </div>
  );
}