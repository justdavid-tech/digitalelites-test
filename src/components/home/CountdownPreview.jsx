'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(null)

  useEffect(() => {
    if (!targetDate) return

    const calculate = () => {
      const now = new Date().getTime()
      const target = new Date(targetDate).getTime()
      const diff = target - now

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      })
    }

    calculate()
    const interval = setInterval(calculate, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  return timeLeft
}

const DEFAULT_GRADUATION_DATE = '2026-10-14T09:00:00.000Z'

export default function CountdownPreview({ graduationDate }) {
  const timeLeft = useCountdown(graduationDate || DEFAULT_GRADUATION_DATE)

  const units = [
    { label: 'Days', value: timeLeft?.days },
    { label: 'Hours', value: timeLeft?.hours },
    { label: 'Minutes', value: timeLeft?.minutes },
    { label: 'Seconds', value: timeLeft?.seconds },
  ]

  return (
    <>
      <style>{`
        .countdown-cta-btn {
          transition: all 0.25s ease;
        }
        .countdown-cta-btn:hover {
          background-color: #e8c96a !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(201, 160, 43, 0.35);
        }
        .countdown-cta-btn:hover .btn-arrow-icon {
          transform: translateX(4px);
        }
      `}</style>

      <section style={{
        backgroundColor: 'var(--color-deep-blue-dark)',
        padding: '5rem 2rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          textAlign: 'center',
        }}>

          {/* Icon */}
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: 'rgba(201, 160, 43, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            border: '1px solid rgba(201, 160, 43, 0.25)',
          }}>
            <Clock size={24} color="var(--color-gold)" />
          </div>

          {/* Label */}
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.78rem',
            fontWeight: '600',
            color: 'var(--color-gold)',
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}>
            Counting Down
          </p>

          {/* Heading */}
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: '400',
            color: 'var(--color-white)',
            marginBottom: '3rem',
            lineHeight: '1.1',
            letterSpacing: '0.02em',
          }}>
            Graduation Countdown
          </h2>

          {/* Timer */}
          {timeLeft ? (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1.5rem',
              flexWrap: 'wrap',
              marginBottom: '3rem',
            }}>
              {units.map((unit) => (
                <div key={unit.label} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(201, 160, 43, 0.25)',
                  borderRadius: '10px',
                  padding: '1.5rem 2rem',
                  minWidth: '110px',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {/* Gold top accent */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    backgroundColor: 'var(--color-gold)',
                  }} />

                  <span style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(2.4rem, 5vw, 3.4rem)',
                    fontWeight: '400',
                    color: 'var(--color-gold)',
                    lineHeight: '1',
                    marginBottom: '0.5rem',
                    letterSpacing: '0.02em',
                  }}>
                    {String(unit.value).padStart(2, '0')}
                  </span>

                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: 'rgba(255, 255, 255, 0.75)',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                  }}>
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              marginBottom: '3rem',
              color: 'rgba(255, 255, 255, 0.5)',
              fontFamily: 'var(--font-body)',
            }}>
              Loading countdown...
            </div>
          )}

          <Link href="/countdown" className="countdown-cta-btn" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'var(--color-gold)',
            color: 'var(--color-deep-blue-dark)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            fontWeight: '700',
            padding: '13px 28px',
            borderRadius: '4px',
            textDecoration: 'none',
          }}>
            <span>View Full Countdown</span>
            <ArrowRight size={16} className="btn-arrow-icon" style={{ transition: 'transform 0.2s ease' }} />
          </Link>
        </div>
      </section>
    </>
  )
}
