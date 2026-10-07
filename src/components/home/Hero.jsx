'use client'

import Link from 'next/link'
import { Search } from 'lucide-react'
import { Bebas_Neue } from 'next/font/google'
import { urlFor } from '@/sanity/lib/image'

const bebas = Bebas_Neue({ subsets: ['latin'], weight: '400', display: 'swap' })

// Fallback shown only when no finalists come from Sanity.
const FALLBACK = [
  { name: 'Aisha Bello', nickname: 'The Debugger' },
  { name: 'Chukwuemeka O.', nickname: 'Chief Em' },
  { name: 'Fatima Musa', nickname: 'StackOverflow' },
  { name: 'Daniel Adamu', nickname: 'The Kernel' },
  { name: 'Ngozi Eze', nickname: 'ByteQueen' },
  { name: 'Ibrahim Sule', nickname: 'Mr. Circuit' },
].map((f) => ({ ...f, photo: null }))

function getInitials(fullName) {
  if (!fullName) return '?'
  const p = fullName.trim().split(/\s+/)
  return (p.length >= 2 ? p[0][0] + p[1][0] : p[0][0]).toUpperCase()
}

function Portrait({ f }) {
  return (
    <figure className="de-portrait">
      {f.photo ? (
        <img src={f.photo} alt={f.name} loading="lazy" />
      ) : (
        <div className="de-initials" aria-hidden="true">{getInitials(f.name)}</div>
      )}
      <figcaption>
        <strong>{f.name}</strong>
        {f.nickname && <span>{f.nickname}</span>}
      </figcaption>
    </figure>
  )
}

// Splits finalists into 3 columns, repeating so each column is long enough to loop.
function buildColumns(list) {
  return [0, 1, 2].map((c) => {
    let col = list.filter((_, i) => i % 3 === c)
    if (col.length === 0) col = list
    while (col.length < 5) col = [...col, ...col]
    return col
  })
}

export default function Hero({ finalists }) {
  const list =
    finalists && finalists.length > 0
      ? finalists.map((f) => ({
          name: f.fullName,
          nickname: f.nickname || '',
          photo: f.photo ? urlFor(f.photo).width(400).height(520).url() : null,
        }))
      : FALLBACK

  const columns = buildColumns(list)

  return (
    <>
      <style>{`
        .de-hero {
          --ink: #0A1A3F;
          --ink-2: #14295C;
          --paper: #F3F5FA;
          --muted: #A9B4D0;
          --sun: #FFC93C;
          min-height: 100svh;
          background: var(--ink);
          color: var(--paper);
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          align-items: center;
          gap: clamp(2rem, 5vw, 5rem);
          padding: 6rem clamp(1.25rem, 5vw, 4.5rem) 3rem;
          overflow: hidden;
          position: relative;
        }

        .de-copy { max-width: 34rem; }
        .de-copy h1 {
          font-family: var(--font-display);
          font-size: clamp(4rem, 10vw, 9rem);
          font-weight: 400;
          line-height: 0.88;
          letter-spacing: 0.01em;
          margin: 0 0 1.5rem;
          color: var(--paper);
        }
        .de-copy p {
          font-family: var(--font-body, inherit);
          font-size: clamp(1rem, 1.4vw, 1.2rem);
          line-height: 1.55;
          color: var(--muted);
          margin: 0 0 2.25rem;
          max-width: 28rem;
        }
        .de-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 1.25rem 1.75rem; }

        .de-btn {
          display: inline-flex; align-items: center; gap: 0.6rem;
          background: var(--sun); color: var(--ink);
          font-family: var(--font-body, inherit);
          font-weight: 700; font-size: 1rem;
          padding: 0.95rem 1.5rem;
          border-radius: 999px;
          text-decoration: none;
          transition: transform .18s ease, background .18s ease;
        }
        .de-btn:hover { transform: translateY(-2px); background: #ffd766; }
        .de-link {
          font-family: var(--font-body, inherit);
          color: var(--paper); font-weight: 500;
          text-decoration: underline; text-underline-offset: 5px;
          text-decoration-color: rgba(243,245,250,.35);
          transition: text-decoration-color .18s ease;
        }
        .de-link:hover { text-decoration-color: var(--sun); }
        .de-btn:focus-visible, .de-link:focus-visible {
          outline: 3px solid var(--paper); outline-offset: 3px;
        }

        /* Photo wall */
        .de-wall {
          height: min(78svh, 46rem);
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(.6rem, 1.2vw, 1rem);
          -webkit-mask-image: linear-gradient(to bottom, transparent, #000 14%, #000 86%, transparent);
                  mask-image: linear-gradient(to bottom, transparent, #000 14%, #000 86%, transparent);
        }
        .de-col { overflow: hidden; }
        .de-col:nth-child(2) { margin-top: 3rem; }
        .de-track {
          display: flex; flex-direction: column;
          gap: clamp(.6rem, 1.2vw, 1rem);
          animation: de-rise 46s linear infinite;
        }
        .de-col:nth-child(2) .de-track { animation-direction: reverse; animation-duration: 54s; }
        .de-col:nth-child(3) .de-track { animation-duration: 60s; }
        .de-wall:hover .de-track { animation-play-state: paused; }
        @keyframes de-rise { to { transform: translateY(calc(-50% - clamp(.3rem, .6vw, .5rem))); } }

        .de-portrait {
          position: relative; margin: 0;
          aspect-ratio: 3 / 4;
          border-radius: 14px;
          overflow: hidden;
          background: var(--ink-2);
          flex-shrink: 0;
        }
        .de-portrait img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .de-initials {
          width: 100%; height: 100%;
          display: grid; place-items: center;
          font-family: var(--font-display);
          font-size: 3rem; font-weight: 400; letter-spacing: .02em;
          color: var(--muted);
        }
        .de-portrait figcaption {
          position: absolute; inset: auto 0 0 0;
          padding: 2.5rem .75rem .7rem;
          background: linear-gradient(to top, rgba(10,26,63,.92), transparent);
          display: flex; flex-direction: column; gap: 2px;
          opacity: 0; transform: translateY(6px);
          transition: opacity .2s ease, transform .2s ease;
        }
        .de-portrait:hover figcaption { opacity: 1; transform: none; }
        .de-portrait strong { font-size: .8rem; font-weight: 600; line-height: 1.25; }
        .de-portrait span { font-size: .72rem; color: var(--sun); }

        @media (max-width: 860px) {
          .de-hero { grid-template-columns: 1fr; padding-top: 5.5rem; gap: 2.5rem; }
          .de-wall { height: 26rem; }
          .de-wall .de-col:nth-child(3) { display: none; }
          .de-wall { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .de-portrait figcaption { opacity: 1; transform: none; }
        }
        @media (max-width: 480px) {
          .de-actions { flex-direction: column; align-items: stretch; text-align: center; }
          .de-btn { justify-content: center; }
        }
        @media (prefers-reduced-motion: reduce) {
          .de-track { animation: none; }
          .de-col { overflow-y: auto; }
        }
      `}</style>

      <section
        className="de-hero"
        aria-labelledby="de-heading"
        style={{ '--font-display': bebas.style.fontFamily }}
      >
        <div className="de-copy">
          <h1 id="de-heading">Digital Elites</h1>
          <p>
            The class of 2026 from Computer and Communication Engineering at ATBU. Find your
            coursemates, read their stories, and keep the memories.
          </p>
          <div className="de-actions">
            <Link href="/finalists" className="de-btn">
              <Search size={18} aria-hidden="true" />
              Find a finalist
            </Link>
            <Link href="/about" className="de-link">
              About the department
            </Link>
          </div>
        </div>

        <div className="de-wall" aria-label="Photos of the graduating class">
          {columns.map((col, ci) => (
            <div className="de-col" key={ci}>
              <div className="de-track">
                {[...col, ...col].map((f, i) => (
                  <Portrait f={f} key={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}