import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/seo'

/**
 * Next.js dynamic sitemap – served at /sitemap.xml
 * Domain: www.pepecard.store
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const base = SITE_CONFIG.url

  return [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${base}/news`,
      lastModified: now,
      changeFrequency: 'hourly',
      priority: 0.95,
    },
    {
      url: `${base}/login`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${base}/login?next=%2Fnews`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${base}/register`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}
