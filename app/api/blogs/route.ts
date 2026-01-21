import { createClient } from "@/lib/supabase-server"
import { CreateBlogSchema } from "@/lib/validations"
import { createRateLimitResponse } from "@/lib/rate-limit"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    const identifier = `create-blog-${ip}`

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

    const body = await request.json()

    // Validate input
    const validation = CreateBlogSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        },
        { status: 400 }
      )
    }

    // Create blog
    const { error, data } = await supabase.from("blogs").insert(validation.data).select()

    if (error) {
      console.error("[Create Blog API Error]", error)
      return NextResponse.json({ error: "Failed to create blog" }, { status: 500 })
    }

    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    console.error("[Create Blog API Exception]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
