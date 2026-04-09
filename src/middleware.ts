import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is for admin routes
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  
  // Skip middleware for login page
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next();
  }

  if (isAdminRoute) {
    // Get the session cookie
    const sessionCookie = request.cookies.get('admin_session');
    
    // If no session cookie, redirect to login
    if (!sessionCookie) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Verify the session (simple check - in production, use proper JWT)
    try {
      const session = JSON.parse(sessionCookie.value);
      
      // Check if session is expired
      if (session.expiresAt && Date.now() > session.expiresAt) {
        const response = NextResponse.redirect(new URL('/admin/login', request.url));
        response.cookies.delete('admin_session');
        return response;
      }

      // Session is valid, allow access
      return NextResponse.next();
    } catch {
      // Invalid session, redirect to login
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('admin_session');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
