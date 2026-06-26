import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { Award, Quote, MapPin, User, ArrowRight, Calendar } from 'lucide-react'

export default function FinalistOfTheDayClient({ current, previous }) {
  return (
    <>
      {/* Header */}
      <section style={{
        backgroundColor: 'var(--color-deep-blue)',
        padding: '4rem 2rem',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.78rem',
          fontWeight: '600',
          color: 'var(--color-gold)',
          letterSpacing: '2.5px',
          textTransform: 'uppercase',
          marginBottom: '0.75rem',
        }}>
          Today's Spotlight
        </p>
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: '700',
          color: 'var(--color-white)',
        }}>
          Finalist of the Day
        </h1>
      </section>

      {/* Current Finalist */}
      <section style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '4rem 2rem',
      }}>
        {current?.finalist ? (
          <div style={{
            backgroundColor: 'var(--color-white)',
            border: '1px solid var(--color-gray-light)',
            borderRadius: '16px',
            padding: '3rem',
            textAlign: 'center',
            boxShadow: '0 10px 40px rgba(13,43,107,0.08)',
          }}>
            {/* Photo */}
            <div style={{
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '5px solid var(--color-gold)',
              margin: '0 auto 1.5rem',
              position: 'relative',
              backgroundColor: 'var(--color-light)',
            }}>
              {current.finalist.photo ? (
                <Image
                  src={urlFor(current.finalist.photo).width(400).height(400).url()}
                  alt={current.finalist.fullName}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <div style={{
                  width: '100%', height: '100%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <User size={50} color="var(--color-gray-light)" />
                </div>
              )}
            </div>

            {/* Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(201, 160, 43, 0.1)',
              border: '1px solid rgba(201, 160, 43, 0.3)',
              borderRadius: '20px',
              padding: '5px 16px',
              marginBottom: '1rem',
            }}>
              <Award size={13} color="var(--color-gold)" />
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

            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
              fontWeight: '700',
              color: 'var(--color-deep-blue)',
              marginBottom: '0.25rem',
            }}>
              {current.finalist.fullName}
            </h2>

            {current.finalist.nickname && (
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'var(--color-gold)',
                fontStyle: 'italic',
                marginBottom: '0.5rem',
              }}>
                "{current.finalist.nickname}"
              </p>
            )}

            {current.finalist.stateOfOrigin && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                marginBottom: '1.75rem',
              }}>
                <MapPin size={13} color="var(--color-gray)" />
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  color: 'var(--color-gray)',
                }}>
                  {current.finalist.stateOfOrigin}
                </span>
              </div>
            )}

            {/* Quote */}
            {current.finalist.personalQuote && (
              <div style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start',
                backgroundColor: 'var(--color-light)',
                borderLeft: '3px solid var(--color-gold)',
                padding: '1.25rem',
                borderRadius: '0 8px 8px 0',
                marginBottom: '1.25rem',
                textAlign: 'left',
              }}>
                <Quote size={18} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <p style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.05rem',
                  fontStyle: 'italic',
                  color: 'var(--color-deep-blue)',
                  lineHeight: '1.6',
                }}>
                  {current.finalist.personalQuote}
                </p>
              </div>
            )}

            {/* Short Bio */}
            {current.finalist.bestExperience && (
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.92rem',
                color: 'var(--color-gray)',
                lineHeight: '1.7',
                marginBottom: '2rem',
                textAlign: 'left',
              }}>
                {current.finalist.bestExperience}
              </p>
            )}

            {current.finalist.slug?.current && (
              <Link href={`/finalists/${current.finalist.slug.current}`} style={{
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
                View Full Profile
                <ArrowRight size={16} />
              </Link>
            )}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            backgroundColor: 'var(--color-light)',
            borderRadius: '16px',
            border: '1px solid var(--color-gray-light)',
          }}>
            <Award size={44} color="var(--color-gray)" style={{ marginBottom: '1rem' }} />
            <p style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.3rem',
              color: 'var(--color-deep-blue)',
              marginBottom: '0.5rem',
            }}>
              No finalist selected for today
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              color: 'var(--color-gray)',
            }}>
              Check back soon, a new elite will be featured shortly.
            </p>
          </div>
        )}
      </section>

      {/* Previous Finalists */}
      {previous.length > 0 && (
        <section style={{
          backgroundColor: 'var(--color-light)',
          padding: '4rem 2rem',
        }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: '700',
              color: 'var(--color-deep-blue)',
              textAlign: 'center',
              marginBottom: '2.5rem',
            }}>
              Previously Featured
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: '1.5rem',
            }}>
              {previous.map((entry) => (
                entry.finalist?.slug?.current && (
                  <Link
                    key={entry._id}
                    href={`/finalists/${entry.finalist.slug.current}`}
                    style={{
                      textDecoration: 'none',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      margin: '0 auto 0.75rem',
                      position: 'relative',
                      border: '3px solid var(--color-white)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      backgroundColor: 'var(--color-white)',
                    }}>
                      {entry.finalist.photo ? (
                        <Image
                          src={urlFor(entry.finalist.photo).width(200).height(200).url()}
                          alt={entry.finalist.fullName}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      ) : (
                        <div style={{
                          width: '100%', height: '100%',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <User size={28} color="var(--color-gray-light)" />
                        </div>
                      )}
                    </div>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      color: 'var(--color-deep-blue)',
                      marginBottom: '2px',
                    }}>
                      {entry.finalist.fullName}
                    </p>
                    {entry.dateFeautured && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '3px',
                      }}>
                        <Calendar size={10} color="var(--color-gray)" />
                        <span style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.72rem',
                          color: 'var(--color-gray)',
                        }}>
                          {new Date(entry.dateFeautured).toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric'
                          })}
                        </span>
                      </div>
                    )}
                  </Link>
                )
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}