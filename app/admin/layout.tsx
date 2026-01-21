import { createClient } from "@/lib/supabase-server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <>
      <div className="container mx-auto p-10">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="text-muted-foreground">Atur postingan admin</p>
          </div>
          <form action="/auth/signout" method="post">
            <Button type="submit" variant="outline" className="cursor-pointer">Keluar</Button>
          </form>
        </div>
        {children}
      </div>
      <Toaster />
    </>
  )
}