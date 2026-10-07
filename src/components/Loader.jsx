'use client'

import { Bebas_Neue } from 'next/font/google'

const bebas = Bebas_Neue({ subsets: ['latin'], weight: '400', display: 'swap' })

/**
 * Loader
 * @param {string}  text        Wordmark shown while loading.
 * @param {boolean} fullscreen  Cover the whole screen on deep blue (default).
 *                              Set false to use it inline inside a section.
 */
export default function Loader({ text = 'Digital Elites', fullscreen = true }) {
  const letters = Array.from(text)

  return (
    <>
      <style>{`
        .de-ld-screen {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: grid;
          place-items: center;
          background: #0A1A3F;
        }

        .de-ld {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.75rem;
          padding: 2rem;
          color: #F3F5FA;
        }

        .de-ld-word {
          display: flex;
          font-size: clamp(2.75rem, 10vw, 5.5rem);
          letter-spacing: 0.075em;
          line-height: 1;
          user-select: none;
        }

        /* Each letter sits in a mask so it rises out of a clean edge */
        .de-ld-mask {
          display: inline-block;
          overflow: hidden;
          padding: 0.04em 0;
        }
        .de-ld-char {
          display: inline-block;
          white-space: pre;
          transform: translateY(110%);
          animation: de-ld-rise 2.6s cubic-bezier(.65, 0, .35, 1) infinite;
        }

        @keyframes de-ld-rise {
          0%   { transform: translateY(110%); }
          28%  { transform: translateY(0); }
          72%  { transform: translateY(0); }
          100% { transform: translateY(-110%); }
        }

        .de-ld-track {
          position: relative;
          width: min(14rem, 55vw);
          height: 2px;
          background: rgba(243, 245, 250, 0.14);
          overflow: hidden;
          border-radius: 2px;
        }
        .de-ld-track::after {
          content: "";
          position: absolute;
          inset: 0 auto 0 0;
          width: 40%;
          background: #FFC93C;
          border-radius: 2px;
          animation: de-ld-slide 1.3s cubic-bezier(.65, 0, .35, 1) infinite;
        }
        @keyframes de-ld-slide {
          from { transform: translateX(-100%); }
          to   { transform: translateX(250%); }
        }

        .de-sr-only {
          position: absolute;
          width: 1px; height: 1px;
          overflow: hidden;
          clip: rect(0 0 0 0);
          white-space: nowrap;
        }

        @media (prefers-reduced-motion: reduce) {
          .de-ld-char { animation: none; transform: none; }
          .de-ld-track::after { animation: none; width: 100%; opacity: .5; }
        }
      `}</style>

      <div
        className={fullscreen ? 'de-ld-screen' : undefined}
        role="status"
        aria-live="polite"
      >
        <div className="de-ld">
          <span className="de-sr-only">Loading</span>

          <div className={`de-ld-word ${bebas.className}`} aria-hidden="true">
            {letters.map((char, i) => (
              <span className="de-ld-mask" key={i}>
                <span
                  className="de-ld-char"
                  style={{ animationDelay: `${(i * 0.05).toFixed(2)}s` }}
                >
                  {char}
                </span>
              </span>
            ))}
          </div>

          <div className="de-ld-track" aria-hidden="true" />
        </div>
      </div>
    </>
  )
}