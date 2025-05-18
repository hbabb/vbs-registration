import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define all protected routes (e.g., admin dashboard)
const protectedRoutes = ['/admin'];

// Check if the current request path is protected
function isProtectedRoute(pathname: string): boolean {
    return protectedRoutes.some(path => pathname.startsWith(path));
}

// Main middleware logic
export default clerkMiddleware(async (auth, req) => {
    const pathname = req.nextUrl.pathname;

    // If request is for a protected route, check authentication
    if (isProtectedRoute(pathname)) {
        const { userId } = await auth();

        // If not authenticated, redirect to Clerk's sign-in page
        if (!userId) {
            return NextResponse.redirect(new URL('/sign-in', req.url));
        }
    }

    // Allow request to continue normally
    return NextResponse.next();
});

// Define paths where this middleware runs
export const config = {
    matcher: [
        // Skip Next.js internals and static assets
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always include API routes
        '/(api|trpc)(.*)',
    ],
};
