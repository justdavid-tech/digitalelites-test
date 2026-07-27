import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { ArrowRight, Play, Image as ImageIcon } from 'lucide-react'

async function getGalleryPreview() {
  const images = await client.fetch(`
    *[_type == "galleryImage"] | order(_createdAt desc) [0...3] {
      _id,
      image,
      caption,
      category,
    }
  `)

  const videos = await client.fetch(`
    *[_type == "galleryVideo"] | order(_createdAt desc) [0...3] {
      _id,
      thumbnail,
      caption,
      category,
    }
  `)

  return { images, videos }
}

export default async function GalleryPreview() {
  const { images, videos } = await getGalleryPreview()
  const hasContent = images.length > 0 || videos.length > 0

  return (
    <section style={{
      backgroundColor: 'var(--color-white)',
      padding: '5rem 2rem',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
      }}>

        {/* Header */}
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
              Memories
            </p>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: '700',
              color: 'var(--color-deep-blue)',
              lineHeight: '1.2',
            }}>
              Gallery Highlights
            </h2>
          </div>

          <Link href="/gallery" style={{
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
          }}>
            View Full Gallery
            <ArrowRight size={16} />
          </Link>
        </div>

        {hasContent ? (
          <>
            {/* Images Row */}
            {images.length > 0 && (
              <>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.78rem',
                  fontWeight: '600',
                  color: 'var(--color-gray)',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}>
                  <ImageIcon size={13} />
                  Photos
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {images.map((item) => (
                    <Link key={item._id} href="/gallery" className="group" style={{
                      textDecoration: 'none',
                      display: 'block',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      position: 'relative',
                      aspectRatio: '4/3',
                      backgroundColor: 'var(--color-gray-light)',
                    }}>
                      {item.image && (
                        <Image
                          src={urlFor(item.image).width(600).height(450).url()}
                          alt={item.caption || 'Gallery image'}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 350px"
                          style={{ objectFit: 'cover', transition: 'transform 0.3s ease' }}
                        />
                      )}

                      {/* Hover overlay */}
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(13,43,107,0.85) 0%, transparent 50%)',
                        transition: 'opacity 0.3s ease',
                        display: 'flex',
                        alignItems: 'flex-end',
                        padding: '1rem',
                      }}
                        className="opacity-0 group-hover:opacity-100"
                      >
                        <div>
                          {item.category && (
                            <span style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: '0.7rem',
                              fontWeight: '600',
                              color: 'var(--color-gold)',
                              letterSpacing: '1px',
                              textTransform: 'uppercase',
                              display: 'block',
                              marginBottom: '4px',
                            }}>
                              {item.category}
                            </span>
                          )}
                          {item.caption && (
                            <span style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: '0.85rem',
                              color: 'var(--color-white)',
                            }}>
                              {item.caption}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}

            {/* Videos Row */}
            {videos.length > 0 && (
              <>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.78rem',
                  fontWeight: '600',
                  color: 'var(--color-gray)',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}>
                  <Play size={13} />
                  Videos
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {videos.map((item) => (
                    <Link key={item._id} href="/gallery" style={{
                      textDecoration: 'none',
                      display: 'block',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      position: 'relative',
                      aspectRatio: '4/3',
                      backgroundColor: 'var(--color-deep-blue)',
                    }}>
                      {item.thumbnail && (
                        <Image
                          src={urlFor(item.thumbnail).width(600).height(450).url()}
                          alt={item.caption || 'Video thumbnail'}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 350px"
                          style={{ objectFit: 'cover', opacity: 0.7 }}
                        />
                      )}

                      {/* Play button */}
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.75rem',
                      }}>
                        <div style={{
                          width: '52px',
                          height: '52px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--color-gold)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          <Play size={20} color="var(--color-deep-blue)" fill="var(--color-deep-blue)" />
                        </div>
                      </div>

                      {/* Bottom info */}
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '1rem',
                        background: 'linear-gradient(to top, rgba(13,43,107,0.9) 0%, transparent 100%)',
                      }}>
                        {item.category && (
                          <span style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.7rem',
                            fontWeight: '600',
                            color: 'var(--color-gold)',
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            display: 'block',
                            marginBottom: '4px',
                          }}>
                            {item.category}
                          </span>
                        )}
                        {item.caption && (
                          <span style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.85rem',
                            color: 'var(--color-white)',
                          }}>
                            {item.caption}
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          // Empty state
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            backgroundColor: 'var(--color-light)',
            borderRadius: '8px',
            border: '1px solid var(--color-gray-light)',
          }}>
            <ImageIcon size={40} color="var(--color-gray)" style={{ marginBottom: '1rem' }} />
            <p style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.2rem',
              color: 'var(--color-deep-blue)',
              marginBottom: '0.5rem',
            }}>
              Gallery coming soon
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              color: 'var(--color-gray)',
            }}>
              Memories will appear here as they are uploaded.
            </p>
          </div>
        )}

        {/* CTA */}
        {hasContent && (
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Link href="/gallery" style={{
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
              View All Memories
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>


    </section>
  )
}