import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    // Get the admin password from environment variable
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Validate that admin password is configured
    if (!adminPassword) {
      console.error('ADMIN_PASSWORD is not configured in environment variables');
      return NextResponse.json(
        { message: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Simple password comparison (constant-time comparison would be better for production)
    if (password !== adminPassword) {
      return NextResponse.json(
        { message: 'Invalid password' },
        { status: 401 }
      );
    }

    // Create session with expiration (24 hours from now)
    const session = {
      authenticated: true,
      expiresAt: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
    };

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful',
    });

    // Set session cookie
    response.cookies.set('admin_session', JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.json(
      { message: 'Authentication failed' },
      { status: 500 }
    );
  }
}
