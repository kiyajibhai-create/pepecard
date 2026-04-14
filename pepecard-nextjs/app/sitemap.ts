import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/seo'

/**
 * Next.js dynamic sitemap – served at /sitemap.xml
 * Domain: pepecard.store
 *
 * Priority guide:
 *  1.0  – Homepage / landing
 *  0.9  – High-traffic hub pages (news, market)
 *  0.8  – Auth entry points that drive conversion (login)
 *  0.6  – Supporting pages (register, about)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    // ── Root ──────────────────────────────────────────────────────────────────
    {
      url: `${SITE_CONFIG.url}/`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    // ── News / Market hub ─────────────────────────────────────────────────────
    {
      url: `${SITE_CONFIG.url}/news`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    // ── Auth ──────────────────────────────────────────────────────────────────
    {
      url: `${SITE_CONFIG.url}/login`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_CONFIG.url}/register`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]
}
