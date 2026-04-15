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

      {/* SEO content — visible to search engines, styled to blend with page footer */}
      <section
        aria-label="About PEPECARD login"
        style={{ background: '#f0f5fa', borderTop: '1px solid #dde', padding: '36px 20px', fontFamily: 'Arial, sans-serif' }}
      >
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '22px', color: '#1a3a5c', marginBottom: '12px' }}>
            PEPECARD Official Login — pepecard.store
          </h2>
          <p style={{ color: '#555', lineHeight: '1.7', marginBottom: '16px' }}>
            You are on the official <strong>PEPECARD login</strong> page at <strong>www.pepecard.store</strong>.
            PEPECARD is the #1 marketplace for <strong>pepe card</strong> trading, CC bases, world mix cards and crypto digital assets.
            Log in to access the <strong>pepecard market</strong>, browse verified CC bases, and trade with trusted sellers.
          </p>
          <p style={{ color: '#555', lineHeight: '1.7', marginBottom: '16px' }}>
            <strong>Pepecard login</strong> is protected by two-layer authentication — username + password and a secondary password.
            This keeps your pepecard account secure. Always log in at <strong>pepecard.store</strong> — never use lookalike sites.
          </p>
          <p style={{ color: '#777', fontSize: '13px', marginBottom: '24px' }}>
            ⚠️ Warning: The ONLY official <strong>pepecard</strong> domain is <strong>www.pepecard.store</strong>.
            Sites like pepecard.mobi, pepecard.cc and similar are scams.
            Do not enter your pepecard login credentials on any other site.
          </p>

          {/* FAQ rendered as visible text for SEO */}
          <h3 style={{ fontSize: '18px', color: '#1a3a5c', marginBottom: '16px' }}>
            Pepecard Login — FAQ
          </h3>
          <dl style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {loginFaqs.map(({ question, answer }) => (
              <div key={question} style={{ background: 'white', padding: '14px 18px', borderRadius: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                <dt style={{ fontWeight: 'bold', color: '#1a3a5c', marginBottom: '6px' }}>{question}</dt>
                <dd style={{ margin: 0, color: '#555', lineHeight: '1.6' }}>{answer}</dd>
              </div>
            ))}
          </dl>

          <div style={{ marginTop: '20px', fontSize: '14px', color: '#888' }}>
            <a href="/" style={{ color: '#0066cc', marginRight: '16px' }}>PEPECARD Home</a>
            <a href="/news" style={{ color: '#0066cc', marginRight: '16px' }}>Pepecard Market</a>
            <a href="/register" style={{ color: '#0066cc' }}>Register Pepecard Account</a>
          </div>
        </div>
      </section>
    </>
  )
}
