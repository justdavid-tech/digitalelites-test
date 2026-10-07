'use client'

import { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { Play, Image as ImageIcon, Video, X, Calendar, Laugh } from 'lucide-react'

export default function GalleryClient({ images = [], videos = [] }) {
  const [activeTab, setActiveTab] = useState('All')
  const [selectedVideo, setSelectedVideo] = useState(null)

  const combined = useMemo(() => {
    const taggedImages = (images || []).map((item) => ({ ...item, mediaType: 'image' }))
    const taggedVideos = (videos || []).map((item) => ({ ...item, mediaType: 'video' }))
    return [...taggedImages, ...taggedVideos].sort((a, b) =>
      new Date(b.date || b._createdAt || 0) - new Date(a.date || a._createdAt || 0)
    )
  }, [images, videos])

  const filtered = useMemo(() => {
    if (activeTab === 'Photos') return combined.filter((i) => i.mediaType === 'image')
    if (activeTab === 'Videos') return combined.filter((i) => i.mediaType === 'video')
    if (activeTab === 'Funny' || activeTab === 'Funny') {
      return combined.filter((i) =>
        i.isFunny === true ||
        i.category?.toLowerCase().includes('funny') ||
        i.category?.toLowerCase().includes('meme') ||
        i.category?.toLowerCase().includes('banter')
      )
    }
    return combined
  }, [combined, activeTab])

  // Manage body scroll and ESC key when video modal is active
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedVideo(null)
    }
    if (selectedVideo) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedVideo])

  const getVideoUrl = (item) => {
    if (!item) return null
    if (item.videoUrl) return item.videoUrl
    if (item.video?.asset?.url) return item.video.asset.url
    if (item.video?.asset?._ref) {
      const ref = item.video.asset._ref
      const cleanId = ref.replace(/^file-/, '').replace(/-(mp4|webm|mov|m4v|ogg)$/, '.$1')
      const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '8r13qfoc'
      const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
      return `https://cdn.sanity.io/files/${projectId}/${dataset}/${cleanId}`
    }
    return null
  }

  const tabs = [
    { label: 'All', icon: null },
    { label: 'Photos', icon: ImageIcon },
    { label: 'Videos', icon: Video },
    { label: 'Funny', icon: Laugh },
  ]

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
          Memories & Moments
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
          Department events, project defenses, banters, and unforgettable memories.
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
        flexWrap: 'wrap',
      }}>
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.label
          return (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 22px',
                borderRadius: '30px',
                border: isActive
                  ? '1px solid var(--color-deep-blue)'
                  : '1px solid var(--color-gray-light)',
                backgroundColor: isActive
                  ? 'var(--color-deep-blue)'
                  : 'transparent',
                color: isActive
                  ? 'var(--color-white)'
                  : 'var(--color-gray)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.88rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {Icon && <Icon size={15} color={isActive ? 'var(--color-gold)' : undefined} />}
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
            borderRadius: '12px',
            border: '1px dashed var(--color-gray-light)',
          }}>
            {activeTab === 'Funny' ? (
              <>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(201, 160, 43, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                }}>
                  <Laugh size={32} color="var(--color-gold)" />
                </div>
                <p style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: 'var(--color-deep-blue)',
                  marginBottom: '0.5rem',
                }}>
                  No roasts or funny memories yet
                </p>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'var(--color-gray)',
                  maxWidth: '420px',
                  margin: '0 auto',
                }}>
                  Upload funny pictures, memes, and banter clips in Sanity Studio to make mockery of your mates!
                </p>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        )}
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedVideo(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(5, 15, 38, 0.88)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '850px',
              width: '100%',
              backgroundColor: '#0A1E4A',
              border: '1px solid rgba(201, 160, 43, 0.35)',
              borderRadius: '14px',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(201, 160, 43, 0.15)',
            }}
          >
            <button
              onClick={() => setSelectedVideo(null)}
              aria-label="Close video player"
              style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                zIndex: 10,
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0,0,0,0.65)',
                border: '1px solid rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#fff',
                transition: 'all 0.2s ease',
              }}
            >
              <X size={20} color="white" />
            </button>

            {getVideoUrl(selectedVideo) ? (
              <div style={{ position: 'relative', backgroundColor: '#000', width: '100%' }}>
                <video
                  controls
                  autoPlay
                  playsInline
                  controlsList="nodownload"
                  preload="auto"
                  style={{
                    width: '100%',
                    maxHeight: '68vh',
                    minHeight: '260px',
                    display: 'block',
                    objectFit: 'contain',
                    backgroundColor: '#000',
                  }}
                  src={getVideoUrl(selectedVideo)}
                >
                  Your browser does not support HTML5 video playback.
                </video>
              </div>
            ) : (
              <div style={{
                padding: '4rem 2rem',
                textAlign: 'center',
                color: 'rgba(255,255,255,0.7)',
                fontFamily: 'var(--font-body)',
              }}>
                <Video size={48} color="var(--color-gold)" style={{ margin: '0 auto 1rem' }} />
                <p>Video is currently unavailable or still processing.</p>
              </div>
            )}

            <div style={{ padding: '1.5rem 1.75rem', backgroundColor: '#0D2B6B' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                {selectedVideo.isFunny && (
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.72rem',
                    fontWeight: '700',
                    backgroundColor: 'rgba(201, 160, 43, 0.25)',
                    color: 'var(--color-gold)',
                    border: '1px solid var(--color-gold)',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    letterSpacing: '0.5px',
                  }}>
                     Funny / Banter
                  </span>
                )}
                {selectedVideo.category && (
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: 'var(--color-gold)',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                  }}>
                    {selectedVideo.category}
                  </span>
                )}
              </div>

              {selectedVideo.caption && (
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  color: 'white',
                  margin: 0,
                  lineHeight: '1.4',
                }}>
                  {selectedVideo.caption}
                </h3>
              )}
              {selectedVideo.date && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  marginTop: '0.5rem',
                }}>
                  <Calendar size={13} color="rgba(255,255,255,0.5)" />
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.78rem',
                    color: 'rgba(255,255,255,0.5)',
                  }}>
                    {new Date(selectedVideo.date).toLocaleDateString('en-US', {
                      month: 'long', day: 'numeric', year: 'numeric'
                    })}
                  </span>
                </div>
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

        .gallery-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.18) !important;
        }

        .gallery-video-card:hover {
          border-color: var(--color-gold) !important;
          box-shadow: 0 12px 30px rgba(201, 160, 43, 0.25) !important;
        }

        .gallery-card:hover .gallery-media-img {
          transform: scale(1.03);
        }

        .gallery-card:hover .video-play-btn-circle {
          transform: scale(1.1);
          background-color: #e8c96a !important;
        }
      `}</style>
    </>
  )
}

function GalleryItem({ item, onVideoClick }) {
  const isVideo = item.mediaType === 'video'
  const imageSource = isVideo ? item.thumbnail : item.image
  const isFunnyItem =
    item.isFunny === true ||
    item.category?.toLowerCase().includes('funny') ||
    item.category?.toLowerCase().includes('meme') ||
    item.category?.toLowerCase().includes('banter')

  return (
    <div
      onClick={isVideo ? onVideoClick : undefined}
      onKeyDown={isVideo ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onVideoClick(); } } : undefined}
      tabIndex={isVideo ? 0 : undefined}
      role={isVideo ? 'button' : undefined}
      aria-label={isVideo ? `Play video: ${item.caption || 'Gallery video'}` : undefined}
      className={`gallery-card ${isVideo ? 'gallery-video-card' : ''}`}
      style={{
        breakInside: 'avoid',
        marginBottom: '1.25rem',
        borderRadius: '12px',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: isVideo ? '#0D2B6B' : 'var(--color-light)',
        border: isFunnyItem
          ? '1px solid rgba(201, 160, 43, 0.5)'
          : isVideo
          ? '1px solid rgba(201, 160, 43, 0.2)'
          : '1px solid var(--color-gray-light)',
        cursor: isVideo ? 'pointer' : 'default',
        boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease, border-color 0.3s ease',
      }}
    >
      {imageSource ? (
        <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
          <Image
            src={urlFor(imageSource).width(600).url()}
            alt={item.caption || 'Gallery item'}
            width={600}
            height={isVideo ? 400 : 450}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              transition: 'transform 0.4s ease',
            }}
            className="gallery-media-img"
          />

          {/* Funny tag overlay if funny */}
          {isFunnyItem && (
            <div style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              zIndex: 2,
              backgroundColor: 'rgba(13, 43, 107, 0.85)',
              border: '1px solid var(--color-gold)',
              backdropFilter: 'blur(6px)',
              borderRadius: '20px',
              padding: '3px 10px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
            }}>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.68rem',
                fontWeight: '700',
                color: 'var(--color-gold)',
              }}>
                 Funny / Meme
              </span>
            </div>
          )}

          {isVideo && (
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(13,43,107,0.3)',
              transition: 'background-color 0.25s ease',
            }} className="video-play-overlay">
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 18px rgba(0,0,0,0.4)',
                transition: 'transform 0.25s ease, background-color 0.25s ease',
              }} className="video-play-btn-circle">
                <Play size={20} color="var(--color-deep-blue)" fill="var(--color-deep-blue)" style={{ marginLeft: '3px' }} />
              </div>
            </div>
          )}

          {/* Bottom info overlay */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '1.25rem 1rem 0.85rem',
            background: 'linear-gradient(to top, rgba(13,43,107,0.92) 0%, rgba(13,43,107,0.5) 60%, transparent 100%)',
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
                fontSize: '0.88rem',
                color: 'var(--color-white)',
                fontWeight: '500',
                display: 'block',
                marginBottom: '4px',
                lineHeight: '1.3',
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
                <Calendar size={11} color="rgba(255,255,255,0.65)" />
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.72rem',
                  color: 'rgba(255,255,255,0.65)',
                }}>
                  {new Date(item.date).toLocaleDateString('en-US', {
                    month: 'short', day: 'numeric', year: 'numeric'
                  })}
                </span>
              </div>
            )}
          </div>
        </div>
      ) : isVideo ? (
        /* Video card without thumbnail */
        <div style={{
          position: 'relative',
          width: '100%',
          minHeight: '230px',
          background: 'linear-gradient(145deg, #0D2B6B 0%, #173f98 50%, #081d47 100%)',
          padding: '1.5rem 1.25rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          {/* Top Video Badge & Funny Tag */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.7rem',
              fontWeight: '700',
              backgroundColor: 'rgba(201, 160, 43, 0.2)',
              color: 'var(--color-gold)',
              border: '1px solid rgba(201, 160, 43, 0.4)',
              padding: '4px 10px',
              borderRadius: '20px',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
            }}>
              <Video size={12} />
              Video
            </span>

            {isFunnyItem ? (
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.68rem',
                fontWeight: '700',
                backgroundColor: 'rgba(201, 160, 43, 0.25)',
                color: 'var(--color-gold)',
                border: '1px solid var(--color-gold)',
                padding: '3px 8px',
                borderRadius: '12px',
              }}>
                Funny / Meme
              </span>
            ) : item.category ? (
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.72rem',
                color: 'rgba(255,255,255,0.65)',
                fontWeight: '500',
              }}>
                {item.category}
              </span>
            ) : null}
          </div>

          {/* Center Play Icon */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '1.25rem 0',
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 20px rgba(201, 160, 43, 0.35)',
              transition: 'transform 0.25s ease, background-color 0.25s ease',
            }} className="video-play-btn-circle">
              <Play size={22} color="var(--color-deep-blue)" fill="var(--color-deep-blue)" style={{ marginLeft: '3px' }} />
            </div>
          </div>

          {/* Bottom Info */}
          <div>
            {item.caption && (
              <h4 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.05rem',
                fontWeight: '600',
                color: 'var(--color-white)',
                marginBottom: '6px',
                lineHeight: '1.3',
              }}>
                {item.caption}
              </h4>
            )}
            {item.date && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}>
                <Calendar size={12} color="rgba(255,255,255,0.6)" />
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
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
      ) : null}
    </div>
  )
}