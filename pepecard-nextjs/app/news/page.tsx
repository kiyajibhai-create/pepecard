import type { Metadata } from 'next'
import Layout from '../../components/Layout'
import JsonLd from '@/components/JsonLd'
import { buildMetadata, webPageJsonLd } from '@/lib/seo'

const NEWS_TITLE = 'PEPECARD Market | Official Secure Access & Market Ticker'
const NEWS_DESCRIPTION =
  'Explore the top recommended PEPECARD bases, valid rate statistics, world card mixes, and guaranteed refundable card stocks. Maximize your crypto trading on PEPECARD Official.'

export const metadata: Metadata = buildMetadata({
  title: NEWS_TITLE,
  description: NEWS_DESCRIPTION,
  path: '/news',
  keywords: [
    'pepecard',
    'pepecards',
    'buy pepecards',
    'pepecard market',
    'cc base',
    'credit dump',
    'pepecard seller',
    'pepecard zip',
    'refundable cc',
    'world mix cards',
    'pepe market',
    'pepecard news',
    'pepecard announcements',
  ],
})

// ─── Data ────────────────────────────────────────────────────────────────────

interface RecommendedBase {
  id: number
  title: string
  status: string
  validRate: string
  sold: string
  countries: string
  rating: number
  seller: string
  sellerId: number
  info: string
}

interface MainBase {
  id: number
  title: string
  seller?: string
  sellerId?: number
  refundable: string
  countries: string
  info: string
  validRate: string
  type: string
  price: string
}

const recommendedBases: RecommendedBase[] = [
  {
    id: 8582,
    title: '2026_04_12_FR_GB_IT (dow***n)',
    status: 'Credit/Debit',
    validRate: '65%',
    sold: '1.50-5.50U',
    countries: 'ES,FR,GB,IE,IT',
    rating: 3.3,
    seller: 'dow***n',
    sellerId: 32982,
    info: 'Price :1.50-1.50U   Automatic refund',
  },
  {
    id: 8583,
    title: '2026_04_12_US_CA_BR (dow***n)',
    status: 'Credit/Debit',
    validRate: '60%',
    sold: '1.50-4.40U',
    countries: 'AR,BR,CA,SE,US',
    rating: 3,
    seller: 'dow***n',
    sellerId: 32982,
    info: 'Price :1.50-1.50U   Automatic refund',
  },
  {
    id: 8584,
    title: '2026_04_12_US_CA_GB (dog***t)',
    status: 'Credit/Debit',
    validRate: '90%',
    sold: '4.00-4.40U',
    countries: 'CA,FR,GB,SE,US',
    rating: 4.5,
    seller: 'dog***t',
    sellerId: 31587,
    info: 'Price :4.00-4.00U   Automatic refund',
  },
  {
    id: 8585,
    title: '2026_04_12_US_CA_RU (zal***9)',
    status: 'Credit/Debit',
    validRate: '90%',
    sold: '3.00-3.50U',
    countries: 'BR,CA,GB,RU,US',
    rating: 4.5,
    seller: 'zal***9',
    sellerId: 20094,
    info: 'Price :3.00-3.00U   Automatic refund',
  },
  {
    id: 8586,
    title: '2026_04_12_US(High) (wan***8)',
    status: 'Credit/Debit',
    validRate: '90%',
    sold: '13.50-13.50U',
    countries: 'US',
    rating: 4.5,
    seller: 'wan***8',
    sellerId: 20096,
    info: 'Price :13.50-13.50U   Automatic refund',
  },
  {
    id: 8587,
    title: '2026_04_12_US_CA_PR (wan***8)',
    status: 'Credit/Debit',
    validRate: '90%',
    sold: '3.00-3.50U',
    countries: 'CA,PE,PR,RU,US',
    rating: 4.5,
    seller: 'wan***8',
    sellerId: 20096,
    info: 'Price :3.00-3.00U   Automatic refund',
  },
]

const mainBases: MainBase[] = [
  {
    id: 8587,
    title: '2026_04_12_US_CA_PR (wan***8)',
    seller: 'wan***8',
    sellerId: 20096,
    refundable: 'Yes',
    countries: 'CA,PE,PR,RU,US [WORLD]',
    info: 'Number, Exp Date, CVV2, Name,Address,State, City, Zip code, Phone, Email',
    validRate: '90%',
    type: 'Credit/Debit',
    price: '3.00-3.50U   Automatic refund',
  },
  {
    id: 8586,
    title: '2026_04_12_US(High) (wan***8)',
    seller: 'wan***8',
    sellerId: 20096,
    refundable: 'Yes',
    countries: 'US',
    info: 'Number, Exp Date, CVV2, Name,Address,State, City, Zip code, Phone, Email',
    validRate: '90%',
    type: 'Credit/Debit',
    price: '13.50-13.50U   Automatic refund',
  },
  {
    id: 8585,
    title: '2026_04_12_US_CA_RU (zal***9)',
    seller: 'zal***9',
    sellerId: 20094,
    refundable: 'Yes',
    countries: 'BR,CA,GB,RU,US [WORLD]',
    info: 'Number, Exp Date, CVV2, Name,Address,State, City, Zip code, Phone, Email',
    validRate: '90%',
    type: 'Credit/Debit',
    price: '3.00-3.50U   Automatic refund',
  },
  {
    id: 8584,
    title: '2026_04_12_US_CA_GB (dog***t)',
    seller: 'dog***t',
    sellerId: 31587,
    refundable: 'Yes',
    countries: 'CA,FR,GB,SE,US [WORLD]',
    info: 'Number, Exp Date, CVV2, Name,Address,State, City, Zip code, Phone, Email',
    validRate: '90%',
    type: 'Credit/Debit',
    price: '4.00-4.40U   Automatic refund',
  },
  {
    id: 8583,
    title: '2026_04_12_US_CA_BR (dow***n)',
    seller: 'dow***n',
    sellerId: 32982,
    refundable: 'Yes',
    countries: 'AR,BR,CA,SE,US [WORLD]',
    info: 'Number, Exp Date, CVV2, Name,Address,State, City, Zip code, Phone, Email',
    validRate: '60%',
    type: 'Credit/Debit',
    price: '1.50-4.40U   Automatic refund',
  },
  {
    id: 8582,
    title: '2026_04_12_FR_GB_IT (dow***n)',
    seller: 'dow***n',
    sellerId: 32982,
    refundable: 'Yes',
    countries: 'ES,FR,GB,IE,IT [WORLD]',
    info: 'Number, Exp Date, CVV2, Name,Address,State, City, Zip code, Phone, Email',
    validRate: '65%',
    type: 'Credit/Debit',
    price: '1.50-5.50U   Automatic refund',
  },
  {
    id: 8580,
    title: '2026_04_12_World Mix (bt***9)',
    seller: 'bt***9',
    sellerId: 21403,
    refundable: 'Yes',
    countries: 'AR,CA,GB,MX,US [WORLD]',
    info: 'Number, Exp Date, CVV2, Name,Address,State, City, Zip code, Phone, Email',
    validRate: '90%',
    type: 'Credit/Debit',
    price: '0.80-2.30U   Automatic refund',
  },
  {
    id: 8579,
    title: '2026_04_12_US (Not*****)',
    seller: 'Not*****',
    sellerId: 4180,
    refundable: 'Yes',
    countries: 'US',
    info: 'Number, Exp Date, CVV2, Name,Address,State, City, Zip code, Phone, Email',
    validRate: '90%',
    type: 'Credit/Debit',
    price: '0.80-2.40U   Automatic refund',
  },
  {
    id: 8578,
    title: '2026_04_12_US (Bl*****le)',
    seller: 'Bl*****le',
    sellerId: 13,
    refundable: 'Yes',
    countries: 'US',
    info: 'Number, Exp Date, CVV2, Name,Address,State, City, Zip code, Phone, Email',
    validRate: '90%',
    type: 'Credit/Debit',
    price: '0.80-2.40U   Automatic refund',
  },
  {
    id: 8577,
    title: '2026_04_12_US (Ha*****op)',
    seller: 'Ha*****op',
    sellerId: 7,
    refundable: 'Yes',
    countries: 'US',
    info: 'Number, Exp Date, CVV2, Name,Address,State, City, Zip code, Phone, Email',
    validRate: '90%',
    type: 'Credit/Debit',
    price: '0.80-2.40U   Automatic refund',
  },
]

// ─── Star SVG path (shared) ───────────────────────────────────────────────────
const STAR_PATH =
  'M22.683 5.415c.568-1.043 2.065-1.043 2.634 0l5.507 10.098a1.5 1.5 0 0 0 1.04.756l11.306 2.117c1.168.219 1.63 1.642.814 2.505l-7.902 8.359a1.5 1.5 0 0 0-.397 1.223l1.48 11.407c.153 1.177-1.058 2.057-2.131 1.548l-10.391-4.933a1.5 1.5 0 0 0-1.287 0l-10.39 4.933c-1.073.51-2.284-.37-2.131-1.548l1.48-11.407a1.5 1.5 0 0 0-.398-1.223L4.015 20.89c-.816-.863-.353-2.286.814-2.505l11.306-2.117a1.5 1.5 0 0 0 1.04-.756l5.508-10.098Z'

// ─── StarRating component ─────────────────────────────────────────────────────
function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      className="arco-icon arco-icon-star-fill"
      strokeWidth={4}
      strokeLinecap="butt"
      strokeLinejoin="miter"
    >
      <path d={STAR_PATH} fill="currentColor" stroke="none" />
    </svg>
  )
}

function StarRating({ value }: { value: number }) {
  // renders 5 stars using the arco half-star system
  const stars = [1, 2, 3, 4, 5]
  return (
    <div className="arco-rate arco-rate-readonly" data-v-a4a03343="">
      {stars.map((star) => {
        const isFullFilled = value >= star
        const isHalfFilled = !isFullFilled && value >= star - 0.5
        const charClass = isFullFilled
          ? 'arco-rate-character arco-rate-character-full'
          : isHalfFilled
          ? 'arco-rate-character arco-rate-character-half'
          : 'arco-rate-character'
        return (
          <div key={star} className={charClass}>
            {/* left half */}
            <div
              className="arco-rate-character-left"
              role="radio"
              aria-checked={value >= star - 0.5 ? 'true' : 'false'}
              aria-setsize={5}
              aria-posinset={star - 0.5}
              style={value >= star - 0.5 ? { color: 'rgb(231, 195, 84)' } : undefined}
            >
              <StarIcon filled={value >= star - 0.5} />
            </div>
            {/* right half */}
            <div
              className="arco-rate-character-right"
              role="radio"
              aria-checked={value >= star ? 'true' : 'false'}
              aria-setsize={5}
              aria-posinset={star}
              style={value >= star ? { color: 'rgb(231, 195, 84)' } : undefined}
            >
              <StarIcon filled={value >= star} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── RecommendedCard component ────────────────────────────────────────────────
function RecommendedCard({ base }: { base: RecommendedBase }) {
  return (
    <div className="item" data-v-a4a03343="">
      <div className="card" data-v-a4a03343="">
        <div className="top" data-v-a4a03343="">
          <a href={`/cvv2/${base.id}`} className="no-underline" data-v-a4a03343="">
            <div className="title" data-v-a4a03343="">{base.title}</div>
          </a>
          <div className="status" data-v-a4a03343="">Status: {base.status}</div>
          <div className="sell-info" data-v-a4a03343="">
            <div className="info-item" data-v-a4a03343="">
              <span data-v-a4a03343="">Valid rate</span>
              <span className="value" data-v-a4a03343="">{base.validRate}</span>
            </div>
            <div className="info-item" data-v-a4a03343="">
              <span data-v-a4a03343="">Sold</span>
              <span className="value" data-v-a4a03343="">{base.sold}</span>
            </div>
          </div>
          <div className="base-country" data-v-a4a03343="">
            <span data-v-a4a03343="">Top-selling countries</span>
            <span className="country-text" data-v-a4a03343="">{base.countries}</span>
          </div>
        </div>
        <div className="bottom" data-v-a4a03343="">
          <div className="flex justify-center items-center gap-2" data-v-a4a03343="">
            <StarRating value={base.rating} />
            <span data-v-a4a03343="">{base.rating}/5</span>
          </div>
          <div className="review" data-v-a4a03343="">
            <span data-v-a4a03343="">Seller:</span>
            <a href={`/seller/${base.sellerId}`} data-v-a4a03343="">
              <span className="review-value" data-v-a4a03343="">{base.seller}</span>
            </a>
          </div>
          <div className="review" data-v-a4a03343="">
            <span data-v-a4a03343="">info:</span>
            <span className="review-value" data-v-a4a03343="">{base.info}</span>
          </div>
          <div className="flex justify-center items-center mt-3" data-v-a4a03343="">
            <a href={`/cvv2/${base.id}`} data-v-a4a03343="">
              <button
                className="arco-btn arco-btn-primary arco-btn-shape-square arco-btn-size-medium arco-btn-status-normal"
                type="button"
                data-v-a4a03343=""
              >
                Go
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── MainBaseCard component ───────────────────────────────────────────────────
function MainBaseCard({ base }: { base: MainBase }) {
  return (
    <div className="card-item" data-v-93ecf1eb="">
      <div className="uppercase font-600 text-xl break-words px-2" data-v-93ecf1eb="">
        Base name:{' '}
        <a
          href={`/cvv2/${base.id}`}
          className="no-underline hover:underline hover:underline-offset-2 primary"
          data-v-93ecf1eb=""
        >
          {base.title}
        </a>
      </div>
      {base.seller && base.sellerId && (
        <div className="seller mt-2 text-lg px-2" data-v-93ecf1eb="">
          {' '}
          seller:{' '}
          <a href={`/seller/${base.sellerId}`} className="primary" data-v-93ecf1eb="">
            <span data-v-93ecf1eb="">{base.seller}</span>
          </a>
        </div>
      )}
      <div className="mt-2 text-base px-2" data-v-93ecf1eb="">Refundable: {base.refundable}</div>
      <div
        role="separator"
        className="arco-divider arco-divider-horizontal"
        style={{ borderBottomColor: 'rgb(178, 178, 178)' }}
        data-v-93ecf1eb=""
      />
      <div className="font-300 uppercase px-4 py-3 box-border leading-8 text-lg break-words" data-v-93ecf1eb="">
        <div data-v-93ecf1eb="">Countries: {base.countries}</div>
        <span data-v-93ecf1eb="">info</span>: {base.info}
        <br data-v-93ecf1eb="" /> Valid rate: {base.validRate}
        <br data-v-93ecf1eb="" /> Type: {base.type}
        <br data-v-93ecf1eb="" /> Price&nbsp;:{base.price}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function NewsPage() {
  return (
    <Layout activePage="news">
      <JsonLd
        data={webPageJsonLd({
          title: NEWS_TITLE,
          description: NEWS_DESCRIPTION,
          path: '/news',
        })}
      />
      <div className="pt-10 sm:pt-0">
        <div data-v-f6b83dad="">
          {/* ── Announcement Banner ── */}
          <div className="banner-wrapper" data-v-9d89b212="" data-v-f6b83dad="">
            <div className="w-full relative z-20" data-v-85fe2cc3="" data-v-9d89b212="">
              <div className="layout-container-large" data-v-85fe2cc3="">
                <div className="annc-board" data-v-85fe2cc3="">
                  <div className="relative z-99" data-v-85fe2cc3="">
                    <div
                      className="flex flex-col items-center justify-center"
                      style={{ lineHeight: 0 }}
                      data-v-7fbf4563=""
                      data-v-85fe2cc3=""
                    >
                      <h2 className="title" style={{ color: 'rgb(53, 71, 93)' }} data-v-7fbf4563="">
                        Attention
                      </h2>
                      <div className="divide-line" data-v-7fbf4563="" />
                    </div>

                    <div className="arco-spin w-full !bg-transparent" data-v-85fe2cc3="">
                      <div className="min-h-30 sm:min-h-50" data-v-85fe2cc3="">
                        <div data-v-85fe2cc3="">
                          <div
                            style={{
                              width: '100%',
                              background: '#f0f5f5',
                              padding: '40px 20px',
                              lineHeight: '1.8',
                              fontFamily: 'Arial,Helvetica,sans-serif',
                            }}
                          >
                            <div style={{ width: '100%', textAlign: 'left' }}>
                              <p
                                style={{
                                  color: '#0066cc',
                                  fontSize: '36px',
                                  fontWeight: 'bold',
                                  marginBottom: '25px',
                                }}
                              >
                                Attention! Official shop domains UPDATED
                              </p>

                              <p style={{ fontSize: '24px', marginBottom: '20px' }}>
                                <a
                                  href="https://www.pepecard.store"
                                  rel="canonical"
                                  style={{ color: '#1a73e8' }}
                                >
                                  www.pepecard.store
                                </a>
                                &nbsp; - &nbsp;
                                <a
                                  href="https://pepecard.zip"
                                  target="_blank"
                                  rel="noopener nofollow"
                                  style={{ color: '#1a73e8' }}
                                >
                                  pepecard.zip
                                </a>
                              </p>

                              <p style={{ fontSize: '14px', marginBottom: '20px', color: '#555' }}>
                                Formerly known as <strong>pepecard.mobi</strong>,{' '}
                                <strong>pepe.mobi</strong> and <strong>pepecards.cc</strong> — the
                                official domain is now{' '}
                                <a href="https://www.pepecard.store" rel="canonical" style={{ color: '#1a73e8' }}>
                                  www.pepecard.store
                                </a>
                                . All other lookalikes are scams.
                              </p>

                              <p style={{ fontSize: '18px' }}>
                                Tor.onion: http://pepecardyaim6jiievuqkdhrca6tpih4veb2ljiryjhue2jpe7iwltyd.onion
                                (Others are fake!)
                              </p>

                              <p style={{ fontSize: '18px' }}>
                                All other domains are a scam! Never use fake similar looking sites.
                              </p>

                              <p style={{ fontSize: '18px' }}>
                                Telegram:{' '}
                                <a
                                  href="https://t.me/PepeServicePepe"
                                  target="_blank"
                                  rel="noopener nofollow"
                                >
                                  @PepeServicePepe
                                </a>
                              </p>

                              <p style={{ fontSize: '18px', marginTop: '20px' }}>
                                Regarding discounts:
                              </p>

                              {[
                                { threshold: '$10,000', discount: '10%' },
                                { threshold: '$20,000', discount: '15%' },
                                { threshold: '$40,000', discount: '20%' },
                                { threshold: '$70,000', discount: '30%' },
                                { threshold: '$100,000', discount: '50%' },
                                { threshold: '$200,000', discount: '60%' },
                                { threshold: '$300,000', discount: '70%' },
                              ].map(({ threshold, discount }) => (
                                <p key={threshold} style={{ fontSize: '18px' }}>
                                  • Spend a cumulative total of {threshold} and receive a {discount}{' '}
                                  discount
                                </p>
                              ))}

                              <p style={{ fontSize: '18px' }}>
                                • Click to join the Channel:&nbsp;
                                <a
                                  href="https://t.me/+xfcpRlLcYOoyYjZk"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  Channel
                                </a>
                              </p>

                              <p style={{ fontSize: '18px' }}>
                                • Click to join the group (for interaction and communication):{' '}
                                <a
                                  href="https://t.me/+duofIp7RAkcyZjVh"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  Group
                                </a>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Recommended Base (horizontal scroll) ── */}
          <div className="seller-list-horizontal" data-v-f6b83dad="">
            <div data-v-a4a03343="" data-v-f6b83dad="">
              <div className="layout-container-large" data-v-a4a03343="">
                <h2 className="text-4.5 font-400 py-4 font-600 !text-2xl capitalize" data-v-a4a03343="">
                  Recommended Base
                </h2>
              </div>
              <div className="arco-spin w-full" data-v-a4a03343="">
                <div className="arco-scrollbar arco-scrollbar-type-embed" data-v-a4a03343="">
                  <div className="arco-scrollbar-container overflow-y-auto w-fit max-w-100% flex flex-nowrap gap-8 layout-container-large !pt-4 !pb-4 md:!pb-8">
                    {recommendedBases.map((base) => (
                      <RecommendedCard key={base.id} base={base} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Main Base List ── */}
          <div className="layout-container-large" data-v-93ecf1eb="" data-v-f6b83dad="">
            <div className="min-h-100 pt-6" id="anchor-start" data-v-93ecf1eb="">
              <div className="arco-spin w-full" data-v-93ecf1eb="">
                <div className="list-wrapper" data-v-93ecf1eb="">
                  {mainBases.map((base) => (
                    <MainBaseCard key={base.id} base={base} />
                  ))}
                </div>
              </div>

              {/* ── Pagination ── */}
              <div className="flex items-center justify-end pb-16 pt-6" data-v-93ecf1eb="">
                <div className="arco-pagination arco-pagination-size-medium" data-v-93ecf1eb="">
                  <ul className="arco-pagination-list">
                    <span className="arco-pagination-item arco-pagination-item-previous arco-pagination-item-disabled" data-v-93ecf1eb="">
                      <svg
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="currentColor"
                        className="arco-icon arco-icon-send"
                        strokeWidth={4}
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                        style={{ transform: 'rotate(180deg)' }}
                        data-v-93ecf1eb=""
                      >
                        <path
                          d="m14 24-7-5V7l34 17L7 41V29l7-5Zm0 0h25"
                          strokeMiterlimit="3.864"
                        />
                      </svg>
                    </span>
                    {[1, 2, 3, 4, 5].map((page) => (
                      <li
                        key={page}
                        className={`arco-pagination-item${page === 1 ? ' arco-pagination-item-active' : ''}`}
                      >
                        {page}
                      </li>
                    ))}
                    <span className="arco-pagination-item arco-pagination-item-next" data-v-93ecf1eb="">
                      <svg
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="currentColor"
                        className="arco-icon arco-icon-send"
                        strokeWidth={4}
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                        data-v-93ecf1eb=""
                      >
                        <path
                          d="m14 24-7-5V7l34 17L7 41V29l7-5Zm0 0h25"
                          strokeMiterlimit="3.864"
                        />
                      </svg>
                    </span>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
