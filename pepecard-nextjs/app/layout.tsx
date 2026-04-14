import type { Metadata, Viewport } from 'next'
import '../styles/globals.css'
import '../styles/global.css'
import { SITE_CONFIG, buildMetadata, organizationJsonLd, websiteJsonLd } from '@/lib/seo'
import { EXTERNAL_STYLESHEETS } from '@/lib/stylesheets'
import JsonLd from '@/components/JsonLd'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  ...buildMetadata(),
  title: {
    default: SITE_CONFIG.defaultTitle,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  applicationName: SITE_CONFIG.name,
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  category: 'technology',
  icons: {
    icon: [{ url: '/favicon.ico', sizes: 'any' }],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  appleWebApp: {
    title: SITE_CONFIG.name,
    statusBarStyle: 'default',
    capable: true,
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export const viewport: Viewport = {
  width: 1080,
  initialScale: 0.1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ fontSize: '14px' }}>
      <head>
        <link rel="preconnect" href="https://pepecard.store" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://pepecard.store" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {EXTERNAL_STYLESHEETS.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
      </head>
      <body>{children}</body>
    </html>
  )
}
