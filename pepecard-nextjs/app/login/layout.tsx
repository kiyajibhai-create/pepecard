import type { Metadata } from 'next'
import { buildMetadata, webPageJsonLd } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'

const LOGIN_TITLE = 'PEPECARD Login | Official Secure Access'
const LOGIN_DESCRIPTION =
  'Login directly to PEPECARD Official to access your digital assets, trade credit tools, view refundable CC markets, and verify your secondary password.'

export const metadata: Metadata = buildMetadata({
  title: LOGIN_TITLE,
  description: LOGIN_DESCRIPTION,
  path: '/login',
  keywords: [
    'pepecard login',
    'pepecards login',
    'login pepecard',
    'pepecard official login',
    'pepecard cc sign in',
    'pepecard zip',
    'secure login pepecard',
    'pepecard portal',
  ],
})

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          title: LOGIN_TITLE,
          description: LOGIN_DESCRIPTION,
          path: '/login',
        })}
      />
      {children}
    </>
  )
}
