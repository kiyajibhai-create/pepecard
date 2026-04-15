import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  const base = SITE_CONFIG.url // https://www.pepecard.store

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/login', '/register', '/news', '/sitemap.xml', '/robots.txt'],
        disallow: ['/api/', '/_next/', '/favicon.ico'],
      },
      {
        userAgent: 'Googlebot',
        allow: ['/', '/login', '/register', '/news', '/sitemap.xml', '/robots.txt',
          '/icon.png', '/apple-icon.png', '/og-image.png', '/rectangle-logo.png'],
        disallow: ['/api/', '/_next/'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/og-image.png', '/icon.png', '/apple-icon.png', '/rectangle-logo.png', '/assets/'],
      },
    ],
    sitemap: [
      `${base}/sitemap.xml`,
      `https://pepecard.store/sitemap.xml`,
    ],
    host: base,
  }
}
