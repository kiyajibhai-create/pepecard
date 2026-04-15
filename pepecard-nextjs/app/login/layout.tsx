import type { Metadata } from 'next'
import { buildMetadata, webPageJsonLd, faqJsonLd } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'

const LOGIN_TITLE = 'PEPECARD Login | Official Secure Access | pepecard.store'
const LOGIN_DESCRIPTION =
  'Official PEPECARD login page at www.pepecard.store. Access your CC bases, world mix cards, refundable digital assets and verified seller listings. Secure login — the only real pepecard site.'

export const metadata: Metadata = buildMetadata({
  title: LOGIN_TITLE,
  description: LOGIN_DESCRIPTION,
  path: '/login',
  keywords: [
    'pepecard login',
    'pepecards login',
    'login pepecard',
    'pepecard official login',
    'pepecard.store login',
    'pepecard.com login',
    'pepecard.cc login',
    'pepecard.mobi login',
    'pepecard.io login',
    'pepecard sign in',
    'pepecard portal',
    'secure pepecard login',
    'pepecard account',
  ],
})

const loginFaqs = [
  {
    question: 'What is the official PEPECARD website?',
    answer: 'The official PEPECARD website is www.pepecard.store. All other domains like pepecard.mobi, pepecard.cc or pepecard.com are not the official site.',
  },
  {
    question: 'How do I login to PEPECARD?',
    answer: 'Go to www.pepecard.store/login, enter your username and password, complete the math verification, then confirm your secondary password.',
  },
  {
    question: 'Is PEPECARD the same as pepecard.mobi?',
    answer: 'PEPECARD Official has moved to www.pepecard.store. The old domain pepecard.mobi now redirects here. Always use www.pepecard.store for the safest and official access.',
  },
  {
    question: 'How do I register on PEPECARD?',
    answer: 'Visit www.pepecard.store/register to create a new PEPECARD account. You will need a username, password, secondary password, and an invitation code.',
  },
]

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={webPageJsonLd({ title: LOGIN_TITLE, description: LOGIN_DESCRIPTION, path: '/login' })} />
      <JsonLd data={faqJsonLd(loginFaqs)} />
      {children}
    </>
  )
}
