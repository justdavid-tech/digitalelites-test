'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { Play, Image as ImageIcon, Video, X, Calendar } from 'lucide-react'

export default function GalleryClient({ images, videos }) {
  const [activeTab, setActiveTab] = useState('All')
  const [selectedVideo, setSelectedVideo] = useState(null)

  const combined = useMemo(() => {
    const taggedImages = images.map((item) => ({ ...item, mediaType: 'image' }))
    const taggedVideos = videos.map((item) => ({ ...item, mediaType: 'video' }))
    return [...taggedImages, ...taggedVideos].sort((a, b) =>
      new Date(b.date || 0) - new Date(a.date || 0)
    )
  }, [images, videos])

  const filtered = useMemo(() => {
    if (activeTab === 'Photos') return combined.filter((i) => i.mediaType === 'image')
    if (activeTab === 'Videos') return combined.filter((i) => i.mediaType === 'video')
    return combined
  }, [combined, activeTab])

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
          Memories
        </p>
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: '700',
          color: 'var(--color-white)',
          marginBottom: '0.5rem',
        }}>
          Gallery
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.95rem',
          color: 'rgba(255,255,255,0.6)',
        }}>
          Department events, defenses, and unforgettable moments.
        </p>
      </section>

      {/* Tabs */}
      <section style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '2.5rem 2rem 0',
        display: 'flex',
        justifyContent: 'center',
        gap: '0.75rem',
      }}>
        {[
          { label: 'All', icon: null },
          { label: 'Photos', icon: ImageIcon },
          { label: 'Videos', icon: Video },
        ].map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 24px',
                borderRadius: '30px',
                border: activeTab === tab.label
                  ? '1px solid var(--color-deep-blue)'
                  : '1px solid var(--color-gray-light)',
                backgroundColor: activeTab === tab.label
                  ? 'var(--color-deep-blue)'
                  : 'transparent',
                color: activeTab === tab.label
                  ? 'var(--color-white)'
                  : 'var(--color-gray)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.88rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {Icon && <Icon size={14} />}
              {tab.label}
            </button>
          )
        })}
      </section>

      {/* Masonry Grid */}
      <section style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '2.5rem 2rem 5rem',
      }}>
        {filtered.length > 0 ? (
          <div style={{
            columnCount: 3,
            columnGap: '1.25rem',
          }}
            className="masonry-grid"
          >
            {filtered.map((item) => (
              <GalleryItem
                key={item._id}
                item={item}
                onVideoClick={() => setSelectedVideo(item)}
              />
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            backgroundColor: 'var(--color-light)',
            borderRadius: '10px',
          }}>
            <ImageIcon size={40} color="var(--color-gray)" style={{ marginBottom: '1rem' }} />
            <p style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.2rem',
              color: 'var(--color-deep-blue)',
              marginBottom: '0.5rem',
            }}>
              No memories here yet
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              color: 'var(--color-gray)',
            }}>
              Check back soon.
            </p>
          </div>
        )}
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          onClick={() => setSelectedVideo(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '800px',
              width: '100%',
              backgroundColor: 'var(--color-black)',
              borderRadius: '10px',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <button
              onClick={() => setSelectedVideo(null)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                zIndex: 1,
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0,0,0,0.6)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={18} color="white" />
            </button>

            {selectedVideo.video?.asset?._ref && (
              <video
                controls
                autoPlay
                style={{ width: '100%', display: 'block' }}
                src={`https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${selectedVideo.video.asset._ref
                  .replace('file-', '')
                  .replace('-mp4', '.mp4')}`}
              />
            )}

            <div style={{ padding: '1.25rem' }}>
              {selectedVideo.category && (
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: 'var(--color-gold)',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}>
                  {selectedVideo.category}
                </span>
              )}
              {selectedVideo.caption && (
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  color: 'white',
                  marginTop: '0.4rem',
                }}>
                  {selectedVideo.caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @media (max-width: 1024px) {
          .masonry-grid {
            column-count: 2 !important;
          }
        }
        @media (max-width: 600px) {
          .masonry-grid {
            column-count: 1 !important;
          }
        }
      `}</style>
    </>
  )
}

function GalleryItem({ item, onVideoClick }) {
  const isVideo = item.mediaType === 'video'
  const imageSource = isVideo ? item.thumbnail : item.image

  return (
    <div
      onClick={isVideo ? onVideoClick : undefined}
      style={{
        breakInside: 'avoid',
        marginBottom: '1.25rem',
        borderRadius: '10px',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: 'var(--color-light)',
        cursor: isVideo ? 'pointer' : 'default',
      }}
    >
      {imageSource && (
        <div style={{ position: 'relative', width: '100%' }}>
          <Image
            src={urlFor(imageSource).width(600).url()}
            alt={item.caption || 'Gallery item'}
            width={600}
            height={isVideo ? 400 : 450}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />

          {isVideo && (
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(13,43,107,0.25)',
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Play size={18} color="var(--color-deep-blue)" fill="var(--color-deep-blue)" />
              </div>
            </div>
          )}

          {/* Bottom info overlay */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '1rem',
            background: 'linear-gradient(to top, rgba(13,43,107,0.85) 0%, transparent 100%)',
          }}>
            {item.category && (
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.68rem',
                fontWeight: '600',
                color: 'var(--color-gold)',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '3px',
              }}>
                {item.category}
              </span>
            )}
            {item.caption && (
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                color: 'var(--color-white)',
                display: 'block',
                marginBottom: '4px',
              }}>
                {item.caption}
              </span>
            )}
            {item.date && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}>
                <Calendar size={11} color="rgba(255,255,255,0.6)" />
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.72rem',
                  color: 'rgba(255,255,255,0.6)',
                }}>
                  {new Date(item.date).toLocaleDateString('en-US', {
                    month: 'short', day: 'numeric', year: 'numeric'
                  })}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}