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

export default function CountdownPreview({ graduationDate }) {
  const timeLeft = useCountdown(graduationDate)

  const units = [
    { label: 'Days', value: timeLeft?.days },
    { label: 'Hours', value: timeLeft?.hours },
    { label: 'Minutes', value: timeLeft?.minutes },
    { label: 'Seconds', value: timeLeft?.seconds },
  ]

  return (
    <section style={{
      backgroundColor: 'var(--color-light)',
      padding: '5rem 2rem',
      borderTop: '1px solid var(--color-gray-light)',
      borderBottom: '1px solid var(--color-gray-light)',
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
          backgroundColor: 'rgba(13, 43, 107, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
        }}>
          <Clock size={24} color="var(--color-deep-blue)" />
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
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          fontWeight: '700',
          color: 'var(--color-deep-blue)',
          marginBottom: '3rem',
          lineHeight: '1.2',
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
                backgroundColor: 'var(--color-deep-blue)',
                borderRadius: '8px',
                padding: '1.5rem 2rem',
                minWidth: '100px',
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
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  fontWeight: '700',
                  color: 'var(--color-white)',
                  lineHeight: '1',
                  marginBottom: '0.5rem',
                }}>
                  {String(unit.value).padStart(2, '0')}
                </span>

                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: 'var(--color-gold)',
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
            color: 'var(--color-gray)',
            fontFamily: 'var(--font-body)',
          }}>
            Loading countdown...
          </div>
        )}

        <Link href="/countdown" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'var(--color-deep-blue)',
          color: 'var(--color-white)',
          fontFamily: 'var(--font-body)',
          fontSize: '0.9rem',
          fontWeight: '600',
          padding: '12px 28px',
          borderRadius: '4px',
          textDecoration: 'none',
        }}>
          View Full Countdown
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  )
}
