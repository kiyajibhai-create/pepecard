'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { AUTH_COOKIE_NAME } from '@/lib/auth'

interface LayoutProps {
  children: React.ReactNode
  activePage?: string
}

export default function Layout({ children, activePage = 'news' }: LayoutProps) {
  const router = useRouter()
  const [pacificTime, setPacificTime] = useState<string>('')

  const handleLogout = () => {
    const secureFlag = window.location.protocol === 'https:' ? '; Secure' : ''
    document.cookie = `${AUTH_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax${secureFlag}`
    router.replace('/login')
  }

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeString = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Los_Angeles',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }).format(now)
      setPacificTime(timeString)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="arco-layout flex min-h-screen flex-col">
      <header className="arco-layout-header">
        <div className="fixed w-full top-0 left-0 z-999">
          <div
            data-v-a72c8eee=""
            className="tip-wrap w-full leading-5 p-2 text-center text-white box-border"
          >
            Your account is inactive. For activation you need{' '}
            <a data-v-a72c8eee="" href="/billing" className="billing">
              to top up your balance
            </a>{' '}
            Attention: Not activated accounts for more than 5 days will be deleted automatically.
          </div>
          <div data-v-44d7f9b4="" className="header">
            <div data-v-44d7f9b4="" className="layout-container">
              <div data-v-44d7f9b4="" className="flex items-center h-full gap-1">
                <button
                  aria-label="Open menu"
                  data-v-44d7f9b4=""
                  className="arco-btn arco-btn-secondary arco-btn-shape-square arco-btn-size-medium arco-btn-status-normal arco-btn-only-icon block !sm:hidden"
                  type="button"
                >
                  <span className="arco-btn-icon">
                    <svg
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="currentColor"
                      className="arco-icon arco-icon-menu-fold"
                      strokeWidth="4"
                      strokeLinecap="butt"
                      strokeLinejoin="miter"
                    >
                      <path d="M42 11H6M42 24H22M42 37H6M13.66 26.912l-4.82-3.118 4.82-3.118v6.236Z"></path>
                    </svg>
                  </span>
                </button>
                <div data-v-90444fb2="" data-v-44d7f9b4="" className="flex items-center h-full">
                  <div data-v-90444fb2="" className="min-w-40 mr-2 xl:mr-10 hidden lg:block">
                    Pacific Time: {pacificTime}
                  </div>
                  <div data-v-90444fb2="" className="user-info-container">
                    <span data-v-90444fb2="" className="welcome-text hidden lg:block">
                      welcome:
                    </span>
                    <span data-v-90444fb2="" className="username-text hidden sm:inline-block">
                      tony6666
                    </span>
                  </div>
                  <div data-v-90444fb2="" className="xl:ml-20 ml-2 flex items-center">
                    <svg
                      data-v-90444fb2=""
                      viewBox="0 0 1024 1024"
                      fill="currentColor"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="200"
                      height="200"
                      className="sm:w-5 sm:h-5 w-4 h-4 hidden sm:inline-block"
                    >
                      <path d="M976.896 883.712q0 19.456-6.656 36.352t-18.944 29.696-28.672 19.968-35.84 7.168l-743.424 0q-19.456 0-36.864-7.168t-30.72-19.968-20.992-29.696-7.68-36.352l0-510.976q0-38.912 27.136-66.048t66.048-27.136l743.424 0q38.912 0 66.048 27.136t27.136 66.048l0 139.264-232.448 0q-38.912 0-66.048 26.624t-27.136 65.536q1.024 26.624 11.264 47.104 8.192 17.408 27.136 31.744t54.784 14.336l232.448 0 0 186.368zM837.632 232.448l-464.896 0q55.296-28.672 104.448-55.296 43.008-22.528 84.992-45.056t65.536-34.816q35.84-19.456 64-17.92t47.616 9.728q22.528 11.264 38.912 29.696zM698.368 604.16q0-19.456 13.312-32.768t32.768-13.312 32.768 13.312 13.312 32.768-13.312 33.28-32.768 13.824-32.768-13.824-13.312-33.28z"></path>
                    </svg>
                    <span data-v-90444fb2="" className="sm:ml-2 mt-0.5">
                      $ 0.00
                    </span>
                    <span data-v-90444fb2="" className="text-3 ml-1 mt-0.5">
                      (Total Recharge: $0.00)
                    </span>
                  </div>
                  <button
                    aria-label="Add funds"
                    data-v-90444fb2=""
                    className="arco-btn arco-btn-primary arco-btn-shape-square arco-btn-size-mini arco-btn-status-normal ml-2 sm:ml-5 !hidden !sm:block"
                    type="button"
                  >
                    add funds
                  </button>
                </div>
                <div
                  data-v-45d76ef0=""
                  data-v-44d7f9b4=""
                  className="ml-2 sm:ml-10 flex items-center hover:bg-gray-2 cursor-pointer h-full px-2 sm:px-4"
                >
                  <div data-v-45d76ef0="" className="sm:w-6 sm:h-6 w-5 h-5 relative">
                    <svg
                      data-v-45d76ef0=""
                      className="icon w-full h-full"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="200"
                      height="200"
                      fill="currentColor"
                    >
                      <path d="M914.563542 207.269647c-15.143908-17.145495-36.001959-26.574239-58.688657-26.574239L247.978814 180.695409l-2.332115-13.46057c-5.294586-43.370787-43.400462-77.285201-86.785575-77.285201l-38.540781 0c-15.869433 0-28.77844 12.910031-28.77844 28.77844s12.910031 28.77844 28.77844 28.77844l38.540781 0c14.302751 0 27.965935 12.851703 29.851888 28.053939l29.184693 168.726819 51.305503 361.272114c5.250584 43.313481 42.921555 77.226872 85.784782 77.226872l491.37117 0c15.869433 0 28.77844-12.910031 28.77844-28.77844 0-15.839757-12.910031-28.749788-28.77844-28.749788l-491.37117 0c-13.794168 0-26.936489-12.44545-28.705785-27.183106l-4.253884-29.958312 481.047034-36.592406c42.935881 0 80.534198-33.217543 85.697801-75.601862l47.694255-272.730545C939.919023 254.586302 931.941328 226.88131 914.563542 207.269647z"></path>
                      <path d="M362.821399 816.004829c-32.536021 0-59.022255 26.487258-59.022255 59.037605 0 32.521694 26.487258 59.007929 59.022255 59.007929 32.536021 0 59.022255-26.487258 59.022255-59.007929C421.843654 842.491063 395.356396 816.004829 362.821399 816.004829z"></path>
                      <path d="M786.364765 816.004829c-32.550347 0-59.036581 26.487258-59.036581 59.037605 0 32.521694 26.487258 59.007929 59.036581 59.007929 32.521694 0 59.007929-26.487258 59.007929-59.007929C845.372693 842.491063 818.886459 816.004829 786.364765 816.004829z"></path>
                    </svg>
                  </div>
                  <span data-v-45d76ef0="" className="ml-2.5 hidden sm:block">
                    cart
                  </span>
                </div>
              </div>
              <div data-v-44d7f9b4="" className="h-full flex items-center">
                  <div
                    data-v-44d7f9b4=""
                    className="flex items-center cursor-pointer h-full px-2 sm:px-4"
                  >
                    <button
                      aria-label="Change language"
                      className="arco-btn arco-btn-text arco-btn-shape-square arco-btn-size-medium arco-btn-status-normal arco-btn-only-icon"
                      type="button"
                    >
                      <span className="arco-btn-icon">
                        <svg
                          className="icon w-5.5 h-5.5"
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          width="400"
                          height="400"
                          fill="currentColor"
                        >
                          <path
                            d="M512 64c247.424 0 448 200.576 448 448S759.424 960 512 960 64 759.424 64 512 264.576 64 512 64z m340.6 625.504l-152.385-0.003c-26.47 67.398-67.875 134.461-124.049 201.152v0.01c120.416-20.257 221.81-96.56 276.435-201.159z m-529.541-0.003l-151.66 0.003c54.495 104.353 155.541 180.543 275.585 201.015v-0.011c-56.11-66.643-97.475-133.658-123.925-201.007z m316.473 0h-255.79c27.86 62.945 70.428 126.25 127.891 189.957 56.896-63.07 99.186-125.746 127.06-188.07l0.84-1.888zM303.73 390.5H147.62C134.892 428.685 128 469.538 128 512c0 42.463 6.892 83.316 19.619 121.501h156.91C293.521 592.616 288 551.613 288 510.5c0-39.47 5.09-78.84 15.235-118.1l0.495-1.9z m357.646 0H361.898C349.95 430.638 344 470.635 344 510.5c0 40.859 6.25 81.855 18.802 123h297.67c12.552-41.145 18.802-82.141 18.802-123 0-39.865-5.95-79.862-17.898-120z m215.005 0H719.544c10.475 39.89 15.73 79.893 15.73 120 0 41.113-5.522 82.116-16.528 123.001H876.38C889.108 595.316 896 554.463 896 512c0-42.462-6.892-83.315-19.619-121.5zM444.047 133.996l-0.4 0.07C325.07 155.368 225.388 231.11 171.4 334.496l150.491 0.004c25.937-67.18 66.713-134.027 122.157-200.505z m67.594 7.547l-1.391 1.536c-57.673 64.2-100.218 127.993-127.826 191.422H640.85c-27.828-63.935-70.832-128.24-129.209-192.958z m67.461-7.7l1.366 1.645C635.28 201.473 675.64 267.823 701.383 334.5l151.218-0.004c-54.179-103.749-154.371-179.66-273.499-200.654z"
                            fill="#000000"
                            fillOpacity=".65"
                          ></path>
                        </svg>
                      </span>
                    </button>
                    <div className="trigger-btn"></div>
                  </div>
                  <div
                    role="button"
                    aria-label="Log out"
                    tabIndex={0}
                    data-v-44d7f9b4=""
                    className="flex items-center hover:bg-gray-2 cursor-pointer h-full px-2 sm:px-4"
                    onClick={handleLogout}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleLogout() }}
                  >
                    <svg
                      data-v-44d7f9b4=""
                      className="icon sm:w-7 sm:h-7 w-6 h-6"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="200"
                      height="200"
                      fill="currentColor"
                    >
                      <path d="M347.733333 198.4h228.266667c8.533333 0 14.933333 2.133333 19.2 8.533333s8.533333 12.8 8.533333 19.2v57.6c0 8.533333-2.133333 14.933333-8.533333 19.2s-12.8 8.533333-19.2 8.533334h-256a58.282667 58.282667 0 0 0-57.6 57.6v283.733333a58.282667 58.282667 0 0 0 57.6 57.6h256c8.533333 0 14.933333 2.133333 19.2 8.533333s8.533333 12.8 8.533333 19.2v57.6c0 8.533333-2.133333 14.933333-8.533333 19.2s-12.8 8.533333-19.2 8.533334h-228.266667c-61.866667 0-110.933333-17.066667-147.2-53.333334-34.133333-34.133333-53.333333-83.2-53.333333-147.2v-228.266666c0-61.866667 17.066667-110.933333 53.333333-147.2 36.266667-32 85.333333-49.066667 147.2-49.066667z m334.933334 132.266667l183.466666 162.133333c6.4 4.266667 8.533333 10.666667 8.533334 19.2s-2.133333 12.8-8.533334 19.2l-183.466666 162.133333c-6.4 4.266667-10.666667 6.4-14.933334 4.266667-4.266667-2.133333-6.4-6.4-6.4-14.933333v-85.333334h-142.933333c-8.533333 0-14.933333-2.133333-19.2-8.533333-6.4-6.4-8.533333-12.8-8.533333-19.2v-113.066667c0-8.533333 2.133333-14.933333 8.533333-19.2 6.4-6.4 12.8-8.533333 19.2-8.533333h142.933333v-85.333333c0-8.533333 2.133333-12.8 6.4-14.933334 2.133333-4.266667 8.533333-2.133333 14.933334 2.133334z"></path>
                    </svg>
                    <span data-v-44d7f9b4="" className="ml-2 hidden sm:block first-letter:uppercase">
                      logout
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        <div
          data-v-a72c8eee=""
          className="tip-wrap w-full leading-5 p-2 text-center text-white box-border invisible pointer-events-none pb-10 sm:pb-0"
        >
            Your account is inactive. For activation you need{' '}
            <a data-v-a72c8eee="" href="/billing" className="billing">
              to top up your balance
            </a>{' '}
            Attention: Not activated accounts for more than 5 days will be deleted automatically.
          </div>
          <div data-v-dff22bc5="" className="nav mt-12">
            <div data-v-dff22bc5="" className="layout-container h-full">
              <div data-v-dff22bc5="" className="nav-wrapper h-full flex items-center">
                <Link
                  href="/news"
                  data-v-dff22bc5=""
                  className={`nav-item gap-2 ${activePage === 'news' ? 'active' : ''}`}
                >
                  news
                </Link>
                <div data-v-dff22bc5="" className={`nav-item gap-2 ${activePage === 'cvv2' ? 'active' : ''}`}>
                  cvv2
                </div>
                <div data-v-dff22bc5="" className={`nav-item gap-2 ${activePage === 'wholesale' ? 'active' : ''}`}>
                  wholesale
                </div>
                <div data-v-dff22bc5="" className={`nav-item gap-2 ${activePage === 'orders' ? 'active' : ''}`}>
                  orders
                </div>
                <div data-v-dff22bc5="" className={`nav-item gap-2 ${activePage === 'commission' ? 'active' : ''}`}>
                  Commission
                </div>
                <div data-v-dff22bc5="" className={`nav-item gap-2 ${activePage === 'tickets' ? 'active' : ''}`}>
                  tickets
                </div>
                <div data-v-dff22bc5="" className="nav-item gap-2">
                  <svg
                    data-v-dff22bc5=""
                    className="icon w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="200"
                    height="200"
                  >
                    <path d="M885.196958 871.528145c-14.753141-5.464126-25.134981-8.742602-34.970408-12.56749-30.052695-11.474665-59.012564-24.588568-89.611671-34.970408-8.742602-2.732063-21.310093-1.639238-29.506282 2.732063-21.310093 10.38184-42.073773 22.402918-61.744627 36.063234-6.556952 4.371301-12.021078 14.206728-13.660316 22.402918-6.556952 36.063234-11.474665 72.67288-15.845966 109.282526-2.732063 20.76368-12.56749 30.052695-33.877583 29.506282-62.837452-0.546413-125.674905-0.546413-188.512357 0-20.76368 0-31.691933-8.196189-34.423996-28.959869-4.917714-36.609646-10.928253-72.67288-15.299554-109.282526-1.639238-12.56749-6.010539-20.217267-18.031617-26.227806-20.217267-9.835427-38.248884-23.495743-58.466151-33.33117-7.103364-3.824888-18.031617-5.464126-25.681394-2.732063-35.516821 12.56749-69.940817 26.774219-104.911225 40.434535-25.134981 9.835427-32.238345 7.649777-46.445074-16.392379-31.14552-53.002025-61.744627-106.00405-92.343735-159.006075-14.206728-24.588568-13.660316-30.599107 8.742602-48.084311 29.506282-23.495743 59.558977-45.898661 88.518846-69.940817 5.464126-4.371301 9.289015-14.206728 9.289015-21.310093 1.092825-20.217267-3.278476-41.52736 0-61.198215 3.824888-21.310093-4.917714-32.238345-20.217267-43.71301-27.320632-19.670855-52.455613-41.52736-79.229831-61.198215-15.845966-12.021078-19.670855-24.588568-9.289015-42.073773 33.33117-56.280501 66.115928-113.107414 98.900686-169.934328 9.289015-15.845966 21.310093-19.124442 38.248884-12.56749 36.063234 14.206728 72.126467 28.959869 108.736113 42.073773 7.649777 2.732063 19.670855 1.092825 27.320632-2.732063 20.76368-10.38184 39.341709-24.042156 60.105389-34.423996 10.928253-5.464126 14.753141-12.021078 15.845966-22.94933 4.917714-37.156059 10.928253-74.312118 15.845966-111.468177C386.322226 7.649777 397.796892 0 418.014159 0c62.837452 0.546413 125.674905 0.546413 188.512357 0 19.670855 0 30.599107 8.196189 32.784758 27.867044 4.917714 36.609646 10.928253 72.67288 15.299554 109.282526 1.639238 13.660316 6.556952 21.856505 19.670855 27.867044 19.124442 8.742602 37.156059 19.670855 54.641263 31.691933 11.474665 8.196189 21.310093 8.196189 33.877583 2.732063 33.877583-14.206728 68.301579-26.774219 102.725575-40.980947 19.124442-7.649777 32.238345-3.824888 42.620185 14.753141 31.14552 55.187676 63.930278 109.828939 95.62221 164.470202 12.56749 21.856505 10.928253 28.959869-9.289015 44.805836-28.959869 22.402918-57.919739 45.352248-87.426021 67.755166-9.835427 7.649777-12.56749 14.753141-11.474665 27.320632 2.185651 22.94933-0.546413 46.445074 0.546413 69.394404 0.546413 8.196189 4.371301 18.031617 10.38184 22.94933 28.959869 24.042156 59.012564 46.445074 88.518846 69.394404 20.217267 15.845966 21.310093 22.94933 8.742602 44.805836-32.238345 55.734088-64.47669 110.921764-97.261448 166.10944C901.042924 860.05348 891.753909 865.517606 885.196958 871.528145zM510.357893 692.304803c98.900686 0.546413 180.862581-79.776244 181.408993-177.584105 0.546413-100.539924-79.229831-181.955406-178.67693-182.501819-99.447099-0.546413-181.408993 80.322657-181.408993 179.769755C331.134551 610.342908 412.00362 691.75839 510.357893 692.304803z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
      </header>
      <main className="arco-layout-content flex-1">{children}</main>
      <footer className="arco-layout-footer">
        <div className="footer" data-v-0f1fb580="">
          Copyright PePeCard Market &copy; 2024 All rights reserved
        </div>
      </footer>
    </section>
  )
}
