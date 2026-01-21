import { createClient } from "@/lib/supabase-server"
import { createRateLimitResponse } from "@/lib/rate-limit"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Rate limiting check (gunakan IP address atau user ID)
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    const identifier = `delete-blog-${ip}`

    const rateLimitResponse = createRateLimitResponse(identifier)
    if (rateLimitResponse) {
      return rateLimitResponse
    }

    // Verify user is authenticated
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Delete blog
    const { error } = await supabase.from("blogs").delete().eq("id", id)

    if (error) {
      return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "Blog deleted successfully" })
  } catch (error) {
    console.error("[Delete Blog API Error]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
