import { NextResponse } from "next/server";
import { decrypt } from "@/lib/session";

// 1. Specify protected and public routes
const protectedRoutes = ["/admin", "/admin/bookings", "/admin/customers", "/admin/settings"];
const publicRoutes = ["/admin/login", "/"];

export async function middleware(req) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  
  // We consider any path starting with /admin to be protected, except /admin/login
  const isProtectedRoute = path.startsWith("/admin") && path !== "/admin/login";
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const cookie = req.cookies.get("admin_session")?.value;
  const session = await decrypt(cookie);

  // 4. Redirect to /admin/login if the user is not authenticated
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
  }

  // 5. Redirect to /admin if the user is already authenticated and visits /admin/login
  if (isPublicRoute && session?.userId && path === "/admin/login") {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
