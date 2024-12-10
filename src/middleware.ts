import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// Define public routes
const isPublicRoute = createRouteMatcher([
  '/',            // Public landing page
  '/sign-in(.*)', // Public sign-in page
  '/sign-up(.*)', // Public sign-up page
]);

export default clerkMiddleware((auth, req) => {
  const url = req.nextUrl.clone();

  // Normalize `/Profile` to `/profile`
  if (url.pathname === "/Profile") {
    url.pathname = "/profile";
    return NextResponse.redirect(url);
  }

  // Skip authentication for public routes
  if (isPublicRoute(req)) {
    return NextResponse.next(); // Allow access to public routes
  }

});

export const config = {
  matcher: [
    // Match all dynamic routes and skip static files
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff|woff2|ttf|otf|css|js)$).*)',
    '/private',
    '/posts/:path*',
    '/profile/:path*',
  ],
};
