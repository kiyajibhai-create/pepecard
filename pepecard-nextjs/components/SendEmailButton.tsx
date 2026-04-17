'use client'

import { useState } from 'react'

export default function SendEmailButton() {
  const [name, setName] = useState('Pepecard User')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const sendEmail = async () => {
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      })

      const data = await response.json()

      if (!response.ok) {
        setMessage(data.error || 'Failed to send email.')
        return
      }

      setMessage(data.message || 'Email sent successfully.')
    } catch (error) {
      setMessage('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'grid', gap: '8px', maxWidth: '280px' }}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        style={{ padding: '8px' }}
      />
      <button onClick={sendEmail} disabled={loading} style={{ padding: '8px' }}>
        {loading ? 'Sending...' : 'Send Test Email'}
      </button>
      {message ? <p>{message}</p> : null}
    </div>
  )
}
