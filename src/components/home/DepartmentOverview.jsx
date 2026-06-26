import Link from 'next/link'
import { ArrowRight, Cpu } from 'lucide-react'

export default function DepartmentOverview() {
  return (
    <section style={{
      backgroundColor: 'var(--color-deep-blue)',
      padding: '5rem 2rem',
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        textAlign: 'center',
      }}>

        {/* Icon */}
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: 'rgba(201, 160, 43, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
        }}>
          <Cpu size={24} color="var(--color-gold)" />
        </div>

        {/* Label */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.78rem',
          fontWeight: '600',
          color: 'var(--color-gold)',
          letterSpacing: '2.5px',
          textTransform: 'uppercase',
          marginBottom: '0.75rem',
        }}>
          About Us
        </p>

        {/* Heading */}
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          fontWeight: '700',
          color: 'var(--color-white)',
          marginBottom: '1.5rem',
          lineHeight: '1.2',
        }}>
          Department of Computer Engineering
        </h2>

        {/* Description */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1.05rem',
          color: 'rgba(255,255,255,0.7)',
          lineHeight: '1.8',
          marginBottom: '2.5rem',
        }}>
          For years, the Department of Computer Engineering at ATBU has shaped
          brilliant minds, fostering innovation, discipline, and excellence.
          From late-night project defenses to unforgettable class moments, this
          department has been more than an academic journey, it has been a
          home. Digital Elites stands as a tribute to every student who walked
          this path and a legacy for those who will follow.
        </p>

        <Link href="/about" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'var(--color-gold)',
          color: 'var(--color-deep-blue)',
          fontFamily: 'var(--font-body)',
          fontSize: '0.9rem',
          fontWeight: '600',
          padding: '14px 32px',
          borderRadius: '4px',
          textDecoration: 'none',
        }}>
          Learn More About Us
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  )
}