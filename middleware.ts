import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This is a simple middleware to protect routes
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define which paths are protected (require authentication)
  const isProtectedPath =
    path.startsWith("/dashboard") || path.includes("/care-plans/create") || path.includes("/care-plans/edit")

  // Mock authentication check - in a real app, you would check for a valid session
  const isAuthenticated = checkIsAuthenticated(request)

  // If the path is protected and the user is not authenticated, redirect to login
  if (isProtectedPath && !isAuthenticated) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  return NextResponse.next()
}

// Mock function to check if user is authenticated
// In a real app, this would verify a session token or cookie
function checkIsAuthenticated(request: NextRequest): boolean {
  // For demo purposes, we'll consider the user always authenticated
  // In a real app, you would check for a valid session token or cookie
  return true

  // Example of how you might check for a session cookie:
  // const sessionCookie = request.cookies.get("session")
  // return sessionCookie !== undefined
}

// Configure which paths this middleware will run on
export const config = {
  matcher: ["/dashboard/:path*", "/care-plans/create", "/care-plans/:path*/edit"],
}
