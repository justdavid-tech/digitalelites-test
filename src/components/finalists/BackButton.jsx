'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export default function BackButton({ fallbackHref = '/finalists', label = 'Back' }) {
  const router = useRouter()

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
    } else {
      router.push(fallbackHref)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleBack}
        className="finalist-back-btn"
        aria-label="Go back to previous page"
      >
        <ArrowLeft size={16} className="back-arrow-icon" />
        <span>{label}</span>
      </button>

      <style jsx>{`
        .finalist-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: var(--color-white);
          font-family: var(--font-body);
          font-size: 0.85rem;
          font-weight: 600;
          padding: 8px 18px;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          outline: none;
        }

        .finalist-back-btn :global(.back-arrow-icon) {
          transition: transform 0.25s ease;
        }

        .finalist-back-btn:hover {
          background-color: rgba(201, 160, 43, 0.18);
          border-color: var(--color-gold);
          color: var(--color-gold);
          transform: translateX(-3px);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
        }

        .finalist-back-btn:hover :global(.back-arrow-icon) {
          transform: translateX(-3px);
        }

        .finalist-back-btn:active {
          transform: scale(0.96) translateX(-3px);
        }
      `}</style>
    </>
  )
}
