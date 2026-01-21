"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"

export function DeleteBlogButton({ id }: { id: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    setLoading(true)
    
    try {
      // Verify user is authenticated
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        toast.error("Anda harus login terlebih dahulu")
        router.push("/login")
        return
      }

      // Perform delete operation
      const { error } = await supabase.from("blogs").delete().eq("id", id)

      if (error) {
        toast.error("Gagal menghapus postingan")
        console.error("[Delete Blog Error]", error)
      } else {
        toast.success("Postingan berhasil dihapus")
        router.refresh()
      }
    } catch (error) {
      toast.error("Terjadi kesalahan")
      console.error("[Delete Blog Exception]", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm" className="flex-1 sm:flex-none" disabled={loading}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Serius mau hapus?</AlertDialogTitle>
          <AlertDialogDescription>
            Ini gabisa dibatalin. Ini bakal menghapus postingan blog secara permanen.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={loading}>
            {loading ? "Menghapus..." : "Hapus Postingan"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}