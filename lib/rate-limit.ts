import { NextResponse } from "next/server"

// In-memory store untuk tracking requests (simple - gunakan Redis untuk production)
const requestCounts = new Map<string, { count: number; resetTime: number }>()

const RATE_LIMIT = {
  maxRequests: 10,
  windowMs: 15 * 60 * 1000, // 15 menit
}

export function rateLimit(identifier: string): { success: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const userKey = identifier

  if (!requestCounts.has(userKey)) {
    requestCounts.set(userKey, {
      count: 1,
      resetTime: now + RATE_LIMIT.windowMs,
    })
    return { success: true, remaining: RATE_LIMIT.maxRequests - 1, resetTime: RATE_LIMIT.windowMs }
  }

  const userData = requestCounts.get(userKey)!

  // Reset counter jika time window sudah berlalu
  if (now > userData.resetTime) {
    requestCounts.set(userKey, {
      count: 1,
      resetTime: now + RATE_LIMIT.windowMs,
    })
    return { success: true, remaining: RATE_LIMIT.maxRequests - 1, resetTime: RATE_LIMIT.windowMs }
  }

  // Check jika sudah exceed limit
  if (userData.count >= RATE_LIMIT.maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetTime: userData.resetTime - now,
    }
  }

  // Increment counter
  userData.count++
  return {
    success: true,
    remaining: RATE_LIMIT.maxRequests - userData.count,
    resetTime: userData.resetTime - now,
  }
}

export function createRateLimitResponse(identifier: string) {
  const result = rateLimit(identifier)

  if (!result.success) {
    return NextResponse.json(
      {
        error: "Terlalu banyak request. Silakan coba lagi dalam beberapa menit",
        retryAfter: Math.ceil(result.resetTime / 1000),
      },
      {
        status: 429,
        headers: {
          "Retry-After": Math.ceil(result.resetTime / 1000).toString(),
          "X-RateLimit-Limit": RATE_LIMIT.maxRequests.toString(),
          "X-RateLimit-Remaining": result.remaining.toString(),
          "X-RateLimit-Reset": (Date.now() + result.resetTime).toString(),
        },
      }
    )
  }

  return null
}
