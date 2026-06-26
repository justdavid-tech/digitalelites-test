import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { Award, ArrowRight, Quote } from 'lucide-react'

async function getFinalistOfTheDay() {
  return await client.fetch(`
    *[_type == "finalistOfTheDay" && isActive == true][0] {
      dateFeautured,
      finalist-> {
        fullName,
        nickname,
        personalQuote,
        photo,
        stateOfOrigin,
      }
    }
  `)
}

export default async function FinalistOfTheDayPreview() {
  const data = await getFinalistOfTheDay()

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .fod-section {
            padding: 3rem 1rem !important;
          }
          .fod-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1.5rem !important;
          }
          .fod-card {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            padding: 2rem 1.25rem !important;
            text-align: center !important;
          }
          .fod-photo-container {
            margin: 0 auto !important;
          }
          .fod-quote-box {
            text-align: left !important;
          }
          .fod-cta-btn {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>

      <section className="fod-section" style={{
        backgroundColor: 'var(--color-deep-blue)',
        padding: '5rem 2rem',
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
        }}>

          {/* Header */}
          <div className="fod-header" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '3rem',
          }}>
            <div>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.78rem',
                fontWeight: '600',
                color: 'var(--color-gold)',
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
              }}>
                Featured Today
              </p>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                fontWeight: '700',
                color: 'var(--color-white)',
                lineHeight: '1.2',
              }}>
                Finalist of the Day
              </h2>
            </div>

            <Link href="/finalist-of-the-day" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-body)',
              fontSize: '0.88rem',
              fontWeight: '600',
              color: 'var(--color-gold)',
              textDecoration: 'none',
              letterSpacing: '0.3px',
            }}>
              View Full Page
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Card */}
          {data?.finalist ? (
            <div className="fod-card" style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: '3rem',
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(201, 160, 43, 0.2)',
              borderRadius: '12px',
              padding: '3rem',
            }}>

              {/* Photo */}
              <div className="fod-photo-container" style={{
                position: 'relative',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid var(--color-gold)',
                flexShrink: 0,
              }}>
                {data.finalist.photo ? (
                  <Image
                    src={urlFor(data.finalist.photo).width(400).height(400).url()}
                    alt={data.finalist.fullName}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Award size={48} color="var(--color-gold)" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(201, 160, 43, 0.12)',
                  border: '1px solid rgba(201, 160, 43, 0.3)',
                  borderRadius: '20px',
                  padding: '4px 14px',
                  marginBottom: '1rem',
                }}>
                  <Award size={12} color="var(--color-gold)" />
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: 'var(--color-gold)',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  }}>
                    Today's Elite
                  </span>
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                  fontWeight: '700',
                  color: 'var(--color-white)',
                  marginBottom: '0.25rem',
                }}>
                  {data.finalist.fullName}
                </h3>

                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  color: 'var(--color-gold)',
                  marginBottom: '0.5rem',
                  fontStyle: 'italic',
                }}>
                  "{data.finalist.nickname}"
                </p>

                {data.finalist.stateOfOrigin && (
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    color: 'rgba(255,255,255,0.55)',
                    marginBottom: '1.5rem',
                  }}>
                    {data.finalist.stateOfOrigin}
                  </p>
                )}

                {data.finalist.personalQuote && (
                  <div className="fod-quote-box" style={{
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'flex-start',
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    borderLeft: '3px solid var(--color-gold)',
                    padding: '1rem 1.25rem',
                    borderRadius: '0 6px 6px 0',
                    marginBottom: '2rem',
                  }}>
                    <Quote size={18} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <p style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1rem',
                      color: 'rgba(255,255,255,0.85)',
                      fontStyle: 'italic',
                      lineHeight: '1.6',
                    }}>
                      {data.finalist.personalQuote}
                    </p>
                  </div>
                )}

                <Link href="/finalist-of-the-day" className="fod-cta-btn" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'var(--color-gold)',
                  color: 'var(--color-deep-blue)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  padding: '12px 28px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                }}>
                  View Full Profile
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ) : (
            // Empty state
            <div style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              backgroundColor: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
            }}>
              <Award size={48} color="var(--color-gold)" style={{ marginBottom: '1rem' }} />
              <p style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.3rem',
                color: 'var(--color-white)',
                marginBottom: '0.5rem',
              }}>
                No finalist selected for today
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.5)',
              }}>
                Check back soon, a new elite will be featured shortly.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}