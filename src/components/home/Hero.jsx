'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Search, Star } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'

// ─── Finalist data ───────────────────────────────────────────────────────────
// Replace `photo` with the real image path/URL for each student.
// If photo is null, the component falls back to initials.
const FINALISTS = [
  { name: 'Aisha Bello',      nickname: 'The Debugger',   initials: 'AB', photo: null },
  { name: 'Chukwuemeka O.',   nickname: 'Chief Em',        initials: 'CO', photo: null },
  { name: 'Fatima Musa',      nickname: 'StackOverflow',   initials: 'FM', photo: null },
  { name: 'Daniel Adamu',     nickname: 'The Kernel',      initials: 'DA', photo: null },
  { name: 'Ngozi Eze',        nickname: 'ByteQueen',       initials: 'NE', photo: null },
  { name: 'Ibrahim Sule',     nickname: 'Mr. Circuit',     initials: 'IS', photo: null },
  { name: 'Blessing Obi',     nickname: '404 Not Found',   initials: 'BO', photo: null },
  { name: 'Umar Tanko',       nickname: 'The Compiler',    initials: 'UT', photo: null },
  { name: 'Chioma Ike',       nickname: 'Git Push',        initials: 'CI', photo: null },
  { name: 'Yusuf Garba',      nickname: 'Root Access',     initials: 'YG', photo: null },
  { name: 'Adaeze Nwosu',     nickname: 'CSS Goddess',     initials: 'AN', photo: null },
  { name: 'Musa Danladi',     nickname: 'The Architect',   initials: 'MD', photo: null },
]

// ─── Single finalist card ─────────────────────────────────────────────────────
function FinalistCard({ finalist }) {
  return (
    <div style={styles.card}>
      <div style={styles.photoRing}>
        {finalist.photo ? (
          <img
            src={finalist.photo}
            alt={finalist.name}
            style={styles.photoImg}
          />
        ) : (
          <div style={styles.photoPlaceholder}>
            <span style={styles.initials}>{finalist.initials}</span>
          </div>
        )}
      </div>
      <span style={styles.cardName}>{finalist.name}</span>
      <span style={styles.cardNick}>"{finalist.nickname}"</span>
    </div>
  )
}

// ─── Starfield canvas ─────────────────────────────────────────────────────────
function StarfieldCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    canvas.width  = parent.offsetWidth
    canvas.height = parent.offsetHeight
    const ctx = canvas.getContext('2d')

    const stars = Array.from({ length: 55 }, () => ({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      r:     Math.random() * 1.5 + 0.4,
      alpha: Math.random() * 0.5 + 0.15,
      speed: Math.random() * 0.006 + 0.003,
      phase: Math.random() * Math.PI * 2,
    }))

    let t = 0
    let raf

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t += 0.012
      stars.forEach(s => {
        const a = s.alpha * (0.6 + 0.4 * Math.sin(t * s.speed * 80 + s.phase))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201,160,43,${a})`
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(raf)
  }, [])

  return <canvas ref={canvasRef} style={styles.canvas} aria-hidden="true" />
}

function getInitials(fullName) {
  if (!fullName) return '?'
  const parts = fullName.trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return parts[0][0].toUpperCase()
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero({ finalists }) {
  // Map dynamic finalists if available, otherwise fall back to static list
  const list = (finalists && finalists.length > 0)
    ? finalists.map((f) => ({
        name: f.fullName,
        nickname: f.nickname || '',
        initials: getInitials(f.fullName),
        photo: f.photo ? urlFor(f.photo).width(150).height(150).url() : null,
      }))
    : FINALISTS

  // Double the list so the CSS marquee loops seamlessly
  const doubled = [...list, ...list]

  return (
    <>
      {/* Keyframe injected once via a <style> tag */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');

        @keyframes de-shimmer {
          0%   { color: #C9A02B; }
          100% { color: #e8c96a; }
        }
        @keyframes de-fadeDown {
          from { opacity: 0; transform: translateY(-18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes de-fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes de-fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes de-scrollLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        body {
        overflow-x: hidden;
        }

        .de-gold     { animation: de-shimmer 3s ease-in-out 1.5s infinite alternate; }
        .de-badge    { animation: de-fadeDown 0.7s ease both; }
        .de-title    { animation: de-fadeDown 0.8s ease 0.1s both; }
        .de-sub      { animation: de-fadeDown 0.8s ease 0.2s both; }
        .de-dept     { animation: de-fadeDown 0.8s ease 0.3s both; }
        .de-tagline  { animation: de-fadeDown 0.8s ease 0.35s both; }
        .de-divider  { animation: de-fadeIn  1.0s ease 0.5s  both; }
        .de-stats    { animation: de-fadeDown 0.9s ease 0.45s both; }
        .de-cta      { animation: de-fadeUp  0.9s ease 0.55s both; }
        .de-strip    { animation: de-fadeIn  1.0s ease 0.8s  both; }

        .de-track    { animation: de-scrollLeft 32s linear infinite; }
        .de-track:hover { animation-play-state: paused; }

        .de-card:hover .de-ring { border-color: #C9A02B !important; }
        .de-card:hover          { transform: translateY(-4px); }

        .de-btn-primary:hover  { background: #e8c96a !important; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(201,160,43,0.35); }
        .de-btn-secondary:hover{ background: rgba(255,255,255,0.07) !important; border-color: rgba(255,255,255,0.6) !important; transform: translateY(-2px); }

        .de-strip-wrapper::before,
        .de-strip-wrapper::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 80px;
          z-index: 3;
          pointer-events: none;
        }
        .de-strip-wrapper::before { left:  0; background: linear-gradient(to right, #0D2B6B, transparent); }
        .de-strip-wrapper::after  { right: 0; background: linear-gradient(to left,  #0D2B6B, transparent); }

        @media (max-width: 600px) {
          .de-hero-section {
            padding: 5rem 1rem 2rem !important;
          }
          .de-stats {
            gap: 1rem !important;
            flex-wrap: wrap !important;
            justify-content: center !important;
          }
          .de-stat-sep {
            display: none !important;
          }
          .de-stat {
            flex: 1 1 25% !important;
            min-width: 80px !important;
          }
          .de-tagline {
            font-size: 0.65rem !important;
            letter-spacing: 1.5px !important;
          }
          .de-title {
            font-size: clamp(1.8rem, 8vw, 2.5rem) !important;
          }
          .de-cta {
            flex-direction: column !important;
            width: 100% !important;
            padding: 0 1rem;
            gap: 0.75rem !important;
          }
          .de-btn-primary, .de-btn-secondary {
            width: 100% !important;
            justify-content: center !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .de-track { animation: none; }
          .de-gold  { animation: none; }
        }

        @media (min-width: 1025px) {
          .de-badge {
            padding-top: 300px;
          }
        }
      `}</style>

      <section className="de-hero-section" style={styles.section}>
        <StarfieldCanvas />

        {/* Radial glows */}
        <div style={styles.radial1} aria-hidden="true" />
        <div style={styles.radial2} aria-hidden="true" />

        {/* ── Main content ── */}
        <div style={styles.content}>
<br></br>
          {/* Badge */}
          <div className="de-badge" style={styles.badge}>
            <Star size={12} color="#C9A02B" fill="#C9A02B" aria-hidden="true" />
            <span style={styles.badgeText}>Graduating Class of 2026</span>
            <Star size={12} color="#C9A02B" fill="#C9A02B" aria-hidden="true" />
          </div>

          {/* Heading */}
          <h1 className="de-title" style={styles.title}>
            Digital{' '}
            <span className="de-gold" style={styles.goldText}>Elites</span>
          </h1>

          {/* Subtitle */}
          <p className="de-sub"  style={styles.subtitle}>The Official Digital Yearbook of</p>
          <p className="de-dept" style={styles.deptName}>Computer Engineering, ATBU</p>
          <p className="de-tagline" style={styles.tagline}>
            Celebrating Excellence&nbsp;&nbsp;·&nbsp;&nbsp;Preserving Legacy
          </p>

          {/* Divider */}
          <div className="de-divider" style={styles.divider}>
            <div style={styles.dividerLine} />
            <div style={styles.dividerDiamond} />
            <div style={styles.dividerLine} />
          </div>

          {/* Stats */}
          <div className="de-stats" style={styles.statsRow}>
            <div className="de-stat" style={styles.stat}>
              <div style={styles.statNum}>2026</div>
              <div style={styles.statLabel}>Graduating Year</div>
            </div>
            <div className="de-stat-sep" style={styles.statSep} />
            <div className="de-stat" style={styles.stat}>
              <div style={styles.statNum}>ATBU</div>
              <div style={styles.statLabel}>Institution</div>
            </div>
            <div className="de-stat-sep" style={styles.statSep} />
            <div className="de-stat" style={styles.stat}>
              <div style={styles.statNum}>CompEng</div>
              <div style={styles.statLabel}>Department</div>
            </div>
          </div>

          {/* CTAs */}
          <div className="de-cta" style={styles.ctaRow}>
            <Link href="/finalists" className="de-btn-primary" style={styles.btnPrimary}>
              <Search size={16} aria-hidden="true" />
              Search Finalists
            </Link>
            <Link href="/about" className="de-btn-secondary" style={styles.btnSecondary}>
              About the Department
            </Link>
          </div>

          {/* ── Scroll strip ── */}
          <div className="de-strip" style={styles.stripSection}>
            <p style={styles.stripLabel}>— Meet the class —</p>

            <div className="de-strip-wrapper" style={styles.stripWrapper}>
              <div className="de-track" style={styles.stripTrack}>
                {doubled.map((f, i) => (
                  <div key={i} className="de-card" style={styles.card}>
                    <div className="de-ring" style={styles.photoRing}>
                      {f.photo ? (
                        <img src={f.photo} alt={f.name} style={styles.photoImg} />
                      ) : (
                        <div style={styles.photoPlaceholder}>
                          <span style={styles.initials}>{f.initials}</span>
                        </div>
                      )}
                    </div>
                    <span style={styles.cardName}>{f.name}</span>
                    {f.nickname && <span style={styles.cardNick}>"{f.nickname}"</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom fade */}
        <div style={styles.bottomFade} aria-hidden="true" />
      </section>
    </>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = {
  section: {
    minHeight: '100vh',
    backgroundColor: '#0D2B6B',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem 2rem 2rem',
    position: 'relative',
    overflow: 'hidden',
  },
  canvas: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
  },
  radial1: {
    position: 'absolute',
    width: 500, height: 500,
    left: -100, top: -80,
    background: 'radial-gradient(circle, rgba(201,160,43,0.09) 0%, transparent 65%)',
    pointerEvents: 'none',
  },
  radial2: {
    position: 'absolute',
    width: 400, height: 400,
    right: -80, bottom: 80,
    background: 'radial-gradient(circle, rgba(201,160,43,0.06) 0%, transparent 65%)',
    pointerEvents: 'none',
  },
  content: {
    maxWidth: 800,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
  },

  // Badge
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 7,
    background: 'rgba(201,160,43,0.13)',
    border: '1px solid rgba(201,160,43,0.38)',
    borderRadius: 30,
    padding: '5px 16px',
    marginBottom: '1.3rem',
  },
  badgeText: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.72rem',
    fontWeight: 600,
    color: '#C9A02B',
    letterSpacing: '1.8px',
    textTransform: 'uppercase',
  },

  // Heading
  title: {
    fontFamily: "var(--font-heading)",
    fontSize: 'clamp(2.4rem, 6vw, 4.8rem)',
    fontWeight: 700,
    color: '#fff',
    lineHeight: 1.08,
    margin: '0 0 0.5rem',
    textAlign: 'center',
  },
  goldText: {
    color: '#C9A02B',
    display: 'inline-block',
  },

  // Copy
  subtitle: {
    fontFamily: 'var(--font-body)',
    fontSize: 'clamp(0.82rem, 1.8vw, 0.97rem)',
    color: 'rgba(255,255,255,0.65)',
    textAlign: 'center',
    margin: '0 auto 0.3rem',
    maxWidth: 480,
  },
  deptName: {
    fontFamily: "var(--font-heading)",
    fontSize: 'clamp(0.9rem, 2vw, 1.15rem)',
    fontWeight: 700,
    color: '#fff',
    textAlign: 'center',
    marginBottom: '0.4rem',
  },
  tagline: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.75rem',
    color: '#C9A02B',
    letterSpacing: '2.5px',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: '1.3rem',
  },

  // Divider
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    width: '100%',
    maxWidth: 340,
    margin: '0 auto 1.3rem',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    background: 'linear-gradient(to right, transparent, rgba(201,160,43,0.45), transparent)',
  },
  dividerDiamond: {
    width: 7, height: 7,
    background: '#C9A02B',
    transform: 'rotate(45deg)',
    flexShrink: 0,
    opacity: 0.8,
  },

  // Stats
  statsRow: {
    display: 'flex',
    gap: '1.8rem',
    justifyContent: 'center',
    marginBottom: '1.5rem',
  },
  stat: { textAlign: 'center' },
  statNum: {
    fontFamily: 'var(--font-body)',
    fontSize: '1.35rem',
    fontWeight: 700,
    color: '#C9A02B',
    lineHeight: 1,
  },
  statLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.68rem',
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: '1.2px',
    textTransform: 'uppercase',
    marginTop: 2,
  },
  statSep: {
    width: 1,
    background: 'rgba(201,160,43,0.25)',
    alignSelf: 'stretch',
  },

  // CTAs
  ctaRow: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: '2.5rem',
  },
  btnPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    background: '#C9A02B',
    color: '#0D2B6B',
    fontFamily: 'var(--font-body, Inter, sans-serif)',
    fontSize: '0.9rem',
    fontWeight: 700,
    padding: '13px 28px',
    borderRadius: 4,
    textDecoration: 'none',
    letterSpacing: '0.3px',
    transition: 'all 0.22s ease',
    border: 'none',
    cursor: 'pointer',
  },
  btnSecondary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    background: 'transparent',
    color: '#fff',
    fontFamily: 'var(--font-body, Inter, sans-serif)',
    fontSize: '0.9rem',
    fontWeight: 500,
    padding: '13px 28px',
    borderRadius: 4,
    textDecoration: 'none',
    border: '1px solid rgba(255,255,255,0.28)',
    letterSpacing: '0.3px',
    transition: 'all 0.22s ease',
    cursor: 'pointer',
  },

  // Scroll strip
  stripSection: {
    width: '100%',
  },
  stripLabel: {
    fontSize: '0.68rem',
    color: 'rgba(255, 252, 252, 0.35)',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: '0.9rem',
  },
  stripWrapper: {
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  stripTrack: {
    display: 'flex',
    gap: 14,
    width: 'max-content',
  },

  // Finalist card
  card: {
    flexShrink: 0,
    width: 110,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 7,
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    paddingBottom: '1rem',
  },
  photoRing: {
    width: 76,
    height: 76,
    borderRadius: '50%',
    border: '2px solid rgba(201,160,43,0.45)',
    padding: 3,
    flexShrink: 0,
    transition: 'border-color 0.2s ease',
  },
  photoImg: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
    display: 'block',
  },
  photoPlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    background: '#132a4a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontFamily: "var(--font-playfair, serif)",
    fontSize: '1.15rem',
    fontWeight: 700,
    color: '#C9A02B',
  },
  cardName: {
    fontSize: '0.7rem',
    fontWeight: 600,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 1.3,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: 100,
  },
  cardNick: {
    fontSize: '0.63rem',
    color: '#C9A02B',
    textAlign: 'center',
    letterSpacing: '0.4px',
  },

  // Bottom fade
  bottomFade: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    height: 100,
    background: 'linear-gradient(to bottom, transparent, rgba(13,43,107,0.4))',
    pointerEvents: 'none',
  },
}