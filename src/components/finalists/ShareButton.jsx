'use client'

import { useState } from 'react'
import { Share2, Check } from 'lucide-react'

export default function ShareButton() {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy link: ', err)
    }
  }

  return (
    <>
      <button
        onClick={handleShare}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: copied ? '#10B981' : 'rgba(201, 160, 43, 0.12)',
          border: copied ? '1px solid #10B981' : '1px solid rgba(201, 160, 43, 0.4)',
          borderRadius: '30px',
          padding: '8px 20px',
          color: '#fff',
          fontFamily: 'var(--font-body, Inter, sans-serif)',
          fontSize: '0.9rem',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          marginTop: '1.5rem',
        }}
        onMouseEnter={(e) => {
          if (!copied) {
            e.currentTarget.style.backgroundColor = 'rgba(201, 160, 43, 0.25)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }
        }}
        onMouseLeave={(e) => {
          if (!copied) {
            e.currentTarget.style.backgroundColor = 'rgba(201, 160, 43, 0.12)'
            e.currentTarget.style.transform = 'none'
          }
        }}
      >
        {copied ? (
          <>
            <Check size={16} color="#fff" />
            <span>Link Copied!</span>
          </>
        ) : (
          <>
            <Share2 size={16} color="var(--color-gold)" />
            <span>Share Profile</span>
          </>
        )}
      </button>
    </>
  )
}
