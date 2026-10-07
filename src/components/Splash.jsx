'use client'

import { useEffect, useState } from 'react'
import Loader from './Loader'

/**
 * Splash
 * Shows the Loader on every full page load or refresh, then fades it out.
 * @param {number} duration  How long the loader stays, in milliseconds.
 */
export default function Splash({ duration = 2500, children }) {
  const [phase, setPhase] = useState('show') // 'show' | 'fade' | 'gone'

  useEffect(() => {
    const fade = setTimeout(() => setPhase('fade'), duration)
    const gone = setTimeout(() => setPhase('gone'), duration + 500)
    return () => {
      clearTimeout(fade)
      clearTimeout(gone)
    }
  }, [duration])

  // Stop the page behind the loader from scrolling
  useEffect(() => {
    document.body.style.overflow = phase === 'gone' ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [phase])

  return (
    <>
      {phase !== 'gone' && (
        <div
          style={{
            position: 'relative',
            zIndex: 9999,
            opacity: phase === 'fade' ? 0 : 1,
            transition: 'opacity 0.5s ease',
            pointerEvents: phase === 'fade' ? 'none' : 'auto',
          }}
        >
          <Loader />
        </div>
      )}
      {children}
    </>
  )
}