'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { GraduationCap } from 'lucide-react'

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

// Shuffle helper
function shuffleArray(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export default function CountdownClient({ graduationDate, graduationMessage, finalistPhotos }) {
  const timeLeft = useCountdown(graduationDate)
  const [shuffled, setShuffled] = useState([])

  useEffect(() => {
    if (finalistPhotos?.length) {
      setShuffled(shuffleArray(finalistPhotos))
    }
  }, [finalistPhotos])

  const units = [
    { label: 'Days', value: timeLeft?.days },
    { label: 'Hours', value: timeLeft?.hours },
    { label: 'Minutes', value: timeLeft?.minutes },
    { label: 'Seconds', value: timeLeft?.seconds },
  ]

  return (
    <>
      {/* Main Countdown Section */}
      <section style={{
        backgroundColor: 'var(--color-deep-blue)',
        padding: '5rem 2rem',
        textAlign: 'center',
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: 'rgba(201, 160, 43, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
        }}>
          <GraduationCap size={26} color="var(--color-gold)" />
        </div>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.78rem',
          fontWeight: '600',
          color: 'var(--color-gold)',
          letterSpacing: '2.5px',
          textTransform: 'uppercase',
          marginBottom: '0.75rem',
        }}>
          The Big Day Is Coming
        </p>

        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          fontWeight: '700',
          color: 'var(--color-white)',
          marginBottom: '3rem',
        }}>
          Graduation Countdown
        </h1>

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
                backgroundColor: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(201, 160, 43, 0.25)',
                borderRadius: '10px',
                padding: '1.75rem 2.25rem',
                minWidth: '110px',
                position: 'relative',
              }}>
                <span style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2.2rem, 6vw, 3.5rem)',
                  fontWeight: '700',
                  color: 'var(--color-gold)',
                  lineHeight: '1',
                  marginBottom: '0.6rem',
                }}>
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.78rem',
                  fontWeight: '600',
                  color: 'rgba(255,255,255,0.7)',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                }}>
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p style={{
            fontFamily: 'var(--font-body)',
            color: 'rgba(255,255,255,0.5)',
            marginBottom: '3rem',
          }}>
            {graduationDate ? 'Loading countdown...' : 'Graduation date not set yet.'}
          </p>
        )}

        {/* Graduation message */}
        {graduationMessage && (
          <p style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.85)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6',
          }}>
            "{graduationMessage}"
          </p>
        )}
      </section>

      {/* Memory Banner */}
      {shuffled.length > 0 && (
        <section style={{
          backgroundColor: 'var(--color-white)',
          padding: '3rem 0',
          overflow: 'hidden',
        }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.78rem',
            fontWeight: '600',
            color: 'var(--color-gold)',
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: '2rem',
          }}>
            Faces of the Class
          </p>

          <div className="scroll-track">
            <div className="scroll-content">
              {[...shuffled, ...shuffled].map((person, index) => (
                <div
                  key={`${person._id}-${index}`}
                  style={{
                    position: 'relative',
                    width: '90px',
                    height: '90px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    flexShrink: 0,
                    border: '3px solid var(--color-gold)',
                  }}
                >
                  <Image
                    src={urlFor(person.photo).width(200).height(200).url()}
                    alt={person.fullName}
                    fill
                    sizes="80px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <style jsx>{`
        .scroll-track {
          width: 100%;
          overflow: hidden;
        }
        .scroll-content {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          animation: scroll 40s linear infinite;
        }
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </>
  )
}