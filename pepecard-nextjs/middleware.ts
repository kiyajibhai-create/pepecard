import { NextRequest, NextResponse } from 'next/server'
import { AUTH_COOKIE_NAME } from '@/lib/auth'

const PUBLIC_PATHS = new Set(['/login', '/register', '/robots.txt', '/sitemap.xml', '/news'])

// Search engine bot user-agent patterns
const BOT_PATTERNS = /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|facebot|ia_archiver|semrushbot|ahrefsbot|mj12bot|dotbot/i

function isBot(request: NextRequest): boolean {
  const ua = request.headers.get('user-agent') ?? ''
  return BOT_PATTERNS.test(ua)
}

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
  const bot = isBot(request)

  if (PUBLIC_PATHS.has(pathname)) {
    if ((pathname === '/login' || pathname === '/register') && hasSession && !bot) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
  }

  // Bots always pass through (needed for SEO indexing)
  if (bot) {
    return NextResponse.next()
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