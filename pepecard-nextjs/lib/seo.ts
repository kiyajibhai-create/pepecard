import type { Metadata } from 'next'

export const SITE_CONFIG = {
  name: 'PEPECARD Official',
  shortName: 'PEPECARD',
  /** Primary public domain – all canonical URLs are built from this */
  url: 'https://www.pepecard.store',
  locale: 'en_US',
  twitter: '@pepecard',
  defaultTitle: 'PEPECARD Official | Buy Pepecards & Crypto CC | pepecard.store',
  defaultDescription:
    'PEPECARD Official – the premier marketplace for crypto trading cards, CC bases, world card mixes and refundable digital assets. Login securely at pepecard.store and explore verified bases from top sellers worldwide.',
  keywords: [
    // Brand
    'PEPECARD',
    'pepecard',
    'pepecards',
    'pepecard official',
    'pepecard store',
    'pepecard.store',
    'www.pepecard.store',
    // Mirror domains / alternate spellings — kept so this site ranks
    // for users who type the old domains into Google.
    'pepecard.mobi',
    'pepe card mobi',
    'pepecard mobi',
    'pepecard store official',
    'pepecard zip',
    'pepecard.zip',
    'pepecards.cc',
    'pepecard cc',
    'pepe.mobi',
    'pepe mobi',
    // Auth
    'pepecard login',
    'pepecards login',
    'login pepecard',
    'pepecard sign in',
    'pepecard.mobi login',
    'pepecard mobi login',
    'secure login pepecard',
    'pepecard portal',
    // Market / product
    'pepecard news',
    'pepecard updates',
    'pepecard market',
    'pepecard announcements',
    'pepecard seller',
    'buy pepecard',
    'buy pepecards',
    'cc base',
    'credit dump',
    'credit card dumps',
    'world mix cards',
    'refundable cc',
    'pepe market',
    'cards market',
    'market analysis',
    // Crypto
    'pepecard crypto',
    'pepecard trading',
    'crypto trading card',
    'digital assets',
    'pepe crypto',
    'secure crypto platform',
    'pepecard web3',
    'pepecard defi',
    'best crypto cards',
    // Generic
    'trading platform',
    'security updates',
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
      images: [{ url: image, width: 1200, height: 630, alt: title, type: 'image/png' }],
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
    logo: {
      '@type': 'ImageObject',
      url: new URL('/rectangle-logo.png', SITE_CONFIG.url).toString(),
      width: 200,
      height: 60,
    },
    description: SITE_CONFIG.defaultDescription,
    sameAs: [
      'https://www.pepecard.store',
      'https://pepecard.store',
      'https://pepecard.zip',
      'https://t.me/PepeServicePepe',
    ],
    alternateName: ['PEPECARD', 'pepecard.mobi', 'pepecard.store', 'pepe card'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: 'https://t.me/PepeServicePepe',
    },
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
    dateModified: new Date().toISOString(),
  }
}

/**
 * BreadcrumbList JSON-LD for inner pages.
 * @param items - ordered array of { name, path } breadcrumb items
 */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: new URL(item.path, SITE_CONFIG.url).toString(),
    })),
  }
}

/**
 * FAQ JSON-LD – useful for news / announcement pages to capture rich results.
 */
export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}
