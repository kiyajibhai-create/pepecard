import type { Metadata } from 'next'

export const SITE_CONFIG = {
  name: 'PEPECARD Official',
  shortName: 'PEPECARD',
  url: 'https://www.pepecard.store',
  locale: 'en_US',
  twitter: '@pepecard',
  defaultTitle: 'PEPECARD Official | #1 Pepecard Marketplace | pepecard.store',
  defaultDescription:
    'PEPECARD Official – the #1 marketplace to buy and sell pepecards, crypto CC bases, world mix cards and refundable digital assets. Official site: www.pepecard.store. Secure login, 90%+ valid rates, instant refunds. Trusted by verified sellers worldwide.',
  keywords: [
    // ── Core brand (exact + variations) ─────────────────────────────────
    'PEPECARD',
    'pepecard',
    'pepe card',
    'pepe cards',
    'pepecards',
    'pepecard official',
    'pepecard official site',
    'official pepecard',
    'real pepecard',
    'trusted pepecard',
    'safe pepecard',

    // ── Domain variants – captures users searching any TLD ───────────────
    'pepecard.store',
    'www.pepecard.store',
    'pepecard.com',
    'pepecard.net',
    'pepecard.io',
    'pepecard.cc',
    'pepecard.in',
    'pepecard.co',
    'pepecard.xyz',
    'pepecard.org',
    'pepecard.info',
    'pepecard.biz',
    'pepecard.us',
    'pepecard.uk',
    'pepecard.eu',
    'pepecard.mobi',
    'pepecard.zip',
    'pepecard.app',
    'pepecard.me',
    'pepecard.tv',
    'pepecard.shop',
    'pepecard.pro',
    'pepecard store',
    'pepecard store official',
    'pepecards.cc',
    'pepecards.com',

    // ── Auth / login ─────────────────────────────────────────────────────
    'pepecard login',
    'pepecards login',
    'login pepecard',
    'pepecard sign in',
    'pepecard sign up',
    'pepecard portal',
    'pepecard secure login',
    'pepecard.store login',
    'pepecard.com login',
    'pepecard.cc login',
    'pepecard.mobi login',
    'pepecard.io login',
    'pepecard register',

    // ── Products / market ─────────────────────────────────────────────────
    'pepecard market',
    'pepecard marketplace',
    'buy pepecard',
    'buy pepecards',
    'pepecard seller',
    'pepecard sellers',
    'pepecard news',
    'pepecard updates',
    'pepecard announcements',
    'pepecard market analysis',
    'pepecard ticker',
    'best pepecard site',
    '#1 pepecard',
    'pepecard alternative',

    // ── CC / dumps / bases ────────────────────────────────────────────────
    'cc base',
    'cc bases',
    'buy cc base',
    'best cc base',
    'valid cc base',
    'fresh cc base',
    'high valid cc',
    'credit card base',
    'credit card dumps',
    'credit dumps',
    'world mix cards',
    'world mix cc',
    'refundable cc',
    'automatic refund cc',

    // ── Crypto / digital assets ───────────────────────────────────────────
    'crypto trading card',
    'crypto trading cards',
    'digital trading cards',
    'trading card marketplace',
    'pepecard crypto',
    'pepecard defi',
    'blockchain trading cards',
    'digital assets marketplace',

    // ── Typo / misspelling capture ────────────────────────────────────────
    'pepcard',
    'pepe card store',
    'pepicard',
    'pepecar',
    'pepecards store',
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
    keywords: keywords.join(', '),
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
      url: `${SITE_CONFIG.url}/icon.png`,
      width: 512,
      height: 512,
    },
    image: `${SITE_CONFIG.url}/og-image.png`,
    description: SITE_CONFIG.defaultDescription,
    sameAs: [
      'https://www.pepecard.store',
      'https://pepecard.store',
      'https://pepecard.zip',
      'https://t.me/PepeServicePepe',
    ],
    alternateName: [
      'PEPECARD',
      'pepecard.store',
      'pepecard.mobi',
      'pepecard.cc',
      'pepecard.zip',
      'pepe card',
      'pepecards',
    ],
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
    alternateName: ['PEPECARD', 'pepecard.store', 'pepecard.mobi', 'pepe card marketplace'],
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
