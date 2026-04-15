import { NextRequest, NextResponse } from 'next/server'
import { AUTH_COOKIE_NAME } from '@/lib/auth'

const PUBLIC_PATHS = new Set(['/login', '/register', '/robots.txt', '/sitemap.xml'])

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname === '/favicon.ico' ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  const hasSession = request.cookies.get(AUTH_COOKIE_NAME)?.value

  if (PUBLIC_PATHS.has(pathname)) {
    if ((pathname === '/login' || pathname === '/register') && hasSession) {
      return NextResponse.redirect(new URL('/news', request.url))
    }

    return NextResponse.next()
  }

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/news', request.url))
  }

  if (!hasSession) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('next', `${pathname}${request.nextUrl.search}`)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}