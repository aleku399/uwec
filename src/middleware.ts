// src/middleware.ts

import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';

export const config = {
  matcher: [ "/test"],
};

export function middleware(request: NextRequest) {
  console.log('Middleware executing for:', request.url);
  if (!isAuthenticated(request)) {
    console.log('User not authenticated, redirecting to login');
    return NextResponse.redirect(new URL('/login', request.url));
  }
  console.log('User authenticated, proceeding');
  return NextResponse.next();
}
