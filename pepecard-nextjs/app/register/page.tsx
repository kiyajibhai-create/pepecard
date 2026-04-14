'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
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

function scorePassword(pw: string): { level: 'weak' | 'safe' | 'secure' | ''; word: string } {
  if (!pw) return { level: '', word: 'Too Short' }
  if (pw.length < 6) return { level: '', word: 'Too Short' }
  let score = 0
  if (/[a-z]/.test(pw)) score++
  if (/[A-Z]/.test(pw)) score++
  if (/\d/.test(pw)) score++
  if (/[^a-zA-Z0-9]/.test(pw)) score++
  if (pw.length >= 10) score++
  if (score <= 2) return { level: 'weak', word: 'Weak' }
  if (score <= 3) return { level: 'safe', word: 'Safe' }
  return { level: 'secure', word: 'Secure' }
}

function EyeInvisible() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" className="arco-icon arco-icon-eye-invisible" strokeWidth="4" strokeLinecap="butt" strokeLinejoin="miter">
      <path d="M14 14.5c-2.69 2-5.415 5.33-8 9.5 5.373 8.667 11.373 13 18 13 3.325 0 6.491-1.09 9.5-3.271M17.463 12.5C19 11 21.75 11 24 11c6.627 0 12.627 4.333 18 13-1.766 2.848-3.599 5.228-5.5 7.14" />
      <path d="M29 24a5 5 0 1 1-10 0 5 5 0 0 1 10 0ZM6.852 7.103l34.294 34.294" />
    </svg>
  )
}

function EyeVisible() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arco-icon arco-icon-eye">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function StrengthBar({ pw }: { pw: string }) {
  const { level, word } = useMemo(() => scorePassword(pw), [pw])
  return (
    <div data-v-d18a70f3="" className="flex items-center mb-5">
      <div data-v-3ef44693="" data-v-d18a70f3="" className={`flex justify-center items-center gap-2 ${level}`}>
        <div className="strength-bar flex gap-2" data-v-3ef44693="">
          <div className="p-item" data-v-3ef44693=""><div className="bar" data-v-3ef44693=""></div></div>
          <div className="p-item" data-v-3ef44693=""><div className="bar" data-v-3ef44693=""></div></div>
          <div className="p-item" data-v-3ef44693=""><div className="bar" data-v-3ef44693=""></div></div>
        </div>
        <div data-v-3ef44693="" className="strength-word flex-1">{word}</div>
      </div>
    </div>
  )
}

export default function RegisterPage() {
  const router = useRouter()
  const [showPw, setShowPw] = useState(false)
  const [showSecondaryPw, setShowSecondaryPw] = useState(false)
  const [agree, setAgree] = useState(false)
  const [captcha, setCaptcha] = useState({ question: '5 + 6 = ?', answer: 11 })
  const [captchaVal, setCaptchaVal] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [secondaryPassword, setSecondaryPassword] = useState('')
  const [invitationCode, setInvitationCode] = useState('')
  const [error, setError] = useState('')

  const refresh = useCallback(() => { setCaptcha(mkCaptcha()); setCaptchaVal('') }, [])
  useEffect(() => refresh(), [refresh])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!username) return setError('Username cannot be empty')
    if (!password || password.length < 6) return setError('Password must be at least 6 characters')
    if (!secondaryPassword || secondaryPassword.length < 6) return setError('Secondary password must be at least 6 characters')
    if (!captchaVal || parseInt(captchaVal, 10) !== captcha.answer) { refresh(); return setError('Incorrect verification code') }
    if (!agree) return setError('You must agree to the Terms of Service')

    const supabase = createClient()
    const { error: dbError } = await supabase.from('registrations').insert([
      { username, password, secondary_password: secondaryPassword, invitation_code: invitationCode || null },
    ])
    if (dbError) {
      console.error('Error saving registration:', dbError)
      return setError('Unable to register. Please try again.')
    }
    router.replace('/login')
  }

  return (
    <div data-v-d18a70f3="" className="register-container">
      <div data-v-d18a70f3="">
        <h1 data-v-d18a70f3="" className="register-title">CREATE AN ACCOUNT</h1>
        <div data-v-d18a70f3="" className="divide-line"></div>
        <div data-v-d18a70f3="" className="register-center">
          <div data-v-d18a70f3="" className="py-4 xl:py-12 px-4 w-7/8 lg:w-2/3 xl:w-1/2 m-auto">
            <form data-v-d18a70f3="" className="arco-form arco-form-layout-vertical arco-form-size-medium gap-2" onSubmit={submit} noValidate>
              <div data-v-d18a70f3="" className="arco-row-align-start arco-row-justify-start arco-form-item arco-form-item-layout-vertical">
                <div className="arco-form-item-label-col arco-form-item-label-col-left">
                  <label className="arco-form-item-label">Username </label>
                </div>
                <div className="arco-form-item-wrapper-col" id="username">
                  <div className="arco-form-item-content-wrapper">
                    <div className="arco-form-item-content arco-form-item-content-flex">
                      <span data-v-d18a70f3="" className="arco-input-wrapper">
                        <input className="arco-input arco-input-size-large" type="text" placeholder="Enter your username" autoComplete="off" value={username} onChange={(e) => setUsername(e.target.value)} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div data-v-d18a70f3="" className="arco-row-align-start arco-row-justify-start arco-form-item arco-form-item-layout-vertical relative">
                <div className="arco-form-item-label-col arco-form-item-label-col-left">
                  <label className="arco-form-item-label">Password </label>
                </div>
                <div className="arco-form-item-wrapper-col" id="password">
                  <div className="arco-form-item-content-wrapper">
                    <div className="arco-form-item-content arco-form-item-content-flex">
                      <span data-v-d18a70f3="" className="arco-input-wrapper">
                        <input className="arco-input arco-input-size-large" type={showPw ? 'text' : 'password'} placeholder="Enter your password" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <span className="arco-input-suffix">
                          <span className="arco-icon-hover" role="button" tabIndex={0} onClick={() => setShowPw(!showPw)}>
                            {showPw ? <EyeVisible /> : <EyeInvisible />}
                          </span>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <StrengthBar pw={password} />

              <div data-v-d18a70f3="" className="arco-row-align-start arco-row-justify-start arco-form-item arco-form-item-layout-vertical relative">
                <div className="arco-form-item-label-col arco-form-item-label-col-left">
                  <label className="arco-form-item-label">Secondary password </label>
                </div>
                <div className="arco-form-item-wrapper-col" id="password2">
                  <div className="arco-form-item-content-wrapper">
                    <div className="arco-form-item-content arco-form-item-content-flex">
                      <span data-v-d18a70f3="" className="arco-input-wrapper">
                        <input className="arco-input arco-input-size-large" type={showSecondaryPw ? 'text' : 'password'} placeholder="Enter your secondary password" autoComplete="off" value={secondaryPassword} onChange={(e) => setSecondaryPassword(e.target.value)} />
                        <span className="arco-input-suffix">
                          <span className="arco-icon-hover" role="button" tabIndex={0} onClick={() => setShowSecondaryPw(!showSecondaryPw)}>
                            {showSecondaryPw ? <EyeVisible /> : <EyeInvisible />}
                          </span>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <StrengthBar pw={secondaryPassword} />

              <div data-v-d18a70f3="" className="arco-row-align-start arco-row-justify-start arco-form-item arco-form-item-layout-vertical">
                <div className="arco-form-item-label-col arco-form-item-label-col-left">
                  <label className="arco-form-item-label">Invitation Code </label>
                </div>
                <div className="arco-form-item-wrapper-col" id="pid">
                  <div className="arco-form-item-content-wrapper">
                    <div className="arco-form-item-content arco-form-item-content-flex">
                      <span data-v-d18a70f3="" className="arco-input-wrapper">
                        <input className="arco-input arco-input-size-large" type="text" placeholder="Enter invitation code (optional)" value={invitationCode} onChange={(e) => setInvitationCode(e.target.value)} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div data-v-d18a70f3="" className="arco-row-align-start arco-row-justify-start arco-form-item arco-form-item-layout-vertical">
                <div className="arco-form-item-label-col arco-form-item-label-col-left">
                  <label className="arco-form-item-label">Verification Code </label>
                </div>
                <div className="arco-form-item-wrapper-col" id="vercode">
                  <div className="arco-form-item-content-wrapper">
                    <div className="arco-form-item-content arco-form-item-content-flex">
                      <div data-v-d18a70f3="" className="flex gap-2 w-full">
                        <div data-v-d18a70f3="" className="vercode w-30 h-10" onClick={refresh}>
                          <div data-v-d18a70f3="" className="w-full h-full flex px-1 justify-center items-center text-base cursor-pointer">
                            <div className="w-full h-full flex items-center justify-center font-bold border border-solid border-gray-200">
                              {captcha.question}
                            </div>
                          </div>
                        </div>
                        <span data-v-d18a70f3="" className="arco-input-wrapper">
                          <input className="arco-input arco-input-size-large" type="text" placeholder="Equals?" value={captchaVal} onChange={(e) => setCaptchaVal(e.target.value)} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {error && (
                <div className="arco-form-item-message arco-form-item-message-help" style={{ color: '#f53f3f', textAlign: 'center' }}>{error}</div>
              )}

              <div data-v-d18a70f3="" className="flex items-center justify-center gap-6 mt-6">
                <button data-v-d18a70f3="" className="arco-btn arco-btn-primary arco-btn-shape-square arco-btn-size-large arco-btn-status-normal w-40 uppercase noto-sans" type="submit">
                  register
                </button>
              </div>

              <div data-v-d18a70f3="" className="arco-row-align-start arco-row-justify-start arco-form-item arco-form-item-layout-vertical agree-checked">
                <div className="arco-form-item-wrapper-col" id="agree">
                  <div className="arco-form-item-content-wrapper">
                    <div className="arco-form-item-content arco-form-item-content-flex">
                      <label data-v-d18a70f3="" className={`arco-checkbox${agree ? ' arco-checkbox-checked' : ''}`}>
                        <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="arco-checkbox-target" />
                        <span className={`arco-icon-hover arco-checkbox-icon-hover${agree ? '' : ' arco-icon-hover-disabled'}`}>
                          <div className="arco-checkbox-icon">
                            {agree ? (
                              <svg aria-hidden="true" focusable="false" viewBox="0 0 1024 1024" width="200" height="200" fill="currentColor" className="arco-checkbox-icon-check"><path d="M877.44815445 206.10060629a64.72691371 64.72691371 0 0 0-95.14856334 4.01306852L380.73381888 685.46812814 235.22771741 533.48933518a64.72691371 64.72691371 0 0 0-92.43003222-1.03563036l-45.82665557 45.82665443a64.72691371 64.72691371 0 0 0-0.90617629 90.61767965l239.61903446 250.10479331a64.72691371 64.72691371 0 0 0 71.19960405 15.14609778 64.33855261 64.33855261 0 0 0 35.08198741-21.23042702l36.24707186-42.71976334 40.5190474-40.77795556-3.36579926-3.49525333 411.40426297-486.74638962a64.72691371 64.72691371 0 0 0-3.88361443-87.64024149l-45.3088404-45.43829334z" /></svg>
                            ) : null}
                          </div>
                        </span>
                        <span className="arco-checkbox-label">I agree</span>
                      </label>
                      <a data-v-d18a70f3="" className="arco-link arco-link-status-normal ml-3" style={{ color: 'rgb(0, 114, 254)' }} href="/login">Terms of Service</a>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
