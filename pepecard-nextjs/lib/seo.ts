import type { Metadata } from 'next'

export const SITE_CONFIG = {
  name: 'PEPECARD Official',
  shortName: 'PEPECARD',
  url: 'https://pepecard.mobi',
  locale: 'en_US',
  twitter: '@pepecard',
  defaultTitle: 'PEPECARD Official Login | Buy Pepecards & Crypto CC',
  defaultDescription:
    'Welcome to the absolute official platform for PEPECARD. Securely login to pepecard.mobi or pepecards.cc. Verify your secondary password, explore the deepest credit card dumps, CC bases, world mixes, and premium crypto trading cards today.',
  keywords: [
    'PEPECARD',
    'pepecard',
    'pepecards',
    'pepecard login',
    'pepecards login',
    'pepecard .mobi',
    'pepecard mobi',
    'pepecard cc',
    'pepecard official',
    'pepecard news',
    'pepecard updates',
    'pepecard market',
    'pepecard crypto',
    'pepecard trading',
    'cards market',
    'market analysis',
    'security updates',
    'trading platform',
    'crypto trading card',
    'digital assets',
    'pepe crypto',
    'buy pepecard',
    'secure crypto platform',
    'pepecard web3',
    'pepecard defi',
    'best crypto cards',
  ],
  ogImage: '/og-image.png',
} as const

export type SeoInput = {
  title?: string
  description?: string
  path?: string
  keywords?: string[]
  image?: string
  noIndex?: boolean
}

export function buildMetadata(input: SeoInput = {}): Metadata {
  const title = input.title ?? SITE_CONFIG.defaultTitle
  const description = input.description ?? SITE_CONFIG.defaultDescription
  const url = new URL(input.path ?? '/', SITE_CONFIG.url).toString()
  const image = new URL(input.image ?? SITE_CONFIG.ogImage, SITE_CONFIG.url).toString()
  const keywords = Array.from(new Set([...SITE_CONFIG.keywords, ...(input.keywords ?? [])]))

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_CONFIG.name,
      images: [{ url: image, width: 1200, height: 630, alt: title, type: 'image/jpeg' }],
      type: 'website',
      locale: SITE_CONFIG.locale,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: SITE_CONFIG.twitter,
      site: SITE_CONFIG.twitter,
      images: [image],
    },
    robots: input.noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  }
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: new URL('/rectangle-logo.png', SITE_CONFIG.url).toString(),
    description: SITE_CONFIG.defaultDescription,
    sameAs: ['https://t.me/PepeServicePepe'],
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.defaultDescription,
    inLanguage: 'en',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_CONFIG.url}/news?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

export function webPageJsonLd(input: { title: string; description: string; path: string }) {
  const url = new URL(input.path, SITE_CONFIG.url).toString()
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: input.title,
    description: input.description,
    url,
    isPartOf: { '@type': 'WebSite', name: SITE_CONFIG.name, url: SITE_CONFIG.url },
    inLanguage: 'en',
  }
}
