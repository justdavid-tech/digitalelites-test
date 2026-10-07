import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { ArrowRight, User, Users } from 'lucide-react'

function shuffleArray(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

async function getFeaturedFinalists() {
  try {
    const all = await client.fetch(`
      *[_type == "finalist" && defined(photo)] {
        _id,
        fullName,
        nickname,
        slug,
        photo,
        stateOfOrigin,
        isFeatured
      }
    `)

    if (!all || all.length === 0) return []

    const featured = all.filter((f) => f.isFeatured === true)
    const pool = shuffleArray(all.filter((f) => !f.isFeatured))

    return [...featured, ...pool].slice(0, 4)
  } catch (error) {
    console.error('Error fetching featured finalists:', error)
    return []
  }
}

function getInitials(name) {
  if (!name) return '?'
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return parts[0][0].toUpperCase()
}

export default async function FinalistsPreview() {
  const finalists = await getFeaturedFinalists()

  if (!finalists || finalists.length === 0) {
    return null
  }

  return (
    <>
      <style>{`
        .finalist-card-preview {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .finalist-card-preview:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 36px rgba(10, 26, 63, 0.12);
          border-color: var(--color-gold) !important;
        }
        .finalist-card-preview:hover .finalist-preview-img {
          transform: scale(1.05);
        }
        .finalist-card-preview:hover .finalist-view-arrow {
          transform: translateX(4px);
        }
        .finalists-explore-btn {
          transition: all 0.25s ease;
        }
        .finalists-explore-btn:hover {
          background-color: var(--color-gold) !important;
          color: var(--color-deep-blue) !important;
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(201, 160, 43, 0.35);
        }
        .finalists-explore-btn:hover .btn-arrow-icon {
          transform: translateX(4px);
        }
      `}</style>

      <section style={{
        backgroundColor: 'var(--color-light)',
        padding: '5rem 2rem',
        borderTop: '1px solid var(--color-gray-light)',
        borderBottom: '1px solid var(--color-gray-light)',
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
        }}>

          {/* Section Header */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
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
                Class Directory
              </p>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                fontWeight: '700',
                color: 'var(--color-deep-blue)',
                lineHeight: '1.2',
              }}>
                Meet the Finalists
              </h2>
            </div>

            <Link
              href="/finalists"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-body)',
                fontSize: '0.88rem',
                fontWeight: '600',
                color: 'var(--color-deep-blue)',
                textDecoration: 'none',
                borderBottom: '2px solid var(--color-gold)',
                paddingBottom: '2px',
              }}
            >
              Browse All
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* 4 Finalists Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem',
          }}>
            {finalists.map((finalist) => (
              <Link
                key={finalist._id}
                href={`/finalists/${finalist.slug?.current || ''}`}
                className="finalist-card-preview"
                style={{
                  textDecoration: 'none',
                  backgroundColor: 'var(--color-white)',
                  border: '1px solid var(--color-gray-light)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Photo container */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1/1',
                  backgroundColor: 'var(--color-deep-blue)',
                  overflow: 'hidden',
                }}>
                  {finalist.photo ? (
                    <Image
                      src={urlFor(finalist.photo).width(400).height(400).url()}
                      alt={finalist.fullName || 'Finalist photo'}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                      style={{
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease',
                      }}
                      className="finalist-preview-img"
                    />
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#0D2B6B',
                      color: 'var(--color-gold)',
                    }}>
                      <span style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '2rem',
                        fontWeight: '700',
                      }}>
                        {getInitials(finalist.fullName)}
                      </span>
                    </div>
                  )}

                  {finalist.stateOfOrigin && (
                    <span style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '10px',
                      backgroundColor: 'rgba(10, 26, 63, 0.85)',
                      backdropFilter: 'blur(6px)',
                      color: 'var(--color-gold)',
                      border: '1px solid rgba(201, 160, 43, 0.35)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.68rem',
                      fontWeight: '600',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      letterSpacing: '0.4px',
                    }}>
                      {finalist.stateOfOrigin}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div style={{
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  justifyContent: 'space-between',
                }}>
                  <div>
                    <h3 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.05rem',
                      fontWeight: '700',
                      color: 'var(--color-deep-blue)',
                      marginBottom: '0.25rem',
                      lineHeight: '1.3',
                    }}>
                      {finalist.fullName}
                    </h3>
                    {finalist.nickname && (
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.85rem',
                        color: 'var(--color-gold)',
                        fontStyle: 'italic',
                        marginBottom: '0.85rem',
                      }}>
                        "{finalist.nickname}"
                      </p>
                    )}
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.82rem',
                    fontWeight: '600',
                    color: 'var(--color-deep-blue)',
                    marginTop: '0.5rem',
                  }}>
                    <span>View Profile</span>
                    <ArrowRight
                      size={14}
                      className="finalist-view-arrow"
                      style={{ transition: 'transform 0.2s ease' }}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom Center CTA Button */}
          <div style={{ textAlign: 'center' }}>
            <Link
              href="/finalists"
              className="finalists-explore-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: 'var(--color-deep-blue)',
                color: 'var(--color-white)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.92rem',
                fontWeight: '600',
                padding: '14px 32px',
                borderRadius: '6px',
                textDecoration: 'none',
                letterSpacing: '0.3px',
              }}
            >
              <Users size={18} />
              <span>Explore All Finalists</span>
              <ArrowRight size={16} className="btn-arrow-icon" style={{ transition: 'transform 0.2s ease' }} />
            </Link>
          </div>

        </div>
      </section>
    </>
  )
}
